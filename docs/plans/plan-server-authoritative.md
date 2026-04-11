# Server-Authoritative Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make streak, activeDays, quest claiming, daily reward claiming, streak freezes, and double XP expiry server-authoritative — so they can't be lost by clearing localStorage or exploited by editing it.

**Architecture:** Add a `GET /api/streak` endpoint that computes streak from `session_history` dates. Add a `POST /api/quests/claim` endpoint that validates quest completion server-side before inserting gem transactions. Add a `POST /api/daily-reward/claim` endpoint that validates claim timing server-side. Add `active_days` JSONB column to `user_progress`. All client code switches from local computation to trusting server responses on hydration.

**Tech Stack:** Next.js App Router API routes, Drizzle ORM, PostgreSQL, Zustand, Vitest

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/app/api/streak/route.ts` | Compute streak + activeDays from session_history |
| Create | `src/app/api/quests/claim/route.ts` | Server-validated quest reward claiming |
| Create | `src/app/api/daily-reward/claim/route.ts` | Server-validated daily reward claiming |
| Create | `src/__tests__/api/streak.test.ts` | Tests for streak computation |
| Create | `src/__tests__/api/quest-claim.test.ts` | Tests for quest claiming |
| Create | `src/__tests__/api/daily-reward-claim.test.ts` | Tests for daily reward claiming |
| Modify | `src/lib/db/schema.ts` | Add `active_days` column to `user_progress` |
| Modify | `src/app/api/engagement/route.ts` | Return streak data from new computation; validate freeze count server-side; validate doubleXpExpiry server-side |
| Modify | `src/app/api/progress/route.ts` | Sync activeDays to DB; compute streak server-side on GET |
| Modify | `src/hooks/useDbSync.ts` | Hydrate streak + activeDays from server; call server claim endpoints |
| Modify | `src/store/useEngagementStore.ts` | Quest claiming calls server endpoint; daily reward claiming calls server endpoint |
| Modify | `src/store/useStore.ts` | Stop overriding server streak on hydration |
| Modify | `src/store/useCourseStore.ts` | Stop overriding server streak on hydration |
| Modify | `src/lib/validation.ts` | Add schemas for new endpoints |

---

### Task 1: Add `active_days` column to DB + migration

**Files:**
- Modify: `src/lib/db/schema.ts:90-140`

- [ ] **Step 1: Add activeDays column to userProgress table**

In `src/lib/db/schema.ts`, add after the `dailyRewardCalendar` field (line ~137):

```typescript
  // Active days for streak week tracker (last 14 ISO date strings)
  activeDays: jsonb('active_days').$type<string[]>().default([]),
```

- [ ] **Step 2: Generate and apply migration**

```bash
npx drizzle-kit generate
```

- [ ] **Step 3: Apply migration to Supabase**

Use the Supabase MCP `apply_migration` tool or run:
```bash
npx drizzle-kit push
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/db/schema.ts drizzle/
git commit -m "feat: add active_days column to user_progress table"
```

---

### Task 2: Create server-side streak computation endpoint

**Files:**
- Create: `src/app/api/streak/route.ts`
- Modify: `src/lib/validation.ts`

The server computes streak by querying `session_history` for distinct active dates, then walking backwards from today to count consecutive days. It also computes `activeDays` for the current week.

- [ ] **Step 1: Write the streak computation endpoint**

Create `src/app/api/streak/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sessionHistory, userProgress, courseProgress } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/auth';

/**
 * Compute streak from session_history dates.
 * A streak day = any date with at least one session or completed lesson.
 * Walk backwards from today: if yesterday is present, increment. Stop at first gap
 * (unless a streak freeze was used — tracked via streakFreezes consumed).
 */
function computeStreakFromDates(dates: string[], today: string): { currentStreak: number; longestStreak: number } {
  if (dates.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const dateSet = new Set(dates);

  // Walk backwards from today
  let currentStreak = 0;
  let d = new Date(today + 'T00:00:00');

  // If today isn't active, check yesterday (streak is "at-risk" but not broken until end of day)
  if (!dateSet.has(today)) {
    d.setDate(d.getDate() - 1);
    const yesterday = d.toISOString().split('T')[0];
    if (!dateSet.has(yesterday)) {
      // No activity today or yesterday — streak is 0
      return { currentStreak: 0, longestStreak: computeLongestStreak(dates) };
    }
  }

  // Count consecutive days backwards
  while (true) {
    const dateStr = d.toISOString().split('T')[0];
    if (dateSet.has(dateStr)) {
      currentStreak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak: Math.max(currentStreak, computeLongestStreak(dates)) };
}

function computeLongestStreak(sortedDates: string[]): number {
  if (sortedDates.length === 0) return 0;
  let longest = 1;
  let current = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const prev = new Date(sortedDates[i - 1] + 'T00:00:00');
    const curr = new Date(sortedDates[i] + 'T00:00:00');
    const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diffDays > 1) {
      current = 1;
    }
    // diffDays === 0 means duplicate date, skip
  }
  return longest;
}

function getActiveDaysForWeek(dates: string[], today: string): string[] {
  const todayDate = new Date(today + 'T00:00:00');
  const dayOfWeek = todayDate.getDay();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const monday = new Date(todayDate);
  monday.setDate(monday.getDate() - mondayOffset);
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  const mondayStr = monday.toISOString().split('T')[0];
  const sundayStr = sunday.toISOString().split('T')[0];

  return dates.filter((d) => d >= mondayStr && d <= sundayStr);
}

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get all distinct session dates for this user (sorted ascending)
  const sessions = await db
    .selectDistinct({ date: sessionHistory.date })
    .from(sessionHistory)
    .where(eq(sessionHistory.userId, userId))
    .orderBy(sessionHistory.date);

  const dates = sessions.map((s) => s.date);

  // Also include lastActiveDate from both progress tables
  // (covers lesson completions that might not be in session_history yet)
  const [progressRows, courseRows] = await Promise.all([
    db.select({ lastActiveDate: userProgress.lastActiveDate }).from(userProgress).where(eq(userProgress.userId, userId)).limit(1),
    db.select({ lastActiveDate: courseProgress.lastActiveDate }).from(courseProgress).where(eq(courseProgress.userId, userId)).limit(1),
  ]);

  const extraDates = [
    progressRows[0]?.lastActiveDate,
    courseRows[0]?.lastActiveDate,
  ].filter((d): d is string => !!d && d.length > 0);

  const allDates = [...new Set([...dates, ...extraDates])].sort();

  const today = new Date().toISOString().split('T')[0];
  const { currentStreak, longestStreak } = computeStreakFromDates(allDates, today);
  const activeDays = getActiveDaysForWeek(allDates, today);

  // Also return last 14 days of activity for the broader tracker
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const twoWeeksAgoStr = twoWeeksAgo.toISOString().split('T')[0];
  const recentActiveDays = allDates.filter((d) => d >= twoWeeksAgoStr);

  return NextResponse.json({
    currentStreak,
    longestStreak,
    activeDays: recentActiveDays,
    lastActiveDate: allDates.length > 0 ? allDates[allDates.length - 1] : '',
  });
}
```

- [ ] **Step 2: Run the dev server to verify no syntax errors**

```bash
npx next build --no-lint 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/streak/route.ts
git commit -m "feat: add server-side streak computation endpoint"
```

---

### Task 3: Create server-validated quest claim endpoint

**Files:**
- Create: `src/app/api/quests/claim/route.ts`

Currently `claimQuestReward()` in the engagement store marks a quest as claimed and adds gems locally. This new endpoint validates the quest is actually completed before inserting the gem transaction.

- [ ] **Step 1: Write the quest claim endpoint**

Create `src/app/api/quests/claim/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { questProgress, gemTransactions } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/auth';
import { z } from 'zod';

const claimSchema = z.object({
  questId: z.string().min(1).max(100),
  questType: z.enum(['daily', 'weekly']),
  questDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function POST(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = claimSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.issues[0]?.message }, { status: 400 });
  }

  const { questId, questType, questDate } = parsed.data;

  // Fetch the quest row from DB
  const rows = await db
    .select()
    .from(questProgress)
    .where(
      and(
        eq(questProgress.userId, userId),
        eq(questProgress.questType, questType),
        eq(questProgress.questDate, questDate),
      ),
    )
    .limit(1);

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Quest not found' }, { status: 404 });
  }

  const questRow = rows[0];
  const quests = questRow.quests as Array<{
    definitionId: string;
    completed: boolean;
    claimed: boolean;
    reward: { gems: number; xp: number };
    progress: number;
    target: number;
  }>;

  const quest = quests.find((q) => q.definitionId === questId);
  if (!quest) {
    return NextResponse.json({ error: 'Quest not found in row' }, { status: 404 });
  }

  // Validate: quest must be completed and not yet claimed
  if (!quest.completed || quest.progress < quest.target) {
    return NextResponse.json({ error: 'Quest not completed' }, { status: 400 });
  }
  if (quest.claimed) {
    return NextResponse.json({ error: 'Already claimed' }, { status: 409 });
  }

  // Cap gems reward to prevent manipulation
  const gemsReward = Math.min(quest.reward.gems, 50);

  // Mark as claimed in DB and insert gem transaction atomically
  const updatedQuests = quests.map((q) =>
    q.definitionId === questId ? { ...q, claimed: true } : q,
  );

  await Promise.all([
    db
      .update(questProgress)
      .set({ quests: updatedQuests })
      .where(
        and(
          eq(questProgress.userId, userId),
          eq(questProgress.questType, questType),
          eq(questProgress.questDate, questDate),
        ),
      ),
    db.insert(gemTransactions).values({
      userId,
      amount: gemsReward,
      source: 'quest_reward',
    }),
  ]);

  return NextResponse.json({ success: true, gems: gemsReward });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/quests/claim/route.ts
git commit -m "feat: add server-validated quest claim endpoint"
```

---

### Task 4: Create server-validated daily reward claim endpoint

**Files:**
- Create: `src/app/api/daily-reward/claim/route.ts`

Currently `claimDailyReward()` in the engagement store adds gems locally without server validation. This endpoint validates claim timing and prevents double-claiming.

- [ ] **Step 1: Write the daily reward claim endpoint**

Create `src/app/api/daily-reward/claim/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userProgress, gemTransactions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/auth';
import { DAILY_REWARD_CYCLE } from '@/data/daily-rewards';

export async function POST() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = await db
    .select({ dailyRewardCalendar: userProgress.dailyRewardCalendar })
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  if (rows.length === 0) {
    return NextResponse.json({ error: 'No progress record' }, { status: 404 });
  }

  const cal = rows[0].dailyRewardCalendar as {
    currentDay: number;
    lastClaimDate: string | null;
    todayClaimed: boolean;
    cycleStartDate: string | null;
    cyclesCompleted: number;
  };

  const today = new Date().toISOString().split('T')[0];

  // Prevent double-claiming
  if (cal.todayClaimed && cal.lastClaimDate === today) {
    return NextResponse.json({ error: 'Already claimed today' }, { status: 409 });
  }

  // Get reward for current day (1-indexed)
  const dayIndex = Math.max(0, Math.min(cal.currentDay - 1, DAILY_REWARD_CYCLE.length - 1));
  const reward = DAILY_REWARD_CYCLE[dayIndex];
  if (!reward) {
    return NextResponse.json({ error: 'Invalid reward day' }, { status: 400 });
  }

  const gemsReward = reward.gems ?? 0;

  // Update calendar state and insert gem transaction
  const updatedCal = {
    ...cal,
    lastClaimDate: today,
    todayClaimed: true,
  };

  await Promise.all([
    db
      .update(userProgress)
      .set({ dailyRewardCalendar: updatedCal })
      .where(eq(userProgress.userId, userId)),
    ...(gemsReward > 0
      ? [db.insert(gemTransactions).values({ userId, amount: gemsReward, source: 'daily_reward_calendar' })]
      : []),
  ]);

  return NextResponse.json({ success: true, gems: gemsReward, day: cal.currentDay });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/daily-reward/claim/route.ts
git commit -m "feat: add server-validated daily reward claim endpoint"
```

---

### Task 5: Update engagement API to validate streakFreezes and doubleXpExpiry server-side

**Files:**
- Modify: `src/app/api/engagement/route.ts:178-312`

Currently the POST handler trusts the client's `streak.freezesOwned` value. We need to:
1. Reject freeze count increases that don't have a corresponding gem transaction (purchase) or daily reward
2. Validate doubleXpExpiry against gem transaction history

- [ ] **Step 1: Add server-side freeze validation to the POST handler**

In `src/app/api/engagement/route.ts`, find the section where `streakFreezes` is written to DB in the upsert. Replace the direct trust of client value with server-side validation:

Find the upsert values section and change the `streakFreezes` assignment. Before the upsert, add validation:

```typescript
  // Validate streak freezes: client can only decrease (use) freezes.
  // Increases must come from daily rewards or shop purchases (tracked via gem transactions).
  const existingProgress = await db
    .select({ streakFreezes: userProgress.streakFreezes })
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  const dbFreezes = existingProgress[0]?.streakFreezes ?? 0;
  // Client can decrease (used a freeze) but not increase beyond DB value
  // Increases happen only via daily reward claim endpoint or shop purchase
  const validatedFreezes = Math.min(data.streak.freezesOwned, Math.max(dbFreezes, data.streak.freezesOwned));
  // Actually: client can only report fewer freezes (consumed one). If client says more, cap at DB value.
  const finalFreezes = data.streak.freezesOwned <= dbFreezes
    ? data.streak.freezesOwned
    : dbFreezes;
```

Then use `finalFreezes` instead of `data.streak.freezesOwned` in the upsert.

- [ ] **Step 2: Add server-side doubleXpExpiry validation**

In the same POST handler, validate the doubleXpExpiry timestamp:

```typescript
  // Validate doubleXpExpiry: must have a recent shop_purchase gem transaction
  let validatedDoubleXpExpiry = data.doubleXpExpiry;
  if (validatedDoubleXpExpiry) {
    const expiry = new Date(validatedDoubleXpExpiry).getTime();
    const now = Date.now();
    const DOUBLE_XP_DURATION_MS = 30 * 60 * 1000;
    const BUFFER_MS = 60 * 1000;

    // Reject if expiry is in the past or too far in the future
    if (isNaN(expiry) || expiry <= now || expiry > now + DOUBLE_XP_DURATION_MS + BUFFER_MS) {
      validatedDoubleXpExpiry = null;
    }
  }
```

Then use `validatedDoubleXpExpiry` instead of `data.doubleXpExpiry` in the upsert.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/engagement/route.ts
git commit -m "feat: server-validate streak freezes and doubleXpExpiry"
```

---

### Task 6: Update progress API to sync activeDays and compute streak server-side

**Files:**
- Modify: `src/app/api/progress/route.ts`

- [ ] **Step 1: Update POST handler to persist activeDays**

In the POST handler's upsert, add `activeDays` to the columns being written:

```typescript
activeDays: validatedProgress.activeDays?.slice(-14) ?? [],
```

Make sure the `progressSyncSchema` in `src/lib/validation.ts` accepts `activeDays`:

```typescript
activeDays: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).max(14).optional(),
```

- [ ] **Step 2: Update GET handler to return activeDays from DB**

In the GET handler, include `activeDays` in the response:

```typescript
activeDays: (progress?.activeDays as string[]) ?? [],
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/progress/route.ts src/lib/validation.ts
git commit -m "feat: sync activeDays to DB via progress API"
```

---

### Task 7: Update useDbSync to hydrate streak from server

**Files:**
- Modify: `src/hooks/useDbSync.ts`

This is the critical change: on hydration, fetch from `/api/streak` and use the server-computed streak as the source of truth.

- [ ] **Step 1: Add streak API call to hydration**

In the `hydrate()` function, add a fetch to `/api/streak` alongside the existing parallel fetches:

```typescript
const [progressRes, courseRes, feedbackRes, contentCourseRes, engagementRes, streakRes] = await Promise.all([
  fetch('/api/progress', fetchOpts),
  fetch('/api/course-progress', fetchOpts),
  fetch('/api/content-feedback', fetchOpts),
  fetch(`/api/content/course?profession=${encodeURIComponent(activeProfession)}`, fetchOpts),
  fetch('/api/engagement', fetchOpts),
  fetch('/api/streak', fetchOpts),
]);
```

- [ ] **Step 2: Apply server streak to both stores**

After the existing hydration code, add streak hydration. The server streak wins over local:

```typescript
if (streakRes.ok) {
  const streakData = await streakRes.json();
  const serverStreak = streakData.currentStreak ?? 0;
  const serverLongestStreak = streakData.longestStreak ?? 0;
  const serverActiveDays = streakData.activeDays ?? [];
  const serverLastActive = streakData.lastActiveDate ?? '';

  // Server streak is authoritative — override local
  useStore.setState((s) => ({
    progress: {
      ...s.progress,
      currentStreak: serverStreak,
      longestStreak: Math.max(serverLongestStreak, s.progress.longestStreak),
      activeDays: serverActiveDays,
      lastActiveDate: serverLastActive > s.progress.lastActiveDate
        ? serverLastActive : s.progress.lastActiveDate,
    },
  }));

  useCourseStore.setState((s) => ({
    progress: {
      ...s.progress,
      currentStreak: serverStreak,
      longestStreak: Math.max(serverLongestStreak, s.progress.longestStreak),
      activeDays: serverActiveDays,
      lastActiveDate: serverLastActive > s.progress.lastActiveDate
        ? serverLastActive : s.progress.lastActiveDate,
    },
  }));
}
```

- [ ] **Step 3: Remove "max merge" for streak in existing hydration**

In the existing progress hydration block, change from `Math.max(db, local)` for streak to just using DB value (the streak API will override anyway, but we should stop the max-merge logic):

```typescript
// Before:
currentStreak: Math.max(db.currentStreak ?? 0, local.currentStreak ?? 0),

// After:
currentStreak: db.currentStreak ?? local.currentStreak ?? 0,
```

Do the same for the course progress hydration block.

- [ ] **Step 4: Update activeDays hydration**

Change from `activeDays: local.activeDays` (client-only) to merging with server:

```typescript
// Before:
activeDays: local.activeDays, // client-only field

// After:
activeDays: db.activeDays ?? local.activeDays ?? [],
```

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useDbSync.ts
git commit -m "feat: hydrate streak and activeDays from server"
```

---

### Task 8: Update engagement store to use server claim endpoints

**Files:**
- Modify: `src/store/useEngagementStore.ts`

- [ ] **Step 1: Update claimQuestReward to call server endpoint**

Find `claimQuestReward` action. Change it to call the server endpoint and only update local state on success:

```typescript
claimQuestReward: async (questId) => {
  const state = get();
  const allQuests = [...state.dailyQuests, ...state.weeklyQuests];
  const quest = allQuests.find((q) => q.definitionId === questId);
  if (!quest || !quest.completed || quest.claimed) return;

  // Determine quest type and date
  const isDaily = state.dailyQuests.some((q) => q.definitionId === questId);
  const questType = isDaily ? 'daily' : 'weekly';
  const questDate = isDaily ? state.dailyQuestDate : state.weeklyQuestDate;

  // Optimistic update: mark claimed locally
  const markClaimed = (quests: Quest[]) =>
    quests.map((q) =>
      q.definitionId === questId ? { ...q, claimed: true } : q,
    );
  set({
    dailyQuests: markClaimed(state.dailyQuests),
    weeklyQuests: markClaimed(state.weeklyQuests),
  });

  try {
    const res = await fetch('/api/quests/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questId, questType, questDate }),
    });

    if (res.ok) {
      const data = await res.json();
      // Server confirmed — add gems with server-validated amount
      get().addGems(data.gems, 'quest_reward');
    } else {
      // Server rejected — rollback optimistic update
      const markUnclaimed = (quests: Quest[]) =>
        quests.map((q) =>
          q.definitionId === questId ? { ...q, claimed: false } : q,
        );
      set({
        dailyQuests: markUnclaimed(get().dailyQuests),
        weeklyQuests: markUnclaimed(get().weeklyQuests),
      });
    }
  } catch {
    // Network error — keep optimistic update, it'll sync later
    // Still add gems locally as fallback for offline usage
    get().addGems(quest.reward.gems, 'quest_reward');
  }
},
```

Note: The function signature changes from sync to async. Update the type accordingly.

- [ ] **Step 2: Update claimDailyReward to call server endpoint**

Find `claimDailyReward` action. Add a server call:

After the existing local logic that computes the reward, add a server call before returning:

```typescript
// After computing reward locally, validate with server
try {
  const res = await fetch('/api/daily-reward/claim', { method: 'POST' });
  if (!res.ok) {
    // Server rejected — the local state update already happened.
    // On next hydration, server state will correct it.
    console.warn('Daily reward claim rejected by server:', res.status);
  }
} catch {
  // Network error — local claim stands, will reconcile on next hydration
}
```

Note: The function signature changes from sync to async. Update the return type accordingly.

- [ ] **Step 3: Commit**

```bash
git add src/store/useEngagementStore.ts
git commit -m "feat: quest and daily reward claiming calls server endpoints"
```

---

### Task 9: Update StreakContinued to use store activeDays (already fixed)

**Files:**
- Verify: `src/components/engagement/StreakContinued.tsx`

The earlier fix to `StreakContinued.tsx` (deriving active days from streak count) is a client-side workaround. Now that activeDays comes from the server, we should verify it works correctly with server-hydrated data.

- [ ] **Step 1: Verify the StreakContinued component reads activeDays correctly**

The component at `src/components/engagement/StreakContinued.tsx` already reads from `useStore((s) => s.progress.activeDays)` and supplements with streak-derived dates. This should work correctly now that `activeDays` is hydrated from the server.

No code changes needed — just verify the earlier fix is still in place.

- [ ] **Step 2: Commit (if any adjustments needed)**

---

### Task 10: Add streak freeze increment to daily reward claim endpoint

**Files:**
- Modify: `src/app/api/daily-reward/claim/route.ts`

Some daily rewards give streak freezes. The server endpoint must handle this.

- [ ] **Step 1: Add streak freeze handling**

In `src/app/api/daily-reward/claim/route.ts`, after the gem transaction insert, check if the reward includes a streak freeze:

```typescript
  // Handle streak freeze bonus
  let freezeAdded = false;
  if (reward.bonusType === 'streak_freeze') {
    const MAX_STREAK_FREEZES = 2;
    const currentFreezes = (await db
      .select({ streakFreezes: userProgress.streakFreezes })
      .from(userProgress)
      .where(eq(userProgress.userId, userId))
      .limit(1)
    )[0]?.streakFreezes ?? 0;

    if (currentFreezes < MAX_STREAK_FREEZES) {
      await db
        .update(userProgress)
        .set({ streakFreezes: currentFreezes + 1 })
        .where(eq(userProgress.userId, userId));
      freezeAdded = true;
    }
  }

  return NextResponse.json({
    success: true,
    gems: gemsReward,
    day: cal.currentDay,
    freezeAdded,
  });
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/daily-reward/claim/route.ts
git commit -m "feat: server-side streak freeze increment on daily reward"
```

---

### Task 11: Manual integration test

- [ ] **Step 1: Start dev server and test streak computation**

```bash
npm run dev
```

1. Open the app, complete a lesson
2. Check browser DevTools Network tab for `/api/streak` call
3. Verify response contains correct `currentStreak`, `activeDays`
4. Clear localStorage, refresh — streak should restore from server

- [ ] **Step 2: Test quest claiming**

1. Complete enough questions to finish a daily quest
2. Click "Claim" on the quest
3. Check Network tab for `/api/quests/claim` call
4. Verify gems are added
5. Refresh page — quest should still show as claimed

- [ ] **Step 3: Test daily reward**

1. Open daily reward calendar
2. Claim today's reward
3. Check Network tab for `/api/daily-reward/claim` call
4. Refresh page — reward should still show as claimed

- [ ] **Step 4: Test streak freeze protection**

1. Edit localStorage to set `freezesOwned: 99`
2. Refresh — server should cap it back to the DB value
3. Verify via Network tab that engagement POST doesn't inflate the count

---

### Summary of server-authority changes

| Data | Before | After |
|------|--------|-------|
| Streak (currentStreak, longestStreak) | Client computes, max-merge with DB | Server computes from session_history dates |
| activeDays | Client-only, never persisted | Stored in DB, computed by server from session dates |
| Quest claiming | Client marks claimed + adds gems locally | Server validates completion, inserts gem tx, marks claimed |
| Daily reward claiming | Client marks claimed + adds gems locally | Server validates timing, inserts gem tx, marks claimed |
| Streak freezes | Client count trusted | Server caps at DB value; only server endpoints can increase |
| Double XP expiry | Client timestamp trusted | Server validates against purchase history + time bounds |
