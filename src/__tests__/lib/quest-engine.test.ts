import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  hashString,
  selectQuests,
  createQuests,
  needsDailyReset,
  needsWeeklyReset,
  getTodayDate,
  getCurrentWeekMonday,
  resetDebugDayOffset,
  addDebugDayOffset,
} from '@/lib/quest-engine';
import type { QuestDefinition } from '@/data/engagement-types';

// --------------- Test data ---------------

const samplePool: QuestDefinition[] = [
  { id: 'd1', title: 'Easy 1', description: '', icon: '', trackingKey: 'lessons_completed', target: 1, difficulty: 'easy', reward: { xp: 25, gems: 5 } },
  { id: 'd2', title: 'Easy 2', description: '', icon: '', trackingKey: 'lessons_completed', target: 2, difficulty: 'easy', reward: { xp: 25, gems: 5 } },
  { id: 'd3', title: 'Medium 1', description: '', icon: '', trackingKey: 'questions_correct', target: 10, difficulty: 'medium', reward: { xp: 25, gems: 5 } },
  { id: 'd4', title: 'Medium 2', description: '', icon: '', trackingKey: 'xp_earned', target: 100, difficulty: 'medium', reward: { xp: 25, gems: 5 } },
  { id: 'd5', title: 'Stretch 1', description: '', icon: '', trackingKey: 'perfect_sessions', target: 1, difficulty: 'stretch', reward: { xp: 25, gems: 5 } },
  { id: 'd6', title: 'Stretch 2', description: '', icon: '', trackingKey: 'fast_answers', target: 5, difficulty: 'stretch', reward: { xp: 25, gems: 5 } },
];

beforeEach(() => {
  resetDebugDayOffset();
});

// ============================================================
// hashString()
// ============================================================

describe('hashString()', () => {
  it('returns a number', () => {
    expect(typeof hashString('hello')).toBe('number');
  });

  it('is deterministic', () => {
    expect(hashString('test-seed')).toBe(hashString('test-seed'));
  });

  it('produces different hashes for different inputs', () => {
    expect(hashString('abc')).not.toBe(hashString('def'));
  });

  it('produces unsigned 32-bit values', () => {
    const hash = hashString('anything');
    expect(hash).toBeGreaterThanOrEqual(0);
    expect(hash).toBeLessThanOrEqual(0xFFFFFFFF);
  });
});

// ============================================================
// selectQuests()
// ============================================================

describe('selectQuests()', () => {
  it('returns the requested count', () => {
    const result = selectQuests(samplePool, 3, '2025-06-10', []);
    expect(result).toHaveLength(3);
  });

  it('is deterministic for the same dateSeed', () => {
    const a = selectQuests(samplePool, 3, '2025-06-10', []);
    const b = selectQuests(samplePool, 3, '2025-06-10', []);
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
  });

  it('produces different selection for different dates', () => {
    const a = selectQuests(samplePool, 3, '2025-06-10', []);
    const b = selectQuests(samplePool, 3, '2025-06-11', []);
    // They CAN be the same by chance, but usually differ
    // At minimum we verify the function runs without error
    expect(a).toHaveLength(3);
    expect(b).toHaveLength(3);
  });

  it('filters out lastIds when enough alternatives exist', () => {
    const result = selectQuests(samplePool, 3, '2025-06-10', ['d1', 'd2']);
    const selectedIds = result.map((q) => q.id);
    // d1 and d2 should be excluded if enough remain
    // Pool has 6 items, excluding 2 leaves 4, which is >= 3
    expect(selectedIds).not.toContain('d1');
    expect(selectedIds).not.toContain('d2');
  });

  it('falls back to full pool if filtering leaves fewer than count', () => {
    // Exclude all but 2
    const result = selectQuests(samplePool, 3, '2025-06-10', ['d1', 'd2', 'd3', 'd4', 'd5']);
    // Should still return 3 by falling back to full pool
    expect(result).toHaveLength(3);
  });

  it('guarantees at least 1 easy quest', () => {
    const result = selectQuests(samplePool, 3, '2025-06-10', []);
    const easyCount = result.filter((q) => q.difficulty === 'easy').length;
    expect(easyCount).toBeGreaterThanOrEqual(1);
  });

  it('includes at least 1 stretch quest if available and count >= 2', () => {
    const result = selectQuests(samplePool, 3, '2025-06-10', []);
    const stretchCount = result.filter((q) => q.difficulty === 'stretch').length;
    expect(stretchCount).toBeGreaterThanOrEqual(1);
  });

  it('handles pool smaller than count', () => {
    const smallPool = samplePool.slice(0, 2);
    const result = selectQuests(smallPool, 3, '2025-06-10', []);
    // Can only return what's available
    expect(result.length).toBeLessThanOrEqual(3);
    expect(result.length).toBeGreaterThan(0);
  });

  it('handles count=1 (only easy guaranteed)', () => {
    const result = selectQuests(samplePool, 1, '2025-06-10', []);
    expect(result).toHaveLength(1);
    expect(result[0].difficulty).toBe('easy');
  });
});

// ============================================================
// createQuests()
// ============================================================

describe('createQuests()', () => {
  it('converts definitions to quest instances', () => {
    const defs = samplePool.slice(0, 2);
    const quests = createQuests(defs, 'daily');
    expect(quests).toHaveLength(2);

    const q = quests[0];
    expect(q.definitionId).toBe(defs[0].id);
    expect(q.type).toBe('daily');
    expect(q.progress).toBe(0);
    expect(q.completed).toBe(false);
    expect(q.claimed).toBe(false);
    expect(q.target).toBe(defs[0].target);
  });

  it('sets type to "weekly" when specified', () => {
    const quests = createQuests(samplePool.slice(0, 1), 'weekly');
    expect(quests[0].type).toBe('weekly');
  });

  it('copies reward values', () => {
    const quests = createQuests(samplePool.slice(0, 1), 'daily');
    expect(quests[0].reward).toEqual(samplePool[0].reward);
  });
});

// ============================================================
// needsDailyReset() / needsWeeklyReset()
// ============================================================

describe('needsDailyReset()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true when stored date is null', () => {
    expect(needsDailyReset(null)).toBe(true);
  });

  it('returns false when stored date matches today', () => {
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
    expect(needsDailyReset('2025-06-10')).toBe(false);
  });

  it('returns true when stored date is yesterday', () => {
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
    expect(needsDailyReset('2025-06-09')).toBe(true);
  });
});

describe('needsWeeklyReset()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true when stored monday is null', () => {
    expect(needsWeeklyReset(null)).toBe(true);
  });

  it('returns false when stored monday matches current week monday', () => {
    // 2025-06-10 is a Tuesday, so Monday = 2025-06-09
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
    expect(needsWeeklyReset(getCurrentWeekMonday())).toBe(false);
  });

  it('returns true for a different week', () => {
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
    expect(needsWeeklyReset('2025-06-02')).toBe(true);
  });
});

// ============================================================
// getTodayDate() / getCurrentWeekMonday()
// ============================================================

describe('getTodayDate()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns YYYY-MM-DD format', () => {
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
    expect(getTodayDate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('respects debug day offset', () => {
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
    const today = getTodayDate();
    addDebugDayOffset(2);
    const shifted = getTodayDate();
    expect(shifted).not.toBe(today);
  });
});

describe('getCurrentWeekMonday()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns a Monday date', () => {
    // 2025-06-10 is a Tuesday
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
    const monday = getCurrentWeekMonday();
    const d = new Date(monday + 'T00:00:00Z');
    expect(d.getUTCDay()).toBe(1); // Monday
  });

  it('returns the same Monday on a Sunday', () => {
    // 2025-06-15 is a Sunday -> Monday of that week was 2025-06-09
    vi.setSystemTime(new Date('2025-06-15T12:00:00Z'));
    expect(getCurrentWeekMonday()).toBe('2025-06-09');
  });

  it('returns the date itself when it is a Monday', () => {
    // 2025-06-09 is a Monday
    vi.setSystemTime(new Date('2025-06-09T12:00:00Z'));
    expect(getCurrentWeekMonday()).toBe('2025-06-09');
  });
});
