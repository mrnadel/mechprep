import { describe, it, expect } from 'vitest';
import { getUnitTheme, UNIT_THEMES } from '@/lib/unitThemes';

describe('UNIT_THEMES', () => {
  it('has exactly 10 themes', () => {
    expect(UNIT_THEMES).toHaveLength(10);
  });

  it('each theme has bg, color, dark, and mid properties', () => {
    for (const theme of UNIT_THEMES) {
      expect(theme.bg).toBeTruthy();
      expect(theme.color).toBeTruthy();
      expect(theme.dark).toBeTruthy();
      expect(theme.mid).toBeTruthy();
    }
  });

  it('all theme colors are valid hex strings', () => {
    const hexPattern = /^#[0-9a-fA-F]{6}$/;
    for (const theme of UNIT_THEMES) {
      expect(theme.bg).toMatch(hexPattern);
      expect(theme.color).toMatch(hexPattern);
      expect(theme.dark).toMatch(hexPattern);
      expect(theme.mid).toMatch(hexPattern);
    }
  });
});

describe('getUnitTheme()', () => {
  it('returns the correct theme for index 0', () => {
    const theme = getUnitTheme(0);
    expect(theme).toBe(UNIT_THEMES[0]);
    expect(theme.color).toBe(UNIT_THEMES[0].color);
  });

  it('returns the correct theme for index 9', () => {
    const theme = getUnitTheme(9);
    expect(theme).toBe(UNIT_THEMES[9]);
  });

  it('wraps around for index >= 10 (modulo)', () => {
    const theme10 = getUnitTheme(10);
    expect(theme10).toBe(UNIT_THEMES[0]);

    const theme15 = getUnitTheme(15);
    expect(theme15).toBe(UNIT_THEMES[5]);
  });

  it('handles large indices', () => {
    const theme = getUnitTheme(100);
    expect(theme).toBe(UNIT_THEMES[0]); // 100 % 10 = 0
  });
});
