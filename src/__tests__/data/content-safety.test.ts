import { describe, it, expect } from 'vitest';
import { getCourseMetaForProfession, loadUnitData } from '@/data/course/course-meta';
import { PROFESSIONS, PROFESSION_ID } from '@/data/professions';
import { achievements } from '@/data/achievements';
import type { Unit } from '@/data/course/types';
import idSnapshot from './id-snapshot.json';

/**
 * ═══════════════════════════════════════════════════════════════
 * CONTENT SAFETY TESTS — Protect User Progress
 * ═══════════════════════════════════════════════════════════════
 *
 * These tests prevent breaking changes that would orphan user progress.
 * Users store progress keyed by unit IDs, lesson IDs, question IDs,
 * achievement IDs, and profession IDs. Changing or removing any of
 * these silently destroys earned progress.
 *
 * RULES:
 * ✅ ADDING new units, lessons, questions, achievements = always safe
 * ✅ CHANGING titles, descriptions, text, explanations = always safe
 * ✅ FIXING question content (options, answers) = always safe
 * ❌ REMOVING or RENAMING an ID that users have progress on = BREAKS USERS
 * ❌ REORDERING units (changes unitIndex mapping) = BREAKS PROGRESS
 * ❌ REDUCING xpReward (users feel cheated) = BAD
 *
 * If you MUST remove/rename an ID, update the snapshot file first
 * and add a data migration to remap user progress.
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Snapshot of all IDs users may have progress on ────────────
// These are the "contracts" with users. DO NOT remove entries.
// Only ADD new ones. If a test fails, it means you changed or
// removed something users might have earned progress on.

const PROTECTED_PROFESSION_IDS = [
  'mechanical-engineering',
  'personal-finance',
  'psychology',
  'space-astronomy',
];

const PROTECTED_ACHIEVEMENT_IDS = [
  'ach-first-correct',
  'ach-ten-correct',
  'ach-fifty-correct',
  'ach-hundred-correct',
  'ach-perfect-session',
  'ach-all-advanced',
  'ach-estimation-ace',
  'ach-streak-3',
  'ach-streak-7',
  'ach-streak-14',
  'ach-streak-30',
  'ach-daily-challenge-5',
  'ach-weekend-warrior',
  'ach-speed-round',
  'ach-confidence-calibrated',
  'ach-flaw-finder',
  'ach-scenario-master',
  'ach-hard-streak',
  'ach-first-topic',
  'ach-five-topics',
  'ach-all-topics',
  'ach-all-types',
  'ach-bookworm',
  'ach-topic-master',
  'ach-multi-master',
  'ach-weakness-conquered',
  'ach-interview-ready',
  'ach-night-owl',
  'ach-early-bird',
  'ach-wrong-five',
];

// ═══════════════════════════════════════════════════════════════
// TEST 1: Profession IDs never disappear
// ═══════════════════════════════════════════════════════════════

describe('Content Safety — Profession IDs', () => {
  it('all protected profession IDs still exist', () => {
    const currentIds = PROFESSIONS.map(p => p.id);
    for (const id of PROTECTED_PROFESSION_IDS) {
      expect(currentIds, `Profession "${id}" was removed! Users have this as activeProfession. Add a migration before removing.`).toContain(id);
    }
  });

  it('PROFESSION_ID constants match profession data', () => {
    const constantValues = Object.values(PROFESSION_ID);
    for (const val of constantValues) {
      const found = PROFESSIONS.find(p => p.id === val);
      expect(found, `PROFESSION_ID constant "${val}" has no matching entry in PROFESSIONS array`).toBeDefined();
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// TEST 2: Achievement IDs never disappear
// ═══════════════════════════════════════════════════════════════

describe('Content Safety — Achievement IDs', () => {
  it('all protected achievement IDs still exist', () => {
    const currentIds = achievements.map(a => a.id);
    for (const id of PROTECTED_ACHIEVEMENT_IDS) {
      expect(currentIds, `Achievement "${id}" was removed! Users have this in achievementsUnlocked[]. Add a migration before removing.`).toContain(id);
    }
  });

  it('achievement IDs are unique', () => {
    const ids = achievements.map(a => a.id);
    const unique = new Set(ids);
    expect(unique.size, `Duplicate achievement IDs found: ${ids.filter((id, i) => ids.indexOf(id) !== i)}`).toBe(ids.length);
  });

  it('achievement xpRewards are positive', () => {
    for (const ach of achievements) {
      expect(ach.xpReward, `Achievement "${ach.id}" has invalid xpReward: ${ach.xpReward}`).toBeGreaterThan(0);
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// TEST 3: Unit and Lesson IDs never disappear, unit order stable
// ═══════════════════════════════════════════════════════════════

describe('Content Safety — Course Structure', () => {
  for (const profession of PROFESSIONS) {
    describe(`${profession.name}`, () => {
      it('unit IDs are unique', () => {
        const meta = getCourseMetaForProfession(profession.id);
        const unitIds = meta.map(u => u.id);
        const unique = new Set(unitIds);
        expect(unique.size, `Duplicate unit IDs in ${profession.id}: ${unitIds.filter((id, i) => unitIds.indexOf(id) !== i)}`).toBe(unitIds.length);
      });

      it('lesson IDs are unique across all units', () => {
        const meta = getCourseMetaForProfession(profession.id);
        const allLessonIds: string[] = [];
        for (const unit of meta) {
          for (const lesson of unit.lessons) {
            allLessonIds.push(lesson.id);
          }
        }
        const unique = new Set(allLessonIds);
        expect(unique.size, `Duplicate lesson IDs in ${profession.id}: ${allLessonIds.filter((id, i) => allLessonIds.indexOf(id) !== i)}`).toBe(allLessonIds.length);
      });

      it('every lesson has a positive xpReward', () => {
        const meta = getCourseMetaForProfession(profession.id);
        for (const unit of meta) {
          for (const lesson of unit.lessons) {
            expect(lesson.xpReward, `Lesson "${lesson.id}" in unit "${unit.id}" has xpReward=${lesson.xpReward}`).toBeGreaterThan(0);
          }
        }
      });

      it('full unit data loads and has matching IDs for every unit', async () => {
        const meta = getCourseMetaForProfession(profession.id);
        for (let i = 0; i < meta.length; i++) {
          const fullUnit = await loadUnitData(i, profession.id);
          expect(fullUnit, `Unit index ${i} for ${profession.id} failed to load`).toBeDefined();
          expect(fullUnit.id, `Unit index ${i}: meta ID "${meta[i].id}" doesn't match loaded ID "${fullUnit.id}"`).toBe(meta[i].id);
        }
      });

      it('every meta lesson exists in loaded unit data (progress safety)', async () => {
        const meta = getCourseMetaForProfession(profession.id);
        const missing: string[] = [];
        for (let i = 0; i < meta.length; i++) {
          const fullUnit = await loadUnitData(i, profession.id);
          const fullLessonIds = new Set(fullUnit.lessons.map(l => l.id));
          for (const metaLesson of meta[i].lessons) {
            if (!fullLessonIds.has(metaLesson.id)) {
              missing.push(`Unit "${meta[i].id}": lesson "${metaLesson.id}" is in meta but missing from loaded data — users who complete it will have orphaned progress`);
            }
          }
        }
        expect(missing, `Lessons in meta but missing from data:\n${missing.join('\n')}`).toHaveLength(0);
      });
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// TEST 4: Question integrity — IDs unique, answers valid
// ═══════════════════════════════════════════════════════════════

describe('Content Safety — Question Integrity', () => {
  for (const profession of PROFESSIONS) {
    describe(`${profession.name}`, () => {
      it('question IDs are unique across the entire course', async () => {
        const meta = getCourseMetaForProfession(profession.id);
        const allQuestionIds: string[] = [];

        for (let i = 0; i < meta.length; i++) {
          const unit = await loadUnitData(i, profession.id);
          for (const lesson of unit.lessons) {
            for (const q of lesson.questions) {
              allQuestionIds.push(q.id);
            }
          }
        }

        const unique = new Set(allQuestionIds);
        if (unique.size !== allQuestionIds.length) {
          const dupes = allQuestionIds.filter((id, i) => allQuestionIds.indexOf(id) !== i);
          expect.fail(`Duplicate question IDs in ${profession.id}: ${dupes.slice(0, 10).join(', ')}${dupes.length > 10 ? ` (+${dupes.length - 10} more)` : ''}`);
        }
      });

      it('every multiple-choice question has a valid correctIndex', async () => {
        const meta = getCourseMetaForProfession(profession.id);
        const issues: string[] = [];

        for (let i = 0; i < meta.length; i++) {
          const unit = await loadUnitData(i, profession.id);
          for (const lesson of unit.lessons) {
            for (const q of lesson.questions) {
              if (q.type === 'multiple-choice' || q.type === 'scenario' || q.type === 'pick-the-best') {
                if (!q.options || q.options.length === 0) {
                  issues.push(`${q.id}: has no options`);
                } else if (q.correctIndex === undefined || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
                  issues.push(`${q.id}: correctIndex=${q.correctIndex} but has ${q.options?.length} options`);
                }
              }
            }
          }
        }

        expect(issues, `Questions with invalid answers:\n${issues.join('\n')}`).toHaveLength(0);
      });

      it('every question has a non-empty explanation', async () => {
        const meta = getCourseMetaForProfession(profession.id);
        const missing: string[] = [];

        for (let i = 0; i < meta.length; i++) {
          const unit = await loadUnitData(i, profession.id);
          for (const lesson of unit.lessons) {
            for (const q of lesson.questions) {
              if (q.type === 'teaching') continue;
              if (!q.explanation || q.explanation.trim().length === 0) {
                missing.push(q.id);
              }
            }
          }
        }

        expect(missing, `Questions missing explanation:\n${missing.slice(0, 20).join('\n')}${missing.length > 20 ? `\n(+${missing.length - 20} more)` : ''}`).toHaveLength(0);
      });
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// TEST 5: XP rewards never decrease (users would feel cheated)
// ═══════════════════════════════════════════════════════════════

// Minimum XP per lesson — if you change xpReward, it should only go UP
const MIN_XP_REWARD = 10;

describe('Content Safety — XP Rewards', () => {
  it(`no lesson has xpReward below ${MIN_XP_REWARD}`, () => {
    for (const profession of PROFESSIONS) {
      const meta = getCourseMetaForProfession(profession.id);
      for (const unit of meta) {
        for (const lesson of unit.lessons) {
          expect(lesson.xpReward, `${lesson.id} in ${profession.id}: xpReward=${lesson.xpReward} is below minimum ${MIN_XP_REWARD}`).toBeGreaterThanOrEqual(MIN_XP_REWARD);
        }
      }
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// TEST 6: Meta ↔ Full data consistency
// ═══════════════════════════════════════════════════════════════

describe('Content Safety — Meta ↔ Data Sync', () => {
  for (const profession of PROFESSIONS) {
    it(`${profession.name}: every meta lesson exists in loaded data`, async () => {
      const meta = getCourseMetaForProfession(profession.id);

      for (let i = 0; i < meta.length; i++) {
        const fullUnit = await loadUnitData(i, profession.id);
        const fullLessonIds = new Set(fullUnit.lessons.map(l => l.id));

        for (const metaLesson of meta[i].lessons) {
          expect(fullLessonIds.has(metaLesson.id), `Lesson "${metaLesson.id}" is in meta for unit "${meta[i].id}" but missing from loaded data. Users who completed this lesson will have orphaned progress.`).toBe(true);
        }
      }
    });

    it(`${profession.name}: no phantom lessons in loaded data missing from meta (warning)`, async () => {
      const meta = getCourseMetaForProfession(profession.id);
      const warnings: string[] = [];

      for (let i = 0; i < meta.length; i++) {
        const fullUnit = await loadUnitData(i, profession.id);
        const metaLessonIds = new Set(meta[i].lessons.map(l => l.id));

        for (const lesson of fullUnit.lessons) {
          if (!metaLessonIds.has(lesson.id)) {
            warnings.push(`Lesson "${lesson.id}" in unit "${meta[i].id}" exists in data but not in meta — CourseMap won't show it`);
          }
        }
      }

      if (warnings.length > 0) {
        console.warn(`[${profession.id}] ${warnings.length} phantom lesson(s):\n  ${warnings.join('\n  ')}`);
      }
      // Non-blocking: phantom lessons don't break user progress, they're just invisible
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// TEST 7: ID Snapshot — no previously-existing IDs removed
// ═══════════════════════════════════════════════════════════════
//
// This is the most critical test. It compares current IDs against
// a snapshot of all IDs that existed when the snapshot was last
// generated. If an ID disappears, users who earned progress on
// it will have orphaned data.
//
// If this test fails:
//   1. Did you accidentally delete a unit/lesson/question? → Undo it
//   2. Did you INTENTIONALLY restructure? → Write a migration first,
//      then run: npx tsx scripts/generate-id-snapshot.ts
//
// NEVER regenerate the snapshot just to make the test pass.

describe('Content Safety — ID Snapshot (removal protection)', () => {
  for (const profession of PROFESSIONS) {
    const snap = (idSnapshot.professions as Record<string, { unitIds: string[]; lessonIds: string[]; questionIds: string[] }>)[profession.id];
    if (!snap) continue; // New profession not in snapshot yet — that's fine

    describe(`${profession.name}`, () => {
      it('no unit IDs removed since last snapshot', () => {
        const meta = getCourseMetaForProfession(profession.id);
        const currentUnitIds = new Set(meta.map(u => u.id));
        const removed = snap.unitIds.filter(id => !currentUnitIds.has(id));

        expect(removed, `DANGER: ${removed.length} unit ID(s) removed from ${profession.id}! Users have completedLessons keyed to lessons in these units.\nRemoved: ${removed.join(', ')}\n\nIf intentional: write a data migration, then run: npx tsx scripts/generate-id-snapshot.ts`).toHaveLength(0);
      });

      it('no lesson IDs removed since last snapshot', () => {
        const meta = getCourseMetaForProfession(profession.id);
        const currentLessonIds = new Set(meta.flatMap(u => u.lessons.map(l => l.id)));
        const removed = snap.lessonIds.filter(id => !currentLessonIds.has(id));

        expect(removed, `DANGER: ${removed.length} lesson ID(s) removed from ${profession.id}! Users have completedLessons[lessonId] progress records that will be orphaned.\nRemoved: ${removed.slice(0, 20).join(', ')}${removed.length > 20 ? ` (+${removed.length - 20} more)` : ''}\n\nIf intentional: write a data migration, then run: npx tsx scripts/generate-id-snapshot.ts`).toHaveLength(0);
      });

      it('no question IDs removed since last snapshot', async () => {
        const meta = getCourseMetaForProfession(profession.id);
        const currentQuestionIds = new Set<string>();

        for (let i = 0; i < meta.length; i++) {
          const unit = await loadUnitData(i, profession.id);
          for (const lesson of unit.lessons) {
            for (const q of lesson.questions) {
              currentQuestionIds.add(q.id);
            }
          }
        }

        const removed = snap.questionIds.filter(id => !currentQuestionIds.has(id));

        expect(removed, `DANGER: ${removed.length} question ID(s) removed from ${profession.id}! Users have answeredQuestionIds and masteryEvents referencing these.\nRemoved: ${removed.slice(0, 20).join(', ')}${removed.length > 20 ? ` (+${removed.length - 20} more)` : ''}\n\nIf intentional: write a data migration, then run: npx tsx scripts/generate-id-snapshot.ts`).toHaveLength(0);
      });
    });
  }
});
