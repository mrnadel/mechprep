import { describe, it, expect } from 'vitest';
import { computeStreakFromDates, computeLongestStreak } from '@/lib/streak-utils';

describe('computeStreakFromDates', () => {
  it('returns 0 for empty dates', () => {
    expect(computeStreakFromDates([], '2026-04-11')).toEqual({ currentStreak: 0, longestStreak: 0 });
  });

  it('returns 1 when only today is active', () => {
    expect(computeStreakFromDates(['2026-04-11'], '2026-04-11')).toEqual({ currentStreak: 1, longestStreak: 1 });
  });

  it('returns consecutive day count', () => {
    const dates = ['2026-04-09', '2026-04-10', '2026-04-11'];
    expect(computeStreakFromDates(dates, '2026-04-11')).toEqual({ currentStreak: 3, longestStreak: 3 });
  });

  it('streak is at-risk if only yesterday is active (not today)', () => {
    const dates = ['2026-04-09', '2026-04-10'];
    const result = computeStreakFromDates(dates, '2026-04-11');
    expect(result.currentStreak).toBe(2);
  });

  it('streak is broken if neither today nor yesterday is active', () => {
    const dates = ['2026-04-08', '2026-04-09'];
    const result = computeStreakFromDates(dates, '2026-04-11');
    expect(result.currentStreak).toBe(0);
    expect(result.longestStreak).toBe(2);
  });

  it('stops counting at first gap', () => {
    const dates = ['2026-04-07', '2026-04-09', '2026-04-10', '2026-04-11'];
    const result = computeStreakFromDates(dates, '2026-04-11');
    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(3);
  });

  it('longest streak is from a past period', () => {
    const dates = ['2026-04-01', '2026-04-02', '2026-04-03', '2026-04-04', '2026-04-05', '2026-04-10', '2026-04-11'];
    const result = computeStreakFromDates(dates, '2026-04-11');
    expect(result.currentStreak).toBe(2);
    expect(result.longestStreak).toBe(5);
  });

  it('handles single active day in the past (broken streak)', () => {
    const dates = ['2026-04-05'];
    const result = computeStreakFromDates(dates, '2026-04-11');
    expect(result.currentStreak).toBe(0);
    expect(result.longestStreak).toBe(1);
  });

  it('handles duplicate dates', () => {
    const dates = ['2026-04-10', '2026-04-10', '2026-04-11', '2026-04-11'];
    const result = computeStreakFromDates(dates, '2026-04-11');
    expect(result.currentStreak).toBe(2);
  });

  describe('with streak freezes', () => {
    it('bridges a 1-day gap with a freeze', () => {
      // Apr 9, [gap Apr 10], Apr 11 — freeze bridges the gap
      const dates = ['2026-04-09', '2026-04-11'];
      const result = computeStreakFromDates(dates, '2026-04-11', 1);
      expect(result.currentStreak).toBe(3); // 11 + frozen 10 + 9
    });

    it('does not bridge a 2-day gap even with freeze', () => {
      // Apr 8, [gap Apr 9, Apr 10], Apr 11 — too wide for single freeze
      const dates = ['2026-04-08', '2026-04-11'];
      const result = computeStreakFromDates(dates, '2026-04-11', 1);
      expect(result.currentStreak).toBe(1); // only today
    });

    it('bridges multiple 1-day gaps with multiple freezes', () => {
      // Apr 7, [gap], Apr 9, [gap], Apr 11
      const dates = ['2026-04-07', '2026-04-09', '2026-04-11'];
      const result = computeStreakFromDates(dates, '2026-04-11', 2);
      expect(result.currentStreak).toBe(5); // 11, frozen 10, 9, frozen 8, 7
    });

    it('does not use more freezes than available', () => {
      // Apr 7, [gap], Apr 9, [gap], Apr 11 — only 1 freeze
      const dates = ['2026-04-07', '2026-04-09', '2026-04-11'];
      const result = computeStreakFromDates(dates, '2026-04-11', 1);
      expect(result.currentStreak).toBe(3); // 11, frozen 10, 9 — stops at gap before 8
    });

    it('works with zero freezes (default)', () => {
      const dates = ['2026-04-09', '2026-04-11'];
      const result = computeStreakFromDates(dates, '2026-04-11');
      expect(result.currentStreak).toBe(1); // only today, gap breaks it
    });
  });
});

describe('computeLongestStreak', () => {
  it('returns 0 for empty array', () => {
    expect(computeLongestStreak([])).toBe(0);
  });

  it('returns 1 for single date', () => {
    expect(computeLongestStreak(['2026-04-11'])).toBe(1);
  });

  it('counts consecutive days', () => {
    expect(computeLongestStreak(['2026-04-09', '2026-04-10', '2026-04-11'])).toBe(3);
  });

  it('finds longest across gaps', () => {
    const dates = ['2026-04-01', '2026-04-02', '2026-04-05', '2026-04-06', '2026-04-07', '2026-04-08'];
    expect(computeLongestStreak(dates)).toBe(4);
  });

  it('handles month boundaries', () => {
    const dates = ['2026-03-30', '2026-03-31', '2026-04-01', '2026-04-02'];
    expect(computeLongestStreak(dates)).toBe(4);
  });

  it('handles year boundaries', () => {
    const dates = ['2025-12-30', '2025-12-31', '2026-01-01', '2026-01-02'];
    expect(computeLongestStreak(dates)).toBe(4);
  });
});
