# Gap 9: Graduated Comeback Nudges (Days 1-2)

## Overview & Motivation

Currently the engagement system is binary: users who miss fewer than 3 days get nothing; users who miss 3+ days hit the full WelcomeBack modal with comeback quests. There is no gentle re-engagement during the critical Day 1-2 window when the user is most likely to return with a small nudge. Duolingo-style apps use escalating urgency to recover lapsed users before they fully churn.

**Goal:** Introduce a graduated nudge system:
- **Day 1 missed:** Gentle push notification + optional in-app nudge banner
- **Day 2 missed:** Urgent push notification ("Your X-day streak breaks tomorrow!") + friend nudge if shared streak exists
- **Day 3+:** Existing WelcomeBack flow (already works well, no changes needed)

---

## Current State Analysis

| Component | File | Behavior |
|---|---|---|
| Comeback threshold | `src/data/engagement-types.ts:10` | `COMEBACK_THRESHOLD_DAYS = 3` (hard-coded) |
| Comeback detection | `src/store/useEngagementStore.ts:699-729` | `checkComebackFlow()` only fires at 3+ days |
| Streak break detection | `src/lib/engagement-init.ts:40-69` | Detects `daysDiff >= 2` for freeze/break, no nudges |
| Push notification cron | `src/app/api/cron/streak-reminder/route.ts` | Sends **one** generic message at 7PM to all at-risk users |
| Push infrastructure | `src/lib/push.ts` | `sendPushNotification()` via web-push, VAPID configured |
| Push subscriptions | `src/lib/db/schema.ts:570-584` | `push_subscriptions` table (userId, endpoint, p256dh, auth) |
| Service worker | `public/sw.js:100-136` | Handles `push` and `notificationclick` events |
| Vercel cron config | `vercel.json` | `streak-reminder` at `0 19 * * *` (7 PM UTC daily) |
| WelcomeBack modal | `src/components/engagement/WelcomeBack.tsx` | Full-screen modal with comeback quests |
| NudgeType | `src/data/engagement-types.ts:219-226` | Includes `streak_warning`, `comeback`, etc. |
| Dismissed nudges | `src/store/useEngagementStore.ts` | `dismissedNudges: NudgeType[]` in state |

---

## Implementation Plan

### Phase 1: Data Layer — New Constants & Types

#### 1.1 Modify `src/data/engagement-types.ts`

**Add graduated nudge constants (after line 10):**

```typescript
// Graduated nudge thresholds (days since last activity)
export const NUDGE_DAY1_THRESHOLD = 1;   // gentle nudge
export const NUDGE_DAY2_THRESHOLD = 2;   // urgent nudge
// COMEBACK_THRESHOLD_DAYS = 3 remains unchanged

// Nudge urgency levels
export type NudgeUrgency = 'gentle' | 'urgent' | 'comeback';
```

**Add new NudgeType value to the existing union (line 219):**

```typescript
export type NudgeType =
  | 'streak_warning'
  | 'streak_nudge_day1'    // NEW
  | 'streak_nudge_day2'    // NEW
  | 'quest_expiring'
  | 'league_falling'
  | 'chest_ready'
  | 'comeback'
  | 'neglected_topic';
```

**Add new state type for tracking nudge state (after ComebackState):**

```typescript
export interface NudgeState {
  /** ISO date when last Day-1 nudge was shown in-app */
  lastDay1NudgeDate: string | null;
  /** ISO date when last Day-2 nudge was shown in-app */
  lastDay2NudgeDate: string | null;
}
```

**Add `nudge` to `EngagementState` interface (line 229):**

```typescript
export interface EngagementState {
  // ... existing fields ...
  nudge: NudgeState;  // NEW
}
```

---

### Phase 2: Server-Side Push Notifications — Graduated Cron

#### 2.1 Modify `src/app/api/cron/streak-reminder/route.ts`

Replace the single-message approach with graduated logic. The cron already runs daily at 7PM UTC.

**Changes:**
- Query `userProgress.lastActiveDate` to compute `daysMissed` for each user
- Send different messages based on days missed:
  - `daysMissed === 1`: Gentle nudge
  - `daysMissed === 2`: Urgent streak-at-risk message
  - `daysMissed >= 3`: No push (WelcomeBack modal handles this client-side)

**New query logic (replace the existing batch loop):**

```typescript
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];

// Batch 1: Day-1 users (last active = yesterday, haven't practiced today)
// These users missed today so far
const day1Conditions = [
  gt(userProgress.currentStreak, 0),
  eq(userProgress.lastActiveDate, yesterday),
];

// Batch 2: Day-2 users (last active = two days ago)
// These users missed yesterday AND today
const day2Conditions = [
  gt(userProgress.currentStreak, 0),
  eq(userProgress.lastActiveDate, twoDaysAgo),
];
```

**Day-1 message template:**

```typescript
{
  title: 'Quick 3-min lesson?',
  body: `Keep your ${user.currentStreak}-day streak alive!`,
  tag: 'streak-nudge-day1',
  url: '/',
  icon: '/icon-192.png',
}
```

**Day-2 message template:**

```typescript
{
  title: `Your ${user.currentStreak}-day streak breaks tomorrow!`,
  body: 'One lesson is all it takes. Don\'t lose your progress.',
  tag: 'streak-nudge-day2',
  url: '/',
  icon: '/icon-192.png',
}
```

**Implementation detail:** Process Day-1 and Day-2 batches sequentially within the same cron handler. Use the same cursor-based pagination pattern already in place. Return `{ day1Sent, day1Failed, day2Sent, day2Failed, total }`.

#### 2.2 Add Day-2 Friend Nudge — New Cron Route

**New file: `src/app/api/cron/friend-nudge/route.ts`**

Purpose: For Day-2 users who have friends, send a push to their closest friend saying "Your friend [Name] is about to lose their streak! Send them encouragement."

**Query:**
```sql
SELECT up.user_id, up.current_streak, u.display_name,
       f.friend_id, ps.endpoint, ps.p256dh, ps.auth
FROM user_progress up
JOIN users u ON u.id = up.user_id
JOIN friendships f ON (f.user_id = up.user_id OR f.friend_id = up.user_id)
JOIN push_subscriptions ps ON ps.user_id = CASE
  WHEN f.user_id = up.user_id THEN f.friend_id
  ELSE f.user_id
END
WHERE up.current_streak > 0
  AND up.last_active_date = :twoDaysAgo
```

**Friend nudge message:**
```typescript
{
  title: `${userName} is about to lose their streak!`,
  body: 'Send them a word of encouragement.',
  tag: 'friend-streak-nudge',
  url: `/friends`,
}
```

**Rate limit:** Only nudge the first friend (sorted by friendship creation date) to avoid spamming multiple friends. Add a `last_friend_nudge_date` column check to avoid sending the same nudge twice in a day.

#### 2.3 Update `vercel.json` — Add friend-nudge cron

```json
{
  "crons": [
    { "path": "/api/cron/streak-reminder", "schedule": "0 19 * * *" },
    { "path": "/api/cron/friend-nudge", "schedule": "0 20 * * *" },
    { "path": "/api/cron/league-finalize", "schedule": "5 0 * * 1" }
  ]
}
```

Run friend nudges 1 hour after streak reminders so the at-risk user has a chance to self-recover first.

---

### Phase 3: Client-Side In-App Nudge System

#### 3.1 Modify `src/store/useEngagementStore.ts`

**Add default nudge state factory (near line 88):**

```typescript
function getDefaultNudge(): NudgeState {
  return {
    lastDay1NudgeDate: null,
    lastDay2NudgeDate: null,
  };
}
```

**Add `nudge` to `getDefaultState()` (line 97):**
```typescript
nudge: getDefaultNudge(),
```

**Add new action to `EngagementActions` interface:**
```typescript
checkNudges: () => void;
```

**Implement `checkNudges` action (after `checkComebackFlow`):**

```typescript
// === Action: checkNudges ===
checkNudges: () => {
  const state = get();
  const today = getTodayDate();

  // Don't nudge if already in comeback flow
  if (state.comeback.isInComebackFlow) return;

  const progress = useStore.getState().progress;
  const lastActiveDate = progress.lastActiveDate;
  if (!lastActiveDate) return;
  if (progress.totalXp === 0) return; // never practiced
  if (lastActiveDate === today) return; // active today, no nudge needed

  const lastActive = new Date(lastActiveDate + 'T00:00:00Z');
  const todayD = new Date(today + 'T00:00:00Z');
  const daysMissed = Math.floor(
    (todayD.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (daysMissed === 1 && state.nudge.lastDay1NudgeDate !== today) {
    set({
      nudge: { ...state.nudge, lastDay1NudgeDate: today },
    });
    // The UI component reads nudge state to show banner
  } else if (daysMissed === 2 && state.nudge.lastDay2NudgeDate !== today) {
    set({
      nudge: { ...state.nudge, lastDay2NudgeDate: today },
    });
  }
  // daysMissed >= 3 is handled by checkComebackFlow
},
```

**Add `nudge` to the `partialize` persist config and `merge` function.**

**Add selector hook:**
```typescript
export const useNudgeState = () =>
  useEngagementStore(useShallow((s) => s.nudge));
```

#### 3.2 Modify `src/lib/engagement-init.ts`

**After the `checkComebackFlow()` call (line 93), add:**

```typescript
useEngagementStore.getState().checkNudges();
```

This ensures nudge state is evaluated on every app open, after hydration.

---

### Phase 4: UI Components

#### 4.1 New File: `src/components/engagement/StreakNudgeBanner.tsx`

A non-intrusive banner shown at the top of the home page (below header, above course map).

**Props:** None (reads from store directly).

**Behavior:**
- Reads `useNudgeState()` and current streak from `useStore`
- If `lastDay1NudgeDate === today` and user hasn't practiced today: show gentle banner
- If `lastDay2NudgeDate === today` and user hasn't practiced today: show urgent banner
- Dismissible (sets `dismissedNudges` to include `streak_nudge_day1` or `streak_nudge_day2`)
- Tapping the CTA navigates to start a lesson

**Day-1 design (gentle):**
```
[Mascot waving] "Quick 3-min lesson to keep your streak?"  [Start]
```
- Background: soft blue gradient (`#EFF6FF`)
- Rounded corners, subtle shadow
- Mascot: `<MascotWithGlow pose="waving" size={48} />`
- CTA: `<GameButton variant="primary" size="sm">Start</GameButton>`
- Framer Motion: slide down from top, 0.3s spring

**Day-2 design (urgent):**
```
[Mascot worried] "Your 14-day streak breaks tomorrow!"  [Save Streak]
```
- Background: warm amber/red gradient (`#FEF3C7` to `#FEE2E2`)
- Pulsing border animation (subtle)
- Mascot: `<MascotWithGlow pose="worried" size={48} />`
- CTA: `<GameButton variant="gold" size="sm">Save Streak</GameButton>`
- Shows streak freeze count if user owns any: "or use a Streak Freeze"

**Component structure:**
```tsx
export function StreakNudgeBanner() {
  const nudge = useNudgeState();
  const today = getTodayDate();
  const progress = useStore((s) => s.progress);
  const dismissedNudges = useEngagementStore((s) => s.dismissedNudges);
  const { dismissNudge } = useEngagementActions();
  const router = useRouter();

  // Determine urgency
  const isDay1 = nudge.lastDay1NudgeDate === today && progress.lastActiveDate !== today;
  const isDay2 = nudge.lastDay2NudgeDate === today && progress.lastActiveDate !== today;

  if (!isDay1 && !isDay2) return null;

  const nudgeType = isDay2 ? 'streak_nudge_day2' : 'streak_nudge_day1';
  if (dismissedNudges.includes(nudgeType)) return null;

  // ... render banner based on urgency
}
```

#### 4.2 Modify `src/app/(app)/page.tsx`

**Add lazy import:**
```typescript
const StreakNudgeBanner = lazy(() =>
  import('@/components/engagement/StreakNudgeBanner')
    .then(m => ({ default: m.StreakNudgeBanner }))
);
```

**Render above the course map (inside the authenticated content area), gated by `flagStreaks`:**
```tsx
{flagStreaks && (
  <Suspense fallback={null}>
    <StreakNudgeBanner />
  </Suspense>
)}
```

---

### Phase 5: Sound & Animation

#### 5.1 Modify `src/lib/sounds.ts`

**Add new sound (after `welcomeBack`):**

```typescript
// Sound name union — add 'nudgeGentle' | 'nudgeUrgent'

nudgeGentle() {
  // Soft two-note chime
  tone(880, 0.12, 'sine', 0, 0.15);
  tone(1047, 0.18, 'sine', 0.08, 0.15);
},

nudgeUrgent() {
  // Attention-grabbing three-note pattern
  tone(880, 0.1, 'triangle', 0, 0.2);
  tone(880, 0.1, 'triangle', 0.12, 0.2);
  tone(1047, 0.2, 'triangle', 0.24, 0.25);
},
```

**Add to `SoundName` union type:**
```typescript
| 'nudgeGentle'
| 'nudgeUrgent'
```

#### 5.2 Banner plays sound on mount

```tsx
useEffect(() => {
  playSound(isDay2 ? 'nudgeUrgent' : 'nudgeGentle');
}, [isDay2]);
```

---

### Phase 6: Database Schema Changes

#### 6.1 No new tables required

The nudge state lives entirely in the client-side Zustand store (persisted to localStorage). Push notifications use the existing `push_subscriptions` table.

#### 6.2 Optional: Track nudge effectiveness (analytics only)

If analytics tracking is desired, add Mixpanel events rather than new DB tables:

```typescript
// In StreakNudgeBanner on render:
trackEvent('nudge_shown', { urgency: isDay2 ? 'day2' : 'day1', streak: progress.currentStreak });

// On CTA click:
trackEvent('nudge_converted', { urgency, streak });

// On dismiss:
trackEvent('nudge_dismissed', { urgency, streak });
```

---

### Phase 7: Edge Cases

1. **User opens app multiple times on Day 1:** `lastDay1NudgeDate` check prevents re-triggering. Banner shown once, dismissible.

2. **User practices after seeing Day-1 nudge:** `progress.lastActiveDate === today` check hides the banner immediately. No Day-2 nudge will fire.

3. **Day-2 nudge + streak freeze owned:** Banner shows "or use a Streak Freeze" secondary action. Tapping it calls `useStreakFreeze()` and hides the banner.

4. **User with 0 streak:** No nudge shown (`currentStreak === 0` check in cron; `totalXp === 0` check client-side).

5. **Fresh install / cleared storage:** `engagement-init.ts` has `hasEngagementHistory` guard. No nudges on first visit.

6. **Timezone mismatch:** `getTodayDate()` uses local time (not UTC), matching existing streak logic. Cron runs at UTC 7PM which is a reasonable evening time for most timezones.

7. **Push notification permission not granted:** In-app banner still works. Push is additive, not required.

8. **Friend nudge spam:** Only one friend is nudged per at-risk user per day. The cron checks `last_friend_nudge_date` to avoid duplicates.

9. **Offline / PWA mode:** Zustand persists to localStorage, so nudge state survives offline. Push notifications require connectivity but the service worker queues them.

10. **Dismissed nudges persist across days:** `dismissedNudges` array is cleared on new day during `initDailyQuests()` — add `streak_nudge_day1` and `streak_nudge_day2` to the cleared set.

---

### Phase 8: Testing Strategy

#### Unit Tests (Vitest)

**New file: `src/__tests__/critical/nudge-system.test.ts`**

1. `checkNudges` sets `lastDay1NudgeDate` when `daysMissed === 1`
2. `checkNudges` sets `lastDay2NudgeDate` when `daysMissed === 2`
3. `checkNudges` is no-op when `lastActiveDate === today`
4. `checkNudges` is no-op when user has no XP (never practiced)
5. `checkNudges` is no-op when already in comeback flow
6. Day-1 nudge doesn't re-trigger on same day (idempotency)
7. Day-2 nudge shows streak freeze option when `freezesOwned > 0`
8. Nudge dismissal persists correctly

**New file: `src/__tests__/critical/cron-streak-reminder.test.ts`**

1. Day-1 users get gentle push message
2. Day-2 users get urgent push message
3. Day-3+ users don't get push (handled by WelcomeBack)
4. Users with streak === 0 don't get push
5. Failed push subscriptions (410 Gone) are cleaned up

#### Component Tests

**New file: `src/__tests__/components/StreakNudgeBanner.test.tsx`**

1. Renders gentle banner on Day-1
2. Renders urgent banner on Day-2
3. Shows streak freeze option on Day-2 when freezes owned
4. Hidden when user practiced today
5. Hidden after dismissal
6. CTA navigates to lesson start

---

### Phase 9: Implementation Order

1. **Types & constants** — `engagement-types.ts` changes (5 min)
2. **Store changes** — `useEngagementStore.ts` nudge state + action (20 min)
3. **Init hook** — `engagement-init.ts` add `checkNudges()` call (2 min)
4. **Cron upgrade** — `streak-reminder/route.ts` graduated messages (30 min)
5. **Friend nudge cron** — new `friend-nudge/route.ts` (45 min)
6. **Sounds** — `sounds.ts` add nudge sounds (5 min)
7. **UI banner** — `StreakNudgeBanner.tsx` component (45 min)
8. **Home page integration** — `page.tsx` add banner (5 min)
9. **Tests** — unit + component tests (60 min)
10. **Vercel config** — `vercel.json` add friend-nudge cron (2 min)
11. **Modal gallery** — add StreakNudgeBanner entries to `modal-gallery.html` (10 min)

---

### Interaction with Existing Systems

| System | Impact |
|---|---|
| **Offline / PWA** | Banner works offline (Zustand localStorage). Push requires connectivity. |
| **Subscription gating** | Nudges are free-tier friendly. No Pro gating. |
| **Dual stores** | Reads `useStore.progress.lastActiveDate` (practice store) for streak state. Does not modify either progress store. |
| **useDbSync** | Nudge state is client-only, not synced to server. Push notifications are server-side. No sync conflicts. |
| **Feature flags** | Gated by existing `flagStreaks` feature flag. No new flag needed. |
| **WelcomeBack flow** | `checkNudges` explicitly returns early if `comeback.isInComebackFlow` is true. The two systems are mutually exclusive. |
| **Streak freeze** | Day-2 banner offers streak freeze as secondary action, calling existing `useStreakFreeze()`. |
| **Dark mode** | Banner must support both light and dark themes using existing Tailwind dark: classes. |

---

## Critic Resolutions

The following issues were identified during critical review and are now resolved in this plan.

### CR-1 [CRITICAL] `dismissedNudges` is never cleared daily

**Issue:** The plan's edge case #10 claims `dismissedNudges` is cleared during `initDailyQuests()`. Verified: `initDailyQuests()` (line 241-263 of `useEngagementStore.ts`) resets `dailyChestClaimed`, `freezeUsedToday`, and quest arrays, but does NOT clear `dismissedNudges`. If dismissed once, nudges would never appear again.

**Resolution:** Do NOT modify `initDailyQuests`. Instead, change the nudge dismissal approach entirely. The `checkNudges` action already writes `lastDay1NudgeDate` / `lastDay2NudgeDate` as ISO date strings. The banner should check the date-based nudge state directly rather than relying on `dismissedNudges`. Replace the `dismissedNudges.includes(nudgeType)` check with a local component state `dismissed`:

```tsx
// In StreakNudgeBanner.tsx
const [dismissed, setDismissed] = useState(false);
if (dismissed) return null;

// On dismiss button:
<button onClick={() => setDismissed(true)}>×</button>
```

This means: the nudge shows once per app session per day. If the user navigates away and comes back, the nudge reappears (since `dismissed` is component state). This is the correct UX — nudges should be gently persistent within a day, not permanently silenceable. Remove any reference to `dismissedNudges` from this plan's banner component. The existing `dismissedNudges` array is used by other nudge types and should not be changed.

### CR-2 [CRITICAL] `checkNudges` only reads practice store `lastActiveDate` — misses course-only users

**Issue:** If a user only does course lessons, `useStore.progress.lastActiveDate` (practice store) will be stale, while `useCourseStore.progress.lastActiveDate` is current. Both the cron and client-side nudge check would incorrectly flag an active user as inactive.

**Resolution:** Update `checkNudges` to read from BOTH stores and use the more recent date:

```typescript
checkNudges: () => {
  const state = get();
  const today = getTodayDate();
  if (state.comeback.isInComebackFlow) return;

  const practiceDate = useStore.getState().progress.lastActiveDate;
  const courseDate = useCourseStore.getState().progress.lastActiveDate;
  // Use the more recent of the two
  const lastActiveDate = practiceDate > courseDate ? practiceDate : courseDate;

  if (!lastActiveDate) return;
  if (lastActiveDate === today) return;

  // ... rest of logic using lastActiveDate ...
};
```

For the cron route, update the query to join `user_progress` and `course_progress` tables:

```sql
SELECT up.user_id, up.current_streak,
  GREATEST(up.last_active_date, COALESCE(cp.last_active_date, '1970-01-01')) AS true_last_active
FROM user_progress up
LEFT JOIN course_progress cp ON cp.user_id = up.user_id
```

Use `true_last_active` for the `daysMissed` calculation instead of `up.last_active_date` alone.

### CR-3 [IMPORTANT] Mascot pose `'waving'` does not exist

**Issue:** Verified. `MascotPose` values do not include `'waving'`. Valid emotional poses include: `winking`, `excited`, `proud`, etc.

**Resolution:** Replace `pose="waving"` with `pose="winking"` in the Day-1 gentle nudge banner design.

### CR-4 [IMPORTANT] Friend nudge cron needs explicit DB column specification

**Issue:** The plan references `last_friend_nudge_date` without specifying which table, default value, or migration step.

**Resolution:** Add a `lastFriendNudgeSent` text column to the `push_subscriptions` table (the most logical location since friend nudges are sent TO a push subscription):

```typescript
// In schema.ts, add to pushSubscriptions table:
lastFriendNudgeSent: text('last_friend_nudge_sent'),
```

Default is `null`. The friend-nudge cron checks `ps.lastFriendNudgeSent !== today` before sending. After sending, update the column. Run `npm run db:push` as a prerequisite step. Add this as step 5.5 in the implementation order: "Schema change — add `lastFriendNudgeSent` to `push_subscriptions` + `npm run db:push`".

### CR-5 [IMPORTANT] `NudgeType` expansion and `EngagementActions` interface

**Issue:** The plan adds `streak_nudge_day1` and `streak_nudge_day2` to `NudgeType` but doesn't verify the `dismissNudge` action parameter type.

**Resolution:** Per CR-1 above, the banner no longer uses `dismissNudge` at all — it uses local component state. The `NudgeType` expansion is still needed for Mixpanel analytics events, but `dismissNudge` is unaffected. No additional interface changes needed.

### CR-6 [MINOR] Auto-playing sound on page load

**Issue:** `playSound('nudgeGentle')` on mount may be blocked by browsers before user interaction.

**Resolution:** Acknowledged — this is acceptable. The existing `playSound` function in `sounds.ts` already calls `ctx.resume()` on the AudioContext, which handles the suspended state. If it silently fails before any user interaction, the nudge still works visually. No change needed.

### CR-7 [MINOR] 6th store: `useHeartsStore`

**Issue:** The plan doesn't mention `useHeartsStore`. Verified: it exists at `src/store/useHeartsStore.ts`.

**Resolution:** The nudge system does not interact with hearts. No change needed, but noted for awareness.

### CR-8 [CROSS-CUTTING] Engagement sync for nudge state

**Issue:** The `nudge` state added to `useEngagementStore` is not in the Zod `engagementSyncSchema` or DB sync.

**Resolution:** Nudge state is intentionally client-only. There is no value in syncing `lastDay1NudgeDate` / `lastDay2NudgeDate` to the server — these are ephemeral UI triggers, not data that needs multi-device consistency. If a user opens the app on a second device, they'll simply see or not see a nudge based on that device's state. The plan's "Interaction with Existing Systems" table already states "Nudge state is client-only, not synced to server." No Zod or sync changes needed.

However, the `nudge` field MUST be added to the `merge` function in the persist config:

```typescript
nudge: persisted.nudge
  ? { ...defaults.nudge, ...persisted.nudge }
  : defaults.nudge,
```

### CR-9 [CROSS-CUTTING] Init ordering in `engagement-init.ts`

**Resolution:** The `checkNudges()` call must come AFTER `checkComebackFlow()` AND after `checkDailyRewardCalendar()` (if Plan 10 is also implemented). Add a comment block:

```typescript
// === Engagement init sequence (ORDER MATTERS) ===
// 1. checkComebackFlow — gates nudges/calendar (must be first)
// 2. checkDailyRewardCalendar — determines claim modal state
// 3. checkNudges — only if not in comeback/calendar flow
if (hasEngagementHistory) {
  useEngagementStore.getState().checkComebackFlow();
}
useEngagementStore.getState().checkDailyRewardCalendar();
useEngagementStore.getState().checkNudges();
```

### CR-10 [CROSS-CUTTING] Dark mode colors not specified

**Resolution:** Add explicit dark mode specifications for the banner:

**Day-1 (gentle):**
- Light: `bg-blue-50` with `border-blue-200`
- Dark: `dark:bg-blue-950/50` with `dark:border-blue-800`

**Day-2 (urgent):**
- Light: `bg-gradient-to-r from-amber-50 to-rose-50` with `border-amber-300`
- Dark: `dark:from-amber-950/50 dark:to-rose-950/50` with `dark:border-amber-700`

### CR-11 [CROSS-CUTTING] Friend nudge opt-out / consent

**Open product question:** Should users be able to opt out of receiving "your friend is about to lose their streak" notifications? Currently, the plan has no consent mechanism. **Recommendation:** Add an `allowFriendNudges` boolean to the user settings (default: `true`). The cron should check this before sending. This can be a follow-up — ship without it for MVP, but add the setting before public launch. The friend nudge cron should be behind a feature flag.
