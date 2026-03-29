// SVG diagram animation helpers
// Each function returns an SVG animation element string to embed inside a parent element,
// or a wrapping <g> with animateTransform.

/** Pulsing glow animation on a circle (embed inside <circle>) */
export function pulseGlow(baseR: number, maxR: number, dur = 3): string {
  return `<animate attributeName="r" values="${baseR};${maxR};${baseR}" dur="${dur}s" repeatCount="indefinite"/>`;
}

/** Orbital rotation around a center point. Returns an animateTransform element. */
export function orbitAnim(cx: number, cy: number, dur = 10, reverse = false): string {
  const from = reverse ? 360 : 0;
  const to = reverse ? 0 : 360;
  return `<animateTransform attributeName="transform" type="rotate" from="${from} ${cx} ${cy}" to="${to} ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>`;
}

/** Twinkle opacity animation (embed inside element) */
export function twinkleAnim(minOpacity = 0.3, maxOpacity = 1, dur = 3): string {
  return `<animate attributeName="opacity" values="${maxOpacity};${minOpacity};${maxOpacity}" dur="${dur}s" repeatCount="indefinite"/>`;
}

/** Fade-in animation (embed inside element) */
export function fadeIn(delay = 0, dur = 1): string {
  return `<animate attributeName="opacity" from="0" to="1" dur="${dur}s" begin="${delay}s" fill="freeze"/>`;
}

/** Horizontal movement animation (embed inside element) */
export function moveHorizontal(startX: number, endX: number, dur = 5): string {
  return `<animateTransform attributeName="transform" type="translate" values="${startX} 0;${endX} 0;${startX} 0" dur="${dur}s" repeatCount="indefinite"/>`;
}

/** Animated light particles moving between two points. Returns a group of animated dots. */
export function lightParticles(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  count = 3,
  dur = 4
): string {
  const particles: string[] = [];
  for (let i = 0; i < count; i++) {
    const delay = (dur / count) * i;
    const r = 1.2 - i * 0.2;
    const opacity = 0.8 - i * 0.15;
    particles.push(
      `<circle r="${r.toFixed(1)}" fill="white" opacity="${opacity.toFixed(2)}">` +
      `<animate attributeName="cx" from="${x1}" to="${x2}" dur="${dur}s" begin="${delay.toFixed(1)}s" repeatCount="indefinite"/>` +
      `<animate attributeName="cy" from="${y1}" to="${y2}" dur="${dur}s" begin="${delay.toFixed(1)}s" repeatCount="indefinite"/>` +
      `<animate attributeName="opacity" values="0;${opacity.toFixed(2)};${opacity.toFixed(2)};0" dur="${dur}s" begin="${delay.toFixed(1)}s" repeatCount="indefinite"/>` +
      `</circle>`
    );
  }
  return `<g>${particles.join('')}</g>`;
}
