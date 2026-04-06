/**
 * Review Engine — identifies questions that need spaced-repetition review.
 *
 * Uses per-question mastery scores (same algorithm as mastery.ts) to find
 * questions the user previously answered correctly but whose mastery has
 * decayed below the review threshold.
 */

import { computeMastery, type AnswerEvent } from '@/data/mastery';
import type { Unit } from '@/data/course/types';

/** A question that needs review, with context about where it lives. */
export interface ReviewCandidate {
  questionId: string;
  unitIndex: number;
  lessonIndex: number;
  score: number;
}

/** Mastery score below which a question is flagged for review. */
const REVIEW_THRESHOLD = 50;

/**
 * Find questions where the user previously answered correctly but mastery
 * has decayed below the threshold.
 *
 * Only returns questions from units the user has started (has at least one
 * answer event for that unit's topic).
 */
export function getDecayedQuestions(
  events: AnswerEvent[],
  courseData: Unit[],
): ReviewCandidate[] {
  if (events.length === 0) return [];

  // Group events by questionId
  const byQuestion = new Map<string, AnswerEvent[]>();
  for (const e of events) {
    const list = byQuestion.get(e.questionId) ?? [];
    list.push(e);
    byQuestion.set(e.questionId, list);
  }

  const candidates: ReviewCandidate[] = [];

  for (let unitIdx = 0; unitIdx < courseData.length; unitIdx++) {
    const unit = courseData[unitIdx];
    if (!unit?.lessons) continue;

    for (let lessonIdx = 0; lessonIdx < unit.lessons.length; lessonIdx++) {
      const lesson = unit.lessons[lessonIdx];
      if (!lesson?.questions) continue;

      for (const q of lesson.questions) {
        if (q.type === 'teaching') continue;

        const qEvents = byQuestion.get(q.id);
        if (!qEvents || qEvents.length === 0) continue;

        // Must have been answered correctly at least once (don't review unlearned material)
        const everCorrect = qEvents.some((e) => e.correct);
        if (!everCorrect) continue;

        const score = computeMastery(qEvents);
        if (score < REVIEW_THRESHOLD) {
          candidates.push({ questionId: q.id, unitIndex: unitIdx, lessonIndex: lessonIdx, score });
        }
      }
    }
  }

  // Sort by lowest score first (most decayed = highest priority)
  candidates.sort((a, b) => a.score - b.score);
  return candidates;
}

/**
 * Pick review questions for interleaving into a lesson.
 * Filters to questions from units BEFORE the current one (don't spoil ahead).
 * Returns at most `count` question IDs.
 */
export function pickReviewQuestions(
  events: AnswerEvent[],
  courseData: Unit[],
  currentUnitIndex: number,
  count: number = 2,
): string[] {
  const all = getDecayedQuestions(events, courseData);
  return all
    .filter((c) => c.unitIndex < currentUnitIndex)
    .slice(0, count)
    .map((c) => c.questionId);
}

/**
 * Get per-unit review summary: how many questions need review in each unit.
 * Used by CourseMap to show "needs review" indicators.
 */
export function getUnitReviewCounts(
  events: AnswerEvent[],
  courseData: Unit[],
): Map<number, number> {
  const all = getDecayedQuestions(events, courseData);
  const counts = new Map<number, number>();
  for (const c of all) {
    counts.set(c.unitIndex, (counts.get(c.unitIndex) ?? 0) + 1);
  }
  return counts;
}
