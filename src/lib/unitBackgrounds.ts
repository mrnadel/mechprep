export interface UnitBackground {
  /** CSS background value (gradients, patterns) — layered on top of the unit color */
  css: string;
  /** CSS background-size (optional — defaults to auto for full-bleed gradients) */
  size?: string;
}

const UNIT_BACKGROUNDS: UnitBackground[] = [
  // 0 – Sapphire: celestial orbs
  {
    css: 'radial-gradient(ellipse 120% 80% at 80% 15%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 15% 80%, rgba(255,255,255,0.12) 0%, transparent 45%)',
  },
  // 1 – Fuchsia: diagonal light beams
  {
    css: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 35%), linear-gradient(135deg, transparent 55%, rgba(255,255,255,0.1) 70%, transparent 85%)',
  },
  // 2 – Emerald: organic rings
  {
    css: 'radial-gradient(circle at 75% 25%, transparent 20%, rgba(255,255,255,0.12) 21%, transparent 23%), radial-gradient(circle at 25% 75%, transparent 30%, rgba(255,255,255,0.08) 31%, transparent 33%), radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)',
  },
  // 3 – Amber: warm sunburst
  {
    css: 'conic-gradient(from 200deg at 85% 85%, rgba(255,255,255,0.15) 0deg, transparent 60deg, rgba(255,255,255,0.08) 120deg, transparent 180deg), radial-gradient(ellipse at 85% 85%, rgba(255,255,255,0.18) 0%, transparent 55%)',
  },
  // 4 – Violet: nebula clouds
  {
    css: 'radial-gradient(ellipse 100% 60% at 20% 25%, rgba(255,255,255,0.18) 0%, transparent 50%), radial-gradient(ellipse 80% 100% at 80% 75%, rgba(255,255,255,0.12) 0%, transparent 50%)',
  },
  // 5 – Rose: bokeh circles
  {
    css: 'radial-gradient(circle 60px at 20% 30%, rgba(255,255,255,0.14) 0%, transparent 100%), radial-gradient(circle 45px at 75% 55%, rgba(255,255,255,0.11) 0%, transparent 100%), radial-gradient(circle 80px at 55% 15%, rgba(255,255,255,0.09) 0%, transparent 100%)',
  },
  // 6 – Teal: horizontal waves
  {
    css: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 18%, rgba(255,255,255,0.07) 36%, transparent 54%, rgba(255,255,255,0.1) 72%, transparent 90%), radial-gradient(ellipse 100% 30% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 100%)',
  },
  // 7 – Orange: angled blocks
  {
    css: 'linear-gradient(45deg, rgba(255,255,255,0.12) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.12) 75%), linear-gradient(-45deg, rgba(255,255,255,0.07) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.07) 75%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 50%)',
    size: '60px 60px, 60px 60px, auto',
  },
  // 8 – Lime: subtle stripes
  {
    css: 'repeating-linear-gradient(55deg, transparent, transparent 18px, rgba(255,255,255,0.06) 18px, rgba(255,255,255,0.06) 20px), radial-gradient(ellipse at 25% 20%, rgba(255,255,255,0.16) 0%, transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 35%)',
  },
  // 9 – Indigo: starfield
  {
    css: 'radial-gradient(circle 2px at 12% 18%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(circle 1.5px at 42% 35%, rgba(255,255,255,0.25) 0%, transparent 100%), radial-gradient(circle 2px at 72% 12%, rgba(255,255,255,0.28) 0%, transparent 100%), radial-gradient(circle 1px at 88% 60%, rgba(255,255,255,0.22) 0%, transparent 100%), radial-gradient(circle 1.5px at 28% 72%, rgba(255,255,255,0.24) 0%, transparent 100%), radial-gradient(circle 2px at 58% 82%, rgba(255,255,255,0.2) 0%, transparent 100%), radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 80%)',
  },
];

export function getUnitBackground(unitIndex: number): UnitBackground {
  return UNIT_BACKGROUNDS[unitIndex % UNIT_BACKGROUNDS.length];
}
