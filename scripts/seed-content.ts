import { config } from 'dotenv';
config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../src/lib/db/schema';
import { course } from '../src/data/course';
import { allQuestions } from '../src/data/questions';

const connectionString = process.env.POSTGRES_URL!;
if (!connectionString) {
  console.error('Missing POSTGRES_URL in .env.local');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

// BaseQuestion fields to extract — everything else goes into typeData
const BASE_FIELDS = new Set([
  'id', 'type', 'topic', 'subtopic', 'difficulty',
  'question', 'explanation', 'interviewInsight',
  'realWorldConnection', 'commonMistake', 'tags',
]);

async function seedCourseContent() {
  console.log('--- Seeding course content (units, lessons, questions) ---');

  await db.transaction(async (tx) => {
    let totalUnits = 0;
    let totalLessons = 0;
    let totalQuestions = 0;

    for (let ui = 0; ui < course.length; ui++) {
      const unit = course[ui];

      // Insert unit
      await tx.insert(schema.courseUnits).values({
        id: unit.id,
        title: unit.title,
        description: unit.description,
        color: unit.color,
        icon: unit.icon,
        orderIndex: ui,
      });
      totalUnits++;
      console.log(`  Unit ${ui + 1}/${course.length}: ${unit.title}`);

      for (let li = 0; li < unit.lessons.length; li++) {
        const lesson = unit.lessons[li];

        // Insert lesson
        await tx.insert(schema.courseLessons).values({
          id: lesson.id,
          unitId: unit.id,
          title: lesson.title,
          description: lesson.description,
          icon: lesson.icon,
          xpReward: lesson.xpReward,
          orderIndex: li,
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
            explanation: q.explanation,
            hint: q.hint ?? null,
            diagram: q.diagram ?? null,
            orderIndex: qi,
          });
          totalQuestions++;
        }
      }
    }

    console.log(`  Inserted: ${totalUnits} units, ${totalLessons} lessons, ${totalQuestions} questions`);
  });

  console.log('--- Course content seeded successfully ---\n');
}

async function seedPracticeQuestions() {
  console.log('--- Seeding practice questions ---');

  await db.transaction(async (tx) => {
    // Insert in batches to avoid overly long transactions
    const BATCH_SIZE = 50;
    let inserted = 0;

    for (let i = 0; i < allQuestions.length; i += BATCH_SIZE) {
      const batch = allQuestions.slice(i, i + BATCH_SIZE);

      const rows = batch.map((q, batchIdx) => {
        // Separate base fields from type-specific fields
        const typeData: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(q)) {
          if (!BASE_FIELDS.has(key)) {
            typeData[key] = value;
          }
        }

        return {
          id: q.id,
          type: q.type,
          topic: q.topic,
          subtopic: q.subtopic,
          difficulty: q.difficulty,
          question: q.question,
          explanation: q.explanation,
          interviewInsight: q.interviewInsight,
          realWorldConnection: q.realWorldConnection ?? null,
          commonMistake: q.commonMistake,
          tags: q.tags,
          typeData,
          orderIndex: i + batchIdx,
        };
      });

      await tx.insert(schema.practiceQuestions).values(rows);
      inserted += rows.length;
      console.log(`  Progress: ${inserted}/${allQuestions.length} practice questions`);
    }

    console.log(`  Inserted: ${inserted} practice questions`);
  });

  console.log('--- Practice questions seeded successfully ---\n');
}

async function main() {
  console.log('=== Starting content seed ===\n');

  try {
    await seedCourseContent();
    await seedPracticeQuestions();
    console.log('=== All content seeded successfully ===');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
