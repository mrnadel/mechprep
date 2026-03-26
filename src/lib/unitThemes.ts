export interface UnitTheme {
  bg: string;
  color: string;
  dark: string;
  mid: string;
}

export const UNIT_THEMES: UnitTheme[] = [
  { bg: '#FFF8E1', color: '#D49B00', dark: '#A07600', mid: '#B88A00' },
  { bg: '#F3E6FF', color: '#A855F7', dark: '#7E22CE', mid: '#8B3DC8' },
  { bg: '#FFF0DB', color: '#E07800', dark: '#A35800', mid: '#B86800' },
  { bg: '#DDF4FF', color: '#1295D0', dark: '#0B6F9E', mid: '#1085B8' },
  { bg: '#FFE5E5', color: '#E03E3E', dark: '#B52D2D', mid: '#C43535' },
  { bg: '#E0F8F3', color: '#1A9A8E', dark: '#127068', mid: '#17867C' },
  { bg: '#FFE8F5', color: '#D455A8', dark: '#A83E85', mid: '#BC4A98' },
  { bg: '#FFF5D4', color: '#D4A200', dark: '#A07D00', mid: '#B89000' },
  { bg: '#EDEAFF', color: '#6354CC', dark: '#4A3CA6', mid: '#5648B8' },
  { bg: '#D8F5EC', color: '#00A87E', dark: '#007D5E', mid: '#009470' },
];

export function getUnitTheme(unitIndex: number): UnitTheme {
  return UNIT_THEMES[unitIndex % UNIT_THEMES.length];
}
