/**
 * Generates a snapshot of all unit, lesson, and question IDs across all courses.
 * Run this whenever you INTENTIONALLY add or restructure content:
 *
 *   npx tsx scripts/generate-id-snapshot.ts
 *
 * The snapshot is used by content-safety.test.ts to prevent accidental
 * removal of IDs that users may have progress on.
 *
 * ⚠️  NEVER run this to "make the tests pass" without understanding
 *     why the test failed. If a test fails, it means you removed or renamed
 *     an ID that users might have earned progress on. Fix the content
 *     or write a migration FIRST, then regenerate the snapshot.
 */

import { getCourseMetaForProfession, loadUnitData } from '../src/data/course/course-meta';
import { PROFESSIONS } from '../src/data/professions';
import * as fs from 'fs';
import * as path from 'path';

interface IdSnapshot {
  generatedAt: string;
  warning: string;
  professions: Record<string, {
    unitIds: string[];
    lessonIds: string[];
    questionIds: string[];
  }>;
}

async function main() {
  const snapshot: IdSnapshot = {
    generatedAt: new Date().toISOString(),
    warning: 'AUTO-GENERATED — Do not edit manually. Run: npx tsx scripts/generate-id-snapshot.ts',
    professions: {},
  };

  for (const profession of PROFESSIONS) {
    const meta = getCourseMetaForProfession(profession.id);
    const unitIds: string[] = [];
    const lessonIds: string[] = [];
    const questionIds: string[] = [];

    for (let i = 0; i < meta.length; i++) {
      unitIds.push(meta[i].id);
      for (const lesson of meta[i].lessons) {
        lessonIds.push(lesson.id);
      }

      // Load full data for question IDs
      try {
        const fullUnit = await loadUnitData(i, profession.id);
        for (const lesson of fullUnit.lessons) {
          for (const q of lesson.questions) {
            questionIds.push(q.id);
          }
        }
      } catch (e) {
        console.warn(`  ⚠ Could not load unit ${i} for ${profession.id}: ${e}`);
      }
    }

    snapshot.professions[profession.id] = { unitIds, lessonIds, questionIds };
    console.log(`✓ ${profession.name}: ${unitIds.length} units, ${lessonIds.length} lessons, ${questionIds.length} questions`);
  }

  const outPath = path.join(__dirname, '..', 'src', '__tests__', 'data', 'id-snapshot.json');
  fs.writeFileSync(outPath, JSON.stringify(snapshot, null, 2) + '\n');
  console.log(`\n✓ Snapshot written to ${outPath}`);
}

main().catch(console.error);
