# Gap 13: Mid-Lesson Micro-Celebrations

## Overview & Motivation

Currently, LessonView.tsx tracks `currentQuestionIndex` and `answers.length` but never gives the user any milestone feedback during a lesson. The user answers 8–12 questions in a row with no acknowledgment until the final ResultScreen. Duolingo uses mid-lesson micro-celebrations (halfway messages, streak callouts, final-question emphasis) to sustain motivation and reduce mid-lesson drop-off.

This plan adds four micro-celebration triggers:
1. **Halfway milestone** — "Halfway there!" toast with mascot wink
2. **Last question emphasis** — "Final question!" toast with slight visual emphasis
3. **Correct-answer streak** — 3+ correct in a row triggers "On fire!" mini-celebration
4. **Progress bar glow** — bar segments glow/pulse as completion nears

All celebrations are lightweight toasts that auto-dismiss after ~2 seconds and never block the user flow.

---

## Design Principles

- **Non-blocking:** Celebrations are informational toasts, not modals. They never require user interaction.
- **No duplicate toasts:** At most one celebration toast visible at a time. Priority order: streak > halfway > last question.
- **Adapter-compatible:** Must work for both lesson mode (useCourseStore) and practice mode (SessionAdapter).
- **Reduced motion:** Respect `prefers-reduced-motion` — skip animations, still show text.
- **Short lessons:** Lessons with fewer than 4 questions skip the halfway toast. Lessons with fewer than 3 questions skip streak detection.

---

## New Files

### `src/components/lesson/MicroCelebration.tsx`

A self-contained toast component that displays milestone messages with mascot poses. Renders inside LessonView's content area, positioned above the question card (similar placement to existing AdaptiveToast).

**Component API:**

```tsx
interface MicroCelebrationProps {
  type: 'halfway' | 'last-question' | 'streak';
  streakCount?: number;  // Only for type='streak'
}
```

**Design spec:**

- Container: `rounded-2xl px-4 py-3 mx-4 mb-3` (matches AdaptiveToast layout)
- Background gradient per type:
  - `halfway`: `linear-gradient(135deg, #DBEAFE, #BFDBFE)` with `border: 2px solid #3B82F6`
  - `last-question`: `linear-gradient(135deg, #FEF3C7, #FDE68A)` with `border: 2px solid #F59E0B`
  - `streak`: `linear-gradient(135deg, #FFE4E6, #FECDD3)` with `border: 2px solid #F43F5E`
- Layout: flex row — `<Mascot>` (36px) + message text
- Entry animation: `initial={{ opacity: 0, y: -20, scale: 0.9 }}` → `animate={{ opacity: 1, y: 0, scale: 1 }}` (spring, stiffness: 400, damping: 25)
- Exit animation: reverse of entry
- Auto-dismiss: `useEffect` with 2500ms timeout triggers exit
- Mascot poses:
  - `halfway`: `'winking'`
  - `last-question`: `'almost-there'`
  - `streak` (3): `'on-fire'`
  - `streak` (5+): `'champion'`
- Text content:
  - `halfway`: "Halfway there!"
  - `last-question`: "Final question — you got this!"
  - `streak` (3): "3 in a row — on fire!"
  - `streak` (4): "4 in a row!"
  - `streak` (5+): "🔥 {n} streak! Unstoppable!"
- Text style: `text-sm font-bold`, color matched to border color
- Sound: `playSound('toast')` on mount (reuses existing toast sound)

**Reduced motion:**
- Wrap animations in a `useReducedMotion()` check (framer-motion provides this)
- When reduced motion: render with `opacity: 1` immediately, no spring/scale

---

## Existing Files to Modify

### 1. `src/components/lesson/LessonView.tsx`

This is the main file that needs changes. All modifications are in the LessonView function component.

#### A. Add celebration state tracking

After the existing `recentAnswers` state declaration (line ~114), add:

```tsx
const [celebration, setCelebration] = useState<{
  type: 'halfway' | 'last-question' | 'streak';
  streakCount?: number;
  key: number;  // Forces re-mount on repeated celebrations
} | null>(null);
const celebrationKeyRef = useRef(0);
const [correctStreak, setCorrectStreak] = useState(0);
```

#### B. Update `handleAnswer` callback to track streaks and trigger celebrations

Inside the existing `handleAnswer` callback (starts at line ~410), after the `setRecentAnswers` call, add streak tracking logic:

```tsx
// Track correct streak
const newStreak = correct ? correctStreak + 1 : 0;
setCorrectStreak(newStreak);

// Trigger streak celebration at 3, 5, 7, ...
if (correct && newStreak >= 3 && newStreak % 2 === 1) {
  celebrationKeyRef.current++;
  setCelebration({
    type: 'streak',
    streakCount: newStreak,
    key: celebrationKeyRef.current,
  });
}
```

Note: We use `correctStreak` from the closure. The streak resets to 0 on any wrong answer.

#### C. Trigger halfway and last-question celebrations in `handleContinue`

Inside the existing `handleContinue` callback (starts at line ~459), before the `adapter ? adapter.nextQuestion() : _nextQuestion()` call, add milestone detection:

```tsx
// Milestone detection — fires BEFORE advancing to the next question
const nextIndex = adapter
  ? adapter.answeredCount + 1
  : (activeLesson?.currentQuestionIndex ?? 0) + 1;
const total = resolvedTotalQuestions;

// Halfway check: fire once when crossing the midpoint (only for lessons with 4+ questions)
if (total >= 4 && nextIndex === Math.floor(total / 2)) {
  celebrationKeyRef.current++;
  setCelebration({ type: 'halfway', key: celebrationKeyRef.current });
}

// Last question check: fire when advancing to the final question
if (nextIndex === total - 1 && total >= 3) {
  celebrationKeyRef.current++;
  setCelebration({ type: 'last-question', key: celebrationKeyRef.current });
}
```

#### D. Reset celebration state on question transition

In the `handleContinue` callback, at the top alongside existing resets:

```tsx
// Clear any visible celebration when moving to next question
// (the MicroCelebration auto-dismisses, but clear state for safety)
setCelebration(null);
```

Also reset `correctStreak` to 0 at the start of the lesson (alongside existing state resets).

#### E. Render MicroCelebration in the content area

In the JSX, right after the existing AdaptiveToast render (line ~982), add:

```tsx
{/* Mid-lesson micro-celebration toast */}
{celebration && (
  <MicroCelebration
    key={celebration.key}
    type={celebration.type}
    streakCount={celebration.streakCount}
  />
)}
```

The `key` prop ensures AnimatePresence correctly re-triggers entry animation for repeated celebrations.

#### F. Add import

At the top of LessonView.tsx, add:

```tsx
import { MicroCelebration } from './MicroCelebration';
```

---

### 2. `src/components/lesson/LessonProgressBar.tsx`

Add a glow effect to the progress bar as it approaches completion.

#### A. Accept a new `glowIntensity` prop

Add to the interface:

```tsx
interface LessonProgressBarProps {
  current: number;
  total: number;
  color: string;
  /** 0-1 float: how close to completion. Controls glow intensity. */
  glowIntensity?: number;
}
```

#### B. Apply glow styles to the container

When `glowIntensity > 0`, add a `boxShadow` to the container div:

```tsx
const glowStyle = glowIntensity && glowIntensity > 0.5
  ? { boxShadow: `0 0 ${Math.round(glowIntensity * 12)}px ${color}${Math.round(glowIntensity * 60).toString(16).padStart(2, '0')}` }
  : {};
```

Apply `glowStyle` to the outer container div via spread: `style={{ gap: 5, ...glowStyle }}`.

#### C. Add pulse animation to the current segment when near completion

When `glowIntensity > 0.7` (within last ~30% of lesson), the current-segment pulsing animation gets brighter:

```tsx
{isCurrent && (
  <motion.div
    style={{
      height: '100%',
      borderRadius: 4,
      backgroundColor: color,
      opacity: glowIntensity && glowIntensity > 0.7 ? 0.55 : 0.35,
    }}
    animate={{ width: ['30%', '55%', '30%'] }}
    transition={{ duration: glowIntensity && glowIntensity > 0.7 ? 1.2 : 2, repeat: Infinity, ease: 'easeInOut' }}
  />
)}
```

#### D. Update LessonView.tsx to pass glowIntensity

In LessonView.tsx where `<LessonProgressBar>` is rendered (line ~731):

```tsx
<LessonProgressBar
  current={resolvedAnsweredCount}
  total={resolvedTotalQuestions}
  color={isGolden ? '#FFB800' : unitColor}
  glowIntensity={resolvedTotalQuestions > 0 ? resolvedAnsweredCount / resolvedTotalQuestions : 0}
/>
```

---

### 3. `src/lib/sounds.ts`

The existing `toast` sound is adequate for micro-celebrations. No changes needed unless we want a distinct "streak" sound.

**Optional enhancement** — add a `streak` sound (short ascending trill):

```tsx
streak() {
  tone(880, 0.08, 'sine', 0, 0.15);
  tone(1047, 0.08, 'sine', 0.06, 0.15);
  tone(1319, 0.1, 'sine', 0.12, 0.18);
}
```

Add `'streak'` to the `SoundName` union type. The MicroCelebration component would use `playSound('streak')` for streak celebrations and `playSound('toast')` for halfway/last-question.

---

## Interaction with Existing Systems

### AdaptiveToast coexistence
- AdaptiveToast shows when `lastAnswerCorrect === null` (i.e., before the user answers). MicroCelebration shows immediately after answering correctly (streak) or when transitioning between questions (halfway/last-question).
- They should never overlap because AdaptiveToast disappears when the user answers, and MicroCelebration appears after.
- If both somehow want to show, MicroCelebration takes priority (it's more specific).

### Non-standard lesson types (conversation, speed-round, timeline, case-study)
- Non-standard types handle their own answer/progress flow via `handleTypeAnswer` and `handleTypeProgress`.
- The streak tracking should also be wired into `handleTypeAnswer` for consistency.
- Halfway/last-question detection uses `resolvedAnsweredCount` and `resolvedTotalQuestions`, which already account for non-standard types via `typeAnsweredCount`/`typeTotalCount`.

### SessionAdapter (practice mode)
- Practice sessions use the adapter pattern. The adapter's `answeredCount` and `totalQuestions` are used for milestone detection.
- Streak tracking uses local `correctStreak` state, which works regardless of adapter vs. lesson mode.

### Review questions
- Review questions are injected into lessons (from earlier units). They count toward the question total and streak tracking normally. No special handling needed.

---

## Edge Cases

| Scenario | Behavior |
|---|---|
| Lesson has 1-2 questions | No halfway toast, no streak possible. Last-question toast skipped (too few questions). |
| Lesson has exactly 3 questions | Halfway fires after Q1 (index 1 = floor(3/2)). Last-question fires before Q3. Streak of 3 possible but fires on answer, after last-question toast. |
| User gets 3 correct, then wrong, then 3 more correct | Streak resets to 0 on wrong answer. Second streak of 3 triggers a new celebration. |
| Teaching cards | Teaching cards auto-submit as correct but should NOT count toward the correct streak (they're not real questions). Add a guard: `if (isTeaching) return;` before streak logic. |
| Debug skip-to-end | Celebrations don't fire because handleAnswer/handleContinue are not called. This is fine. |
| Rapid answers | The 2500ms auto-dismiss ensures old toasts clear before new ones appear. The `key` prop forces clean re-mount. |

---

## Testing Strategy

### Unit tests (`src/__tests__/`)

1. **Milestone detection logic** — Extract the milestone detection into a pure function `getMilestone(currentIndex, totalQuestions)` in a utils file. Test:
   - `getMilestone(3, 8)` returns `'halfway'`
   - `getMilestone(0, 2)` returns `null` (too few questions)
   - `getMilestone(6, 8)` returns `'last-question'`
   - `getMilestone(7, 8)` returns `null` (already on last)

2. **Streak tracking** — Test that streak resets on wrong answer and fires at 3, 5, 7.

3. **MicroCelebration component** — Render with each type, verify correct mascot pose and text content.

### Manual testing

- Play a lesson with 8+ questions. Verify halfway toast at Q4, last-question toast at Q7/Q8.
- Get 3 correct in a row. Verify streak toast appears.
- Get 2 correct, 1 wrong, 3 correct. Verify streak only fires on the second group.
- Play a 2-question lesson. Verify no milestone toasts.
- Toggle reduced motion in OS settings. Verify toasts still appear but without animation.

---

## Implementation Order

1. Create `MicroCelebration.tsx` component (standalone, testable)
2. Add `streak` sound to `sounds.ts` (optional)
3. Add celebration state + streak tracking to LessonView.tsx `handleAnswer`
4. Add milestone detection to LessonView.tsx `handleContinue`
5. Render MicroCelebration in LessonView JSX
6. Add `glowIntensity` prop to LessonProgressBar
7. Pass `glowIntensity` from LessonView
8. Wire streak tracking into `handleTypeAnswer` for non-standard lesson types
9. Write unit tests
10. Manual testing across lesson lengths (2, 4, 8, 12 questions)
11. Add MicroCelebration component to `modal-gallery.html`

---

## Summary of Changes

| File | Change |
|---|---|
| `src/components/lesson/MicroCelebration.tsx` | **NEW** — Toast component for milestone messages |
| `src/components/lesson/LessonView.tsx` | Add celebration state, streak tracking, milestone detection, render MicroCelebration |
| `src/components/lesson/LessonProgressBar.tsx` | Add `glowIntensity` prop, glow effect, faster pulse near completion |
| `src/lib/sounds.ts` | Optional: add `streak` sound |
| `modal-gallery.html` | Add entries for MicroCelebration variants |

---

## Critic Resolutions

The following issues were identified during critical review and are now resolved in this plan.

### CR-1 [CRITICAL] Streak celebration condition contradicts design spec

**Issue:** The condition `newStreak >= 3 && newStreak % 2 === 1` fires at 3, 5, 7, 9... But the text content section lists `streak (4): "4 in a row!"` — implying streak 4 should trigger a celebration. Code and spec contradict.

**Resolution:** Fire at EVERY streak >= 3, not just odd numbers. The modular check was premature optimization to reduce celebration frequency, but the celebrations auto-dismiss in 2.5s and are non-blocking, so frequency isn't a concern.

Updated condition:
```typescript
if (correct && newStreak >= 3) {
  celebrationKeyRef.current++;
  setCelebration({
    type: 'streak',
    streakCount: newStreak,
    key: celebrationKeyRef.current,
  });
}
```

Text content for all streak values:
- 3: "3 in a row — on fire!"
- 4: "4 in a row!"
- 5+: "{n} streak! Unstoppable!"

### CR-2 [IMPORTANT] MicroCelebration and AdaptiveToast can visually overlap

**Issue:** AdaptiveToast shows during "cruising" mode (100% accuracy). MicroCelebration fires on correct streaks. A user in cruising mode with a 3-correct streak would see both simultaneously.

**Resolution:** Add a guard in the celebration trigger — suppress streak MicroCelebration when AdaptiveToast is showing "cruising" mode, since they convey similar messages ("You're on fire!" vs "3 in a row — on fire!"):

```typescript
// In handleAnswer, before triggering streak celebration:
const adaptiveMode = adapter?.mode ?? 'normal';
const suppressStreakCelebration = adaptiveMode === 'cruising';

if (correct && newStreak >= 3 && !suppressStreakCelebration) {
  // ... trigger celebration
}
```

Halfway and last-question celebrations are NOT suppressed by AdaptiveToast — they convey different information.

### CR-3 [IMPORTANT] Line number references are fragile

**Issue:** The plan references specific line numbers in `LessonView.tsx` which will shift during development.

**Resolution:** Replace all line number references with code-context references:

- "line ~114" → "After the `recentAnswers` state declaration"
- "line ~410" → "Inside the `handleAnswer` callback, after the `setRecentAnswers(prev => ...)` call"
- "line ~459" → "Inside the `handleContinue` callback, before the `adapter ? adapter.nextQuestion() : _nextQuestion()` call"
- "line ~731" → "Where `<LessonProgressBar>` is rendered in the question display section"
- "line ~982" → "After the existing `AdaptiveToast` render"

### CR-4 [IMPORTANT] Teaching cards inflate streak count — guard missing from implementation

**Issue:** The edge cases table says teaching cards should not count toward streaks, but the implementation code in Section B does NOT include the guard.

**Resolution:** Add the guard explicitly in the `handleAnswer` streak tracking code:

```typescript
// Track correct streak (skip teaching cards — they auto-submit as correct)
if (!isTeaching) {
  const newStreak = correct ? correctStreak + 1 : 0;
  setCorrectStreak(newStreak);

  // Trigger streak celebration
  const adaptiveMode = adapter?.mode ?? 'normal';
  if (correct && newStreak >= 3 && adaptiveMode !== 'cruising') {
    celebrationKeyRef.current++;
    setCelebration({
      type: 'streak',
      streakCount: newStreak,
      key: celebrationKeyRef.current,
    });
  }
} else {
  // Teaching cards don't affect streak count
}
```

Where `isTeaching` is determined by the current question type. In `LessonView.tsx`, this check already exists for other purposes — use the same condition.

### CR-5 [IMPORTANT] `glowIntensity` hex conversion produces dim glow at max

**Issue:** `Math.round(glowIntensity * 60)` at 100% produces hex `3c` = 38% opacity. This is dim for a "max glow."

**Resolution:** Use `Math.round(glowIntensity * 180)` for a range up to ~70% opacity at max intensity:

```typescript
const glowStyle = glowIntensity && glowIntensity > 0.5
  ? {
      boxShadow: `0 0 ${Math.round(glowIntensity * 12)}px ${color}${Math.round(glowIntensity * 180).toString(16).padStart(2, '0')}`
    }
  : {};
```

At glowIntensity=0.5: `Math.round(90)` = `5a` = 35% opacity (subtle start)
At glowIntensity=1.0: `Math.round(180)` = `b4` = 70% opacity (strong glow)

### CR-6 [MINOR] Missing `AnimatePresence` wrapper

**Issue:** The render code `{celebration && <MicroCelebration key={celebration.key} ... />}` without `AnimatePresence` means exit animations never play.

**Resolution:** Wrap in `AnimatePresence`:

```tsx
<AnimatePresence>
  {celebration && (
    <MicroCelebration
      key={celebration.key}
      type={celebration.type}
      streakCount={celebration.streakCount}
    />
  )}
</AnimatePresence>
```

Add `AnimatePresence` to the existing framer-motion import in LessonView.tsx.

### CR-7 [CROSS-CUTTING] Accessibility (Plan 14 integration)

**Resolution:** The `MicroCelebration` component MUST include from day one:

```tsx
<motion.div
  role="status"
  aria-live="polite"
  aria-label={getAriaLabel(type, streakCount)}
  // ... animation props
>
```

Where `getAriaLabel` returns descriptive text like "Halfway through the lesson" or "3 correct answers in a row".

### CR-8 [CROSS-CUTTING] Non-standard lesson types need streak tracking

**Resolution:** The plan mentions this in the "Non-standard lesson types" section but doesn't show implementation. In `handleTypeAnswer` (the handler for conversation/speed-round/timeline/case-study answers), add the same streak tracking:

```typescript
// In handleTypeAnswer callback:
if (!isTeaching) {
  const newStreak = correct ? correctStreak + 1 : 0;
  setCorrectStreak(newStreak);
  // ... same celebration trigger logic
}
```

This ensures streak celebrations work in all lesson types, not just standard question cards.
