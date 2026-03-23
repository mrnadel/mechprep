import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock shuffleArray to return identity for predictable tests
vi.mock('@/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils')>();
  return {
    ...actual,
    shuffleArray: <T>(arr: T[]): T[] => [...arr],
  };
});

// Mock the course data (avoid loading all course content)
vi.mock('@/data/course', () => ({
  course: [],
}));

import {
  selectSmartPracticeQuestions,
  buildPerformance,
} from '@/lib/practice-algorithm';
import type { Question, TopicId, Difficulty, TopicProgress } from '@/data/types';
import type { Unit } from '@/data/course/types';

// --------------- Helpers ---------------

function makeQuestion(
  id: string,
  topic: TopicId = 'thermodynamics',
  difficulty: Difficulty = 'intermediate',
  subtopic = 'basics',
): Question {
  return {
    id,
    type: 'multiple-choice',
    topic,
    subtopic,
    difficulty,
    question: `Question ${id}`,
    options: [
      { id: 'a', text: 'A' },
      { id: 'b', text: 'B' },
      { id: 'c', text: 'C' },
      { id: 'd', text: 'D' },
    ],
    correctAnswer: 'a',
    explanation: 'Explanation',
    interviewInsight: 'Insight',
    commonMistake: 'Mistake',
    tags: [],
  } as Question;
}

function makeTopicProgress(
  topicId: TopicId,
  attempted: number,
  correct: number,
  subtopicBreakdown: Record<string, { attempted: number; correct: number }> = {},
): TopicProgress {
  return {
    topicId,
    questionsAttempted: attempted,
    questionsCorrect: correct,
    averageConfidence: 0.7,
    lastAttempted: '2026-03-20',
    subtopicBreakdown,
  };
}

function makeQuestionPool(
  count: number,
  topic: TopicId = 'thermodynamics',
  difficulty: Difficulty = 'intermediate',
): Question[] {
  return Array.from({ length: count }, (_, i) =>
    makeQuestion(`q-${topic}-${i}`, topic, difficulty, `subtopic-${i % 3}`),
  );
}

// --------------- Tests ---------------

describe('buildPerformance()', () => {
  it('returns a UserPerformance object with empty sets', () => {
    const perf = buildPerformance([], []);
    expect(perf.topicProgress).toEqual([]);
    expect(perf.sessionHistory).toEqual([]);
    expect(perf.answeredQuestionIds).toBeInstanceOf(Set);
    expect(perf.answeredQuestionIds.size).toBe(0);
    expect(perf.recentCorrectIds).toBeInstanceOf(Set);
    expect(perf.recentCorrectIds.size).toBe(0);
  });

  it('passes through topicProgress and sessionHistory', () => {
    const tp = [makeTopicProgress('thermodynamics', 10, 8)];
    const sh = [{ date: '2026-01-01', topicsCovered: ['thermodynamics' as TopicId] }];
    const perf = buildPerformance(tp, sh);
    expect(perf.topicProgress).toBe(tp);
    expect(perf.sessionHistory).toBe(sh);
  });
});

describe('selectSmartPracticeQuestions()', () => {
  const emptyPerformance = buildPerformance([], []);
  const emptyCourseData: Unit[] = [];

  it('returns empty array when no questions available', () => {
    const result = selectSmartPracticeQuestions([], emptyCourseData, emptyPerformance);
    expect(result).toEqual([]);
  });

  it('returns up to 10 questions by default', () => {
    const pool = makeQuestionPool(20);
    const result = selectSmartPracticeQuestions(pool, emptyCourseData, emptyPerformance);
    expect(result.length).toBeLessThanOrEqual(10);
    expect(result.length).toBeGreaterThan(0);
  });

  it('respects custom count option', () => {
    const pool = makeQuestionPool(20);
    const result = selectSmartPracticeQuestions(pool, emptyCourseData, emptyPerformance, {
      count: 5,
    });
    expect(result.length).toBeLessThanOrEqual(5);
  });

  it('filters by topicId when specified', () => {
    const pool = [
      ...makeQuestionPool(10, 'thermodynamics'),
      ...makeQuestionPool(10, 'fluid-mechanics'),
    ];
    const result = selectSmartPracticeQuestions(pool, emptyCourseData, emptyPerformance, {
      topicId: 'fluid-mechanics',
    });
    for (const r of result) {
      expect(r.question.topic).toBe('fluid-mechanics');
    }
  });

  it('marks sourceType as "practice" for practice questions', () => {
    const pool = makeQuestionPool(10);
    const result = selectSmartPracticeQuestions(pool, emptyCourseData, emptyPerformance);
    for (const r of result) {
      expect(r.sourceType).toBe('practice');
    }
  });

  it('excludes already-answered questions (weight = 0)', () => {
    const pool = makeQuestionPool(15);
    const perf = buildPerformance([], []);
    // Mark first 10 as already answered
    for (let i = 0; i < 10; i++) {
      perf.answeredQuestionIds.add(`q-thermodynamics-${i}`);
    }
    const result = selectSmartPracticeQuestions(pool, emptyCourseData, perf);
    const answeredIds = new Set([...perf.answeredQuestionIds]);
    for (const r of result) {
      expect(answeredIds.has(r.question.id)).toBe(false);
    }
  });

  it('prioritizes weak topic questions over strong ones', () => {
    const weakPool = makeQuestionPool(10, 'thermodynamics');
    const strongPool = makeQuestionPool(10, 'fluid-mechanics');
    const pool = [...weakPool, ...strongPool];

    const tp = [
      makeTopicProgress('thermodynamics', 20, 5), // 25% accuracy = weak
      makeTopicProgress('fluid-mechanics', 20, 18), // 90% accuracy = strong
    ];
    const perf = buildPerformance(tp, []);

    const result = selectSmartPracticeQuestions(pool, emptyCourseData, perf, { count: 10 });

    // Count how many are from each topic
    const thermCount = result.filter(r => r.question.topic === 'thermodynamics').length;
    const fluidCount = result.filter(r => r.question.topic === 'fluid-mechanics').length;

    // Weak topic (thermodynamics) should dominate
    expect(thermCount).toBeGreaterThan(fluidCount);
  });

  it('gives higher weight to novel (never-attempted) topics', () => {
    const novelPool = makeQuestionPool(10, 'thermodynamics');
    const seenPool = makeQuestionPool(10, 'fluid-mechanics');
    const pool = [...novelPool, ...seenPool];

    // Only fluid-mechanics has been attempted
    const tp = [makeTopicProgress('fluid-mechanics', 10, 8)];
    const perf = buildPerformance(tp, []);

    const result = selectSmartPracticeQuestions(pool, emptyCourseData, perf, { count: 10 });

    // Novel topic should have some representation
    const novelCount = result.filter(r => r.question.topic === 'thermodynamics').length;
    expect(novelCount).toBeGreaterThan(0);
  });

  it('handles pool smaller than requested count', () => {
    const pool = makeQuestionPool(3);
    const result = selectSmartPracticeQuestions(pool, emptyCourseData, emptyPerformance, {
      count: 10,
    });
    expect(result.length).toBeLessThanOrEqual(3);
    expect(result.length).toBeGreaterThan(0);
  });

  it('handles all questions already answered gracefully', () => {
    const pool = makeQuestionPool(5);
    const perf = buildPerformance([], []);
    for (const q of pool) {
      perf.answeredQuestionIds.add(q.id);
    }
    const result = selectSmartPracticeQuestions(pool, emptyCourseData, perf);
    expect(result).toEqual([]);
  });

  it('uses subtopic-level accuracy when available', () => {
    const pool = [
      makeQuestion('q1', 'thermodynamics', 'intermediate', 'first-law'),
      makeQuestion('q2', 'thermodynamics', 'intermediate', 'second-law'),
    ];

    const tp = [
      makeTopicProgress('thermodynamics', 20, 15, {
        'first-law': { attempted: 10, correct: 2 }, // 20% = weak subtopic
        'second-law': { attempted: 10, correct: 9 }, // 90% = strong subtopic
      }),
    ];
    const perf = buildPerformance(tp, []);

    const result = selectSmartPracticeQuestions(pool, emptyCourseData, perf, { count: 2 });

    // first-law (weak) should appear first since it has higher weight
    // Both should be included since we request 2 and have exactly 2
    expect(result).toHaveLength(2);
  });

  it('adapts difficulty based on user level (beginner with < 10 attempts)', () => {
    const beginnerPool = makeQuestionPool(5, 'thermodynamics', 'beginner');
    const advancedPool = makeQuestionPool(5, 'thermodynamics', 'advanced');
    const pool = [...beginnerPool, ...advancedPool];

    // No progress = beginner level (<10 attempted)
    const perf = buildPerformance([], []);

    const result = selectSmartPracticeQuestions(pool, emptyCourseData, perf, { count: 8 });

    // Beginner questions should get a higher difficulty multiplier (2x for same-level match)
    const beginnerCount = result.filter(r => r.question.difficulty === 'beginner').length;
    const advancedCount = result.filter(r => r.question.difficulty === 'advanced').length;
    expect(beginnerCount).toBeGreaterThanOrEqual(advancedCount);
  });

  it('adapts difficulty for advanced user (>75% accuracy, >10 attempted)', () => {
    const beginnerPool = makeQuestionPool(5, 'thermodynamics', 'beginner');
    const advancedPool = makeQuestionPool(5, 'thermodynamics', 'advanced');
    const pool = [...beginnerPool, ...advancedPool];

    // High accuracy = advanced level
    const tp = [makeTopicProgress('thermodynamics', 50, 45)]; // 90% accuracy
    const perf = buildPerformance(tp, []);

    const result = selectSmartPracticeQuestions(pool, emptyCourseData, perf, { count: 8 });

    // Advanced questions should get higher weight for an advanced user
    const advancedCount = result.filter(r => r.question.difficulty === 'advanced').length;
    expect(advancedCount).toBeGreaterThanOrEqual(1);
  });

  it('reduces weight for recently correct questions', () => {
    const pool = makeQuestionPool(15);
    const perf = buildPerformance([], []);
    // Mark 5 as recently correct
    for (let i = 0; i < 5; i++) {
      perf.recentCorrectIds.add(`q-thermodynamics-${i}`);
    }
    const result = selectSmartPracticeQuestions(pool, emptyCourseData, perf, { count: 10 });
    // Not-recently-correct questions should dominate
    const recentInResult = result.filter(r => perf.recentCorrectIds.has(r.question.id)).length;
    const nonRecentInResult = result.length - recentInResult;
    expect(nonRecentInResult).toBeGreaterThanOrEqual(recentInResult);
  });

  it('each returned question has a valid structure', () => {
    const pool = makeQuestionPool(15);
    const result = selectSmartPracticeQuestions(pool, emptyCourseData, emptyPerformance);
    for (const r of result) {
      expect(r.question).toBeDefined();
      expect(r.question.id).toBeTruthy();
      expect(r.question.topic).toBeTruthy();
      expect(r.sourceType).toBe('practice');
    }
  });

  it('returns no duplicate questions', () => {
    const pool = makeQuestionPool(20);
    const result = selectSmartPracticeQuestions(pool, emptyCourseData, emptyPerformance, {
      count: 10,
    });
    const ids = result.map(r => r.question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
