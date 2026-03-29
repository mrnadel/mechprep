/**
 * Space-Astronomy course SVG diagrams registry.
 * Maps question IDs to SVG strings built from @/lib/svg primitives.
 */

import {
  makeSvg,
  darkBg,
  starField,
  sun,
  earth,
  moon,
  planet,
  saturn,
  starDot,
  galaxy,
  orbitRing,
  label,
  dashedLine,
  hillSilhouette,
  citySkyline,
  personSilhouette,
  meteorStreak,
  atmosphereBand,
  constellation,
  glowGradient,
  sunGradient,
  earthGlow,
  atmosphereGradient,
  galaxyGradient,
  blurFilter,
  pulseGlow,
  orbitAnim,
  twinkleAnim,
  lightParticles,
} from '@/lib/svg';

// =====================================================================
// LESSON 1: Welcome to the Universe
// =====================================================================

/** L1-T1: Welcome to the Cosmos -- Sun with orbiting Earth */
function buildWelcomeCosmos(): string {
  const s = sun(200, 125, 40, 'l1t1');
  const e = earth(295, 125, 12, 'l1t1');
  const defs = s.defs + e.defs;
  const body =
    darkBg() +
    starField(3) +
    s.body +
    // Pulsing corona
    `<circle cx="200" cy="125" r="44" stroke="#FFE082" stroke-width="0.8" opacity="0.15" fill="none">` +
    pulseGlow(44, 48, 4) +
    `</circle>` +
    orbitRing(200, 125, 95, { opacity: 0.2, color: '#4DA6FF' }) +
    // Orbiting Earth group
    `<g>` +
    `<animateTransform attributeName="transform" type="rotate" from="0 200 125" to="-360 200 125" dur="25s" repeatCount="indefinite"/>` +
    `<g transform="translate(295, 125)">` +
    e.body.replace(/cx="295"/g, 'cx="0"').replace(/cy="125"/g, 'cy="0"') +
    `</g>` +
    `</g>` +
    label(200, 232, '67,000 mph', { color: '#818CF8' });

  // Earth body needs to be at local coords, so we rebuild inline
  const earthLocal =
    `<circle cx="0" cy="0" r="20" fill="url(#l1t1-earth-glow)"/>` +
    `<circle cx="0" cy="0" r="12" fill="#1A73E8"/>` +
    `<circle cx="0" cy="0" r="12" fill="#4DA6FF" opacity="0.3"/>` +
    `<path d="M-6,-8 Q-2,-10 3,-7 Q6,-4 5,-1 Q2,1 -2,0 Q-5,-3 -6,-6Z" fill="#58CC02" opacity="0.5"/>` +
    `<path d="M-4,3 Q0,2 4,5 Q6,8 4,9 Q0,8 -3,6Z" fill="#58CC02" opacity="0.4"/>`;

  const fullBody =
    darkBg() +
    starField(3) +
    s.body +
    `<circle cx="200" cy="125" r="44" stroke="#FFE082" stroke-width="0.8" opacity="0.15" fill="none">` +
    pulseGlow(44, 48, 4) +
    `</circle>` +
    orbitRing(200, 125, 95, { opacity: 0.2, color: '#4DA6FF' }) +
    `<g>` +
    `<animateTransform attributeName="transform" type="rotate" from="0 200 125" to="-360 200 125" dur="25s" repeatCount="indefinite"/>` +
    `<g transform="translate(295, 125)">` +
    earthLocal +
    `</g>` +
    `</g>` +
    label(200, 232, '67,000 mph', { color: '#818CF8' });

  return makeSvg(400, 250, s.defs + earthGlow('l1t1-earth-glow'), fullBody);
}

/** L1-Q2: What is the Sun? -- Sun on left, distant twinkling stars on right */
function buildWhatIsTheSun(): string {
  const s = sun(130, 125, 40, 'l1q2');
  const twinklingStars = [
    { cx: 290, cy: 70, r: 2, dur: 2.5 },
    { cx: 320, cy: 110, r: 1.8, dur: 3 },
    { cx: 340, cy: 150, r: 1.5, dur: 2.8 },
    { cx: 300, cy: 180, r: 1.8, dur: 3.2 },
    { cx: 360, cy: 200, r: 1.5, dur: 2.6 },
  ];
  const starsBody = twinklingStars
    .map(
      (st) =>
        `<circle cx="${st.cx}" cy="${st.cy}" r="${st.r}" fill="white" opacity="0.7">` +
        `<animate attributeName="opacity" values="0.7;0.3;0.7" dur="${st.dur}s" repeatCount="indefinite"/>` +
        `</circle>`
    )
    .join('');

  const body =
    darkBg() +
    starField(2) +
    s.body +
    `<circle cx="130" cy="125" r="44" stroke="#FFE082" stroke-width="1" opacity="0.15" fill="none">` +
    pulseGlow(44, 48, 4) +
    `<animate attributeName="opacity" values="0.15;0.25;0.15" dur="4s" repeatCount="indefinite"/>` +
    `</circle>` +
    dashedLine(220, 30, 220, 220, { color: '#4A5568', opacity: 0.15 }) +
    starsBody;

  return makeSvg(400, 250, s.defs, body);
}

/** L1-T2: You Already Know More -- Planet, Star, Satellite labeled */
function buildYouAlreadyKnow(): string {
  const body =
    darkBg() +
    starField(3) +
    // Planet (steady glow)
    `<circle cx="100" cy="80" r="5" fill="#FFE082" opacity="0.9"/>` +
    `<circle cx="100" cy="80" r="8" fill="#FFE082" opacity="0.15"/>` +
    label(100, 110, 'Planet', { size: 14, color: '#FFE082', opacity: 0.8 }) +
    // Twinkling star
    `<circle cx="250" cy="60" r="3.5" fill="white" opacity="0.9">` +
    twinkleAnim(0.4, 0.9, 1.5) +
    `</circle>` +
    label(250, 90, 'Star', { size: 14 }) +
    // Moving satellite
    `<circle cx="340" cy="140" r="3" fill="#A5B4FC" opacity="0.8">` +
    `<animate attributeName="cx" values="310;370" dur="5s" repeatCount="indefinite"/>` +
    `<animate attributeName="cy" values="145;135" dur="5s" repeatCount="indefinite"/>` +
    `</circle>` +
    `<line x1="310" y1="145" x2="370" y2="135" stroke="#A5B4FC" stroke-width="1" opacity="0.15"/>` +
    label(340, 170, 'Satellite', { size: 14, color: '#A5B4FC' });

  return makeSvg(400, 250, '', body);
}

/** L1-Q3: How many stars visible -- dark sky vs city comparison */
function buildStarsVsCity(): string {
  // Dark sky on left with many stars
  const darkStars: string[] = [];
  const positions = [
    [25, 20], [55, 45], [85, 18], [110, 55], [140, 25], [165, 50],
    [30, 70], [65, 85], [95, 68], [125, 80], [155, 72], [180, 65],
    [40, 100], [75, 110], [100, 95], [135, 105], [170, 98],
    [20, 130], [55, 140], [85, 125], [120, 138], [150, 130], [185, 120],
    [35, 160], [70, 170], [100, 155], [140, 165], [175, 150],
    [45, 185], [80, 195], [115, 180], [155, 190],
  ];
  positions.forEach(([x, y], i) => {
    const r = 0.5 + (i % 4) * 0.15;
    const op = 0.3 + (i % 5) * 0.08;
    darkStars.push(`<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" fill="white" opacity="${op.toFixed(2)}"/>`);
  });

  // City side with buildings and few dim stars
  const cityStars = [
    [250, 55, 0.15], [310, 45, 0.1], [360, 60, 0.1],
    [280, 85, 0.08], [340, 100, 0.1], [240, 110, 0.08],
  ];
  const cityStarsSvg = cityStars
    .map(([x, y, op]) => `<circle cx="${x}" cy="${y}" r="0.8" fill="white" opacity="${op}"/>`)
    .join('');

  const buildings =
    `<rect x="220" y="180" width="22" height="35" fill="#2A1F3D" opacity="0.7"/>` +
    `<rect x="224" y="184" width="5" height="6" fill="#FFD166" opacity="0.25"/>` +
    `<rect x="232" y="184" width="5" height="6" fill="#FFD166" opacity="0.2"/>` +
    `<rect x="224" y="194" width="5" height="6" fill="#FFD166" opacity="0.15"/>` +
    `<rect x="265" y="170" width="30" height="45" fill="#2A1F3D" opacity="0.8"/>` +
    `<rect x="270" y="174" width="6" height="7" fill="#FFD166" opacity="0.3"/>` +
    `<rect x="280" y="174" width="6" height="7" fill="#FFD166" opacity="0.2"/>` +
    `<rect x="270" y="185" width="6" height="7" fill="#FFD166" opacity="0.15"/>` +
    `<rect x="320" y="175" width="25" height="40" fill="#2A1F3D" opacity="0.7"/>` +
    `<rect x="324" y="179" width="5" height="6" fill="#FFD166" opacity="0.25"/>` +
    `<rect x="355" y="165" width="35" height="50" fill="#2A1F3D" opacity="0.8"/>` +
    `<rect x="360" y="169" width="7" height="8" fill="#FFD166" opacity="0.3"/>` +
    `<rect x="371" y="169" width="7" height="8" fill="#FFD166" opacity="0.2"/>` +
    `<rect x="360" y="181" width="7" height="8" fill="#FFD166" opacity="0.15"/>`;

  const body =
    darkBg() +
    `<line x1="200" y1="0" x2="200" y2="250" stroke="#4A5568" stroke-width="0.5" opacity="0.2"/>` +
    darkStars.join('') +
    // City overlay
    `<rect x="200" y="0" width="200" height="250" fill="#1A1530" opacity="0.3"/>` +
    `<rect x="200" y="175" width="200" height="75" fill="#2A1F3D" opacity="0.4"/>` +
    buildings +
    `<circle cx="280" cy="150" r="15" fill="#FFD166" opacity="0.04"/>` +
    `<circle cx="340" cy="145" r="12" fill="#FFD166" opacity="0.03"/>` +
    cityStarsSvg;

  return makeSvg(400, 250, '', body);
}

/** L1-T3: Our Cosmic Address -- animated zoom: Universe > Milky Way > Solar System */
function buildCosmicAddress(): string {
  const defs =
    glowGradient('l1t3-outer', '#C084FC', 0.1, 0) +
    glowGradient('l1t3-mid', '#818CF8', 0.15, 0) +
    glowGradient('l1t3-inner', '#FFD166', 0.5, 0);

  const body =
    darkBg() +
    starField(3) +
    // Universe layer
    `<g opacity="0">` +
    `<animate attributeName="opacity" values="0;0;1;1" dur="5s" repeatCount="indefinite" keyTimes="0;0.05;0.2;1"/>` +
    `<circle cx="200" cy="120" r="110" fill="url(#l1t3-outer)"/>` +
    orbitRing(200, 120, 110, { opacity: 0.2, color: '#C084FC' }) +
    label(200, 240, 'Universe', { color: '#C084FC' }) +
    `</g>` +
    // Milky Way layer
    `<g opacity="0">` +
    `<animate attributeName="opacity" values="0;0;0;1;1" dur="5s" repeatCount="indefinite" keyTimes="0;0.2;0.3;0.5;1"/>` +
    `<circle cx="200" cy="120" r="65" fill="url(#l1t3-mid)"/>` +
    `<ellipse cx="200" cy="120" rx="65" ry="25" stroke="#818CF8" stroke-width="1.2" opacity="0.3" fill="none"/>` +
    `<ellipse cx="200" cy="120" rx="50" ry="18" stroke="#818CF8" stroke-width="0.8" opacity="0.2" fill="none" transform="rotate(-20,200,120)"/>` +
    `<ellipse cx="200" cy="120" rx="55" ry="22" stroke="#818CF8" stroke-width="0.8" opacity="0.2" fill="none" transform="rotate(15,200,120)"/>` +
    label(315, 100, 'Milky Way', { color: '#818CF8', anchor: 'start' }) +
    `</g>` +
    // Solar System layer
    `<g opacity="0">` +
    `<animate attributeName="opacity" values="0;0;0;0;1" dur="5s" repeatCount="indefinite" keyTimes="0;0.45;0.55;0.65;1"/>` +
    `<circle cx="200" cy="120" r="22" fill="url(#l1t3-inner)"/>` +
    `<circle cx="200" cy="120" r="8" fill="#FFD166"/>` +
    orbitRing(200, 120, 20, { opacity: 0.3, color: '#4DA6FF' }) +
    `<circle cx="220" cy="120" r="4" fill="#4DA6FF"/>` +
    label(200, 155, 'Solar System', { color: '#FFD166' }) +
    `</g>`;

  return makeSvg(400, 250, defs, body);
}

/** L1-Q5: What galaxy do we live in? -- Milky Way spiral with blinking "You are here" */
function buildMilkyWayGalaxy(): string {
  const defs =
    glowGradient('l1q5-core', '#FFD166', 0.8, 0) +
    glowGradient('l1q5-disc', '#818CF8', 0.2, 0);

  const spiralArms =
    `<path d="M0,-5 Q55,-55 140,-30 Q155,-18 110,5" stroke="#A78BFA" stroke-width="3" fill="none" opacity="0.3"/>` +
    `<path d="M0,-5 Q-55,-55 -140,-30 Q-155,-18 -110,5" stroke="#A78BFA" stroke-width="3" fill="none" opacity="0.3"/>` +
    `<path d="M0,5 Q55,55 140,30 Q155,18 110,-5" stroke="#A78BFA" stroke-width="3" fill="none" opacity="0.3"/>` +
    `<path d="M0,5 Q-55,55 -140,30 Q-155,18 -110,-5" stroke="#A78BFA" stroke-width="3" fill="none" opacity="0.3"/>` +
    `<path d="M5,0 Q75,-42 145,-15" stroke="#C4B5FD" stroke-width="2" fill="none" opacity="0.2"/>` +
    `<path d="M-5,0 Q-75,42 -145,15" stroke="#C4B5FD" stroke-width="2" fill="none" opacity="0.2"/>`;

  const youAreHere =
    `<circle cx="70" cy="-20" r="4.5" fill="#FF6B6B" opacity="0">` +
    `<animate attributeName="opacity" values="0;0.9;0.9;0" dur="3s" repeatCount="indefinite" keyTimes="0;0.15;0.85;1"/>` +
    `</circle>` +
    `<circle cx="70" cy="-20" r="7" stroke="#FF6B6B" stroke-width="1" opacity="0" fill="none">` +
    `<animate attributeName="opacity" values="0;0.5;0.5;0" dur="3s" repeatCount="indefinite" keyTimes="0;0.15;0.85;1"/>` +
    `</circle>`;

  const body =
    darkBg() +
    starField(3) +
    `<g transform="translate(200,125)">` +
    `<ellipse cx="0" cy="0" rx="160" ry="60" fill="url(#l1q5-disc)"/>` +
    spiralArms +
    `<circle cx="0" cy="0" r="22" fill="url(#l1q5-core)"/>` +
    `<circle cx="0" cy="0" r="8" fill="#FFD166" opacity="0.6"/>` +
    `<circle cx="0" cy="0" r="4" fill="#FFEC99" opacity="0.8"/>` +
    youAreHere +
    `</g>`;

  return makeSvg(400, 250, defs, body);
}

/** L1-Q6: Solar system or not? -- Solar system with orbiting planets + mini galaxy */
function buildSolarSystemOrNot(): string {
  const defs = glowGradient('l1q6-sun', '#FFD166', 1, 0);
  const s =
    `<circle cx="200" cy="130" r="35" fill="url(#l1q6-sun)"/>` +
    `<circle cx="200" cy="130" r="20" fill="#FFD166"/>` +
    `<circle cx="194" cy="124" r="3.5" fill="white" opacity="0.12"/>`;

  const orbits =
    orbitRing(200, 130, 55, { opacity: 0.2, color: '#4A5568' }) +
    orbitRing(200, 130, 80, { opacity: 0.2, color: '#4A5568' }) +
    orbitRing(200, 130, 105, { opacity: 0.2, color: '#4A5568' });

  // Orbiting planets
  const mars =
    `<g>` +
    orbitAnim(200, 130, 30) +
    `<circle cx="245" cy="100" r="5" fill="#E07C4A"/>` +
    `</g>`;
  const jupiter =
    `<g>` +
    orbitAnim(200, 130, 50) +
    `<circle cx="140" cy="70" r="8" fill="#E8C477"/>` +
    `</g>`;
  const saturnGroup =
    `<g>` +
    orbitAnim(200, 130, 70) +
    `<circle cx="310" cy="110" r="7" fill="#F0D68A"/>` +
    `<ellipse cx="310" cy="110" rx="12" ry="3" stroke="#F0D68A" stroke-width="1" opacity="0.5" fill="none" transform="rotate(-20,310,110)"/>` +
    `</g>`;

  // Mini galaxy in corner
  const miniGalaxy =
    `<g transform="translate(30,40)">` +
    `<ellipse cx="0" cy="0" rx="18" ry="8" stroke="#A78BFA" stroke-width="1" fill="none" opacity="0.25"/>` +
    `<ellipse cx="0" cy="0" rx="14" ry="5" stroke="#A78BFA" stroke-width="0.6" fill="none" opacity="0.15" transform="rotate(30,0,0)"/>` +
    `<circle cx="0" cy="0" r="3" fill="#A78BFA" opacity="0.3"/>` +
    `</g>`;

  const body = darkBg() + starField(3) + s + orbits + mars + jupiter + saturnGroup + miniGalaxy;
  return makeSvg(400, 250, defs, body);
}

/** L1-Q8: Why stars look like tiny dots -- big star on left, tiny dot on right */
function buildWhyStarsTiny(): string {
  const s = sun(85, 125, 45, 'l1q8');
  const defs = s.defs;

  const body =
    darkBg() +
    starField(3) +
    s.body +
    `<circle cx="85" cy="125" r="48" stroke="#FFE082" stroke-width="1" opacity="0.15" fill="none">` +
    pulseGlow(48, 52, 4) +
    `</circle>` +
    // Distance arrow
    dashedLine(160, 125, 330, 125, { color: '#4A5568', opacity: 0.2 }) +
    `<g transform="translate(240,112)">` +
    `<polygon points="0,0 10,5 0,10" fill="#4A5568" opacity="0.2"/>` +
    `</g>` +
    // Tiny twinkling dot
    starDot(365, 125, 2.5, { twinkle: true, dur: 2 }) +
    `<circle cx="365" cy="125" r="5" fill="white" opacity="0.1">` +
    `<animate attributeName="opacity" values="0.1;0.2;0.1" dur="2s" repeatCount="indefinite"/>` +
    `</circle>`;

  return makeSvg(400, 250, defs, body);
}

// =====================================================================
// LESSON 2: Stars, Planets & Satellites
// =====================================================================

/** L2-T1: Three Kinds of Bright Dots -- star (twinkling), planet (steady), satellite (moving) */
function buildThreeKindsOfDots(): string {
  const defs =
    glowGradient('l2t1-sg', 'white', 1, 0) +
    glowGradient('l2t1-pg', '#FFB347', 1, 0);

  const twinklingStar =
    `<circle cx="80" cy="100" r="40" fill="url(#l2t1-sg)"/>` +
    `<circle cx="80" cy="100" r="25" fill="white" opacity="0.9">` +
    twinkleAnim(0.5, 0.9, 3) +
    `</circle>` +
    `<circle cx="80" cy="100" r="30" stroke="white" stroke-width="1" opacity="0" fill="none">` +
    `<animate attributeName="opacity" values="0;0.3;0" dur="3s" repeatCount="indefinite"/>` +
    `<animate attributeName="r" values="28;35;28" dur="3s" repeatCount="indefinite"/>` +
    `</circle>`;

  const steadyPlanet =
    `<circle cx="200" cy="100" r="40" fill="url(#l2t1-pg)"/>` +
    `<circle cx="200" cy="100" r="25" fill="#FFB347"/>` +
    `<circle cx="190" cy="90" r="5" fill="white" opacity="0.1"/>`;

  const movingSatellite =
    `<circle cx="330" cy="100" r="6" fill="#A5B4FC" opacity="0.9">` +
    `<animate attributeName="cx" values="305;355" dur="4s" repeatCount="indefinite"/>` +
    `</circle>` +
    `<line x1="305" y1="100" x2="355" y2="100" stroke="#A5B4FC" stroke-width="1.5" opacity="0.15"/>`;

  const body =
    darkBg() +
    starField(3) +
    twinklingStar + steadyPlanet + movingSatellite +
    label(80, 155, 'Star') +
    label(200, 155, 'Planet', { color: '#FFB347' }) +
    label(330, 155, 'Satellite', { color: '#A5B4FC' });

  return makeSvg(400, 250, defs, body);
}

/** L2-T2: Planets Don't Make Their Own Light -- star emits, planet reflects */
function buildProducesVsReflects(): string {
  const defs =
    glowGradient('l2t2-sg', '#FFD166', 1, 0) +
    glowGradient('l2t2-pg', '#4DA6FF', 0.3, 0);

  // Sun with rays
  const sunBody =
    `<circle cx="105" cy="125" r="55" fill="url(#l2t2-sg)"/>` +
    `<circle cx="105" cy="125" r="35" fill="#FFD166"/>` +
    `<circle cx="93" cy="113" r="6" fill="white" opacity="0.1"/>`;

  const rays = [
    [145, 80, 195, 55], [145, 100, 200, 82], [142, 125, 210, 125],
    [145, 150, 200, 168], [145, 170, 195, 195], [135, 82, 165, 42],
  ].map(([x1, y1, x2, y2]) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFD166" stroke-width="2.5" opacity="0.4"/>`
  ).join('');

  // Planet reflecting light
  const planetBody =
    `<circle cx="310" cy="125" r="40" fill="url(#l2t2-pg)"/>` +
    `<circle cx="310" cy="125" r="25" fill="#3B82F6"/>` +
    `<circle cx="300" cy="116" r="5" fill="#60A5FA" opacity="0.3"/>`;

  // Reflected light bouncing off planet
  const reflections =
    `<circle cx="365" cy="40" r="10" fill="#FFD166" opacity="0.5"/>` +
    dashedLine(360, 50, 328, 102, { color: '#FFD166', opacity: 0.3 }) +
    `<line x1="328" y1="102" x2="342" y2="135" stroke="#FFD166" stroke-width="1.5" opacity="0.3"/>` +
    `<polygon points="342,135 347,128 350,137" fill="#FFD166" opacity="0.3"/>` +
    `<line x1="328" y1="102" x2="298" y2="82" stroke="#FFD166" stroke-width="1.5" opacity="0.3"/>` +
    `<polygon points="298,82 305,80 301,87" fill="#FFD166" opacity="0.3"/>`;

  const body =
    darkBg() +
    starField(3) +
    sunBody + rays + planetBody + reflections +
    label(105, 185, 'Produces light', { size: 14, color: '#FFD166' }) +
    label(310, 185, 'Reflects light', { size: 14, color: '#60A5FA' });

  return makeSvg(400, 250, defs, body);
}

/** L2-T3: The ISS -- Earth with orbiting space station */
function buildISS(): string {
  const defs = glowGradient('l2t3-eg', '#4DA6FF', 0.3, 0);

  const earthBody =
    `<circle cx="60" cy="250" r="90" fill="url(#l2t3-eg)"/>` +
    `<circle cx="60" cy="250" r="65" fill="#1A73E8"/>` +
    `<circle cx="60" cy="250" r="65" fill="#4DA6FF" opacity="0.25"/>` +
    `<path d="M15,215 Q25,210 40,216 Q55,208 70,213 Q82,206 95,212" fill="#58CC02" opacity="0.35"/>` +
    `<path d="M-5,240 Q15,234 30,242 Q48,236 65,244 Q78,238 90,246" fill="#58CC02" opacity="0.3"/>` +
    `<circle cx="60" cy="250" r="65" stroke="#7CC8FF" stroke-width="1" opacity="0.2" fill="none"/>`;

  const issOrbit =
    `<ellipse cx="60" cy="250" rx="130" ry="130" stroke="#A5B4FC" stroke-width="1.2" opacity="0.25" fill="none" stroke-dasharray="8 5"/>`;

  // ISS model orbiting
  const issModel =
    `<g>` +
    `<animateTransform attributeName="transform" type="rotate" from="0 60 250" to="-360 60 250" dur="15s" repeatCount="indefinite"/>` +
    `<g transform="translate(160, 155)">` +
    `<rect x="-18" y="-4" width="36" height="8" rx="2" fill="#C0C0C0" opacity="0.85"/>` +
    `<rect x="-5" y="-3" width="10" height="6" rx="1" fill="#E0E0E0"/>` +
    `<rect x="-28" y="-10" width="10" height="20" rx="1" fill="#4DA6FF" opacity="0.6"/>` +
    `<rect x="18" y="-10" width="10" height="20" rx="1" fill="#4DA6FF" opacity="0.6"/>` +
    `</g>` +
    `</g>`;

  const body =
    darkBg() +
    starField(3, 400, 250, 5) +
    earthBody + issOrbit + issModel +
    label(280, 110, 'ISS', { color: '#A5B4FC' });

  return makeSvg(400, 250, defs, body);
}

/** L2-Q7: Shooting stars -- meteor streak entering atmosphere */
function buildShootingStar(): string {
  const defs =
    `<linearGradient id="l2q7-trail" x1="0%" y1="0%" x2="100%" y2="100%">` +
    `<stop offset="0%" stop-color="white" stop-opacity="0"/>` +
    `<stop offset="50%" stop-color="#FFD166" stop-opacity="0.3"/>` +
    `<stop offset="80%" stop-color="#FFB347" stop-opacity="0.6"/>` +
    `<stop offset="100%" stop-color="white"/>` +
    `</linearGradient>` +
    glowGradient('l2q7-hd', 'white', 1, 0) +
    atmosphereGradient('l2q7-atm', '#4DA6FF');

  const body =
    darkBg() +
    starField(3) +
    // Atmosphere band at bottom
    `<rect x="0" y="220" width="400" height="30" fill="url(#l2q7-atm)"/>` +
    `<line x1="0" y1="220" x2="400" y2="220" stroke="#4DA6FF" stroke-width="1.2" opacity="0.15"/>` +
    // Main meteor trail
    `<line x1="60" y1="40" x2="310" y2="185" stroke="url(#l2q7-trail)" stroke-width="5" stroke-linecap="round">` +
    `<animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>` +
    `</line>` +
    `<line x1="100" y1="65" x2="300" y2="178" stroke="#FFD166" stroke-width="2" opacity="0.2" stroke-linecap="round"/>` +
    `<line x1="80" y1="58" x2="295" y2="180" stroke="#FF6B6B" stroke-width="1" opacity="0.12" stroke-linecap="round"/>` +
    // Bright head
    `<circle cx="310" cy="185" r="15" fill="url(#l2q7-hd)">` +
    `<animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite"/>` +
    `</circle>` +
    `<circle cx="310" cy="185" r="8" fill="white" opacity="0.9">` +
    `<animate attributeName="opacity" values="0.9;0.6;0.9" dur="2s" repeatCount="indefinite"/>` +
    `</circle>`;

  return makeSvg(400, 250, defs, body);
}

// =====================================================================
// LESSON 3: Constellations & Star Maps
// =====================================================================

/** L3-T1: Patterns in the Sky -- Orion constellation with animated connections */
function buildOrionConstellation(): string {
  const defs = glowGradient('l3t1-sg', 'white', 1, 0);

  // Orion star positions
  const stars = [
    { x: 160, y: 30 }, { x: 240, y: 35 }, { x: 200, y: 75 },
    { x: 175, y: 115 }, { x: 225, y: 115 },
    { x: 155, y: 165 }, { x: 245, y: 165 },
  ];

  const starBodies = stars.map((s) =>
    `<circle cx="${s.x}" cy="${s.y}" r="10" fill="url(#l3t1-sg)"/>` +
    `<circle cx="${s.x}" cy="${s.y}" r="6" fill="white" opacity="0.9"/>`
  ).join('');

  // Connection lines with staggered animation
  const connections = [
    [0, 1, 0.15], [1, 2, 0.2], [0, 2, 0.2],
    [2, 3, 0.3], [2, 4, 0.3], [3, 4, 0.3],
    [3, 5, 0.4], [4, 6, 0.4],
  ];
  const lines = connections.map(([a, b, delay]) => {
    const sa = stars[a as number];
    const sb = stars[b as number];
    return `<line x1="${sa.x}" y1="${sa.y}" x2="${sb.x}" y2="${sb.y}" stroke="#818CF8" stroke-width="1.8" opacity="0">` +
      `<animate attributeName="opacity" values="0;0;0.6;0.6" dur="4s" repeatCount="indefinite" keyTimes="0;${delay};${(delay as number) + 0.2};1"/>` +
      `</line>`;
  }).join('');

  const body =
    darkBg() +
    starField(3) +
    starBodies + lines +
    label(200, 210, 'Orion', { color: '#818CF8' });

  return makeSvg(400, 250, defs, body);
}

/** L3-T2: Finding Your Way with Stars -- Big Dipper pointing to Polaris */
function buildBigDipperToPolaris(): string {
  const defs = glowGradient('l3t2-pol', '#FFD166', 1, 0);

  // Big Dipper stars
  const dipperStars = [
    { x: 100, y: 200 }, { x: 140, y: 195 }, { x: 148, y: 165 }, { x: 115, y: 158 },
    { x: 120, y: 218 }, { x: 158, y: 224 }, { x: 165, y: 205 },
  ];
  const dipperDots = dipperStars.map((s) =>
    `<circle cx="${s.x}" cy="${s.y}" r="6" fill="white" opacity="0.85"/>`
  ).join('');

  // Dipper connections
  const dipperLines = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [1, 6],
  ].map(([a, b]) => {
    const sa = dipperStars[a];
    const sb = dipperStars[b];
    return `<line x1="${sa.x}" y1="${sa.y}" x2="${sb.x}" y2="${sb.y}" stroke="#818CF8" stroke-width="1.5" opacity="0.5"/>`;
  }).join('');

  // Pointer stars highlight
  const pointerHighlight =
    `<circle cx="115" cy="158" r="8" stroke="#FFD166" stroke-width="2" fill="none" opacity="0.5">` +
    `<animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite"/>` +
    `</circle>` +
    `<circle cx="148" cy="165" r="8" stroke="#FFD166" stroke-width="2" fill="none" opacity="0.5">` +
    `<animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite"/>` +
    `</circle>`;

  // Arrow to Polaris
  const arrow =
    `<line x1="130" y1="152" x2="200" y2="60" stroke="#FFD166" stroke-width="2" opacity="0.4" stroke-dasharray="8 5">` +
    `<animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>` +
    `</line>`;

  // Polaris
  const polaris =
    `<circle cx="210" cy="45" r="22" fill="url(#l3t2-pol)"/>` +
    `<circle cx="210" cy="45" r="10" fill="#FFD166" opacity="0.9">` +
    `<animate attributeName="opacity" values="0.9;0.6;0.9" dur="4s" repeatCount="indefinite"/>` +
    `</circle>`;

  const body =
    darkBg() +
    starField(3) +
    dipperDots + dipperLines + pointerHighlight + arrow + polaris +
    label(245, 50, 'Polaris', { color: '#FFD166', anchor: 'start' });

  return makeSvg(400, 250, defs, body);
}

/** L3-T3: Constellations Change with Seasons -- Sun center, Earth at 4 positions */
function buildSeasonalConstellations(): string {
  const defs = glowGradient('l3t3-sg', '#FFD166', 1, 0);
  const s =
    `<circle cx="200" cy="125" r="40" fill="url(#l3t3-sg)"/>` +
    `<circle cx="200" cy="125" r="25" fill="#FFD166"/>` +
    `<circle cx="192" cy="118" r="4" fill="white" opacity="0.1"/>`;

  const orb = orbitRing(200, 125, 110, { opacity: 0.2, color: '#4A5568' });

  // Earth at 4 seasonal positions with continent blobs and night-side indicators
  const positions = [
    { cx: 200, cy: 35, lbl: 'Winter', ly: 18 },
    { cx: 310, cy: 125, lbl: 'Spring', lx: 340 },
    { cx: 200, cy: 215, lbl: 'Summer', ly: 245 },
    { cx: 90, cy: 125, lbl: 'Fall', lx: 40 },
  ];
  const earths = positions.map((p) => {
    const blob =
      `<circle cx="${p.cx}" cy="${p.cy}" r="12" fill="#1A73E8"/>` +
      `<path d="M${p.cx - 5},${p.cy - 7} Q${p.cx - 2},${p.cy - 9} ${p.cx + 2},${p.cy - 6} Q${p.cx + 4},${p.cy - 3} ${p.cx + 1},${p.cy - 1} Q${p.cx - 2},${p.cy - 2} ${p.cx - 4},${p.cy - 4}Z" fill="#58CC02" opacity="0.4"/>`;
    // Night side indicator
    const nightSide = p.ly !== undefined
      ? `<rect x="${p.cx - 4}" y="${p.ly < p.cy ? p.cy + 7 : p.cy - 11}" width="8" height="4" rx="1" fill="#0B1026" opacity="0.5"/>`
      : `<rect x="${p.lx! < p.cx ? p.cx - 14 : p.cx + 10}" y="${p.cy - 4}" width="4" height="8" rx="1" fill="#0B1026" opacity="0.5"/>`;
    return blob + nightSide;
  }).join('');

  const labels =
    label(200, 18, 'Winter', { size: 14, color: '#A5B4FC' }) +
    label(340, 128, 'Spring', { size: 14, color: '#A5B4FC', anchor: 'start' }) +
    label(200, 245, 'Summer', { size: 14, color: '#A5B4FC' }) +
    label(40, 128, 'Fall', { size: 14, color: '#A5B4FC', anchor: 'start' });

  const body = darkBg() + starField(3) + s + orb + earths + labels;
  return makeSvg(400, 250, defs, body);
}

/** L3-Q8: Orion's Belt -- full Orion shape with belt highlighted */
function buildOrionsBelt(): string {
  const defs =
    glowGradient('l3q8-bg', '#FFD166', 1, 0) +
    glowGradient('l3q8-dm', 'white', 0.4, 0);

  // Dim body stars
  const dimStars = [
    { x: 160, y: 25 }, { x: 240, y: 30 }, { x: 200, y: 65 },
    { x: 180, y: 160 }, { x: 220, y: 158 },
    { x: 165, y: 205 }, { x: 235, y: 203 },
  ];
  const dimBodies = dimStars.map((s) =>
    `<circle cx="${s.x}" cy="${s.y}" r="7" fill="url(#l3q8-dm)"/>` +
    `<circle cx="${s.x}" cy="${s.y}" r="3.5" fill="white" opacity="0.4"/>`
  ).join('');

  // Belt stars (bright, golden, pulsing)
  const beltStars = [
    { x: 155, y: 115, dur: 3.5 },
    { x: 200, y: 120, dur: 3 },
    { x: 245, y: 117, dur: 3.2 },
  ];
  const beltBodies = beltStars.map((s) =>
    `<circle cx="${s.x}" cy="${s.y}" r="16" fill="url(#l3q8-bg)"/>` +
    `<circle cx="${s.x}" cy="${s.y}" r="9" fill="#FFD166" opacity="0.9">` +
    `<animate attributeName="opacity" values="0.9;0.6;0.9" dur="${s.dur}s" repeatCount="indefinite"/>` +
    `</circle>`
  ).join('');

  // Belt connection lines
  const beltLines =
    `<line x1="155" y1="115" x2="200" y2="120" stroke="#FFD166" stroke-width="2.5" opacity="0.7"/>` +
    `<line x1="200" y1="120" x2="245" y2="117" stroke="#FFD166" stroke-width="2.5" opacity="0.7"/>`;

  // Faint body connection lines
  const bodyLines = [
    [160, 25, 240, 30], [160, 25, 200, 65], [240, 30, 200, 65],
    [200, 65, 155, 115], [200, 65, 245, 117],
    [155, 115, 180, 160], [245, 117, 220, 158],
    [180, 160, 165, 205], [220, 158, 235, 203],
  ].map(([x1, y1, x2, y2]) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#4A5568" stroke-width="0.8" opacity="0.2"/>`
  ).join('');

  const body = darkBg() + starField(3) + dimBodies + beltBodies + beltLines + bodyLines;
  return makeSvg(400, 250, defs, body);
}

// =====================================================================
// LESSON 4: Light-Years & Cosmic Distances
// =====================================================================

/** L4-T1: Looking Back in Time -- star emitting light particles toward eye icon */
function buildLookingBackInTime(): string {
  const s = sun(70, 125, 35, 'l4t1');

  // Eye icon
  const eye =
    `<g transform="translate(345,125)">` +
    `<circle cx="0" cy="0" r="15" stroke="white" stroke-width="2" fill="none" opacity="0.5"/>` +
    `<circle cx="0" cy="0" r="4" fill="white" opacity="0.5"/>` +
    `<circle cx="0" cy="-7" r="2.5" fill="white" opacity="0.4"/>` +
    `<line x1="0" y1="0" x2="6" y2="5" stroke="white" stroke-width="1.5" opacity="0.4"/>` +
    `</g>`;

  const body =
    darkBg() +
    starField(3) +
    s.body +
    `<circle cx="70" cy="125" r="38" stroke="#FFE082" stroke-width="1" opacity="0.15" fill="none">` +
    pulseGlow(38, 42, 4) +
    `</circle>` +
    dashedLine(130, 125, 300, 125, { color: '#FFD166', opacity: 0.12 }) +
    lightParticles(140, 125, 290, 125, 3, 3.5) +
    eye +
    label(70, 180, '100 years ago', { size: 14, color: '#FFD166' });

  return makeSvg(400, 250, s.defs, body);
}

/** L4-T2: Why We Need Such Big Units -- Sun to Proxima Centauri */
function buildBigUnits(): string {
  const defs =
    glowGradient('l4t2-sg', '#FFD166', 1, 0) +
    glowGradient('l4t2-pg', '#FF6B6B', 1, 0);

  const sunBody =
    `<circle cx="60" cy="110" r="48" fill="url(#l4t2-sg)"/>` +
    `<circle cx="60" cy="110" r="30" fill="#FFD166"/>` +
    `<circle cx="50" cy="100" r="5" fill="white" opacity="0.1"/>`;

  const proxima =
    `<circle cx="365" cy="110" r="18" fill="url(#l4t2-pg)"/>` +
    `<circle cx="365" cy="110" r="3" fill="#FF6B6B" opacity="0.8"/>`;

  // Distance measurement bracket
  const bracket =
    `<line x1="110" y1="155" x2="350" y2="155" stroke="#818CF8" stroke-width="1.2" opacity="0.4"/>` +
    `<line x1="110" y1="148" x2="110" y2="162" stroke="#818CF8" stroke-width="1.2" opacity="0.4"/>` +
    `<line x1="350" y1="148" x2="350" y2="162" stroke="#818CF8" stroke-width="1.2" opacity="0.4"/>` +
    dashedLine(120, 110, 340, 110, { color: '#4A5568', opacity: 0.12 });

  const body =
    darkBg() +
    starField(3) +
    sunBody + proxima + bracket +
    label(230, 180, '4.24 light-years', { color: '#818CF8' });

  return makeSvg(400, 250, defs, body);
}

/** L4-T3: How Fast Is Light -- Earth with light particles circling */
function buildSpeedOfLight(): string {
  const e = earth(200, 115, 55, 'l4t3');

  // Orbit path for animateMotion
  const orbitPath =
    `<path id="l4t3-orb" d="M275,115 A75,75 0 0,1 125,115 A75,75 0 0,1 275,115" fill="none" stroke="none"/>`;

  // Light particles circling Earth
  const particles = [0, 0.2, 0.4, 0.6].map((delay, i) => {
    const r = 6 - i * 1;
    const op = 0.9 - i * 0.25;
    return `<circle r="${r}" fill="#FFD166" opacity="${op.toFixed(2)}">` +
      `<animateMotion dur="2s" repeatCount="indefinite" begin="${delay}s">` +
      `<mpath href="#l4t3-orb"/>` +
      `</animateMotion>` +
      `</circle>`;
  }).join('');

  const body =
    darkBg() +
    starField(3) +
    e.body +
    `<circle cx="200" cy="115" r="75" stroke="#FFD166" stroke-width="0.8" opacity="0.1" fill="none" stroke-dasharray="5 5"/>` +
    orbitPath + particles +
    label(200, 215, '7.5x / second', { color: '#FFD166' });

  return makeSvg(400, 250, e.defs, body);
}

/** L4-Q6: 500 years ago -- star emitting light to eye (no text for question) */
function buildFiveHundredLightYears(): string {
  const s = sun(60, 125, 25, 'l4q6');

  const eye =
    `<g transform="translate(345,125)">` +
    `<circle cx="0" cy="0" r="15" stroke="white" stroke-width="2" fill="none" opacity="0.5"/>` +
    `<circle cx="0" cy="0" r="4" fill="white" opacity="0.5"/>` +
    `<circle cx="0" cy="-7" r="2.5" fill="white" opacity="0.4"/>` +
    `<line x1="0" y1="0" x2="6" y2="5" stroke="white" stroke-width="1.5" opacity="0.4"/>` +
    `</g>`;

  const body =
    darkBg() +
    starField(3) +
    s.body +
    `<circle cx="60" cy="125" r="28" stroke="#FFE082" stroke-width="1" opacity="0.15" fill="none">` +
    pulseGlow(28, 32, 4) +
    `</circle>` +
    dashedLine(110, 125, 300, 125, { color: '#FFD166', opacity: 0.12 }) +
    lightParticles(120, 125, 290, 125, 3, 3) +
    eye;

  return makeSvg(400, 250, s.defs, body);
}

// =====================================================================
// LESSON 5: Your First Stargazing Session
// =====================================================================

/** L5-T1: No Telescope Required -- night sky with Milky Way band and person silhouette */
function buildNoTelescopeRequired(): string {
  const defs =
    `<linearGradient id="l5t1-mw" x1="0%" y1="0%" x2="100%" y2="100%">` +
    `<stop offset="0%" stop-color="#818CF8" stop-opacity="0"/>` +
    `<stop offset="30%" stop-color="#818CF8" stop-opacity="0.08"/>` +
    `<stop offset="50%" stop-color="#C084FC" stop-opacity="0.12"/>` +
    `<stop offset="70%" stop-color="#818CF8" stop-opacity="0.08"/>` +
    `<stop offset="100%" stop-color="#818CF8" stop-opacity="0"/>` +
    `</linearGradient>`;

  // Twinkling stars
  const twinklers = [
    { cx: 45, cy: 35, r: 1.2, dur: 3 },
    { cx: 220, cy: 35, r: 1.1, dur: 3.5 },
    { cx: 250, cy: 75, r: 0.9, dur: 2.8 },
  ];
  const twinkleStars = twinklers.map((s) =>
    starDot(s.cx, s.cy, s.r, { twinkle: true, dur: s.dur, opacity: 0.55 })
  ).join('');

  // Static faint stars
  const faintStars = [
    [130, 25], [310, 30], [70, 80], [160, 70], [340, 85],
    [100, 120], [200, 110], [300, 115], [55, 155], [350, 145],
  ].map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="0.7" fill="white" opacity="0.35"/>`
  ).join('');

  const ground =
    `<path d="M0,210 Q60,198 120,206 Q180,195 240,205 Q300,197 360,204 Q380,200 400,210 L400,250 L0,250Z" fill="#131E33"/>`;

  // Person silhouette with telescope-free pose
  const person =
    `<path d="M170,210 L176,192 Q182,186 188,186 L188,180 Q191,176 195,176 Q199,176 202,180 L202,186 Q208,186 214,192 L220,210" fill="#1A2744"/>` +
    `<circle cx="195" cy="173" r="5" fill="#1A2744"/>`;

  const body =
    darkBg() +
    `<rect x="0" y="0" width="400" height="210" fill="url(#l5t1-mw)" transform="rotate(-15,200,105)"/>` +
    twinkleStars + faintStars + ground + person;

  return makeSvg(400, 250, defs, body);
}

/** L5-Q2: City lights -- dark sky left vs light-polluted city right */
function buildCityVsDark(): string {
  // Left: dark sky with many stars
  const leftStars = [
    [25, 22], [55, 42], [85, 20], [115, 50], [145, 25], [175, 58],
    [40, 68], [75, 85], [110, 65], [145, 82], [170, 95],
    [30, 108], [65, 118], [100, 105], [140, 100], [165, 120],
    [50, 140], [90, 148], [120, 135], [155, 145],
  ].map(([x, y], i) => {
    const r = 0.6 + (i % 3) * 0.15;
    const op = 0.35 + (i % 5) * 0.08;
    return `<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" fill="white" opacity="${op.toFixed(2)}"/>`;
  }).join('');

  const leftGround =
    `<path d="M0,190 Q40,184 80,192 Q120,186 160,190 Q180,187 200,190 L200,250 L0,250Z" fill="#131E33"/>`;

  // Right: city with light pollution and few dim stars
  const buildings =
    `<rect x="220" y="175" width="22" height="35" fill="#2A1F3D" opacity="0.7"/>` +
    `<rect x="224" y="179" width="5" height="6" fill="#FFD166" opacity="0.3"/>` +
    `<rect x="232" y="179" width="5" height="6" fill="#FFD166" opacity="0.2"/>` +
    `<rect x="224" y="189" width="5" height="6" fill="#FFD166" opacity="0.15"/>` +
    `<rect x="260" y="165" width="28" height="45" fill="#2A1F3D" opacity="0.8"/>` +
    `<rect x="264" y="169" width="6" height="7" fill="#FFD166" opacity="0.3"/>` +
    `<rect x="274" y="169" width="6" height="7" fill="#FFD166" opacity="0.25"/>` +
    `<rect x="264" y="180" width="6" height="7" fill="#FFD166" opacity="0.15"/>` +
    `<rect x="310" y="170" width="24" height="40" fill="#2A1F3D" opacity="0.7"/>` +
    `<rect x="314" y="174" width="5" height="6" fill="#FFD166" opacity="0.25"/>` +
    `<rect x="322" y="174" width="5" height="6" fill="#FFD166" opacity="0.2"/>` +
    `<rect x="355" y="160" width="35" height="50" fill="#2A1F3D" opacity="0.8"/>` +
    `<rect x="360" y="164" width="7" height="8" fill="#FFD166" opacity="0.3"/>` +
    `<rect x="371" y="164" width="7" height="8" fill="#FFD166" opacity="0.2"/>` +
    `<rect x="360" y="176" width="7" height="8" fill="#FFD166" opacity="0.15"/>`;

  const cityStars =
    `<circle cx="260" cy="55" r="0.9" fill="white" opacity="0.12"/>` +
    `<circle cx="320" cy="45" r="0.7" fill="white" opacity="0.08"/>` +
    `<circle cx="370" cy="60" r="0.8" fill="white" opacity="0.08"/>`;

  const body =
    darkBg() +
    `<line x1="200" y1="0" x2="200" y2="250" stroke="#4A5568" stroke-width="0.5" opacity="0.2"/>` +
    leftStars + leftGround +
    // City side overlay
    `<rect x="200" y="0" width="200" height="250" fill="#1A1020" opacity="0.3"/>` +
    `<rect x="200" y="170" width="200" height="80" fill="#2A1F3D" opacity="0.4"/>` +
    buildings +
    `<circle cx="280" cy="150" r="18" fill="#FFD166" opacity="0.04"/>` +
    `<circle cx="340" cy="145" r="14" fill="#FFD166" opacity="0.03"/>` +
    cityStars;

  return makeSvg(400, 250, '', body);
}

/** L5-T2: What to Look For First -- Moon, Planet, Pattern labeled */
function buildWhatToLookFor(): string {
  const defs = glowGradient('l5t2-mg', '#F0E68C', 1, 0);

  const moonBody =
    `<circle cx="80" cy="70" r="30" fill="url(#l5t2-mg)"/>` +
    `<circle cx="80" cy="70" r="20" fill="#F0E68C"/>` +
    `<circle cx="68" cy="58" r="4" fill="#E8D87C" opacity="0.3"/>` +
    `<circle cx="88" cy="75" r="3" fill="#E8D87C" opacity="0.25"/>`;

  const planetDot =
    `<circle cx="200" cy="85" r="8" fill="#FFB347" opacity="0.9"/>` +
    `<circle cx="200" cy="85" r="12" fill="#FFB347" opacity="0.15"/>`;

  // Small constellation pattern (Big Dipper-like)
  const patternStars = [
    { x: 310, y: 55 }, { x: 330, y: 72 }, { x: 350, y: 60 },
    { x: 355, y: 82 }, { x: 320, y: 92 }, { x: 340, y: 98 },
  ];
  const patternDots = patternStars.map((s) =>
    `<circle cx="${s.x}" cy="${s.y}" r="5" fill="white" opacity="0.8"/>`
  ).join('');
  const patternLines = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [3, 5], [1, 4],
  ].map(([a, b]) => {
    const sa = patternStars[a];
    const sb = patternStars[b];
    return `<line x1="${sa.x}" y1="${sa.y}" x2="${sb.x}" y2="${sb.y}" stroke="#818CF8" stroke-width="1.2" opacity="0.4"/>`;
  }).join('');

  const body =
    darkBg() +
    starField(3) +
    moonBody + planetDot + patternDots + patternLines +
    label(80, 118, 'Moon', { size: 14, color: '#F0E68C' }) +
    label(200, 118, 'Planet', { size: 14, color: '#FFB347' }) +
    label(332, 128, 'Pattern', { size: 14, color: '#818CF8' });

  return makeSvg(400, 250, defs, body);
}

/** L5-T3: Best Times to Stargaze -- new moon (dark, many stars) vs full moon (bright, few stars) */
function buildBestTimesToStargaze(): string {
  // Left side: new moon with many stars
  const leftStars = [
    [30, 25], [60, 48], [85, 22], [125, 40], [155, 25], [175, 55],
    [40, 72], [75, 88], [105, 65], [145, 80], [170, 95],
    [30, 108], [65, 118], [100, 105], [140, 100], [165, 120],
    [50, 140], [90, 148], [120, 135], [155, 145],
  ].map(([x, y], i) => {
    const r = 0.6 + (i % 4) * 0.1;
    const op = 0.35 + (i % 5) * 0.07;
    return `<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" fill="white" opacity="${op.toFixed(2)}"/>`;
  }).join('');

  // New moon (dark circle)
  const newMoon =
    `<circle cx="100" cy="50" r="12" fill="none" stroke="#F0E68C" stroke-width="1" opacity="0.2"/>` +
    `<circle cx="100" cy="50" r="12" fill="#0B1026"/>` +
    `<path d="M100,38 A12,12 0 0,1 100,62" fill="#F0E68C" opacity="0.15"/>`;

  // Right side: full moon flooding sky with light
  const fullMoon =
    `<circle cx="300" cy="65" r="35" fill="#F0E68C" opacity="0.12"/>` +
    `<circle cx="300" cy="65" r="28" fill="#F0E68C" opacity="0.6"/>` +
    `<circle cx="292" cy="55" r="5" fill="#E8D87C" opacity="0.3"/>` +
    `<circle cx="310" cy="70" r="3.5" fill="#E8D87C" opacity="0.25"/>` +
    `<circle cx="294" cy="76" r="3" fill="#E8D87C" opacity="0.2"/>`;

  const rightStars =
    `<circle cx="230" cy="45" r="0.9" fill="white" opacity="0.15"/>` +
    `<circle cx="260" cy="32" r="0.7" fill="white" opacity="0.1"/>` +
    `<circle cx="360" cy="40" r="0.8" fill="white" opacity="0.1"/>`;

  const body =
    darkBg() +
    `<line x1="200" y1="0" x2="200" y2="250" stroke="#4A5568" stroke-width="0.5" opacity="0.2"/>` +
    leftStars + newMoon +
    `<rect x="200" y="0" width="200" height="250" fill="#1A1530" opacity="0.3"/>` +
    fullMoon + rightStars +
    label(100, 185, 'New Moon', { color: '#58CC02' }) +
    label(300, 185, 'Full Moon', { color: '#FF6B6B' });

  return makeSvg(400, 250, '', body);
}

// =====================================================================
// REGISTRY
// =====================================================================

export const spaceDiagrams: Record<string, string> = {
  // Lesson 1: Welcome to the Universe
  'sp-u1-L1-T1': buildWelcomeCosmos(),
  'sp-u1-L1-Q2': buildWhatIsTheSun(),
  'sp-u1-L1-T2': buildYouAlreadyKnow(),
  'sp-u1-L1-Q3': buildStarsVsCity(),
  'sp-u1-L1-T3': buildCosmicAddress(),
  'sp-u1-L1-Q5': buildMilkyWayGalaxy(),
  'sp-u1-L1-Q6': buildSolarSystemOrNot(),
  'sp-u1-L1-Q8': buildWhyStarsTiny(),

  // Lesson 2: Stars, Planets & Satellites
  'sp-u1-L2-T1': buildThreeKindsOfDots(),
  'sp-u1-L2-T2': buildProducesVsReflects(),
  'sp-u1-L2-T3': buildISS(),
  'sp-u1-L2-Q7': buildShootingStar(),

  // Lesson 3: Constellations & Star Maps
  'sp-u1-L3-T1': buildOrionConstellation(),
  'sp-u1-L3-T2': buildBigDipperToPolaris(),
  'sp-u1-L3-T3': buildSeasonalConstellations(),
  'sp-u1-L3-Q8': buildOrionsBelt(),

  // Lesson 4: Light-Years & Cosmic Distances
  'sp-u1-L4-T1': buildLookingBackInTime(),
  'sp-u1-L4-T2': buildBigUnits(),
  'sp-u1-L4-T3': buildSpeedOfLight(),
  'sp-u1-L4-Q6': buildFiveHundredLightYears(),

  // Lesson 5: Your First Stargazing Session
  'sp-u1-L5-T1': buildNoTelescopeRequired(),
  'sp-u1-L5-Q2': buildCityVsDark(),
  'sp-u1-L5-T2': buildWhatToLookFor(),
  'sp-u1-L5-T3': buildBestTimesToStargaze(),
};
