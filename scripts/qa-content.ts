/**
 * Content QA Automation Script
 *
 * Checks all course content for violations of the writing guide rules.
 * Run with: npx tsx scripts/qa-content.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';
import { course } from '../src/data/course';
import type { Unit } from '../src/data/course/types';
import { runContentQA, type QAViolation, type CourseInput } from '../src/lib/content-qa';

// ─── Types ──────────────────────────────────────────────────

interface CourseEntry {
  id: string;
  name: string;
  units: Unit[];
  dir: string;
}

// ─── Load courses ───────────────────────────────────────────

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

async function loadProfessionUnits(professionDir: string): Promise<Unit[]> {
  const unitsDir = path.join(professionDir, 'units');
  if (!fs.existsSync(unitsDir)) return [];

  const unitFiles = fs.readdirSync(unitsDir)
    .filter(f => f.startsWith('unit-') && f.endsWith('.ts'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/unit-(\d+)/)?.[1] ?? '0');
      const numB = parseInt(b.match(/unit-(\d+)/)?.[1] ?? '0');
      return numA - numB;
    });

  const units: Unit[] = [];
  for (const file of unitFiles) {
    const filePath = path.join(unitsDir, file);
    const mod = await import(pathToFileURL(filePath).href);
    for (const key of Object.keys(mod)) {
      if (isUnit(mod[key])) {
        units.push(mod[key]);
        break;
      }
    }
  }
  return units;
}

function discoverProfessions(): { id: string; name: string; dir: string }[] {
  const professionsDir = path.resolve(__dirname, '../src/data/course/professions');
  if (!fs.existsSync(professionsDir)) return [];

  return fs.readdirSync(professionsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => ({
      id: d.name,
      name: d.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      dir: path.join(professionsDir, d.name),
    }));
}

async function loadAllCourses(): Promise<CourseEntry[]> {
  const courses: CourseEntry[] = [];

  // ME course (main)
  courses.push({
    id: 'mechanical-engineering',
    name: 'ME',
    units: course,
    dir: path.resolve(__dirname, '../src/data/course/units'),
  });

  // Profession courses
  const professions = discoverProfessions();
  for (const prof of professions) {
    const units = await loadProfessionUnits(prof.dir);
    if (units.length > 0) {
      courses.push({
        id: prof.id,
        name: prof.name,
        units,
        dir: path.join(prof.dir, 'units'),
      });
    }
  }

  return courses;
}

// ─── Helper: resolve file for a unit ────────────────────────

function guessUnitFile(unitId: string, courseDir: string): string {
  // Try to find the file containing this unit in the directory
  const files = fs.readdirSync(courseDir).filter(f => f.endsWith('.ts'));
  // For the ME course, filenames are like unit-1-statics.ts
  // For professions, filenames are like unit-1.ts
  // Just return the directory as context, we'll match by unit ID
  return courseDir + '/' + (files.find(f => {
    // Try matching unit number from ID like "u1-statics" -> "1"
    const unitNum = unitId.match(/u(\d+)/)?.[1];
    if (unitNum && f.includes(`unit-${unitNum}`)) return true;
    return false;
  }) || unitId);
}

// ─── Run checks via shared module ──────────────────────────

// ─── Main ───────────────────────────────────────────────────

async function main() {
  console.log('=== Content QA Check ===\n');

  const courses = await loadAllCourses();
  console.log(`Loaded ${courses.length} courses: ${courses.map(c => c.name).join(', ')}\n`);

  // Map to CourseInput for the shared QA module
  const courseInputs: CourseInput[] = courses.map(c => ({
    id: c.id,
    name: c.name,
    units: c.units,
  }));

  const violations = runContentQA(courseInputs);

  // Print violations grouped by course
  if (violations.length > 0) {
    const byCourse = new Map<string, QAViolation[]>();
    for (const v of violations) {
      const list = byCourse.get(v.courseName) || [];
      list.push(v);
      byCourse.set(v.courseName, list);
    }

    for (const [courseName, courseViolations] of byCourse) {
      console.log(`--- ${courseName} (${courseViolations.length} violations) ---`);
      for (const v of courseViolations) {
        const courseEntry = courses.find(c => c.name === v.courseName);
        let file = v.courseId;
        if (courseEntry) {
          // Find the unit that contains this violation to resolve the file
          const unit = courseEntry.units.find(u => u.title === v.unitTitle);
          file = unit ? guessUnitFile(unit.id, courseEntry.dir) : courseEntry.dir;
        }
        console.log(`  [${v.check}] ${v.questionId} | ${v.message}`);
        console.log(`    File: ${file}`);
      }
      console.log('');
    }
  }

  // Summary
  const courseCount = courses.length;
  console.log('=== Summary ===');
  console.log(`${violations.length} violations found across ${courseCount} courses`);

  if (violations.length > 0) {
    // Breakdown by check
    const byCheck = new Map<string, number>();
    for (const v of violations) {
      byCheck.set(v.check, (byCheck.get(v.check) || 0) + 1);
    }
    console.log('\nBreakdown by check:');
    for (const [check, count] of [...byCheck.entries()].sort()) {
      console.log(`  ${check}: ${count}`);
    }

    process.exit(1);
  } else {
    console.log('All content passes QA checks.');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('QA script failed:', err);
  process.exit(1);
});
