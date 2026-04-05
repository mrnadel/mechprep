# Critical Gaps Fix — Design Spec

**Date:** 2026-04-05
**Scope:** 3 critical gaps from Duolingo gap analysis

---

## Gap 1: Mistake-Specific Feedback

### Data Change
Extend `CourseQuestion` in `src/data/course/types.ts`:

```typescript
distractorExplanations?: Record<number, string>; // original option index → why it's wrong
```

Keyed by original (pre-shuffle) option index. Only wrong options get entries.

### Callback Change
`QuestionCard.onAnswer` signature changes from `(correct: boolean)` to `(correct: boolean, selectedOriginalIndex?: number)`.

QuestionCard already tracks the original index internally via shuffle mapping. Pass it through.

### UI Change (LessonView)
- Store `lastSelectedIndex` in state alongside `lastAnswerCorrect`
- When wrong: render distractor explanation in a red-tinted callout ("Not quite — [text]"), staggered in at 0.2s
- Then render existing `explanation` in green-tinted callout at 0.4s delay
- When correct: just show green explanation as today
- **Graceful fallback:** if `distractorExplanations` is missing or doesn't have the index, skip the red callout entirely

### Mastery Tracking
Log `selectedOriginalIndex` in mastery events (new optional field on `AnswerEvent`). Enables future analytics on which distractors are most commonly selected.

### Content
Write `distractorExplanations` for every question with `options[]` + `correctIndex` across all courses. Each distractor explanation is 1 short sentence explaining why THAT choice is wrong. Applies to: multiple-choice, true-false, scenario, pick-the-best.

### Validation Test
Lightweight Vitest test that scans all question data files and warns about MC/scenario/pick-the-best questions missing `distractorExplanations`. Non-blocking (warning, not failure) since content can be added incrementally.

---

## Gap 2: Spaced Repetition in Lessons

### Review Engine (`src/lib/review-engine.ts`)
New module that computes per-question mastery and identifies decayed questions:

- `getDecayedQuestions(events, courseData)` → returns questions where:
  - User previously answered correctly (don't review unlearned material)
  - Per-question mastery score has dropped below 50
  - Question is from a unit the user has started
- Uses existing `computeMastery()` from `mastery.ts` — no new algorithm
- Per-question granularity (Duolingo-level), not per-topic

### Interleaved Review (Part A)
In `useCourseStore.startLesson()`:
- After selecting the lesson's own questions, call `getDecayedQuestions()`
- Filter to questions from earlier units (don't spoil ahead)
- Append up to 2 review questions to `sessionQuestionIds`
- Tag review questions so UI can show a subtle "Review" badge
- Load earlier unit data on demand if not already loaded
- If no decayed questions exist, lesson is unchanged (zero impact on new users)

### Dedicated Review Mode (Part B)
New practice mode at `/practice/review/`:
- Pulls all questions where per-question mastery has decayed below 50
- Uses existing `SessionAdapter` interface to drive LessonView
- Session length: 10 questions, prioritized by lowest mastery score
- Empty state: "All caught up!" with mascot

### Course Map Indicators (Part C)
On completed lessons in `CourseMap.tsx`:
- Star ratings visually dim (gold → gray) as per-question mastery decays
- Shows subtle indicator on unit headers when any lesson in that unit needs review
- Tapping indicator opens Review mode filtered to that unit

---

## Gap 3: Try Before Signup

### Route
New `/try` route outside `(app)` group — bypasses auth layout.

### Flow
1. Landing page "Get Started" → `/try`
2. Lightweight profession picker (cards, one tap)
3. Immediately starts Unit 1, Lesson 1 via `LessonView` with `SessionAdapter`
4. Full gamification: XP, sounds, celebrations, hearts, mascot
5. Result screen: modified CTA "Create free account to save your progress"
6. CTA → `/get-started` (existing signup flow)
7. After signup, `useDbSync` syncs localStorage progress to server

### Guest Session
- Stores work without auth (localStorage with generic keys, `userId: 'user'` default)
- No streaks/quests/leagues for guests (engagement store initializes on first auth session)
- Standard 5 hearts
- If guest returns without signing up, localStorage has their progress (lesson 1 shows as completed)

### Progress Transfer
On signup, user is redirected to `/`. The `useDbSync` hook runs and pushes localStorage state to server, associating it with the new account. No special migration code needed — the stores are already designed for this.

---

## Implementation Order
1. Gap 1 (type + UI + content) — largest content surface
2. Gap 2 (review engine + interleaving + mode + map) — most architectural
3. Gap 3 (route + flow + CTA) — most self-contained
