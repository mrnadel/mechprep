/**
 * Placement Test Algorithm
 *
 * When a user wants to jump to a unit ahead of their current position,
 * they must pass a placement test covering the skipped units.
 *
 * Rules:
 * - Questions are drawn from each skipped unit (from current → target-1)
 * - Ordered: lower units first → higher units last
 * - Within each unit: questions scale from early lessons → late lessons
 * - Pass condition: fewer than maxMistakes wrong answers
 */

import type { Unit, CourseQuestion, CourseProgress } from '@/data/course/types';

// ─── Configuration ───────────────────────────────────────────────
export const PLACEMENT_TEST_CONFIG = {
  /** Maximum wrong answers allowed. Pass = mistakes < this value. */
  maxMistakes: 3,
  /** Questions selected per skipped unit */
  questionsPerUnit: 3,
} as const;

// ─── Helpers ─────────────────────────────────────────────────────

/**
 * Index of the first unit where not every lesson has been passed.
 * Returns courseData.length when the entire course is complete.
 */
export function getFirstIncompleteUnitIndex(
  courseData: Unit[],
  completedLessons: CourseProgress['completedLessons'],
): number {
  for (let i = 0; i < courseData.length; i++) {
    if (!courseData[i].lessons.every((l) => completedLessons[l.id]?.passed)) {
      return i;
    }
  }
  return courseData.length;
}

/**
 * Pick `count` evenly-spaced gradable questions from a unit,
 * maintaining lesson order (early → late = "start-to-end scaling").
 */
function selectQuestionsFromUnit(unit: Unit, count: number): CourseQuestion[] {
  const pool = unit.lessons.flatMap((l) =>
    l.questions.filter((q) => q.type !== 'teaching'),
  );

  if (pool.length === 0) return [];
  if (pool.length <= count) return [...pool];

  const result: CourseQuestion[] = [];
  const step = pool.length / count;
  for (let i = 0; i < count; i++) {
    result.push(pool[Math.min(Math.floor(i * step), pool.length - 1)]);
  }
  return result;
}

// ─── Main generator ──────────────────────────────────────────────

/**
 * Build the ordered question list for a placement test.
 *
 * @param courseData   Fully-loaded units (questions must already be fetched)
 * @param completedLessons  Current user progress
 * @param targetUnitIndex   Unit the user wants to jump to
 * @param questionsPerUnit  Override for PLACEMENT_TEST_CONFIG.questionsPerUnit
 */
export function generatePlacementQuestions(
  courseData: Unit[],
  completedLessons: CourseProgress['completedLessons'],
  targetUnitIndex: number,
  questionsPerUnit: number = PLACEMENT_TEST_CONFIG.questionsPerUnit,
): CourseQuestion[] {
  const fromUnit = getFirstIncompleteUnitIndex(courseData, completedLessons);
  if (fromUnit >= targetUnitIndex) return [];

  const questions: CourseQuestion[] = [];

  // Lower units → higher units; within each unit: start → end
  for (let ui = fromUnit; ui < targetUnitIndex; ui++) {
    const unit = courseData[ui];
    if (!unit) continue;
    questions.push(...selectQuestionsFromUnit(unit, questionsPerUnit));
  }

  return questions;
}
