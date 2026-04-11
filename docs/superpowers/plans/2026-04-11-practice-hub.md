# Practice Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 6 fragmented practice pages with a unified Practice Hub powered by the existing smart algorithm, with wrong-answer recycling and Duolingo-style dark card UI.

**Architecture:** Wire `selectSmartPracticeQuestions` into the store's session flow for `smart-practice` type. Add wrong-answer recycling to `answerQuestion`. Build a new `/practice` hub page with dark theme. Add mistakes tracking to the engagement store. Gate Mistakes and Review behind Pro. Uncomment the Practice nav tab.

**Tech Stack:** Next.js App Router, Zustand 5, React 19, Tailwind CSS 4, Vitest

---

### Task 1: Wire smart algorithm into session question selection

Replace the random shuffle-and-slice with the real smart algorithm for `smart-practice` sessions.

**Files:**
- Modify: `src/store/useStore.ts` (the `selectQuestionsForSession` function, ~line 152)

- [ ] **Step 1: Import the smart algorithm and performance builder**

At the top of `src/store/useStore.ts`, add after the existing imports:

```ts
import { selectSmartPracticeQuestions, buildPerformance } from '@/lib/practice-algorithm';
```

- [ ] **Step 2: Replace the `smart-practice` case in `selectQuestionsForSession`**

In `selectQuestionsForSession` (~line 152), find the `case 'smart-practice':` block (around line 187):

```ts
    case 'smart-practice':
      count = 10;
      break;
```

Replace with:

```ts
    case 'smart-practice': {
      const state = useStore.getState();
      const performance = buildPerformance(state.progress.topicProgress, state.progress.sessionHistory);
      const selected = selectSmartPracticeQuestions([], pool, performance, {
        topicId: options?.topicId,
        count: 10,
      });
      if (selected.length > 0) {
        return selected.map(s => s.question as PracticeQuestion);
      }
      count = 10;
      break;
    }
```

The first argument `[]` is the legacy practice questions array (empty since we only use course questions now). The `pool` variable is already populated by `gatherCourseQuestions()` earlier in the function. If the smart algorithm returns results, use them directly. Otherwise fall through to the random shuffle below.

- [ ] **Step 3: Run tests**

```bash
npx vitest run src/__tests__/store/useStore.test.ts --reporter=verbose
```

Expected: All pass.

- [ ] **Step 4: Commit**

```bash
git add src/store/useStore.ts
git commit -m "feat: wire smart practice algorithm into session question selection"
```

---

### Task 2: Add wrong-answer recycling to practice sessions

When a user answers incorrectly in a `smart-practice` session, re-insert the question 2-4 positions later. Track retry count on the session.

**Files:**
- Modify: `src/store/useStore.ts` (ActiveSession interface ~line 33, answerQuestion action ~line 561)

- [ ] **Step 1: Add `retryCount` to `ActiveSession`**

In `src/store/useStore.ts`, find the `ActiveSession` interface (line 33). Add a new field after `timeLimit`:

```ts
export interface ActiveSession {
  type: SessionType;
  topicId?: TopicId;
  difficulty?: Difficulty;
  questions: PracticeQuestion[];
  currentIndex: number;
  answers: Record<string, { correct: boolean; confidence?: number; timeSpent: number; xpAwarded: number }>;
  startTime: number;
  isTimed: boolean;
  timeLimit?: number;
  retryCount: number;
}
```

- [ ] **Step 2: Initialize `retryCount: 0` in `startSession`**

Find where `startSession` sets the session state (~line 524). It sets `{ type, questions, currentIndex: 0, answers: {}, ... }`. Add `retryCount: 0` to both the sync and async paths.

Search for `currentIndex: 0` in the `startSession` action and add `retryCount: 0` next to it. There should be two occurrences (async path ~line 510 and sync path ~line 527).

- [ ] **Step 3: Add recycling logic to `answerQuestion`**

In the `answerQuestion` action (~line 561), after the existing `set(state => ({ ... }))` call that updates `session.answers` and `progress`, add the recycling logic:

Find the end of the `set(state => ({` block in `answerQuestion` (the closing `}));`). After it, add:

```ts
      // Wrong-answer recycling for practice sessions
      if (!correct && session.type === 'smart-practice') {
        set(state => {
          if (!state.session) return {};
          const questions = [...state.session.questions];
          const insertOffset = 2 + Math.floor(Math.random() * 3); // 2-4 positions later
          const insertAt = Math.min(state.session.currentIndex + insertOffset, questions.length);
          questions.splice(insertAt, 0, question);
          return {
            session: {
              ...state.session,
              questions,
              retryCount: state.session.retryCount + 1,
            },
          };
        });
      }
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/__tests__/store/useStore.test.ts --reporter=verbose
```

Expected: All pass. Some tests may need `retryCount: 0` added to mock session objects if they assert on the full shape.

- [ ] **Step 5: Commit**

```bash
git add src/store/useStore.ts
git commit -m "feat: add wrong-answer recycling for smart practice sessions"
```

---

### Task 3: Add mistakes tracking to engagement store

Track question IDs the user gets wrong across all sessions. Cap at 50 entries.

**Files:**
- Modify: `src/data/engagement-types.ts` (EngagementState interface, ~line 264)
- Modify: `src/store/useEngagementStore.ts` (default state, actions, persistence merge)

- [ ] **Step 1: Add `mistakeQuestionIds` to `EngagementState`**

In `src/data/engagement-types.ts`, add a new field to `EngagementState` (before the closing `}`):

```ts
  /** Question IDs the user got wrong recently (max 50). Cleared per-question when practiced in a Mistakes session. */
  mistakeQuestionIds: string[];
```

- [ ] **Step 2: Add default state and action in the engagement store**

In `src/store/useEngagementStore.ts`, find `getDefaultState()` (~line 124). Add `mistakeQuestionIds: [],` inside the returned object.

Then find the `EngagementActions` type definition. Add two new actions:

```ts
  addMistake: (questionId: string) => void;
  removeMistakes: (questionIds: string[]) => void;
```

Implement them in the store's action object (inside the `create` call):

```ts
        addMistake: (questionId) => {
          set(state => {
            const ids = state.mistakeQuestionIds;
            if (ids.includes(questionId)) return {};
            const updated = [questionId, ...ids].slice(0, 50);
            return { mistakeQuestionIds: updated };
          });
        },

        removeMistakes: (questionIds) => {
          set(state => ({
            mistakeQuestionIds: state.mistakeQuestionIds.filter(id => !questionIds.includes(id)),
          }));
        },
```

- [ ] **Step 3: Add persistence merge for the new field**

In the `persist` middleware's `merge` function (~line 1085), find where other fields are merged. Add:

```ts
            mistakeQuestionIds: persisted.mistakeQuestionIds ?? defaults.mistakeQuestionIds,
```

- [ ] **Step 4: Wire mistake tracking into `answerQuestion` in `useStore`**

In `src/store/useStore.ts`, in the `answerQuestion` action, after the wrong-answer recycling block added in Task 2, add:

```ts
      // Track mistakes globally
      if (!correct) {
        useEngagementStore.getState().addMistake(questionId);
      }
```

Make sure `useEngagementStore` is imported at the top of `useStore.ts` (it likely already is for `updateLeagueXp`).

- [ ] **Step 5: Add a selector hook**

In `src/store/useEngagementStore.ts`, near the other selector hooks at the bottom (~line 1140), add:

```ts
export const useMistakeQuestionIds = () => useEngagementStore((s) => s.mistakeQuestionIds);
```

- [ ] **Step 6: Commit**

```bash
git add src/data/engagement-types.ts src/store/useEngagementStore.ts src/store/useStore.ts
git commit -m "feat: add mistakes tracking to engagement store"
```

---

### Task 4: Add Pro gating features for Mistakes and Review

Add new feature constants for gating Mistakes and Review behind Pro.

**Files:**
- Modify: `src/lib/pricing.ts` (~line 18)

- [ ] **Step 1: Add feature constants**

In `src/lib/pricing.ts`, add to the `FEATURES` object (before the closing `} as const`):

```ts
  PRACTICE_MISTAKES: 'practice_mistakes',
  PRACTICE_REVIEW: 'practice_review',
```

- [ ] **Step 2: Add to the Pro access map**

Find where features are mapped to tiers. Search for `canAccess` or the feature-to-tier mapping. Add `practice_mistakes` and `practice_review` to the list of Pro-only features. Read the file fully to find the exact location.

- [ ] **Step 3: Commit**

```bash
git add src/lib/pricing.ts
git commit -m "feat: add Pro gating for Mistakes and Review practice modes"
```

---

### Task 5: Build the Practice Hub page

Create the new `/practice` page with Duolingo-style dark theme, featured Smart Practice card, and collection cards.

**Files:**
- Create: `src/app/(app)/practice/page.tsx`

- [ ] **Step 1: Create the Practice Hub page**

Create `src/app/(app)/practice/page.tsx`:

```tsx
'use client';

import { useRouter } from 'next/navigation';
import { useSessionActions, useSession as useAppSession } from '@/store/useStore';
import { useMistakeQuestionIds } from '@/store/useEngagementStore';
import { useSubscription } from '@/store/useSubscriptionStore';
import { SessionView } from '@/components/session/SessionView';
import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { UpgradeModal } from '@/components/ui/UpgradeModal';

export default function PracticePage() {
  const router = useRouter();
  const { session, sessionSummary } = useAppSession();
  const { startSession } = useSessionActions();
  const mistakeIds = useMistakeQuestionIds();
  const { canAccess } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  // If a session is active or summary is showing, render SessionView
  if (session || sessionSummary) {
    return <SessionView />;
  }

  function handleStartPractice() {
    setLoading(true);
    startSession('smart-practice');
  }

  function handleMistakes() {
    if (!canAccess('practice_mistakes')) {
      setShowUpgrade(true);
      return;
    }
    // Start a practice session with the mistake questions
    startSession('smart-practice');
  }

  function handleReview() {
    if (!canAccess('practice_review')) {
      setShowUpgrade(true);
      return;
    }
    router.push('/practice/review');
  }

  function handleDaily() {
    router.push('/practice/daily');
  }

  return (
    <div className="min-h-screen" style={{ background: '#131F24' }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-1">
        <h1 className="text-[22px] font-extrabold text-white">Practice</h1>
      </div>

      <div className="px-4 pb-24">
        {/* TODAY'S PRACTICE */}
        <p className="text-xs font-extrabold text-[#8BA0A8] uppercase tracking-wider px-1 pt-5 pb-3">
          Today&apos;s Practice
        </p>

        {/* Featured Smart Practice Card */}
        <button
          onClick={handleStartPractice}
          disabled={loading}
          className="w-full text-left rounded-2xl p-6 relative overflow-hidden border-2 border-[rgba(108,99,255,0.3)] mb-4"
          style={{ background: 'linear-gradient(135deg, #1a1a3e 0%, #2d1b4e 40%, #3b1d5e 100%)' }}
        >
          <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full" style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)' }} />
          <span className="inline-block text-[11px] font-extrabold text-[#6C63FF] bg-[rgba(108,99,255,0.2)] px-2.5 py-1 rounded-md mb-3 tracking-wide">
            PERSONALIZED
          </span>
          <h2 className="text-2xl font-extrabold text-white mb-2">Smart Practice</h2>
          <p className="text-sm text-white/60 font-medium mb-5 max-w-[220px]">
            Questions picked just for you based on what you need most
          </p>
          <span className="inline-flex items-center gap-2 bg-[#6C63FF] text-white text-sm font-extrabold px-6 py-2.5 rounded-xl uppercase tracking-wide relative z-10"
                style={{ boxShadow: '0 4px 0 #4a3fd0' }}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Start'}
          </span>
          <div className="absolute right-4 bottom-4 w-[90px] h-[90px] rounded-2xl bg-[rgba(108,99,255,0.15)] flex items-center justify-center text-5xl">
            🧠
          </div>
        </button>

        {/* YOUR COLLECTIONS */}
        <p className="text-xs font-extrabold text-[#8BA0A8] uppercase tracking-wider px-1 pt-4 pb-3">
          Your collections
        </p>

        {/* Mistakes Card */}
        <button
          onClick={handleMistakes}
          className="w-full flex items-center gap-3.5 rounded-2xl border-2 border-[#2A3C42] p-4 mb-3 relative overflow-hidden text-left"
          style={{ background: '#1A2C32' }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #FF9600, #FF6B00)' }}>
            🔄
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
              Mistakes
              {!canAccess('practice_mistakes') && <Lock size={14} className="text-[#8BA0A8]" />}
            </h3>
            <p className="text-xs text-[#8BA0A8] font-medium mt-0.5">
              Practice the questions you got wrong recently
            </p>
          </div>
          {mistakeIds.length > 0 && (
            <span className="absolute top-3 right-3 bg-[#FF4B4B] text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">
              {mistakeIds.length}
            </span>
          )}
        </button>

        {/* Daily Challenge Card */}
        <button
          onClick={handleDaily}
          className="w-full flex items-center gap-3.5 rounded-2xl border-2 border-[#2A3C42] p-4 mb-3 text-left"
          style={{ background: '#1A2C32' }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #58CC02, #46A302)' }}>
            ⚡
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-extrabold text-white">Daily Challenge</h3>
            <p className="text-xs text-[#8BA0A8] font-medium mt-0.5">
              5 themed questions, new every day
            </p>
          </div>
        </button>

        {/* Review Card */}
        <button
          onClick={handleReview}
          className="w-full flex items-center gap-3.5 rounded-2xl border-2 border-[#2A3C42] p-4 mb-3 text-left"
          style={{ background: '#1A2C32' }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, #CE82FF, #A855F7)' }}>
            🔮
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
              Review
              {!canAccess('practice_review') && <Lock size={14} className="text-[#8BA0A8]" />}
            </h3>
            <p className="text-xs text-[#8BA0A8] font-medium mt-0.5">
              Revisit topics before you forget them
            </p>
          </div>
        </button>
      </div>

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors related to the practice page.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(app\)/practice/page.tsx
git commit -m "feat: build Practice Hub page with dark Duolingo-style UI"
```

---

### Task 6: Uncomment Practice tab in navigation

**Files:**
- Modify: `src/components/layout/MobileBottomNav.tsx` (~lines 13-14)
- Modify: `src/components/layout/DesktopSideNav.tsx` (~lines 16-17)

- [ ] **Step 1: Uncomment and update the Practice tab in MobileBottomNav**

In `src/components/layout/MobileBottomNav.tsx`, find the commented-out lines:

```ts
// Practice tab hidden until per-course practice is built
// { href: '/practice/topics', label: 'Practice', icon: BookOpen, activeColor: 'text-emerald-600', activeBg: 'bg-emerald-50', inactiveColor: 'text-slate-400' },
```

Replace with (uncommented, updated href):

```ts
{ href: '/practice', label: 'Practice', icon: BookOpen, activeColor: 'text-brand-600', activeBg: 'bg-brand-50', inactiveColor: 'text-slate-400' },
```

Also add `BookOpen` to the lucide-react import at the top of the file.

- [ ] **Step 2: Uncomment and update the Practice tab in DesktopSideNav**

In `src/components/layout/DesktopSideNav.tsx`, find the commented-out lines:

```ts
// Practice tab hidden until per-course practice is built
// { href: '/practice/topics', label: 'Practice', icon: BookOpen },
```

Replace with:

```ts
{ href: '/practice', label: 'Practice', icon: BookOpen },
```

Also add `BookOpen` to the lucide-react import at the top.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/MobileBottomNav.tsx src/components/layout/DesktopSideNav.tsx
git commit -m "feat: uncomment Practice tab in mobile and desktop navigation"
```

---

### Task 7: Delete old practice pages

Remove the 6 fragmented practice pages that are replaced by the hub.

**Files:**
- Delete: `src/app/(app)/practice/smart/page.tsx`
- Delete: `src/app/(app)/practice/adaptive/page.tsx`
- Delete: `src/app/(app)/practice/interview/page.tsx`
- Delete: `src/app/(app)/practice/weak-areas/page.tsx`
- Delete: `src/app/(app)/practice/real-world/page.tsx`
- Delete: `src/app/(app)/practice/topics/page.tsx`

- [ ] **Step 1: Delete the old pages**

```bash
rm -f src/app/\(app\)/practice/smart/page.tsx
rm -f src/app/\(app\)/practice/adaptive/page.tsx
rm -f src/app/\(app\)/practice/interview/page.tsx
rm -f src/app/\(app\)/practice/weak-areas/page.tsx
rm -f src/app/\(app\)/practice/real-world/page.tsx
rm -f src/app/\(app\)/practice/topics/page.tsx
```

- [ ] **Step 2: Remove empty directories**

```bash
rmdir src/app/\(app\)/practice/smart 2>/dev/null
rmdir src/app/\(app\)/practice/adaptive 2>/dev/null
rmdir src/app/\(app\)/practice/interview 2>/dev/null
rmdir src/app/\(app\)/practice/weak-areas 2>/dev/null
rmdir src/app/\(app\)/practice/real-world 2>/dev/null
rmdir src/app/\(app\)/practice/topics 2>/dev/null
```

- [ ] **Step 3: Check for broken imports**

```bash
npx tsc --noEmit 2>&1 | head -20
```

If any file imports from deleted pages, fix the import.

- [ ] **Step 4: Remove references to deleted session types from feature flags**

In `src/lib/feature-flags.ts`, find the practice-related flags (`practice.interview`, `practice.adaptive`, `practice.weak_areas`, `practice.real_world`). Remove them since those modes no longer exist. Keep `practice.daily` (Daily Challenge still exists).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove 6 old practice pages replaced by Practice Hub"
```

---

### Task 8: Run full test suite and typecheck

**Files:**
- All

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run full test suite**

```bash
npm test
```

Expected: All tests pass (except pre-existing failures in distractor-coverage).

- [ ] **Step 3: Fix any test failures related to our changes**

If tests reference deleted session types or the old `ActiveSession` shape without `retryCount`, update them.

- [ ] **Step 4: Commit any test fixes**

```bash
git add -A
git commit -m "test: fix tests for practice hub changes"
```
