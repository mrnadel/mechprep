# Gap 4: Mid-Session Difficulty Adaptation

## Overview & Current State

LessonView.tsx already has a **partial implementation** of adaptive difficulty. The following pieces exist today:

**Already implemented (lines 46-59 of LessonView.tsx):**
- Constants: `ROLLING_WINDOW = 5`, `STRUGGLING_THRESHOLD = 0.4`, `CRUISING_THRESHOLD = 1.0`, `CRUISING_XP_BONUS = 1.5`
- `getAdaptiveMode()` function that computes `'normal' | 'struggling' | 'cruising'` from a `boolean[]` of recent answers
- `recentAnswers` state (`useState<boolean[]>([])`) tracked in LessonView
- `adaptiveMode` derived via `useMemo` from `recentAnswers`
- `adaptiveSeed` ref that increments on mode transitions (for message variety)
- Cruising XP bonus applied in `handleAnswer` (line 441): `Math.round((isDoubleXp ? 20 : 10) * cruiseBonus)`
- `AdaptiveToast` component (`src/components/lesson/AdaptiveToast.tsx`) with spring animations, 3 struggling messages, 3 cruising messages, mascot poses

**Already integrated in the UI (line 981-983):**
- `AdaptiveToast` renders above the question card when `lastAnswerCorrect === null` (i.e., before the user answers the current question) and when the question is not a teaching card

**What is MISSING and needs to be built:**
1. The cruising XP bonus is applied to the _local_ `xpGain` state but NOT to the store-level `completeLesson()` XP calculation. The local `xpGain` state is **unused** (set but never read) -- it is a dead variable. The actual XP for the lesson is computed in `useCourseStore.completeLesson()` which knows nothing about adaptive mode.
2. No sound effects on mode transitions
3. Teaching cards incorrectly count toward `recentAnswers` (the `handleTeachingGotIt` callback does NOT call `handleAnswer`, so teaching cards do NOT push to `recentAnswers` -- this is actually correct behavior by accident, but it should be explicitly documented and tested)
4. Non-standard lesson types (conversation, speed-round, timeline, case-study) do not participate in adaptive tracking at all -- they use `handleTypeAnswer` which does not update `recentAnswers`
5. No visual indicator of current mode beyond the toast (e.g., progress bar glow, streak counter)
6. The adapter (practice mode via `SessionAdapter`) does not benefit from cruising XP bonus in its store-level calculations
7. No persistence of adaptive stats for analytics

---

## Design Principles

- **Non-disruptive:** The existing AdaptiveToast is already well-designed. Extend rather than replace it.
- **Store-authoritative XP:** The cruising XP bonus must flow through to `completeLesson()` in the store, not just local state. This is the critical bug fix.
- **Backward compatible:** All changes must work with the existing `SessionAdapter` pattern for practice mode.
- **No question reordering:** Course lessons have pre-selected question pools. We cannot swap in harder/easier questions mid-session because the pool is fixed at `startLesson()`. Adaptation is limited to: (a) XP bonuses, (b) encouraging UI, (c) future: hint visibility.
- **Stacking rules explicit:** Document exactly how cruising bonus interacts with all other XP multipliers.

---

## Phase 1: Fix the Critical XP Bug

### Problem

The cruising XP bonus is applied in `LessonView.handleAnswer` to a local `xpGain` state variable that is **never consumed**. The real XP calculation happens in `useCourseStore.completeLesson()` (line 420-446) which computes XP purely from lesson `xpReward * accuracyMultiplier * totalBoostMultiplier`. The cruising bonus is silently discarded.

### Solution

Pass the adaptive mode's XP bonus information from LessonView into the store so `completeLesson()` can apply it. There are two approaches:

**Approach A (chosen): Store the bonus in `activeLesson` state.**

Add a `cruisingBonusQuestions` counter to the `ActiveLesson` type. Each time the user answers correctly while in cruising mode, increment this counter. `completeLesson()` reads it to compute a bonus.

**Approach B (rejected): Pass bonus XP as a parameter to completeLesson.**

This breaks the `SessionAdapter` interface and the existing call sites in handleContinue/handleTypeComplete.

### Changes

#### `src/data/course/types.ts` -- ActiveLesson type

Add one field to `ActiveLesson`:

```typescript
export interface ActiveLesson {
  // ... existing fields ...
  /** Count of questions answered correctly while in cruising mode (100% rolling accuracy). */
  cruisingCorrectCount?: number;
}
```

Use optional field with default 0 to avoid breaking existing serialized state in localStorage.

#### `src/store/useCourseStore.ts` -- submitAnswer action

Currently `submitAnswer` only appends to the answers array and optionally re-queues wrong answers. Add tracking for cruising bonus:

In the `submitAnswer` action, after the existing `return { activeLesson: { ... } }` block, add the `cruisingCorrectCount` field. This requires the caller to signal whether the answer was in cruising mode.

**Problem:** `submitAnswer` in the store does not know about adaptive mode. It receives `(questionId, correct)` and nothing else.

**Solution:** Add an optional third parameter `cruisingBonus?: boolean` to the store's `submitAnswer`. When true AND `correct === true`, increment `cruisingCorrectCount`.

```typescript
submitAnswer: (questionId: string, correct: boolean, cruisingBonus?: boolean) => {
  set((state) => {
    if (!state.activeLesson) return state;
    // ... existing logic ...
    const prevCruising = state.activeLesson.cruisingCorrectCount ?? 0;
    return {
      activeLesson: {
        ...state.activeLesson,
        answers: [ /* existing */ ],
        sessionQuestionIds: /* existing */,
        cruisingCorrectCount: (cruisingBonus && correct) ? prevCruising + 1 : prevCruising,
      },
    };
  });
},
```

#### `src/store/useCourseStore.ts` -- completeLesson action

In `completeLesson()`, after the existing `totalBoostMultiplier` calculation (line 443-446), apply the cruising bonus:

```typescript
// Cruising bonus: extra XP for questions answered correctly during a perfect streak
const cruisingCorrectCount = state.activeLesson.cruisingCorrectCount ?? 0;
const cruisingBonusXp = cruisingCorrectCount > 0
  ? Math.round(lesson.xpReward * (CRUISING_XP_BONUS - 1) * (cruisingCorrectCount / totalQuestions))
  : 0;
const xpEarned = lesson.xpReward * accuracyMultiplier * totalBoostMultiplier + cruisingBonusXp;
```

The formula: base XP is `xpReward * accuracyMultiplier * totalBoostMultiplier` as today. The cruising bonus adds a proportional top-up based on how many questions were answered correctly during cruising mode. This is additive (not multiplicative) with other boosts to prevent absurd stacking.

**Import the constant:** Add `CRUISING_XP_BONUS` to the imports from LessonView's constants. Actually, move the constant to `src/lib/game-config.ts` so both files can import it.

#### `src/lib/game-config.ts` -- New constants

Add:

```typescript
// --------------- Adaptive Difficulty ---------------

/** Number of recent answers to consider for rolling accuracy. */
export const ADAPTIVE_ROLLING_WINDOW = 5;
/** Rolling accuracy at or below this triggers struggling mode. */
export const ADAPTIVE_STRUGGLING_THRESHOLD = 0.4;
/** Rolling accuracy at or above this triggers cruising mode (must be perfect). */
export const ADAPTIVE_CRUISING_THRESHOLD = 1.0;
/** XP multiplier bonus per question answered correctly during cruising mode. */
export const ADAPTIVE_CRUISING_XP_BONUS = 1.5;
/** Minimum answers before adaptive mode kicks in. */
export const ADAPTIVE_MIN_ANSWERS = 3;
```

#### `src/components/lesson/LessonView.tsx` -- Update constants and handleAnswer

Replace the hardcoded constants at the top with imports from game-config:

```typescript
import {
  ADAPTIVE_ROLLING_WINDOW as ROLLING_WINDOW,
  ADAPTIVE_STRUGGLING_THRESHOLD as STRUGGLING_THRESHOLD,
  ADAPTIVE_CRUISING_THRESHOLD as CRUISING_THRESHOLD,
  ADAPTIVE_CRUISING_XP_BONUS as CRUISING_XP_BONUS,
  ADAPTIVE_MIN_ANSWERS,
} from '@/lib/game-config';
```

Update `getAdaptiveMode` to use `ADAPTIVE_MIN_ANSWERS` instead of the hardcoded `3`.

Update `handleAnswer` to pass the cruising flag to the store:

```typescript
// In handleAnswer, where _submitAnswer is called:
if (adapter) {
  adapter.submitAnswer(currentQuestion.id, correct);
} else {
  _submitAnswer(currentQuestion.id, correct, adaptiveMode === 'cruising' && correct);
  // ... mastery event tracking ...
}
```

Remove the unused `xpGain` state variable and all its `setXpGain` calls. This dead code is misleading.

#### `src/components/lesson/LessonView.tsx` -- SessionAdapter interface

The `SessionAdapter.submitAnswer` signature stays unchanged. Practice mode does not get cruising XP bonus in the store (practice mode calculates XP per-question in `useStore.answerQuestion`, which already has its own multiplier logic). If practice mode cruising bonus is desired later, it can be added to `useStore.answerQuestion` with a similar optional parameter.

#### `src/data/course/types.ts` -- CourseState interface

Update the `submitAnswer` signature in the `CourseState` interface:

```typescript
submitAnswer: (questionId: string, correct: boolean, cruisingBonus?: boolean) => void;
```

---

## Phase 2: XP Stacking Rules

All XP multipliers must stack predictably. Document the exact stacking formula:

### Current XP Multiplier Sources (lesson mode)

| Source | Multiplier | Condition | Where Applied |
|---|---|---|---|
| Accuracy stars | 1x / 2x / 3x | Based on session accuracy | `completeLesson()` |
| Flawless bonus | 4x (replaces stars) | 100% accuracy, >= 3 questions | `completeLesson()` |
| Shop double XP | 2x | Purchased from gem shop | `completeLesson()` |
| Weekend double XP | 2x | Saturday/Sunday, Pro only | `completeLesson()` via `getEventXpMultiplier` |
| Power hour | 1.5x | 7-9 PM local, everyone | `completeLesson()` via `getEventXpMultiplier` |
| League sprint | 1.25x | Last 24h of league week | `completeLesson()` via `getEventXpMultiplier` |
| **Cruising bonus** | **+50% of proportional base** | **5/5 correct rolling accuracy** | **`completeLesson()` (NEW)** |

### Stacking Rules

1. **Shop + Event boosts stack additively** with each other (existing behavior): `totalBoostMultiplier = 1 + (shop - 1) + (event - 1)`. Example: shop 2x + power hour 1.5x = 2.5x, not 3x.

2. **Cruising bonus stacks additively on top** of the already-multiplied base. It is NOT itself multiplied by shop/event boosts. This prevents a scenario where cruising + shop + weekend + power hour = absurd XP.

   Formula: `totalXp = (xpReward * accuracyMultiplier * totalBoostMultiplier) + cruisingBonusXp`

   Where: `cruisingBonusXp = xpReward * 0.5 * (cruisingCorrectCount / totalQuestions)`

3. **Maximum theoretical bonus:** If a user answers all 10 questions correctly while in cruising mode (possible if they get the first 5 correct to enter cruising, then stay in it): `cruisingBonusXp = xpReward * 0.5 * (5/10) = xpReward * 0.25` (since they can only be in cruising mode after the 5th answer, so at most 5 of 10 questions get the bonus). For a 10 XP lesson with flawless (4x) and no boosts: `10 * 4 + 10 * 0.5 * 0.5 = 40 + 2.5 = 43 XP`. This is a modest +6% bump that rewards consistency without inflating the economy.

4. **Cap:** No explicit cap needed. The proportional formula naturally limits the bonus.

---

## Phase 3: Sound Effects for Mode Transitions

### Changes to `src/components/lesson/LessonView.tsx`

Add a `useEffect` that watches `adaptiveMode` and plays a sound on transitions:

```typescript
const prevAdaptiveMode = useRef<AdaptiveMode>('normal');

useEffect(() => {
  if (adaptiveMode === prevAdaptiveMode.current) return;
  const prev = prevAdaptiveMode.current;
  prevAdaptiveMode.current = adaptiveMode;

  if (adaptiveMode === 'cruising') {
    playSound('streakMilestone'); // Reuse existing celebratory sound
  } else if (adaptiveMode === 'struggling' && prev === 'normal') {
    // No sound for entering struggling — avoid negative audio cues
  } else if (adaptiveMode === 'normal' && prev === 'cruising') {
    // Left cruising mode — no sound (streak broke, heartLost already plays)
  }
}, [adaptiveMode]);
```

Rationale: Only play a positive sound when entering cruising. Entering struggling should not have an audio cue (it would feel punishing). Leaving cruising already plays `heartLost` if the user got an answer wrong.

---

## Phase 4: Progress Bar Glow During Cruising

### Changes to `src/components/lesson/LessonProgressBar.tsx`

Add an optional `glowing` prop:

```typescript
interface LessonProgressBarProps {
  current: number;
  total: number;
  color: string;
  glowing?: boolean;
}
```

When `glowing` is true, add a CSS animation to the fill bar:

```typescript
style={{
  // ... existing styles ...
  boxShadow: glowing ? `0 0 8px ${color}80, 0 0 16px ${color}40` : undefined,
  animation: glowing ? 'pulse-glow 1.5s ease-in-out infinite' : undefined,
}}
```

Add the keyframe animation inline or via a CSS class in `globals.css`:

```css
@keyframes pulse-glow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
}
```

### Changes to `src/components/lesson/LessonView.tsx`

Pass the glowing prop:

```tsx
<LessonProgressBar
  current={resolvedAnsweredCount}
  total={resolvedTotalQuestions}
  color={isGolden ? '#FFB800' : unitColor}
  glowing={adaptiveMode === 'cruising'}
/>
```

---

## Phase 5: Non-Standard Lesson Type Integration

### Problem

Non-standard lesson types (conversation, speed-round, timeline, case-study) use `handleTypeAnswer` which does NOT update `recentAnswers`. This means adaptive mode never activates for these lesson types.

### Decision: Skip for Now

Non-standard lesson types have their own unique interaction models (branching dialogues, timed rounds, narrative choices). Adaptive difficulty does not map well to these formats:

- **Conversation:** Answers are "great/okay/poor" quality, not binary correct/incorrect
- **Speed-round:** Already has its own time-pressure mechanic
- **Timeline:** Branching narrative with cumulative consequences
- **Case-study:** Long-form narrative with sparse embedded checkpoints

**Resolution:** Leave non-standard lesson types out of adaptive tracking. The `AdaptiveToast` and cruising bonus are standard-lesson features only. This is already the implicit behavior since `handleTypeAnswer` never sets `recentAnswers`. Document this as intentional.

---

## Phase 6: Teaching Card Guard (Explicit Documentation)

### Current Behavior (Correct by Accident)

Teaching cards use `handleTeachingGotIt` (line 511-525), which calls `_submitAnswer(currentQuestion.id, true)` directly and then immediately advances. It does NOT call `handleAnswer`, so it does NOT push to `recentAnswers`. This means teaching cards do not inflate the rolling accuracy window.

### Action Required

Add an explicit code comment above `handleTeachingGotIt` documenting this intentional behavior:

```typescript
// Teaching cards auto-submit as correct but must NOT affect adaptive
// difficulty tracking (recentAnswers). This callback deliberately
// bypasses handleAnswer to avoid inflating the rolling accuracy window.
const handleTeachingGotIt = useCallback(() => {
  // ...
```

Also add a unit test (see Phase 9).

---

## Phase 7: AdaptiveToast Enhancements

The existing `AdaptiveToast` component is well-built. Minor improvements:

### 7.1 Expand Message Variants

Add more message variety to reduce repetition across long lessons:

```typescript
// In AdaptiveToast.tsx
const MESSAGES: Record<Exclude<AdaptiveMode, 'normal'>, { pose: MascotPose; text: string }[]> = {
  struggling: [
    { pose: 'excited', text: 'You got this! Take your time.' },
    { pose: 'torch', text: "Keep going, you're learning!" },
    { pose: 'winking', text: 'Mistakes help you grow!' },
    { pose: 'thinking', text: 'Almost there — think it through!' },
    { pose: 'proud', text: 'Every wrong answer teaches something!' },
  ],
  cruising: [
    { pose: 'on-fire', text: "You're on fire! Bonus XP!" },
    { pose: 'champion', text: 'Perfect streak! 1.5x XP!' },
    { pose: 'celebrating', text: 'Unstoppable! Bonus round!' },
    { pose: 'proud', text: 'Crushing it! Extra XP earned!' },
    { pose: 'explorer', text: 'Flawless run — keep it up!' },
  ],
};
```

All poses used (`excited`, `torch`, `winking`, `thinking`, `proud`, `on-fire`, `champion`, `celebrating`, `explorer`) are valid `MascotPose` values verified against the Mascot component's `MASCOT_POSES` registry.

### 7.2 Respect Reduced Motion

Wrap the spring animation in a reduced-motion check:

```typescript
import { useReducedMotion } from 'framer-motion';

export function AdaptiveToast({ mode, seed = 0 }: AdaptiveToastProps) {
  const reducedMotion = useReducedMotion();
  // ...

  <motion.div
    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.9 }}
    animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.9 }}
    transition={reducedMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 400, damping: 25 }}
    // ...
  >
```

### 7.3 Show XP Bonus Amount for Cruising

When in cruising mode, show the bonus amount instead of generic text. The per-question base is 10 XP (or 20 with double XP). Cruising adds 1.5x, so the bonus is +5 XP (or +10 with double XP).

This requires passing `isDoubleXp` to AdaptiveToast. Add an optional prop:

```typescript
interface AdaptiveToastProps {
  mode: AdaptiveMode;
  seed?: number;
  isDoubleXp?: boolean;
}
```

For cruising messages, append the bonus:

```typescript
const bonusText = isDoubleXp ? '+10 XP per Q' : '+5 XP per Q';
// In the cruising messages:
{ pose: 'on-fire', text: `You're on fire! ${bonusText}` },
```

---

## Phase 8: Interaction with MicroCelebration (Gap 13)

### Potential Overlap

If Gap 13 (MicroCelebration) is implemented, there is a risk of visual overlap between AdaptiveToast and MicroCelebration. Both render in the same area above the question card.

### Resolution

Add a guard in LessonView: when `adaptiveMode === 'cruising'`, suppress the streak-type MicroCelebration (both communicate "you're doing great"). The halfway and last-question MicroCelebrations should still show.

This is a coordination note for the Gap 13 implementer, not a change in this plan. Document it here:

```
// WARNING: AdaptiveToast and MicroCelebration share the same visual slot.
// When adaptiveMode === 'cruising', streak-type MicroCelebrations should
// be suppressed to avoid redundant "you're on fire!" messages.
// See: docs/plans/plan-micro-celebrations.md
```

---

## Phase 9: Testing Strategy

### New Test File: `src/__tests__/critical/adaptive-difficulty.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
```

#### Test Cases for `getAdaptiveMode`

1. **Returns 'normal' with fewer than 3 answers** -- `getAdaptiveMode([true, true])` === 'normal'
2. **Returns 'normal' with mixed results** -- `getAdaptiveMode([true, false, true, false, true])` === 'normal'
3. **Returns 'struggling' at exactly 40% accuracy** -- `getAdaptiveMode([false, false, false, true, true])` → 2/5 = 40% === 'struggling'
4. **Returns 'struggling' below 40%** -- `getAdaptiveMode([false, false, false, false, true])` → 1/5 = 20% === 'struggling'
5. **Returns 'cruising' at 100% with full window** -- `getAdaptiveMode([true, true, true, true, true])` === 'cruising'
6. **Does NOT return 'cruising' with 4 answers even if all correct** -- `getAdaptiveMode([true, true, true, true])` === 'normal' (window not full)
7. **Uses last 5 answers (sliding window)** -- `getAdaptiveMode([false, false, true, true, true, true, true])` → window is last 5: all true === 'cruising'
8. **Transitions from cruising to normal on wrong answer** -- `getAdaptiveMode([true, true, true, true, true, false])` → window is [t,t,t,t,f] → 80% === 'normal'

#### Test Cases for Cruising XP Integration

These require mocking the course store similar to existing `lesson-progression.test.ts`:

9. **completeLesson includes cruising bonus in XP** -- Start a lesson, submit 10 answers with `cruisingBonus: true` for last 5, complete. Verify `xpEarned` in result is higher than without cruising.
10. **completeLesson with cruisingCorrectCount = 0 matches baseline** -- No cruising answers → XP matches the existing formula exactly.
11. **Cruising bonus is additive, not multiplicative with shop boost** -- With shop double XP active and cruising, verify the total XP = (base * accuracy * shopBoost) + cruisingBonusXp, not base * accuracy * shopBoost * cruisingBonus.

#### Test Cases for Teaching Card Guard

12. **handleTeachingGotIt does not call handleAnswer** -- Mock handleAnswer, trigger handleTeachingGotIt, verify handleAnswer was not called (recentAnswers stays unchanged).

#### Test Cases for Edge Cases

13. **Very short lesson (2 questions)** -- adaptiveMode stays 'normal' the entire time (minimum 3 answers needed).
14. **Lesson with only teaching cards + 1 question** -- Only 1 answer enters recentAnswers, mode stays 'normal'.
15. **Re-queued wrong answers** -- When a user gets a question wrong (re-queued to end of queue), the wrong answer enters recentAnswers. Getting it right on the second attempt also enters. Both count toward the rolling window.

### Existing Test Updates

- `src/__tests__/critical/lesson-progression.test.ts` -- Add a test case that verifies `submitAnswer` with `cruisingBonus: true` increments `cruisingCorrectCount` on activeLesson.

---

## Phase 10: Implementation Order

Execute in this order, with each phase independently testable:

| Step | Phase | Files Changed | Description |
|---|---|---|---|
| 1 | 1 | `src/lib/game-config.ts` | Add adaptive difficulty constants |
| 2 | 1 | `src/data/course/types.ts` | Add `cruisingCorrectCount` to `ActiveLesson`, update `submitAnswer` signature in `CourseState` |
| 3 | 1 | `src/store/useCourseStore.ts` | Update `submitAnswer` to accept and track `cruisingBonus`, update `completeLesson` to compute cruising XP |
| 4 | 1 | `src/components/lesson/LessonView.tsx` | Import constants from game-config, pass cruising flag to `_submitAnswer`, remove dead `xpGain` state |
| 5 | 9 | `src/__tests__/critical/adaptive-difficulty.test.ts` | Write and run tests for Phase 1 |
| 6 | 3 | `src/components/lesson/LessonView.tsx` | Add sound effect on cruising mode entry |
| 7 | 4 | `src/components/lesson/LessonProgressBar.tsx` | Add `glowing` prop and pulse animation |
| 8 | 4 | `src/components/lesson/LessonView.tsx` | Pass `glowing={adaptiveMode === 'cruising'}` |
| 9 | 7 | `src/components/lesson/AdaptiveToast.tsx` | Expand messages, add reduced motion, add XP bonus text |
| 10 | 6 | `src/components/lesson/LessonView.tsx` | Add documentation comment on teaching card bypass |
| 11 | 9 | Tests | Run full test suite: `npm test` |

---

## Edge Cases

| Scenario | Expected Behavior | Notes |
|---|---|---|
| Lesson with 2 questions | adaptiveMode stays 'normal' | `ADAPTIVE_MIN_ANSWERS = 3` prevents premature triggers |
| Lesson with 3 questions, all correct | Enters cruising? No -- needs `ROLLING_WINDOW` (5) full answers | Mode stays 'normal'; 3 correct out of 3 does not meet `window.length >= ROLLING_WINDOW` |
| First 5 answers correct, then wrong | Enters cruising after Q5, exits on Q6 wrong | Toast appears on Q6 (before answering), disappears on Q7 after wrong answer updates mode |
| All wrong answers | Enters struggling after Q3 (0/3 = 0%) | Encouraging messages show |
| Review questions from earlier units | Count toward recentAnswers normally | They are real questions the user answers |
| Golden (mastery) lessons | Adaptive mode works normally | Golden flag is orthogonal to adaptive mode |
| Placement test | No adaptive mode | Placement tests use `submitPlacementAnswer`, not `submitAnswer`, so `recentAnswers` is never populated (LessonView is not used for placement tests) |
| Practice mode via SessionAdapter | AdaptiveToast shows, but no cruising XP bonus | Practice XP is calculated per-question in `useStore.answerQuestion`, not via `completeLesson`. Cruising bonus only affects lesson-mode XP. |
| Debug skip (dev mode) | No cruising bonus | Debug buttons call `_submitAnswer` directly without the cruising flag |
| Re-queued wrong answers | Both the wrong and the retry enter recentAnswers | If user gets Q5 wrong (re-queued), then Q6 right, then Q5-retry right: recentAnswers = [..., false, true, true]. This is correct -- the retry counts as a new data point. |
| Non-standard lesson types | No adaptive tracking | `handleTypeAnswer` does not update `recentAnswers`. Documented as intentional. |
| Teaching cards | Do not affect adaptive tracking | `handleTeachingGotIt` bypasses `handleAnswer`. Documented as intentional. |

---

## Files Changed Summary

| File | Change Type | Description |
|---|---|---|
| `src/lib/game-config.ts` | Modified | Add 5 adaptive difficulty constants |
| `src/data/course/types.ts` | Modified | Add `cruisingCorrectCount?` to `ActiveLesson`, update `submitAnswer` signature |
| `src/store/useCourseStore.ts` | Modified | `submitAnswer`: accept + track cruising flag. `completeLesson`: compute bonus XP |
| `src/components/lesson/LessonView.tsx` | Modified | Import constants, pass cruising flag, remove dead `xpGain`, add sound + glow, add comments |
| `src/components/lesson/AdaptiveToast.tsx` | Modified | Expand messages, reduced motion, XP bonus text |
| `src/components/lesson/LessonProgressBar.tsx` | Modified | Add `glowing` prop with pulse animation |
| `src/__tests__/critical/adaptive-difficulty.test.ts` | New | 15 test cases |

---

## Critic Resolutions (42-Issue Audit)

The following addresses all issues raised in `critique-high-priority.md` for Gap 4:

### CR-1.1 [CRITICAL] `submitAnswer` signature change — undocumented call sites

**Critic says:** `handleTypeAnswer` (line 342) and `handleTeachingGotIt` (line 517) also call `_submitAnswer` but the plan does not mention them.

**Verification:** Confirmed. Three call sites exist in `LessonView.tsx`:
1. `handleAnswer` (line 416) — the plan updates this. Correct.
2. `handleTypeAnswer` (line 342) — passes `(questionId, correct)` without cruising flag. This is intentional: non-standard lesson types do not participate in adaptive tracking (Phase 5 documents this).
3. `handleTeachingGotIt` (line 517) — passes `(currentQuestion.id, true)` without cruising flag. This is intentional: teaching cards bypass adaptive difficulty (Phase 6 documents this).

**Resolution:** Since the third parameter is optional (`cruisingBonus?: boolean`), existing call sites work without changes. Add an explicit comment block in the implementation noting all three call sites and why only `handleAnswer` passes the flag:

```typescript
// _submitAnswer call sites:
// 1. handleAnswer — passes cruisingBonus flag (standard questions)
// 2. handleTypeAnswer — no cruising flag (non-standard lesson types, Phase 5)
// 3. handleTeachingGotIt — no cruising flag (teaching cards, Phase 6)
```

### CR-1.2 [CRITICAL] Stale `adaptiveMode` due to React state batching

**Critic says:** `adaptiveMode` (from `useMemo` on `recentAnswers`) is stale within `handleAnswer` because `setRecentAnswers` is batched. The cruising bonus uses the previous render's mode.

**Verification:** Confirmed. Looking at lines 432-441 of `LessonView.tsx`, `setRecentAnswers` schedules an update but `adaptiveMode` reflects the pre-update state. The code ALREADY computes `getAdaptiveMode(next)` inside the `setRecentAnswers` updater (line 435) but only uses it for `adaptiveSeed` — not for the cruising flag.

**Resolution:** Compute the new adaptive mode eagerly in `handleAnswer` BEFORE passing the flag to the store:

```typescript
// In handleAnswer, BEFORE calling _submitAnswer:
const nextRecentAnswers = [...recentAnswers, correct];
const nextMode = getAdaptiveMode(nextRecentAnswers);

// Pass cruising flag based on the NEXT mode, not the current (stale) mode:
_submitAnswer(currentQuestion.id, correct, nextMode === 'cruising' && correct);
```

This eliminates the one-question lag entirely. The user earns the cruising bonus starting from the 5th correct answer (when they enter cruising), not the 6th. Update the Phase 2 example calculation accordingly (see CR-1.5).

### CR-1.3 [IMPORTANT] `game-config.ts` already exists — plan says "New constants"

**Critic says:** The file exists (81 lines) and the `ADAPTIVE_` prefix is redundant.

**Verification:** Confirmed. `src/lib/game-config.ts` exists and contains other constants.

**Resolution:** Change the plan's Phase 1 description from "New constants" to "Add to existing `game-config.ts`". Simplify constant names by dropping the `ADAPTIVE_` prefix:

```typescript
// In game-config.ts — add to existing file:
// --------------- Adaptive Difficulty ---------------
export const ROLLING_WINDOW = 5;
export const STRUGGLING_THRESHOLD = 0.4;
export const CRUISING_THRESHOLD = 1.0;
export const CRUISING_XP_BONUS = 1.5;
export const MIN_ANSWERS_FOR_MODE = 3;
```

In `LessonView.tsx`, import directly without aliasing:
```typescript
import { ROLLING_WINDOW, STRUGGLING_THRESHOLD, CRUISING_THRESHOLD, CRUISING_XP_BONUS, MIN_ANSWERS_FOR_MODE } from '@/lib/game-config';
```

### CR-1.4 [IMPORTANT] `ADAPTIVE_MIN_ANSWERS` ambiguity

**Critic says:** The constant `ADAPTIVE_MIN_ANSWERS = 3` only gates struggling mode. Cruising requires `ROLLING_WINDOW` (5) answers.

**Resolution:** Rename to `MIN_ANSWERS_FOR_MODE` and add a code comment:

```typescript
/** Minimum answers before ANY adaptive mode activates (struggling).
 *  Cruising additionally requires window.length >= ROLLING_WINDOW (5). */
export const MIN_ANSWERS_FOR_MODE = 3;
```

### CR-1.5 [IMPORTANT] XP bonus example calculation is wrong

**Critic says:** The Phase 2 example claims "at most 5 of 10 questions get the bonus" but with the stale-mode lag, only 4 would qualify.

**Resolution:** With CR-1.2 resolved (eager computation), there is no lag. Cruising starts after Q5, so Q5-Q10 (6 questions, not 5) can get the bonus IF the user keeps answering correctly. But Q5 is the answer that *enters* cruising, and with the eager computation, Q5 itself gets the bonus. So `cruisingCorrectCount` can be up to 6 out of 10 (Q5-Q10).

Updated example: For a 10 XP lesson with 10 questions, user gets all correct:
- Cruising starts at Q5 (5/5 perfect window), Q5-Q10 = 6 cruising answers
- `cruisingBonusXp = 10 * 0.5 * (6/10) = 3 XP`
- With flawless (4x): `10 * 4 + 3 = 43 XP` — a +7.5% bump

### CR-1.6 [IMPORTANT] `playSound('streakMilestone')` — verify sound exists

**Verification:** Confirmed. `streakMilestone` IS a valid `SoundName` in `src/lib/sounds.ts` (line 22). It produces an ascending 5-note celebratory tone. No change needed.

### CR-1.7 [IMPORTANT] AdaptiveToast XP bonus text is misleading

**Critic says:** "+5 XP per Q" promises far more than the proportional formula delivers.

**Resolution:** Change cruising toast messages to vague encouragement instead of specific XP amounts:

```typescript
cruising: [
  { pose: 'on-fire', text: "You're on fire! Bonus XP active!" },
  { pose: 'champion', text: 'Perfect streak! Earning bonus XP!' },
  { pose: 'celebrating', text: 'Unstoppable! Keep it going!' },
  { pose: 'proud', text: 'Crushing it! Extra XP earned!' },
  { pose: 'explorer', text: 'Flawless run — keep it up!' },
],
```

Remove the `isDoubleXp` prop from `AdaptiveToastProps` — it is no longer needed since we are not showing specific XP amounts.

### CR-1.8 [MINOR] Test case 6 clarity

**Resolution:** Add a comment to test case 6 making the guard explicit:

```typescript
it('Does NOT return cruising with 4 answers even if all correct (window size guard)', () => {
  // Cruising requires window.length >= ROLLING_WINDOW (5), not just MIN_ANSWERS_FOR_MODE (3)
  expect(getAdaptiveMode([true, true, true, true])).toBe('normal');
});
```

### CR-1.9 [MINOR] No interaction with `useHeartsStore` documented

**Verification:** Confirmed. `useHeartsStore` is imported at line 30, `loseHeart()` at line 123, called at lines 357 and 445. Struggling mode + rapid heart loss can trigger `OutOfHeartsModal`.

**Resolution:** Add to the Edge Cases table:

| Struggling + hearts | User in struggling mode loses hearts rapidly | OutOfHeartsModal may interrupt the lesson. This is acceptable — the user's poor accuracy is the underlying problem, and the heart system is working as designed. Struggling mode encouragement still shows when they retry after refilling hearts. |

### CR-5.1 [CRITICAL] Cross-plan: Cruising bonus + XP events stacking

**Resolution:** The stacking is already additive by design. Document the full formula in a code comment at the `completeLesson()` change site:

```typescript
// Full XP formula:
// totalXp = (xpReward * accuracyMultiplier * totalBoostMultiplier) + cruisingBonusXp
// where totalBoostMultiplier = 1 + (shop-1) + (event-1)  [additive stacking]
// and cruisingBonusXp = xpReward * 0.5 * (cruisingCorrectCount / totalQuestions)
// Cruising bonus is ADDITIVE on top of the multiplied base — not itself multiplied.
// Max theoretical: 10 * 4 * 3.75 + 3 = 153 XP from a 10 XP lesson.
```

### CR-5.5 [IMPORTANT] Cross-plan: MicroCelebration overlap enforcement

**Resolution:** Add to LessonView a concrete guard variable (not just a comment):

```typescript
const suppressStreakCelebration = adaptiveMode === 'cruising';
// Pass to MicroCelebration component when Gap 13 is implemented:
// <MicroCelebration suppressStreak={suppressStreakCelebration} ... />
```

### CR-6.2 [IMPORTANT] Cross-plan: Accessibility for AdaptiveToast

**Resolution:** Add to Phase 7.2: the `AdaptiveToast` `motion.div` must include ARIA attributes:

```typescript
<motion.div
  role="status"
  aria-live="polite"
  aria-label={`Adaptive mode: ${mode}. ${selectedMessage.text}`}
  // ... existing animation props ...
>
```

---

## What This Plan Does NOT Do

1. **Question reordering mid-lesson.** The question pool is fixed at `startLesson()`. True difficulty adaptation (swapping easier/harder questions) would require a server-side question bank with difficulty tags and a mid-lesson fetch mechanism. This is a separate, much larger feature.

2. **Hint auto-reveal for struggling users.** A future enhancement could auto-show the `hint` field when in struggling mode. This plan does not implement it because hints are not consistently present across all questions, and auto-revealing them changes the assessment value of the question.

3. **Per-question difficulty tags in course content.** The `CourseQuestion` type does not have a `difficulty` field (only practice-mode `Question` has one). Adding difficulty metadata to course questions is a content task, not a code task.

4. **Analytics/persistence of adaptive stats.** We do not store how often a user enters struggling/cruising mode, or which lessons triggered which modes. This could be added to `session_history` in a future iteration.

5. **Practice mode cruising XP bonus.** The `SessionAdapter` and `useStore.answerQuestion` do not get the cruising bonus. Practice mode uses a different XP calculation path. This could be added later by passing adaptive mode through the adapter.
