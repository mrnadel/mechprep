# Smart Mastery System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a unified mastery system that logs every answer event (from both practice and course modes) and computes topic mastery using a recency-weighted, difficulty-adjusted algorithm.

**Architecture:** A new `useMasteryStore` Zustand store collects answer events from both existing stores. A pure `computeMastery()` function computes scores on read. Course units get a `topicId` field to map lessons to topics. The profile page uses computed mastery instead of raw accuracy.

**Tech Stack:** Next.js 16, React 19, TypeScript, Zustand 5 (persist middleware), Drizzle ORM (PostgreSQL), Tailwind CSS 4, Framer Motion 12

**Spec:** `docs/superpowers/specs/2026-03-21-smart-mastery-system-design.md`

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `src/data/mastery.ts` | `AnswerEvent` type, `computeMastery()`, `computeAllMastery()`, `getMasteryLevel()` pure functions |
| `src/store/useMasteryStore.ts` | Zustand store: `events[]`, `lastSyncedIndex`, `addEvent()`, `clearEvents()` |
| `src/app/api/mastery/route.ts` | GET/POST API for syncing mastery events to/from DB |

### Modified Files
| File | Change |
|------|--------|
| `src/data/course/types.ts` | Add `topicId?: TopicId` to `Unit` interface |
| `src/data/course/units/unit-1-statics.ts` | Add `topicId: 'engineering-mechanics'` |
| `src/data/course/units/unit-2-dynamics.ts` | Add `topicId: 'engineering-mechanics'` |
| `src/data/course/units/unit-3-strength.ts` | Add `topicId: 'strength-of-materials'` |
| `src/data/course/units/unit-4-thermo.ts` | Add `topicId: 'thermodynamics'` |
| `src/data/course/units/unit-5-heat.ts` | Add `topicId: 'heat-transfer'` |
| `src/data/course/units/unit-6-fluids.ts` | Add `topicId: 'fluid-mechanics'` |
| `src/data/course/units/unit-7-materials.ts` | Add `topicId: 'materials-engineering'` |
| `src/data/course/units/unit-8-machine.ts` | Add `topicId: 'machine-elements'` |
| `src/data/course/units/unit-9-gdt.ts` | Add `topicId: 'design-tolerancing'` |
| `src/components/session/SessionView.tsx` | Log mastery event after `answerQuestion()` |
| `src/components/lesson/LessonView.tsx` | Log mastery event after `submitAnswer()` |
| `src/lib/db/schema.ts` | Add `masteryEvents` table |
| `src/app/api/user/reset-progress/route.ts` | Also delete `masteryEvents` on reset |
| `src/app/(app)/profile/page.tsx` | Replace basic mastery with computed mastery |

---

## Task 1: Mastery Types & Pure Computation Function

**Files:**
- Create: `src/data/mastery.ts`

- [ ] **Step 1: Create mastery types and computation function**

```typescript
// src/data/mastery.ts
import type { TopicId, Difficulty } from './types';

export interface AnswerEvent {
  id: string;
  questionId: string;
  topicId: TopicId;
  subtopic?: string;
  difficulty: Difficulty;
  correct: boolean;
  source: 'practice' | 'course';
  answeredAt: string; // ISO timestamp
}

export interface MasteryScore {
  topicId: TopicId;
  score: number;       // 0–100
  level: MasteryLevel;
  eventCount: number;
  lastPracticed: string | null; // ISO date or null
}

export type MasteryLevel = 'strong' | 'developing' | 'needs-work' | 'not-started';

const HALF_LIFE_DAYS = 14;
const CONFIDENCE_THRESHOLD = 8;
const DIFFICULTY_WEIGHTS: Record<Difficulty, number> = {
  beginner: 0.6,
  intermediate: 1.0,
  advanced: 1.5,
};

export function computeMastery(events: AnswerEvent[]): number {
  if (events.length === 0) return 0;

  const now = Date.now();
  let totalWeight = 0;
  let correctWeight = 0;

  for (const event of events) {
    const daysSince =
      (now - new Date(event.answeredAt).getTime()) / (1000 * 60 * 60 * 24);
    const recency = Math.pow(0.5, daysSince / HALF_LIFE_DAYS);
    const diffWeight = DIFFICULTY_WEIGHTS[event.difficulty];
    const weight = recency * diffWeight;

    totalWeight += weight;
    if (event.correct) correctWeight += weight;
  }

  const rawAccuracy = correctWeight / totalWeight;
  const confidence = Math.min(totalWeight / CONFIDENCE_THRESHOLD, 1.0);
  return Math.round(rawAccuracy * confidence * 100);
}

export function getMasteryLevel(score: number, eventCount: number): MasteryLevel {
  if (eventCount === 0) return 'not-started';
  if (score >= 75) return 'strong';
  if (score >= 40) return 'developing';
  return 'needs-work';
}

export function computeAllMastery(
  events: AnswerEvent[],
  topicIds: TopicId[]
): MasteryScore[] {
  return topicIds.map((topicId) => {
    const topicEvents = events.filter((e) => e.topicId === topicId);
    const score = computeMastery(topicEvents);
    const lastEvent = [...topicEvents]
      .sort((a, b) => new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime())[0];

    return {
      topicId,
      score,
      level: getMasteryLevel(score, topicEvents.length),
      eventCount: topicEvents.length,
      lastPracticed: lastEvent?.answeredAt?.split('T')[0] ?? null,
    };
  });
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to `src/data/mastery.ts`

- [ ] **Step 3: Commit**

```bash
git add src/data/mastery.ts
git commit -m "feat: add mastery types and computation function"
```

---

## Task 2: Mastery Zustand Store

**Files:**
- Create: `src/store/useMasteryStore.ts`

- [ ] **Step 1: Create the mastery store**

```typescript
// src/store/useMasteryStore.ts
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AnswerEvent } from '@/data/mastery';
import type { TopicId, Difficulty } from '@/data/types';

const PRUNE_DAYS = 90;

interface MasteryState {
  events: AnswerEvent[];
  lastSyncedIndex: number;

  addEvent: (event: Omit<AnswerEvent, 'id' | 'answeredAt'>) => void;
  clearEvents: () => void;
  getTopicEvents: (topicId: TopicId) => AnswerEvent[];
}

export const useMasteryStore = create<MasteryState>()(
  persist(
    (set, get) => ({
      events: [],
      lastSyncedIndex: 0,

      addEvent: (partial) => {
        const event: AnswerEvent = {
          ...partial,
          id: crypto.randomUUID(),
          answeredAt: new Date().toISOString(),
        };

        set((state) => {
          // Prune events older than PRUNE_DAYS from local storage
          const cutoff = Date.now() - PRUNE_DAYS * 24 * 60 * 60 * 1000;
          const pruned = state.events.filter(
            (e) => new Date(e.answeredAt).getTime() > cutoff
          );

          return {
            events: [...pruned, event],
            // Adjust lastSyncedIndex if pruning removed synced events
            lastSyncedIndex: Math.min(state.lastSyncedIndex, pruned.length),
          };
        });
      },

      clearEvents: () => set({ events: [], lastSyncedIndex: 0 }),

      getTopicEvents: (topicId) =>
        get().events.filter((e) => e.topicId === topicId),
    }),
    {
      name: 'mastery-events',
    }
  )
);
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to `src/store/useMasteryStore.ts`

- [ ] **Step 3: Commit**

```bash
git add src/store/useMasteryStore.ts
git commit -m "feat: add mastery event store with local pruning"
```

---

## Task 3: Course Unit Topic Mapping

**Files:**
- Modify: `src/data/course/types.ts` (line 25-32, Unit interface)
- Modify: `src/data/course/units/unit-1-statics.ts` through `unit-9-gdt.ts` (9 files)

- [ ] **Step 1: Add topicId to Unit type**

In `src/data/course/types.ts`, add import and field to Unit interface:

```typescript
// Add at top of file (line 1):
import type { TopicId } from '../types';

// Update Unit interface (line 25-32) to:
export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  topicId?: TopicId;
  lessons: Lesson[];
}
```

- [ ] **Step 2: Add topicId to each unit file**

For each unit file, add `topicId` after the `icon` field:

| File | Add after `icon: '...',` |
|------|--------------------------|
| `src/data/course/units/unit-1-statics.ts` | `topicId: 'engineering-mechanics',` |
| `src/data/course/units/unit-2-dynamics.ts` | `topicId: 'engineering-mechanics',` |
| `src/data/course/units/unit-3-strength.ts` | `topicId: 'strength-of-materials',` |
| `src/data/course/units/unit-4-thermo.ts` | `topicId: 'thermodynamics',` |
| `src/data/course/units/unit-5-heat.ts` | `topicId: 'heat-transfer',` |
| `src/data/course/units/unit-6-fluids.ts` | `topicId: 'fluid-mechanics',` |
| `src/data/course/units/unit-7-materials.ts` | `topicId: 'materials-engineering',` |
| `src/data/course/units/unit-8-machine.ts` | `topicId: 'machine-elements',` |
| `src/data/course/units/unit-9-gdt.ts` | `topicId: 'design-tolerancing',` |

Do NOT modify `unit-10-interview.ts` — it has no single topic mapping.

Example for unit-1-statics.ts — change:
```typescript
export const unit1: Unit = {
  id: 'u1-statics',
  title: 'Statics & Equilibrium',
  description: 'Forces, moments, trusses, friction, and centroids — the foundation of mechanical analysis.',
  color: '#10B981',
  icon: '⚖️',
  lessons: [
```
to:
```typescript
export const unit1: Unit = {
  id: 'u1-statics',
  title: 'Statics & Equilibrium',
  description: 'Forces, moments, trusses, friction, and centroids — the foundation of mechanical analysis.',
  color: '#10B981',
  icon: '⚖️',
  topicId: 'engineering-mechanics',
  lessons: [
```

Apply the same pattern to all 9 files.

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/data/course/types.ts src/data/course/units/
git commit -m "feat: add topicId mapping to course units"
```

---

## Task 4: Integrate Mastery Logging into SessionView (Practice)

**Files:**
- Modify: `src/components/session/SessionView.tsx` (lines 3, 55)

- [ ] **Step 1: Add mastery store import**

In `src/components/session/SessionView.tsx`, add after existing imports (after line 8):

```typescript
import { useMasteryStore } from '@/store/useMasteryStore';
```

- [ ] **Step 2: Add mastery store hook and update handleAnswer**

Inside the `SessionView` component, after the existing destructuring (after line 13):

```typescript
  const addMasteryEvent = useMasteryStore((s) => s.addEvent);
```

Replace the `handleAnswer` function (line 55-57):

```typescript
  // BEFORE:
  const handleAnswer = (correct: boolean, confidence?: number, timeSpent?: number) => {
    answerQuestion(currentQuestion.id, correct, confidence, timeSpent);
  };

  // AFTER:
  const handleAnswer = (correct: boolean, confidence?: number, timeSpent?: number) => {
    answerQuestion(currentQuestion.id, correct, confidence, timeSpent);
    addMasteryEvent({
      questionId: currentQuestion.id,
      topicId: currentQuestion.topic,
      subtopic: currentQuestion.subtopic,
      difficulty: currentQuestion.difficulty,
      correct,
      source: 'practice',
    });
  };
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/session/SessionView.tsx
git commit -m "feat: log mastery events from practice sessions"
```

---

## Task 5: Integrate Mastery Logging into LessonView (Course)

**Files:**
- Modify: `src/components/lesson/LessonView.tsx` (lines 6, 93-99)

- [ ] **Step 1: Add mastery store import**

In `src/components/lesson/LessonView.tsx`, add after existing imports (after line 13):

```typescript
import { useMasteryStore } from '@/store/useMasteryStore';
```

- [ ] **Step 2: Add mastery store hook**

Inside the `LessonView` component, after `const questionRef = useRef<QuestionCardHandle>(null);` (after line 31):

```typescript
  const addMasteryEvent = useMasteryStore((s) => s.addEvent);
```

- [ ] **Step 3: Update handleAnswer to log mastery events**

Replace the `handleAnswer` callback (lines 93-99):

```typescript
  // BEFORE:
  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (!currentQuestion) return;
      submitAnswer(currentQuestion.id, correct);
      setLastAnswerCorrect(correct);
      if (correct) {
        setXpGain(prev => prev + 10);
      }
    },
    [currentQuestion, submitAnswer]
  );

  // AFTER:
  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (!currentQuestion) return;
      submitAnswer(currentQuestion.id, correct);
      setLastAnswerCorrect(correct);
      if (correct) {
        setXpGain(prev => prev + 10);
      }
      // Log mastery event if the unit has a topicId
      const topicId = lessonData?.unit.topicId;
      if (topicId) {
        addMasteryEvent({
          questionId: currentQuestion.id,
          topicId,
          difficulty: 'intermediate', // course questions have no difficulty field
          correct,
          source: 'course',
        });
      }
    },
    [currentQuestion, submitAnswer, lessonData, addMasteryEvent]
  );
```

- [ ] **Step 4: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/components/lesson/LessonView.tsx
git commit -m "feat: log mastery events from course lessons"
```

---

## Task 6: Database Schema — masteryEvents Table

**Files:**
- Modify: `src/lib/db/schema.ts`

- [ ] **Step 1: Add masteryEvents table and index import**

In `src/lib/db/schema.ts`, add `index` to the drizzle-orm imports if not already present, then add the table definition after the existing tables (before any `relations` definitions):

Add `index` to the existing imports (preserve all existing imports like `primaryKey` and `uniqueIndex`):
```typescript
import {
  pgTable,
  text,
  timestamp,
  integer,
  jsonb,
  real,
  boolean,
  primaryKey,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
```

Add table definition:
```typescript
// ── Mastery Events ──────────────────────────────────────────
export const masteryEvents = pgTable('mastery_events', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  questionId: text('question_id').notNull(),
  topicId: text('topic_id').notNull(),
  subtopic: text('subtopic'),
  difficulty: text('difficulty').notNull(),
  correct: boolean('correct').notNull(),
  source: text('source').notNull(),
  answeredAt: timestamp('answered_at', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
}, (table) => [
  index('mastery_events_user_topic_idx').on(table.userId, table.topicId),
]);
```

- [ ] **Step 2: Generate and run migration**

Run: `npx drizzle-kit generate`
Then: `npx drizzle-kit push` (or the project's migration command)

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/db/schema.ts drizzle/
git commit -m "feat: add mastery_events database table"
```

---

## Task 7: Mastery API Route

**Files:**
- Create: `src/app/api/mastery/route.ts`

- [ ] **Step 1: Create the mastery API**

```typescript
// src/app/api/mastery/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { masteryEvents } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const events = await db
    .select({
      id: masteryEvents.id,
      questionId: masteryEvents.questionId,
      topicId: masteryEvents.topicId,
      subtopic: masteryEvents.subtopic,
      difficulty: masteryEvents.difficulty,
      correct: masteryEvents.correct,
      source: masteryEvents.source,
      answeredAt: masteryEvents.answeredAt,
    })
    .from(masteryEvents)
    .where(eq(masteryEvents.userId, userId));

  return NextResponse.json({ events });
}

export async function POST(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { events } = (await request.json()) as {
    events: {
      id: string;
      questionId: string;
      topicId: string;
      subtopic?: string;
      difficulty: string;
      correct: boolean;
      source: string;
      answeredAt: string;
    }[];
  };

  if (!events || events.length === 0) {
    return NextResponse.json({ ok: true, inserted: 0 });
  }

  // Batch insert with ON CONFLICT DO NOTHING for deduplication
  const rows = events.map((event) => ({
    id: event.id,
    userId,
    questionId: event.questionId,
    topicId: event.topicId,
    subtopic: event.subtopic ?? null,
    difficulty: event.difficulty,
    correct: event.correct,
    source: event.source,
    answeredAt: event.answeredAt,
  }));

  await db.insert(masteryEvents).values(rows).onConflictDoNothing();

  return NextResponse.json({ ok: true, inserted: rows.length });
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/api/mastery/route.ts
git commit -m "feat: add mastery events API route"
```

---

## Task 8: Add masteryEvents to Reset Progress

**Files:**
- Modify: `src/app/api/user/reset-progress/route.ts`

- [ ] **Step 1: Add masteryEvents import and delete**

In `src/app/api/user/reset-progress/route.ts`, update the imports (lines 4-10):

```typescript
// BEFORE:
import {
  userProgress,
  courseProgress,
  topicProgress,
  sessionHistory,
  dailyUsage,
} from '@/lib/db/schema';

// AFTER:
import {
  userProgress,
  courseProgress,
  topicProgress,
  sessionHistory,
  dailyUsage,
  masteryEvents,
} from '@/lib/db/schema';
```

Add to the `Promise.all` delete array (line 29-35):

```typescript
  // BEFORE:
  await Promise.all([
    db.delete(sessionHistory).where(eq(sessionHistory.userId, userId)),
    db.delete(topicProgress).where(eq(topicProgress.userId, userId)),
    db.delete(dailyUsage).where(eq(dailyUsage.userId, userId)),
    db.delete(userProgress).where(eq(userProgress.userId, userId)),
    db.delete(courseProgress).where(eq(courseProgress.userId, userId)),
  ]);

  // AFTER:
  await Promise.all([
    db.delete(sessionHistory).where(eq(sessionHistory.userId, userId)),
    db.delete(topicProgress).where(eq(topicProgress.userId, userId)),
    db.delete(dailyUsage).where(eq(dailyUsage.userId, userId)),
    db.delete(userProgress).where(eq(userProgress.userId, userId)),
    db.delete(courseProgress).where(eq(courseProgress.userId, userId)),
    db.delete(masteryEvents).where(eq(masteryEvents.userId, userId)),
  ]);
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/api/user/reset-progress/route.ts
git commit -m "feat: clear mastery events on progress reset"
```

---

## Task 9: Update Profile Page — Replace Basic Mastery with Computed Mastery

**Files:**
- Modify: `src/app/(app)/profile/page.tsx`

- [ ] **Step 1: Add mastery imports**

Add after existing imports at top of file:

```typescript
import { useMasteryStore } from '@/store/useMasteryStore';
import { computeAllMastery, getMasteryLevel } from '@/data/mastery';
import type { MasteryScore } from '@/data/mastery';
```

- [ ] **Step 2: Replace topicStats computation**

Replace the existing `topicStats` useMemo (lines 289-302) with computed mastery:

```typescript
  // BEFORE:
  const topicStats = useMemo(
    () =>
      topics.map((topic) => {
        const tp = progress.topicProgress.find((p) => p.topicId === topic.id);
        const attempted = tp?.questionsAttempted ?? 0;
        const correct = tp?.questionsCorrect ?? 0;
        return {
          ...topic,
          attempted,
          accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
        };
      }),
    [progress.topicProgress]
  );

  // AFTER:
  const masteryEvents = useMasteryStore((s) => s.events);
  const topicIds = useMemo(() => topics.map((t) => t.id), []);
  const masteryScores = useMemo(
    () => computeAllMastery(masteryEvents, topicIds),
    [masteryEvents, topicIds]
  );

  const topicStats = useMemo(
    () =>
      topics.map((topic) => {
        const ms = masteryScores.find((m) => m.topicId === topic.id);
        return {
          ...topic,
          mastery: ms?.score ?? 0,
          level: ms?.level ?? ('not-started' as const),
          eventCount: ms?.eventCount ?? 0,
          lastPracticed: ms?.lastPracticed ?? null,
        };
      }),
    [masteryScores]
  );
```

- [ ] **Step 3: Replace TopicBar component and its call site**

Add this helper function near the top of the file (after the `compressImage` function, around line 70):

```typescript
function formatDaysAgo(dateStr: string): string {
  const days = Math.floor(
    (Date.now() - new Date(dateStr + 'T12:00:00').getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days}d ago`;
}

const MASTERY_COLORS: Record<string, string> = {
  strong: '#10B981',
  developing: '#F59E0B',
  'needs-work': '#EF4444',
  'not-started': '#94A3B8',
};
```

Replace the entire `TopicBar` component (lines 159-202):

```typescript
// BEFORE (lines 159-202):
function TopicBar({
  name,
  icon,
  color,
  accuracy,
  attempted,
  delay,
}: {
  name: string;
  icon: string;
  color: string;
  accuracy: number;
  attempted: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-sm font-semibold text-gray-700">{name}</span>
        </div>
        <span className="text-xs font-bold tabular-nums" style={{ color: attempted > 0 ? color : '#94A3B8' }}>
          {attempted > 0 ? `${accuracy}%` : '—'}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}CC)` }}
          initial={{ width: 0 }}
          animate={{ width: attempted > 0 ? `${accuracy}%` : '0%' }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

// AFTER:
function TopicBar({
  name,
  icon,
  color,
  mastery,
  level,
  eventCount,
  lastPracticed,
  delay,
}: {
  name: string;
  icon: string;
  color: string;
  mastery: number;
  level: string;
  eventCount: number;
  lastPracticed: string | null;
  delay: number;
}) {
  const barColor = eventCount > 0 ? MASTERY_COLORS[level] ?? color : '#E5E7EB';
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-sm font-semibold text-gray-700">{name}</span>
        </div>
        <span className="text-xs font-bold tabular-nums" style={{ color: eventCount > 0 ? barColor : '#94A3B8' }}>
          {eventCount > 0 ? `${mastery}%` : '—'}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${barColor}, ${barColor}CC)` }}
          initial={{ width: 0 }}
          animate={{ width: eventCount > 0 ? `${mastery}%` : '0%' }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
        />
      </div>
      {eventCount > 0 && (
        <p className="text-[10px] font-semibold text-gray-400 mt-0.5">
          {level === 'strong' ? 'Strong' : level === 'developing' ? 'Developing' : 'Needs Work'}
          {lastPracticed ? ` · ${formatDaysAgo(lastPracticed)}` : ''}
        </p>
      )}
    </motion.div>
  );
}
```

Update the call site (lines 653-662):

```typescript
// BEFORE:
{topicStats.map((topic, i) => (
  <TopicBar
    key={topic.id}
    name={topic.name}
    icon={topic.icon}
    color={topic.color}
    accuracy={topic.accuracy}
    attempted={topic.attempted}
    delay={0.7 + i * 0.05}
  />
))}

// AFTER:
{topicStats.map((topic, i) => (
  <TopicBar
    key={topic.id}
    name={topic.name}
    icon={topic.icon}
    color={topic.color}
    mastery={topic.mastery}
    level={topic.level}
    eventCount={topic.eventCount}
    lastPracticed={topic.lastPracticed}
    delay={0.7 + i * 0.05}
  />
))}
```

- [ ] **Step 4: Also clear mastery store on reset progress**

In the `handleResetProgress` function, after calling the API, also clear the mastery store:

```typescript
// After the fetch to /api/user/reset-progress:
useMasteryStore.getState().clearEvents();
```

- [ ] **Step 5: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 6: Verify build passes**

Run: `npx next build`
Expected: Build succeeds

- [ ] **Step 7: Commit**

```bash
git add src/app/(app)/profile/page.tsx
git commit -m "feat: replace basic mastery with smart computed mastery on profile"
```

---

## Task 10: Sync Mastery Events to Database

**Files:**
- Modify: `src/store/useMasteryStore.ts`
- Modify: `src/components/session/SessionView.tsx`
- Modify: `src/components/lesson/LessonView.tsx`
- Modify: `src/app/(app)/profile/page.tsx`

- [ ] **Step 1: Add sync actions to mastery store**

In `src/store/useMasteryStore.ts`, add sync methods to the interface and implementation:

```typescript
// Add to MasteryState interface:
  syncToServer: () => Promise<void>;
  hydrateFromServer: () => Promise<void>;

// Add implementations inside the persist callback, after clearEvents:

      syncToServer: async () => {
        const { events, lastSyncedIndex } = get();
        const unsynced = events.slice(lastSyncedIndex);
        if (unsynced.length === 0) return;

        try {
          const res = await fetch('/api/mastery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ events: unsynced }),
          });
          if (res.ok) {
            set({ lastSyncedIndex: get().events.length });
          }
        } catch {
          // Silent fail — will retry on next sync
        }
      },

      hydrateFromServer: async () => {
        try {
          const res = await fetch('/api/mastery');
          if (!res.ok) return;
          const { events: serverEvents } = await res.json();
          if (!serverEvents || serverEvents.length === 0) return;

          set((state) => {
            const localIds = new Set(state.events.map((e) => e.id));
            const newEvents = serverEvents.filter(
              (e: AnswerEvent) => !localIds.has(e.id)
            );
            return {
              events: [...state.events, ...newEvents],
            };
          });
        } catch {
          // Silent fail
        }
      },
```

- [ ] **Step 2: Trigger sync after session completion**

In `src/components/session/SessionView.tsx`, the `SessionSummary` component is rendered after `completeSession()`. Add a sync call when the summary appears. After the existing `useEffect` for elapsed time (around line 30), add:

```typescript
  // Sync mastery events to server when session completes
  const syncMastery = useMasteryStore((s) => s.syncToServer);
  useEffect(() => {
    if (sessionSummary) {
      syncMastery();
    }
  }, [sessionSummary, syncMastery]);
```

- [ ] **Step 3: Trigger sync after lesson completion**

In `src/components/lesson/LessonView.tsx`, the `ResultScreen` is shown when `lessonResult` is set. Add a sync call. After the mastery store hook (added in Task 5), add:

```typescript
  const syncMastery = useMasteryStore((s) => s.syncToServer);
  useEffect(() => {
    if (lessonResult) {
      syncMastery();
    }
  }, [lessonResult, syncMastery]);
```

- [ ] **Step 4: Hydrate mastery on profile page load**

In `src/app/(app)/profile/page.tsx`, add hydration on mount. After the mastery store subscription (the `masteryEvents` line), add:

```typescript
  const hydrateFromServer = useMasteryStore((s) => s.hydrateFromServer);
  useEffect(() => {
    hydrateFromServer();
  }, [hydrateFromServer]);
```

- [ ] **Step 5: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/store/useMasteryStore.ts src/components/session/SessionView.tsx src/components/lesson/LessonView.tsx src/app/(app)/profile/page.tsx
git commit -m "feat: add mastery event sync to database"
```

---

## Task 11: Final Build Verification & Integration Test

- [ ] **Step 1: Run full build**

Run: `npx next build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Manual smoke test checklist**

1. Start dev server: `npm run dev`
2. Go to a practice session (adaptive) → answer a few questions → verify mastery events appear in localStorage (`mastery-events` key)
3. Go to a course lesson (any unit except u10) → answer questions → verify mastery events logged with source='course'
4. Go to profile page → verify Topic Mastery section shows computed scores
5. Try profile reset → verify mastery events are cleared

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete smart mastery system implementation"
```
