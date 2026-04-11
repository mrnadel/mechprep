# Implementation Plan Critique

> **Reviewer:** Critic Agent | **Date:** 2026-04-07 | **Scope:** All 6 gap plans (9-14)

Severity key: **[CRITICAL]** = will cause bugs/crashes, **[IMPORTANT]** = will cause UX problems or wasted work, **[MINOR]** = polish / best-practice issue.

---

## 1. Plan: Comeback Nudges (Gap 9)

### 1.1 [CRITICAL] `dismissedNudges` is never cleared — nudges will only show once EVER

The plan says (line 439): "`dismissedNudges` array is cleared on new day during `initDailyQuests()` — add `streak_nudge_day1` and `streak_nudge_day2` to the cleared set."

**Reality:** `initDailyQuests()` (line 241-263 of `useEngagementStore.ts`) does NOT clear `dismissedNudges`. It resets `dailyChestClaimed`, `freezeUsedToday`, and quest arrays, but `dismissedNudges` is never touched. The plan assumes clearing behavior that does not exist. If a user dismisses a Day-1 nudge once, they will never see it again — on any day — because `dismissedNudges` is persisted to localStorage and never emptied.

**Fix required:** Either (a) add `dismissedNudges: []` to the `initDailyQuests` set() call, or (b) change the dismissal check to compare dates instead of relying on array clearing.

### 1.2 [CRITICAL] `checkNudges` reads `progress.lastActiveDate` from `useStore` — but cron uses `userProgress.lastActiveDate` from DB

The client-side `checkNudges` action reads `useStore.getState().progress.lastActiveDate` (the practice store). The cron route reads `userProgress.lastActiveDate` from the `user_progress` DB table. These are DIFFERENT values:

- `useStore.progress.lastActiveDate` is the practice-mode last active date
- `useCourseStore.progress.lastActiveDate` is the course-mode last active date
- The DB `userProgress.lastActiveDate` syncs from the practice store

If a user only does course lessons (no practice sessions), the practice store's `lastActiveDate` may be stale while the course store's is current. The cron would send a nudge push notification to a user who was active yesterday via course mode. The client-side nudge banner would also show incorrectly.

**Fix required:** `checkNudges` should read from BOTH stores: `Math.max(useStore lastActiveDate, useCourseStore lastActiveDate)`. The cron should join against both `user_progress` and `course_progress` tables to get the true last-active date.

### 1.3 [IMPORTANT] Mascot poses `'waving'` and `'worried'` do not exist

The plan specifies `<MascotWithGlow pose="waving" size={48} />` and `pose="worried"`. Looking at `Mascot.tsx`, the valid `MascotPose` values are: `neutral`, `excited`, `worried`, `sleeping`, `winking`, `sad`, `thinking`, `celebrating`, `laughing`, `proud`, `sword`, `torch`, `explorer`, `pro`, `champion`, `out-of-hearts`, `reward-gems`, `upgrade-pro`, `chest-reward`, `level-up`, `streak`, `almost-there`, `mastered`, `on-fire`, `loading`, `error`, `offline`, `empty-state`, and space poses.

`worried` exists (good), but `waving` does NOT exist. This will cause a TypeScript error.

**Fix:** Use `winking` instead of `waving` for the Day-1 gentle nudge.

### 1.4 [IMPORTANT] Friend nudge cron needs a new DB column but plan doesn't fully specify migration

The plan mentions "Add a `last_friend_nudge_date` column check" but does not specify which table gets this column, what the default is, or the migration step. This column doesn't exist in the schema. Without this, the friend nudge will spam the same friend every day the at-risk user remains inactive.

**Fix:** Add explicit schema change: add `lastFriendNudgeDate` text column to `push_subscriptions` or a new `nudge_tracking` table. Include the `npm run db:push` step.

### 1.5 [IMPORTANT] The plan references `useEngagementActions().dismissNudge` but the action signature takes `NudgeType`

The plan's StreakNudgeBanner component calls `const { dismissNudge } = useEngagementActions()` and passes `'streak_nudge_day1'` or `'streak_nudge_day2'`. However, those values don't exist in the current `NudgeType` union. The plan's Phase 1 adds them to the type definition, but the plan must also update the `EngagementActions` interface type annotation if `dismissNudge` uses `NudgeType` as its parameter type.

**Fix:** Verify the `dismissNudge` action parameter type matches the expanded `NudgeType` union. This is likely fine since the plan updates `NudgeType`, but should be explicitly called out.

### 1.6 [MINOR] Sound plays on banner mount regardless of user sound preference

The `useEffect` in the banner calls `playSound('nudgeGentle')` on mount. While `playSound` already checks `useSoundStore.getState().enabled`, this is fine. However, auto-playing sound on page load (not user interaction) may be blocked by browsers. The AudioContext may be suspended.

**Fix:** Acceptable risk since `playSound` handles suspended context with `ctx.resume()`, but note this may silently fail on first visit before any user interaction.

### 1.7 [MINOR] Plan doesn't account for the 6th store: `useHeartsStore`

The project overview mentions 5 stores, but the actual codebase has a 6th store: `useHeartsStore` (imported in `useEngagementStore.ts` and `useDbSync.ts`). The nudge plan doesn't interact with hearts, so this is fine, but the planner clearly didn't notice this store exists.

---

## 2. Plan: Daily Reward Calendar (Gap 10)

### 2.1 [CRITICAL] `addGems` source `'daily_reward_calendar'` will be REJECTED by the server

The server's `VALID_GEM_SOURCES` allowlist in `api/engagement/route.ts` (lines 61-73) does NOT include `'daily_reward_calendar'` or `'daily_reward_bonus_overflow'` or `'mystery_reward'`. The `getSourceLimits` function only accepts hardcoded sources and `level_up_*` / `streak_milestone_*` patterns. When `useDbSync` syncs these gem transactions to the server, they will be silently dropped by `validateTransactions()`.

This means: gems appear client-side but are never persisted to the DB. If the user clears localStorage or logs in from another device, the gems vanish.

**Fix required:** Add these sources to `VALID_GEM_SOURCES`:
```
daily_reward_calendar:    { maxEarn: 25,  maxSpend: 0 },
daily_reward_bonus_overflow: { maxEarn: 15, maxSpend: 0 },
mystery_reward:           { maxEarn: 50,  maxSpend: 0 },
```

### 2.2 [CRITICAL] `engagementSyncSchema` does not include `dailyRewardCalendar` — sync will fail

The Zod validation schema in `validation.ts` (line 125-157) defines the exact shape accepted by `POST /api/engagement`. It does not include a `dailyRewardCalendar` field. If the plan adds this field to the sync payload in `useDbSync.ts`, the Zod `.safeParse()` will FAIL because of unrecognized keys (Zod strict mode rejects extra fields unless `.passthrough()` is used).

Actually, looking more carefully: the `engagementSyncSchema` does NOT use `.strict()` or `.passthrough()` — it uses plain `z.object()`. In Zod 4, `z.object()` strips unknown keys by default. So the `dailyRewardCalendar` field would be silently stripped from the parsed data, not cause a 400 error. But it also means the calendar data is never saved to the DB.

**Fix required:** Either (a) add `dailyRewardCalendar` to the Zod schema AND the API POST handler, or (b) store calendar state in a separate API endpoint, or (c) accept that calendar is client-only (localStorage) with no server backup. Option (c) is simplest and may be fine for MVP, but the plan explicitly says it uses server sync — so option (a) is what the plan intends.

### 2.3 [CRITICAL] The plan references `api/engagement/route.ts` for storing `dailyRewardCalendar` in a JSONB column on `user_progress` — but `user_progress` has no such column

The plan's Phase 7.3 says: "Add a `daily_reward_calendar` JSONB column to `user_progress`". This requires a DB migration (`npm run db:push`). The plan mentions this in step 16 ("Schema push"), but the API POST handler (lines 228-249 of `engagement/route.ts`) would need to be updated to include this column in the upsert. The plan says to do this but doesn't show the full change to the `engagementData` object.

**Fix:** The implementation must update: (1) `schema.ts` — add column, (2) `validation.ts` — add to Zod schema, (3) `engagement/route.ts` POST handler — include in upsert, (4) `engagement/route.ts` GET handler — return in response, (5) `useDbSync.ts` — add to sync payload and hydration.

### 2.4 [IMPORTANT] `hashString` function does not exist in the codebase

The mystery reward selection uses `const seed = hashString(...)` but there is no `hashString` function exported from any module. The closest is in `quest-engine.ts`, but searching for `hashString` only finds it in the plan itself and existing usage in `quest-engine.ts`.

**Fix:** Either import `hashString` from `quest-engine.ts` (verify it's exported), or implement a simple hash:
```ts
function hashString(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}
```

### 2.5 [IMPORTANT] 7-day grid overflow on narrow screens

The calendar renders 7 `DayCircle` components in a flex row with `gap-1`. On screens narrower than 375px (iPhone SE, small Androids), 7 circles with labels will overflow. Each circle needs minimum ~40px width + 4px gap = 308px minimum, which fits, but the bonus labels on milestone days (4, 7) add extra width/height that may overflow vertically in compact mode.

**Fix:** Add `min-w-0` to each `DayCircle` and ensure the component uses `flex-shrink` properly. Test at 320px width. Consider using `overflow-x-auto` as a safety net.

### 2.6 [IMPORTANT] Calendar resets independently from practice streak — this WILL confuse users

The plan explicitly says: "A streak freeze protects the practice streak but NOT the reward calendar." Users will not understand why their streak is preserved (via freeze) but their reward calendar reset. There's no UI explanation for this distinction.

**Fix:** Either (a) tie the calendar to the practice streak (reset when streak breaks, preserved when freeze is used), or (b) add a clear "Calendar resets if you miss a day" tooltip/explanation in the UI. Option (a) is simpler and less confusing.

### 2.7 [IMPORTANT] Gem economy inflation not gated

The plan adds ~80 gems/week from the calendar on top of the existing ~70 gems/week from daily chests. That's a +114% increase in gem income. The plan acknowledges this ("Monitor for inflation via admin analytics") but doesn't propose any balancing. Shop prices remain unchanged, meaning users reach the gem cap and stop caring about gems much faster.

**Fix:** At minimum, document the expected inflation impact and suggest adjusting shop prices in a follow-up. Consider making the calendar replace the daily chest rather than stack with it.

### 2.8 [MINOR] `isFirstTime` logic prevents Day 1 claim for new users

The claim modal has `const isFirstTime = calendar.lastClaimDate === null; if (!shouldShow || isFirstTime) return null;`. This means new users never see the claim modal. They can only claim via the QuestBoard compact calendar. The plan says "User claims their first reward when they visit the quests page" — but new users may not visit quests on their first day. The first-day experience should include the calendar introduction.

**Fix:** Show a simplified "Welcome to Daily Rewards!" flow for first-time users, or at minimum show the calendar on the home page (not just quests page) for the first interaction.

### 2.9 [MINOR] `useIsDark()` is imported but is actually a store hook

The plan references `const isDark = useIsDark()` in `DailyRewardCalendar.tsx`. Checking the codebase, `useIsDark` comes from `useThemeStore.ts`. This exists but the plan should import from the correct location.

---

## 3. Plan: Story Narrative Arc (Gap 11)

### 3.1 [CRITICAL] `checkSectionComplete` has no concept of "section" in `useCourseStore`

The plan proposes a `checkSectionComplete(unitIndex)` action on `useCourseStore`. However, looking at `useCourseStore.ts`, there is no section tracking at all. The store tracks `completedLessons` as a flat `Record<string, LessonProgress>` keyed by lesson ID. It has no concept of which units belong to which section.

The section grouping exists ONLY in the view layer: `CourseMap.tsx` (line 330-341) groups units by `unit.sectionIndex` for display purposes. The store doesn't know about sections.

To implement `checkSectionComplete`, the action would need to:
1. Load the course metadata (from `getCourseMetaForProfession`)
2. Find all units with the matching `sectionIndex`
3. Check if all lessons in all those units are completed

This is more complex than the plan suggests and requires reading course data in the store, which currently only happens in `CourseMap` and `LessonView`.

**Fix:** Either (a) pass the full course data and section mapping to `checkSectionComplete`, or (b) perform the check in the component layer (LessonView or CourseMap) where course data is already available, and just call `markStoryUnlockViewed(unlockId)` on the store.

### 3.2 [CRITICAL] `viewedStoryUnlocks` piggybacks on `completedLessons` JSON — this is a hack

The plan says: "`viewedStoryUnlocks` piggybacks on the existing `course_progress.completedLessons` JSON sync." But `completedLessons` is `Record<string, LessonProgress>` — it maps lesson IDs to progress objects. Stuffing `viewedStoryUnlocks: string[]` into a field designed for a different shape will break the type system and potentially break the sync logic in `useDbSync.ts` and `api/course-progress/route.ts`.

**Fix:** Add `viewedStoryUnlocks` as a separate field on `CourseProgress`. Include it in the `course-progress` API sync payload. This is clean and doesn't abuse the existing data structure.

### 3.3 [IMPORTANT] ~80 callback lines across ~35 lessons is massive content work — no timeline or content writer assigned

The plan estimates "~35 lessons, ~80 callback lines added" across 3 courses. Each callback line requires understanding the character's arc position and writing dialogue that naturally references earlier events. This is NOT a developer task — it requires a content writer. The plan doesn't mention who writes this content, how long it takes, or how it's reviewed.

The CLAUDE.md says to "Read `docs/content-writing-guide.md` before writing or editing any course content." The plan doesn't reference this guide.

**Fix:** Separate the content work into its own phase with clear ownership. The technical implementation (types, store, component) can land first, with placeholder content. Content updates should follow the content writing guide and be seeded via `npx tsx scripts/seed-content.ts`.

### 3.4 [IMPORTANT] `ConversationNode` changes require updating content files, but no mention of re-running seed

Adding `characterId` and `isCallback` to `ConversationNode` and then modifying conversation lesson files means the TypeScript course data files change. Per CLAUDE.md: "After changing content, always re-run the seed: `npx tsx scripts/seed-content.ts`." The plan mentions this in step 11 but doesn't emphasize that failing to do so means the DB and static files are out of sync.

### 3.5 [IMPORTANT] Story unlock gems use `addGems` with unspecified source

The `StoryUnlock` component calls `addGems(gemsReward, ???)` but the plan doesn't specify the gem source string. Like the Daily Rewards plan, this source must be added to `VALID_GEM_SOURCES` in the engagement API route, or the gems will be silently dropped on server sync.

**Fix:** Define source as `'story_unlock'` and add to `VALID_GEM_SOURCES` with `{ maxEarn: 15, maxSpend: 0 }`.

### 3.6 [MINOR] The plan says "No database schema changes" — but `viewedStoryUnlocks` needs to sync

If `viewedStoryUnlocks` needs to persist across devices (it should — otherwise users see the same story unlock twice after clearing localStorage), it must sync to the server. This requires either a DB schema change or inclusion in an existing JSON sync payload.

### 3.7 [MINOR] Character data files increase initial bundle if not lazy-loaded

Character arcs and story unlock files are imported at the top of components. If the data files are large (especially with 6-7 unlocks per course, each with multi-sentence narratives), they add to the bundle. Should be lazy-loaded per profession, similar to `loadUnitData`.

---

## 4. Plan: Celebration Share Moments (Gap 12)

### 4.1 [CRITICAL] `StreakMilestone.tsx` does not have access to `displayName`

The plan adds `const displayName = useStore((s) => s.progress.displayName) || 'Learner';` to `StreakMilestone.tsx`. However, `displayName` lives in `useStore.progress.displayName` for practice mode AND `useCourseStore.progress.displayName` for course mode. The practice store may not have `displayName` set if the user only does course lessons and registered with Google OAuth (where `displayName` is set on course store at registration).

Actually, checking the schema: `useStore.progress` has `displayName` but it may be empty. `useCourseStore.progress.displayName` is also present. Both may differ or one may be empty.

**Fix:** Use a consistent source. The user's canonical display name should come from the session: `useSession().data?.user?.name`. Or create a shared utility: `getDisplayName()` that checks multiple sources with fallbacks.

### 4.2 [IMPORTANT] Share card API route lacks authentication — anyone can generate cards with any name

The `GET /api/share-card?userName=...` endpoint takes the username as a query parameter with no authentication. Anyone can generate share cards with any text. This enables:
- Impersonation: generate a card saying "Elon Musk hit a 100-day streak on Octokeen"
- Abuse: generate cards with offensive userNames

**Fix:** Either (a) require authentication and read `userName` from the session, or (b) rate-limit the endpoint, or (c) accept the risk since the card clearly shows "octokeen.com" branding and abuse is limited. Option (c) is probably fine for MVP — the existing certificate API has the same pattern.

### 4.3 [IMPORTANT] Achievement celebration discovery is incomplete

The plan says: "Investigation step: Search for where `checkNewAchievements` results are displayed." It then lists Option A (new modal) and Option B (toast). This is a gap in the plan — the planner didn't actually investigate. Looking at the codebase, `checkNewAchievements` is in `useStore.ts`. Achievement unlocks are handled in the session/lesson completion flow but there is no dedicated `AchievementCelebration` full-screen modal. The plan needs to determine the actual UX before implementation.

**Fix:** Investigate the existing achievement display flow and decide whether to add a full-screen modal or a share icon on the existing achievement toast/notification.

### 4.4 [IMPORTANT] No Satori `<img>` support for mascot — plan acknowledges but doesn't solve

The plan notes: "No mascot on share cards — the mascot is a PNG and cannot be easily embedded in `ImageResponse` JSX." This is correct — Satori (used by `next/og`) doesn't support local `<img>` tags. But share cards without the mascot look generic and unbranded. The existing certificate route (`/api/certificate`) also lacks the mascot.

**Fix for later:** The mascot PNGs could be base64-inlined or served from a public URL and fetched via `fetch()` within the route handler. Satori supports `<img>` with `src` as a URL or base64 data URI. This is a polish item but should be noted.

### 4.5 [MINOR] `navigator.clipboard.writeText` fallback doesn't show feedback to user

The plan's `shareCard()` function falls back to clipboard copy, but the ShareButton component doesn't show a "Copied!" toast when the clipboard fallback is used. The function silently succeeds or fails. The user gets no feedback.

**Fix:** Return a status from `shareCard()` indicating the method used (`'shared'`, `'copied'`, `'failed'`). The ShareButton should show "Copied to clipboard!" when the clipboard fallback is used.

### 4.6 [MINOR] Desktop users get a poor experience

Most desktop browsers don't support Web Share API. The plan falls through to clipboard, but there's no way for desktop users to see or download the share card image. They just get text copied. The plan should add a "Download Image" button alongside "Share" for desktop.

---

## 5. Plan: Mid-Lesson Micro-Celebrations (Gap 13)

### 5.1 [CRITICAL] Streak celebration triggers at 3, 5, 7 — but the condition `newStreak >= 3 && newStreak % 2 === 1` is wrong for streak 4, 6

The condition `newStreak >= 3 && newStreak % 2 === 1` fires at 3, 5, 7, 9, ... This means a streak of 4 or 6 correct does NOT trigger a celebration. This is intentional per the plan, but the plan's text content section says `streak (4): "4 in a row!"` — implying streak 4 should show a message. The code and the design spec contradict each other.

**Fix:** Decide: either fire at every streak >= 3 (with `newStreak >= 3` only), or fire at 3, 5, 7 and remove the "4 in a row!" text from the design spec.

### 5.2 [IMPORTANT] MicroCelebration and AdaptiveToast can visually overlap

The plan claims: "They should never overlap because AdaptiveToast disappears when the user answers, and MicroCelebration appears after." But this is not accurate:

- AdaptiveToast is rendered when `mode !== 'normal'` — it shows DURING the question when the user is in a struggling/cruising adaptive state. It uses `AnimatePresence` with exit animation.
- MicroCelebration fires on `handleAnswer` (streak) or `handleContinue` (halfway/last-question).

If the user is in "cruising" mode (100% accuracy) and gets a 3-correct streak, both AdaptiveToast ("You're on fire! Bonus XP!") and MicroCelebration ("3 in a row — on fire!") could be visible at the same time — they're different components with different lifecycles, positioned in the same area.

**Fix:** Add a guard: if AdaptiveToast is showing "cruising" mode, suppress the streak MicroCelebration (they convey similar messages anyway). Or use a shared toast slot that only shows one at a time.

### 5.3 [IMPORTANT] `handleContinue` milestone detection references line numbers that may be stale

The plan references specific line numbers in `LessonView.tsx` (line ~114, ~410, ~459, ~731, ~982). Line numbers in a large actively-developed file are unreliable reference points. The plan should identify locations by function name and surrounding code context rather than line numbers.

**Fix:** Reference by function name and code context: "Inside the `handleAnswer` callback, after the `setRecentAnswers(prev => ...)` call" rather than "line ~410".

### 5.4 [IMPORTANT] Teaching cards should not count toward correct streak — but guard is incomplete

The plan's edge cases table says: "Teaching cards auto-submit as correct but should NOT count toward the correct streak. Add a guard: `if (isTeaching) return;` before streak logic."

But the plan's implementation in section B (LessonView.tsx changes) does NOT include this guard. The streak tracking code is added to `handleAnswer` without checking if the current question is a teaching card. This will inflate streak counts.

**Fix:** Add the teaching card guard explicitly in the implementation code, not just in the edge cases table.

### 5.5 [IMPORTANT] `glowIntensity` hex conversion has a bug

The plan's glow style calculation:
```ts
boxShadow: `0 0 ${Math.round(glowIntensity * 12)}px ${color}${Math.round(glowIntensity * 60).toString(16).padStart(2, '0')}`
```

When `glowIntensity = 0.5`, `Math.round(0.5 * 60) = 30`, `30.toString(16) = '1e'` — this produces a valid hex alpha. But when `glowIntensity = 1.0`, `Math.round(1.0 * 60) = 60`, `60.toString(16) = '3c'` — only 38% opacity, which is dim for a "max glow." The scale should go up to `FF` (255).

**Fix:** Use `Math.round(glowIntensity * 128)` for a range up to 80% opacity, or `Math.round(glowIntensity * 200)` for stronger glow.

### 5.6 [MINOR] No `AnimatePresence` wrapper around `MicroCelebration`

The plan's render code in LessonView is:
```tsx
{celebration && <MicroCelebration key={celebration.key} ... />}
```

But the component itself uses exit animations. Without wrapping in `<AnimatePresence>`, the exit animation will never play — the component is simply unmounted when `celebration` becomes null.

**Fix:** Wrap in `<AnimatePresence>`:
```tsx
<AnimatePresence>
  {celebration && <MicroCelebration key={celebration.key} ... />}
</AnimatePresence>
```

---

## 6. Plan: Accessibility Gaps (Gap 14)

### 6.1 [IMPORTANT] `eslint-plugin-jsx-a11y` may already be installed

The plan says to install `eslint-plugin-jsx-a11y`, but `package-lock.json` was found in the grep results for this plugin, suggesting it may already be a dependency. Installing it again is harmless but the ESLint config extension (`extends: ['plugin:jsx-a11y/recommended']`) may conflict with the existing config.

**Fix:** Check `package.json` and the ESLint config first before adding.

### 6.2 [IMPORTANT] Focus management uses `document.querySelector` — fragile in React

The plan's focus management approach:
```tsx
requestAnimationFrame(() => {
  const continueBtn = document.querySelector('[data-testid="continue-button"]') as HTMLElement;
  continueBtn?.focus();
});
```

This is brittle. If the component hasn't rendered yet (React may batch updates), the `querySelector` returns null. Using `requestAnimationFrame` is better than nothing but not reliable in React 19 with concurrent features.

**Fix:** Use React refs instead:
```tsx
const continueBtnRef = useRef<HTMLButtonElement>(null);
// After answer: continueBtnRef.current?.focus();
```
Pass the ref down to the GameButton via `forwardRef`.

### 6.3 [IMPORTANT] Focus trap implementation is naive — doesn't handle all edge cases

The plan's focus trap for the exit dialog manually queries `button` elements and traps Tab. This misses:
- Links (`<a>`) inside the dialog
- Input elements (if any are added later)
- Elements with `tabIndex`
- The Escape key should close the dialog (not just trap focus)

**Fix:** Use a proven focus trap library like `focus-trap-react` or implement a more robust solution that queries all focusable elements (`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`).

### 6.4 [IMPORTANT] `vitest-axe` may not exist or may not be compatible

The plan suggests using `vitest-axe` for automated accessibility testing. This package may not exist or may be outdated. The standard approach is `@axe-core/react` for runtime checks or `jest-axe` adapted for Vitest.

**Fix:** Verify `vitest-axe` exists on npm. If not, use `axe-core` directly:
```tsx
import { axe } from 'axe-core';
const results = await axe(container);
expect(results.violations).toHaveLength(0);
```

### 6.5 [IMPORTANT] Keyboard reorder with ArrowUp/Down — Framer Motion `<Reorder>` may fight the keyboard changes

The plan adds `onKeyDown` handlers to reorder items in `OrderStepsCard` and `RankOrderCard`. But Framer Motion's `<Reorder.Group>` and `<Reorder.Item>` manage their own state for drag-and-drop. Calling `setCurrentOrder(newOrder)` from a keyboard handler may conflict with Framer Motion's internal state, causing visual glitches or the order snapping back.

**Fix:** Test this interaction carefully. May need to use Framer Motion's `onReorder` callback or `values` prop to ensure the keyboard-driven reorder is properly synchronized with the animation state.

### 6.6 [MINOR] The audit doesn't mention `ConversationView`, `SpeedRoundView`, `TimelineView`, `CaseStudyView`

These are 4 additional lesson type components imported in `LessonView.tsx` (lines 23-26) that have their own interactive elements. The accessibility plan only audits the standard card components. The non-standard lesson types may have their own accessibility gaps (conversation option buttons, speed round timers, timeline choices, case study checkpoints).

**Fix:** Extend the audit to include all 4 non-standard lesson type components.

### 6.7 [MINOR] `MicroCelebration.tsx` from Gap 13 is listed as needing `role="status"` but it doesn't exist yet

The accessibility plan lists `MicroCelebration.tsx` as needing `role="status" aria-live="polite"`. Since Gap 13 creates this file, the accessibility plan should note it as a dependency: "Ensure Gap 13 implementation includes these attributes from day one."

---

## 7. Cross-Cutting Concerns

### 7.1 [CRITICAL] Gem source allowlist is a blocker for 3 plans

Plans 10 (Daily Rewards), 11 (Story Narrative), and potentially 9 (Comeback Nudges if they add gem rewards) all call `addGems()` with new source strings. ALL of these will be silently dropped by the server-side `VALID_GEM_SOURCES` allowlist in `api/engagement/route.ts`. This is the single most impactful cross-cutting issue.

**Fix:** Create a shared task to update `VALID_GEM_SOURCES` with all new gem sources across all plans BEFORE implementing any of them.

### 7.2 [CRITICAL] Engagement sync payload (`useDbSync` + `engagementSyncSchema`) needs updating for plans 9 and 10

Both plans 9 and 10 add new state to `useEngagementStore` (`nudge` state and `dailyRewardCalendar`). Neither state is included in the current engagement sync payload or Zod validation schema. Both planners say "add to sync" but don't address the Zod schema gate.

**Fix:** Single coordinated update to: `validation.ts` (add both new fields to `engagementSyncSchema`), `engagement/route.ts` (handle new fields in GET and POST), `useDbSync.ts` (add to sync payload and hydration).

### 7.3 [IMPORTANT] Modal stacking / ordering across all 6 features

The home page (`page.tsx`) already has 8+ lazy-loaded overlay modals. Plans 9, 10, and 11 each add more. The current overlay rendering order (lines 249-254 of page.tsx) is:
1. WelcomeBack (comeback flow)
2. LeagueWinner
3. StreakFreeze
4. StreakContinued
5. StreakMilestone
6. LevelUpCelebration
7. BlueprintCelebration
8. CourseCompleteCelebration

New additions from plans:
9. StreakNudgeBanner (Plan 9) — NOT a modal, a banner
10. DailyRewardClaimModal (Plan 10) — full-screen modal
11. StoryUnlock (Plan 11) — full-screen modal (from lesson completion, not home page)

There's no centralized modal queue or priority system. If a user returns after 2 days absence AND it's a new day for daily rewards AND they just promoted in league, they could see: WelcomeBack -> LeaguePromotion -> DailyRewardClaimModal. Each plan adds guards against the others, but the guards are ad-hoc and scattered across components. A modal queue system would be much more robust.

**Fix:** Consider implementing a simple modal queue in the engagement store:
```ts
modalQueue: Array<{ type: string; props: Record<string, unknown> }>;
showNextModal: () => void;
```
This ensures modals show one at a time in priority order.

### 7.4 [IMPORTANT] Plans 10 and 9 both modify `engagement-init.ts` — ordering matters

Plan 9 adds `checkNudges()` after `checkComebackFlow()`. Plan 10 adds `checkDailyRewardCalendar()` after `checkComebackFlow()`. Both run in the same `useEffect` in `engagement-init.ts`. The order matters:
1. `checkComebackFlow` must run FIRST (it gates whether nudges and calendar show)
2. `checkDailyRewardCalendar` should run BEFORE `checkNudges` (calendar state determines if claim modal shows, which affects whether nudge banner should show)

**Fix:** Define explicit ordering in the init file. Add a comment block documenting the intended sequence.

### 7.5 [IMPORTANT] `useEngagementStore` `partialize` and `merge` functions must be updated for EVERY new state field

Plans 9 and 10 add `nudge` and `dailyRewardCalendar` to `EngagementState`. Both plans say "Add to `partialize` persist config and `merge` function." The merge function (lines 863-907) explicitly reconstructs each field with defaults. If a new field is added to the state interface but NOT to the merge function, it will be lost on every app reload (the merge function replaces the default with `undefined`).

This is a subtle bug that's easy to miss. The merge function must include:
```ts
nudge: persisted.nudge ? { ...defaults.nudge, ...persisted.nudge } : defaults.nudge,
dailyRewardCalendar: persisted.dailyRewardCalendar ? { ...defaults.dailyRewardCalendar, ...persisted.dailyRewardCalendar } : defaults.dailyRewardCalendar,
```

**Fix:** Both plans should show the exact merge function update, not just "add to merge."

### 7.6 [IMPORTANT] Dark mode support is mentioned but not detailed in any plan

Plans 9, 10, and 13 mention "must support dark mode" or reference `dark:` Tailwind classes. But none of them specify the actual dark mode colors for their new components. The existing components use `useIsDark()` from `useThemeStore.ts` and Tailwind `dark:` classes extensively. Each new component needs explicit dark mode variants.

**Fix:** Each plan's UI section should include dark mode color specifications alongside the light mode colors.

### 7.7 [IMPORTANT] No plan considers the interaction between micro-celebrations (Plan 13) and story unlocks (Plan 11)

If a user completes the last lesson in a section, they could see: micro-celebration toast -> lesson result screen -> BlueprintCelebration -> StoryUnlock -> return to course map. That's 4 sequential screens/overlays. This is too many celebration interruptions in a row.

**Fix:** If a StoryUnlock is about to show, suppress the BlueprintCelebration for that unit (the story unlock IS the section-completion celebration). Or combine them into one screen.

### 7.8 [MINOR] All 6 plans mention `modal-gallery.html` — good

All plans correctly note that new screens/modals must be added to `modal-gallery.html` per CLAUDE.md requirements. This is good compliance.

### 7.9 [MINOR] No plan mentions the `useSoundStore` settings page integration

Plans 9, 10, and 13 add new sounds. Users who have sounds disabled via `useSoundStore` will be fine (the `playSound` function checks). But the settings page should potentially list what sounds exist for transparency. Minor.

---

## 8. Missing Features / Considerations

### 8.1 No plan considers multi-device sync conflicts for new client state

Plans 9 and 10 add new client-side state (`nudge`, `dailyRewardCalendar`). If a user uses the app on both phone and laptop:
- Phone: claims Day 3 reward, dismisses Day-1 nudge
- Laptop: still shows Day 2 reward calendar, shows Day-1 nudge

The `useDbSync` hydration would need conflict resolution for these new fields. Plan 10's hydration logic (compare `lastClaimDate`) is good but Plan 9 has no hydration strategy for nudge state at all.

### 8.2 No plan considers service worker cache invalidation

The service worker at `public/sw.js` caches assets. New components, sounds, and images added by these plans may be served stale if the SW cache isn't updated. This is a general deployment concern but worth noting.

### 8.3 No plan considers Mixpanel analytics events beyond cursory mentions

Plans should define a clear analytics event schema for each feature. Currently only Plan 9 sketches out `trackEvent('nudge_shown', ...)`. Plans 10-14 should similarly define what events to track for measuring feature effectiveness.

### 8.4 The accessibility plan (Gap 14) should be implemented BEFORE the other 5 plans

Gaps 9-13 add new UI components. If accessibility is implemented last, those new components will also have accessibility gaps. If implemented first, the patterns established by the accessibility work (aria-labels, keyboard handling, focus management) will naturally be followed when building new components.

**Recommendation:** Re-order implementation: Gap 14 first, then 13 (micro-celebrations use the a11y patterns), then 9, 10, 11, 12.

---

## 9. Questions That Need Answers

1. **Plan 10:** Should the daily reward calendar replace the existing daily quest chest, or stack with it? The 114% gem income increase needs a product decision.

2. **Plan 11:** Who writes the ~80 callback lines and ~20 story unlock narratives? Is there a content writer, or is this developer work? What's the review process?

3. **Plan 9:** The friend nudge cron sends push notifications to friends. Is there a user consent mechanism? Can users opt out of receiving "your friend is about to lose their streak" notifications?

4. **Plan 12:** Should share cards include the mascot? The current certificate doesn't have one, but share cards for social media really should have branded imagery. Is there a mascot SVG available?

5. **All plans:** What is the implementation priority order? The plans estimate ~20 hours total work. Should they be implemented sequentially or can some be parallelized?

6. **Plan 14:** Is WCAG AA the target or WCAG AAA? The plan says AA but some items (like focus-visible) are AAA criteria. Clarify the compliance target.

7. **Plan 10:** The mystery reward "Calendar Collector" frame — does `AvatarFrame` component exist for rendering custom frames? Or is the frame system purely cosmetic labels?
