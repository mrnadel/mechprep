"""Character Rigger Server - converts images to SVG via vtracer.

Pre-processes raster images (color quantize + edge smooth) then traces
with vtracer to produce clean, Duolingo-style flat SVG shapes.
Includes a primitivize step that replaces near-geometric paths with
perfect circles, ellipses, and smooth bezier curves.
"""
import http.server
import socketserver
import json
import base64
import tempfile
import os
import re
import io
import math
import vtracer
import numpy as np
from scipy.optimize import least_squares
from PIL import Image, ImageFilter

MAX_DIM = 1024


# ─── IMAGE PREPROCESSING ────────────────────────────────────────────

def preprocess_image(png_bytes: bytes, num_colors: int = 6, smooth: int = 5) -> bytes:
    """Flatten, downscale, quantize, and smooth before tracing."""
    img = Image.open(io.BytesIO(png_bytes))

    if img.mode == 'RGBA':
        bg = Image.new('RGB', img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3])
        img = bg
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    w, h = img.size
    if w > MAX_DIM or h > MAX_DIM:
        scale = min(MAX_DIM / w, MAX_DIM / h)
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)

    # Scale blur with smoothness: higher smooth = stronger blur = smoother edges
    # smooth 1-3 → MedianFilter(3), 4-6 → 5, 7-8 → 7, 9-10 → 9
    median_size = 3 + max(0, smooth - 3) * 2
    median_size = min(median_size, 9)
    if median_size % 2 == 0:
        median_size += 1

    img = img.filter(ImageFilter.MedianFilter(size=median_size))

    # Add Gaussian blur for high smoothness values
    if smooth >= 5:
        blur_radius = (smooth - 4) * 0.5  # 0.5 at smooth=5, 3.0 at smooth=10
        img = img.filter(ImageFilter.GaussianBlur(radius=blur_radius))

    num_colors = max(2, min(num_colors, 64))
    img = img.quantize(colors=num_colors, method=Image.Quantize.MEDIANCUT, dither=0)
    img = img.convert('RGB')
    img = img.filter(ImageFilter.MedianFilter(size=median_size))

    buf = io.BytesIO()
    img.save(buf, format='PNG')
    return buf.getvalue()


# ─── SVG PATH PARSING ───────────────────────────────────────────────

def parse_svg_path_points(d: str) -> list:
    """Extract (x, y) points from an SVG path 'd' attribute by sampling the path."""
    # Tokenize
    tokens = re.findall(r'[MmLlHhVvCcSsQqTtAaZz]|-?[\d]*\.?\d+', d)
    points = []
    cx, cy = 0.0, 0.0
    i = 0
    while i < len(tokens):
        t = tokens[i]
        if t in ('M', 'm', 'L', 'l'):
            relative = t.islower()
            i += 1
            while i < len(tokens) and tokens[i] not in 'MmLlHhVvCcSsQqTtAaZz':
                x, y = float(tokens[i]), float(tokens[i + 1])
                if relative:
                    cx += x; cy += y
                else:
                    cx, cy = x, y
                points.append((cx, cy))
                i += 2
        elif t in ('C', 'c'):
            relative = t.islower()
            i += 1
            while i + 5 < len(tokens) and tokens[i] not in 'MmLlHhVvCcSsQqTtAaZz':
                # Sample bezier curve at several points for better fitting
                x0, y0 = cx, cy
                coords = [float(tokens[i + j]) for j in range(6)]
                if relative:
                    x1, y1 = x0 + coords[0], y0 + coords[1]
                    x2, y2 = x0 + coords[2], y0 + coords[3]
                    x3, y3 = x0 + coords[4], y0 + coords[5]
                else:
                    x1, y1 = coords[0], coords[1]
                    x2, y2 = coords[2], coords[3]
                    x3, y3 = coords[4], coords[5]
                # Sample 4 points along the bezier
                for t_val in (0.25, 0.5, 0.75, 1.0):
                    u = 1 - t_val
                    px = u**3*x0 + 3*u**2*t_val*x1 + 3*u*t_val**2*x2 + t_val**3*x3
                    py = u**3*y0 + 3*u**2*t_val*y1 + 3*u*t_val**2*y2 + t_val**3*y3
                    points.append((px, py))
                cx, cy = x3, y3
                i += 6
        elif t in ('Q', 'q'):
            relative = t.islower()
            i += 1
            while i + 3 < len(tokens) and tokens[i] not in 'MmLlHhVvCcSsQqTtAaZz':
                x0, y0 = cx, cy
                coords = [float(tokens[i + j]) for j in range(4)]
                if relative:
                    x1, y1 = x0 + coords[0], y0 + coords[1]
                    x2, y2 = x0 + coords[2], y0 + coords[3]
                else:
                    x1, y1 = coords[0], coords[1]
                    x2, y2 = coords[2], coords[3]
                for t_val in (0.33, 0.67, 1.0):
                    u = 1 - t_val
                    px = u**2*x0 + 2*u*t_val*x1 + t_val**2*x2
                    py = u**2*y0 + 2*u*t_val*y1 + t_val**2*y2
                    points.append((px, py))
                cx, cy = x2, y2
                i += 4
        elif t in ('H', 'h'):
            relative = t.islower()
            i += 1
            while i < len(tokens) and tokens[i] not in 'MmLlHhVvCcSsQqTtAaZz':
                x = float(tokens[i])
                cx = cx + x if relative else x
                points.append((cx, cy))
                i += 1
        elif t in ('V', 'v'):
            relative = t.islower()
            i += 1
            while i < len(tokens) and tokens[i] not in 'MmLlHhVvCcSsQqTtAaZz':
                y = float(tokens[i])
                cy = cy + y if relative else y
                points.append((cx, cy))
                i += 1
        elif t in ('Z', 'z'):
            i += 1
        else:
            i += 1
    return points


# ─── SHAPE DETECTION & PRIMITIVES ────────────────────────────────────

def fit_ellipse(points: np.ndarray):
    """Fit an ellipse to 2D points. Returns (cx, cy, rx, ry, angle, error)."""
    if len(points) < 6:
        return None

    x, y = points[:, 0], points[:, 1]

    mx, my = np.mean(x), np.mean(y)
    sx = np.std(x) or 1.0
    sy = np.std(y) or 1.0
    xn = (x - mx) / sx
    yn = (y - my) / sy

    D = np.column_stack([xn**2, xn*yn, yn**2, xn, yn, np.ones_like(xn)])

    try:
        _, _, Vt = np.linalg.svd(D)
        params = Vt[-1]
    except np.linalg.LinAlgError:
        return None

    a, b, c, d, e, f = params
    if b**2 - 4*a*c >= 0:
        return None

    A = a / sx**2
    B = b / (sx * sy)
    C = c / sy**2
    D2 = d / sx - 2*a*mx/sx**2 - b*my/(sx*sy)
    E2 = e / sy - 2*c*my/sy**2 - b*mx/(sx*sy)
    F2 = f + a*mx**2/sx**2 + b*mx*my/(sx*sy) + c*my**2/sy**2 - d*mx/sx - e*my/sy

    denom = 4*A*C - B**2
    if abs(denom) < 1e-10:
        return None
    cx = (B*E2 - 2*C*D2) / denom
    cy = (B*D2 - 2*A*E2) / denom

    angle = 0.5 * math.atan2(B, A - C)
    cos_a, sin_a = math.cos(angle), math.sin(angle)
    num = -(A*cx**2 + B*cx*cy + C*cy**2 + D2*cx + E2*cy + F2)
    a_denom = A*cos_a**2 + B*cos_a*sin_a + C*sin_a**2
    b_denom = A*sin_a**2 - B*cos_a*sin_a + C*cos_a**2

    if a_denom <= 0 or b_denom <= 0 or num <= 0:
        return None

    rx = math.sqrt(num / a_denom)
    ry = math.sqrt(num / b_denom)
    if rx < 1 or ry < 1:
        return None

    dx = x - cx
    dy = y - cy
    local_x = dx * cos_a + dy * sin_a
    local_y = -dx * sin_a + dy * cos_a
    r_ellipse = np.sqrt((local_x / rx)**2 + (local_y / ry)**2)
    error = np.mean(np.abs(r_ellipse - 1.0))

    return (cx, cy, rx, ry, angle, error)


def is_closed_path(points: list, threshold_ratio: float = 0.15) -> bool:
    if len(points) < 4:
        return False
    pts = np.array(points)
    bbox_size = max(np.ptp(pts[:, 0]), np.ptp(pts[:, 1]), 1.0)
    dist = np.hypot(pts[0, 0] - pts[-1, 0], pts[0, 1] - pts[-1, 1])
    return dist < bbox_size * threshold_ratio


def ellipse_to_svg_path(cx, cy, rx, ry, angle):
    """Perfect ellipse as two SVG arcs."""
    cos_a, sin_a = math.cos(angle), math.sin(angle)
    sx = cx + rx * cos_a
    sy = cy + rx * sin_a
    ex = cx - rx * cos_a
    ey = cy - rx * sin_a
    angle_deg = math.degrees(angle)
    return (
        f"M {sx:.1f} {sy:.1f} "
        f"A {rx:.1f} {ry:.1f} {angle_deg:.1f} 1 1 {ex:.1f} {ey:.1f} "
        f"A {rx:.1f} {ry:.1f} {angle_deg:.1f} 1 1 {sx:.1f} {sy:.1f} Z"
    )


def fit_arc(points: np.ndarray):
    """Fit a circular arc to an open set of points.

    Returns (cx, cy, r, start_angle, end_angle, error) or None.
    """
    if len(points) < 4:
        return None

    x, y = points[:, 0], points[:, 1]

    # Fit circle using least-squares: minimize (x-cx)²+(y-cy)²-r²
    def residuals(params):
        cx, cy, r = params
        return np.sqrt((x - cx)**2 + (y - cy)**2) - r

    x0 = [np.mean(x), np.mean(y), np.std(x)]
    try:
        result = least_squares(residuals, x0, max_nfev=200)
    except Exception:
        return None

    cx, cy, r = result.x
    if r < 2:
        return None

    # Error as fraction of radius
    error = np.mean(np.abs(result.fun)) / r

    # Compute angular span
    angles = np.arctan2(y - cy, x - cx)
    start = angles[0]
    end = angles[-1]

    return (cx, cy, abs(r), start, end, error)


def arc_to_svg_path(cx, cy, r, start, end):
    """Circular arc as SVG path."""
    sx = cx + r * math.cos(start)
    sy = cy + r * math.sin(start)
    ex = cx + r * math.cos(end)
    ey = cy + r * math.sin(end)

    # Determine sweep direction and large-arc flag
    diff = (end - start) % (2 * math.pi)
    large_arc = 1 if diff > math.pi else 0
    sweep = 1

    return f"M {sx:.1f} {sy:.1f} A {r:.1f} {r:.1f} 0 {large_arc} {sweep} {ex:.1f} {ey:.1f}"


def fit_line(points: np.ndarray):
    """Check if points lie approximately on a straight line.

    Returns (start, end, error) or None.
    """
    if len(points) < 2:
        return None

    start = points[0]
    end = points[-1]
    seg_len = np.hypot(end[0] - start[0], end[1] - start[1])
    if seg_len < 2:
        return None

    # Distance of each point from the line start→end
    dx, dy = end[0] - start[0], end[1] - start[1]
    # Perpendicular distance
    dists = np.abs(dx * (start[1] - points[:, 1]) - dy * (start[0] - points[:, 0])) / seg_len
    error = np.mean(dists) / seg_len

    return (start, end, error)


def angular_coverage(points: np.ndarray, cx: float, cy: float) -> float:
    """What fraction of the full 360° around (cx,cy) is covered by the points.

    A real circle/ellipse covers ~100%. A crescent or arc covers much less.
    """
    angles = np.arctan2(points[:, 1] - cy, points[:, 0] - cx)
    # Bin into 36 sectors of 10° each
    bins = np.zeros(36, dtype=bool)
    for a in angles:
        idx = int(((a + math.pi) / (2 * math.pi)) * 36) % 36
        bins[idx] = True
    return bins.sum() / 36.0


def path_bbox_size(pts: np.ndarray) -> tuple:
    """Return (width, height) of the path bounding box."""
    return (np.ptp(pts[:, 0]), np.ptp(pts[:, 1]))


def fit_thick_curve(pts: np.ndarray, threshold: float = 0.15):
    """Detect if a closed shape is a thick curve (band/stroke shape).

    Approach: compute the medial axis by pairing boundary points on opposite
    sides of the shape. If the resulting centerline is smooth (fits a circular
    arc or bezier well), it's a thick curve primitive.

    Returns (centerline_points, avg_width, arc_fit) or None.
    """
    n = len(pts)
    if n < 8:
        return None

    # Find the two points farthest apart — these define the "ends" of the band
    max_dist = 0
    i_max, j_max = 0, 0
    # Use a subset for O(n²) distance check
    step = max(1, n // 60)
    subset_idx = list(range(0, n, step))
    for ii, i in enumerate(subset_idx):
        for j in subset_idx[ii+1:]:
            d = np.hypot(pts[i, 0] - pts[j, 0], pts[i, 1] - pts[j, 1])
            if d > max_dist:
                max_dist, i_max, j_max = d, i, j

    if max_dist < 5:
        return None

    # Split boundary into two sides at the farthest points
    if i_max > j_max:
        i_max, j_max = j_max, i_max

    side1 = pts[i_max:j_max+1]
    side2 = np.concatenate([pts[j_max:], pts[:i_max+1]])
    side2 = side2[::-1]  # reverse so both sides go same direction

    if len(side1) < 3 or len(side2) < 3:
        return None

    # Compute centerline by averaging matched points from both sides
    n_center = min(len(side1), len(side2), 20)
    idx1 = np.linspace(0, len(side1) - 1, n_center).astype(int)
    idx2 = np.linspace(0, len(side2) - 1, n_center).astype(int)
    center = (side1[idx1] + side2[idx2]) / 2

    # Compute average width (distance between paired points)
    widths = np.sqrt(np.sum((side1[idx1] - side2[idx2])**2, axis=1))
    avg_width = np.mean(widths)
    width_variation = np.std(widths) / (avg_width + 1e-6)

    # Check the shape is actually band-like (length >> width)
    centerline_len = np.sum(np.sqrt(np.sum(np.diff(center, axis=0)**2, axis=1)))
    if centerline_len < avg_width * 1.5:
        return None  # too fat, more like a blob

    # Width should be somewhat consistent (not wildly varying)
    if width_variation > 0.6:
        return None

    # Try to fit the centerline to a circular arc
    arc = fit_arc(center)
    if arc is not None:
        _, _, _, _, _, error = arc
        if error < threshold:
            return (center, avg_width, arc)

    # Even if not a perfect arc, if the centerline is smooth, accept as a bezier stroke
    # Check smoothness by looking at angle changes
    diffs = np.diff(center, axis=0)
    angles = np.arctan2(diffs[:, 1], diffs[:, 0])
    if len(angles) >= 2:
        angle_changes = np.abs(np.diff(angles))
        angle_changes = np.minimum(angle_changes, 2 * np.pi - angle_changes)
        max_turn = np.max(angle_changes)
        if max_turn < math.pi * 0.5:  # no sudden sharp turns
            return (center, avg_width, None)  # smooth bezier, no arc

    return None


def centerline_to_svg(center: np.ndarray, width: float, arc_fit=None) -> str:
    """Convert a centerline + width into an SVG path with stroke-width.

    Returns the path as a filled shape by offsetting the centerline by ±width/2.
    """
    if arc_fit is not None:
        cx, cy, r, start, end, _ = arc_fit
        # Create thick arc as two concentric arcs
        r_inner = max(1, r - width / 2)
        r_outer = r + width / 2

        s_out_x = cx + r_outer * math.cos(start)
        s_out_y = cy + r_outer * math.sin(start)
        e_out_x = cx + r_outer * math.cos(end)
        e_out_y = cy + r_outer * math.sin(end)
        e_in_x = cx + r_inner * math.cos(end)
        e_in_y = cy + r_inner * math.sin(end)
        s_in_x = cx + r_inner * math.cos(start)
        s_in_y = cy + r_inner * math.sin(start)

        diff = (end - start) % (2 * math.pi)
        large = 1 if diff > math.pi else 0

        return (
            f"M {s_out_x:.1f} {s_out_y:.1f} "
            f"A {r_outer:.1f} {r_outer:.1f} 0 {large} 1 {e_out_x:.1f} {e_out_y:.1f} "
            f"L {e_in_x:.1f} {e_in_y:.1f} "
            f"A {r_inner:.1f} {r_inner:.1f} 0 {large} 0 {s_in_x:.1f} {s_in_y:.1f} Z"
        )

    # Bezier stroke: offset centerline by ±width/2 perpendicular
    hw = width / 2
    n = len(center)
    top = []
    bot = []
    for i in range(n):
        if i == 0:
            dx, dy = center[1] - center[0]
        elif i == n - 1:
            dx, dy = center[-1] - center[-2]
        else:
            dx, dy = center[i+1] - center[i-1]
        length = math.hypot(dx, dy) or 1
        nx, ny = -dy / length, dx / length
        top.append((center[i, 0] + nx * hw, center[i, 1] + ny * hw))
        bot.append((center[i, 0] - nx * hw, center[i, 1] - ny * hw))

    bot.reverse()
    all_pts = top + bot

    # Build smooth path through offset points
    d = f"M {all_pts[0][0]:.1f} {all_pts[0][1]:.1f}"
    for i in range(1, len(all_pts)):
        d += f" L {all_pts[i][0]:.1f} {all_pts[i][1]:.1f}"
    d += " Z"
    return d


def primitivize_path(path: dict, threshold: float = 0.15, img_w: float = 1024, img_h: float = 1024):
    """Try to match path to a geometric primitive. Returns new path or None to discard.

    Primitive types:
    - circle/ellipse: closed shape that fits an ellipse well
    - thick-arc: closed band shape whose centerline is a circular arc
    - thick-curve: closed band shape whose centerline is a smooth bezier
    - line: points on a straight line
    - arc: open points on a circular arc
    """
    d = path['d']
    points = parse_svg_path_points(d)

    if len(points) < 2:
        return None

    pts = np.array(points, dtype=float)
    bbox_w, bbox_h = path_bbox_size(pts)
    closed = is_closed_path(points)
    max_span = max(bbox_w, bbox_h)

    # ── Closed shapes ──
    if closed and len(pts) >= 6:
        # Try circle/ellipse first
        fit = fit_ellipse(pts)
        if fit is not None:
            cx, cy, rx, ry, angle, error = fit

            if error < threshold:
                ratio = min(rx, ry) / max(rx, ry)
                coverage = angular_coverage(pts, cx, cy)
                fit_size = max(rx, ry) * 2

                # Valid ellipse: good coverage, reasonable ratio, size matches bbox
                if coverage > 0.5 and ratio > 0.25 and fit_size < max_span * 2.0:
                    if ratio > 0.85:
                        r = (rx + ry) / 2
                        new_d = ellipse_to_svg_path(cx, cy, r, r, 0)
                        return {**path, 'd': new_d, 'primitive': 'circle'}
                    else:
                        new_d = ellipse_to_svg_path(cx, cy, rx, ry, angle)
                        return {**path, 'd': new_d, 'primitive': 'ellipse'}

        # Not an ellipse — try thick curve (band/stroke shape)
        thick = fit_thick_curve(pts, threshold)
        if thick is not None:
            center, avg_width, arc_fit = thick
            new_d = centerline_to_svg(center, avg_width, arc_fit)
            ptype = 'thick-arc' if arc_fit else 'thick-curve'
            return {**path, 'd': new_d, 'primitive': ptype}

        # Nothing matched — discard
        return None

    # ── Open shapes: try line, then arc ──
    line = fit_line(pts)
    if line is not None:
        start, end, error = line
        if error < threshold * 0.3:
            new_d = f"M {start[0]:.1f} {start[1]:.1f} L {end[0]:.1f} {end[1]:.1f}"
            return {**path, 'd': new_d, 'primitive': 'line'}

    arc = fit_arc(pts)
    if arc is not None:
        cx, cy, r, start_a, end_a, error = arc
        if error < threshold * 0.7:
            new_d = arc_to_svg_path(cx, cy, r, start_a, end_a)
            return {**path, 'd': new_d, 'primitive': 'arc'}

    return None


def primitivize_paths(paths: list, threshold: float = 0.15, img_w: float = 1024, img_h: float = 1024) -> list:
    """Strict primitivization: only keep paths that match geometric primitives."""
    result = []
    for p in paths:
        prim = primitivize_path(p, threshold, img_w, img_h)
        if prim is not None:
            result.append(prim)
    return result


# ─── SERVER ──────────────────────────────────────────────────────────

class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True


class RiggerHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='public', **kwargs)

    def do_POST(self):
        if self.path == '/api/convert':
            self._handle_convert()
        elif self.path == '/api/primitivize':
            self._handle_primitivize()
        else:
            self.send_error(404)

    def _handle_convert(self):
        try:
            body = self.rfile.read(int(self.headers['Content-Length']))
            data = json.loads(body)
            img_data = base64.b64decode(data['image'].split(',')[1])

            num_colors = int(data.get('color_precision', 6))
            smooth = int(data.get('smooth', 5))
            img_data = preprocess_image(img_data, num_colors=num_colors, smooth=smooth)

            with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as f:
                f.write(img_data)
                inp = f.name
            out = inp + '.svg'

            vtracer.convert_image_to_svg_py(
                inp, out,
                colormode='color',
                hierarchical=data.get('hierarchical', 'stacked'),
                mode=data.get('mode', 'spline'),
                filter_speckle=int(data.get('filter_speckle', 8)),
                color_precision=int(data.get('color_precision', 6)),
                layer_difference=int(data.get('layer_difference', 16)),
                corner_threshold=int(data.get('corner_threshold', 120)),
                length_threshold=float(data.get('length_threshold', 3.0)),
                max_iterations=int(data.get('max_iterations', 10)),
                splice_threshold=int(data.get('splice_threshold', 45)),
                path_precision=int(data.get('path_precision', 3)),
            )

            with open(out, 'r') as f:
                svg = f.read()
            os.unlink(inp)
            os.unlink(out)

            paths = []
            for m in re.finditer(
                r'<path d="([^"]*)" fill="([^"]*)" transform="translate\(([^)]*)\)"/>', svg
            ):
                d, fill, t = m.groups()
                tx, ty = t.split(',')
                paths.append({'d': d, 'fill': fill, 'tx': float(tx), 'ty': float(ty)})

            vb = re.search(r'width="([\d.]+)" height="([\d.]+)"', svg)
            w = float(vb.group(1)) if vb else 1024
            h = float(vb.group(2)) if vb else 1024

            if paths and paths[0]['fill'].upper() in ('#FDFDFD', '#FEFEFE', '#FFFFFF', '#FCFCFC'):
                paths = paths[1:]

            self._json_response({'paths': paths, 'width': w, 'height': h})
        except Exception as e:
            self._json_error(str(e))

    def _handle_primitivize(self):
        try:
            body = self.rfile.read(int(self.headers['Content-Length']))
            data = json.loads(body)
            paths = data['paths']
            threshold = float(data.get('threshold', 0.15))
            img_w = float(data.get('width', 1024))
            img_h = float(data.get('height', 1024))
            result = primitivize_paths(paths, threshold, img_w, img_h)
            self._json_response({'paths': result})
        except Exception as e:
            self._json_error(str(e))

    def _json_response(self, obj):
        resp = json.dumps(obj).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(resp)

    def _json_error(self, msg):
        self.send_response(500)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({'error': msg}).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()


if __name__ == '__main__':
    PORT = 4444
    with ThreadedHTTPServer(('', PORT), RiggerHandler) as s:
        print(f'Character Rigger: http://localhost:{PORT}/character-rigger.html')
        s.serve_forever()
