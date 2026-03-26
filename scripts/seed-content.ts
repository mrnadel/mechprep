import { config } from 'dotenv';
config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import * as schema from '../src/lib/db/schema';
import { course } from '../src/data/course';
import type { Unit } from '../src/data/course/types';

const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
  console.error('Missing POSTGRES_URL in .env.local');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function seedUnits(tx: Parameters<Parameters<typeof db.transaction>[0]>[0], units: Unit[], label: string) {
  let totalUnits = 0;
  let totalLessons = 0;
  let totalQuestions = 0;

  for (let ui = 0; ui < units.length; ui++) {
    const unit = units[ui];

    // Upsert unit
    await tx.insert(schema.courseUnits).values({
      id: unit.id,
      title: unit.title,
      description: unit.description,
      color: unit.color,
      icon: unit.icon,
      orderIndex: ui,
    }).onConflictDoUpdate({
      target: schema.courseUnits.id,
      set: {
        title: unit.title,
        description: unit.description,
        color: unit.color,
        icon: unit.icon,
        orderIndex: ui,
        updatedAt: sql`now()`,
      },
    });
    totalUnits++;
    console.log(`  [${label}] Unit ${ui + 1}/${units.length}: ${unit.title}`);

    for (let li = 0; li < unit.lessons.length; li++) {
      const lesson = unit.lessons[li];

      // Upsert lesson
      await tx.insert(schema.courseLessons).values({
        id: lesson.id,
        unitId: unit.id,
        title: lesson.title,
        description: lesson.description,
        icon: lesson.icon,
        xpReward: lesson.xpReward,
        orderIndex: li,
      }).onConflictDoUpdate({
        target: schema.courseLessons.id,
        set: {
          unitId: unit.id,
          title: lesson.title,
          description: lesson.description,
          icon: lesson.icon,
          xpReward: lesson.xpReward,
          orderIndex: li,
          updatedAt: sql`now()`,
        },
      });
      totalLessons++;

      for (let qi = 0; qi < lesson.questions.length; qi++) {
        const q = lesson.questions[qi];

        // Convert boolean correctAnswer to string for the text column
        let correctAnswer: string | undefined;
        if (q.correctAnswer !== undefined) {
          correctAnswer = String(q.correctAnswer);
        }

        await tx.insert(schema.courseQuestions).values({
          id: q.id,
          lessonId: lesson.id,
          type: q.type,
          question: q.question,
          options: q.options ?? null,
          correctIndex: q.correctIndex ?? null,
          correctAnswer: correctAnswer ?? null,
          acceptedAnswers: q.acceptedAnswers ?? null,
          blanks: q.blanks ?? null,
          wordBank: q.wordBank ?? null,
          buckets: q.buckets ?? null,
          correctBuckets: q.correctBuckets ?? null,
          matchTargets: q.matchTargets ?? null,
          correctMatches: q.correctMatches ?? null,
          steps: q.steps ?? null,
          correctOrder: q.correctOrder ?? null,
          correctIndices: q.correctIndices ?? null,
          sliderMin: q.sliderMin ?? null,
          sliderMax: q.sliderMax ?? null,
          correctValue: q.correctValue ?? null,
          tolerance: q.tolerance ?? null,
          unit: q.unit ?? null,
          scenario: q.scenario ?? null,
          rankCriteria: q.rankCriteria ?? null,
          tapZones: q.tapZones ?? null,
          correctZoneId: q.correctZoneId ?? null,
          explanation: q.explanation,
          hint: q.hint ?? null,
          diagram: q.diagram ?? null,
          orderIndex: qi,
        }).onConflictDoUpdate({
          target: schema.courseQuestions.id,
          set: {
            lessonId: lesson.id,
            type: q.type,
            question: q.question,
            options: q.options ?? null,
            correctIndex: q.correctIndex ?? null,
            correctAnswer: correctAnswer ?? null,
            acceptedAnswers: q.acceptedAnswers ?? null,
            blanks: q.blanks ?? null,
            wordBank: q.wordBank ?? null,
            buckets: q.buckets ?? null,
            correctBuckets: q.correctBuckets ?? null,
            matchTargets: q.matchTargets ?? null,
            correctMatches: q.correctMatches ?? null,
            steps: q.steps ?? null,
            correctOrder: q.correctOrder ?? null,
            correctIndices: q.correctIndices ?? null,
            sliderMin: q.sliderMin ?? null,
            sliderMax: q.sliderMax ?? null,
            correctValue: q.correctValue ?? null,
            tolerance: q.tolerance ?? null,
            unit: q.unit ?? null,
            scenario: q.scenario ?? null,
            rankCriteria: q.rankCriteria ?? null,
            tapZones: q.tapZones ?? null,
            correctZoneId: q.correctZoneId ?? null,
            explanation: q.explanation,
            hint: q.hint ?? null,
            diagram: q.diagram ?? null,
            orderIndex: qi,
            updatedAt: sql`now()`,
          },
        });
        totalQuestions++;
      }
    }
  }

  console.log(`  [${label}] Upserted: ${totalUnits} units, ${totalLessons} lessons, ${totalQuestions} questions`);
}

async function loadFinanceUnits(): Promise<Unit[]> {
  const mods = await Promise.all([
    import('../src/data/course/professions/personal-finance/units/unit-1'),
    import('../src/data/course/professions/personal-finance/units/unit-2'),
    import('../src/data/course/professions/personal-finance/units/unit-3'),
    import('../src/data/course/professions/personal-finance/units/unit-4'),
    import('../src/data/course/professions/personal-finance/units/unit-5'),
    import('../src/data/course/professions/personal-finance/units/unit-6'),
    import('../src/data/course/professions/personal-finance/units/unit-7'),
    import('../src/data/course/professions/personal-finance/units/unit-8'),
    import('../src/data/course/professions/personal-finance/units/unit-9'),
    import('../src/data/course/professions/personal-finance/units/unit-10'),
    import('../src/data/course/professions/personal-finance/units/unit-11'),
    import('../src/data/course/professions/personal-finance/units/unit-12'),
  ]);
  return [
    mods[0].unit1, mods[1].unit2, mods[2].unit3, mods[3].unit4,
    mods[4].unit5, mods[5].unit6, mods[6].unit7, mods[7].unit8,
    mods[8].unit9, mods[9].unit10, mods[10].unit11, mods[11].unit12,
  ];
}

async function main() {
  console.log('=== Starting content seed ===\n');

  try {
    // Seed ME course
    console.log('--- Seeding ME course content ---');
    await db.transaction(async (tx) => {
      await seedUnits(tx, course, 'ME');
    });
    console.log('--- ME course seeded successfully ---\n');

    // Seed Finance course
    console.log('--- Seeding Finance course content ---');
    const financeUnits = await loadFinanceUnits();
    await db.transaction(async (tx) => {
      await seedUnits(tx, financeUnits, 'Finance');
    });
    console.log('--- Finance course seeded successfully ---\n');

    console.log('=== All content seeded successfully ===');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
