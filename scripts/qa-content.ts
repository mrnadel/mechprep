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
import type { Unit, Lesson, CourseQuestion, ConversationNode } from '../src/data/course/types';

// ─── Types ──────────────────────────────────────────────────

interface Violation {
  course: string;
  file: string;
  questionId: string;
  check: string;
  message: string;
}

interface CourseEntry {
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

async function loadAllCourses(): Promise<CourseEntry[]> {
  const courses: CourseEntry[] = [];

  // ME course (main)
  courses.push({
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

// ─── Text checking helpers ──────────────────────────────────

function containsEmDash(text: string): boolean {
  return text.includes('\u2014'); // em dash
}

function containsDoubleDash(text: string): boolean {
  return text.includes('--');
}

function stripSvgDiagrams(text: string): string {
  // Remove SVG content so we don't flag dashes inside SVG paths
  return text.replace(/<svg[\s\S]*?<\/svg>/gi, '');
}

function countSentences(text: string): number {
  // Count periods that end sentences (not abbreviations like "e.g." or "i.e." or decimals)
  // Strip common abbreviations first
  let cleaned = text
    .replace(/e\.g\./gi, 'eg')
    .replace(/i\.e\./gi, 'ie')
    .replace(/vs\./gi, 'vs')
    .replace(/etc\./gi, 'etc')
    .replace(/Dr\./gi, 'Dr')
    .replace(/Mr\./gi, 'Mr')
    .replace(/Mrs\./gi, 'Mrs')
    .replace(/\d+\.\d+/g, '0') // decimal numbers
    .replace(/\.\.\./g, '.'); // ellipsis counts as one

  const periods = (cleaned.match(/\./g) || []).length;
  // If no periods, the whole thing is one sentence
  return Math.max(periods, 1);
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

// ─── Checks ─────────────────────────────────────────────────

function runChecks(courses: CourseEntry[]): Violation[] {
  const violations: Violation[] = [];

  for (const c of courses) {
    const allQuestionIds = new Set<string>();
    const mcCorrectIndices: number[] = [];

    for (const unit of c.units) {
      const unitFile = guessUnitFile(unit.id, c.dir);

      for (const lesson of unit.lessons) {
        const lessonType = lesson.type || 'standard';

        // ─── CHECK 3: Standard lessons have 2-3 teaching cards ───
        if (lessonType === 'standard') {
          const teachingCards = lesson.questions.filter(q => q.type === 'teaching');
          if (teachingCards.length < 2 || teachingCards.length > 3) {
            violations.push({
              course: c.name,
              file: unitFile,
              questionId: lesson.id,
              check: 'CHECK 3',
              message: `Standard lesson has ${teachingCards.length} teaching cards (expected 2-3)`,
            });
          }
        }

        // ─── CHECK 10: Speed-rounds have 15 questions and 60s limit ───
        if (lessonType === 'speed-round') {
          const sqCount = lesson.speedQuestions?.length ?? 0;
          if (sqCount !== 15) {
            violations.push({
              course: c.name,
              file: unitFile,
              questionId: lesson.id,
              check: 'CHECK 10',
              message: `Speed-round has ${sqCount} questions (expected 15)`,
            });
          }
          if (lesson.speedTimeLimit !== 60) {
            violations.push({
              course: c.name,
              file: unitFile,
              questionId: lesson.id,
              check: 'CHECK 10',
              message: `Speed-round speedTimeLimit is ${lesson.speedTimeLimit ?? 'undefined'} (expected 60)`,
            });
          }
        }

        // ─── CHECK 11: Conversations have exactly 3 decision points ───
        if (lessonType === 'conversation' && lesson.conversationNodes) {
          const decisionPoints = lesson.conversationNodes.filter(
            (node: ConversationNode) => node.options && node.options.length > 0
          );
          if (decisionPoints.length !== 3) {
            violations.push({
              course: c.name,
              file: unitFile,
              questionId: lesson.id,
              check: 'CHECK 11',
              message: `Conversation has ${decisionPoints.length} decision points (expected 3)`,
            });
          }
        }

        // ─── Per-question checks ───
        for (const q of lesson.questions) {
          // ─── CHECK 6: No duplicate question IDs ───
          if (allQuestionIds.has(q.id)) {
            violations.push({
              course: c.name,
              file: unitFile,
              questionId: q.id,
              check: 'CHECK 6',
              message: `Duplicate question ID "${q.id}"`,
            });
          }
          allQuestionIds.add(q.id);

          // ─── CHECK 1: No em dashes or double dashes (excluding SVG) ───
          const textFields = [
            { label: 'question', text: q.question },
            { label: 'explanation', text: q.explanation },
            { label: 'hint', text: q.hint || '' },
          ];
          if (q.options) {
            q.options.forEach((opt, i) => {
              textFields.push({ label: `option[${i}]`, text: opt });
            });
          }
          if (q.scenario) {
            textFields.push({ label: 'scenario', text: q.scenario });
          }
          if (q.steps) {
            q.steps.forEach((step, i) => {
              textFields.push({ label: `step[${i}]`, text: step });
            });
          }
          if (q.matchTargets) {
            q.matchTargets.forEach((mt, i) => {
              textFields.push({ label: `matchTarget[${i}]`, text: mt });
            });
          }

          for (const field of textFields) {
            const cleaned = stripSvgDiagrams(field.text);
            if (containsEmDash(cleaned)) {
              violations.push({
                course: c.name,
                file: unitFile,
                questionId: q.id,
                check: 'CHECK 1',
                message: `Em dash found in ${field.label}: "${cleaned.substring(0, 80)}..."`,
              });
            }
            if (containsDoubleDash(cleaned)) {
              violations.push({
                course: c.name,
                file: unitFile,
                questionId: q.id,
                check: 'CHECK 1',
                message: `Double dash (--) found in ${field.label}: "${cleaned.substring(0, 80)}..."`,
              });
            }
          }

          // ─── CHECK 4: Teaching cards have NO options array ───
          if (q.type === 'teaching' && q.options && q.options.length > 0) {
            violations.push({
              course: c.name,
              file: unitFile,
              questionId: q.id,
              check: 'CHECK 4',
              message: `Teaching card has options array (${q.options.length} items). Teaching cards should have no options.`,
            });
          }

          // ─── CHECK 5: Teaching cards max 2 sentences in explanation ───
          if (q.type === 'teaching') {
            const sentenceCount = countSentences(q.explanation);
            if (sentenceCount > 2) {
              violations.push({
                course: c.name,
                file: unitFile,
                questionId: q.id,
                check: 'CHECK 5',
                message: `Teaching card explanation has ${sentenceCount} sentences (max 2): "${q.explanation.substring(0, 100)}..."`,
              });
            }
          }

          // ─── CHECK 7: Match-pairs have exactly 4 pairs ───
          if (q.type === 'match-pairs') {
            const optLen = q.options?.length ?? 0;
            const mtLen = q.matchTargets?.length ?? 0;
            if (optLen !== 4 || mtLen !== 4) {
              violations.push({
                course: c.name,
                file: unitFile,
                questionId: q.id,
                check: 'CHECK 7',
                message: `Match-pairs has ${optLen} options and ${mtLen} matchTargets (expected 4 each)`,
              });
            }
          }

          // ─── CHECK 8: Sort-buckets have exactly 6 items and 2 buckets ───
          if (q.type === 'sort-buckets') {
            const optLen = q.options?.length ?? 0;
            const bucketLen = q.buckets?.length ?? 0;
            if (optLen !== 6) {
              violations.push({
                course: c.name,
                file: unitFile,
                questionId: q.id,
                check: 'CHECK 8',
                message: `Sort-buckets has ${optLen} items (expected 6)`,
              });
            }
            if (bucketLen !== 2) {
              violations.push({
                course: c.name,
                file: unitFile,
                questionId: q.id,
                check: 'CHECK 8',
                message: `Sort-buckets has ${bucketLen} buckets (expected 2)`,
              });
            }
          }

          // ─── CHECK 9: Order-steps have 4-5 items ───
          if (q.type === 'order-steps') {
            const stepLen = q.steps?.length ?? 0;
            if (stepLen < 4 || stepLen > 5) {
              violations.push({
                course: c.name,
                file: unitFile,
                questionId: q.id,
                check: 'CHECK 9',
                message: `Order-steps has ${stepLen} items (expected 4-5)`,
              });
            }
          }

          // ─── CHECK 12: No option text exceeds 15 words ───
          if (q.options && q.type !== 'teaching') {
            for (let i = 0; i < q.options.length; i++) {
              const wc = wordCount(q.options[i]);
              if (wc > 15) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 12',
                  message: `Option[${i}] has ${wc} words (max 15): "${q.options[i]}"`,
                });
              }
            }
          }

          // ─── CHECK 13: Required fields by question type ───
          switch (q.type) {
            case 'multiple-choice':
            case 'scenario':
            case 'pick-the-best':
              if (!q.options || q.options.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `${q.type} missing required "options" array`,
                });
              }
              if (q.correctIndex === undefined || q.correctIndex === null) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `${q.type} missing required "correctIndex"`,
                });
              }
              if (q.type === 'scenario' && !q.scenario) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `scenario missing required "scenario" text`,
                });
              }
              break;
            case 'true-false':
              if (q.correctAnswer === undefined || q.correctAnswer === null) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `true-false missing required "correctAnswer"`,
                });
              }
              break;
            case 'fill-blank':
              if (!q.blanks || q.blanks.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `fill-blank missing required "blanks" array`,
                });
              }
              if (!q.wordBank || q.wordBank.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `fill-blank missing required "wordBank" array`,
                });
              }
              break;
            case 'sort-buckets':
            case 'category-swipe':
              if (!q.options || q.options.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `${q.type} missing required "options" array`,
                });
              }
              if (!q.buckets || q.buckets.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `${q.type} missing required "buckets" array`,
                });
              }
              if (!q.correctBuckets || q.correctBuckets.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `${q.type} missing required "correctBuckets" array`,
                });
              }
              break;
            case 'match-pairs':
              if (!q.options || q.options.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `match-pairs missing required "options" array`,
                });
              }
              if (!q.matchTargets || q.matchTargets.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `match-pairs missing required "matchTargets" array`,
                });
              }
              if (!q.correctMatches || q.correctMatches.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `match-pairs missing required "correctMatches" array`,
                });
              }
              break;
            case 'order-steps':
            case 'rank-order':
              if (!q.steps || q.steps.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `${q.type} missing required "steps" array`,
                });
              }
              if (!q.correctOrder || q.correctOrder.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `${q.type} missing required "correctOrder" array`,
                });
              }
              break;
            case 'multi-select':
              if (!q.options || q.options.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `multi-select missing required "options" array`,
                });
              }
              if (!q.correctIndices || q.correctIndices.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `multi-select missing required "correctIndices" array`,
                });
              }
              break;
            case 'slider-estimate':
              if (q.sliderMin === undefined || q.sliderMin === null) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `slider-estimate missing required "sliderMin"`,
                });
              }
              if (q.sliderMax === undefined || q.sliderMax === null) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `slider-estimate missing required "sliderMax"`,
                });
              }
              if (q.correctValue === undefined || q.correctValue === null) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `slider-estimate missing required "correctValue"`,
                });
              }
              break;
            case 'image-tap':
              if (!q.tapZones || q.tapZones.length === 0) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `image-tap missing required "tapZones" array`,
                });
              }
              if (!q.correctZoneId) {
                violations.push({
                  course: c.name,
                  file: unitFile,
                  questionId: q.id,
                  check: 'CHECK 13',
                  message: `image-tap missing required "correctZoneId"`,
                });
              }
              break;
            // teaching has no special required fields beyond question/explanation
          }

          // ─── CHECK 14: correctIndex within bounds of options ───
          if (q.correctIndex !== undefined && q.correctIndex !== null && q.options) {
            if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
              violations.push({
                course: c.name,
                file: unitFile,
                questionId: q.id,
                check: 'CHECK 14',
                message: `correctIndex ${q.correctIndex} is out of bounds (options length: ${q.options.length})`,
              });
            }
          }

          // Collect MC correctIndex for CHECK 2
          if (
            (q.type === 'multiple-choice' || q.type === 'scenario' || q.type === 'pick-the-best') &&
            q.correctIndex !== undefined &&
            q.correctIndex !== null
          ) {
            mcCorrectIndices.push(q.correctIndex);
          }
        }
      }
    }

    // ─── CHECK 2: correctIndex distribution ───
    if (mcCorrectIndices.length > 0) {
      const counts = [0, 0, 0, 0];
      for (const idx of mcCorrectIndices) {
        if (idx >= 0 && idx < 4) counts[idx]++;
      }
      const total = mcCorrectIndices.length;
      for (let pos = 0; pos < 4; pos++) {
        const pct = (counts[pos] / total) * 100;
        if (pct > 35) {
          violations.push({
            course: c.name,
            file: c.dir,
            questionId: '(course-wide)',
            check: 'CHECK 2',
            message: `correctIndex=${pos} accounts for ${pct.toFixed(1)}% of ${total} MC questions (threshold: 35%)`,
          });
        }
      }
    }

    // Also check speed-round question IDs for duplicates within the course
    for (const unit of c.units) {
      const unitFile = guessUnitFile(unit.id, c.dir);
      for (const lesson of unit.lessons) {
        if (lesson.speedQuestions) {
          for (const sq of lesson.speedQuestions) {
            if (allQuestionIds.has(sq.id)) {
              violations.push({
                course: c.name,
                file: unitFile,
                questionId: sq.id,
                check: 'CHECK 6',
                message: `Duplicate question ID "${sq.id}" (speed-round)`,
              });
            }
            allQuestionIds.add(sq.id);
          }
        }
      }
    }
  }

  return violations;
}

// ─── Main ───────────────────────────────────────────────────

async function main() {
  console.log('=== Content QA Check ===\n');

  const courses = await loadAllCourses();
  console.log(`Loaded ${courses.length} courses: ${courses.map(c => c.name).join(', ')}\n`);

  const violations = runChecks(courses);

  // Print violations grouped by course
  if (violations.length > 0) {
    const byCourse = new Map<string, Violation[]>();
    for (const v of violations) {
      const list = byCourse.get(v.course) || [];
      list.push(v);
      byCourse.set(v.course, list);
    }

    for (const [courseName, courseViolations] of byCourse) {
      console.log(`--- ${courseName} (${courseViolations.length} violations) ---`);
      for (const v of courseViolations) {
        console.log(`  [${v.check}] ${v.questionId} | ${v.message}`);
        console.log(`    File: ${v.file}`);
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
