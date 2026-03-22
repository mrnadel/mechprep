import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  computeMastery,
  getMasteryLevel,
  computeAllMastery,
} from '@/data/mastery';
import type { AnswerEvent } from '@/data/mastery';
import type { TopicId } from '@/data/types';

// --------------- Helpers ---------------

function makeEvent(overrides: Partial<AnswerEvent> = {}): AnswerEvent {
  return {
    id: 'e1',
    questionId: 'q1',
    topicId: 'thermodynamics',
    difficulty: 'intermediate',
    correct: true,
    source: 'practice',
    answeredAt: new Date().toISOString(),
    ...overrides,
  };
}

// ============================================================
// computeMastery()
// ============================================================

describe('computeMastery()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 0 for empty events', () => {
    expect(computeMastery([])).toBe(0);
  });

  it('returns high score for many recent correct answers', () => {
    const events: AnswerEvent[] = Array.from({ length: 10 }, (_, i) =>
      makeEvent({
        id: `e${i}`,
        correct: true,
        difficulty: 'intermediate',
        answeredAt: '2025-06-10T10:00:00Z', // today
      })
    );
    const score = computeMastery(events);
    expect(score).toBeGreaterThan(50);
  });

  it('applies recency decay for old events', () => {
    // Event from 14 days ago (one half-life)
    const recentEvent = makeEvent({
      id: 'recent',
      correct: true,
      answeredAt: '2025-06-10T10:00:00Z',
    });
    const oldEvent = makeEvent({
      id: 'old',
      correct: true,
      answeredAt: '2025-05-27T10:00:00Z', // 14 days ago = 1 half-life
    });

    const recentScore = computeMastery([recentEvent]);
    const oldScore = computeMastery([oldEvent]);
    // Old event should contribute less (decayed recency)
    expect(recentScore).toBeGreaterThan(oldScore);
  });

  it('weighs advanced questions higher than beginner', () => {
    const advEvent = makeEvent({ id: 'adv', difficulty: 'advanced', correct: true, answeredAt: '2025-06-10T10:00:00Z' });
    const begEvent = makeEvent({ id: 'beg', difficulty: 'beginner', correct: true, answeredAt: '2025-06-10T10:00:00Z' });

    // Both are single events, but advanced has weight 1.5 vs beginner 0.6
    // For a single correct event: rawAccuracy = 1.0
    // confidence = totalWeight / 8. Advanced: 1.5/8, beginner: 0.6/8
    // score = 1.0 * (weight/8) * 100
    const advScore = computeMastery([advEvent]);
    const begScore = computeMastery([begEvent]);
    expect(advScore).toBeGreaterThan(begScore);
  });

  it('returns lower score for all incorrect answers', () => {
    const events = Array.from({ length: 10 }, (_, i) =>
      makeEvent({
        id: `e${i}`,
        correct: false,
        answeredAt: '2025-06-10T10:00:00Z',
      })
    );
    expect(computeMastery(events)).toBe(0);
  });

  it('applies confidence threshold (capped at totalWeight/8)', () => {
    // Single intermediate event: weight = 1.0 * ~1.0 recency = ~1.0
    // confidence = 1.0 / 8 = 0.125
    // score = 1.0 * 0.125 * 100 = 12 (approximately)
    const single = [makeEvent({ correct: true, answeredAt: '2025-06-10T10:00:00Z' })];
    const score = computeMastery(single);
    expect(score).toBeLessThan(20); // well under due to low confidence
    expect(score).toBeGreaterThan(0);
  });

  it('reaches 100 with enough recent correct advanced answers', () => {
    // Need: rawAccuracy = 1.0, confidence = 1.0 (totalWeight >= 8)
    // Advanced weight = 1.5, so 6 events = 9.0 total weight > 8
    const events = Array.from({ length: 6 }, (_, i) =>
      makeEvent({
        id: `e${i}`,
        difficulty: 'advanced',
        correct: true,
        answeredAt: '2025-06-10T10:00:00Z',
      })
    );
    expect(computeMastery(events)).toBe(100);
  });

  it('mixed correct/incorrect gives intermediate score', () => {
    const events = [
      makeEvent({ id: 'e1', correct: true, answeredAt: '2025-06-10T10:00:00Z' }),
      makeEvent({ id: 'e2', correct: false, answeredAt: '2025-06-10T10:00:00Z' }),
      makeEvent({ id: 'e3', correct: true, answeredAt: '2025-06-10T10:00:00Z' }),
      makeEvent({ id: 'e4', correct: false, answeredAt: '2025-06-10T10:00:00Z' }),
      makeEvent({ id: 'e5', correct: true, answeredAt: '2025-06-10T10:00:00Z' }),
      makeEvent({ id: 'e6', correct: false, answeredAt: '2025-06-10T10:00:00Z' }),
      makeEvent({ id: 'e7', correct: true, answeredAt: '2025-06-10T10:00:00Z' }),
      makeEvent({ id: 'e8', correct: false, answeredAt: '2025-06-10T10:00:00Z' }),
    ];
    const score = computeMastery(events);
    // 4/8 correct, all intermediate (weight=1.0), all recent (recency~1.0)
    // rawAccuracy = 4/8 = 0.5, totalWeight = 8, confidence = 8/8 = 1.0
    // score = 0.5 * 1.0 * 100 = 50
    expect(score).toBe(50);
  });
});

// ============================================================
// getMasteryLevel()
// ============================================================

describe('getMasteryLevel()', () => {
  it('returns "not-started" when eventCount is 0', () => {
    expect(getMasteryLevel(50, 0)).toBe('not-started');
  });

  it('returns "strong" for score >= 75', () => {
    expect(getMasteryLevel(75, 10)).toBe('strong');
    expect(getMasteryLevel(100, 10)).toBe('strong');
  });

  it('returns "developing" for score 40-74', () => {
    expect(getMasteryLevel(40, 10)).toBe('developing');
    expect(getMasteryLevel(74, 10)).toBe('developing');
  });

  it('returns "needs-work" for score < 40', () => {
    expect(getMasteryLevel(39, 10)).toBe('needs-work');
    expect(getMasteryLevel(0, 10)).toBe('needs-work');
  });
});

// ============================================================
// computeAllMastery()
// ============================================================

describe('computeAllMastery()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns one entry per topicId', () => {
    const topics: TopicId[] = ['thermodynamics', 'fluid-mechanics'];
    const results = computeAllMastery([], topics);
    expect(results).toHaveLength(2);
    expect(results[0].topicId).toBe('thermodynamics');
    expect(results[1].topicId).toBe('fluid-mechanics');
  });

  it('assigns score 0 and "not-started" for topics with no events', () => {
    const topics: TopicId[] = ['thermodynamics'];
    const results = computeAllMastery([], topics);
    expect(results[0].score).toBe(0);
    expect(results[0].level).toBe('not-started');
    expect(results[0].eventCount).toBe(0);
    expect(results[0].lastPracticed).toBeNull();
  });

  it('computes mastery per topic correctly', () => {
    const events: AnswerEvent[] = [
      makeEvent({ id: 'e1', topicId: 'thermodynamics', correct: true, difficulty: 'advanced', answeredAt: '2025-06-10T10:00:00Z' }),
      makeEvent({ id: 'e2', topicId: 'thermodynamics', correct: true, difficulty: 'advanced', answeredAt: '2025-06-10T10:00:00Z' }),
      makeEvent({ id: 'e3', topicId: 'fluid-mechanics', correct: false, difficulty: 'beginner', answeredAt: '2025-06-10T10:00:00Z' }),
    ];
    const topics: TopicId[] = ['thermodynamics', 'fluid-mechanics'];
    const results = computeAllMastery(events, topics);

    expect(results[0].eventCount).toBe(2);
    expect(results[0].score).toBeGreaterThan(0);
    expect(results[1].eventCount).toBe(1);
    expect(results[1].score).toBe(0); // all incorrect
  });

  it('sets lastPracticed to the most recent event date', () => {
    const events: AnswerEvent[] = [
      makeEvent({ id: 'e1', topicId: 'thermodynamics', answeredAt: '2025-06-08T10:00:00Z' }),
      makeEvent({ id: 'e2', topicId: 'thermodynamics', answeredAt: '2025-06-10T10:00:00Z' }),
      makeEvent({ id: 'e3', topicId: 'thermodynamics', answeredAt: '2025-06-05T10:00:00Z' }),
    ];
    const results = computeAllMastery(events, ['thermodynamics']);
    expect(results[0].lastPracticed).toBe('2025-06-10');
  });
});
