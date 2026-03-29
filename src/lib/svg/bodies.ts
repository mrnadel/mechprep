// SVG diagram celestial bodies

import { sunGradient, glowGradient, earthGlow, galaxyGradient, blurFilter } from './defs';

/** Golden Sun with glow */
export function sun(
  cx: number,
  cy: number,
  r: number,
  id: string
): { defs: string; body: string } {
  const gradId = `${id}-sun-grad`;
  const glowId = `${id}-sun-glow`;
  const filterId = `${id}-sun-blur`;
  const glowR = r * 1.8;

  const defs = [
    sunGradient(gradId),
    glowGradient(glowId, '#FFD166', 0.4, 0),
    blurFilter(filterId, r * 0.3),
  ].join('');

  const body = [
    // Outer glow
    `<circle cx="${cx}" cy="${cy}" r="${glowR}" fill="url(#${glowId})" filter="url(#${filterId})"/>`,
    // Sun body
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${gradId})"/>`,
    // Bright core
    `<circle cx="${cx}" cy="${cy}" r="${r * 0.35}" fill="#FFF5D6" opacity="0.6"/>`,
  ].join('');

  return { defs, body };
}

/** Blue-green Earth with continent shapes */
export function earth(
  cx: number,
  cy: number,
  r: number,
  id: string
): { defs: string; body: string } {
  const oceanId = `${id}-earth-ocean`;
  const glowId = `${id}-earth-glow`;
  const clipId = `${id}-earth-clip`;

  const defs = [
    glowGradient(oceanId, '#4DA6FF'),
    earthGlow(glowId),
    `<clipPath id="${clipId}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>`,
  ].join('');

  // Simplified continent shapes clipped to Earth circle
  const continentColor = '#58CC02';
  const body = [
    // Atmosphere glow
    `<circle cx="${cx}" cy="${cy}" r="${r * 1.25}" fill="url(#${glowId})"/>`,
    // Ocean
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1E6091"/>`,
    // Continents (simplified blobs clipped to the sphere)
    `<g clip-path="url(#${clipId})">`,
    `<ellipse cx="${cx - r * 0.2}" cy="${cy - r * 0.25}" rx="${r * 0.35}" ry="${r * 0.25}" fill="${continentColor}" opacity="0.8"/>`,
    `<ellipse cx="${cx + r * 0.3}" cy="${cy - r * 0.1}" rx="${r * 0.2}" ry="${r * 0.35}" fill="${continentColor}" opacity="0.8"/>`,
    `<ellipse cx="${cx - r * 0.1}" cy="${cy + r * 0.35}" rx="${r * 0.25}" ry="${r * 0.15}" fill="${continentColor}" opacity="0.8"/>`,
    `<ellipse cx="${cx + r * 0.25}" cy="${cy + r * 0.3}" rx="${r * 0.15}" ry="${r * 0.12}" fill="${continentColor}" opacity="0.7"/>`,
    `</g>`,
    // Specular highlight
    `<ellipse cx="${cx - r * 0.25}" cy="${cy - r * 0.25}" rx="${r * 0.35}" ry="${r * 0.25}" fill="white" opacity="0.08"/>`,
  ].join('');

  return { defs, body };
}

/** Moon (crescent, full, or new) */
export function moon(
  cx: number,
  cy: number,
  r: number,
  opts?: { phase?: 'full' | 'crescent' | 'new' }
): string {
  const phase = opts?.phase ?? 'full';

  if (phase === 'new') {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1a1a2e" stroke="#333" stroke-width="0.5"/>`;
  }

  if (phase === 'crescent') {
    // Crescent: draw full moon then overlay a dark circle offset to the right
    const offset = r * 0.55;
    return [
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#E8E8E0"/>`,
      `<circle cx="${cx + offset}" cy="${cy}" r="${r * 0.9}" fill="#0B1026"/>`,
      // Subtle craters on visible part
      `<circle cx="${cx - r * 0.3}" cy="${cy - r * 0.2}" r="${r * 0.08}" fill="#CCCCC0" opacity="0.5"/>`,
      `<circle cx="${cx - r * 0.15}" cy="${cy + r * 0.3}" r="${r * 0.06}" fill="#CCCCC0" opacity="0.4"/>`,
    ].join('');
  }

  // Full moon
  return [
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#E8E8E0"/>`,
    // Crater details
    `<circle cx="${cx - r * 0.25}" cy="${cy - r * 0.15}" r="${r * 0.1}" fill="#D4D4C8" opacity="0.6"/>`,
    `<circle cx="${cx + r * 0.2}" cy="${cy + r * 0.25}" r="${r * 0.12}" fill="#D4D4C8" opacity="0.5"/>`,
    `<circle cx="${cx + r * 0.05}" cy="${cy - r * 0.35}" r="${r * 0.07}" fill="#D4D4C8" opacity="0.4"/>`,
    `<circle cx="${cx - r * 0.15}" cy="${cy + r * 0.3}" r="${r * 0.06}" fill="#D4D4C8" opacity="0.5"/>`,
  ].join('');
}

/** Generic planet (solid color circle with highlight) */
export function planet(
  cx: number,
  cy: number,
  r: number,
  color: string
): string {
  return [
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`,
    `<ellipse cx="${cx - r * 0.2}" cy="${cy - r * 0.2}" rx="${r * 0.4}" ry="${r * 0.3}" fill="white" opacity="0.08"/>`,
  ].join('');
}

/** Saturn with rings */
export function saturn(
  cx: number,
  cy: number,
  r: number,
  color = '#E8B86D'
): string {
  const ringW = r * 2.2;
  const ringH = r * 0.5;
  return [
    // Ring behind planet
    `<ellipse cx="${cx}" cy="${cy}" rx="${ringW}" ry="${ringH}" fill="none" stroke="${color}" stroke-opacity="0.4" stroke-width="${r * 0.12}"/>`,
    // Planet body
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`,
    // Band detail
    `<ellipse cx="${cx}" cy="${cy + r * 0.1}" rx="${r * 0.95}" ry="${r * 0.15}" fill="#D4A057" opacity="0.4"/>`,
    // Specular
    `<ellipse cx="${cx - r * 0.2}" cy="${cy - r * 0.2}" rx="${r * 0.35}" ry="${r * 0.25}" fill="white" opacity="0.08"/>`,
    // Ring in front (upper arc clipped by planet)
    `<ellipse cx="${cx}" cy="${cy}" rx="${ringW}" ry="${ringH}" fill="none" stroke="${color}" stroke-opacity="0.25" stroke-width="${r * 0.08}" stroke-dasharray="${ringW * 0.5} ${ringW * 3}"/>`,
  ].join('');
}

/** Bright star dot */
export function starDot(
  cx: number,
  cy: number,
  r: number,
  opts?: { color?: string; opacity?: number; twinkle?: boolean; dur?: number }
): string {
  const color = opts?.color ?? 'white';
  const opacity = opts?.opacity ?? 1;
  const parts: string[] = [
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity}">`,
  ];

  if (opts?.twinkle) {
    const dur = opts.dur ?? 3;
    parts.push(
      `<animate attributeName="opacity" values="${opacity};${opacity * 0.3};${opacity}" dur="${dur}s" repeatCount="indefinite"/>`
    );
  }

  parts.push('</circle>');
  return parts.join('');
}

/** Spiral galaxy shape */
export function galaxy(
  cx: number,
  cy: number,
  r: number,
  id: string
): { defs: string; body: string } {
  const gradId = `${id}-galaxy-grad`;
  const filterId = `${id}-galaxy-blur`;

  const defs = [galaxyGradient(gradId), blurFilter(filterId, r * 0.15)].join('');

  // Build spiral arms using small ellipses
  const arms: string[] = [];
  const armCount = 3;
  for (let a = 0; a < armCount; a++) {
    const baseAngle = (a * Math.PI * 2) / armCount;
    for (let i = 0; i < 8; i++) {
      const t = i / 8;
      const angle = baseAngle + t * Math.PI * 1.2;
      const dist = r * 0.15 + t * r * 0.75;
      const dotR = r * (0.12 - t * 0.08);
      const dotCx = (cx + Math.cos(angle) * dist).toFixed(1);
      const dotCy = (cy + Math.sin(angle) * dist * 0.5).toFixed(1);
      const opacity = (0.8 - t * 0.5).toFixed(2);
      arms.push(
        `<ellipse cx="${dotCx}" cy="${dotCy}" rx="${dotR.toFixed(1)}" ry="${(dotR * 0.6).toFixed(1)}" fill="#818CF8" opacity="${opacity}"/>`
      );
    }
  }

  const body = [
    // Outer glow
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${gradId})" filter="url(#${filterId})"/>`,
    // Core
    `<circle cx="${cx}" cy="${cy}" r="${r * 0.15}" fill="#C4B5FD" opacity="0.9"/>`,
    // Spiral arms
    ...arms,
  ].join('');

  return { defs, body };
}
