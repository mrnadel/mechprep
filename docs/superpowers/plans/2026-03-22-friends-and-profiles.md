# Friends System & Public Profiles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add mutual friend requests, public user profiles, friend search, and a friends list page to MechReady.

**Architecture:** Two new DB tables (`friendships`, `friendRequests`) with Drizzle ORM. Nine new API routes under `/api/friends/` and `/api/user/`. Two new pages (`/friends`, `/user/[id]`). SWR for client-side data fetching with polling for the nav badge. All new UI in `src/components/friends/`.

**Tech Stack:** Next.js 16, Drizzle ORM (PostgreSQL), SWR, Framer Motion, Tailwind CSS, Lucide icons

**Spec:** `docs/superpowers/specs/2026-03-22-friends-and-profiles-design.md`

---

## File Map

### New Files
| File | Responsibility |
|------|---------------|
| `src/lib/db/friends.ts` | Shared friend query helpers (check friendship, check request, count friends) |
| `src/app/api/user/[id]/profile/route.ts` | Public profile endpoint |
| `src/app/api/user/search/route.ts` | User search endpoint |
| `src/app/api/friends/route.ts` | GET friends list |
| `src/app/api/friends/[id]/route.ts` | DELETE remove friend |
| `src/app/api/friends/request/route.ts` | POST send friend request |
| `src/app/api/friends/request/[id]/route.ts` | PATCH accept/decline, DELETE cancel |
| `src/app/api/friends/requests/route.ts` | GET pending requests |
| `src/app/api/friends/requests/count/route.ts` | GET pending count for badge |
| `src/components/friends/AddFriendButton.tsx` | Contextual relationship button |
| `src/components/friends/FriendCard.tsx` | Friend row in list |
| `src/components/friends/FriendRequestCard.tsx` | Request row with actions |
| `src/components/friends/UserSearch.tsx` | Debounced search input + results |
| `src/components/friends/FriendsBadge.tsx` | Nav badge with pending count |
| `src/app/(app)/user/[id]/page.tsx` | Public profile page |
| `src/app/(app)/friends/page.tsx` | Friends list page |

### Modified Files
| File | Change |
|------|--------|
| `src/lib/db/schema.ts` | Add `friendships` and `friendRequests` tables |
| `src/components/layout/Sidebar.tsx` | Add Friends nav item with badge |
| `package.json` | Add `swr` dependency |

---

## Task 1: Install SWR + Add DB Schema

**Files:**
- Modify: `package.json`
- Modify: `src/lib/db/schema.ts`

- [ ] **Step 1: Install SWR**

Run:
```bash
npm install swr
```

- [ ] **Step 2: Add `friendships` table to schema**

Add to the end of `src/lib/db/schema.ts`:

```typescript
// ─── Friends system ─────────────────────────────────────────

export const friendships = pgTable(
  'friendships',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    friendId: text('friend_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  },
  (table) => [
    uniqueIndex('friendships_pair_idx').on(table.userId, table.friendId),
    index('friendships_user_idx').on(table.userId),
    index('friendships_friend_idx').on(table.friendId),
    check('friendship_order_check', sql`user_id < friend_id`),
  ]
);

export const friendRequests = pgTable(
  'friend_requests',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    senderId: text('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    receiverId: text('receiver_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    status: text('status').notNull().default('pending'), // 'pending' | 'accepted' | 'declined'
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  },
  (table) => [
    uniqueIndex('friend_requests_pair_idx').on(table.senderId, table.receiverId),
    index('friend_requests_receiver_idx').on(table.receiverId),
  ]
);
```

Note: `uniqueIndex` and `index` are already imported in the schema file. You'll also need to add `check` to the imports from `drizzle-orm/pg-core`, and add `import { sql } from 'drizzle-orm';` at the top of the file (needed for the CHECK constraint).

- [ ] **Step 3: Push schema to database**

Run:
```bash
npx drizzle-kit push
```

Expected: Tables `friendships` and `friend_requests` created successfully.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/lib/db/schema.ts
git commit -m "feat: add friendships and friend_requests tables, install SWR"
```

---

## Task 2: Friends Helper Module

**Files:**
- Create: `src/lib/db/friends.ts`

Shared query functions used by multiple API routes.

- [ ] **Step 1: Create the helpers file**

Create `src/lib/db/friends.ts`:

```typescript
import { eq, or, and, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { friendships, friendRequests, users } from '@/lib/db/schema';

const MAX_FRIENDS = 50;

/** Sort two IDs so userId < friendId (for friendship invariant) */
export function sortFriendPair(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

/** Check if two users are already friends */
export async function areFriends(userA: string, userB: string): Promise<boolean> {
  const [low, high] = sortFriendPair(userA, userB);
  const rows = await db
    .select({ id: friendships.id })
    .from(friendships)
    .where(and(eq(friendships.userId, low), eq(friendships.friendId, high)))
    .limit(1);
  return rows.length > 0;
}

/** Check if a pending or declined request exists between two users (either direction) */
export async function getExistingRequest(userA: string, userB: string) {
  const rows = await db
    .select()
    .from(friendRequests)
    .where(
      or(
        and(eq(friendRequests.senderId, userA), eq(friendRequests.receiverId, userB)),
        and(eq(friendRequests.senderId, userB), eq(friendRequests.receiverId, userA))
      )
    )
    .limit(1);
  return rows[0] ?? null;
}

/** Count current friends for a user */
export async function countFriends(userId: string): Promise<number> {
  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(friendships)
    .where(or(eq(friendships.userId, userId), eq(friendships.friendId, userId)));
  return rows[0]?.count ?? 0;
}

/** Check if user has reached the friend cap */
export async function isFriendCapReached(userId: string): Promise<boolean> {
  const count = await countFriends(userId);
  return count >= MAX_FRIENDS;
}

/** Get the relationship between viewer and target user, plus request ID if applicable */
export async function getRelationship(
  viewerId: string,
  targetId: string
): Promise<{ relationship: 'self' | 'friends' | 'request_sent' | 'request_received' | 'none'; requestId?: string }> {
  if (viewerId === targetId) return { relationship: 'self' };
  if (await areFriends(viewerId, targetId)) return { relationship: 'friends' };

  const request = await getExistingRequest(viewerId, targetId);
  if (request && request.status === 'pending') {
    const rel = request.senderId === viewerId ? 'request_sent' : 'request_received';
    return { relationship: rel, requestId: request.id };
  }
  return { relationship: 'none' };
}

/** Get public profile data for a user (safe fields only) */
export async function getPublicProfile(userId: string) {
  const [user] = await db
    .select({
      id: users.id,
      displayName: users.displayName,
      image: users.image,
      joinedDate: users.joinedDate,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user ?? null;
}

/** Get progress data for public profile */
export async function getPublicProgress(userId: string) {
  const [progress] = await db
    .select({
      currentLevel: userProgress.currentLevel,
      totalXp: userProgress.totalXp,
      currentStreak: userProgress.currentStreak,
      longestStreak: userProgress.longestStreak,
      achievementsUnlocked: userProgress.achievementsUnlocked,
    })
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  return progress ?? null;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/db/friends.ts
git commit -m "feat: add friends helper module with shared DB queries"
```

---

## Task 3: Public Profile API

**Files:**
- Create: `src/app/api/user/[id]/profile/route.ts`

- [ ] **Step 1: Create the public profile endpoint**

Create `src/app/api/user/[id]/profile/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { getPublicProfile, getPublicProgress, getRelationship } from '@/lib/db/friends';
import { db } from '@/lib/db';
import { leagueState, masteryEvents } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { topics } from '@/data/topics';
import { computeAllMastery } from '@/data/mastery';
import type { AnswerEvent } from '@/data/mastery';
import type { TopicId } from '@/data/types';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const viewerId = await getAuthUserId();
  if (!viewerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: targetId } = await params;

  // Get user profile
  const user = await getPublicProfile(targetId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Get progress
  const progress = await getPublicProgress(targetId);

  // Get league tier
  const [league] = await db
    .select({ tier: leagueState.tier })
    .from(leagueState)
    .where(eq(leagueState.userId, targetId))
    .limit(1);

  // Get mastery events to compute topic mastery levels
  const events = await db
    .select({
      id: masteryEvents.id,
      questionId: masteryEvents.questionId,
      topicId: masteryEvents.topicId,
      subtopic: masteryEvents.subtopic,
      difficulty: masteryEvents.difficulty,
      correct: masteryEvents.correct,
      source: masteryEvents.source,
      answeredAt: masteryEvents.answeredAt,
    })
    .from(masteryEvents)
    .where(eq(masteryEvents.userId, targetId));

  const topicIds = topics.map((t) => t.id) as TopicId[];
  const masteryScores = computeAllMastery(events as AnswerEvent[], topicIds);
  const topicMastery = masteryScores.map((m) => ({
    topicId: m.topicId,
    masteryLevel: m.level,
  }));

  // Get relationship (returns both type and requestId if applicable)
  const { relationship, requestId } = await getRelationship(viewerId, targetId);

  return NextResponse.json({
    id: user.id,
    displayName: user.displayName,
    image: user.image,
    joinedDate: user.joinedDate,
    level: progress?.currentLevel ?? 1,
    totalXp: progress?.totalXp ?? 0,
    currentStreak: progress?.currentStreak ?? 0,
    longestStreak: progress?.longestStreak ?? 0,
    leagueTier: league?.tier ?? 1,
    achievements: progress?.achievementsUnlocked ?? [],
    topicMastery,
    relationship,
    requestId,
  });
}
```

- [ ] **Step 2: Verify endpoint**

Run dev server, then test:
```bash
curl http://localhost:3000/api/user/YOUR_USER_ID/profile
```
Expected: JSON with profile data and `relationship: "self"`.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/user/[id]/profile/route.ts
git commit -m "feat: add public profile API endpoint"
```

---

## Task 4: User Search API

**Files:**
- Create: `src/app/api/user/search/route.ts`

- [ ] **Step 1: Create the search endpoint**

Create `src/app/api/user/search/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { users, userProgress, friendRequests } from '@/lib/db/schema';
import { eq, ilike, ne, sql, and, notInArray, type SQL } from 'drizzle-orm';

export async function GET(request: Request) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ users: [] });
  }

  // Get IDs of users who have declined this user's requests (within 7 day cooldown)
  const declinedByUsers = await db
    .select({ receiverId: friendRequests.receiverId })
    .from(friendRequests)
    .where(
      and(
        eq(friendRequests.senderId, userId),
        eq(friendRequests.status, 'declined'),
        sql`${friendRequests.updatedAt} > NOW() - INTERVAL '7 days'`
      )
    );
  const declinedIds = declinedByUsers.map((r) => r.receiverId);

  // Build conditions array (avoids passing undefined to and())
  const conditions: SQL[] = [
    ilike(users.displayName, `%${query}%`),
    ne(users.id, userId),
  ];
  if (declinedIds.length > 0) {
    conditions.push(notInArray(users.id, declinedIds));
  }

  // Search users by display name
  const results = await db
    .select({
      id: users.id,
      displayName: users.displayName,
      image: users.image,
      level: userProgress.currentLevel,
    })
    .from(users)
    .leftJoin(userProgress, eq(users.id, userProgress.userId))
    .where(and(...conditions))
    .limit(10);

  return NextResponse.json({ users: results });
}
```

- [ ] **Step 2: Verify endpoint**

```bash
curl "http://localhost:3000/api/user/search?q=test"
```
Expected: JSON with matching users array.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/user/search/route.ts
git commit -m "feat: add user search API endpoint"
```

---

## Task 5: Friend Request APIs (Send, Accept/Decline, Cancel)

**Files:**
- Create: `src/app/api/friends/request/route.ts`
- Create: `src/app/api/friends/request/[id]/route.ts`

- [ ] **Step 1: Create send friend request endpoint**

Create `src/app/api/friends/request/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendRequests, users } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import {
  areFriends,
  getExistingRequest,
  isFriendCapReached,
} from '@/lib/db/friends';

export async function POST(request: Request) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { receiverId } = body;

  if (!receiverId || typeof receiverId !== 'string') {
    return NextResponse.json({ error: 'receiverId is required' }, { status: 400 });
  }

  // Cannot add yourself
  if (receiverId === userId) {
    return NextResponse.json({ error: 'Cannot send request to yourself' }, { status: 400 });
  }

  // Check receiver exists
  const [receiver] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, receiverId))
    .limit(1);

  if (!receiver) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Check already friends
  if (await areFriends(userId, receiverId)) {
    return NextResponse.json({ error: 'Already friends' }, { status: 409 });
  }

  // Check friend cap
  if (await isFriendCapReached(userId)) {
    return NextResponse.json({ error: 'Friends list full (max 50)' }, { status: 409 });
  }

  // Check existing request in either direction
  const existing = await getExistingRequest(userId, receiverId);
  if (existing) {
    if (existing.status === 'pending') {
      return NextResponse.json({ error: 'Request already exists' }, { status: 409 });
    }
    if (existing.status === 'declined') {
      // Check 7-day cooldown
      const updatedAt = existing.updatedAt ? new Date(existing.updatedAt).getTime() : 0;
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      if (updatedAt > sevenDaysAgo) {
        return NextResponse.json({ error: 'Cannot re-send yet, please wait' }, { status: 429 });
      }
      // Cooldown passed — delete old request so we can create new one
      await db.delete(friendRequests).where(eq(friendRequests.id, existing.id));
    }
  }

  // Create the request
  const [newRequest] = await db
    .insert(friendRequests)
    .values({
      senderId: userId,
      receiverId,
      status: 'pending',
    })
    .returning();

  return NextResponse.json({ request: newRequest }, { status: 201 });
}
```

- [ ] **Step 2: Create accept/decline and cancel endpoints**

Create `src/app/api/friends/request/[id]/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendRequests, friendships } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { sortFriendPair, isFriendCapReached } from '@/lib/db/friends';

// Accept or decline a friend request
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: requestId } = await params;
  const body = await request.json();
  const { action } = body;

  if (action !== 'accept' && action !== 'decline') {
    return NextResponse.json({ error: 'action must be "accept" or "decline"' }, { status: 400 });
  }

  // Fetch the request — must be receiver to accept/decline
  const [req] = await db
    .select()
    .from(friendRequests)
    .where(and(eq(friendRequests.id, requestId), eq(friendRequests.receiverId, userId)))
    .limit(1);

  if (!req) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 });
  }

  if (req.status !== 'pending') {
    return NextResponse.json({ error: 'Request already handled' }, { status: 409 });
  }

  if (action === 'accept') {
    // Check friend cap for both users
    if (await isFriendCapReached(userId) || await isFriendCapReached(req.senderId)) {
      return NextResponse.json({ error: 'Friends list full (max 50)' }, { status: 409 });
    }

    // Create friendship (sorted pair)
    const [low, high] = sortFriendPair(userId, req.senderId);
    await db.insert(friendships).values({ userId: low, friendId: high });

    // Update request status
    await db
      .update(friendRequests)
      .set({ status: 'accepted', updatedAt: new Date() })
      .where(eq(friendRequests.id, requestId));

    return NextResponse.json({ status: 'accepted' });
  }

  // Decline
  await db
    .update(friendRequests)
    .set({ status: 'declined', updatedAt: new Date() })
    .where(eq(friendRequests.id, requestId));

  return NextResponse.json({ status: 'declined' });
}

// Cancel an outgoing request
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: requestId } = await params;

  // Must be sender to cancel
  const [req] = await db
    .select()
    .from(friendRequests)
    .where(and(eq(friendRequests.id, requestId), eq(friendRequests.senderId, userId)))
    .limit(1);

  if (!req) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 });
  }

  if (req.status !== 'pending') {
    return NextResponse.json({ error: 'Cannot cancel non-pending request' }, { status: 409 });
  }

  await db.delete(friendRequests).where(eq(friendRequests.id, requestId));

  return NextResponse.json({ status: 'cancelled' });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/friends/request/route.ts src/app/api/friends/request/[id]/route.ts
git commit -m "feat: add friend request APIs (send, accept/decline, cancel)"
```

---

## Task 6: Friends List, Requests, Count, and Remove APIs

**Files:**
- Create: `src/app/api/friends/route.ts`
- Create: `src/app/api/friends/[id]/route.ts`
- Create: `src/app/api/friends/requests/route.ts`
- Create: `src/app/api/friends/requests/count/route.ts`

- [ ] **Step 1: Create friends list endpoint**

Create `src/app/api/friends/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendships, users, userProgress, leagueState } from '@/lib/db/schema';
import { eq, or, inArray, desc } from 'drizzle-orm';

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get all friendships where user is either userId or friendId
  const rows = await db
    .select({ usrId: friendships.userId, frnId: friendships.friendId })
    .from(friendships)
    .where(or(eq(friendships.userId, userId), eq(friendships.friendId, userId)));

  // Extract friend IDs
  const friendIds = rows.map((r) => (r.usrId === userId ? r.frnId : r.usrId));

  if (friendIds.length === 0) {
    return NextResponse.json({ friends: [] });
  }

  // Single joined query for all friends (avoids N+1)
  const friends = await db
    .select({
      id: users.id,
      displayName: users.displayName,
      image: users.image,
      level: userProgress.currentLevel,
      currentStreak: userProgress.currentStreak,
      totalXp: userProgress.totalXp,
      leagueTier: leagueState.tier,
    })
    .from(users)
    .leftJoin(userProgress, eq(users.id, userProgress.userId))
    .leftJoin(leagueState, eq(users.id, leagueState.userId))
    .where(inArray(users.id, friendIds))
    .orderBy(desc(userProgress.totalXp));

  const result = friends.map((f) => ({
    id: f.id,
    displayName: f.displayName ?? 'Unknown',
    image: f.image ?? null,
    level: f.level ?? 1,
    currentStreak: f.currentStreak ?? 0,
    totalXp: f.totalXp ?? 0,
    leagueTier: f.leagueTier ?? 1,
  }));

  return NextResponse.json({ friends: result });
}
```

- [ ] **Step 2: Create remove friend endpoint**

Create `src/app/api/friends/[id]/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendships, friendRequests } from '@/lib/db/schema';
import { eq, and, or } from 'drizzle-orm';
import { sortFriendPair } from '@/lib/db/friends';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: friendId } = await params;
  const [low, high] = sortFriendPair(userId, friendId);

  // Delete friendship
  const result = await db
    .delete(friendships)
    .where(and(eq(friendships.userId, low), eq(friendships.friendId, high)))
    .returning();

  if (result.length === 0) {
    return NextResponse.json({ error: 'Friendship not found' }, { status: 404 });
  }

  // Also clean up the friend request
  await db
    .delete(friendRequests)
    .where(
      or(
        and(eq(friendRequests.senderId, userId), eq(friendRequests.receiverId, friendId)),
        and(eq(friendRequests.senderId, friendId), eq(friendRequests.receiverId, userId))
      )
    );

  return NextResponse.json({ status: 'removed' });
}
```

- [ ] **Step 3: Create pending requests endpoint**

Create `src/app/api/friends/requests/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendRequests, users, userProgress } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Incoming pending requests
  const incoming = await db
    .select({
      id: friendRequests.id,
      senderId: friendRequests.senderId,
      createdAt: friendRequests.createdAt,
      senderName: users.displayName,
      senderImage: users.image,
      senderLevel: userProgress.currentLevel,
    })
    .from(friendRequests)
    .leftJoin(users, eq(friendRequests.senderId, users.id))
    .leftJoin(userProgress, eq(friendRequests.senderId, userProgress.userId))
    .where(and(eq(friendRequests.receiverId, userId), eq(friendRequests.status, 'pending')));

  // Outgoing pending requests
  const outgoing = await db
    .select({
      id: friendRequests.id,
      receiverId: friendRequests.receiverId,
      createdAt: friendRequests.createdAt,
      receiverName: users.displayName,
      receiverImage: users.image,
      receiverLevel: userProgress.currentLevel,
    })
    .from(friendRequests)
    .leftJoin(users, eq(friendRequests.receiverId, users.id))
    .leftJoin(userProgress, eq(friendRequests.receiverId, userProgress.userId))
    .where(and(eq(friendRequests.senderId, userId), eq(friendRequests.status, 'pending')));

  return NextResponse.json({ incoming, outgoing });
}
```

- [ ] **Step 4: Create pending count endpoint**

Create `src/app/api/friends/requests/count/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendRequests } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [result] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(friendRequests)
    .where(and(eq(friendRequests.receiverId, userId), eq(friendRequests.status, 'pending')));

  return NextResponse.json({ count: result?.count ?? 0 });
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/api/friends/route.ts src/app/api/friends/[id]/route.ts src/app/api/friends/requests/route.ts src/app/api/friends/requests/count/route.ts
git commit -m "feat: add friends list, remove, requests, and count API endpoints"
```

---

## Task 7: AddFriendButton Component

**Files:**
- Create: `src/components/friends/AddFriendButton.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/friends/AddFriendButton.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { UserPlus, UserCheck, Clock, UserMinus, Loader2 } from 'lucide-react';

type Relationship = 'none' | 'request_sent' | 'request_received' | 'friends';

interface AddFriendButtonProps {
  targetUserId: string;
  initialRelationship: Relationship;
  requestId?: string; // needed for accept/decline/cancel
  onRelationshipChange?: () => void;
}

export default function AddFriendButton({
  targetUserId,
  initialRelationship,
  requestId,
  onRelationshipChange,
}: AddFriendButtonProps) {
  const [relationship, setRelationship] = useState(initialRelationship);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  async function sendRequest() {
    setLoading(true);
    try {
      const res = await fetch('/api/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: targetUserId }),
      });
      if (res.ok) {
        setRelationship('request_sent');
        onRelationshipChange?.();
      }
    } finally {
      setLoading(false);
    }
  }

  async function acceptRequest() {
    if (!requestId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' }),
      });
      if (res.ok) {
        setRelationship('friends');
        onRelationshipChange?.();
      }
    } finally {
      setLoading(false);
    }
  }

  async function cancelRequest() {
    if (!requestId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${requestId}`, { method: 'DELETE' });
      if (res.ok) {
        setRelationship('none');
        setShowMenu(false);
        onRelationshipChange?.();
      }
    } finally {
      setLoading(false);
    }
  }

  async function removeFriend() {
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/${targetUserId}`, { method: 'DELETE' });
      if (res.ok) {
        setRelationship('none');
        setShowMenu(false);
        onRelationshipChange?.();
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <button disabled className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-100 text-surface-400 text-sm font-semibold">
        <Loader2 className="w-4 h-4 animate-spin" />
      </button>
    );
  }

  if (relationship === 'none') {
    return (
      <button
        onClick={sendRequest}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors active:scale-[0.97]"
      >
        <UserPlus className="w-4 h-4" />
        Add Friend
      </button>
    );
  }

  if (relationship === 'request_sent') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-100 text-surface-500 text-sm font-semibold"
        >
          <Clock className="w-4 h-4" />
          Request Sent
        </button>
        {showMenu && (
          <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-surface-200 py-1 z-10">
            <button
              onClick={cancelRequest}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
            >
              Cancel Request
            </button>
          </div>
        )}
      </div>
    );
  }

  if (relationship === 'request_received') {
    return (
      <div className="flex gap-2">
        <button
          onClick={acceptRequest}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors active:scale-[0.97]"
        >
          <UserCheck className="w-4 h-4" />
          Accept
        </button>
      </div>
    );
  }

  // friends
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-primary-200 text-primary-700 text-sm font-semibold hover:bg-primary-50 transition-colors"
      >
        <UserCheck className="w-4 h-4" />
        Friends
      </button>
      {showMenu && (
        <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-surface-200 py-1 z-10">
          <button
            onClick={removeFriend}
            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left flex items-center gap-2"
          >
            <UserMinus className="w-4 h-4" />
            Remove Friend
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/friends/AddFriendButton.tsx
git commit -m "feat: add AddFriendButton component with all relationship states"
```

---

## Task 8: Public Profile Page

**Files:**
- Create: `src/app/(app)/user/[id]/page.tsx`

- [ ] **Step 1: Create the public profile page**

Create `src/app/(app)/user/[id]/page.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Flame,
  Zap,
  Trophy,
  Crown,
  Calendar,
  Loader2,
} from 'lucide-react';
import { achievements } from '@/data/achievements';
import { topics } from '@/data/topics';
import AddFriendButton from '@/components/friends/AddFriendButton';
import type { MasteryLevel } from '@/data/mastery';

interface PublicProfile {
  id: string;
  displayName: string;
  image: string | null;
  joinedDate: string;
  level: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  leagueTier: number;
  achievements: string[];
  topicMastery: { topicId: string; masteryLevel: MasteryLevel }[];
  relationship: 'self' | 'friends' | 'request_sent' | 'request_received' | 'none';
  requestId?: string;
}

const MASTERY_COLORS: Record<MasteryLevel, string> = {
  strong: '#22C55E',
  developing: '#F59E0B',
  'needs-work': '#EF4444',
  'not-started': '#E5E7EB',
};

const MASTERY_LABELS: Record<MasteryLevel, string> = {
  strong: 'Strong',
  developing: 'Developing',
  'needs-work': 'Needs Work',
  'not-started': 'Not Started',
};

export default function PublicProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/user/${id}/profile`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then((data) => {
        if (data.relationship === 'self') {
          router.replace('/profile');
          return;
        }
        setProfile(data);
      })
      .catch(() => setError('User not found'))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
        <header style={{ borderBottom: '2px solid #E5E5E5', padding: '12px 20px' }}>
          <Link href="/friends" className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <span style={{ fontSize: 16, fontWeight: 700 }}>Back</span>
          </Link>
        </header>
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <p className="text-surface-500 text-lg font-semibold">User not found</p>
        </div>
      </div>
    );
  }

  const initials = (profile.displayName || '?').charAt(0).toUpperCase();
  const earnedAchievements = achievements.filter((a) =>
    profile.achievements.includes(a.id)
  );

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 bg-white"
        style={{ borderBottom: '2px solid #E5E5E5', padding: '12px 20px' }}
      >
        <div className="flex items-center justify-between">
          <Link href="/friends" className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <span style={{ fontSize: 16, fontWeight: 700 }}>Profile</span>
          </Link>
          {profile.relationship !== 'self' && (
            <AddFriendButton
              targetUserId={profile.id}
              initialRelationship={profile.relationship}
              requestId={profile.requestId}
            />
          )}
        </div>
      </header>

      <div style={{ padding: '24px 20px', maxWidth: 600, margin: '0 auto' }}>
        {/* Avatar + Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 mb-6"
        >
          <div
            className="rounded-full flex items-center justify-center overflow-hidden"
            style={{ width: 80, height: 80, background: '#E0E7FF' }}
          >
            {profile.image ? (
              <img src={profile.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-primary-700 font-bold text-2xl">{initials}</span>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-xl font-extrabold text-surface-900">
              {profile.displayName}
            </h1>
            {profile.joinedDate && (
              <p className="text-sm text-surface-400 flex items-center justify-center gap-1 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                Joined {profile.joinedDate}
              </p>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="card p-4 text-center">
            <Zap className="w-5 h-5 mx-auto mb-1 text-primary-500" />
            <p className="text-lg font-extrabold text-surface-900">{profile.totalXp.toLocaleString()}</p>
            <p className="text-xs text-surface-400 font-semibold">Total XP</p>
          </div>
          <div className="card p-4 text-center">
            <span className="text-xl block mb-1">⭐</span>
            <p className="text-lg font-extrabold text-surface-900">{profile.level}</p>
            <p className="text-xs text-surface-400 font-semibold">Level</p>
          </div>
          <div className="card p-4 text-center">
            <Flame className="w-5 h-5 mx-auto mb-1 text-orange-500" />
            <p className="text-lg font-extrabold text-surface-900">{profile.currentStreak}</p>
            <p className="text-xs text-surface-400 font-semibold">Day Streak</p>
          </div>
          <div className="card p-4 text-center">
            <Crown className="w-5 h-5 mx-auto mb-1 text-amber-500" />
            <p className="text-lg font-extrabold text-surface-900">Tier {profile.leagueTier}</p>
            <p className="text-xs text-surface-400 font-semibold">League</p>
          </div>
        </motion.div>

        {/* Topic Mastery */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-5 mb-6"
        >
          <h2 className="text-sm font-extrabold text-surface-900 mb-4">Topic Mastery</h2>
          <div className="flex flex-col gap-3">
            {profile.topicMastery.map((tm) => {
              const topic = topics.find((t) => t.id === tm.topicId);
              if (!topic) return null;
              return (
                <div key={tm.topicId} className="flex items-center gap-3">
                  <span className="text-lg">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-surface-700 truncate">
                      {topic.name}
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{
                      background: MASTERY_COLORS[tm.masteryLevel] + '20',
                      color: MASTERY_COLORS[tm.masteryLevel],
                    }}
                  >
                    {MASTERY_LABELS[tm.masteryLevel]}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        {earnedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-5"
          >
            <h2 className="text-sm font-extrabold text-surface-900 mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              Achievements ({earnedAchievements.length})
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {earnedAchievements.map((ach) => (
                <div key={ach.id} className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{ach.icon}</span>
                  <p className="text-[10px] text-surface-500 font-semibold text-center leading-tight">
                    {ach.name}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify page**

Navigate to `http://localhost:3000/user/SOME_USER_ID` and confirm the public profile renders. Navigating to your own ID should redirect to `/profile`.

- [ ] **Step 3: Commit**

```bash
git add src/app/(app)/user/[id]/page.tsx
git commit -m "feat: add public user profile page"
```

---

## Task 9: FriendCard and FriendRequestCard Components

**Files:**
- Create: `src/components/friends/FriendCard.tsx`
- Create: `src/components/friends/FriendRequestCard.tsx`

- [ ] **Step 1: Create FriendCard**

Create `src/components/friends/FriendCard.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { Flame, Zap } from 'lucide-react';

interface FriendCardProps {
  id: string;
  displayName: string;
  image: string | null;
  level: number;
  currentStreak: number;
  totalXp: number;
}

export default function FriendCard({
  id,
  displayName,
  image,
  level,
  currentStreak,
  totalXp,
}: FriendCardProps) {
  const initials = (displayName || '?').charAt(0).toUpperCase();

  return (
    <Link
      href={`/user/${id}`}
      className="card-hover flex items-center gap-3 p-4 rounded-xl border border-surface-200 bg-white"
    >
      <div
        className="rounded-full flex items-center justify-center overflow-hidden shrink-0"
        style={{ width: 44, height: 44, background: '#E0E7FF' }}
      >
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-primary-700 font-bold text-sm">{initials}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-surface-900 truncate">{displayName}</p>
        <p className="text-xs text-surface-400 font-semibold">Level {level}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-bold text-surface-700">{currentStreak}</span>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-primary-500" />
          <span className="text-sm font-bold text-surface-700">{totalXp.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create FriendRequestCard**

Create `src/components/friends/FriendRequestCard.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';

interface FriendRequestCardProps {
  id: string;
  userId: string;
  displayName: string;
  image: string | null;
  level: number;
  type: 'incoming' | 'outgoing';
  onAction?: () => void;
}

export default function FriendRequestCard({
  id,
  userId,
  displayName,
  image,
  level,
  type,
  onAction,
}: FriendRequestCardProps) {
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const initials = (displayName || '?').charAt(0).toUpperCase();

  async function handleAccept() {
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' }),
      });
      if (res.ok) {
        setHidden(true);
        onAction?.();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDecline() {
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'decline' }),
      });
      if (res.ok) {
        setHidden(true);
        onAction?.();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setHidden(true);
        onAction?.();
      }
    } finally {
      setLoading(false);
    }
  }

  if (hidden) return null;

  return (
    <motion.div
      layout
      exit={{ opacity: 0, x: -50 }}
      className="flex items-center gap-3 p-4 rounded-xl border border-surface-200 bg-white"
    >
      <Link
        href={`/user/${userId}`}
        className="rounded-full flex items-center justify-center overflow-hidden shrink-0"
        style={{ width: 44, height: 44, background: '#E0E7FF' }}
      >
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-primary-700 font-bold text-sm">{initials}</span>
        )}
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/user/${userId}`}>
          <p className="text-sm font-bold text-surface-900 truncate">{displayName}</p>
        </Link>
        <p className="text-xs text-surface-400 font-semibold">Level {level}</p>
      </div>

      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin text-surface-400 shrink-0" />
      ) : type === 'incoming' ? (
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleAccept}
            className="p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            title="Accept"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleDecline}
            className="p-2 rounded-lg bg-surface-100 text-surface-500 hover:bg-surface-200 transition-colors"
            title="Decline"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleCancel}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors shrink-0"
        >
          Cancel
        </button>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/friends/FriendCard.tsx src/components/friends/FriendRequestCard.tsx
git commit -m "feat: add FriendCard and FriendRequestCard components"
```

---

## Task 10: UserSearch Component

**Files:**
- Create: `src/components/friends/UserSearch.tsx`

- [ ] **Step 1: Create the search component**

Create `src/components/friends/UserSearch.tsx`:

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Loader2, X } from 'lucide-react';

interface SearchResult {
  id: string;
  displayName: string;
  image: string | null;
  level: number;
}

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.users ?? []);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const showDropdown = focused && (results.length > 0 || (query.length >= 2 && !loading));

  return (
    <div ref={containerRef} className="relative mb-5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search users by name..."
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-surface-200 bg-white text-sm font-medium text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary-400" />
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl border border-surface-200 shadow-lg z-20 overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-surface-400">No users found</p>
          ) : (
            results.map((user) => {
              const initials = (user.displayName || '?').charAt(0).toUpperCase();
              return (
                <Link
                  key={user.id}
                  href={`/user/${user.id}`}
                  onClick={() => setFocused(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-50 transition-colors"
                >
                  <div
                    className="rounded-full flex items-center justify-center overflow-hidden shrink-0"
                    style={{ width: 36, height: 36, background: '#E0E7FF' }}
                  >
                    {user.image ? (
                      <img src={user.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-primary-700 font-bold text-xs">{initials}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-surface-900 truncate">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-surface-400">Level {user.level ?? 1}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/friends/UserSearch.tsx
git commit -m "feat: add UserSearch component with debounced search"
```

---

## Task 11: Friends Page

**Files:**
- Create: `src/app/(app)/friends/page.tsx`

- [ ] **Step 1: Create the friends page**

Create `src/app/(app)/friends/page.tsx`:

```tsx
'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, Users, Loader2 } from 'lucide-react';
import UserSearch from '@/components/friends/UserSearch';
import FriendCard from '@/components/friends/FriendCard';
import FriendRequestCard from '@/components/friends/FriendRequestCard';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function FriendsPage() {
  const [tab, setTab] = useState<'friends' | 'requests'>('friends');

  const {
    data: friendsData,
    isLoading: friendsLoading,
    mutate: mutateFriends,
  } = useSWR('/api/friends', fetcher);

  const {
    data: requestsData,
    isLoading: requestsLoading,
    mutate: mutateRequests,
  } = useSWR('/api/friends/requests', fetcher);

  const friends = friendsData?.friends ?? [];
  const incoming = requestsData?.incoming ?? [];
  const outgoing = requestsData?.outgoing ?? [];

  const handleAction = useCallback(() => {
    mutateFriends();
    mutateRequests();
  }, [mutateFriends, mutateRequests]);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-10 bg-white"
        style={{ borderBottom: '2px solid #E5E5E5', padding: '12px 20px' }}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>Friends</h1>
        </div>
      </header>

      <div style={{ padding: '20px 20px', maxWidth: 600, margin: '0 auto' }}>
        {/* Search */}
        <UserSearch />

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTab('friends')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              tab === 'friends'
                ? 'bg-primary-600 text-white'
                : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
            }`}
          >
            Friends {friends.length > 0 && `(${friends.length})`}
          </button>
          <button
            onClick={() => setTab('requests')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors relative ${
              tab === 'requests'
                ? 'bg-primary-600 text-white'
                : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
            }`}
          >
            Requests
            {incoming.length > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center"
              >
                {incoming.length}
              </span>
            )}
          </button>
        </div>

        {/* Friends Tab */}
        {tab === 'friends' && (
          <div>
            {friendsLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-primary-400" />
              </div>
            ) : friends.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <Users className="w-12 h-12 text-surface-300" />
                <p className="text-surface-400 font-semibold text-sm">
                  Find friends to compete with!
                </p>
                <p className="text-surface-300 text-xs">
                  Search for users above to add them
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {friends.map((f: any) => (
                  <FriendCard key={f.id} {...f} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Requests Tab */}
        {tab === 'requests' && (
          <div>
            {requestsLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-primary-400" />
              </div>
            ) : incoming.length === 0 && outgoing.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <p className="text-surface-400 font-semibold text-sm">
                  No pending requests
                </p>
              </div>
            ) : (
              <>
                {incoming.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-extrabold text-surface-400 uppercase tracking-wider mb-3">
                      Incoming ({incoming.length})
                    </h3>
                    <div className="flex flex-col gap-2">
                        {incoming.map((req: any) => (
                          <FriendRequestCard
                            key={req.id}
                            id={req.id}
                            userId={req.senderId}
                            displayName={req.senderName ?? 'Unknown'}
                            image={req.senderImage}
                            level={req.senderLevel ?? 1}
                            type="incoming"
                            onAction={handleAction}
                          />
                        ))}
                      </div>
                  </div>
                )}
                {outgoing.length > 0 && (
                  <div>
                    <h3 className="text-xs font-extrabold text-surface-400 uppercase tracking-wider mb-3">
                      Sent ({outgoing.length})
                    </h3>
                    <div className="flex flex-col gap-2">
                        {outgoing.map((req: any) => (
                          <FriendRequestCard
                            key={req.id}
                            id={req.id}
                            userId={req.receiverId}
                            displayName={req.receiverName ?? 'Unknown'}
                            image={req.receiverImage}
                            level={req.receiverLevel ?? 1}
                            type="outgoing"
                            onAction={handleAction}
                          />
                        ))}
                      </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify page**

Navigate to `http://localhost:3000/friends`. Should see search bar, tabs, and empty state.

- [ ] **Step 3: Commit**

```bash
git add src/app/(app)/friends/page.tsx
git commit -m "feat: add friends page with tabs, search, and SWR data fetching"
```

---

## Task 12: FriendsBadge + Sidebar Integration

**Files:**
- Create: `src/components/friends/FriendsBadge.tsx`
- Modify: `src/components/layout/Sidebar.tsx`

- [ ] **Step 1: Create FriendsBadge**

Create `src/components/friends/FriendsBadge.tsx`:

```tsx
'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function FriendsBadge() {
  const { data } = useSWR('/api/friends/requests/count', fetcher, {
    refreshInterval: 60000,
  });

  const count = data?.count ?? 0;
  if (count === 0) return null;

  return (
    <span
      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1"
    >
      {count > 9 ? '9+' : count}
    </span>
  );
}
```

- [ ] **Step 2: Add Friends to Sidebar navigation**

In `src/components/layout/Sidebar.tsx`, add the `Users` import (already imported — check if it is; if not, add it to the lucide imports). Then add a Friends entry to the nav.

Add `Users` to the lucide-react import if not already there.

Add the Friends nav item to the `navItems` array after the League entry:

```typescript
  { href: '/league', label: 'League', icon: Crown },
  { href: '/friends', label: 'Friends', icon: Users },
```

Then update the nav item rendering to support a badge. In the `return` block inside the `navItems.map`, after the `showProBadge` span, add a badge slot for the Friends item. The simplest approach: import `FriendsBadge` and render it conditionally for the `/friends` href.

Add import at the top:
```typescript
import FriendsBadge from '@/components/friends/FriendsBadge';
```

In the nav item rendering, wrap the `<Icon>` in a relative container and conditionally render the badge:

Replace the `<Icon>` line inside the nav map with:

```tsx
<span className="relative shrink-0">
  <Icon className={cn('w-5 h-5', isActive ? 'text-primary-600' : 'text-surface-400')} />
  {item.href === '/friends' && <FriendsBadge />}
</span>
```

- [ ] **Step 3: Verify sidebar**

Open the app. The Friends item should appear in the sidebar between League and the divider. The badge should show pending count (or nothing if 0).

- [ ] **Step 4: Commit**

```bash
git add src/components/friends/FriendsBadge.tsx src/components/layout/Sidebar.tsx
git commit -m "feat: add FriendsBadge and integrate Friends into sidebar nav"
```

---

## Task 13: End-to-End Verification

- [ ] **Step 1: Verify DB tables exist**

```bash
npx drizzle-kit studio
```

Check that `friendships` and `friend_requests` tables exist with correct columns.

- [ ] **Step 2: Verify all API endpoints**

With dev server running, test each endpoint:

```bash
# Public profile (replace with real user ID)
curl http://localhost:3000/api/user/YOUR_ID/profile

# Search
curl "http://localhost:3000/api/user/search?q=test"

# Friends list
curl http://localhost:3000/api/friends

# Pending requests
curl http://localhost:3000/api/friends/requests

# Pending count
curl http://localhost:3000/api/friends/requests/count
```

- [ ] **Step 3: Verify UI pages**

1. Navigate to `/friends` — should see empty state with search
2. Search for a user — should see results dropdown
3. Click a search result — should navigate to `/user/[id]`
4. Public profile should show stats, mastery, achievements
5. "Add Friend" button should be visible on other users' profiles
6. Sidebar should show Friends icon with badge

- [ ] **Step 4: Test friend request flow**

1. Send a friend request from User A's profile
2. Check `/friends` requests tab — should show outgoing request
3. Log in as User B (or use another account) — should see incoming request
4. Accept the request
5. Both users should now see each other in their friends list
6. Remove friend — both lists updated

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address any issues found during e2e verification"
```

---

## Spec Deviations (Intentional)

| Spec says | Plan does | Reason |
|-----------|-----------|--------|
| Separate `UserSearchResult` component | Search results inline in `UserSearch.tsx` | Results are simple enough to inline; avoids an extra file for 15 lines |
| Separate `PublicProfile` component | Profile content inline in page file | Same reasoning — keeps it simpler |
| Separate `FriendsList` component | Absorbed into friends page | All logic is page-specific, no reuse scenario |
| Topic mastery from `topicProgress` table | Computed from `masteryEvents` via `computeAllMastery()` | More accurate (recency-weighted scores), matches existing profile page pattern |
| Rate limiting (20/hr requests, 30/min search) | Deferred | No existing rate-limiting infrastructure in codebase; can be added later with middleware |
