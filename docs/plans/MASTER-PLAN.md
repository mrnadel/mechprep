# Master Implementation Plan — Octokeen 96 to 100 Roadmap

> **Created:** 2026-04-07 | **Updated:** 2026-04-07 (unified, post-critique) | **Scope:** 10 features across 2 priority tiers
>
> This is the **single source of truth** for the full roadmap. All 10 gap plans, both critique rounds (42 + 40+ issues), and all cross-cutting concerns are unified here.

---

## 1. Feature Inventory

| # | Gap | Feature | Plan File | Priority | Est. Hours | Status |
|---|-----|---------|-----------|----------|-----------|--------|
| 4 | Mid-Session Difficulty Adaptation | Cruising XP bonus, sound, glow | `plan-adaptive-difficulty.md` | HIGH | 6 | Plan + critique resolved |
| 5 | Friend Quests & Activity Feed | Co-op quests, progress API, feed | `plan-friend-quests.md` | HIGH | 5.5 | Plan + critique resolved |
| 6 | Time-Limited XP Events | Practice-mode integration, tests, banner polish | `plan-xp-events.md` | HIGH | 5 | Plan + critique resolved |
| 8 | Shareable Certificates | Design upgrade, LinkedIn fix, share page | `plan-certificates.md` | HIGH | 8 | Plan + critique resolved |
| 9 | Comeback Nudges | Graduated re-engagement flow | `plan-comeback-nudges.md` | MEDIUM | 7 | Plan + critique resolved |
| 10 | Daily Rewards | 7-day reward calendar | `plan-daily-rewards.md` | MEDIUM | 7 | Plan + critique resolved |
| 11 | Story Narrative | Character arcs per course | `plan-story-narrative.md` | MEDIUM | 13 | Plan + critique resolved |
| 12 | Celebration Sharing | PNG share cards for all celebrations | `plan-celebration-sharing.md` | MEDIUM | 5 | Plan + critique resolved |
| 13 | Micro-Celebrations | Mid-lesson toasts + progress glow | `plan-micro-celebrations.md` | MEDIUM | 4 | Plan + critique resolved |
| 14 | Accessibility | WCAG AA for lesson components | `plan-accessibility.md` | MEDIUM | 6 | Plan + critique resolved |

**Total estimated effort: ~66.5 hours** (critical path ~55 hours with parallelization)

---

## 2. Shared Phase 0 Prerequisites

Before implementing ANY feature, complete these cross-cutting changes. They resolve multiple CRITICAL issues found during both critique rounds.

### P0-1: Gem Source Allowlist (Coordinated Update)

**File:** `src/app/api/engagement/route.ts` — add to `VALID_GEM_SOURCES`

All new gem sources from ALL plans in one update:

```typescript
// High-priority plans:
friend_quest_reward:           { maxEarn: 30,  maxSpend: 0 },  // Gap 5
// Medium-priority plans:
daily_reward_calendar:         { maxEarn: 25,  maxSpend: 0 },  // Gap 10
daily_reward_bonus_overflow:   { maxEarn: 15,  maxSpend: 0 },  // Gap 10
mystery_reward:                { maxEarn: 50,  maxSpend: 0 },  // Gap 10
story_unlock:                  { maxEarn: 15,  maxSpend: 0 },  // Gap 11
```

**Why critical:** Without this, `addGems()` with any new source is silently dropped by `validateTransactions()` during engagement sync. The client balance desyncs from the server ledger.

### P0-2: Share Utility Consolidation

**File:** `src/lib/share-utils.ts` (new file)

Extract the image-share-with-fallback pattern used by BOTH Gap 8 (`shareCertificate`) and Gap 12 (`shareCard`):

```typescript
export type ShareResult = 'shared' | 'copied' | 'downloaded' | 'cancelled';

export async function shareImage(
  imageUrl: string,
  shareText: string,
  fileName: string,
): Promise<ShareResult> {
  // 1. Web Share API with file (mobile)
  // 2. Web Share text-only (desktop)
  // 3. Download file (final fallback)
}
```

Both `shareCertificate` and `shareCard` become thin wrappers calling `shareImage`.

### P0-3: `getDisplayName()` Utility

**File:** `src/lib/utils.ts`

Plans 9, 12 need a reliable user display name across stores:

```typescript
export function getDisplayName(): string {
  return useStore.getState().progress.displayName
    || useCourseStore.getState().progress.displayName
    || 'Learner';
}
```

### P0-4: Engagement Init Sequence Ordering

**File:** `src/lib/engagement-init.ts`

Plans 9, 10 both add init calls. The FINAL order:

```typescript
// === Engagement init sequence (ORDER MATTERS) ===
useEngagementStore.getState().initDailyQuests();
useEngagementStore.getState().initWeeklyQuests();
useEngagementStore.getState().simulateLeagueWeek();
if (hasEngagementHistory) {
  useEngagementStore.getState().checkComebackFlow();    // Gap 9
}
useEngagementStore.getState().checkDailyRewardCalendar(); // Gap 10
useEngagementStore.getState().checkNudges();              // Gap 9
scheduleEventNotifications(isPro);                         // Gap 6
```

### P0-5: `modal-gallery.html` Creation

All 10 plans reference this file per CLAUDE.md but it does not exist. Create it as an empty gallery template before any plan adds entries.

### P0-6: Zod Schema Foundation

**File:** `src/lib/validation.ts`

Add schemas needed by multiple plans:

```typescript
// Gap 5: Friend quest endpoints
export const friendQuestProgressSchema = z.object({
  events: z.array(z.object({
    event: z.enum(['xp_earned', 'lesson_completed', 'accuracy_report']),
    value: z.number().positive().max(5000),
  })).min(1).max(5),
});
export const friendQuestClaimSchema = z.object({
  questId: z.string().uuid(),
});

// Gap 10: Daily reward calendar (already specified in medium-priority plans)
// dailyRewardCalendar field in engagementSyncSchema
```

### P0-7: Accessibility Patterns

Establish these patterns BEFORE building new components so all features inherit them:

- Toasts/banners: `role="status"` + `aria-live="polite"`
- Interactive buttons: explicit `aria-label`, visible focus rings
- Countdown timers: `aria-live="polite"` + `aria-atomic="true"`
- Progress indicators: `role="progressbar"` + `aria-valuenow`/`aria-valuemax`

---

## 3. Recommended Implementation Order

The order is driven by dependencies, critic resolutions, and the principle of establishing shared patterns before building on them.

```
Phase 0: Shared Prerequisites (P0-1 through P0-7)
    │
    ├─► Phase 1: Accessibility (Gap 14)                    ~6h
    │       Establishes a11y patterns for ALL subsequent features
    │       │
    │       └─► Phase 2: Adaptive Difficulty (Gap 4)       ~6h
    │           │   Uses a11y patterns for AdaptiveToast
    │           │
    │           └─► Phase 3: Micro-Celebrations (Gap 13)   ~4h
    │                   Depends on Gap 4 for toast overlap suppression
    │
    ├─► Phase 4: XP Events (Gap 6)                         ~5h
    │       Independent of Phases 1-3. Shares constants with Gap 4.
    │
    ├─► Phase 5: Friend Quests (Gap 5)                     ~5.5h
    │       Independent of Phases 1-4. Server-first architecture.
    │
    ├─► Phase 6: Celebration Sharing (Gap 12)              ~5h
    │       Creates ShareButton used by Gap 8. Independent otherwise.
    │       │
    │       └─► Phase 7: Certificates (Gap 8)              ~8h
    │               Uses ShareButton from Gap 12, share-utils from P0-2
    │
    ├─► Phase 8: Comeback Nudges (Gap 9)                   ~7h
    │       ├─ Depends on P0-3 (getDisplayName), P0-4 (init ordering)
    │       │
    │       └──(parallel)─► Phase 9: Daily Rewards (Gap 10) ~7h
    │                       Shares engagement store changes with Gap 9
    │
    └─► Phase 10: Story Narrative (Gap 11)                 ~13h
            Depends on P0-1 (gem sources), Gap 13 (micro-celebration suppression)
            Two sub-phases: 4A technical (5h) + 4B content (8h)
```

### Parallelization Opportunities

These groups can run in parallel (different developers or sequential within group):

- **Track A:** Phase 0 -> Phase 1 -> Phase 2 -> Phase 3 -> Phase 10
- **Track B:** Phase 0 -> Phase 4 -> Phase 5 -> Phase 8 -> Phase 9
- **Track C:** Phase 0 -> Phase 6 -> Phase 7

**Critical path:** Track A at ~29 hours (P0 + 14 + 13 + 4 + 13 = includes Phase 10 content work).

---

## 4. Dependency Graph (All 10 Features)

```
                    ┌─── Phase 0: Shared Prerequisites ───┐
                    │  P0-1: Gem sources (Gaps 5,10,11)    │
                    │  P0-2: share-utils (Gaps 8,12)       │
                    │  P0-3: getDisplayName (Gaps 9,12)    │
                    │  P0-4: Init ordering (Gaps 6,9,10)   │
                    │  P0-5: modal-gallery.html (All)      │
                    │  P0-6: Zod schemas (Gap 5)           │
                    │  P0-7: A11y patterns (All new UI)    │
                    └──────────┬───────────────────────────┘
                               │
         ┌─────────────────────┼────────────────────────────────┐
         │                     │                                │
         ▼                     ▼                                ▼
   Phase 1: A11y (14)   Phase 4: XP Events (6)        Phase 6: Share (12)
         │                     │                                │
         ▼                     │                                ▼
   Phase 2: Adaptive (4)      │                        Phase 7: Certs (8)
         │                     │
         ▼                     ▼
   Phase 3: Micro (13)  Phase 5: Friends (5)
         │                     │
         │               Phase 8: Comeback (9)
         │                     │
         │               Phase 9: Daily (10)  ←── parallel with 8
         │
         ▼
   Phase 10: Story (11)
```

### Hard Dependencies (Will Break If Violated)

| Feature | Depends On | Reason |
|---------|------------|--------|
| Gap 4 (Adaptive) | P0-7 (A11y patterns) | AdaptiveToast needs `role="status"` from day one |
| Gap 5 (Friends) | P0-1 (Gem sources), P0-6 (Zod) | `friend_quest_reward` rejected without allowlist |
| Gap 8 (Certs) | Gap 12 (Share), P0-2 (share-utils) | Uses `ShareButton` + shared share utility |
| Gap 10 (Daily) | P0-1 (Gem sources) | `daily_reward_calendar` rejected without allowlist |
| Gap 11 (Story) | P0-1 (Gem sources), Gap 13 | `story_unlock` gems + suppression coordination |
| Gap 13 (Micro) | Gap 4 (Adaptive) | Must suppress streak toasts when cruising |

### Soft Dependencies (Recommended But Not Required)

| Feature | Recommended After | Reason |
|---------|-------------------|--------|
| Gap 4 (Adaptive) | Gap 14 (A11y) | Better to have a11y patterns first |
| Gap 9 (Comeback) | Gap 10 (Daily) or parallel | Share engagement store changes |

---

## 5. Per-Feature Summary

### Gap 4: Mid-Session Difficulty Adaptation (~6 hours)

**What exists:** `getAdaptiveMode()`, `recentAnswers` state, `AdaptiveToast` component, cruising XP bonus applied to dead `xpGain` variable.

**What's needed:**
- Fix the critical XP bug: cruising bonus must flow through `completeLesson()` via `cruisingCorrectCount` on `ActiveLesson`
- Fix stale `adaptiveMode` via eager computation in `handleAnswer` (CR-1.2)
- Move constants to `game-config.ts`, remove dead `xpGain` state
- Sound effect on cruising entry (`streakMilestone` sound, verified to exist)
- Progress bar glow during cruising
- AdaptiveToast: more messages, reduced motion, vague bonus text (no specific XP amounts)
- 15 test cases

**Key risks:** State batching lag (resolved), toast overlap with micro-celebrations (resolved with guard variable).

**Files changed:** `game-config.ts`, `types.ts`, `useCourseStore.ts`, `LessonView.tsx`, `AdaptiveToast.tsx`, `LessonProgressBar.tsx` + new test file.

### Gap 5: Friend Quests, Shared Streaks & Activity Feed (~5.5 hours)

**What exists:** DB tables (`friend_quests`, `activity_feed`, `activity_reactions`), GET APIs, UI components (`FriendQuestCard`, `ActivityFeed`), quest definitions.

**What's needed:**
- `POST /api/friends/quests/progress` with atomic SQL updates (CR-2.3)
- `POST /api/friends/quests/claim` with per-user claim columns
- Schema: split `rewardClaimed` -> `rewardClaimedUser` + `rewardClaimedPartner`, add `rewardGems` column
- Client: batched progress reporting (single request, not 3), Zod validation
- Activity feed population in server API routes
- Activity feed cleanup cron (14-day TTL)
- `sendPushToUser` wrapper in `push.ts` (new function)
- Fix `combined_accuracy` quest: target=3 sessions, not trivially completable
- Remove `rewardXp` from quest definitions (gems only)
- Tests: unit + API integration

**Key risks:** Destructive migration (mitigated: table is empty), race conditions (resolved with atomic SQL).

**Files changed:** `schema.ts`, `engagement/route.ts`, `validation.ts`, `push.ts`, `activity-feed.ts` (new), `useFriendQuestSync.ts` (new), 4 API routes, `ResultScreen.tsx`, `SessionSummary.tsx`, `friends/page.tsx`, `vercel.json` + 3 test files.

### Gap 6: Time-Limited XP Events (~5 hours)

**What exists:** Event detection (`xp-events.ts`), banner (`ActiveEventBanner`), course-mode integration in `completeLesson()`.

**What's needed:**
- Practice-mode XP integration in `useStore.answerQuestion()` with per-answer cap of 200 XP
- Store event info on `LessonResult` for accurate ResultScreen display (CR-3.3)
- Banner: light/dark mode, per-second countdown, multiplier badge, stacked display
- ResultScreen: XP breakdown showing event bonus
- Mixpanel analytics
- Push notifications with timer leak prevention (CR-3.5)
- Comprehensive unit tests

**Key risks:** XP inflation in practice mode (mitigated with 200 XP cap), timer leaks (resolved).

**Files changed:** `useStore.ts`, `types.ts`, `ActiveEventBanner.tsx`, `ResultScreen.tsx`, `xp-events.ts`, `engagement-init.ts` + new test file.

### Gap 8: Shareable Certificates (~8 hours)

**What exists:** Certificate PNG generation (Edge, `ImageResponse`), URL builder, download, share via Web Share API, LinkedIn share (broken), buttons on CourseCompleteCelebration.

**What's needed:**
- Certificate design upgrade: corner flourishes, mascot (Edge-safe base64, CR-4.2), cert ID, name truncation
- Fix LinkedIn: use `/certificate` page with OG tags instead of deprecated `summary` param
- Create public `/certificate` page (server component + client component)
- Export `CertificateParams` type (CR-4.7)
- Share utility: return `ShareResult`, loading states, use `share-utils.ts` from P0-2
- Skills page: LinkedIn + Download buttons
- Clean LinkedIn URLs using profession slugs (CR-4.3)
- Dark mode for certificate page (CR-4.9)
- Reference `proxy.ts` not `middleware.ts` (CR-4.4)
- Edge caching (`Cache-Control` headers)

**Key risks:** Edge Runtime `Buffer` unavailability (resolved), celebration modal latency (resolved with lazy loading).

**Files changed:** `certificate/route.tsx`, `certificate.ts`, `certificate/page.tsx` (new), `CertificatePageClient.tsx` (new), `CourseCompleteCelebration.tsx`, `skills/page.tsx` + test file.

### Gap 9: Comeback Nudges (~7 hours)

**What exists:** Engagement store, push notification infra, streak system.

**What's needed:** Graduated re-engagement: Day-1/Day-2 push notifications, in-app `StreakNudgeBanner`, friend nudge cron.

**Key risks:** `dismissedNudges` never clears (resolved: use component state), misses course-only users (resolved: read both stores).

### Gap 10: Daily Rewards (~7 hours)

**What exists:** Gem shop, engagement store, streak system.

**What's needed:** 7-day reward calendar, claim modal, DB column, Zod schema, API sync.

**Key risks:** `addGems` source rejected (resolved: P0-1), `engagementSyncSchema` strips data (resolved: add to Zod).

### Gap 11: Story Narrative (~13 hours)

**What exists:** Conversation lesson type, course data structure.

**What's needed:** Character arcs, story unlock component, per-course character data, callback lines. Two phases: technical (5h) + content (8h).

**Key risks:** `checkSectionComplete` impossible in store (resolved: utility function), `viewedStoryUnlocks` storage (resolved: separate field).

### Gap 12: Celebration Sharing (~5 hours)

**What exists:** Celebration modals for all types (streak, league, level, course).

**What's needed:** `ShareButton` component, `share-card.ts`, API route for share card PNG generation.

**Key risks:** None significant. Purely additive.

### Gap 13: Micro-Celebrations (~4 hours)

**What exists:** LessonView, progress bar.

**What's needed:** `MicroCelebration` component (halfway, last-question, streak toasts), progress bar milestone glow.

**Key risks:** Toast overlap with AdaptiveToast (resolved: `suppressStreakCelebration` guard from Gap 4).

### Gap 14: Accessibility (~6 hours)

**What exists:** All lesson/card components.

**What's needed:** WCAG AA compliance audit and fixes: ARIA labels, focus management, keyboard navigation, icon fallbacks, reduced motion support.

**Key risks:** None. Foundational work that benefits all other features.

---

## 6. High-Traffic Files (Modified by Multiple Plans)

These files are touched by 2+ plans and require careful merge ordering:

| File | Modified By | Merge Strategy |
|------|-------------|----------------|
| `src/store/useCourseStore.ts` | Gaps 4, 11 | Gap 4 first (submitAnswer signature), Gap 11 adds story fields |
| `src/components/lesson/LessonView.tsx` | Gaps 4, 11, 13, 14 | Gap 14 first (a11y), Gap 4 (adaptive), Gap 13 (micro), Gap 11 (story) |
| `src/components/lesson/LessonProgressBar.tsx` | Gaps 4, 13 | Gap 4 adds `glowing`, Gap 13 adds milestone glow — both use different props |
| `src/store/useEngagementStore.ts` | Gaps 9, 10 | Sequential — both add state fields, merge function must include ALL fields |
| `src/lib/engagement-init.ts` | Gaps 6, 9, 10 | P0-4 defines final ordering for all three |
| `src/app/api/engagement/route.ts` | P0-1, Gap 10 | P0-1 adds gem sources, Gap 10 adds calendar sync |
| `src/lib/db/schema.ts` | Gaps 5, 9, 10 | Sequential — each adds columns/tables |
| `src/components/engagement/CourseCompleteCelebration.tsx` | Gaps 8, 12 | Gap 12 first (ShareButton), Gap 8 uses it |
| `src/components/lesson/ResultScreen.tsx` | Gaps 5, 6 | Separate useEffects with separate ref guards |
| `src/data/course/types.ts` | Gaps 4, 6, 11 | Sequential — each adds fields to different interfaces |
| `src/lib/sounds.ts` | Gaps 9, 10, 13 | Additive — each adds new sound definitions |
| `src/lib/validation.ts` | Gaps 5, 10 | Additive — each adds new Zod schemas |
| `modal-gallery.html` | All | Each plan appends entries |

---

## 7. All Open Product Questions

Consolidated from both critique rounds. These require human decisions before or during implementation:

### From High-Priority Critique

| # | Question | Affects | Recommendation |
|---|----------|---------|----------------|
| Q1 | Should cruising XP bonus apply during XP events? | Gaps 4+6 | Yes. The bonus is negligible (+3 XP max on a 10 XP lesson). Not worth the complexity of suppressing it. |
| Q2 | Should friend quest rewards include XP or only gems? | Gap 5 | Gems only. XP award requires choosing between stores. Resolved: removed `rewardXp`. |
| Q3 | Better completion model for `combined_accuracy` quest? | Gap 5 | Require 3 qualifying sessions at 80%+ (not just 1). Resolved in plan. |
| Q4 | What happens to incomplete friend quests at week end? | Gap 5 | Silently abandoned. The quest row stays but no new progress can be reported (WHERE questWeek = currentWeek). Add "Expired" visual state in a future iteration. |
| Q5 | Should certificate page be indexable by search engines? | Gap 8 | Add `<meta name="robots" content="noindex">` to prevent arbitrary names appearing in Google results. |
| Q6 | Should certificate IDs be verifiable? | Gap 8 | No for MVP. Decorative only. Future: add `certificates` table + `/verify/OKC-XXXXXX` route if needed. |
| Q7 | Who creates `modal-gallery.html`? | All | Phase 0 prerequisite (P0-5). |
| Q8 | Adaptive cruising + streak micro-celebration priority? | Gaps 4+13 | Suppress streak celebrations during cruising. Halfway/last-question celebrations still show. |
| Q9 | Should friend quest completion generate a shareable card? | Gaps 5+12 | Not for MVP. The activity feed entry is sufficient. Future enhancement. |
| Q10 | Power Hour hardcoded to 7-9 PM — should it be configurable? | Gap 6 | Not for MVP. Users who practice outside 7-9 PM still benefit from weekend + league sprint events. Per-user scheduling adds significant complexity. |

### From Medium-Priority Critique

| # | Question | Affects | Recommendation |
|---|----------|---------|----------------|
| Q11 | Should daily reward calendar REPLACE or STACK with daily quest chest? | Gap 10 | Stack for MVP, monitor gem inflation via admin analytics. |
| Q12 | Who writes ~80 callback lines and ~20 story unlock narratives? | Gap 11 | Separate content phase (Phase 4B). Needs content writer. |
| Q13 | Should users opt out of friend streak nudge notifications? | Gap 9 | Ship without opt-out for MVP. Add setting before public launch. |
| Q14 | Should share cards include the mascot? | Gap 12 | No for MVP (Satori local image limitation). |
| Q15 | WCAG AA or AAA compliance target? | Gap 14 | AA. Enhanced contrast (1.4.6) is AAA — not targeted. |
| Q16 | Does `AvatarFrame` support custom frame styles? | Gap 10 | Verify component. If not, implement simple border+glow. |

---

## 8. Critical Fixes Summary (Both Critique Rounds)

### High-Priority Critical Fixes (10 issues)

| # | Issue | Gap | Resolution |
|---|-------|-----|------------|
| C1 | Stale `adaptiveMode` in handleAnswer (React batching) | 4 | Eager computation: `getAdaptiveMode([...recentAnswers, correct])` |
| C2 | `submitAnswer` signature change has undocumented call sites | 4 | Optional param — existing callers safe. All 3 call sites documented. |
| C3 | `rewardClaimed` schema change is destructive migration | 5 | Table is empty in prod. Pre-migration check SQL documented. |
| C4 | `sendPushToUser` doesn't exist | 5 | Create new wrapper function in `push.ts`. Schema columns verified. |
| C5 | Race condition in friend quest progress | 5 | Atomic SQL updates with `ELSE completed` guard |
| C6 | `combined_accuracy` quest trivially completable | 5 | Changed target from 80 (threshold) to 3 (session count) |
| C7 | `Buffer.from()` not in Edge Runtime | 8 | Chunked `btoa(String.fromCharCode(...))` approach |
| C8 | `VALID_GEM_SOURCES` needs coordinated update | 5,10,11 | Single P0-1 prerequisite adds ALL sources |
| C9 | `shareCertificate` return type change (downgraded) | 8 | Not actually breaking — backward compatible |
| C10 | Adaptive + XP events stacking (cross-plan) | 4+6 | Additive by design. Formula documented. No issue. |

### Medium-Priority Critical Fixes (7 issues)

| # | Issue | Gap | Resolution |
|---|-------|-----|------------|
| C11 | `dismissedNudges` never clears daily | 9 | Use component state for dismissal |
| C12 | `checkNudges` misses course-only users | 9 | Read `lastActiveDate` from BOTH stores |
| C13 | `addGems` source rejected by server | 10,11 | P0-1 prerequisite |
| C14 | `engagementSyncSchema` strips calendar data | 10 | Add to Zod schema |
| C15 | DB column missing for calendar | 10 | Full 5-step integration |
| C16 | `checkSectionComplete` impossible in store | 11 | Move to utility function |
| C17 | `viewedStoryUnlocks` hacked into `completedLessons` | 11 | Separate field on CourseProgress |

---

## 9. Cross-Cutting Resolutions

### 9.1 Share Utility Consolidation (Gaps 8 + 12)

Both plans implement share-with-fallback. Resolved by P0-2: `src/lib/share-utils.ts` provides `shareImage()`. Both `shareCertificate` and `shareCard` are thin wrappers.

### 9.2 CourseCompleteCelebration.tsx Merge (Gaps 8 + 12)

Both plans modify this component. Resolved: implement Gap 12's `ShareButton` first, then Gap 8 uses it. No inline share buttons in Gap 8.

### 9.3 Micro-Celebration + Adaptive Toast Overlap (Gaps 4 + 13)

Both render in the same visual slot above the question card. Resolved: Gap 4 exposes `suppressStreakCelebration = adaptiveMode === 'cruising'` in LessonView. Gap 13 reads this variable to suppress streak-type toasts during cruising. Halfway and last-question celebrations are NOT suppressed.

### 9.4 ResultScreen useEffect Bloat (Gaps 5 + 6)

Both add logic to the same `useEffect` in ResultScreen. Resolved: Gap 5 uses its own `useEffect` with its own ref guard. Gap 6 adds event info to `LessonResult` type (read in render, not in effect).

### 9.5 Full XP Stacking Formula (Gaps 4 + 6)

Documented at `completeLesson()`:

```
totalXp = (xpReward * accuracyMultiplier * totalBoostMultiplier) + cruisingBonusXp

where:
  accuracyMultiplier = 1x / 2x / 3x / 4x (stars/flawless)
  totalBoostMultiplier = 1 + (shopMultiplier - 1) + (eventMultiplier - 1)
  eventMultiplier = 1 + sum(each event's (multiplier - 1))
  cruisingBonusXp = xpReward * 0.5 * (cruisingCorrectCount / totalQuestions)

Theoretical max (10 XP lesson, flawless, all boosts):
  10 * 4 * 3.75 + 3 = 153 XP
```

For practice mode, per-answer XP is capped at 200 to prevent inflation.

### 9.6 Gem Economy Impact

Weekly gem income ceiling with all features:
- Existing sources (quests, leagues, streaks, achievements): ~70 gems/week
- Friend quests (Gap 5): up to 90 gems/week (3 quests * 30 max)
- Daily rewards (Gap 10): ~80 gems/week
- **Total: ~240 gems/week**

Shop prices remain unchanged. Monitor via admin analytics. Consider price adjustments if gem inflation degrades shop engagement.

### 9.7 Accessibility Across All New Components

Every new component must include (per P0-7):

| Component | Plan | Required ARIA |
|-----------|------|---------------|
| `AdaptiveToast` | 4 | `role="status"` `aria-live="polite"` |
| `FriendQuestCard` claim btn | 5 | `aria-label="Claim reward for {title}"` |
| `ActivityFeed` high-five btn | 5 | `aria-label="Give {name} a high five"` |
| `ActiveEventBanner` | 6 | `role="region"` `aria-label="Active XP events"` |
| Countdown timer | 6 | `aria-live="polite"` `aria-atomic="true"` |
| Certificate page buttons | 8 | `aria-label` on all actions |
| `StreakNudgeBanner` | 9 | `role="alert"` |
| `DailyRewardClaimModal` | 10 | Focus trap, `role="dialog"` |
| `StoryUnlock` | 11 | `role="dialog"`, focus management |
| `ShareButton` | 12 | `aria-label` with context |
| `MicroCelebration` | 13 | `role="status"` `aria-live="polite"` |

---

## 10. New Files Created (All Plans)

| File | Plan | Purpose |
|------|------|---------|
| `src/lib/share-utils.ts` | P0-2 | Shared image-share-with-fallback utility |
| `src/__tests__/critical/adaptive-difficulty.test.ts` | 4 | 15 adaptive difficulty test cases |
| `src/app/api/friends/quests/progress/route.ts` | 5 | Friend quest progress endpoint |
| `src/app/api/friends/quests/claim/route.ts` | 5 | Friend quest claim endpoint |
| `src/hooks/useFriendQuestSync.ts` | 5 | Fire-and-forget progress reporter |
| `src/lib/activity-feed.ts` | 5 | Activity insert helper |
| `src/app/api/cron/activity-cleanup/route.ts` | 5 | Activity feed TTL cron |
| `src/__tests__/lib/friend-quests.test.ts` | 5 | Friend quest unit tests |
| `src/__tests__/critical/friend-quests-api.test.ts` | 5 | API integration tests |
| `src/__tests__/lib/xp-events.test.ts` | 6 | XP event unit tests |
| `src/app/certificate/page.tsx` | 8 | Public certificate page (SSR + OG) |
| `src/app/certificate/CertificatePageClient.tsx` | 8 | Certificate page client component |
| `src/__tests__/lib/certificate.test.ts` | 8 | Certificate unit tests |
| `src/components/engagement/StreakNudgeBanner.tsx` | 9 | In-app streak nudge banner |
| `src/app/api/cron/friend-nudge/route.ts` | 9 | Friend nudge cron |
| `src/data/daily-rewards.ts` | 10 | Daily reward definitions |
| `src/components/engagement/DailyRewardCalendar.tsx` | 10 | 7-day reward calendar |
| `src/components/engagement/DailyRewardClaimModal.tsx` | 10 | Claim modal |
| `src/data/course/character-arcs.ts` | 11 | Character arc definitions |
| `src/data/course/professions/*/characters.ts` (x3) | 11 | Per-course characters |
| `src/data/course/professions/*/story-unlocks.ts` (x3) | 11 | Per-course story unlocks |
| `src/lib/story-utils.ts` | 11 | Story utility functions |
| `src/components/engagement/StoryUnlock.tsx` | 11 | Story unlock component |
| `src/app/api/share-card/route.tsx` | 12 | Share card PNG generation |
| `src/lib/share-card.ts` | 12 | Share card URL builder |
| `src/components/ui/ShareButton.tsx` | 12 | Reusable share button |
| `src/components/lesson/MicroCelebration.tsx` | 13 | Mid-lesson toast component |
| `modal-gallery.html` | P0-5 | UI state gallery |
| 10+ test files | All | Unit, API, component, a11y tests |

---

## 11. Testing Strategy

### Test Files by Plan

| Plan | Test File | Type | Key Test Cases |
|------|-----------|------|----------------|
| 4 | `adaptive-difficulty.test.ts` | Unit | getAdaptiveMode edge cases, cruising XP integration, teaching card guard |
| 5 | `friend-quests.test.ts` | Unit | pickFriendQuest determinism, calculateSharedStreak |
| 5 | `friend-quests-api.test.ts` | API | Progress/claim endpoints, auth, validation, race safety |
| 6 | `xp-events.test.ts` | Unit | Event detection, stacking, time boundaries, DST |
| 8 | `certificate.test.ts` | Unit | URL builder, cert ID, LinkedIn URL |
| 9 | `nudge-system.test.ts` | Unit | Nudge logic |
| 10 | `daily-reward-calendar.test.ts` | Unit | Calendar state machine |
| 11 | `character-arcs.test.ts` | Data | Character data validation |
| 12 | `share-card.test.ts` | Unit | Share card URLs |
| 13 | MicroCelebration tests | Component | Milestone detection, rendering |
| 14 | axe-core a11y tests | A11y | Per-card WCAG violations |

### Testing Commands

```bash
npm test              # Run all tests before every commit
npm run test:watch    # Development
npm run test:coverage # Coverage report
```

All new test files are auto-discovered by Vitest's glob pattern. No CI configuration changes needed.

---

## 12. CLAUDE.md Compliance Checklist

- [ ] Every new screen/modal/overlay added to `modal-gallery.html` (P0-5)
- [ ] Check `src/components/ui/` for existing components before writing new ones
- [ ] Re-run `npx tsx scripts/seed-content.ts` after content changes (Gap 11)
- [ ] Follow `docs/content-writing-guide.md` for narrative content (Gap 11)
- [ ] Use existing CSS utility classes from `globals.css` before one-off styles
- [ ] All new components support dark mode via `dark:` Tailwind classes
- [ ] Run `npm test` before committing
- [ ] Use `sortFriendPair()` for friendship queries (Gap 5)
- [ ] SSR guard on any code touching localStorage/sessionStorage
- [ ] Update both `useStore` and `useCourseStore` when progress changes affect both
