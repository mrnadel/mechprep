# Friends System & Public Profiles Design

**Date:** 2026-03-22
**Status:** Draft
**Goal:** Add a mutual friends system and public user profiles so users can connect, compare progress, and compete with people they know.

## Context

MechReady is a Duolingo-style Mechanical Engineering interview prep app. It already has a league system with simulated competitors, user profiles (self-view only), XP, streaks, levels, achievements, and topic mastery tracking.

**Problem:** The app is entirely single-player. The league system simulates competitors but doesn't connect real users. There's no way to find other users, see their progress, or build a social graph. This limits retention — users who have friends on a platform stay longer.

**Design philosophy:** Lightweight social. Friends are for seeing each other's progress and friendly competition, not messaging or feeds. Mirror Duolingo's approach: mutual friend requests, friend leaderboards, profile viewing.

---

## 1. Database Schema

### 1.1 `friendships` table

Stores accepted mutual friendships. To avoid duplicate rows, always store with `userId < friendId` (alphabetical sort on UUIDs).

```
friendships
├── id: text (PK, UUID)
├── userId: text (FK → users.id, ON DELETE CASCADE)
├── friendId: text (FK → users.id, ON DELETE CASCADE)
├── createdAt: timestamp (default now)
└── UNIQUE(userId, friendId)
    INDEX on userId
    INDEX on friendId
```

**Invariant:** `userId < friendId` is enforced via a PostgreSQL `CHECK` constraint (`CHECK (user_id < friend_id)`) as a safety net, plus application-layer sorting before insert. To check if A and B are friends, query where `userId = min(A,B) AND friendId = max(A,B)`.

### 1.2 `friendRequests` table

Stores pending, accepted, and declined friend requests.

```
friendRequests
├── id: text (PK, UUID)
├── senderId: text (FK → users.id, ON DELETE CASCADE)
├── receiverId: text (FK → users.id, ON DELETE CASCADE)
├── status: text ('pending' | 'accepted' | 'declined')
├── createdAt: timestamp (default now)
├── updatedAt: timestamp (default now)
└── UNIQUE(senderId, receiverId)
    INDEX on receiverId (for fetching incoming requests)
```

**Bidirectional check:** The `UNIQUE(senderId, receiverId)` constraint only prevents exact duplicates (A→B twice). The reverse-direction check (preventing B→A when A→B exists) is enforced at the application layer — before inserting a new request, query for existing requests in both directions: `WHERE (senderId=A AND receiverId=B) OR (senderId=B AND receiverId=A)`.

### 1.3 Lifecycle

1. User A sends request → row inserted into `friendRequests` with status `pending`
2. User B accepts → `friendRequests.status` updated to `accepted`, row inserted into `friendships` (with userId/friendId sorted)
3. User B declines → `friendRequests.status` updated to `declined`
4. Either user removes friend → `friendships` row deleted, `friendRequests` row deleted
5. User A cancels pending request → `friendRequests` row deleted
6. User B declines → `friendRequests.status` set to `declined`. After 7 days, declined rows are eligible for cleanup (sender can re-send after that cooldown).

### 1.4 Constraints

- A user cannot send a request to themselves
- A user cannot send a request if one already exists (in either direction)
- A user cannot send a request if they are already friends
- Maximum friends cap: 50 (prevents abuse, can increase later)

---

## 2. Public User Profiles

### 2.1 Route: `/user/[id]`

**File path:** `src/app/(app)/user/[id]/page.tsx` (inside the `(app)` route group to inherit auth gating and layout).

A read-only profile page viewable by any authenticated user. This is separate from the existing `/profile` page which remains the user's private, editable profile.

### 2.2 Visible Information

| Field | Source |
|-------|--------|
| Display name | `users.displayName` |
| Avatar | `users.image` |
| Join date | `users.joinedDate` |
| Level | `userProgress.currentLevel` |
| Total XP | `userProgress.totalXp` |
| Current streak | `userProgress.currentStreak` |
| Longest streak | `userProgress.longestStreak` |
| League tier | `leagueState.tier` |
| Achievements | `userProgress.achievementsUnlocked` (badges only, no dates) |
| Topic mastery | `topicProgress` (topic names + mastery level color, no percentages) |

### 2.3 Hidden Information (never exposed)

- Email address
- Accuracy percentages
- Session history details
- Subscription/billing info
- Password hash
- Weak/strong areas labels
- Bookmarked questions

### 2.4 Relationship State

The profile page shows a contextual action button based on the viewer's relationship with the profile owner:

| State | Button | Action |
|-------|--------|--------|
| No relationship | "Add Friend" (primary) | Sends friend request |
| Request sent by viewer | "Request Sent" (disabled/muted) | Cancel option in menu |
| Request received from owner | "Accept Request" (primary) | Accept/decline |
| Already friends | "Friends" (outline) | Remove option in menu |
| Viewing own profile | (not shown) | Redirect to `/profile` |

---

## 3. Friends List Page

### 3.1 Route: `/friends`

**File path:** `src/app/(app)/friends/page.tsx` (inside the `(app)` route group).

Main social hub with two tabs:

**Tab 1: Friends**
- List of accepted friends sorted by total XP (descending) — a mini friend leaderboard
- Each card shows: avatar, display name, level, streak (flame icon + count), total XP
- Tap card → navigate to `/user/[id]`
- Empty state: illustration + "Find friends to compete with!" + search prompt

**Tab 2: Requests**
- Incoming requests section (with accept/decline buttons)
- Outgoing requests section (with cancel button)
- Badge count on tab matches pending incoming count
- Empty state: "No pending requests"

### 3.2 User Search

At the top of the friends page, a search bar for finding users:
- Debounced input (300ms)
- Searches by display name (case-insensitive, partial match using `ILIKE`)
- Returns max 10 results
- Each result shows: avatar, display name, level, relationship state button
- Does not show the current user in results
- Does not show users who have declined the viewer's previous request (prevents spam)

---

## 4. API Routes

### 4.1 Endpoints

| Route | Method | Purpose | Auth |
|-------|--------|---------|------|
| `GET /api/friends` | GET | List current user's friends (with basic profile data) | Required |
| `GET /api/friends/requests` | GET | List incoming + outgoing pending requests | Required |
| `POST /api/friends/request` | POST | Send friend request (body: `{ receiverId }`) | Required |
| `PATCH /api/friends/request/[id]` | PATCH | Accept or decline (body: `{ action: 'accept' \| 'decline' }`) | Required |
| `DELETE /api/friends/request/[id]` | DELETE | Cancel outgoing request | Required |
| `DELETE /api/friends/[id]` | DELETE | Remove a friend | Required |
| `GET /api/user/[id]/profile` | GET | Get public profile for any user | Required |
| `GET /api/user/search` | GET | Search users by name (query: `?q=`) | Required |
| `GET /api/friends/requests/count` | GET | Pending incoming request count (for nav badge) | Required |

### 4.2 Response Shapes

**GET /api/friends** returns:
```ts
{
  friends: {
    id: string
    displayName: string
    image: string | null
    level: number
    currentStreak: number
    totalXp: number
    leagueTier: number
  }[]
}
```

**GET /api/user/[id]/profile** returns:
```ts
{
  id: string
  displayName: string
  image: string | null
  joinedDate: string
  level: number
  totalXp: number
  currentStreak: number
  longestStreak: number
  leagueTier: number
  achievements: string[]
  topicMastery: {
    topicId: string
    masteryLevel: 'not-started' | 'needs-work' | 'developing' | 'strong'
  }[]
  relationship: 'none' | 'request_sent' | 'request_received' | 'friends' | 'self'
}
```

### 4.3 Validation & Security

- All endpoints require authenticated session (NextAuth)
- Rate limit friend requests: 20 per hour per user
- Rate limit search: 30 per minute per user
- Validate that `receiverId` exists before creating request
- Validate that request belongs to the current user before accepting/declining/canceling
- Validate friendship belongs to current user before removing

---

## 5. UI Components

### 5.1 New Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `FriendsList` | `src/components/friends/FriendsList.tsx` | Main friends page with tabs |
| `FriendCard` | `src/components/friends/FriendCard.tsx` | Friend row: avatar, name, level, streak, XP |
| `FriendRequestCard` | `src/components/friends/FriendRequestCard.tsx` | Request row with accept/decline/cancel |
| `UserSearch` | `src/components/friends/UserSearch.tsx` | Debounced search with results |
| `UserSearchResult` | `src/components/friends/UserSearchResult.tsx` | Single search result row |
| `PublicProfile` | `src/components/friends/PublicProfile.tsx` | Public profile page content |
| `AddFriendButton` | `src/components/friends/AddFriendButton.tsx` | Contextual relationship button |
| `FriendsBadge` | `src/components/friends/FriendsBadge.tsx` | Nav icon with pending count |

### 5.2 Modified Components

| Component | Change |
|-----------|--------|
| Navigation (sidebar/bottom nav) | Add Friends link with `FriendsBadge`. The `NavItem` type and Sidebar rendering will need to support an optional `badge` property, or Friends will be a special-cased item outside the static `navItems` array. |
| League competitor cards | Add tap → `/user/[id]` for real users (simulated competitors stay as-is) |

### 5.3 Styling

- Follow existing card patterns from `globals.css` (`.card`, `.card-hover` classes)
- Indigo primary for action buttons, slate surfaces
- Avatar: 40px circle with initials fallback (matching existing avatar pattern)
- Streak: flame emoji + count in orange
- XP: lightning bolt in indigo
- Animations: Framer Motion for request accept/remove (slide out)
- Responsive: stack on mobile, grid on wider screens (matching existing layout patterns)

---

## 6. Navigation Integration

### 6.1 Sidebar/Bottom Nav

Add "Friends" entry to the main navigation between existing items:

- **Icon:** `Users` from lucide-react
- **Label:** "Friends"
- **Badge:** Pending incoming request count (red dot with number, hidden when 0)
- **Route:** `/friends`

### 6.2 Pending Count Fetching

The pending request count needs to be available globally for the nav badge:
- Fetch on app mount via a lightweight `GET /api/friends/requests/count` endpoint (returns just `{ count: number }`)
- Poll every 60 seconds while app is focused (simple interval, no WebSocket needed)
- Update immediately when user accepts/declines/receives a request (optimistic)

---

## 7. Integration with Existing Features

### 7.1 League System

The league board currently shows simulated competitors. This design does NOT change the league to show real users — that's a separate project. However:

- If a league competitor happens to be a real user (future), their card links to `/user/[id]`
- The friends list acts as a "friend leaderboard" by sorting friends by weekly XP

### 7.2 Profile Page

- Existing `/profile` route remains unchanged (private, editable)
- `/user/[id]` where `id` is the current user redirects to `/profile`
- The public profile reuses visual patterns from the existing profile page but is read-only and shows less data

### 7.3 Achievements

- Public profile shows achievement badges the user has earned
- Uses the same achievement icon/color system already in place

---

## 8. State Management

No new Zustand store needed. Friends data is fetched on-demand using `useSWR` consistently:

- `/friends` page: `useSWR('/api/friends')` and `useSWR('/api/friends/requests')`
- `/user/[id]` page: `useSWR('/api/user/${id}/profile')`
- Nav badge: `useSWR('/api/friends/requests/count', { refreshInterval: 60000 })`
- Mutations (send/accept/decline/remove): `fetch` + `mutate()` to revalidate the relevant SWR keys

This keeps the approach simple, gives us automatic revalidation and caching, and avoids adding another persistent store for infrequently-changing data.

---

## 9. Edge Cases

| Case | Handling |
|------|----------|
| User deletes account | CASCADE deletes all friendships and requests |
| User searches for non-existent name | Empty results, "No users found" message |
| User tries to add themselves | API rejects, button not shown on own profile |
| Duplicate request (A→B when B→A exists) | API detects existing request in either direction, returns error |
| Friends cap reached (50) | API rejects, UI shows "Friends list full" |
| Declined request re-send | Declined rows kept for 7 days (cooldown). After cooldown, old row deleted and sender can re-send. Search hides users with active declined status. |
| User views profile of deleted user | 404 page |

---

## 10. Out of Scope

These are explicitly NOT part of this design:

- **Direct messaging** — no chat between users
- **Activity feed** — no feed of friend actions
- **Friend suggestions** — no algorithmic recommendations
- **Real-user leagues** — league stays simulated for now
- **Profile privacy settings** — all profiles are public to authenticated users
- **Blocking users** — can be added later if needed
- **Notifications (push/email)** — in-app badge only for now

---

## 11. Database Migration

New tables (`friendships` and `friendRequests`) will be created via Drizzle migration:

1. Add table definitions to `src/lib/db/schema.ts`
2. Run `npx drizzle-kit generate` to create migration SQL
3. Run `npx drizzle-kit push` to apply to the database
4. No data migration needed — these are new tables with no existing data dependencies
