# Content Overview Admin Dashboard — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Content Overview admin tab that surfaces QA violations, audio coverage gaps, question quality outliers, and content distribution stats — all in one dashboard.

**Architecture:** Server-side API route computes static QA analysis + DB aggregates. Client page fetches and renders 5 sections: health summary cards, QA violations table, audio coverage, question quality from masteryEvents, and distribution stats. QA logic is extracted into a shared module used by both CLI and API.

**Tech Stack:** Next.js App Router, Drizzle ORM, TypeScript, existing admin UI patterns (inline styles)

---

### Task 1: Extract shared QA module from CLI script

**Files:**
- Create: `src/lib/content-qa.ts`
- Modify: `scripts/qa-content.ts`

- [ ] **Step 1: Create `src/lib/content-qa.ts` with exported types and check logic**

Extract the core check functions from `scripts/qa-content.ts` into a shared module. The module exports the `QAViolation` type, severity classification, and the `runContentQA` function. It takes loaded course data as input (no file system access — that stays in the CLI script and API route).

```ts
// src/lib/content-qa.ts
import type { Unit, Lesson, CourseQuestion, ConversationNode } from '@/data/course/types';

export interface QAViolation {
  check: string;
  severity: 'error' | 'warning';
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

const ERROR_CHECKS = new Set(['CHECK 6', 'CHECK 7', 'CHECK 8', 'CHECK 9', 'CHECK 13', 'CHECK 14']);

function containsEmDash(text: string): boolean {
  return text.includes('\u2014');
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
    .replace(/\d+\.\d+/g, '0')
    .replace(/\.\.\./g, '.');
  const periods = (cleaned.match(/\./g) || []).length;
  return Math.max(periods, 1);
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

export function runContentQA(courses: CourseInput[]): QAViolation[] {
  const violations: QAViolation[] = [];

  for (const c of courses) {
    const allQuestionIds = new Set<string>();
    const mcCorrectIndices: number[] = [];

    for (const unit of c.units) {
      for (const lesson of unit.lessons) {
        const lessonType = lesson.type || 'standard';

        // CHECK 3: Standard lessons have 2-3 teaching cards
        if (lessonType === 'standard') {
          const teachingCards = lesson.questions.filter(q => q.type === 'teaching');
          if (teachingCards.length < 2 || teachingCards.length > 3) {
            violations.push({
              check: 'CHECK 3', severity: 'warning',
              questionId: lesson.id, courseId: c.id, courseName: c.name,
              unitTitle: unit.title, lessonTitle: lesson.title,
              message: `Standard lesson has ${teachingCards.length} teaching cards (expected 2-3)`,
            });
          }
        }

        // CHECK 10: Speed-rounds
        if (lessonType === 'speed-round') {
          const sqCount = lesson.speedQuestions?.length ?? 0;
          if (sqCount !== 15) {
            violations.push({
              check: 'CHECK 10', severity: 'warning',
              questionId: lesson.id, courseId: c.id, courseName: c.name,
              unitTitle: unit.title, lessonTitle: lesson.title,
              message: `Speed-round has ${sqCount} questions (expected 15)`,
            });
          }
          if (lesson.speedTimeLimit !== 60) {
            violations.push({
              check: 'CHECK 10', severity: 'warning',
              questionId: lesson.id, courseId: c.id, courseName: c.name,
              unitTitle: unit.title, lessonTitle: lesson.title,
              message: `Speed-round speedTimeLimit is ${lesson.speedTimeLimit ?? 'undefined'} (expected 60)`,
            });
          }
        }

        // CHECK 11: Conversations
        if (lessonType === 'conversation' && lesson.conversationNodes) {
          const decisionPoints = lesson.conversationNodes.filter(
            (node: ConversationNode) => node.options && node.options.length > 0
          );
          if (decisionPoints.length !== 3) {
            violations.push({
              check: 'CHECK 11', severity: 'warning',
              questionId: lesson.id, courseId: c.id, courseName: c.name,
              unitTitle: unit.title, lessonTitle: lesson.title,
              message: `Conversation has ${decisionPoints.length} decision points (expected 3)`,
            });
          }
        }

        // Per-question checks
        for (const q of lesson.questions) {
          const ctx = { courseId: c.id, courseName: c.name, unitTitle: unit.title, lessonTitle: lesson.title };

          // CHECK 6: Duplicate IDs
          if (allQuestionIds.has(q.id)) {
            violations.push({ check: 'CHECK 6', severity: 'error', questionId: q.id, ...ctx, message: `Duplicate question ID "${q.id}"` });
          }
          allQuestionIds.add(q.id);

          // CHECK 1: Em dashes / double dashes
          const textFields = [
            { label: 'question', text: q.question },
            { label: 'explanation', text: q.explanation },
            { label: 'hint', text: q.hint || '' },
          ];
          if (q.options) q.options.forEach((opt, i) => textFields.push({ label: `option[${i}]`, text: opt }));
          if (q.scenario) textFields.push({ label: 'scenario', text: q.scenario });
          if (q.steps) q.steps.forEach((step, i) => textFields.push({ label: `step[${i}]`, text: step }));
          if (q.matchTargets) q.matchTargets.forEach((mt, i) => textFields.push({ label: `matchTarget[${i}]`, text: mt }));

          for (const field of textFields) {
            const cleaned = stripSvgDiagrams(field.text);
            if (containsEmDash(cleaned)) {
              violations.push({ check: 'CHECK 1', severity: 'warning', questionId: q.id, ...ctx, message: `Em dash found in ${field.label}` });
            }
            if (containsDoubleDash(cleaned)) {
              violations.push({ check: 'CHECK 1', severity: 'warning', questionId: q.id, ...ctx, message: `Double dash (--) found in ${field.label}` });
            }
          }

          // CHECK 4: Teaching cards no options
          if (q.type === 'teaching' && q.options && q.options.length > 0) {
            violations.push({ check: 'CHECK 4', severity: 'warning', questionId: q.id, ...ctx, message: `Teaching card has options array (${q.options.length} items)` });
          }

          // CHECK 5: Teaching card max 2 sentences
          if (q.type === 'teaching') {
            const sc = countSentences(q.explanation);
            if (sc > 2) {
              violations.push({ check: 'CHECK 5', severity: 'warning', questionId: q.id, ...ctx, message: `Teaching card explanation has ${sc} sentences (max 2)` });
            }
          }

          // CHECK 7: Match-pairs 4 pairs
          if (q.type === 'match-pairs') {
            const optLen = q.options?.length ?? 0;
            const mtLen = q.matchTargets?.length ?? 0;
            if (optLen !== 4 || mtLen !== 4) {
              violations.push({ check: 'CHECK 7', severity: 'error', questionId: q.id, ...ctx, message: `Match-pairs has ${optLen} options and ${mtLen} matchTargets (expected 4 each)` });
            }
          }

          // CHECK 8: Sort-buckets 6 items, 2 buckets
          if (q.type === 'sort-buckets') {
            const optLen = q.options?.length ?? 0;
            const bucketLen = q.buckets?.length ?? 0;
            if (optLen !== 6) violations.push({ check: 'CHECK 8', severity: 'error', questionId: q.id, ...ctx, message: `Sort-buckets has ${optLen} items (expected 6)` });
            if (bucketLen !== 2) violations.push({ check: 'CHECK 8', severity: 'error', questionId: q.id, ...ctx, message: `Sort-buckets has ${bucketLen} buckets (expected 2)` });
          }

          // CHECK 9: Order-steps 4-5 items
          if (q.type === 'order-steps') {
            const stepLen = q.steps?.length ?? 0;
            if (stepLen < 4 || stepLen > 5) {
              violations.push({ check: 'CHECK 9', severity: 'error', questionId: q.id, ...ctx, message: `Order-steps has ${stepLen} items (expected 4-5)` });
            }
          }

          // CHECK 12: Option text max 15 words
          if (q.options && q.type !== 'teaching') {
            for (let i = 0; i < q.options.length; i++) {
              const wc = wordCount(q.options[i]);
              if (wc > 15) {
                violations.push({ check: 'CHECK 12', severity: 'warning', questionId: q.id, ...ctx, message: `Option[${i}] has ${wc} words (max 15)` });
              }
            }
          }

          // CHECK 13: Required fields by type
          const missingField = (field: string) => violations.push({ check: 'CHECK 13', severity: 'error', questionId: q.id, ...ctx, message: `${q.type} missing required "${field}"` });

          switch (q.type) {
            case 'multiple-choice':
            case 'scenario':
            case 'pick-the-best':
              if (!q.options || q.options.length === 0) missingField('options');
              if (q.correctIndex === undefined || q.correctIndex === null) missingField('correctIndex');
              if (q.type === 'scenario' && !q.scenario) missingField('scenario');
              break;
            case 'true-false':
              if (q.correctAnswer === undefined || q.correctAnswer === null) missingField('correctAnswer');
              break;
            case 'fill-blank':
              if (!q.blanks || q.blanks.length === 0) missingField('blanks');
              if (!q.wordBank || q.wordBank.length === 0) missingField('wordBank');
              break;
            case 'sort-buckets':
            case 'category-swipe':
              if (!q.options || q.options.length === 0) missingField('options');
              if (!q.buckets || q.buckets.length === 0) missingField('buckets');
              if (!q.correctBuckets || q.correctBuckets.length === 0) missingField('correctBuckets');
              break;
            case 'match-pairs':
              if (!q.options || q.options.length === 0) missingField('options');
              if (!q.matchTargets || q.matchTargets.length === 0) missingField('matchTargets');
              if (!q.correctMatches || q.correctMatches.length === 0) missingField('correctMatches');
              break;
            case 'order-steps':
            case 'rank-order':
              if (!q.steps || q.steps.length === 0) missingField('steps');
              if (!q.correctOrder || q.correctOrder.length === 0) missingField('correctOrder');
              break;
            case 'multi-select':
              if (!q.options || q.options.length === 0) missingField('options');
              if (!q.correctIndices || q.correctIndices.length === 0) missingField('correctIndices');
              break;
            case 'slider-estimate':
              if (q.sliderMin === undefined || q.sliderMin === null) missingField('sliderMin');
              if (q.sliderMax === undefined || q.sliderMax === null) missingField('sliderMax');
              if (q.correctValue === undefined || q.correctValue === null) missingField('correctValue');
              break;
            case 'image-tap':
              if (!q.tapZones || q.tapZones.length === 0) missingField('tapZones');
              if (!q.correctZoneId) missingField('correctZoneId');
              break;
          }

          // CHECK 14: correctIndex in bounds
          if (q.correctIndex !== undefined && q.correctIndex !== null && q.options) {
            if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
              violations.push({ check: 'CHECK 14', severity: 'error', questionId: q.id, ...ctx, message: `correctIndex ${q.correctIndex} out of bounds (options length: ${q.options.length})` });
            }
          }

          // Collect for CHECK 2
          if ((q.type === 'multiple-choice' || q.type === 'scenario' || q.type === 'pick-the-best') && q.correctIndex !== undefined && q.correctIndex !== null) {
            mcCorrectIndices.push(q.correctIndex);
          }
        }
      }
    }

    // CHECK 2: correctIndex distribution
    if (mcCorrectIndices.length > 0) {
      const counts = [0, 0, 0, 0];
      for (const idx of mcCorrectIndices) { if (idx >= 0 && idx < 4) counts[idx]++; }
      const total = mcCorrectIndices.length;
      for (let pos = 0; pos < 4; pos++) {
        const pct = (counts[pos] / total) * 100;
        if (pct > 35) {
          violations.push({
            check: 'CHECK 2', severity: 'warning',
            questionId: '(course-wide)', courseId: c.id, courseName: c.name,
            unitTitle: '-', lessonTitle: '-',
            message: `correctIndex=${pos} accounts for ${pct.toFixed(1)}% of ${total} MC questions (threshold: 35%)`,
          });
        }
      }
    }

    // Speed-round duplicate ID check
    for (const unit of c.units) {
      for (const lesson of unit.lessons) {
        if (lesson.speedQuestions) {
          for (const sq of lesson.speedQuestions) {
            if (allQuestionIds.has(sq.id)) {
              violations.push({
                check: 'CHECK 6', severity: 'error',
                questionId: sq.id, courseId: c.id, courseName: c.name,
                unitTitle: unit.title, lessonTitle: lesson.title,
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
```

- [ ] **Step 2: Update `scripts/qa-content.ts` to import from shared module**

Replace the inline check logic with an import from the shared module. Keep the file-system loading and CLI output formatting in the script.

```ts
// scripts/qa-content.ts — updated
import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';
import { course } from '../src/data/course';
import type { Unit } from '../src/data/course/types';
import { runContentQA, type CourseInput } from '../src/lib/content-qa';
import { PROFESSION_ID } from '../src/data/professions';

// Keep: isUnit, loadProfessionUnits, discoverProfessions, loadAllCourses (unchanged)
// Keep: guessUnitFile (for file path display only)

// Replace runChecks call with:
// const violations = runContentQA(courses.map(c => ({ id: c.id, name: c.name, units: c.units })));

// Keep: main() output formatting (unchanged)
```

The `CourseEntry` type in the script gains an `id` field (profession ID string). ME uses `'mechanical-engineering'`, others use their directory name.

- [ ] **Step 3: Verify QA script still works**

Run: `npx tsx scripts/qa-content.ts`
Expected: Same output as before (violations grouped by course, summary at bottom).

- [ ] **Step 4: Commit**

```bash
git add src/lib/content-qa.ts scripts/qa-content.ts
git commit -m "refactor: extract QA checks into shared content-qa module"
```

---

### Task 2: Create the API route

**Files:**
- Create: `src/app/api/admin/content-overview/route.ts`

- [ ] **Step 1: Create the API route**

The route does 4 things:
1. Runs static QA checks via the shared module
2. Scans `public/audio/tts/` for audio coverage
3. Queries `masteryEvents` for per-question accuracy
4. Queries `contentFeedback` for user reports

```ts
// src/app/api/admin/content-overview/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { masteryEvents, contentFeedback, contentFeedbackDismissals } from '@/lib/db/schema';
import { sql, eq, count, and, notInArray } from 'drizzle-orm';
import { runContentQA, type CourseInput, type QAViolation } from '@/lib/content-qa';
import { PROFESSIONS, PROFESSION_ID } from '@/data/professions';
import { getCourseMetaForProfession } from '@/data/course/course-meta';
import * as fs from 'fs';
import * as path from 'path';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim().toLowerCase());

export async function GET() {
  // Auth check
  const session = await auth();
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email.toLowerCase())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 1. Load all courses and run QA checks
  const courseInputs: CourseInput[] = PROFESSIONS.filter(p => !p.isComingSoon).map(p => ({
    id: p.id,
    name: p.shortName,
    units: getCourseMetaForProfession(p.id),
  }));

  // getCourseMetaForProfession returns metadata with empty questions arrays.
  // We need full content for QA checks. Load dynamically.
  const { course: meCourse } = await import('@/data/course');
  const fullCourseInputs: CourseInput[] = [];

  // ME
  fullCourseInputs.push({ id: PROFESSION_ID.MECHANICAL_ENGINEERING, name: 'ME', units: meCourse });

  // Profession courses — dynamic imports
  const professionModules: Record<string, () => Promise<{ units: any[] }>> = {
    'personal-finance': async () => {
      const mod = await import('@/data/course/professions/personal-finance/units');
      return { units: Object.values(mod).flat().filter((v: any) => v?.lessons) };
    },
    'psychology': async () => {
      const mod = await import('@/data/course/professions/psychology/units');
      return { units: Object.values(mod).flat().filter((v: any) => v?.lessons) };
    },
    'space-astronomy': async () => {
      const mod = await import('@/data/course/professions/space-astronomy/units');
      return { units: Object.values(mod).flat().filter((v: any) => v?.lessons) };
    },
  };

  for (const p of PROFESSIONS.filter(p => !p.isComingSoon && p.id !== PROFESSION_ID.MECHANICAL_ENGINEERING)) {
    const loader = professionModules[p.id];
    if (loader) {
      try {
        const { units } = await loader();
        fullCourseInputs.push({ id: p.id, name: p.shortName, units });
      } catch (e) {
        console.error(`Failed to load ${p.id}:`, e);
      }
    }
  }

  const qaViolations = runContentQA(fullCourseInputs);

  // 2. Count content per course (from full data)
  const courseStats = fullCourseInputs.map(c => {
    let totalLessons = 0;
    let totalQuestions = 0;
    let totalTeaching = 0;
    let totalCards = 0; // questions + teaching cards (for audio)
    const questionIds: string[] = [];
    const typeCounts: Record<string, number> = {};

    for (const unit of c.units) {
      for (const lesson of unit.lessons) {
        totalLessons++;
        for (const q of lesson.questions) {
          if (q.type === 'teaching') {
            totalTeaching++;
            totalCards++;
          } else {
            totalQuestions++;
            totalCards++;
          }
          questionIds.push(q.id);
          typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
        }
      }
    }

    return {
      courseId: c.id,
      courseName: c.name,
      unitCount: c.units.length,
      lessonCount: totalLessons,
      questionCount: totalQuestions,
      teachingCount: totalTeaching,
      totalCards,
      questionIds,
      typeCounts,
    };
  });

  // 3. Audio coverage — scan public/audio/tts/
  const audioDir = path.join(process.cwd(), 'public', 'audio', 'tts');
  let audioFolders: string[] = [];
  let audioFilesByLesson: Record<string, string[]> = {};
  try {
    if (fs.existsSync(audioDir)) {
      audioFolders = fs.readdirSync(audioDir).filter(f =>
        fs.statSync(path.join(audioDir, f)).isDirectory()
      );
      for (const folder of audioFolders) {
        const files = fs.readdirSync(path.join(audioDir, folder)).filter(f => f.endsWith('.ogg'));
        audioFilesByLesson[folder] = files;
      }
    }
  } catch { /* ignore */ }

  // Build audio coverage per course
  const audioCoverage = courseStats.map(cs => {
    // Expected: teaching cards = 1 file ({id}.ogg), questions = 2 files ({id}-q.ogg, {id}-exp.ogg)
    let expectedFiles = 0;
    let actualFiles = 0;
    const lessonCoverage: { lessonId: string; lessonTitle: string; unitTitle: string; expected: number; actual: number }[] = [];

    const courseData = fullCourseInputs.find(c => c.id === cs.courseId);
    if (courseData) {
      for (const unit of courseData.units) {
        for (const lesson of unit.lessons) {
          let lessonExpected = 0;
          let lessonActual = 0;
          const audioFiles = audioFilesByLesson[lesson.id] || [];

          for (const q of lesson.questions) {
            if (q.type === 'teaching') {
              lessonExpected += 1;
              if (audioFiles.includes(`${q.id}.ogg`)) lessonActual += 1;
            } else {
              lessonExpected += 2;
              if (audioFiles.includes(`${q.id}-q.ogg`)) lessonActual += 1;
              if (audioFiles.includes(`${q.id}-exp.ogg`)) lessonActual += 1;
            }
          }

          expectedFiles += lessonExpected;
          actualFiles += lessonActual;
          lessonCoverage.push({
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            unitTitle: unit.title,
            expected: lessonExpected,
            actual: lessonActual,
          });
        }
      }
    }

    return {
      courseId: cs.courseId,
      courseName: cs.courseName,
      expectedFiles,
      actualFiles,
      coveragePct: expectedFiles > 0 ? Math.round((actualFiles / expectedFiles) * 100) : 0,
      lessonCoverage,
    };
  });

  // 4. Question quality from masteryEvents
  const accuracyRows = await db.execute(sql`
    SELECT
      question_id,
      COUNT(*)::int as attempts,
      COUNT(*) FILTER (WHERE correct)::int as correct_count,
      ROUND(COUNT(*) FILTER (WHERE correct)::numeric / NULLIF(COUNT(*), 0) * 100, 1)::float as accuracy_pct
    FROM mastery_events
    GROUP BY question_id
    HAVING COUNT(*) >= 10
    ORDER BY accuracy_pct ASC
    LIMIT 200
  `);

  // 5. User reports from contentFeedback (non-dismissed)
  const dismissedIds = await db.select({ contentId: contentFeedbackDismissals.contentId })
    .from(contentFeedbackDismissals);
  const dismissedSet = new Set(dismissedIds.map(d => d.contentId));

  const reports = await db.select({
    contentId: contentFeedback.contentId,
    contentType: contentFeedback.contentType,
    reason: contentFeedback.reason,
    comment: contentFeedback.comment,
    createdAt: contentFeedback.createdAt,
  })
    .from(contentFeedback)
    .orderBy(sql`created_at DESC`)
    .limit(100);

  const filteredReports = reports.filter(r => !dismissedSet.has(r.contentId));

  // 6. Content distribution — correctIndex bias per course
  const indexBias = courseStats.map(cs => {
    const courseData = fullCourseInputs.find(c => c.id === cs.courseId);
    if (!courseData) return { courseId: cs.courseId, courseName: cs.courseName, distribution: [0, 0, 0, 0], total: 0 };

    const counts = [0, 0, 0, 0];
    let total = 0;
    for (const unit of courseData.units) {
      for (const lesson of unit.lessons) {
        for (const q of lesson.questions) {
          if ((q.type === 'multiple-choice' || q.type === 'scenario' || q.type === 'pick-the-best') && q.correctIndex !== undefined && q.correctIndex !== null) {
            if (q.correctIndex >= 0 && q.correctIndex < 4) counts[q.correctIndex]++;
            total++;
          }
        }
      }
    }
    return { courseId: cs.courseId, courseName: cs.courseName, distribution: counts, total };
  });

  return NextResponse.json({
    courseStats,
    qaViolations,
    audioCoverage,
    questionQuality: accuracyRows.rows || [],
    userReports: filteredReports,
    indexBias,
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/content-overview/route.ts
git commit -m "feat: add content overview API route"
```

---

### Task 3: Add admin nav tab and create the dashboard page

**Files:**
- Modify: `src/app/(app)/admin/layout.tsx` (add "Overview" tab)
- Create: `src/app/(app)/admin/content-overview/page.tsx`

- [ ] **Step 1: Add Overview tab to admin nav**

In `src/app/(app)/admin/layout.tsx`, add an entry to the `NAV_LINKS` array before "Content":

```ts
const NAV_LINKS = [
  { href: '/admin/feedback', label: 'Feedback' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/content-overview', label: 'Overview' },
  { href: '/admin/content', label: 'Content' },
  { href: '/admin/subscriptions', label: 'Subs' },
  { href: '/admin/flags', label: 'Flags' },
];
```

- [ ] **Step 2: Create the dashboard page**

Create `src/app/(app)/admin/content-overview/page.tsx` — a client component that fetches `/api/admin/content-overview` and renders all 5 sections.

The page structure:
1. **Header**: "Content Overview" title + subtitle
2. **Course Health Cards**: 2x2 grid of cards per course showing units/lessons/questions/violations/audio%
3. **QA Violations**: Filterable table sorted errors-first
4. **Audio Coverage**: Per-course bars with expandable unit detail
5. **Question Quality**: Table of accuracy outliers from masteryEvents
6. **Content Distribution**: Type breakdown + index bias per course

```tsx
// src/app/(app)/admin/content-overview/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { PROFESSIONS } from '@/data/professions';

// Types matching API response
interface CourseStat {
  courseId: string;
  courseName: string;
  unitCount: number;
  lessonCount: number;
  questionCount: number;
  teachingCount: number;
  totalCards: number;
  typeCounts: Record<string, number>;
}

interface QAViolation {
  check: string;
  severity: 'error' | 'warning';
  questionId: string;
  courseId: string;
  courseName: string;
  unitTitle: string;
  lessonTitle: string;
  message: string;
}

interface LessonAudioCoverage {
  lessonId: string;
  lessonTitle: string;
  unitTitle: string;
  expected: number;
  actual: number;
}

interface AudioCoverage {
  courseId: string;
  courseName: string;
  expectedFiles: number;
  actualFiles: number;
  coveragePct: number;
  lessonCoverage: LessonAudioCoverage[];
}

interface QuestionQualityRow {
  question_id: string;
  attempts: number;
  correct_count: number;
  accuracy_pct: number;
}

interface UserReport {
  contentId: string;
  contentType: string;
  reason: string;
  comment: string | null;
  createdAt: string;
}

interface IndexBias {
  courseId: string;
  courseName: string;
  distribution: number[];
  total: number;
}

interface OverviewData {
  courseStats: CourseStat[];
  qaViolations: QAViolation[];
  audioCoverage: AudioCoverage[];
  questionQuality: QuestionQualityRow[];
  userReports: UserReport[];
  indexBias: IndexBias[];
}

export default function ContentOverviewPage() {
  const { status } = useSession();
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courseFilter, setCourseFilter] = useState<string | null>(null);
  const [expandedAudio, setExpandedAudio] = useState<string | null>(null);
  const [violationSeverity, setViolationSeverity] = useState<'all' | 'error' | 'warning'>('all');

  useEffect(() => {
    if (status !== 'authenticated') return;
    setLoading(true);
    fetch('/api/admin/content-overview')
      .then(r => { if (!r.ok) throw new Error('Failed'); return r.json(); })
      .then(setData)
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 32, height: 32, border: '2px solid #E5E5E5', borderTopColor: '#6366F1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ fontSize: 14, color: '#888' }}>Analyzing content...</p>
        </div>
      </div>
    );
  }
  if (error) return <p style={{ color: 'red', padding: 32 }}>{error}</p>;
  if (!data) return null;

  const filteredViolations = data.qaViolations
    .filter(v => !courseFilter || v.courseId === courseFilter)
    .filter(v => violationSeverity === 'all' || v.severity === violationSeverity)
    .sort((a, b) => (a.severity === 'error' ? 0 : 1) - (b.severity === 'error' ? 0 : 1));

  const errorCount = data.qaViolations.filter(v => v.severity === 'error').length;
  const warningCount = data.qaViolations.filter(v => v.severity === 'warning').length;

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Content Overview</h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
        Health checks, audio coverage, and quality metrics across all courses.
      </p>

      {/* Course filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        <button
          onClick={() => setCourseFilter(null)}
          style={{
            padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            border: '1px solid #E5E5E5',
            background: !courseFilter ? '#111' : 'white',
            color: !courseFilter ? 'white' : '#666',
          }}
        >All Courses</button>
        {data.courseStats.map(cs => {
          const prof = PROFESSIONS.find(p => p.id === cs.courseId);
          return (
            <button
              key={cs.courseId}
              onClick={() => setCourseFilter(cs.courseId)}
              style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: '1px solid #E5E5E5',
                background: courseFilter === cs.courseId ? '#111' : 'white',
                color: courseFilter === cs.courseId ? 'white' : '#666',
              }}
            >{prof?.icon} {cs.courseName}</button>
          );
        })}
      </div>

      {/* ── Section 1: Course Health Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
        {data.courseStats
          .filter(cs => !courseFilter || cs.courseId === courseFilter)
          .map(cs => {
            const violations = data.qaViolations.filter(v => v.courseId === cs.courseId);
            const errors = violations.filter(v => v.severity === 'error').length;
            const audio = data.audioCoverage.find(a => a.courseId === cs.courseId);
            const audioPct = audio?.coveragePct ?? 0;
            const reports = data.userReports.filter(r => {
              // Match by question ID prefix convention
              return cs.courseId === 'personal-finance' ? r.contentId.startsWith('fin-') || r.contentId.startsWith('pf-') : false;
            });
            const prof = PROFESSIONS.find(p => p.id === cs.courseId);
            const statusColor = errors > 0 ? '#EF4444' : violations.length > 5 ? '#F59E0B' : '#10B981';

            return (
              <div key={cs.courseId} style={{
                background: 'white', borderRadius: 12, border: '1px solid #E5E5E5', padding: '20px 24px',
                borderLeft: `4px solid ${statusColor}`,
              }}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>
                  {prof?.icon} {cs.courseName}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13, color: '#666' }}>
                  <div>Units: <b style={{ color: '#111' }}>{cs.unitCount}</b></div>
                  <div>Lessons: <b style={{ color: '#111' }}>{cs.lessonCount}</b></div>
                  <div>Questions: <b style={{ color: '#111' }}>{cs.questionCount}</b></div>
                  <div>Teaching: <b style={{ color: '#111' }}>{cs.teachingCount}</b></div>
                </div>
                <div style={{ marginTop: 12, display: 'flex', gap: 12, fontSize: 13 }}>
                  {errors > 0 && <span style={{ color: '#EF4444', fontWeight: 700 }}>{errors} errors</span>}
                  {violations.length - errors > 0 && <span style={{ color: '#F59E0B', fontWeight: 700 }}>{violations.length - errors} warnings</span>}
                  {violations.length === 0 && <span style={{ color: '#10B981', fontWeight: 700 }}>No issues</span>}
                </div>
                <div style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
                  Audio: <b style={{ color: audioPct >= 80 ? '#10B981' : audioPct >= 50 ? '#F59E0B' : '#EF4444' }}>{audioPct}%</b>
                </div>
              </div>
            );
          })}
      </div>

      {/* ── Section 2: QA Violations ── */}
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
        QA Violations
        <span style={{ fontSize: 13, fontWeight: 400, color: '#888', marginLeft: 8 }}>
          {errorCount} errors, {warningCount} warnings
        </span>
      </h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {(['all', 'error', 'warning'] as const).map(sev => (
          <button
            key={sev}
            onClick={() => setViolationSeverity(sev)}
            style={{
              padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              border: '1px solid #E5E5E5',
              background: violationSeverity === sev ? '#111' : 'white',
              color: violationSeverity === sev ? 'white' : '#666',
            }}
          >{sev === 'all' ? 'All' : sev === 'error' ? 'Errors' : 'Warnings'}</button>
        ))}
      </div>
      {filteredViolations.length === 0 ? (
        <p style={{ color: '#10B981', fontSize: 14, marginBottom: 40, fontWeight: 600 }}>No violations found!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40, maxHeight: 500, overflowY: 'auto' }}>
          {filteredViolations.map((v, i) => (
            <div key={`${v.questionId}-${v.check}-${i}`} style={{
              background: 'white', borderRadius: 10, border: '1px solid #E5E5E5', padding: '12px 16px',
              borderLeft: `3px solid ${v.severity === 'error' ? '#EF4444' : '#F59E0B'}`,
              fontSize: 13,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: v.severity === 'error' ? '#EF4444' : '#F59E0B' }}>
                  {v.check}
                </span>
                <span style={{ color: '#888', fontSize: 12 }}>{v.courseName}</span>
              </div>
              <div style={{ color: '#333', marginBottom: 4 }}>{v.message}</div>
              <div style={{ color: '#AAA', fontSize: 12 }}>
                {v.unitTitle} &rsaquo; {v.lessonTitle} &rsaquo; <code>{v.questionId}</code>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Section 3: Audio Coverage ── */}
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Audio Coverage</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        {data.audioCoverage
          .filter(ac => !courseFilter || ac.courseId === courseFilter)
          .map(ac => {
            const prof = PROFESSIONS.find(p => p.id === ac.courseId);
            const isExpanded = expandedAudio === ac.courseId;
            return (
              <div key={ac.courseId} style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E5E5', padding: '16px 20px' }}>
                <div
                  onClick={() => setExpandedAudio(isExpanded ? null : ac.courseId)}
                  style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{prof?.icon} {ac.courseName}</span>
                    <span style={{ fontSize: 13, color: '#888', marginLeft: 12 }}>
                      {ac.actualFiles} / {ac.expectedFiles} files
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 120, height: 8, borderRadius: 4, background: '#F3F4F6', overflow: 'hidden' }}>
                      <div style={{
                        width: `${ac.coveragePct}%`, height: '100%', borderRadius: 4,
                        background: ac.coveragePct >= 80 ? '#10B981' : ac.coveragePct >= 50 ? '#F59E0B' : '#EF4444',
                      }} />
                    </div>
                    <span style={{
                      fontWeight: 700, fontSize: 14, minWidth: 40, textAlign: 'right',
                      color: ac.coveragePct >= 80 ? '#10B981' : ac.coveragePct >= 50 ? '#F59E0B' : '#EF4444',
                    }}>{ac.coveragePct}%</span>
                    <span style={{ fontSize: 12, color: '#888' }}>{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>
                {isExpanded && (
                  <div style={{ marginTop: 12, maxHeight: 300, overflowY: 'auto' }}>
                    {ac.lessonCoverage
                      .filter(lc => lc.actual < lc.expected)
                      .map(lc => {
                        const pct = lc.expected > 0 ? Math.round((lc.actual / lc.expected) * 100) : 0;
                        return (
                          <div key={lc.lessonId} style={{ fontSize: 12, padding: '6px 0', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#555' }}>
                              {lc.unitTitle} &rsaquo; {lc.lessonTitle}
                            </span>
                            <span style={{ color: pct === 0 ? '#EF4444' : '#F59E0B', fontWeight: 600 }}>
                              {lc.actual}/{lc.expected} ({pct}%)
                            </span>
                          </div>
                        );
                      })}
                    {ac.lessonCoverage.filter(lc => lc.actual < lc.expected).length === 0 && (
                      <p style={{ color: '#10B981', fontSize: 12 }}>All lessons fully covered!</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* ── Section 4: Question Quality ── */}
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
        Question Quality
        <span style={{ fontSize: 13, fontWeight: 400, color: '#888', marginLeft: 8 }}>
          from live user data (min 10 attempts)
        </span>
      </h2>
      {data.questionQuality.length === 0 ? (
        <p style={{ color: '#888', fontSize: 14, marginBottom: 40 }}>No question data yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40, maxHeight: 400, overflowY: 'auto' }}>
          {data.questionQuality.map((q: QuestionQualityRow) => (
            <div key={q.question_id} style={{
              background: 'white', borderRadius: 10, border: '1px solid #E5E5E5', padding: '12px 16px',
              borderLeft: `3px solid ${q.accuracy_pct < 30 ? '#EF4444' : q.accuracy_pct > 95 ? '#3B82F6' : '#E5E5E5'}`,
              fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <code style={{ color: '#333' }}>{q.question_id}</code>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ color: '#888' }}>{q.attempts} attempts</span>
                <span style={{
                  fontWeight: 700,
                  color: q.accuracy_pct < 30 ? '#EF4444' : q.accuracy_pct > 95 ? '#3B82F6' : '#10B981',
                }}>
                  {q.accuracy_pct}%
                  {q.accuracy_pct < 30 && ' ⚠️ too hard'}
                  {q.accuracy_pct > 95 && ' 💤 too easy'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Section 5: User Reports ── */}
      {data.userReports.length > 0 && (
        <>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            User Reports
            <span style={{ fontSize: 13, fontWeight: 400, color: '#888', marginLeft: 8 }}>
              {data.userReports.length} open
            </span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40, maxHeight: 300, overflowY: 'auto' }}>
            {data.userReports.map((r, i) => (
              <div key={`${r.contentId}-${i}`} style={{
                background: 'white', borderRadius: 10, border: '1px solid #E5E5E5', padding: '12px 16px', fontSize: 13,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <code style={{ color: '#333' }}>{r.contentId}</code>
                  <span style={{ color: '#F59E0B', fontWeight: 600 }}>{r.reason}</span>
                </div>
                {r.comment && <div style={{ color: '#666' }}>{r.comment}</div>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Section 6: Content Distribution ── */}
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Content Distribution</h2>

      {/* Type breakdown */}
      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: '#555' }}>Question Types</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginBottom: 24 }}>
        {data.courseStats
          .filter(cs => !courseFilter || cs.courseId === courseFilter)
          .map(cs => {
            const total = Object.values(cs.typeCounts).reduce((a, b) => a + b, 0);
            const sorted = Object.entries(cs.typeCounts).sort((a, b) => b[1] - a[1]);
            return (
              <div key={cs.courseId} style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E5E5', padding: '16px 20px' }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>{cs.courseName}</div>
                {sorted.map(([type, count]) => {
                  const pct = Math.round((count / total) * 100);
                  const tooHigh = pct > 40;
                  return (
                    <div key={type} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '3px 0', color: tooHigh ? '#EF4444' : '#555' }}>
                      <span>{type}</span>
                      <span style={{ fontWeight: tooHigh ? 700 : 400 }}>{count} ({pct}%){tooHigh ? ' ⚠️' : ''}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>

      {/* Index bias */}
      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: '#555' }}>Correct Answer Position Bias</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginBottom: 24 }}>
        {data.indexBias
          .filter(ib => !courseFilter || ib.courseId === courseFilter)
          .map(ib => (
            <div key={ib.courseId} style={{ background: 'white', borderRadius: 12, border: '1px solid #E5E5E5', padding: '16px 20px' }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>{ib.courseName}</div>
              {['A', 'B', 'C', 'D'].map((label, idx) => {
                const pct = ib.total > 0 ? Math.round((ib.distribution[idx] / ib.total) * 100) : 0;
                const flagged = pct > 35;
                return (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, width: 16 }}>{label}</span>
                    <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#F3F4F6', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: flagged ? '#EF4444' : '#6366F1' }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: flagged ? 700 : 400, color: flagged ? '#EF4444' : '#888', minWidth: 36 }}>{pct}%</span>
                  </div>
                );
              })}
              <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{ib.total} MC questions</div>
            </div>
          ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify the page loads**

Start dev server and navigate to `/admin/content-overview`. Verify:
- Tab shows in nav bar
- Data loads and all 5 sections render
- Course filter buttons work
- Audio coverage expandable rows work
- QA violations severity filter works

- [ ] **Step 4: Commit**

```bash
git add src/app/(app)/admin/content-overview/page.tsx src/app/(app)/admin/layout.tsx
git commit -m "feat: add content overview admin dashboard"
```
