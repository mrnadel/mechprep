// SVG diagram definitions: gradients and filters

/** Radial glow gradient (for Sun, stars, generic glows) */
export function glowGradient(
  id: string,
  color: string,
  innerOpacity = 1,
  outerOpacity = 0
): string {
  return (
    `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">` +
    `<stop offset="0%" stop-color="${color}" stop-opacity="${innerOpacity}"/>` +
    `<stop offset="100%" stop-color="${color}" stop-opacity="${outerOpacity}"/>` +
    `</radialGradient>`
  );
}

/** Sun-specific multi-stop gradient (core white to golden to transparent) */
export function sunGradient(id: string): string {
  return (
    `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">` +
    `<stop offset="0%" stop-color="#FFF5D6" stop-opacity="1"/>` +
    `<stop offset="30%" stop-color="#FFD166" stop-opacity="1"/>` +
    `<stop offset="65%" stop-color="#FF9F1C" stop-opacity="0.8"/>` +
    `<stop offset="100%" stop-color="#FF6B00" stop-opacity="0"/>` +
    `</radialGradient>`
  );
}

/** Earth atmosphere glow gradient */
export function earthGlow(id: string): string {
  return (
    `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">` +
    `<stop offset="0%" stop-color="#4DA6FF" stop-opacity="0"/>` +
    `<stop offset="70%" stop-color="#4DA6FF" stop-opacity="0"/>` +
    `<stop offset="85%" stop-color="#87CEEB" stop-opacity="0.3"/>` +
    `<stop offset="100%" stop-color="#87CEEB" stop-opacity="0"/>` +
    `</radialGradient>`
  );
}

/** Linear gradient for atmosphere bands */
export function atmosphereGradient(
  id: string,
  color: string,
  direction: 'up' | 'down' = 'up'
): string {
  const y1 = direction === 'up' ? '100%' : '0%';
  const y2 = direction === 'up' ? '0%' : '100%';
  return (
    `<linearGradient id="${id}" x1="0%" y1="${y1}" x2="0%" y2="${y2}">` +
    `<stop offset="0%" stop-color="${color}" stop-opacity="0.4"/>` +
    `<stop offset="100%" stop-color="${color}" stop-opacity="0"/>` +
    `</linearGradient>`
  );
}

/** Galaxy spiral gradient */
export function galaxyGradient(id: string): string {
  return (
    `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">` +
    `<stop offset="0%" stop-color="#C4B5FD" stop-opacity="1"/>` +
    `<stop offset="40%" stop-color="#818CF8" stop-opacity="0.6"/>` +
    `<stop offset="70%" stop-color="#6366F1" stop-opacity="0.3"/>` +
    `<stop offset="100%" stop-color="#4F46E5" stop-opacity="0"/>` +
    `</radialGradient>`
  );
}

/** Blur filter for soft glow effects */
export function blurFilter(id: string, stdDev = 4): string {
  return (
    `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%">` +
    `<feGaussianBlur stdDeviation="${stdDev}"/>` +
    `</filter>`
  );
}
