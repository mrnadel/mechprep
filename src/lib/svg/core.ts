// SVG diagram core: wrapper and backgrounds

/** Wrap SVG fragments into a complete <svg> element */
export function makeSvg(w: number, h: number, defs: string, body: string): string {
  const defsBlock = defs ? `<defs>${defs}</defs>` : '';
  return `<svg viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">${defsBlock}${body}</svg>`;
}

/** Dark space background rect */
export function darkBg(w = 400, h = 250): string {
  return `<rect width="${w}" height="${h}" rx="10" fill="#0B1026"/>`;
}

/** Simple seeded PRNG (Lehmer / Park-Miller) */
function seededRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Generate n deterministic background star dots */
export function starField(n: number, w = 400, h = 250, seed = 1): string {
  const rand = seededRandom(seed);
  const stars: string[] = [];
  for (let i = 0; i < n; i++) {
    const cx = Math.round(rand() * w * 10) / 10;
    const cy = Math.round(rand() * h * 10) / 10;
    const r = 0.3 + rand() * 1.2;
    const opacity = 0.3 + rand() * 0.7;
    stars.push(
      `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="white" opacity="${opacity.toFixed(2)}"/>`
    );
  }
  return stars.join('');
}
