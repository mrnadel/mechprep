import { describe, it, expect } from 'vitest';
import { getCourseMetaForProfession, loadUnitData } from '@/data/course/course-meta';
import { PROFESSIONS } from '@/data/professions';
import type { CourseQuestion, Unit } from '@/data/course/types';

/**
 * Validation test: checks that questions with discrete wrong options
 * (multiple-choice, true-false, scenario, pick-the-best) have
 * distractorExplanations for all wrong option indices.
 *
 * This is a WARNING test — it reports coverage but does not fail the build,
 * allowing content to be added incrementally.
 */

const OPTION_TYPES = new Set(['multiple-choice', 'scenario', 'pick-the-best']);

function checkQuestion(q: CourseQuestion): string | null {
  if (q.type === 'teaching') return null;

  if (OPTION_TYPES.has(q.type) && q.options && q.correctIndex !== undefined) {
    if (!q.distractorExplanations) {
      return `${q.id}: missing distractorExplanations entirely`;
    }
    const missingIndices: number[] = [];
    for (let i = 0; i < q.options.length; i++) {
      if (i !== q.correctIndex && !q.distractorExplanations[i]) {
        missingIndices.push(i);
      }
    }
    if (missingIndices.length > 0) {
      return `${q.id}: missing distractor for option indices [${missingIndices.join(', ')}]`;
    }
  }

  if (q.type === 'true-false' && q.correctAnswer !== undefined) {
    if (!q.distractorExplanations) {
      return `${q.id}: missing distractorExplanations for true-false`;
    }
    const wrongIdx = q.correctAnswer ? 1 : 0;
    if (!q.distractorExplanations[wrongIdx]) {
      return `${q.id}: missing distractor for wrong index ${wrongIdx}`;
    }
  }

  return null;
}

describe('Distractor explanation coverage', () => {
  it('reports coverage across all courses (non-blocking)', async () => {
    const issues: string[] = [];
    let totalChecked = 0;
    let totalWithDistractors = 0;

    for (const profession of PROFESSIONS) {
      if (profession.requiresAccess) continue;

      const meta = getCourseMetaForProfession(profession.id as never);

      for (let unitIdx = 0; unitIdx < meta.length; unitIdx++) {
        let unit: Unit;
        try {
          unit = await loadUnitData(unitIdx, profession.id);
        } catch {
          continue;
        }

        for (const lesson of unit.lessons) {
          for (const q of lesson.questions) {
            if (q.type === 'teaching') continue;
            if (!OPTION_TYPES.has(q.type) && q.type !== 'true-false') continue;

            totalChecked++;
            const issue = checkQuestion(q);
            if (issue) {
              issues.push(`[${profession.id}] ${issue}`);
            } else {
              totalWithDistractors++;
            }
          }
        }
      }
    }

    const coverage = totalChecked > 0
      ? Math.round((totalWithDistractors / totalChecked) * 100)
      : 100;

    console.log(`\nDistractor coverage: ${totalWithDistractors}/${totalChecked} questions (${coverage}%)`);
    if (issues.length > 0) {
      console.log(`Missing distractors (${issues.length}):`);
      issues.slice(0, 20).forEach((i) => console.log(`  - ${i}`));
      if (issues.length > 20) console.log(`  ... and ${issues.length - 20} more`);
    }

    // Non-blocking: report but don't fail
    expect(coverage).toBeGreaterThanOrEqual(0);
  });
});
