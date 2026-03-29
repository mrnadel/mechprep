// SVG diagram non-celestial elements

/** Dashed orbit ring */
export function orbitRing(
  cx: number,
  cy: number,
  r: number,
  opts?: { opacity?: number; color?: string }
): string {
  const color = opts?.color ?? 'white';
  const opacity = opts?.opacity ?? 0.15;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1" stroke-dasharray="6 4"/>`;
}

/** Text label, always Nunito font */
export function label(
  x: number,
  y: number,
  text: string,
  opts?: {
    size?: number;
    color?: string;
    opacity?: number;
    anchor?: string;
    weight?: string;
  }
): string {
  const size = opts?.size ?? 16;
  const color = opts?.color ?? 'white';
  const opacity = opts?.opacity ?? 0.7;
  const anchor = opts?.anchor ?? 'middle';
  const weight = opts?.weight ?? '600';
  return `<text x="${x}" y="${y}" font-family="Nunito, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" opacity="${opacity}" text-anchor="${anchor}">${text}</text>`;
}

/** Dashed line between two points */
export function dashedLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts?: { color?: string; opacity?: number }
): string {
  const color = opts?.color ?? 'white';
  const opacity = opts?.opacity ?? 0.3;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1" stroke-dasharray="5 3"/>`;
}

/** Hill/landscape silhouette at the bottom of a scene */
export function hillSilhouette(w = 400, h = 250, groundY = 210): string {
  const midX = w / 2;
  const hillH = h - groundY;
  return [
    `<path d="M0 ${h} `,
    `L0 ${groundY + hillH * 0.3} `,
    `Q${midX * 0.3} ${groundY - hillH * 0.5} ${midX * 0.6} ${groundY + hillH * 0.1} `,
    `Q${midX * 0.8} ${groundY + hillH * 0.3} ${midX} ${groundY - hillH * 0.3} `,
    `Q${midX * 1.3} ${groundY - hillH * 0.8} ${midX * 1.5} ${groundY + hillH * 0.1} `,
    `Q${midX * 1.7} ${groundY + hillH * 0.4} ${w} ${groundY + hillH * 0.2} `,
    `L${w} ${h} Z" fill="#0D1B2A"/>`,
  ].join('');
}

/** City skyline silhouette with lit window dots */
export function citySkyline(x: number, w: number, groundY: number): string {
  const buildings: string[] = [];
  const windows: string[] = [];

  // Deterministic building generation
  let bx = x;
  let idx = 0;
  while (bx < x + w) {
    const bw = 12 + ((idx * 17 + 7) % 14);
    const bh = 20 + ((idx * 31 + 13) % 40);
    const by = groundY - bh;

    buildings.push(`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#0D1B2A"/>`);

    // Window dots
    const cols = Math.floor(bw / 6);
    const rows = Math.floor(bh / 8);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Pseudo-random: some windows are lit
        const lit = ((idx + r * 3 + c * 7) % 5) < 2;
        if (lit) {
          const wx = bx + 3 + c * 6;
          const wy = by + 4 + r * 8;
          windows.push(
            `<rect x="${wx}" y="${wy}" width="3" height="3" fill="#FFD166" opacity="0.6" rx="0.5"/>`
          );
        }
      }
    }

    bx += bw + 2 + ((idx * 11) % 5);
    idx++;
  }

  return buildings.join('') + windows.join('');
}

/** Person silhouette (standing, looking up) */
export function personSilhouette(
  x: number,
  groundY: number,
  height = 30
): string {
  const headR = height * 0.12;
  const headY = groundY - height + headR;
  const bodyTop = headY + headR + 1;
  const bodyBot = groundY;
  const shoulderW = height * 0.2;

  return [
    // Head
    `<circle cx="${x}" cy="${headY}" r="${headR}" fill="#0D1B2A"/>`,
    // Body (triangle-ish shape)
    `<path d="M${x} ${bodyTop} L${x - shoulderW} ${bodyBot} L${x + shoulderW} ${bodyBot} Z" fill="#0D1B2A"/>`,
  ].join('');
}

/** Meteor streak with bright head */
export function meteorStreak(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts?: { headR?: number }
): string {
  const headR = opts?.headR ?? 2;
  return [
    // Tail (gradient line)
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round"/>`,
    // Bright head
    `<circle cx="${x2}" cy="${y2}" r="${headR}" fill="white" opacity="0.9"/>`,
    // Subtle inner glow
    `<circle cx="${x2}" cy="${y2}" r="${headR * 2.5}" fill="white" opacity="0.15"/>`,
  ].join('');
}

/** Atmosphere band (horizontal glow) at the bottom edge of a scene */
export function atmosphereBand(
  w = 400,
  h = 250,
  bandH = 30
): string {
  const y = h - bandH;
  return [
    `<rect x="0" y="${y}" width="${w}" height="${bandH}" fill="url(#atmo-band)" rx="0"/>`,
    // Inline a simple gradient since we cannot rely on defs being available
    `<rect x="0" y="${y}" width="${w}" height="${bandH}" fill="#4DA6FF" opacity="0.08"/>`,
    `<rect x="0" y="${y}" width="${w}" height="${Math.round(bandH * 0.4)}" fill="#87CEEB" opacity="0.05"/>`,
  ].join('');
}

/** Constellation: connect stars with faint lines */
export function constellation(
  stars: { x: number; y: number; r?: number }[],
  connections: [number, number][],
  opts?: { starColor?: string; lineColor?: string; lineOpacity?: number }
): string {
  const starColor = opts?.starColor ?? 'white';
  const lineColor = opts?.lineColor ?? 'white';
  const lineOpacity = opts?.lineOpacity ?? 0.2;

  const lines = connections.map(([a, b]) => {
    const sa = stars[a];
    const sb = stars[b];
    if (!sa || !sb) return '';
    return `<line x1="${sa.x}" y1="${sa.y}" x2="${sb.x}" y2="${sb.y}" stroke="${lineColor}" stroke-opacity="${lineOpacity}" stroke-width="0.8"/>`;
  });

  const dots = stars.map((s) => {
    const r = s.r ?? 1.5;
    return `<circle cx="${s.x}" cy="${s.y}" r="${r}" fill="${starColor}"/>`;
  });

  return lines.join('') + dots.join('');
}
