# Content Feedback System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let users flag bad questions in two taps; surface flagged content on an admin page for review.

**Architecture:** New `contentFeedback` + `contentFeedbackDismissals` DB tables, a `useFeedbackStore` Zustand store hydrated at app load, a self-contained `FlagButton` component integrated into both feedback surfaces, three API routes (user CRUD + admin read + admin dismiss), and an admin dashboard page outside the `(app)` layout.

**Tech Stack:** Next.js 16 (App Router), React 19, Drizzle ORM, PostgreSQL (Supabase), Zustand, Framer Motion, Tailwind CSS 4, Lucide icons.

**Spec:** `docs/superpowers/specs/2026-03-21-content-feedback-system-design.md`

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/data/types.ts` | Modify | Add `ContentFeedbackType`, `FeedbackReason`, `UserFlagItem` types + validation arrays |
| `src/lib/db/schema.ts` | Modify | Add `contentFeedback` and `contentFeedbackDismissals` tables |
| `src/store/useFeedbackStore.ts` | Create | Zustand store: `flags` map, `setFlag`, `removeFlag`, `getFlag`, `hydrateFlags` |
| `src/hooks/useDbSync.ts` | Modify | Add feedback flags fetch to `Promise.all` hydration |
| `src/app/api/content-feedback/route.ts` | Create | `GET` (user flags), `POST` (upsert flag), `DELETE` (remove flag) |
| `src/app/api/admin/content-feedback/route.ts` | Create | `GET` (aggregated flagged content for admin) |
| `src/app/api/admin/content-feedback/dismiss/route.ts` | Create | `POST` (dismiss a flagged item) |
| `src/components/feedback/FlagButton.tsx` | Create | Flag icon + expandable reason chips, reads/writes feedback store |
| `src/components/feedback/FeedbackPanel.tsx` | Modify | Add `<FlagButton>` above Continue button |
| `src/components/lesson/LessonView.tsx` | Modify | Add `<FlagButton>` in post-answer feedback bar |
| `src/app/admin/feedback/page.tsx` | Create | Admin dashboard: flagged content table with dismiss |

---

### Task 1: Add types and validation constants

**Files:**
- Modify: `src/data/types.ts:303` (append after last type)

- [ ] **Step 1: Add feedback types to `src/data/types.ts`**

Append at the end of the file (after line 303):

```typescript
// --------------- Content Feedback ---------------

export type ContentFeedbackType = 'question' | 'lesson-question';
export type FeedbackReason = 'confusing' | 'incorrect' | 'too-easy' | 'too-hard';

export const VALID_CONTENT_TYPES: ContentFeedbackType[] = ['question', 'lesson-question'];
export const VALID_REASONS: FeedbackReason[] = ['confusing', 'incorrect', 'too-easy', 'too-hard'];

export interface UserFlagItem {
  contentType: ContentFeedbackType;
  contentId: string;
  reason: FeedbackReason;
}
```

- [ ] **Step 2: Verify the app still compiles**

Run: `npx next build --no-lint 2>&1 | head -20` (or `npx tsc --noEmit`)
Expected: No new errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/types.ts
git commit -m "feat(feedback): add ContentFeedbackType, FeedbackReason, and UserFlagItem types"
```

---

### Task 2: Add database schema

**Files:**
- Modify: `src/lib/db/schema.ts:231` (append after `dailyUsage` table)

- [ ] **Step 1: Add `contentFeedback` and `contentFeedbackDismissals` tables**

Append at the end of `src/lib/db/schema.ts` (after line 230):

```typescript
// ─── Content Feedback ───────────────────────────────────────

export const contentFeedback = pgTable(
  'content_feedback',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    contentType: text('content_type').notNull(),
    contentId: text('content_id').notNull(),
    reason: text('reason').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  },
  (table) => [
    uniqueIndex('content_feedback_user_content_idx').on(
      table.userId,
      table.contentType,
      table.contentId
    ),
  ]
);

export const contentFeedbackDismissals = pgTable(
  'content_feedback_dismissals',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    contentType: text('content_type').notNull(),
    contentId: text('content_id').notNull(),
    dismissedAt: timestamp('dismissed_at', { mode: 'date' }).defaultNow(),
  },
  (table) => [
    uniqueIndex('content_feedback_dismissal_idx').on(
      table.contentType,
      table.contentId
    ),
  ]
);
```

- [ ] **Step 2: Push schema to database**

Run: `npx drizzle-kit push`
Expected: Tables `content_feedback` and `content_feedback_dismissals` created successfully.

- [ ] **Step 3: Commit**

```bash
git add src/lib/db/schema.ts
git commit -m "feat(feedback): add content_feedback and content_feedback_dismissals tables"
```

---

### Task 3: Create Zustand feedback store

**Files:**
- Create: `src/store/useFeedbackStore.ts`

- [ ] **Step 1: Create `src/store/useFeedbackStore.ts`**

```typescript
'use client';

import { create } from 'zustand';
import type { ContentFeedbackType, FeedbackReason, UserFlagItem } from '@/data/types';

function flagKey(contentType: ContentFeedbackType, contentId: string): string {
  return `${contentType}:${contentId}`;
}

interface FeedbackState {
  flags: Record<string, FeedbackReason>; // key: `${contentType}:${contentId}`

  getFlag: (contentType: ContentFeedbackType, contentId: string) => FeedbackReason | null;
  setFlag: (contentType: ContentFeedbackType, contentId: string, reason: FeedbackReason) => void;
  removeFlag: (contentType: ContentFeedbackType, contentId: string) => void;
  hydrateFlags: (items: UserFlagItem[]) => void;
}

export const useFeedbackStore = create<FeedbackState>()((set, get) => ({
  flags: {},

  getFlag: (contentType, contentId) => {
    return get().flags[flagKey(contentType, contentId)] ?? null;
  },

  setFlag: (contentType, contentId, reason) => {
    set((state) => ({
      flags: { ...state.flags, [flagKey(contentType, contentId)]: reason },
    }));
  },

  removeFlag: (contentType, contentId) => {
    set((state) => {
      const next = { ...state.flags };
      delete next[flagKey(contentType, contentId)];
      return { flags: next };
    });
  },

  hydrateFlags: (items) => {
    const flags: Record<string, FeedbackReason> = {};
    for (const item of items) {
      flags[flagKey(item.contentType, item.contentId)] = item.reason;
    }
    set({ flags });
  },
}));
```

- [ ] **Step 2: Verify compile**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/store/useFeedbackStore.ts
git commit -m "feat(feedback): create useFeedbackStore Zustand store"
```

---

### Task 4: Create user-facing API route

**Files:**
- Create: `src/app/api/content-feedback/route.ts`

Reference patterns from: `src/app/api/progress/route.ts` (auth pattern, Drizzle query pattern).

- [ ] **Step 1: Create `src/app/api/content-feedback/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db';
import { contentFeedback } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { VALID_CONTENT_TYPES, VALID_REASONS } from '@/data/types';
import type { ContentFeedbackType, FeedbackReason } from '@/data/types';

// GET /api/content-feedback — fetch all flags for the authenticated user
export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = await db
    .select({
      contentType: contentFeedback.contentType,
      contentId: contentFeedback.contentId,
      reason: contentFeedback.reason,
    })
    .from(contentFeedback)
    .where(eq(contentFeedback.userId, userId));

  return NextResponse.json({ flags: rows });
}

// POST /api/content-feedback — upsert a flag
export async function POST(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { contentType, contentId, reason } = body;

  // Validate
  if (!VALID_CONTENT_TYPES.includes(contentType as ContentFeedbackType)) {
    return NextResponse.json({ error: 'Invalid contentType' }, { status: 400 });
  }
  if (!VALID_REASONS.includes(reason as FeedbackReason)) {
    return NextResponse.json({ error: 'Invalid reason' }, { status: 400 });
  }
  if (!contentId || typeof contentId !== 'string' || contentId.length > 50) {
    return NextResponse.json({ error: 'Invalid contentId' }, { status: 400 });
  }

  // Upsert: delete existing + insert (Drizzle doesn't have onConflictDoUpdate for all adapters)
  await db.transaction(async (tx) => {
    await tx
      .delete(contentFeedback)
      .where(
        and(
          eq(contentFeedback.userId, userId),
          eq(contentFeedback.contentType, contentType),
          eq(contentFeedback.contentId, contentId)
        )
      );
    await tx.insert(contentFeedback).values({
      userId,
      contentType,
      contentId,
      reason,
    });
  });

  return NextResponse.json({ ok: true });
}

// DELETE /api/content-feedback — remove a flag (idempotent)
export async function DELETE(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { contentType, contentId } = body;

  await db
    .delete(contentFeedback)
    .where(
      and(
        eq(contentFeedback.userId, userId),
        eq(contentFeedback.contentType, contentType),
        eq(contentFeedback.contentId, contentId)
      )
    );

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Verify compile**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/content-feedback/route.ts
git commit -m "feat(feedback): add user-facing content-feedback API (GET, POST, DELETE)"
```

---

### Task 5: Create admin API routes

**Files:**
- Create: `src/app/api/admin/content-feedback/route.ts`
- Create: `src/app/api/admin/content-feedback/dismiss/route.ts`

- [ ] **Step 1: Create `src/app/api/admin/content-feedback/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { contentFeedback, contentFeedbackDismissals } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { allQuestions, getQuestionById } from '@/data/questions';
import { course } from '@/data/course';
import type { ContentFeedbackType, FeedbackReason } from '@/data/types';

const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

function getCourseQuestionText(contentId: string): string | null {
  for (const unit of course) {
    for (const lesson of unit.lessons) {
      const q = lesson.questions.find((q) => q.id === contentId);
      if (q) return q.question;
    }
  }
  return null;
}

function getQuestionText(contentType: string, contentId: string): string {
  if (contentType === 'question') {
    const q = getQuestionById(contentId);
    return q ? q.question.slice(0, 80) : `[Unknown: ${contentId}]`;
  }
  const text = getCourseQuestionText(contentId);
  return text ? text.slice(0, 80) : `[Unknown: ${contentId}]`;
}

export async function GET(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const includeDismissed = req.nextUrl.searchParams.get('includeDismissed') === 'true';

  // Aggregate flags grouped by (contentType, contentId)
  const rows = await db
    .select({
      contentType: contentFeedback.contentType,
      contentId: contentFeedback.contentId,
      reason: contentFeedback.reason,
      createdAt: contentFeedback.createdAt,
    })
    .from(contentFeedback);

  // Get all dismissals
  const dismissals = await db
    .select()
    .from(contentFeedbackDismissals);

  const dismissalMap = new Map(
    dismissals.map((d) => [`${d.contentType}:${d.contentId}`, d.dismissedAt])
  );

  // Aggregate
  const grouped = new Map<string, {
    contentType: string;
    contentId: string;
    totalFlags: number;
    reasons: Record<string, number>;
    latestFlagAt: Date | null;
  }>();

  for (const row of rows) {
    const key = `${row.contentType}:${row.contentId}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        contentType: row.contentType,
        contentId: row.contentId,
        totalFlags: 0,
        reasons: { confusing: 0, incorrect: 0, 'too-easy': 0, 'too-hard': 0 },
        latestFlagAt: null,
      });
    }
    const g = grouped.get(key)!;
    g.totalFlags++;
    g.reasons[row.reason] = (g.reasons[row.reason] || 0) + 1;
    if (!g.latestFlagAt || (row.createdAt && row.createdAt > g.latestFlagAt)) {
      g.latestFlagAt = row.createdAt;
    }
  }

  // Build result, filtering dismissed if needed
  const items = [];
  for (const [key, g] of grouped) {
    const dismissedAt = dismissalMap.get(key) ?? null;

    // If not including dismissed, skip items where dismissal is newer than all flags
    if (!includeDismissed && dismissedAt && g.latestFlagAt && dismissedAt >= g.latestFlagAt) {
      continue;
    }

    items.push({
      contentId: g.contentId,
      contentType: g.contentType as ContentFeedbackType,
      questionText: getQuestionText(g.contentType, g.contentId),
      totalFlags: g.totalFlags,
      reasons: g.reasons as Record<FeedbackReason, number>,
      dismissedAt: dismissedAt?.toISOString() ?? null,
    });
  }

  // Sort by totalFlags descending
  items.sort((a, b) => b.totalFlags - a.totalFlags);

  return NextResponse.json({ items });
}
```

- [ ] **Step 2: Create `src/app/api/admin/content-feedback/dismiss/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db';
import { contentFeedbackDismissals } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';

const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

export async function POST(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { contentType, contentId } = await req.json();

  // Upsert: delete + insert
  await db.transaction(async (tx) => {
    await tx
      .delete(contentFeedbackDismissals)
      .where(
        and(
          eq(contentFeedbackDismissals.contentType, contentType),
          eq(contentFeedbackDismissals.contentId, contentId)
        )
      );
    await tx.insert(contentFeedbackDismissals).values({
      contentType,
      contentId,
    });
  });

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Add `ADMIN_USER_ID` to `.env.local`**

Add this line to `.env.local` (the value is your own user ID from the `users` table):

```
ADMIN_USER_ID=your-user-id-here
```

- [ ] **Step 4: Verify compile**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/admin/content-feedback/route.ts src/app/api/admin/content-feedback/dismiss/route.ts
git commit -m "feat(feedback): add admin API routes for aggregated flags and dismiss"
```

---

### Task 6: Integrate feedback fetch into useDbSync

**Files:**
- Modify: `src/hooks/useDbSync.ts:24-27` (add to Promise.all)
- Modify: `src/hooks/useDbSync.ts:6` (add import)

- [ ] **Step 1: Add feedback store import**

At `src/hooks/useDbSync.ts:6`, add:

```typescript
import { useFeedbackStore } from '@/store/useFeedbackStore';
```

- [ ] **Step 2: Add feedback fetch to `Promise.all`**

Change the `Promise.all` call at line 24 from:

```typescript
const [progressRes, courseRes] = await Promise.all([
  fetch('/api/progress'),
  fetch('/api/course-progress'),
]);
```

To:

```typescript
const [progressRes, courseRes, feedbackRes] = await Promise.all([
  fetch('/api/progress'),
  fetch('/api/course-progress'),
  fetch('/api/content-feedback'),
]);
```

- [ ] **Step 3: Hydrate feedback store**

After the `courseRes` block (after line 43), add:

```typescript
if (feedbackRes.ok) {
  const data = await feedbackRes.json();
  if (data.flags) {
    useFeedbackStore.getState().hydrateFlags(data.flags);
  }
}
```

- [ ] **Step 4: Verify compile**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useDbSync.ts
git commit -m "feat(feedback): hydrate feedback store on app load via useDbSync"
```

---

### Task 7: Create FlagButton component

**Files:**
- Create: `src/components/feedback/FlagButton.tsx`

- [ ] **Step 1: Create `src/components/feedback/FlagButton.tsx`**

```tsx
'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Check, X } from 'lucide-react';
import { useFeedbackStore } from '@/store/useFeedbackStore';
import type { ContentFeedbackType, FeedbackReason } from '@/data/types';
import { VALID_REASONS } from '@/data/types';

const REASON_LABELS: Record<FeedbackReason, string> = {
  confusing: 'Confusing',
  incorrect: 'Incorrect',
  'too-easy': 'Too Easy',
  'too-hard': 'Too Hard',
};

interface Props {
  contentType: ContentFeedbackType;
  contentId: string;
}

export default function FlagButton({ contentType, contentId }: Props) {
  const existingReason = useFeedbackStore((s) => s.getFlag(contentType, contentId));
  const setStoreFlag = useFeedbackStore((s) => s.setFlag);
  const removeStoreFlag = useFeedbackStore((s) => s.removeFlag);

  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFlagClick = useCallback(() => {
    if (existingReason) {
      // Already flagged — show remove option
      setExpanded((prev) => !prev);
    } else {
      setExpanded((prev) => !prev);
    }
  }, [existingReason]);

  const handleSelectReason = useCallback(
    async (reason: FeedbackReason) => {
      setSubmitting(true);
      // Optimistic update
      setStoreFlag(contentType, contentId, reason);
      setShowConfirm(true);
      setExpanded(false);

      try {
        await fetch('/api/content-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contentType, contentId, reason }),
        });
      } catch {
        // Revert on failure
        removeStoreFlag(contentType, contentId);
      } finally {
        setSubmitting(false);
        setTimeout(() => setShowConfirm(false), 1500);
      }
    },
    [contentType, contentId, setStoreFlag, removeStoreFlag]
  );

  const handleRemoveFlag = useCallback(async () => {
    setSubmitting(true);
    // Optimistic
    removeStoreFlag(contentType, contentId);
    setExpanded(false);

    try {
      await fetch('/api/content-feedback', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType, contentId }),
      });
    } catch {
      // Can't easily revert without knowing the old reason — silently fail
    } finally {
      setSubmitting(false);
    }
  }, [contentType, contentId, removeStoreFlag]);

  const isFlagged = !!existingReason;

  return (
    <div className="flex items-center justify-end gap-2" style={{ minHeight: 32 }}>
      <AnimatePresence mode="wait">
        {showConfirm && (
          <motion.span
            key="confirm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ fontSize: 12, fontWeight: 700, color: '#58A700' }}
            className="flex items-center gap-1"
          >
            <Check className="w-3 h-3" /> Flagged
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
          <motion.div
            key="chips"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-1 overflow-hidden"
          >
            {isFlagged ? (
              <button
                onClick={handleRemoveFlag}
                disabled={submitting}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 12,
                  border: '1.5px solid #FF4B4B',
                  background: '#FFF0F0',
                  color: '#EA2B2B',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Remove flag
              </button>
            ) : (
              VALID_REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => handleSelectReason(reason)}
                  disabled={submitting}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 12,
                    border: '1.5px solid #E5E5E5',
                    background: '#F5F5F5',
                    color: '#3C3C3C',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                  className="transition-colors hover:border-[#AFAFAF] hover:bg-[#EBEBEB]"
                >
                  {REASON_LABELS[reason]}
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleFlagClick}
        disabled={submitting}
        aria-label={`Flag content ${contentId}`}
        className="flex items-center justify-center transition-transform active:scale-90"
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          border: 'none',
          background: isFlagged ? '#FFF0F0' : 'transparent',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <Flag
          className="w-4 h-4"
          style={{ color: isFlagged ? '#EA2B2B' : '#AFAFAF' }}
          fill={isFlagged ? '#EA2B2B' : 'none'}
        />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Verify compile**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/feedback/FlagButton.tsx
git commit -m "feat(feedback): create FlagButton component with reason chips and optimistic updates"
```

---

### Task 8: Integrate FlagButton into FeedbackPanel

**Files:**
- Modify: `src/components/feedback/FeedbackPanel.tsx:1-88`

- [ ] **Step 1: Add import**

At `src/components/feedback/FeedbackPanel.tsx:5`, add after the existing lucide import line:

```typescript
import FlagButton from './FlagButton';
```

- [ ] **Step 2: Add FlagButton above the Continue button**

At `src/components/feedback/FeedbackPanel.tsx:80-85`, change:

```tsx
      </div>

      {/* Next Button */}
      <button onClick={onNext} className="btn-primary w-full" autoFocus>
        Continue <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
```

To:

```tsx
      </div>

      {/* Flag Button */}
      <FlagButton contentType="question" contentId={question.id} />

      {/* Next Button */}
      <button onClick={onNext} className="btn-primary w-full" autoFocus>
        Continue <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
```

- [ ] **Step 3: Verify compile**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/feedback/FeedbackPanel.tsx
git commit -m "feat(feedback): integrate FlagButton into FeedbackPanel"
```

---

### Task 9: Integrate FlagButton into LessonView

**Files:**
- Modify: `src/components/lesson/LessonView.tsx:1-13` (imports), `src/components/lesson/LessonView.tsx:371-409` (feedback bar)

- [ ] **Step 1: Add import**

At `src/components/lesson/LessonView.tsx:12`, add after the `ResultScreen` import:

```typescript
import FlagButton from '@/components/feedback/FlagButton';
```

- [ ] **Step 2: Add FlagButton to the post-answer feedback bar**

In `src/components/lesson/LessonView.tsx`, find the feedback bar section (around line 371-409). Inside the `<motion.div key="feedback">`, after the explanation paragraph and before the Continue/Finish button, add the FlagButton.

Change lines 395-409 from:

```tsx
              {currentQuestion.explanation && (
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: lastAnswerCorrect ? '#58A700' : '#EA2B2B',
                    opacity: 0.75,
                    margin: '4px 0 0',
                    lineHeight: 1.4,
                  }}
                >
                  {currentQuestion.explanation}
                </p>
              )}
            </div>
```

To:

```tsx
              {currentQuestion.explanation && (
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: lastAnswerCorrect ? '#58A700' : '#EA2B2B',
                    opacity: 0.75,
                    margin: '4px 0 0',
                    lineHeight: 1.4,
                  }}
                >
                  {currentQuestion.explanation}
                </p>
              )}
              <FlagButton contentType="lesson-question" contentId={currentQuestion.id} />
            </div>
```

- [ ] **Step 3: Verify compile**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/lesson/LessonView.tsx
git commit -m "feat(feedback): integrate FlagButton into LessonView feedback bar"
```

---

### Task 10: Create admin feedback dashboard page

**Files:**
- Create: `src/app/admin/feedback/page.tsx`

Note: This page is outside the `(app)` route group — it does NOT use the 480px max-width layout. It has its own auth check.

- [ ] **Step 1: Create `src/app/admin/feedback/page.tsx`**

```tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import type { ContentFeedbackType, FeedbackReason } from '@/data/types';

interface FlaggedItem {
  contentId: string;
  contentType: ContentFeedbackType;
  questionText: string;
  totalFlags: number;
  reasons: Record<FeedbackReason, number>;
  dismissedAt: string | null;
}

const REASON_LABELS: Record<FeedbackReason, string> = {
  confusing: 'Confusing',
  incorrect: 'Incorrect',
  'too-easy': 'Too Easy',
  'too-hard': 'Too Hard',
};

export default function AdminFeedbackPage() {
  const { status } = useSession();
  const [items, setItems] = useState<FlaggedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDismissed, setShowDismissed] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/content-feedback?includeDismissed=${showDismissed}`
      );
      if (!res.ok) {
        setError(res.status === 403 ? 'Access denied' : 'Failed to load');
        return;
      }
      const data = await res.json();
      setItems(data.items);
    } catch {
      setError('Failed to load');
    } finally {
      setLoading(false);
    }
  }, [showDismissed]);

  useEffect(() => {
    if (status === 'authenticated') fetchData();
  }, [status, fetchData]);

  const handleDismiss = async (contentType: string, contentId: string) => {
    await fetch('/api/admin/content-feedback/dismiss', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentType, contentId }),
    });
    fetchData();
  };

  if (status === 'loading') return <p style={{ padding: 40 }}>Loading...</p>;
  if (status !== 'authenticated') return <p style={{ padding: 40 }}>Not authenticated</p>;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Content Feedback</h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
        Flagged questions sorted by total flags. Review and dismiss after fixing.
      </p>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 14, cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={showDismissed}
          onChange={(e) => setShowDismissed(e.target.checked)}
        />
        Show dismissed items
      </label>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p style={{ color: '#999', fontSize: 14 }}>No flagged content yet.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px', fontWeight: 700 }}>ID</th>
              <th style={{ padding: '8px 12px', fontWeight: 700 }}>Type</th>
              <th style={{ padding: '8px 12px', fontWeight: 700 }}>Question</th>
              <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'center' }}>Flags</th>
              <th style={{ padding: '8px 12px', fontWeight: 700 }}>Reasons</th>
              <th style={{ padding: '8px 12px', fontWeight: 700 }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const key = `${item.contentType}:${item.contentId}`;
              const isExpanded = expandedId === key;
              return (
                <tr
                  key={key}
                  onClick={() => setExpandedId(isExpanded ? null : key)}
                  style={{
                    borderBottom: '1px solid #F0F0F0',
                    cursor: 'pointer',
                    background: item.dismissedAt ? '#FAFAFA' : 'white',
                    opacity: item.dismissedAt ? 0.6 : 1,
                  }}
                >
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 12 }}>
                    {item.contentId}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 6,
                        background: item.contentType === 'question' ? '#E8F5E9' : '#E3F2FD',
                        color: item.contentType === 'question' ? '#2E7D32' : '#1565C0',
                      }}
                    >
                      {item.contentType === 'question' ? 'Practice' : 'Lesson'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', maxWidth: 300 }}>
                    {isExpanded ? item.questionText : item.questionText.slice(0, 60) + (item.questionText.length > 60 ? '...' : '')}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800, fontSize: 16 }}>
                    {item.totalFlags}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {(Object.entries(item.reasons) as [FeedbackReason, number][])
                        .filter(([, count]) => count > 0)
                        .map(([reason, count]) => (
                          <span
                            key={reason}
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 6,
                              background: '#F5F5F5',
                              color: '#666',
                            }}
                          >
                            {REASON_LABELS[reason]} ({count})
                          </span>
                        ))}
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    {!item.dismissedAt && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismiss(item.contentType, item.contentId);
                        }}
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          padding: '6px 14px',
                          borderRadius: 8,
                          border: '1.5px solid #E5E5E5',
                          background: 'white',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Dismiss
                      </button>
                    )}
                    {item.dismissedAt && (
                      <span style={{ fontSize: 11, color: '#999' }}>Dismissed</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify compile**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/admin/feedback/page.tsx
git commit -m "feat(feedback): create admin feedback dashboard page"
```

---

### Task 11: End-to-end verification

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: App starts without errors.

- [ ] **Step 2: Test the flag flow in practice mode**

1. Log in and start a practice session
2. Answer a question
3. On the feedback screen, verify the flag icon appears (gray, outline)
4. Tap the flag icon — verify 4 reason chips expand
5. Tap "Confusing" — verify checkmark confirmation appears
6. Verify the flag icon is now red/filled
7. Tap the flag icon again — verify "Remove flag" option appears
8. Tap "Remove flag" — verify it reverts to gray outline

- [ ] **Step 3: Test the flag flow in lesson mode**

1. Start a course lesson
2. Answer a question
3. On the green/red feedback bar, verify the flag icon appears
4. Tap and flag with any reason — verify it works

- [ ] **Step 4: Test the admin page**

1. Set your `ADMIN_USER_ID` in `.env.local` to your user ID
2. Visit `/admin/feedback`
3. Verify flagged items appear in the table
4. Click a row to expand full question text
5. Click "Dismiss" — verify the item disappears (or shows as dismissed with toggle on)
6. Toggle "Show dismissed items" — verify dismissed items reappear

- [ ] **Step 5: Test persistence**

1. Flag a question
2. Refresh the page
3. Navigate back to the same question
4. Verify the flag icon is still red/filled (hydrated from DB)

- [ ] **Step 6: Final commit**

If any fixes were needed during testing, commit them:

```bash
git add -A
git commit -m "fix(feedback): address issues found during end-to-end testing"
```
