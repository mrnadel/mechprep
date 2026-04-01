import { config } from 'dotenv';
config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import * as schema from '../src/lib/db/schema';
import { course } from '../src/data/course';
import type { Unit } from '../src/data/course/types';
import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
  console.error('Missing POSTGRES_URL in .env.local');
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function seedUnits(tx: Parameters<Parameters<typeof db.transaction>[0]>[0], units: Unit[], label: string) {
  // Collect all rows first, then bulk-upsert in 3 queries instead of one per row
  const unitRows: (typeof schema.courseUnits.$inferInsert)[] = [];
  const lessonRows: (typeof schema.courseLessons.$inferInsert)[] = [];
  const questionRows: (typeof schema.courseQuestions.$inferInsert)[] = [];

  for (let ui = 0; ui < units.length; ui++) {
    const unit = units[ui];
    unitRows.push({
      id: unit.id,
      title: unit.title,
      description: unit.description,
      color: unit.color,
      icon: unit.icon,
      orderIndex: ui,
      sectionIndex: (unit as any).sectionIndex ?? null,
      sectionTitle: (unit as any).sectionTitle ?? null,
    });
    console.log(`  [${label}] Unit ${ui + 1}/${units.length}: ${unit.title}`);

    for (let li = 0; li < unit.lessons.length; li++) {
      const lesson = unit.lessons[li];
      lessonRows.push({
        id: lesson.id,
        unitId: unit.id,
        title: lesson.title,
        description: lesson.description,
        icon: lesson.icon,
        xpReward: lesson.xpReward,
        orderIndex: li,
      });

      for (let qi = 0; qi < lesson.questions.length; qi++) {
        const q = lesson.questions[qi];
        questionRows.push({
          id: q.id,
          lessonId: lesson.id,
          type: q.type,
          question: q.question,
          options: q.options ?? null,
          correctIndex: q.correctIndex ?? null,
          correctAnswer: q.correctAnswer !== undefined ? String(q.correctAnswer) : null,
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
          variants: q.variants ?? null,
          explanation: q.explanation,
          hint: q.hint ?? null,
          diagram: q.diagram ?? null,
          orderIndex: qi,
        });
      }
    }
  }

  // Bulk upsert units (single query)
  if (unitRows.length > 0) {
    await tx.insert(schema.courseUnits).values(unitRows).onConflictDoUpdate({
      target: schema.courseUnits.id,
      set: {
        title: sql.raw(`excluded."title"`),
        description: sql.raw(`excluded."description"`),
        color: sql.raw(`excluded."color"`),
        icon: sql.raw(`excluded."icon"`),
        orderIndex: sql.raw(`excluded."order_index"`),
        sectionIndex: sql.raw(`excluded."section_index"`),
        sectionTitle: sql.raw(`excluded."section_title"`),
        updatedAt: sql`now()`,
      },
    });
  }

  // Bulk upsert lessons (single query)
  if (lessonRows.length > 0) {
    await tx.insert(schema.courseLessons).values(lessonRows).onConflictDoUpdate({
      target: schema.courseLessons.id,
      set: {
        unitId: sql.raw(`excluded."unit_id"`),
        title: sql.raw(`excluded."title"`),
        description: sql.raw(`excluded."description"`),
        icon: sql.raw(`excluded."icon"`),
        xpReward: sql.raw(`excluded."xp_reward"`),
        orderIndex: sql.raw(`excluded."order_index"`),
        updatedAt: sql`now()`,
      },
    });
  }

  // Bulk upsert questions (chunk into batches of 500 to avoid query size limits)
  const CHUNK_SIZE = 500;
  for (let i = 0; i < questionRows.length; i += CHUNK_SIZE) {
    const chunk = questionRows.slice(i, i + CHUNK_SIZE);
    await tx.insert(schema.courseQuestions).values(chunk).onConflictDoUpdate({
      target: schema.courseQuestions.id,
      set: {
        lessonId: sql.raw(`excluded."lesson_id"`),
        type: sql.raw(`excluded."type"`),
        question: sql.raw(`excluded."question"`),
        options: sql.raw(`excluded."options"`),
        correctIndex: sql.raw(`excluded."correct_index"`),
        correctAnswer: sql.raw(`excluded."correct_answer"`),
        acceptedAnswers: sql.raw(`excluded."accepted_answers"`),
        blanks: sql.raw(`excluded."blanks"`),
        wordBank: sql.raw(`excluded."word_bank"`),
        buckets: sql.raw(`excluded."buckets"`),
        correctBuckets: sql.raw(`excluded."correct_buckets"`),
        matchTargets: sql.raw(`excluded."match_targets"`),
        correctMatches: sql.raw(`excluded."correct_matches"`),
        steps: sql.raw(`excluded."steps"`),
        correctOrder: sql.raw(`excluded."correct_order"`),
        correctIndices: sql.raw(`excluded."correct_indices"`),
        sliderMin: sql.raw(`excluded."slider_min"`),
        sliderMax: sql.raw(`excluded."slider_max"`),
        correctValue: sql.raw(`excluded."correct_value"`),
        tolerance: sql.raw(`excluded."tolerance"`),
        unit: sql.raw(`excluded."unit"`),
        scenario: sql.raw(`excluded."scenario"`),
        rankCriteria: sql.raw(`excluded."rank_criteria"`),
        tapZones: sql.raw(`excluded."tap_zones"`),
        correctZoneId: sql.raw(`excluded."correct_zone_id"`),
        variants: sql.raw(`excluded."variants"`),
        explanation: sql.raw(`excluded."explanation"`),
        hint: sql.raw(`excluded."hint"`),
        diagram: sql.raw(`excluded."diagram"`),
        orderIndex: sql.raw(`excluded."order_index"`),
        updatedAt: sql`now()`,
      },
    });
  }

  console.log(`  [${label}] Upserted: ${unitRows.length} units, ${lessonRows.length} lessons, ${questionRows.length} questions`);
}

/** Check if a value looks like a Unit object */
function isUnit(val: unknown): val is Unit {
  return (
    typeof val === 'object' &&
    val !== null &&
    'id' in val &&
    'title' in val &&
    'lessons' in val &&
    Array.isArray((val as Unit).lessons)
  );
}

/** Dynamically discover and load units from a profession's units/ directory */
async function loadProfessionUnits(professionDir: string): Promise<Unit[]> {
  const unitsDir = path.join(professionDir, 'units');
  if (!fs.existsSync(unitsDir)) return [];

  const unitFiles = fs.readdirSync(unitsDir)
    .filter(f => f.startsWith('unit-') && f.endsWith('.ts'))
    .sort((a, b) => {
      // Sort by numeric suffix: unit-1.ts, unit-2.ts, ..., unit-10.ts
      const numA = parseInt(a.match(/unit-(\d+)/)?.[1] ?? '0');
      const numB = parseInt(b.match(/unit-(\d+)/)?.[1] ?? '0');
      return numA - numB;
    });

  // Also discover section files (e.g., section-2-perception.ts, section-13-estate-part1.ts)
  const sectionFiles = fs.readdirSync(unitsDir)
    .filter(f => f.startsWith('section-') && f.endsWith('.ts'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/section-(\d+)/)?.[1] ?? '0');
      const numB = parseInt(b.match(/section-(\d+)/)?.[1] ?? '0');
      if (numA !== numB) return numA - numB;
      // For same section number, sort by part number (part1 before part2)
      const partA = parseInt(a.match(/part(\d+)/)?.[1] ?? '0');
      const partB = parseInt(b.match(/part(\d+)/)?.[1] ?? '0');
      return partA - partB;
    });

  const units: Unit[] = [];

  // Load individual unit files
  for (const file of unitFiles) {
    const filePath = path.join(unitsDir, file);
    const mod = await import(pathToFileURL(filePath).href);
    // Find the Unit export (could be any name)
    for (const key of Object.keys(mod)) {
      if (isUnit(mod[key])) {
        units.push(mod[key]);
        break;
      }
    }
  }

  // Load section files (export Unit[] arrays)
  for (const file of sectionFiles) {
    const filePath = path.join(unitsDir, file);
    const mod = await import(pathToFileURL(filePath).href);
    for (const key of Object.keys(mod)) {
      const val = mod[key];
      if (Array.isArray(val) && val.length > 0 && isUnit(val[0])) {
        units.push(...val);
        break;
      }
    }
  }

  return units;
}

/** Discover all profession directories under src/data/course/professions/ */
function discoverProfessions(): { name: string; dir: string }[] {
  const professionsDir = path.resolve(__dirname, '../src/data/course/professions');
  if (!fs.existsSync(professionsDir)) return [];

  return fs.readdirSync(professionsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => ({
      name: d.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      dir: path.join(professionsDir, d.name),
    }));
}

async function main() {
  console.log('=== Starting content seed ===\n');

  try {
    // 1. Seed ME course (main course from src/data/course/index.ts)
    console.log('--- Seeding ME course content ---');
    await db.transaction(async (tx) => {
      await seedUnits(tx, course, 'ME');
    });
    console.log('--- ME course seeded successfully ---\n');

    // 2. Dynamically discover and seed all profession courses
    const professions = discoverProfessions();
    for (const prof of professions) {
      console.log(`--- Seeding ${prof.name} course content ---`);
      const units = await loadProfessionUnits(prof.dir);
      if (units.length === 0) {
        console.log(`  [${prof.name}] No unit files found, skipping.\n`);
        continue;
      }
      await db.transaction(async (tx) => {
        await seedUnits(tx, units, prof.name);
      });
      console.log(`--- ${prof.name} course seeded successfully ---\n`);
    }

    console.log('=== All content seeded successfully ===');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
