export interface UnitTheme {
  bg: string;
  color: string;
  dark: string;
  mid: string;
}

export const UNIT_THEMES: UnitTheme[] = [
  { bg: '#FFF8E1', color: '#F5B800', dark: '#C49200', mid: '#E5A800' },
  { bg: '#F3E6FF', color: '#CE82FF', dark: '#7B2FBE', mid: '#9E5DD0' },
  { bg: '#FFF0DB', color: '#FF9600', dark: '#B56E00', mid: '#CC8B1F' },
  { bg: '#DDF4FF', color: '#1CB0F6', dark: '#1899D6', mid: '#49BAF6' },
  { bg: '#FFE5E5', color: '#FF4B4B', dark: '#EA3535', mid: '#FF6B6B' },
  { bg: '#E0F8F3', color: '#2EC4B6', dark: '#1A8A7E', mid: '#4DD4C7' },
  { bg: '#FFE8F5', color: '#FF86D0', dark: '#CC5FA0', mid: '#FF9FDB' },
  { bg: '#FFF5D4', color: '#FFC800', dark: '#CC9F00', mid: '#FFD333' },
  { bg: '#EDEAFF', color: '#7B68EE', dark: '#5C49CE', mid: '#9585F0' },
  { bg: '#D8F5EC', color: '#00CD9C', dark: '#009A74', mid: '#33D7B0' },
];

export function getUnitTheme(unitIndex: number): UnitTheme {
  return UNIT_THEMES[unitIndex % UNIT_THEMES.length];
}
