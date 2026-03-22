import { describe, it, expect } from 'vitest';
import { getLevelForXp, getXpToNextLevel, levels } from '@/data/levels';

// ============================================================
// getLevelForXp()
// ============================================================

describe('getLevelForXp()', () => {
  it('returns level 1 for 0 XP', () => {
    const level = getLevelForXp(0);
    expect(level.level).toBe(1);
    expect(level.title).toBe('Apprentice');
  });

  it('returns level 1 for 99 XP (just below level 2)', () => {
    const level = getLevelForXp(99);
    expect(level.level).toBe(1);
  });

  it('returns level 2 for exactly 100 XP', () => {
    const level = getLevelForXp(100);
    expect(level.level).toBe(2);
  });

  it('returns level 2 for 249 XP (just below level 3)', () => {
    const level = getLevelForXp(249);
    expect(level.level).toBe(2);
  });

  it('returns level 3 for exactly 250 XP', () => {
    const level = getLevelForXp(250);
    expect(level.level).toBe(3);
  });

  it('returns level 30 (max) for 100000 XP', () => {
    const level = getLevelForXp(100000);
    expect(level.level).toBe(30);
    expect(level.title).toBe('Mechanical Grandmaster');
  });

  it('returns max level for XP far above max', () => {
    const level = getLevelForXp(999999);
    expect(level.level).toBe(30);
  });

  it('handles every level boundary correctly', () => {
    for (const lvl of levels) {
      const result = getLevelForXp(lvl.xpRequired);
      expect(result.level).toBe(lvl.level);
    }
  });

  it('one XP below each boundary returns previous level', () => {
    for (let i = 1; i < levels.length; i++) {
      const result = getLevelForXp(levels[i].xpRequired - 1);
      expect(result.level).toBe(levels[i - 1].level);
    }
  });

  it('returns level 15 (Senior Engineer) at 12500 XP', () => {
    const level = getLevelForXp(12500);
    expect(level.level).toBe(15);
    expect(level.title).toBe('Senior Engineer');
  });
});

// ============================================================
// getXpToNextLevel()
// ============================================================

describe('getXpToNextLevel()', () => {
  it('returns correct progress at 0 XP', () => {
    const result = getXpToNextLevel(0);
    expect(result.current.level).toBe(1);
    expect(result.next?.level).toBe(2);
    expect(result.xpNeeded).toBe(100);
    expect(result.progress).toBe(0);
  });

  it('returns correct progress at 50 XP (halfway to level 2)', () => {
    const result = getXpToNextLevel(50);
    expect(result.current.level).toBe(1);
    expect(result.next?.level).toBe(2);
    expect(result.xpNeeded).toBe(50);
    expect(result.progress).toBeCloseTo(0.5);
  });

  it('returns progress=0 at exact level boundary', () => {
    const result = getXpToNextLevel(100);
    expect(result.current.level).toBe(2);
    expect(result.next?.level).toBe(3);
    expect(result.xpNeeded).toBe(150); // 250 - 100
    expect(result.progress).toBe(0);
  });

  it('returns null next and progress=1 at max level', () => {
    const result = getXpToNextLevel(100000);
    expect(result.current.level).toBe(30);
    expect(result.next).toBeNull();
    expect(result.xpNeeded).toBe(0);
    expect(result.progress).toBe(1);
  });

  it('returns null next and progress=1 beyond max XP', () => {
    const result = getXpToNextLevel(200000);
    expect(result.current.level).toBe(30);
    expect(result.next).toBeNull();
    expect(result.progress).toBe(1);
  });

  it('progress does not exceed 1', () => {
    // Right at boundary of next level (but still current level)
    const result = getXpToNextLevel(99);
    expect(result.progress).toBeLessThanOrEqual(1);
  });

  it('xpNeeded is always non-negative', () => {
    for (const lvl of levels) {
      const result = getXpToNextLevel(lvl.xpRequired);
      expect(result.xpNeeded).toBeGreaterThanOrEqual(0);
    }
  });

  it('calculates mid-level progress correctly', () => {
    // Level 10 starts at 4500, level 11 at 5700
    // At 5100: xpIntoLevel = 600, xpForLevel = 1200
    const result = getXpToNextLevel(5100);
    expect(result.current.level).toBe(10);
    expect(result.next?.level).toBe(11);
    expect(result.xpNeeded).toBe(600); // 5700 - 5100
    expect(result.progress).toBeCloseTo(0.5);
  });
});
