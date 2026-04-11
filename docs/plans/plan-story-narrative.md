# Plan: Story Narrative Arc (Gap 11)

## Overview & Motivation

Currently, characters (Sarah, Alex, Senior Engineer, Jordan, Narrator) appear across courses in conversation lessons, timelines, and case studies but have no continuity. The same character name might appear in personal-finance and space-astronomy with no relationship between appearances. Within a single course, characters don't develop or reference earlier events.

**Goal:** Give each course's characters a mini-arc with personality, growth, cross-unit callbacks, and unlockable story reward content between units. This transforms flat "talking heads" into companions the learner cares about, increasing emotional investment and retention.

---

## 1. Character Arc Data Model

### New file: `src/data/course/character-arcs.ts`

Define per-course character rosters with arc metadata:

```ts
export interface CharacterArc {
  id: string;                    // e.g. "pf-alex"
  name: string;                  // "Alex"
  avatar: string;                // emoji or path to avatar image
  personality: string;           // brief description for content writers
  courseId: string;               // "personal-finance"
  /** Arc stages mapped to section indices. Each stage describes the character's
   *  situation at that point in the course. Used by content writers as reference
   *  and by the StoryUnlock screen to show progression. */
  stages: CharacterStage[];
}

export interface CharacterStage {
  sectionIndex: number;          // which section this stage covers
  situation: string;             // one-line summary, e.g. "Alex can't pay rent"
  emoji: string;                 // visual marker for this stage
  /** Optional callback text referencing earlier stages. Shown in conversation
   *  nodes and story unlock screens. */
  callback?: string;             // e.g. "Remember when Alex couldn't pay rent?"
}

export interface StoryUnlock {
  id: string;                    // e.g. "pf-story-unlock-3"
  courseId: string;
  /** Appears after completing all units in this section */
  afterSectionIndex: number;
  title: string;                 // "Alex's Story: Chapter 3"
  /** Short narrative snippet (3-5 sentences). NOT a wall of text. */
  narrative: string;
  characterId: string;           // which character this follows
  /** Mascot pose for the unlock screen */
  mascotPose: string;
  /** Gems awarded for viewing the story unlock */
  gemsReward: number;
}
```

### New file: `src/data/course/professions/personal-finance/characters.ts`

Example character definitions for Personal Finance:

```ts
export const financeCharacters: CharacterArc[] = [
  {
    id: 'pf-alex',
    name: 'Alex',
    avatar: '👨‍💼',
    personality: 'A 24-year-old who just got their first real job. Impulsive spender, gradually learns discipline.',
    courseId: 'personal-finance',
    stages: [
      { sectionIndex: 1, situation: 'Alex just got their first paycheck and has no idea where the money goes', emoji: '😰' },
      { sectionIndex: 2, situation: 'Alex tracked spending for a month and is shocked by how much goes to food delivery', emoji: '���' },
      { sectionIndex: 3, situation: 'Alex opened a savings account and set up auto-transfers', emoji: '💪' },
      { sectionIndex: 4, situation: 'Alex understands checking vs savings and earned first interest', emoji: '🏦' },
      { sectionIndex: 5, situation: 'Alex filed taxes for the first time using a free tool', emoji: '📝' },
      { sectionIndex: 6, situation: 'Alex paid off a small credit card balance with the snowball method', emoji: '🎉' },
      { sectionIndex: 7, situation: 'Alex built a credit score above 700', emoji: '📈' },
      { sectionIndex: 8, situation: 'Alex started investing with a simple index fund', emoji: '📊', callback: "Remember when Alex couldn't pay rent? Now they're investing." },
      { sectionIndex: 9, situation: 'Alex is learning about diversification and risk tolerance', emoji: '🧠' },
      { sectionIndex: 10, situation: 'Alex is saving for a first home down payment', emoji: '🏠', callback: "From zero savings to a down payment fund. Alex came a long way." },
      { sectionIndex: 11, situation: 'Alex has renter\'s insurance and understands deductibles', emoji: '🛡️' },
      { sectionIndex: 12, situation: 'Alex opened a Roth IRA and is auto-contributing', emoji: '🏖️' },
      { sectionIndex: 13, situation: 'Alex wrote a basic will and named beneficiaries', emoji: '📋' },
      { sectionIndex: 14, situation: 'Alex is freelancing on the side and tracking business expenses', emoji: '💼' },
      { sectionIndex: 15, situation: 'Alex is financially confident and helping a friend get started', emoji: '🌟', callback: "Full circle: Alex is now the mentor." },
    ],
  },
  {
    id: 'pf-jordan',
    name: 'Jordan',
    avatar: '👩‍🔬',
    personality: 'A 30-year-old with student loans and a science career. Cautious but overwhelmed by financial complexity.',
    courseId: 'personal-finance',
    stages: [
      { sectionIndex: 1, situation: 'Jordan earns well but feels behind because of student loans', emoji: '😓' },
      { sectionIndex: 6, situation: 'Jordan made a debt payoff plan and can see the end date', emoji: '📅' },
      { sectionIndex: 10, situation: 'Jordan is deciding between renting and buying', emoji: '🤔' },
      { sectionIndex: 15, situation: 'Jordan is debt-free and building wealth intentionally', emoji: '🎓', callback: "From drowning in student loans to debt-free. Jordan proved it's possible." },
    ],
  },
];
```

Similar `characters.ts` files for `psychology/` and `space-astronomy/` courses, each with 2-3 characters.

### Character files per course:

| Course | File | Characters |
|--------|------|------------|
| personal-finance | `src/data/course/professions/personal-finance/characters.ts` | Alex (primary), Jordan (secondary) |
| psychology | `src/data/course/professions/psychology/characters.ts` | Dr. Maya (professor guide), Sam (student discovering biases) |
| space-astronomy | `src/data/course/professions/space-astronomy/characters.ts` | Captain Nova (astronaut mentor), Kai (amateur astronomer) |

---

## 2. Story Unlock Screen Component

### New file: `src/components/engagement/StoryUnlock.tsx`

A full-screen modal shown when a user completes all units in a section, IF a story unlock is defined for that section.

**Component structure:**
```
FullScreenModal (bg=character-themed color, fx='sparkle-dust')
  ├── Character avatar/emoji (animated scale-in)
  ├── Stage emoji + situation text (the callback line if present)
  ├── Narrative snippet (3-5 sentences, large readable text)
  ├── Gems reward display (+gems)
  └── Footer: GameButton "Continue"
```

**Props:**
```ts
interface StoryUnlockProps {
  unlock: StoryUnlock;
  character: CharacterArc;
  onDismiss: () => void;
}
```

**Behavior:**
- Plays `playSound('achievement')` on mount
- Awards gems via `useEngagementStore.getState().addGems()`
- 1.5s delay before dismiss button becomes active (matches existing celebration pattern)
- Uses `useBackHandler` for Android back button
- Records viewed unlocks in course store to prevent re-showing

**Design notes:**
- Must follow the "no walls of text" feedback rule — narrative is 3-5 SHORT sentences max
- Character avatar is large (80px emoji or mascot variant)
- Callback text (if present) appears as a highlighted quote above the narrative
- Uses same `FullScreenModal` + `GameButton` pattern as all other celebrations

---

## 3. Modifications to Existing Conversation Content

### Approach: Incremental content updates, NOT a rewrite

The existing conversation lessons already have characters (Alex, Jordan, Sarah/Rep, Narrator). The plan is to:

1. **Add `characterId` field to `ConversationNode` type** (optional, backward-compatible)
2. **Add callback lines** to conversation node messages where characters have appeared before
3. **Update character names for consistency** within each course (e.g., in personal-finance, "Rep" named "Sarah" stays as a one-off NPC, while Alex and Jordan become arc characters)

### Modify: `src/data/course/types.ts`

Add optional fields to `ConversationNode`:

```ts
export interface ConversationNode {
  id: string;
  speaker: string;
  message: string;
  nextNodeId?: string;
  options?: ConversationOption[];
  /** Links this node to a defined character arc for continuity tracking */
  characterId?: string;
  /** If true, this message contains a cross-unit callback reference */
  isCallback?: boolean;
}
```

### Modify: `src/data/course/types.ts` — `Lesson` interface

Add optional story unlock reference:

```ts
export interface Lesson {
  // ... existing fields ...
  /** Story unlock ID shown after this lesson completes (if it's the last in a section) */
  storyUnlockId?: string;
}
```

### Content updates per course (conversation nodes only)

For each course, update conversation lesson files to:

1. Add `characterId` to nodes featuring arc characters
2. Add 1-2 callback lines per section where a character references something from earlier
3. These are **message text changes only** — no structural changes to the conversation flow

**Example callback in a section-8 conversation node:**

```ts
{
  id: "pf-u8-conv-C2",
  speaker: "Alex",
  characterId: "pf-alex",
  message: "I never thought I'd be looking at index funds. Remember when I couldn't even track where my paycheck went? Now I'm actually investing.",
  isCallback: true,
  nextNodeId: "pf-u8-conv-C3",
}
```

**Estimated content changes:**
- Personal Finance: ~15 conversation lessons to add callbacks (2-3 callback lines each)
- Psychology: ~10 conversation lessons
- Space & Astronomy: ~10 conversation lessons
- Total: ~35 lessons, ~80 callback lines added

---

## 4. Story Unlock Trigger Logic

### Modify: `src/store/useCourseStore.ts`

Add tracking for viewed story unlocks and section completion detection.

**New state fields:**
```ts
interface CourseProgress {
  // ... existing fields ...
  /** Story unlock IDs that have been viewed */
  viewedStoryUnlocks?: string[];
}
```

**New action: `checkSectionComplete()`**

Called after `completeLesson()`. Checks if the just-completed lesson was the last lesson in its section. If so, and if there's an unviewed story unlock for that section, returns the unlock ID.

```ts
checkSectionComplete(unitIndex: number): string | null {
  // 1. Get the section index of the completed unit
  // 2. Check if ALL units in that section have ALL lessons completed
  // 3. Look up StoryUnlock for this courseId + sectionIndex
  // 4. Return unlock ID if not already in viewedStoryUnlocks
  // 5. Return null otherwise
}
```

### Modify: `src/components/lesson/LessonView.tsx` (or wherever lesson completion triggers celebrations)

After the existing celebration flow (BlueprintCelebration, CourseCompleteCelebration, etc.), add a check:

```ts
// After lesson result screen dismisses:
const storyUnlockId = useCourseStore.getState().checkSectionComplete(unitIndex);
if (storyUnlockId) {
  setShowStoryUnlock(storyUnlockId);
}
```

The StoryUnlock modal shows AFTER the lesson result screen and any BlueprintCelebration, but BEFORE returning to the course map.

---

## 5. Story Progress Indicator on Course Map

### Modify: `src/components/course/UnitHeader.tsx` (or equivalent section header component)

When a section has story unlock content:
- Show a small character avatar + "Story" badge on the section header
- After unlock is viewed: show a checkmark overlay
- Before unlock is available: show a lock icon

This is a **small visual indicator only** — not a new screen or modal. Uses the character's avatar emoji.

---

## 6. Story Unlock Definitions

### New file: `src/data/course/professions/personal-finance/story-unlocks.ts`

```ts
export const financeStoryUnlocks: StoryUnlock[] = [
  {
    id: 'pf-story-1',
    courseId: 'personal-finance',
    afterSectionIndex: 2,
    title: "Alex's First Budget",
    narrative: "Alex stared at the spreadsheet. Three months ago, half the paycheck vanished into food delivery. Now there was a plan — 50/30/20. It wasn't perfect, but it was real.",
    characterId: 'pf-alex',
    mascotPose: 'proud',
    gemsReward: 10,
  },
  {
    id: 'pf-story-2',
    courseId: 'personal-finance',
    afterSectionIndex: 5,
    title: "Jordan's Tax Surprise",
    narrative: "Jordan expected to owe. Instead, there was a refund — enough to make an extra student loan payment. Small win, but proof the system works.",
    characterId: 'pf-jordan',
    mascotPose: 'excited',
    gemsReward: 10,
  },
  // ... one per 2-3 sections, ~6-7 total per course
];
```

Similar files for psychology and space-astronomy.

**Total story unlocks:** ~5-7 per course, ~18-20 total across all courses.

---

## 7. Edge Cases

| Case | Handling |
|------|----------|
| User skipped units via placement test | Section completion check uses `completedLessons` — skipped units are treated as incomplete. User must go back to complete them to trigger story unlock. |
| User completes section out of order | `checkSectionComplete` checks ALL units in the section, regardless of order. Story unlock triggers when the last missing lesson is done. |
| Story unlock already viewed | `viewedStoryUnlocks` array prevents re-showing. User can revisit from a future "Story" tab if one is added later. |
| Course has no character arcs defined | `checkSectionComplete` returns null. No story unlocks appear. Mechanical engineering (admin-only) starts with no arcs. |
| Conversation lesson references a callback for a unit the user hasn't seen | The callback text is just a conversation message — it reads naturally even without prior context. No conditional logic needed in the conversation renderer. |
| DB sync for viewedStoryUnlocks | Stored in `completedLessons` schema extension in localStorage. Synced to `course_progress` table via existing `useDbSync` hook (the `completedLessons` JSON field already syncs). Add `viewedStoryUnlocks` to the `CourseProgress` interface and include in sync payload. |

---

## 8. Testing Strategy

### Unit tests (Vitest):

1. **`src/__tests__/data/character-arcs.test.ts`** — Validate all character arc data:
   - Every `characterId` referenced in story unlocks exists in the character roster
   - Every `sectionIndex` in stages exists in the course meta
   - No duplicate story unlock IDs
   - Narrative text is under 300 characters (no walls of text)

2. **`src/__tests__/store/story-unlock.test.ts`** — Test `checkSectionComplete()`:
   - Returns null when section not fully complete
   - Returns unlock ID when section just completed
   - Returns null when unlock already viewed
   - Handles placement test skips correctly

3. **`src/__tests__/data/conversation-callbacks.test.ts`** — Validate callback content:
   - Every `characterId` on a conversation node exists in the course's character roster
   - Callback lines (`isCallback: true`) reference events from earlier sections only

### Manual testing:
- Complete a full section in each course and verify story unlock appears
- Verify gems are awarded
- Verify unlock doesn't re-appear on refresh
- Verify callback text reads naturally in conversation lessons

---

## 9. Implementation Order

| Step | Task | Files | Depends On |
|------|------|-------|------------|
| 1 | Define types and data model | `src/data/course/character-arcs.ts` | ��� |
| 2 | Add optional fields to `ConversationNode` and `Lesson` | `src/data/course/types.ts` | Step 1 |
| 3 | Create character rosters for all 3 active courses | `professions/*/characters.ts` | Step 1 |
| 4 | Create story unlock definitions for all 3 courses | `professions/*/story-unlocks.ts` | Steps 1, 3 |
| 5 | Build `StoryUnlock` component | `src/components/engagement/StoryUnlock.tsx` | Step 1 |
| 6 | Add `viewedStoryUnlocks` to `CourseProgress` and `checkSectionComplete()` to store | `src/store/useCourseStore.ts`, `src/data/course/types.ts` | Steps 1, 4 |
| 7 | Wire story unlock trigger into lesson completion flow | `src/components/lesson/LessonView.tsx` (or result flow) | Steps 5, 6 |
| 8 | Add story progress indicator to course map section headers | `src/components/course/UnitHeader.tsx` | Steps 3, 6 |
| 9 | Update conversation content with `characterId` and callback lines | `professions/*/units/*.ts` (conversation lessons) | Steps 2, 3 |
| 10 | Write tests | `src/__tests__/` | Steps 1-9 |
| 11 | Re-run seed script | `npx tsx scripts/seed-content.ts` | Step 9 |
| 12 | Add StoryUnlock to `modal-gallery.html` | `modal-gallery.html` | Step 5 |

---

## 10. What This Plan Does NOT Include

- **No changes to the conversation renderer** (`ConversationView.tsx`) — callback lines are just message text
- **No new lesson types** — story unlocks are a reward screen, not a playable lesson
- **No database schema changes** — `viewedStoryUnlocks` piggybacks on the existing `course_progress.completedLessons` JSON sync
- **No new API routes** — all data is static TypeScript, all state is in Zustand
- **No character avatar images** — uses emoji avatars to start. Image avatars can be added later as a polish step

---

## Critic Resolutions

The following issues were identified during critical review and are now resolved in this plan.

### CR-1 [CRITICAL] `checkSectionComplete` has no concept of "section" in `useCourseStore`

**Issue:** Verified. `useCourseStore` has no section tracking. `completedLessons` is a flat `Record<string, LessonProgress>` with no section awareness. The section grouping exists ONLY in `CourseMap.tsx` (line 330-341) which groups units by `unit.sectionIndex` for display.

**Resolution:** Move `checkSectionComplete` OUT of the store and into the component layer where course data is already available. The function becomes a utility that takes course data as input:

```typescript
// New file: src/lib/story-utils.ts
import type { StoryUnlock } from '@/data/course/character-arcs';

export function findStoryUnlock(
  courseId: string,
  completedUnitIndex: number,
  courseUnits: Array<{ sectionIndex?: number }>,
  completedLessons: Record<string, { stars?: number }>,
  storyUnlocks: StoryUnlock[],
  viewedUnlockIds: string[],
): StoryUnlock | null {
  const completedUnit = courseUnits[completedUnitIndex];
  if (!completedUnit?.sectionIndex) return null;

  const sectionIndex = completedUnit.sectionIndex;

  // Find all units in this section
  const sectionUnits = courseUnits
    .map((u, i) => ({ unit: u, index: i }))
    .filter((u) => u.unit.sectionIndex === sectionIndex);

  // Check if ALL lessons in ALL units of the section are complete
  const allComplete = sectionUnits.every(({ unit, index }) => {
    // Check that each lesson in this unit has been completed
    // (unit.lessons array from course meta)
    return unit.lessons?.every((lesson) => {
      const key = `${courseId}-${index}-${lesson.id}`;
      return completedLessons[key]?.stars != null && completedLessons[key].stars > 0;
    });
  });

  if (!allComplete) return null;

  // Find the story unlock for this section
  const unlock = storyUnlocks.find(
    (u) => u.courseId === courseId && u.afterSectionIndex === sectionIndex
  );
  if (!unlock || viewedUnlockIds.includes(unlock.id)) return null;

  return unlock;
}
```

Call this from `LessonView.tsx` (or the lesson completion handler) where `courseData` is already loaded:

```typescript
// In lesson completion flow:
const unlock = findStoryUnlock(
  activeProfession,
  unitIndex,
  courseData,
  progress.completedLessons,
  storyUnlocks, // lazy-loaded per profession
  progress.viewedStoryUnlocks ?? [],
);
if (unlock) {
  setShowStoryUnlock(unlock);
}
```

This avoids putting course data knowledge in the store.

### CR-2 [CRITICAL] `viewedStoryUnlocks` must NOT piggyback on `completedLessons` JSON

**Issue:** Verified. `completedLessons` is `Record<string, LessonProgress>`. Stuffing `viewedStoryUnlocks: string[]` into this structure would break the type system and sync logic.

**Resolution:** Add `viewedStoryUnlocks` as a SEPARATE field on `CourseProgress`:

```typescript
// In useCourseStore.ts, add to CourseProgress interface:
interface CourseProgress {
  // ... existing fields ...
  viewedStoryUnlocks?: string[];
}
```

Add a store action to mark unlocks as viewed:
```typescript
markStoryUnlockViewed: (unlockId: string) => {
  set((state) => ({
    progress: {
      ...state.progress,
      viewedStoryUnlocks: [
        ...(state.progress.viewedStoryUnlocks ?? []),
        unlockId,
      ],
    },
  }));
},
```

For DB sync, add `viewedStoryUnlocks` to the `course-progress` API sync payload:
- In `useDbSync.ts`, include `viewedStoryUnlocks` in the course progress sync.
- In `api/course-progress/route.ts`, accept and persist `viewedStoryUnlocks` as a JSON array column (or within the existing JSON progress field).
- In the course-progress Zod schema, add: `viewedStoryUnlocks: z.array(z.string().max(50)).max(100).optional()`

Also update the merge function in `useCourseStore` persist config to include `viewedStoryUnlocks`.

### CR-3 [IMPORTANT] Content writing work is massive and needs explicit ownership

**Issue:** ~35 lessons, ~80 callback lines across 3 courses requires content writing expertise, not developer work. The CLAUDE.md content-writing-guide is not referenced.

**Resolution:** Separate the implementation into two phases:

**Phase A (Technical — developer work):**
Steps 1-8 from the implementation order: types, data model, component, store, trigger logic, course map indicator. Use PLACEHOLDER content for character arcs and story unlocks. Each placeholder should have:
- Real character names and course IDs
- `narrative: "PLACEHOLDER — needs content writer"`
- Correct `afterSectionIndex` values

**Phase B (Content — content writer work):**
Step 9: Write actual callback lines and story unlock narratives. Must follow `docs/content-writing-guide.md`. Review process: content writer drafts, developer reviews for format compliance, merged via PR. After content changes, run `npx tsx scripts/seed-content.ts`.

**Content writing constraints** (from content-writing-guide.md):
- Narratives: 3-5 SHORT sentences max (per the "no walls of text" feedback rule)
- Callback lines must be natural dialogue, not forced references
- Each character should have a consistent voice across all their appearances

### CR-4 [IMPORTANT] Seed script must be re-run after content changes

**Resolution:** Already mentioned in step 11 of the implementation order. Elevate to a bold callout:

> **IMPORTANT:** After any change to conversation lesson files or story unlock content, run `npx tsx scripts/seed-content.ts` to sync static files with the DB. This is required per CLAUDE.md.

### CR-5 [IMPORTANT] Story unlock gems need `VALID_GEM_SOURCES` entry

**Issue:** `addGems(gemsReward, ???)` has no specified source string, and whatever source is used won't be in the server allowlist.

**Resolution:** Use source string `'story_unlock'`. Add to `VALID_GEM_SOURCES` in `src/app/api/engagement/route.ts`:

```typescript
story_unlock: { maxEarn: 15, maxSpend: 0 },
```

This is a shared prerequisite with Plan 10 and is listed in `MASTER-PLAN.md`. The `addGems` call becomes:
```typescript
useEngagementStore.getState().addGems(unlock.gemsReward, 'story_unlock');
```

### CR-6 [MINOR] `viewedStoryUnlocks` needs server persistence

**Issue:** Without server sync, clearing localStorage means users see the same story unlock twice.

**Resolution:** Already addressed in CR-2 above — `viewedStoryUnlocks` is synced as part of course-progress. This replaces the plan's original "No database schema changes" claim. Update Section 10:

**Corrected:** This plan DOES require a sync change — `viewedStoryUnlocks` is included in the `course-progress` API sync payload as a JSON array field.

### CR-7 [MINOR] Character data files should be lazy-loaded

**Issue:** Character arc data and story unlock definitions could increase initial bundle size.

**Resolution:** Follow the existing lazy-loading pattern in `course-meta.ts`. Character arcs and story unlocks should be loaded via dynamic `import()` per profession:

```typescript
// In story-utils.ts or a new loader:
export async function loadCharacterData(professionId: string) {
  const mod = await import(`@/data/course/professions/${professionId}/characters`);
  return mod;
}

export async function loadStoryUnlocks(professionId: string) {
  const mod = await import(`@/data/course/professions/${professionId}/story-unlocks`);
  return mod;
}
```

These should be called at the same time as `loadUnitData` — when the user enters a lesson or views the course map. The data is small (a few KB per course) so this is mainly for correctness, not performance.

### CR-8 [CROSS-CUTTING] Celebration stacking with Plan 13

**Issue:** Completing the last lesson in a section could trigger: micro-celebration toast → lesson result screen → BlueprintCelebration → StoryUnlock → course map. That's 4 sequential screens.

**Resolution:** When a StoryUnlock is about to show, SUPPRESS the BlueprintCelebration for that unit. The story unlock IS the section-completion celebration and already awards gems. In `LessonView.tsx` lesson completion flow:

```typescript
const storyUnlock = findStoryUnlock(...);
if (storyUnlock) {
  // Skip BlueprintCelebration — StoryUnlock replaces it
  setShowStoryUnlock(storyUnlock);
} else {
  // Normal BlueprintCelebration flow
  setShowBlueprintCelebration(unitStats);
}
```

### CR-9 [CROSS-CUTTING] Dark mode not specified

**Resolution:** StoryUnlock component uses `FullScreenModal` which has its own dark background. Specify:
- Modal bg: character-themed color (e.g., `#1a365d` for Alex's finance arc)
- Text: white (both themes)
- Callback quote: `bg-white/10` (translucent overlay)
- Character emoji: displayed at 80px against the modal bg
