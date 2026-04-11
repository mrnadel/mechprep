# Gap 5: Friend Quests, Shared Streaks & Activity Feed

## Overview & Motivation

The friends system has the social graph (friendships table, friend requests, weekly XP leaderboard, invite system) but no cooperative gameplay. Users can see friends but cannot interact with them beyond viewing profiles. Duolingo drives daily engagement through co-op quests, shared streaks, activity feeds, and social reactions (high-fives, nudges). This plan adds all four.

**What already exists (partially implemented stubs):**
- DB tables: `friend_quests`, `activity_feed`, `activity_reactions` (schema defined, tables created)
- API: `GET /api/friends/quests` (reads quests, auto-creates for unpaired friends)
- API: `GET /api/friends/activity` (reads friend activities with reactions), `POST` (high-five react)
- UI: `FriendQuestCard.tsx` (renders a quest card with dual progress bars)
- UI: `ActivityFeed.tsx` (renders feed with high-five buttons)
- UI: `FriendCard.tsx` (already shows shared streak badge when both users have active streaks)
- Lib: `friend-quests.ts` (5 quest definitions, deterministic `pickFriendQuest`, `calculateSharedStreak`)
- Friends page: `src/app/(app)/friends/page.tsx` (already integrates FriendQuestCard and ActivityFeed)

**What is MISSING (the actual work):**
1. No PATCH/POST endpoint for updating friend quest progress or claiming rewards
2. No code anywhere that inserts rows into `activity_feed` -- the table is empty
3. No mechanism to update `friend_quests.progressUser/progressPartner` when a user completes a lesson or practice session
4. No claim flow for friend quest rewards (gem source not in allowlist)
5. No activity feed cleanup (old entries accumulate forever)
6. Shared streak calculation exists in lib but is NOT called from the friends API -- `FriendCard` uses a simple "both > 0" check from `userProgress.currentStreak`, not `calculateSharedStreak()`
7. No push notifications for quest completion or friend activity
8. No tests for any of the friend quest or activity feed logic

---

## Current State Analysis

| Component | File | Status |
|---|---|---|
| DB schema: `friendQuests` | `src/lib/db/schema.ts:647-667` | Exists. Columns: id, questWeek, userId, partnerId, questType, target, progressUser, progressPartner, completed, rewardClaimed, createdAt |
| DB schema: `activityFeed` | `src/lib/db/schema.ts:671-684` | Exists. Columns: id, userId, type, data (jsonb), createdAt |
| DB schema: `activityReactions` | `src/lib/db/schema.ts:686-699` | Exists. Columns: id, activityId, userId, emoji, createdAt. Unique on (activityId, userId) |
| Quest definitions | `src/lib/friend-quests.ts:21-67` | 5 quests in `FRIEND_QUEST_POOL`: Team XP (500), Lesson Duo (10), Accuracy Alliance (80%), XP Sprint (800), Study Buddies (6) |
| Deterministic selection | `src/lib/friend-quests.ts:85-95` | `pickFriendQuest()` uses `hashSeed(week-sortedIds)` mod pool length |
| Shared streak calc | `src/lib/friend-quests.ts:110-143` | `calculateSharedStreak()` counts consecutive overlapping active days. **Not called anywhere.** |
| GET /api/friends/quests | `src/app/api/friends/quests/route.ts` | Works. Auto-creates quests for up to 3 unpaired friends. Returns enriched quest data with partner info. |
| GET /api/friends/activity | `src/app/api/friends/activity/route.ts:11-78` | Works. Returns last 20 activities from friends with reaction counts. **But no activities exist.** |
| POST /api/friends/activity | `src/app/api/friends/activity/route.ts:85-131` | Works. Inserts high-five reaction. Validates friendship. |
| FriendQuestCard | `src/components/friends/FriendQuestCard.tsx` | Works. Shows dual progress bars, claim button, reward preview. `onClaim` callback not wired. |
| ActivityFeed | `src/components/friends/ActivityFeed.tsx` | Works. SWR polling at 60s. High-five button with optimistic state. |
| FriendCard | `src/components/friends/FriendCard.tsx` | Shows shared streak badge when `userStreak > 0 && currentStreak > 0`. Uses `Math.min(userStreak, currentStreak)` as shared days. |
| Friends page | `src/app/(app)/friends/page.tsx` | Integrates all components. Shows quests section, activity feed, friend list. |
| Gem source allowlist | `src/app/api/engagement/route.ts:61-73` | Does NOT include `friend_quest_reward` -- any gems from friend quests will be silently dropped on sync |
| Engagement sync | `src/hooks/useDbSync.ts` | Does NOT sync any friend quest state (server-first architecture for friend quests is correct) |
| Quest progress tracking | `ResultScreen.tsx`, `SessionSummary.tsx` | Calls `updateQuestProgress()` for solo quests. Does NOT call any friend quest progress API. |

---

## Implementation Plan

### Phase 1: Server-Side Progress Updates

The core missing piece: when a user earns XP, completes lessons, or finishes sessions, the server needs to update their friend quest progress rows.

#### 1.1 Create `POST /api/friends/quests/progress` endpoint

**File:** `src/app/api/friends/quests/progress/route.ts` (new file)

This endpoint is called after each lesson/session completion to report the user's contribution to friend quests. It is server-authoritative -- the client reports what happened, the server validates and updates.

```typescript
// POST /api/friends/quests/progress
// Body: { event: 'xp_earned' | 'lesson_completed' | 'accuracy_report', value: number }
// Returns: { updated: Array<{ questId: string; myProgress: number; completed: boolean }> }

import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendQuests } from '@/lib/db/schema';
import { eq, or, and, sql } from 'drizzle-orm';
import { getCurrentWeekMonday } from '@/lib/quest-engine';

export async function POST(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { event, value } = body;

  if (!event || typeof value !== 'number' || value <= 0) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  // Cap values to prevent cheating
  const MAX_VALUES: Record<string, number> = {
    xp_earned: 5000,        // max possible from one session
    lesson_completed: 1,     // always 1 at a time
    accuracy_report: 100,    // percentage
  };
  const maxVal = MAX_VALUES[event];
  if (!maxVal || value > maxVal) {
    return NextResponse.json({ error: 'Invalid event or value' }, { status: 400 });
  }

  const questWeek = getCurrentWeekMonday();

  // Get all active (uncompleted) friend quests for this user this week
  const quests = await db
    .select()
    .from(friendQuests)
    .where(
      and(
        eq(friendQuests.questWeek, questWeek),
        eq(friendQuests.completed, false),
        or(eq(friendQuests.userId, userId), eq(friendQuests.partnerId, userId))
      )
    );

  const updated: Array<{ questId: string; myProgress: number; completed: boolean }> = [];

  for (const quest of quests) {
    const isUserA = quest.userId === userId;
    const progressCol = isUserA ? 'progressUser' : 'progressPartner';
    let increment = 0;

    // Match event to quest type
    switch (quest.questType) {
      case 'combined_xp':
        if (event === 'xp_earned') increment = value;
        break;
      case 'combined_lessons':
        if (event === 'lesson_completed') increment = value;
        break;
      case 'combined_accuracy':
        // For accuracy quests, we store the user's session accuracy
        // and compare both sides. We store sessions-at-target count.
        if (event === 'accuracy_report' && value >= quest.target) increment = 1;
        break;
    }

    if (increment === 0) continue;

    // Atomically increment progress and check completion
    const currentProgress = isUserA ? quest.progressUser : quest.progressPartner;
    const newProgress = Math.min(currentProgress + increment, quest.target);

    // For accuracy quests: completed = BOTH users meet threshold
    // For additive quests: completed = sum >= target
    let completed = false;
    if (quest.questType === 'combined_accuracy') {
      const otherProgress = isUserA ? quest.progressPartner : quest.progressUser;
      completed = newProgress >= 1 && otherProgress >= 1;
    } else {
      const otherProgress = isUserA ? quest.progressPartner : quest.progressUser;
      completed = newProgress + otherProgress >= quest.target;
    }

    // Update with optimistic concurrency (WHERE completed = false prevents race)
    const setClause = isUserA
      ? { progressUser: newProgress, completed }
      : { progressPartner: newProgress, completed };

    await db
      .update(friendQuests)
      .set(setClause)
      .where(and(eq(friendQuests.id, quest.id), eq(friendQuests.completed, false)));

    updated.push({
      questId: quest.id,
      myProgress: newProgress,
      completed,
    });
  }

  return NextResponse.json({ updated });
}
```

**Validation caps** to prevent client-side cheating:
- `xp_earned`: max 5000 per call (generous cap for double XP + long session)
- `lesson_completed`: always 1
- `accuracy_report`: max 100 (percentage)

**Race condition protection:** The `WHERE completed = false` in the UPDATE prevents a quest from being marked complete twice if both users submit simultaneously.

#### 1.2 Create `POST /api/friends/quests/claim` endpoint

**File:** `src/app/api/friends/quests/claim/route.ts` (new file)

```typescript
// POST /api/friends/quests/claim
// Body: { questId: string }
// Returns: { ok: true, rewardXp: number, rewardGems: number }

import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendQuests, gemTransactions, activityFeed } from '@/lib/db/schema';
import { eq, and, or } from 'drizzle-orm';
import { pickFriendQuest } from '@/lib/friend-quests';

export async function POST(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { questId } = body;
  if (!questId) {
    return NextResponse.json({ error: 'Missing questId' }, { status: 400 });
  }

  // Get the quest (must belong to this user, be completed, not already claimed)
  const [quest] = await db
    .select()
    .from(friendQuests)
    .where(
      and(
        eq(friendQuests.id, questId),
        eq(friendQuests.completed, true),
        eq(friendQuests.rewardClaimed, false),
        or(eq(friendQuests.userId, userId), eq(friendQuests.partnerId, userId))
      )
    )
    .limit(1);

  if (!quest) {
    return NextResponse.json(
      { error: 'Quest not found, not completed, or already claimed' },
      { status: 404 },
    );
  }

  // Get reward amounts from definition
  const def = pickFriendQuest(quest.userId, quest.partnerId, quest.questWeek);

  // Mark as claimed
  await db
    .update(friendQuests)
    .set({ rewardClaimed: true })
    .where(eq(friendQuests.id, questId));

  // Award gems via server-authoritative ledger
  await db.insert(gemTransactions).values({
    userId,
    amount: def.rewardGems,
    source: 'friend_quest_reward',
  });

  // Create activity feed entry for quest completion
  await db.insert(activityFeed).values({
    userId,
    type: 'quest_complete',
    data: { questType: quest.questType, questTitle: def.title, partnerId: quest.userId === userId ? quest.partnerId : quest.userId },
  });

  return NextResponse.json({
    ok: true,
    rewardXp: def.rewardXp,
    rewardGems: def.rewardGems,
  });
}
```

**Important:** The claim is per-user, not per-quest. Each user in the pair claims separately. The `rewardClaimed` flag on the `friend_quests` row tracks whether THIS query has been claimed, but since both users share one row, we need a design decision here.

**Design decision: per-user claim tracking.** The current schema has a single `rewardClaimed` boolean on the quest row. This means if User A claims, User B cannot claim. We need to change this.

#### 1.3 Schema amendment: per-user claim tracking

**File:** `src/lib/db/schema.ts`

Replace the single `rewardClaimed` column with two:

```typescript
// In friendQuests table definition, replace:
rewardClaimed: boolean('reward_claimed').notNull().default(false),
// With:
rewardClaimedUser: boolean('reward_claimed_user').notNull().default(false),
rewardClaimedPartner: boolean('reward_claimed_partner').notNull().default(false),
```

**Migration step:** `npm run db:push` (Drizzle Kit handles the column rename/addition).

This requires updating:
- `GET /api/friends/quests` -- return `rewardClaimed` as `isUserA ? q.rewardClaimedUser : q.rewardClaimedPartner`
- `POST /api/friends/quests/claim` -- set `rewardClaimedUser` or `rewardClaimedPartner` depending on who's claiming
- `FriendQuestCard` interface -- `rewardClaimed` stays the same (it's computed per-viewer)

---

### Phase 2: Client-Side Progress Reporting

After each lesson or practice session completes, the client must POST progress to the friend quest endpoint.

#### 2.1 Create `useFriendQuestSync` hook

**File:** `src/hooks/useFriendQuestSync.ts` (new file)

This is a lightweight hook that fires-and-forgets progress reports to the server. It does NOT manage local state -- friend quests are server-first.

```typescript
'use client';

/**
 * Report lesson/session completion to the friend quest progress API.
 * Fire-and-forget: friend quest progress is server-authoritative.
 * Errors are silently swallowed (friend quests are optional).
 */
export function reportFriendQuestProgress(
  event: 'xp_earned' | 'lesson_completed' | 'accuracy_report',
  value: number,
): void {
  if (value <= 0) return;
  fetch('/api/friends/quests/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, value }),
  }).catch(() => {
    // Silent failure — friend quests are best-effort
  });
}
```

#### 2.2 Wire progress reporting into ResultScreen and SessionSummary

**File:** `src/components/lesson/ResultScreen.tsx`

Add after the existing `updateQuestProgress` calls (around line 76):

```typescript
import { reportFriendQuestProgress } from '@/hooks/useFriendQuestSync';

// Inside the useEffect that tracks engagement (after updateQuestProgress calls):
reportFriendQuestProgress('xp_earned', lessonResult.xpEarned);
if (lessonResult.passed) {
  reportFriendQuestProgress('lesson_completed', 1);
  reportFriendQuestProgress('accuracy_report', lessonResult.accuracy);
}
```

**File:** `src/components/session/SessionSummary.tsx`

Add after the existing `updateQuestProgress` calls (around line 103):

```typescript
import { reportFriendQuestProgress } from '@/hooks/useFriendQuestSync';

// Inside the useEffect that tracks engagement:
reportFriendQuestProgress('xp_earned', summary.xpEarned);
reportFriendQuestProgress('lesson_completed', 1);
reportFriendQuestProgress('accuracy_report', summary.accuracy);
```

**Why fire-and-forget:** Friend quests are server-authoritative. The client doesn't need to know the result of the progress update to continue functioning. If the request fails (network error, rate limit), the user simply loses that progress increment -- which is acceptable because:
1. The next session will also report progress, catching up
2. The alternative (client-side tracking with sync) adds complexity and cheating surface

---

### Phase 3: Claim Flow in UI

#### 3.1 Wire the claim callback in Friends page

**File:** `src/app/(app)/friends/page.tsx`

Add a claim handler:

```typescript
const handleClaimQuest = useCallback(async (questId: string) => {
  try {
    const res = await fetch('/api/friends/quests/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questId }),
    });
    if (res.ok) {
      const data = await res.json();
      // Add gems to local engagement store so balance updates immediately
      const { addGems } = useEngagementStore.getState();
      addGems(data.rewardGems, 'friend_quest_reward');
      // Refresh quest list to show "Claimed" state
      mutateQuests();
    }
  } catch {
    // Silent failure
  }
}, [mutateQuests]);
```

Pass `onClaim={handleClaimQuest}` to `FriendQuestCard`:

```tsx
{friendQuests.map((q, i) => (
  <FriendQuestCard key={q.id} quest={q} onClaim={handleClaimQuest} index={i} />
))}
```

**Note:** The gems are awarded both server-side (via gem_transactions ledger insert in the claim endpoint) AND client-side (via `addGems()` for immediate UI feedback). The next engagement sync will reconcile via the ledger-based balance computation.

#### 3.2 Add `friend_quest_reward` to gem source allowlist

**File:** `src/app/api/engagement/route.ts`

Add to `VALID_GEM_SOURCES` (after line 72):

```typescript
friend_quest_reward: { maxEarn: 30, maxSpend: 0 },
```

The max of 30 matches the highest reward in `FRIEND_QUEST_POOL` (XP Sprint gives 30 gems).

**This is CRITICAL.** Without this, the client-side `addGems('friend_quest_reward')` transaction will be silently dropped by `validateTransactions()` during the next engagement sync, causing the client balance to desync from the server ledger. But since the claim endpoint ALSO inserts directly into `gem_transactions`, the server balance will be correct -- the issue is the client-side transaction getting stripped. To handle this cleanly:
- Option A: Add to allowlist (chosen). Both paths work.
- Option B: Don't call `addGems()` client-side, rely only on server insert + next hydration. Bad UX (delayed balance update).

---

### Phase 4: Activity Feed Population

The `activity_feed` table is empty because nothing writes to it. We need to insert activity items at key moments.

#### 4.1 Create `src/lib/activity-feed.ts` helper

**File:** `src/lib/activity-feed.ts` (new file)

```typescript
import { db } from '@/lib/db';
import { activityFeed } from '@/lib/db/schema';

export type ActivityType =
  | 'streak_milestone'
  | 'lesson_complete'
  | 'course_complete'
  | 'level_up'
  | 'quest_complete'
  | 'friend_quest_complete';

/**
 * Insert an activity feed item for a user.
 * Fire-and-forget -- errors are caught and logged, never thrown.
 */
export async function insertActivity(
  userId: string,
  type: ActivityType,
  data?: Record<string, unknown>,
): Promise<void> {
  try {
    await db.insert(activityFeed).values({
      userId,
      type,
      data: data ?? null,
    });
  } catch (err) {
    console.error('[activity-feed] Failed to insert:', err);
  }
}
```

#### 4.2 Insert activities at key moments

Activities should be created server-side (in API routes) to ensure they're written even if the client crashes. The activity-generating events and where to insert them:

| Event | Where to Insert | Data |
|---|---|---|
| **Streak milestone** | `POST /api/engagement` -- when `streakMilestones` array grows | `{ streakDays: number }` |
| **Lesson complete** | `POST /api/course-progress` -- when `completedLessons` grows | `{ lessonName?: string }` |
| **Level up** | `POST /api/progress` -- when `currentLevel` increases | `{ level: number }` |
| **Friend quest complete** | `POST /api/friends/quests/claim` -- already done in Phase 1.2 | `{ questType, questTitle, partnerId }` |

**File:** `src/app/api/progress/route.ts` -- Add to POST handler after upsert:

```typescript
import { insertActivity } from '@/lib/activity-feed';

// After saving progress, check if level increased
if (existingProgress && data.progress.currentLevel) {
  const prevLevel = existingProgress.currentLevel ?? 1;
  const newLevel = data.progress.currentLevel;
  if (newLevel > prevLevel) {
    await insertActivity(userId, 'level_up', { level: newLevel });
  }
}
```

**File:** `src/app/api/course-progress/route.ts` -- Add to POST handler after upsert:

```typescript
import { insertActivity } from '@/lib/activity-feed';

// After saving course progress, check for new lesson completions
if (existingProgress && data.progress.completedLessons) {
  const prevLessons = Object.keys(existingProgress.completedLessons ?? {});
  const newLessons = Object.keys(data.progress.completedLessons);
  const newCompletions = newLessons.filter((id) => !prevLessons.includes(id));
  if (newCompletions.length > 0) {
    await insertActivity(userId, 'lesson_complete', {
      count: newCompletions.length,
    });
  }
}
```

**File:** `src/app/api/engagement/route.ts` -- Add to POST handler after upsert:

```typescript
import { insertActivity } from '@/lib/activity-feed';

// After saving engagement, check for new streak milestones
if (data.streak.milestonesReached.length > 0) {
  const existingMilestones = (existing[0]?.streakMilestones as number[]) ?? [];
  const newMilestones = data.streak.milestonesReached.filter(
    (m: number) => !existingMilestones.includes(m),
  );
  for (const days of newMilestones) {
    await insertActivity(userId, 'streak_milestone', { streakDays: days });
  }
}
```

**Rate limiting:** To prevent feed spam (e.g., user completes 10 lessons in a row), add a de-duplication check:

```typescript
// In insertActivity, before the insert:
const ONE_HOUR = 60 * 60 * 1000;
const recent = await db
  .select({ id: activityFeed.id })
  .from(activityFeed)
  .where(
    and(
      eq(activityFeed.userId, userId),
      eq(activityFeed.type, type),
      sql`${activityFeed.createdAt} > now() - interval '1 hour'`,
    )
  )
  .limit(1);
if (recent.length > 0 && type === 'lesson_complete') return; // max 1 per hour for lessons
```

This prevents the feed from being flooded with "completed a lesson!" every 3 minutes.

#### 4.3 Activity feed cleanup (TTL)

Old activity feed items should be cleaned up to prevent table bloat. Add a cleanup query to the existing cron job or create a new one.

**Option: Piggyback on existing cron.** The `streak-reminder` cron at `vercel.json` runs daily at 7PM UTC. Add cleanup there, or create a separate weekly cron:

**File:** `src/app/api/cron/activity-cleanup/route.ts` (new file)

```typescript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { activityFeed, activityReactions } from '@/lib/db/schema';
import { sql, lt } from 'drizzle-orm';

// Delete activity feed items older than 14 days
export async function GET() {
  const cutoff = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  // Reactions cascade-delete with activities (ON DELETE CASCADE)
  const result = await db
    .delete(activityFeed)
    .where(lt(activityFeed.createdAt, cutoff));

  return NextResponse.json({ ok: true, deletedBefore: cutoff.toISOString() });
}
```

**File:** `vercel.json` -- Add cron entry:

```json
{
  "path": "/api/cron/activity-cleanup",
  "schedule": "0 3 * * 1"
}
```

Runs every Monday at 3 AM UTC. The `activityReactions` rows are cascade-deleted via the FK constraint (`onDelete: 'cascade'`).

---

### Phase 5: Shared Streak Enhancement

#### 5.1 Current behavior vs desired behavior

**Current:** `FriendCard.tsx` line 41 does `const hasSharedStreak = userStreak > 0 && currentStreak > 0` and shows `Math.min(userStreak, currentStreak)` as the shared streak days. This is an approximation -- it assumes if both have streaks, they overlap.

**Desired:** Show the actual count of consecutive days both users were active. The `calculateSharedStreak()` function in `friend-quests.ts` already does this correctly using `activeDays` arrays, but it's never called.

**Problem:** The `activeDays` arrays live in client-side stores (`useStore.progress.activeDays` and `useCourseStore.progress.activeDays`) and are NOT synced to the DB. The server has no way to compute the shared streak from the DB schema.

#### 5.2 Decision: Keep the approximation for now

The real `calculateSharedStreak` requires knowing both users' active days, which aren't in the DB. Building a full `active_days` table is out of scope for this gap.

**The current approximation is actually reasonable** for the MVP:
- `Math.min(userStreak, currentStreak)` is a good proxy because if User A has a 5-day streak and User B has a 3-day streak, they've overlapped for at least 3 days (both were active yesterday, the day before, etc.)
- The edge case where streaks started on different days is rare for active friends

**Future improvement:** Add an `active_days` JSONB column to `user_progress` and `course_progress` (or a separate `user_active_days` table) to enable true shared streak calculation. Track this as tech debt.

#### 5.3 Improve shared streak display (no backend changes needed)

The current `FriendCard.tsx` badge is functional. Enhance it slightly:

**File:** `src/components/friends/FriendCard.tsx`

The existing badge `🔥 {sharedStreakDays}d shared` is good. Add a tooltip/title for clarity:

```tsx
{hasSharedStreak && (
  <span
    className="shrink-0 text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded-full"
    title={`You and ${displayName} both have active streaks`}
  >
    🔥 {sharedStreakDays}d shared
  </span>
)}
```

No other changes needed -- the badge already works.

---

### Phase 6: Push Notifications

#### 6.1 Friend quest completion notification

When a friend quest is completed (both users' combined progress meets the target), notify both users.

**File:** `src/app/api/friends/quests/progress/route.ts`

Add after the progress update loop, when `completed` transitions to true:

```typescript
import { sendPushToUser } from '@/lib/push';

// After the update loop:
for (const result of updated) {
  if (result.completed) {
    // Get partner ID from the quest
    const quest = quests.find((q) => q.id === result.questId);
    if (!quest) continue;
    const partnerId = quest.userId === userId ? quest.partnerId : quest.userId;
    const def = pickFriendQuest(quest.userId, quest.partnerId, quest.questWeek);

    // Notify partner (not the current user -- they see it in the response)
    sendPushToUser(partnerId, {
      title: 'Friend Quest Complete! 🎉',
      body: `You and your friend completed "${def.title}"! Claim your reward.`,
      url: '/friends',
    }).catch(() => {});
  }
}
```

**Note:** `sendPushToUser` is assumed to exist in `src/lib/push.ts`. If it doesn't exist with that exact signature, create a wrapper:

```typescript
export async function sendPushToUser(userId: string, payload: { title: string; body: string; url?: string }): Promise<void> {
  const subs = await db
    .select()
    .from(pushSubscriptions)
    .where(eq(pushSubscriptions.userId, userId));

  for (const sub of subs) {
    await sendPushNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      payload,
    ).catch(() => {});
  }
}
```

#### 6.2 High-five reaction notification

When a user high-fives a friend's activity, notify the friend.

**File:** `src/app/api/friends/activity/route.ts` -- In the POST handler, after inserting the reaction:

```typescript
import { sendPushToUser } from '@/lib/push';

// After the reaction insert, get the reactor's name
const [reactor] = await db
  .select({ displayName: users.displayName })
  .from(users)
  .where(eq(users.id, userId))
  .limit(1);

sendPushToUser(activity.userId, {
  title: 'High five! 🙌',
  body: `${reactor?.displayName ?? 'A friend'} gave you a high five!`,
  url: '/friends',
}).catch(() => {});
```

---

### Phase 7: Edge Cases

#### 7.1 User with 0 friends

**GET /api/friends/quests** already returns `{ quests: [] }` when `friendIds.length === 0`. The friends page already hides the "Weekly Quests" section when `friendQuests.length === 0`. No changes needed.

#### 7.2 Friend removed mid-quest

If a friendship is deleted while a friend quest is active:
- The quest row remains in `friend_quests` (no FK cascade on friendships)
- The quest will still show in the UI until the week resets
- Both users can still claim rewards if it's completed

**Decision:** This is acceptable. The quest was legitimately started. Removing a friend doesn't invalidate work already done. The quest simply won't be renewed next week since the friendship no longer exists.

**Guard needed:** In `GET /api/friends/quests`, when auto-creating quests for unpaired friends, verify the friendship still exists:

```typescript
// In the auto-creation loop, before inserting:
const { areFriends } = await import('@/lib/db/friends');
const stillFriends = await areFriends(userId, partnerId);
if (!stillFriends) continue;
```

#### 7.3 Both users on different tiers (free vs pro)

Free-tier users are limited to 5 daily questions. This naturally limits their contribution to friend quests. A free user paired with a pro user will contribute less XP/lessons.

**Decision:** No tier-based adjustment. Friend quests are designed with targets achievable by free-tier users (e.g., "complete 6 lessons" over a week is 1/day, doable on free tier). The quest pool already has reasonable targets. If the pair fails, they fail -- this creates motivation to upgrade or try harder.

#### 7.4 User paired with multiple friends

Each friend pair gets an independent quest. A user with 5 friends has up to 3 active friend quests (the `toCreate` slice in `GET /api/friends/quests` limits to 3).

**Why max 3:** Beyond 3 concurrent co-op quests, the UI becomes cluttered and the user's attention is split. The 3 most recent friends (by friendship creation date) get quests. This is already implemented.

#### 7.5 Quest progress reported for non-existent or old quests

The `POST /api/friends/quests/progress` endpoint queries only `WHERE questWeek = currentWeek AND completed = false`. If a user submits progress for a completed or expired quest, the query returns no rows and nothing is updated. Safe by design.

#### 7.6 Double-claiming prevention

The claim endpoint uses `WHERE completed = true AND rewardClaimedUser = false` (or `rewardClaimedPartner`). If the user refreshes and clicks Claim twice, the second request finds no matching row and returns 404. The UI also updates optimistically via `mutateQuests()` so the button disappears immediately.

#### 7.7 Clock manipulation / timezone issues

`getCurrentWeekMonday()` uses local time, not UTC. Two friends in different timezones may see different "current week" values briefly around midnight Monday. This is acceptable -- the quest creation uses the querying user's Monday, and the matching happens via the stored `questWeek` column. The only edge case is if User A creates the quest on their Monday but User B's local time is still Sunday. When User B queries, their `getCurrentWeekMonday()` returns last week, so they won't see the new quest until their local Monday arrives. This is a 24-hour window at most and is acceptable.

---

### Phase 8: Testing Strategy

#### 8.1 Unit tests for friend-quests.ts

**File:** `src/__tests__/lib/friend-quests.test.ts` (new file)

```typescript
import { describe, it, expect } from 'vitest';
import { pickFriendQuest, formatQuestDescription, calculateSharedStreak, FRIEND_QUEST_POOL } from '@/lib/friend-quests';

describe('pickFriendQuest', () => {
  it('returns the same quest for the same pair regardless of order', () => {
    const q1 = pickFriendQuest('user-a', 'user-b', '2026-04-06');
    const q2 = pickFriendQuest('user-b', 'user-a', '2026-04-06');
    expect(q1.type).toBe(q2.type);
    expect(q1.target).toBe(q2.target);
  });

  it('returns different quests for different weeks', () => {
    const q1 = pickFriendQuest('user-a', 'user-b', '2026-04-06');
    const q2 = pickFriendQuest('user-a', 'user-b', '2026-04-13');
    // May or may not differ (depends on hash), but should not crash
    expect(FRIEND_QUEST_POOL).toContainEqual(q1);
    expect(FRIEND_QUEST_POOL).toContainEqual(q2);
  });

  it('returns a valid quest from the pool', () => {
    const q = pickFriendQuest('any-user-1', 'any-user-2');
    expect(q.type).toBeTruthy();
    expect(q.target).toBeGreaterThan(0);
    expect(q.rewardXp).toBeGreaterThan(0);
    expect(q.rewardGems).toBeGreaterThan(0);
  });
});

describe('formatQuestDescription', () => {
  it('replaces {target} with the actual target', () => {
    const def = FRIEND_QUEST_POOL[0]; // Team XP Challenge, target 500
    const desc = formatQuestDescription(def);
    expect(desc).toContain('500');
    expect(desc).not.toContain('{target}');
  });
});

describe('calculateSharedStreak', () => {
  it('returns 0 for no overlap', () => {
    const result = calculateSharedStreak(
      ['2026-04-05', '2026-04-04'],
      ['2026-04-03', '2026-04-02'],
    );
    expect(result).toBe(0);
  });

  it('counts consecutive overlapping days from today backward', () => {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().slice(0, 10);

    const result = calculateSharedStreak(
      [today, yesterday, twoDaysAgo],
      [today, yesterday],
    );
    expect(result).toBe(2); // today + yesterday overlap
  });

  it('returns 0 if neither user was active today or yesterday', () => {
    const result = calculateSharedStreak(
      ['2026-01-01', '2026-01-02'],
      ['2026-01-01', '2026-01-02'],
    );
    expect(result).toBe(0);
  });
});
```

#### 8.2 API integration tests

**File:** `src/__tests__/critical/friend-quests-api.test.ts` (new file)

Test the progress and claim endpoints with mocked DB:

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('Friend Quest Progress API', () => {
  it('rejects unauthenticated requests');
  it('rejects invalid event types');
  it('caps values at maximum');
  it('increments progress for matching quest types');
  it('does not increment for non-matching quest types');
  it('marks quest completed when threshold met');
  it('handles accuracy quests (both must meet threshold)');
});

describe('Friend Quest Claim API', () => {
  it('rejects unauthenticated requests');
  it('rejects claim for uncompleted quest');
  it('rejects double-claim');
  it('awards gems via ledger insert');
  it('creates activity feed entry');
});
```

#### 8.3 Component tests

**File:** `src/__tests__/components/FriendQuestCard.test.tsx`

Test rendering of different quest states (in progress, completed unclaimed, claimed), dual progress bars, accuracy quest display.

---

### Phase 9: Modal Gallery Entry

Per `CLAUDE.md`: "Every new screen, modal, or overlay must be added to `modal-gallery.html`."

No new modals or overlays are created in this plan. The friend quest claim is inline (button in the card), the activity feed is a page section, and the shared streak badge is part of the friend card. No gallery entries needed.

If a celebration modal is added for quest completion in the future, add it then.

---

### Phase 10: Implementation Order

| Step | Task | Files | Est. Time |
|---|---|---|---|
| 1 | Schema change: split `rewardClaimed` into per-user columns | `schema.ts` + `npm run db:push` | 15 min |
| 2 | Add `friend_quest_reward` to `VALID_GEM_SOURCES` | `engagement/route.ts` | 5 min |
| 3 | Create `POST /api/friends/quests/progress` endpoint | New file | 45 min |
| 4 | Create `POST /api/friends/quests/claim` endpoint | New file | 30 min |
| 5 | Update `GET /api/friends/quests` for per-user claim columns | `quests/route.ts` | 15 min |
| 6 | Create `reportFriendQuestProgress` helper | New file | 10 min |
| 7 | Wire progress reporting into ResultScreen + SessionSummary | Two files, ~5 lines each | 15 min |
| 8 | Wire claim callback in Friends page | `friends/page.tsx` | 15 min |
| 9 | Create `insertActivity` helper | New file | 15 min |
| 10 | Insert activities in progress/course-progress/engagement APIs | Three files, ~10 lines each | 30 min |
| 11 | Activity feed cleanup cron | New file + `vercel.json` | 15 min |
| 12 | Push notifications for quest completion + high-fives | Two files | 20 min |
| 13 | Unit tests for `friend-quests.ts` | New file | 30 min |
| 14 | API tests for progress + claim endpoints | New file | 45 min |
| 15 | Component test for FriendQuestCard | New file | 20 min |
| 16 | Shared streak badge tooltip enhancement | `FriendCard.tsx` | 5 min |
| **Total** | | | **~5.5 hours** |

**Recommended execution order:** Steps 1-2 first (foundation), then 3-5 (server APIs), then 6-8 (client wiring), then 9-11 (activity feed), then 12 (notifications), then 13-15 (tests), then 16 (polish).

---

## Appendix A: Complete Request/Response Shapes

### POST /api/friends/quests/progress

**Request:**
```json
{
  "event": "xp_earned" | "lesson_completed" | "accuracy_report",
  "value": 150
}
```

**Response (200):**
```json
{
  "updated": [
    {
      "questId": "abc-123",
      "myProgress": 350,
      "completed": false
    }
  ]
}
```

### POST /api/friends/quests/claim

**Request:**
```json
{
  "questId": "abc-123"
}
```

**Response (200):**
```json
{
  "ok": true,
  "rewardXp": 100,
  "rewardGems": 20
}
```

**Response (404):**
```json
{
  "error": "Quest not found, not completed, or already claimed"
}
```

### GET /api/friends/quests (existing, updated response)

**Response:**
```json
{
  "quests": [
    {
      "id": "abc-123",
      "questWeek": "2026-04-06",
      "type": "combined_xp",
      "title": "Team XP Challenge",
      "description": "Together, earn 500 XP this week",
      "icon": "⚡",
      "target": 500,
      "myProgress": 200,
      "partnerProgress": 150,
      "completed": false,
      "rewardClaimed": false,
      "rewardXp": 100,
      "rewardGems": 20,
      "partner": {
        "id": "user-xyz",
        "displayName": "Jane",
        "image": "https://...",
        "level": 12
      }
    }
  ]
}
```

### GET /api/friends/activity (existing, no changes)

**Response:**
```json
{
  "activities": [
    {
      "id": "act-123",
      "userId": "user-xyz",
      "displayName": "Jane",
      "image": "https://...",
      "type": "lesson_complete",
      "data": { "count": 1 },
      "createdAt": "2026-04-07T14:30:00.000Z",
      "reactionCount": 2,
      "userReacted": false
    }
  ]
}
```

---

## Appendix B: Schema Diff Summary

### Modified: `friend_quests` table

```diff
- rewardClaimed: boolean('reward_claimed').notNull().default(false),
+ rewardClaimedUser: boolean('reward_claimed_user').notNull().default(false),
+ rewardClaimedPartner: boolean('reward_claimed_partner').notNull().default(false),
```

### No new tables

All three tables (`friend_quests`, `activity_feed`, `activity_reactions`) already exist in the schema.

### Modified: `VALID_GEM_SOURCES`

```diff
+ friend_quest_reward: { maxEarn: 30, maxSpend: 0 },
```

---

## Appendix C: Mixpanel Analytics Events

Define these events for measuring feature effectiveness:

| Event | Properties | When Fired |
|---|---|---|
| `friend_quest_progress` | `{ questType, event, value, completed }` | After progress update |
| `friend_quest_claimed` | `{ questType, rewardGems }` | After successful claim |
| `friend_quest_viewed` | `{ questCount }` | When friends page loads with quests |
| `activity_feed_viewed` | `{ activityCount }` | When friends page loads with activities |
| `activity_high_five` | `{ activityType }` | When user reacts to an activity |

Add these to the relevant client-side handlers using the existing `analytics.track()` wrapper from `src/lib/mixpanel.ts`.

---

## Appendix D: Known Limitations & Future Work

1. **Shared streak is approximate.** Uses `Math.min(userStreak, friendStreak)` instead of actual overlapping active days. Requires `active_days` DB column for accuracy.

2. **Friend quests max 3 per user per week.** Users with >3 friends only get quests with 3 of them. Consider rotating which friends get paired each week.

3. **No nudge for inactive quest partner.** If your friend hasn't contributed to the quest, there's no "nudge" button. This could be added as a push notification button on the FriendQuestCard.

4. **Activity feed is 14-day rolling window.** Older activities are deleted by cron. No pagination implemented -- the API returns up to 20 items. For users with many active friends, pagination may be needed.

5. **No optimistic UI for progress updates.** The FriendQuestCard shows server data (via SWR). Progress updates are fire-and-forget, so the card doesn't update until the next SWR refetch (60s polling or manual mutate). Consider calling `mutateQuests()` after reporting progress.

6. **Accuracy Alliance quest counting.** The current implementation counts "sessions where accuracy >= target%" rather than tracking running accuracy. This means each qualifying session increments by 1, and the target is effectively "complete 1 qualifying session." Consider changing the target to a higher number (e.g., target=3 meaning "both must have 3 sessions at 80%+") for more sustained engagement.

7. **`calculateSharedStreak` in `friend-quests.ts` is dead code.** It works correctly but is never called. Either remove it to reduce confusion or implement the `active_days` tracking to use it.

---

## Critic Resolutions (42-Issue Audit)

The following addresses all issues raised in `critique-high-priority.md` for Gap 5:

### CR-2.1 [CRITICAL] `rewardClaimed` schema change is a DESTRUCTIVE migration

**Critic says:** Dropping `reward_claimed` and adding two new columns loses existing data. `db:push` does not run data migrations.

**Verification:** Confirmed. The schema at line 659 has `rewardClaimed: boolean('reward_claimed')`. However, the `friend_quests` table was only recently added and is empty in production (no quests have been created yet since the progress/claim endpoints do not exist).

**Resolution:** Explicitly verify and document that the table is empty before running the migration:

```sql
-- PRE-MIGRATION CHECK: Run this before db:push
SELECT COUNT(*) FROM friend_quests WHERE reward_claimed = true;
-- If count > 0, run the data migration below BEFORE schema change:
-- ALTER TABLE friend_quests ADD COLUMN reward_claimed_user BOOLEAN NOT NULL DEFAULT false;
-- ALTER TABLE friend_quests ADD COLUMN reward_claimed_partner BOOLEAN NOT NULL DEFAULT false;
-- UPDATE friend_quests SET reward_claimed_user = reward_claimed, reward_claimed_partner = reward_claimed WHERE reward_claimed = true;
-- ALTER TABLE friend_quests DROP COLUMN reward_claimed;
```

For initial deployment (table is empty), `npm run db:push` is safe. Add a WARNING comment at the top of the schema change documenting the destructive nature for future developers.

### CR-2.2 [CRITICAL] `sendPushToUser` does NOT exist

**Critic says:** `src/lib/push.ts` only exports `sendPushNotification(subscription, payload)`, not `sendPushToUser(userId, payload)`.

**Verification:** Confirmed. `push.ts` has exactly one export: `sendPushNotification`. The `pushSubscriptions` schema has columns `endpoint`, `p256dh`, `auth` — matching the plan's wrapper code.

**Resolution:** This is a NEW function to create, not an import of an existing function. Update Phase 6.1 to clearly state: "Create the following wrapper in `src/lib/push.ts`":

```typescript
import { db } from '@/lib/db';
import { pushSubscriptions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function sendPushToUser(
  userId: string,
  payload: PushPayload,
): Promise<void> {
  const subs = await db
    .select()
    .from(pushSubscriptions)
    .where(eq(pushSubscriptions.userId, userId));

  for (const sub of subs) {
    await sendPushNotification(
      { endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth },
      payload,
    ).catch(() => {}); // Silent failure per-subscription
  }
}
```

The `pushSubscriptions` columns (`endpoint`, `p256dh`, `auth`) are verified against the schema at lines 570-584.

### CR-2.3 [CRITICAL] Race condition in friend quest progress

**Critic says:** Read-compute-write pattern can lead to stale data if both friends submit simultaneously. The `completed` flag can be overwritten.

**Verification:** Partially valid. The race is benign for progress columns (each user updates their own column) but the `completed` flag could theoretically be overwritten to `false` by a stale read.

**Resolution:** Replace the read-compute-write with atomic SQL updates:

```typescript
// For additive quests (combined_xp, combined_lessons):
const progressColumn = isUserA ? friendQuests.progressUser : friendQuests.progressPartner;
await db
  .update(friendQuests)
  .set({
    [isUserA ? 'progressUser' : 'progressPartner']: sql`LEAST(${progressColumn} + ${increment}, ${quest.target})`,
    completed: sql`CASE
      WHEN ${friendQuests.progressUser} + ${friendQuests.progressPartner} + ${increment} >= ${quest.target}
      THEN true ELSE ${friendQuests.completed} END`,
  })
  .where(and(eq(friendQuests.id, quest.id), eq(friendQuests.completed, false)));
```

Key change: `completed` uses `ELSE completed` (preserves current DB value) instead of `ELSE false` (which could overwrite a concurrent `true`). The `WHERE completed = false` also prevents updates after completion.

### CR-2.4 [CRITICAL] `combined_accuracy` quest is trivially completable

**Critic says:** Target = 80 means "80% accuracy threshold" but completion check only requires 1 qualifying session per user.

**Resolution:** Change the accuracy quest definition to require multiple qualifying sessions:

```typescript
// In FRIEND_QUEST_POOL, update Accuracy Alliance:
{
  type: 'combined_accuracy',
  title: 'Accuracy Alliance',
  description: 'Both score 80%+ in at least {target} sessions this week',
  icon: '🎯',
  target: 3,  // Changed from 80 to 3 sessions
  rewardXp: 80,
  rewardGems: 15,
}
```

The progress endpoint logic stays the same: `if (event === 'accuracy_report' && value >= 80) increment = 1`. The completion check becomes: both users need `progress >= 3` (3 qualifying sessions each). The threshold of 80% is now hardcoded in the server logic and the description says "80%+".

### CR-2.5 [IMPORTANT] Activity feed de-duplication only covers `lesson_complete`

**Resolution:** Extend de-duplication to all activity types that can fire in rapid succession:

```typescript
// Types that should be rate-limited (max 1 per hour):
const RATE_LIMITED_TYPES: ActivityType[] = ['lesson_complete', 'level_up'];

if (RATE_LIMITED_TYPES.includes(type) && recent.length > 0) return;
```

`streak_milestone` fires at most once per day (on streak check), so it does not need rate limiting.

### CR-2.6 [IMPORTANT] Claim endpoint uses old `rewardClaimed` schema

**Critic says:** Phase 1.2 claim code references `rewardClaimed: true` but Phase 1.3 changes the schema.

**Resolution:** Update the claim code in Phase 1.2 to use per-user columns from the start. Remove the intermediate Phase 1.3 "schema amendment" — present the final schema in Phase 1.1 and use per-user columns everywhere:

```typescript
// In claim endpoint:
const isUserA = quest.userId === userId;
const claimCol = isUserA ? 'rewardClaimedUser' : 'rewardClaimedPartner';
const alreadyClaimed = isUserA ? quest.rewardClaimedUser : quest.rewardClaimedPartner;
if (alreadyClaimed) {
  return NextResponse.json({ error: 'Already claimed' }, { status: 400 });
}
await db.update(friendQuests).set({ [claimCol]: true }).where(eq(friendQuests.id, questId));
```

### CR-2.7 [IMPORTANT] XP reward never actually awarded

**Critic says:** The claim endpoint returns `rewardXp` but no code awards it.

**Resolution:** Remove `rewardXp` from friend quest definitions. Friend quests reward gems only. Rationale:
- XP award requires choosing between `useStore` (practice) and `useCourseStore` (course) — there is no obvious choice for a cooperative quest.
- Server-side XP award would require updating either `user_progress.totalXp` or `course_progress.totalXp`, adding complexity.
- Gems are the primary reward currency for cooperative activities (consistent with solo quests which also award gems, not XP).

Update `FRIEND_QUEST_POOL` to remove `rewardXp` fields. Update the claim endpoint response to only return `rewardGems`.

### CR-2.8 [IMPORTANT] Three separate HTTP requests after every lesson

**Resolution:** Batch the events into a single request:

```typescript
// Updated reportFriendQuestProgress signature:
export function reportFriendQuestProgress(
  events: Array<{ event: 'xp_earned' | 'lesson_completed' | 'accuracy_report'; value: number }>,
): void {
  const filtered = events.filter(e => e.value > 0);
  if (filtered.length === 0) return;
  fetch('/api/friends/quests/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ events: filtered }),
  }).catch(() => {});
}

// Usage in ResultScreen:
reportFriendQuestProgress([
  { event: 'xp_earned', value: lessonResult.xpEarned },
  { event: 'lesson_completed', value: 1 },
  { event: 'accuracy_report', value: lessonResult.accuracy },
]);
```

Update the server endpoint to accept `{ events: Array<...> }` and process all events in a single DB transaction.

### CR-2.9 [IMPORTANT] No Zod validation on new endpoints

**Resolution:** Add Zod schemas to `src/lib/validation.ts`:

```typescript
export const friendQuestProgressSchema = z.object({
  events: z.array(z.object({
    event: z.enum(['xp_earned', 'lesson_completed', 'accuracy_report']),
    value: z.number().positive().max(5000),
  })).min(1).max(5),
});

export const friendQuestClaimSchema = z.object({
  questId: z.string().uuid(),
});
```

Use `schema.parse(body)` in both endpoints. This follows the existing validation pattern in the codebase.

### CR-2.10 [MINOR] `modal-gallery.html` does not exist

**Resolution:** No new modals are created by this plan. The gallery file creation is moved to the shared Phase 0 prerequisites in the MASTER-PLAN.

### CR-2.11 [MINOR] `pickFriendQuest` reward drift if pool changes

**Resolution:** Store `rewardGems` on the `friend_quests` row at creation time:

```typescript
// In GET /api/friends/quests auto-creation:
const def = pickFriendQuest(sortedA, sortedB, questWeek);
await db.insert(friendQuests).values({
  questWeek, userId: sortedA, partnerId: sortedB,
  questType: def.type, target: def.target,
  rewardGems: def.rewardGems, // NEW: persist at creation
});
```

This requires adding a `rewardGems` column to the `friend_quests` schema:
```typescript
rewardGems: integer('reward_gems').notNull().default(20),
```

The claim endpoint then reads `quest.rewardGems` directly instead of re-deriving from the pool.

### CR-5.2 [CRITICAL] Cross-plan: `friend_quest_reward` gem source in VALID_GEM_SOURCES

**Resolution:** Moved to shared Phase 0 prerequisites in the MASTER-PLAN. All new gem sources from ALL plans (high + medium priority) are added in one coordinated update.

### CR-5.4 [IMPORTANT] Cross-plan: ResultScreen `useEffect` bloat

**Resolution:** Extract friend quest reporting into its own `useEffect` with its own ref guard:

```typescript
// Separate useEffect for friend quest progress (Gap 5)
const friendQuestReported = useRef(false);
useEffect(() => {
  if (!result || friendQuestReported.current) return;
  friendQuestReported.current = true;
  reportFriendQuestProgress([
    { event: 'xp_earned', value: result.xpEarned },
    { event: 'lesson_completed', value: 1 },
    { event: 'accuracy_report', value: result.accuracy },
  ]);
}, [result]);
```

### CR-5.6 [IMPORTANT] Cross-plan: Cruising bonus counts toward friend quest XP progress

**Resolution:** Documented as intentional. The cruising bonus is a small additive amount (+3 XP max on a 10 XP lesson). This does not meaningfully accelerate friend quest completion.

### CR-6.2 Cross-plan: Accessibility for FriendQuestCard and ActivityFeed

**Resolution:** Add to Phase 3 (Claim Flow):
- `FriendQuestCard` claim button: `aria-label="Claim reward for {questTitle}"`
- `ActivityFeed` high-five button: `aria-label="Give {displayName} a high five"`
- Progress bars: `role="progressbar" aria-valuenow={myProgress} aria-valuemax={target}`
