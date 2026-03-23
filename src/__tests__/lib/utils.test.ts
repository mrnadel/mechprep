import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  cn,
  formatNumber,
  formatDuration,
  formatDate,
  getRelativeTime,
  getDifficultyColor,
  getDifficultyLabel,
  getQuestionTypeLabel,
  getQuestionTypeIcon,
  calculateXP,
  calculateMastery,
  shuffleArray,
  getStreakStatus,
  getInterviewReadiness,
} from '@/lib/utils';
import type { Question, Difficulty, QuestionType } from '@/data/types';

// --------------- Helper to build a minimal Question ---------------

function makeQuestion(overrides: Partial<Question> & { difficulty: Difficulty }): Question {
  return {
    id: 'q1',
    type: 'multiple-choice',
    topic: 'thermodynamics',
    subtopic: 'first-law',
    question: 'Test?',
    explanation: '',
    interviewInsight: '',
    commonMistake: '',
    tags: [],
    options: [{ id: 'a', text: 'A' }],
    correctAnswer: 'a',
    ...overrides,
  } as Question;
}

// ============================================================
// cn()
// ============================================================

describe('cn()', () => {
  it('joins truthy class strings', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('filters out falsy values', () => {
    expect(cn('a', false, null, undefined, '', 'b')).toBe('a b');
  });

  it('returns empty string when all falsy', () => {
    expect(cn(false, null, undefined)).toBe('');
  });

  it('returns empty string with no args', () => {
    expect(cn()).toBe('');
  });
});

// ============================================================
// formatNumber()
// ============================================================

describe('formatNumber()', () => {
  it('returns plain number below 1000', () => {
    expect(formatNumber(999)).toBe('999');
  });

  it('formats 1000 as 1.0k', () => {
    expect(formatNumber(1000)).toBe('1.0k');
  });

  it('formats 1500 as 1.5k', () => {
    expect(formatNumber(1500)).toBe('1.5k');
  });

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('formats large numbers', () => {
    expect(formatNumber(25000)).toBe('25.0k');
  });
});

// ============================================================
// formatDuration()
// ============================================================

describe('formatDuration()', () => {
  it('returns seconds only when < 60', () => {
    expect(formatDuration(45)).toBe('45s');
  });

  it('returns minutes and seconds', () => {
    expect(formatDuration(125)).toBe('2m 5s');
  });

  it('handles exact minutes', () => {
    expect(formatDuration(120)).toBe('2m 0s');
  });

  it('handles zero', () => {
    expect(formatDuration(0)).toBe('0s');
  });
});

// ============================================================
// formatDate()
// ============================================================

describe('formatDate()', () => {
  it('formats an ISO date string', () => {
    const result = formatDate('2025-03-15');
    expect(result).toMatch(/Mar/);
    expect(result).toMatch(/15/);
  });
});

// ============================================================
// getRelativeTime()
// ============================================================

describe('getRelativeTime()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "Today" for same-day dates', () => {
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
    expect(getRelativeTime('2025-06-10T08:00:00Z')).toBe('Today');
  });

  it('returns "Yesterday" for 1 day ago', () => {
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
    expect(getRelativeTime('2025-06-09T12:00:00Z')).toBe('Yesterday');
  });

  it('returns "X days ago" for 2-6 days', () => {
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
    expect(getRelativeTime('2025-06-06T12:00:00Z')).toBe('4 days ago');
  });

  it('returns "X weeks ago" for 7-29 days', () => {
    vi.setSystemTime(new Date('2025-06-30T12:00:00Z'));
    expect(getRelativeTime('2025-06-16T12:00:00Z')).toBe('2 weeks ago');
  });

  it('returns formatted date for 30+ days', () => {
    vi.setSystemTime(new Date('2025-08-10T12:00:00Z'));
    const result = getRelativeTime('2025-03-15T12:00:00Z');
    expect(result).toMatch(/Mar/);
  });
});

// ============================================================
// getDifficultyColor() / getDifficultyLabel()
// ============================================================

describe('getDifficultyColor()', () => {
  it('returns emerald classes for beginner', () => {
    expect(getDifficultyColor('beginner')).toContain('emerald');
  });

  it('returns amber classes for intermediate', () => {
    expect(getDifficultyColor('intermediate')).toContain('amber');
  });

  it('returns red classes for advanced', () => {
    expect(getDifficultyColor('advanced')).toContain('red');
  });
});

describe('getDifficultyLabel()', () => {
  it('returns "Beginner"', () => {
    expect(getDifficultyLabel('beginner')).toBe('Beginner');
  });

  it('returns "Intermediate"', () => {
    expect(getDifficultyLabel('intermediate')).toBe('Intermediate');
  });

  it('returns "Advanced"', () => {
    expect(getDifficultyLabel('advanced')).toBe('Advanced');
  });
});

// ============================================================
// getQuestionTypeLabel() / getQuestionTypeIcon()
// ============================================================

describe('getQuestionTypeLabel()', () => {
  it('maps multiple-choice', () => {
    expect(getQuestionTypeLabel('multiple-choice')).toBe('Multiple Choice');
  });

  it('maps scenario', () => {
    expect(getQuestionTypeLabel('scenario')).toBe('Scenario');
  });

  it('maps all known types', () => {
    const types: QuestionType[] = [
      'multiple-choice', 'two-choice-tradeoff', 'multi-select', 'ranking',
      'scenario', 'spot-the-flaw', 'estimation',
      'confidence-rated', 'what-fails-first',
      'design-decision', 'material-selection',
    ];
    for (const t of types) {
      expect(getQuestionTypeLabel(t)).toBeTruthy();
    }
  });
});

describe('getQuestionTypeIcon()', () => {
  it('maps multiple-choice to circle icon', () => {
    expect(getQuestionTypeIcon('multiple-choice')).toBe('○');
  });

  it('maps all known types to a non-? icon', () => {
    const types: QuestionType[] = [
      'multiple-choice', 'two-choice-tradeoff', 'multi-select', 'ranking',
      'scenario', 'spot-the-flaw', 'estimation',
      'confidence-rated', 'what-fails-first',
      'design-decision', 'material-selection',
    ];
    for (const t of types) {
      expect(getQuestionTypeIcon(t)).not.toBe('?');
    }
  });
});

// ============================================================
// calculateXP()
// ============================================================

describe('calculateXP()', () => {
  // Base XP: beginner=20, intermediate=35, advanced=55

  it('gives 15% of base XP for incorrect answer (beginner)', () => {
    const q = makeQuestion({ difficulty: 'beginner' });
    expect(calculateXP(q, false, 20)).toBe(Math.round(20 * 0.15));
  });

  it('gives 15% of base XP for incorrect answer (intermediate)', () => {
    const q = makeQuestion({ difficulty: 'intermediate' });
    expect(calculateXP(q, false, 20)).toBe(Math.round(35 * 0.15));
  });

  it('gives 15% of base XP for incorrect answer (advanced)', () => {
    const q = makeQuestion({ difficulty: 'advanced' });
    expect(calculateXP(q, false, 20)).toBe(Math.round(55 * 0.15));
  });

  it('gives base XP for correct answer with no bonuses (30+ seconds, no confidence)', () => {
    const q = makeQuestion({ difficulty: 'beginner' });
    expect(calculateXP(q, true, 35)).toBe(20);
  });

  it('gives 30% speed bonus for answer under 15 seconds', () => {
    const q = makeQuestion({ difficulty: 'intermediate' });
    expect(calculateXP(q, true, 10)).toBe(Math.round(35 * 1.3));
  });

  it('gives 15% speed bonus for answer under 30 seconds', () => {
    const q = makeQuestion({ difficulty: 'intermediate' });
    expect(calculateXP(q, true, 20)).toBe(Math.round(35 * 1.15));
  });

  it('gives no speed bonus at exactly 30 seconds', () => {
    const q = makeQuestion({ difficulty: 'advanced' });
    expect(calculateXP(q, true, 30)).toBe(55);
  });

  it('gives no speed bonus at exactly 15 seconds', () => {
    const q = makeQuestion({ difficulty: 'advanced' });
    // 15 seconds is NOT < 15, so falls to second check: < 30
    expect(calculateXP(q, true, 15)).toBe(Math.round(55 * 1.15));
  });

  it('gives confidence bonus (high confidence, correct)', () => {
    const q = makeQuestion({ difficulty: 'beginner' });
    // no speed bonus (35s), confidence=4 -> *1.1
    expect(calculateXP(q, true, 35, 4)).toBe(Math.round(20 * 1.1));
  });

  it('gives confidence bonus (low confidence, correct = learning moment)', () => {
    const q = makeQuestion({ difficulty: 'beginner' });
    // no speed bonus (35s), confidence=2 -> *1.2
    expect(calculateXP(q, true, 35, 2)).toBe(Math.round(20 * 1.2));
  });

  it('gives confidence bonus for confidence=1 (learning moment)', () => {
    const q = makeQuestion({ difficulty: 'beginner' });
    expect(calculateXP(q, true, 35, 1)).toBe(Math.round(20 * 1.2));
  });

  it('gives confidence=5 (high confidence) bonus', () => {
    const q = makeQuestion({ difficulty: 'beginner' });
    expect(calculateXP(q, true, 35, 5)).toBe(Math.round(20 * 1.1));
  });

  it('gives no confidence bonus for confidence=3', () => {
    const q = makeQuestion({ difficulty: 'beginner' });
    expect(calculateXP(q, true, 35, 3)).toBe(20);
  });

  it('stacks speed and confidence bonuses', () => {
    const q = makeQuestion({ difficulty: 'advanced' });
    // speed < 15 -> *1.3, confidence=5 -> *1.1
    expect(calculateXP(q, true, 10, 5)).toBe(Math.round(55 * 1.3 * 1.1));
  });

  it('incorrect answer ignores confidence and speed', () => {
    const q = makeQuestion({ difficulty: 'advanced' });
    expect(calculateXP(q, false, 5, 5)).toBe(Math.round(55 * 0.15));
  });
});

// ============================================================
// calculateMastery()
// ============================================================

describe('calculateMastery()', () => {
  it('returns 0 when attempted=0', () => {
    expect(calculateMastery(0, 0)).toBe(0);
  });

  it('calculates correctly with full volume and recency', () => {
    // 20 attempted, 20 correct, recency=1 -> accuracy=1, volume=1 -> 100
    expect(calculateMastery(20, 20, 1)).toBe(100);
  });

  it('caps volume at 20 questions', () => {
    // 40 attempted, 40 correct -> accuracy=1, volume=min(40/20,1)=1 -> 100
    expect(calculateMastery(40, 40, 1)).toBe(100);
  });

  it('scales with accuracy', () => {
    // 20 attempted, 10 correct -> accuracy=0.5, volume=1, recency=1 -> 50
    expect(calculateMastery(20, 10, 1)).toBe(50);
  });

  it('scales with volume when under 20', () => {
    // 10 attempted, 10 correct -> accuracy=1, volume=0.5, recency=1 -> 50
    expect(calculateMastery(10, 10, 1)).toBe(50);
  });

  it('scales with recency factor', () => {
    // 20 attempted, 20 correct, recency=0.5 -> 50
    expect(calculateMastery(20, 20, 0.5)).toBe(50);
  });

  it('defaults recency to 1', () => {
    expect(calculateMastery(20, 20)).toBe(100);
  });

  it('rounds the result', () => {
    // 20 attempted, 13 correct -> accuracy=0.65, volume=1, recency=1 -> 65
    expect(calculateMastery(20, 13, 1)).toBe(65);
  });
});

// ============================================================
// shuffleArray()
// ============================================================

describe('shuffleArray()', () => {
  it('returns a new array (does not mutate original)', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    shuffleArray(original);
    expect(original).toEqual(copy);
  });

  it('returns array with same length', () => {
    const result = shuffleArray([1, 2, 3, 4, 5]);
    expect(result).toHaveLength(5);
  });

  it('contains all original elements', () => {
    const result = shuffleArray([1, 2, 3, 4, 5]);
    expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles empty array', () => {
    expect(shuffleArray([])).toEqual([]);
  });

  it('handles single-element array', () => {
    expect(shuffleArray([42])).toEqual([42]);
  });
});

// ============================================================
// getStreakStatus()
// ============================================================

describe('getStreakStatus()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "active" when lastActiveDate is today', () => {
    vi.setSystemTime(new Date('2025-06-10T15:00:00Z'));
    expect(getStreakStatus('2025-06-10')).toBe('active');
  });

  it('returns "at-risk" when lastActiveDate is yesterday', () => {
    vi.setSystemTime(new Date('2025-06-10T15:00:00Z'));
    expect(getStreakStatus('2025-06-09')).toBe('at-risk');
  });

  it('returns "broken" when lastActiveDate is 2+ days ago', () => {
    vi.setSystemTime(new Date('2025-06-10T15:00:00Z'));
    expect(getStreakStatus('2025-06-08')).toBe('broken');
  });

  it('returns "broken" for very old dates', () => {
    vi.setSystemTime(new Date('2025-06-10T15:00:00Z'));
    expect(getStreakStatus('2024-01-01')).toBe('broken');
  });
});

// ============================================================
// getInterviewReadiness()
// ============================================================

describe('getInterviewReadiness()', () => {
  it('returns 0 for empty progress', () => {
    expect(getInterviewReadiness({})).toBe(0);
  });

  it('computes readiness with full progress', () => {
    const progress: Record<string, { accuracy: number; attempted: number }> = {};
    // All 11 topics with 20 attempts and 90% accuracy
    for (let i = 0; i < 11; i++) {
      progress[`topic-${i}`] = { accuracy: 0.9, attempted: 20 };
    }
    const result = getInterviewReadiness(progress);
    // coverage = 11/11 = 1, avgAccuracy = 0.9, depth = 11/11 = 1
    // (1 * 0.3 + 0.9 * 0.4 + 1 * 0.3) * 100 = 96
    expect(result).toBe(96);
  });

  it('coverage counts topics with >= 5 attempts', () => {
    const progress: Record<string, { accuracy: number; attempted: number }> = {
      t1: { accuracy: 0.8, attempted: 5 },
      t2: { accuracy: 0.8, attempted: 4 }, // doesn't count
    };
    const result = getInterviewReadiness(progress);
    // coverage = 1/11, avgAccuracy = 0.8, depth = 0/11
    // (1/11 * 0.3 + 0.8 * 0.4 + 0) * 100
    const expected = Math.round(((1 / 11) * 0.3 + 0.8 * 0.4 + 0) * 100);
    expect(result).toBe(expected);
  });

  it('depth counts topics with >= 15 attempts', () => {
    const progress: Record<string, { accuracy: number; attempted: number }> = {
      t1: { accuracy: 1.0, attempted: 15 },
      t2: { accuracy: 1.0, attempted: 14 }, // doesn't count for depth
    };
    const result = getInterviewReadiness(progress);
    // coverage = 2/11, avgAccuracy = 1.0, depth = 1/11
    const expected = Math.round(((2 / 11) * 0.3 + 1.0 * 0.4 + (1 / 11) * 0.3) * 100);
    expect(result).toBe(expected);
  });
});
