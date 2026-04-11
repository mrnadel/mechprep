/**
 * Shared Content QA Module
 *
 * All 14 QA content checks extracted from scripts/qa-content.ts.
 * Used by the CLI script and the admin API route.
 */

import type { Unit, Lesson, CourseQuestion, ConversationNode } from '@/data/course/types';

// ─── Public Types ──────────────────────────────────────────

export type QASeverity = 'error' | 'warning';

export interface QAViolation {
  check: string;
  severity: QASeverity;
  questionId: string;
  courseId: string;
  courseName: string;
  unitTitle: string;
  lessonTitle: string;
  message: string;
}

export interface CourseInput {
  id: string;
  name: string;
  units: Unit[];
}

// ─── Text-checking helpers ─────────────────────────────────

function containsEmDash(text: string): boolean {
  return text.includes('\u2014'); // em dash
}

function containsDoubleDash(text: string): boolean {
  return text.includes('--');
}

function stripSvgDiagrams(text: string): string {
  return text.replace(/<svg[\s\S]*?<\/svg>/gi, '');
}

function countSentences(text: string): number {
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
  return Math.max(periods, 1);
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

// ─── Severity lookup ───────────────────────────────────────

const ERROR_CHECKS = new Set(['CHECK 6', 'CHECK 7', 'CHECK 8', 'CHECK 9', 'CHECK 13', 'CHECK 14']);

function severity(check: string): QASeverity {
  return ERROR_CHECKS.has(check) ? 'error' : 'warning';
}

// ─── Core QA runner ────────────────────────────────────────

export function runContentQA(courses: CourseInput[]): QAViolation[] {
  const violations: QAViolation[] = [];

  for (const c of courses) {
    const allQuestionIds = new Set<string>();
    const mcCorrectIndices: number[] = [];

    for (const unit of c.units) {
      for (const lesson of unit.lessons) {
        const lessonType = lesson.type || 'standard';

        // ─── CHECK 3: Standard lessons have 2-3 teaching cards ───
        if (lessonType === 'standard') {
          const teachingCards = lesson.questions.filter(q => q.type === 'teaching');
          if (teachingCards.length < 2 || teachingCards.length > 3) {
            violations.push({
              check: 'CHECK 3',
              severity: severity('CHECK 3'),
              questionId: lesson.id,
              courseId: c.id,
              courseName: c.name,
              unitTitle: unit.title,
              lessonTitle: lesson.title,
              message: `Standard lesson has ${teachingCards.length} teaching cards (expected 2-3)`,
            });
          }
        }

        // ─── CHECK 10: Speed-rounds have 15 questions and 60s limit ───
        if (lessonType === 'speed-round') {
          const sqCount = lesson.speedQuestions?.length ?? 0;
          if (sqCount !== 15) {
            violations.push({
              check: 'CHECK 10',
              severity: severity('CHECK 10'),
              questionId: lesson.id,
              courseId: c.id,
              courseName: c.name,
              unitTitle: unit.title,
              lessonTitle: lesson.title,
              message: `Speed-round has ${sqCount} questions (expected 15)`,
            });
          }
          if (lesson.speedTimeLimit !== 60) {
            violations.push({
              check: 'CHECK 10',
              severity: severity('CHECK 10'),
              questionId: lesson.id,
              courseId: c.id,
              courseName: c.name,
              unitTitle: unit.title,
              lessonTitle: lesson.title,
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
              check: 'CHECK 11',
              severity: severity('CHECK 11'),
              questionId: lesson.id,
              courseId: c.id,
              courseName: c.name,
              unitTitle: unit.title,
              lessonTitle: lesson.title,
              message: `Conversation has ${decisionPoints.length} decision points (expected 3)`,
            });
          }
        }

        // ─── Per-question checks ───
        for (const q of lesson.questions) {
          // ─── CHECK 6: No duplicate question IDs ───
          if (allQuestionIds.has(q.id)) {
            violations.push({
              check: 'CHECK 6',
              severity: severity('CHECK 6'),
              questionId: q.id,
              courseId: c.id,
              courseName: c.name,
              unitTitle: unit.title,
              lessonTitle: lesson.title,
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
                check: 'CHECK 1',
                severity: severity('CHECK 1'),
                questionId: q.id,
                courseId: c.id,
                courseName: c.name,
                unitTitle: unit.title,
                lessonTitle: lesson.title,
                message: `Em dash found in ${field.label}: "${cleaned.substring(0, 80)}..."`,
              });
            }
            if (containsDoubleDash(cleaned)) {
              violations.push({
                check: 'CHECK 1',
                severity: severity('CHECK 1'),
                questionId: q.id,
                courseId: c.id,
                courseName: c.name,
                unitTitle: unit.title,
                lessonTitle: lesson.title,
                message: `Double dash (--) found in ${field.label}: "${cleaned.substring(0, 80)}..."`,
              });
            }
          }

          // ─── CHECK 4: Teaching cards have NO options array ───
          if (q.type === 'teaching' && q.options && q.options.length > 0) {
            violations.push({
              check: 'CHECK 4',
              severity: severity('CHECK 4'),
              questionId: q.id,
              courseId: c.id,
              courseName: c.name,
              unitTitle: unit.title,
              lessonTitle: lesson.title,
              message: `Teaching card has options array (${q.options.length} items). Teaching cards should have no options.`,
            });
          }

          // ─── CHECK 5: Teaching cards max 2 sentences in explanation ───
          if (q.type === 'teaching') {
            const sentenceCount = countSentences(q.explanation);
            if (sentenceCount > 2) {
              violations.push({
                check: 'CHECK 5',
                severity: severity('CHECK 5'),
                questionId: q.id,
                courseId: c.id,
                courseName: c.name,
                unitTitle: unit.title,
                lessonTitle: lesson.title,
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
                check: 'CHECK 7',
                severity: severity('CHECK 7'),
                questionId: q.id,
                courseId: c.id,
                courseName: c.name,
                unitTitle: unit.title,
                lessonTitle: lesson.title,
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
                check: 'CHECK 8',
                severity: severity('CHECK 8'),
                questionId: q.id,
                courseId: c.id,
                courseName: c.name,
                unitTitle: unit.title,
                lessonTitle: lesson.title,
                message: `Sort-buckets has ${optLen} items (expected 6)`,
              });
            }
            if (bucketLen !== 2) {
              violations.push({
                check: 'CHECK 8',
                severity: severity('CHECK 8'),
                questionId: q.id,
                courseId: c.id,
                courseName: c.name,
                unitTitle: unit.title,
                lessonTitle: lesson.title,
                message: `Sort-buckets has ${bucketLen} buckets (expected 2)`,
              });
            }
          }

          // ─── CHECK 9: Order-steps have 4-5 items ───
          if (q.type === 'order-steps') {
            const stepLen = q.steps?.length ?? 0;
            if (stepLen < 4 || stepLen > 5) {
              violations.push({
                check: 'CHECK 9',
                severity: severity('CHECK 9'),
                questionId: q.id,
                courseId: c.id,
                courseName: c.name,
                unitTitle: unit.title,
                lessonTitle: lesson.title,
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
                  check: 'CHECK 12',
                  severity: severity('CHECK 12'),
                  questionId: q.id,
                  courseId: c.id,
                  courseName: c.name,
                  unitTitle: unit.title,
                  lessonTitle: lesson.title,
                  message: `Option[${i}] has ${wc} words (max 15): "${q.options[i]}"`,
                });
              }
            }
          }

          // ─── CHECK 13: Required fields by question type ───
          const check13 = (msg: string) => {
            violations.push({
              check: 'CHECK 13',
              severity: severity('CHECK 13'),
              questionId: q.id,
              courseId: c.id,
              courseName: c.name,
              unitTitle: unit.title,
              lessonTitle: lesson.title,
              message: msg,
            });
          };

          switch (q.type) {
            case 'multiple-choice':
            case 'scenario':
            case 'pick-the-best':
              if (!q.options || q.options.length === 0) {
                check13(`${q.type} missing required "options" array`);
              }
              if (q.correctIndex === undefined || q.correctIndex === null) {
                check13(`${q.type} missing required "correctIndex"`);
              }
              if (q.type === 'scenario' && !q.scenario) {
                check13(`scenario missing required "scenario" text`);
              }
              break;
            case 'true-false':
              if (q.correctAnswer === undefined || q.correctAnswer === null) {
                check13(`true-false missing required "correctAnswer"`);
              }
              break;
            case 'fill-blank':
              if (!q.blanks || q.blanks.length === 0) {
                check13(`fill-blank missing required "blanks" array`);
              }
              if (!q.wordBank || q.wordBank.length === 0) {
                check13(`fill-blank missing required "wordBank" array`);
              }
              break;
            case 'sort-buckets':
            case 'category-swipe':
              if (!q.options || q.options.length === 0) {
                check13(`${q.type} missing required "options" array`);
              }
              if (!q.buckets || q.buckets.length === 0) {
                check13(`${q.type} missing required "buckets" array`);
              }
              if (!q.correctBuckets || q.correctBuckets.length === 0) {
                check13(`${q.type} missing required "correctBuckets" array`);
              }
              break;
            case 'match-pairs':
              if (!q.options || q.options.length === 0) {
                check13(`match-pairs missing required "options" array`);
              }
              if (!q.matchTargets || q.matchTargets.length === 0) {
                check13(`match-pairs missing required "matchTargets" array`);
              }
              if (!q.correctMatches || q.correctMatches.length === 0) {
                check13(`match-pairs missing required "correctMatches" array`);
              }
              break;
            case 'order-steps':
            case 'rank-order':
              if (!q.steps || q.steps.length === 0) {
                check13(`${q.type} missing required "steps" array`);
              }
              if (!q.correctOrder || q.correctOrder.length === 0) {
                check13(`${q.type} missing required "correctOrder" array`);
              }
              break;
            case 'multi-select':
              if (!q.options || q.options.length === 0) {
                check13(`multi-select missing required "options" array`);
              }
              if (!q.correctIndices || q.correctIndices.length === 0) {
                check13(`multi-select missing required "correctIndices" array`);
              }
              break;
            case 'slider-estimate':
              if (q.sliderMin === undefined || q.sliderMin === null) {
                check13(`slider-estimate missing required "sliderMin"`);
              }
              if (q.sliderMax === undefined || q.sliderMax === null) {
                check13(`slider-estimate missing required "sliderMax"`);
              }
              if (q.correctValue === undefined || q.correctValue === null) {
                check13(`slider-estimate missing required "correctValue"`);
              }
              break;
            case 'image-tap':
              if (!q.tapZones || q.tapZones.length === 0) {
                check13(`image-tap missing required "tapZones" array`);
              }
              if (!q.correctZoneId) {
                check13(`image-tap missing required "correctZoneId"`);
              }
              break;
            // teaching has no special required fields beyond question/explanation
          }

          // ─── CHECK 14: correctIndex within bounds of options ───
          if (q.correctIndex !== undefined && q.correctIndex !== null && q.options) {
            if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
              violations.push({
                check: 'CHECK 14',
                severity: severity('CHECK 14'),
                questionId: q.id,
                courseId: c.id,
                courseName: c.name,
                unitTitle: unit.title,
                lessonTitle: lesson.title,
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
            check: 'CHECK 2',
            severity: severity('CHECK 2'),
            questionId: '(course-wide)',
            courseId: c.id,
            courseName: c.name,
            unitTitle: '(all)',
            lessonTitle: '(all)',
            message: `correctIndex=${pos} accounts for ${pct.toFixed(1)}% of ${total} MC questions (threshold: 35%)`,
          });
        }
      }
    }

    // Also check speed-round question IDs for duplicates within the course
    for (const unit of c.units) {
      for (const lesson of unit.lessons) {
        if (lesson.speedQuestions) {
          for (const sq of lesson.speedQuestions) {
            if (allQuestionIds.has(sq.id)) {
              violations.push({
                check: 'CHECK 6',
                severity: severity('CHECK 6'),
                questionId: sq.id,
                courseId: c.id,
                courseName: c.name,
                unitTitle: unit.title,
                lessonTitle: lesson.title,
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
