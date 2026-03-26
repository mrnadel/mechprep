export interface UnitTheme {
  bg: string;
  color: string;
  dark: string;
  mid: string;
}

export const UNIT_THEMES: UnitTheme[] = [
  { bg: '#EBF3FF', color: '#3B82F6', dark: '#1E5BB8', mid: '#2D6FD7' }, // Sapphire
  { bg: '#FBE8FF', color: '#D946EF', dark: '#A321B8', mid: '#BE34D4' }, // Fuchsia
  { bg: '#E6FAF2', color: '#10B981', dark: '#0B8660', mid: '#0DA071' }, // Emerald
  { bg: '#FFF8E6', color: '#F59E0B', dark: '#B37408', mid: '#D4890A' }, // Amber
  { bg: '#F0EAFF', color: '#8B5CF6', dark: '#6737D4', mid: '#794AE5' }, // Violet
  { bg: '#FFE8EC', color: '#F43F5E', dark: '#BE2D45', mid: '#D93652' }, // Rose
  { bg: '#E4FAF8', color: '#14B8A6', dark: '#0D897C', mid: '#11A191' }, // Teal
  { bg: '#FFF1E6', color: '#F97316', dark: '#BA5610', mid: '#D96513' }, // Orange
  { bg: '#F0FAE6', color: '#65A30D', dark: '#4D7B0A', mid: '#598E0C' }, // Lime
  { bg: '#EDEAFF', color: '#6366F1', dark: '#494BB8', mid: '#5659D5' }, // Indigo
];

export function getUnitTheme(unitIndex: number): UnitTheme {
  return UNIT_THEMES[unitIndex % UNIT_THEMES.length];
}
