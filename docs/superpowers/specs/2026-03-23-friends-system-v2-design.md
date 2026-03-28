# Friends System V2 — Invite Links + Friend Leaderboard

**Date:** 2026-03-23
**Status:** Approved

## Summary

Make the friends system useful by adding invite links as the sole way to add friends, a friend leaderboard on the League page, and activity snippets on friend cards. Remove user search to protect privacy.

## 1. Invite Links

### Invite Code
- Each user gets a permanent 8-character alphanumeric invite code (e.g. `a7Bk9mXq`)
- Stored as `invite_code` column on the `users` table (unique, nullable — generated lazily on first access)
- Generated via `crypto.randomBytes(6).toString('base64url').slice(0, 8)`

### Invite URL
- Format: `octokeen.com/invite/[code]`
- The `/invite/[code]` page is a **server component** that:
  - Looks up the inviter by code
  - Shows the inviter's name/avatar and a "Join Octokeen" CTA
  - Stores the inviter's user ID in `invite_ref` cookie (server-side, httpOnly)
  - Provides a "Join" button → redirects to `/register`
  - Provides a "Already have an account? Log in" link → redirects to `/login`
- The **actual friendship creation** happens server-side via a `POST /api/invite/accept` endpoint (not a GET mutation)

### Auto-Friendship After Auth
- After login/registration, a server-side callback checks for the `invite_ref` cookie
- Implemented in the next-auth `signIn` callback or a post-auth API call
- If present and valid user ID:
  - Create mutual friendship using existing `sortFriendPair` + insert into `friendships`
  - Check friend cap for **both** the inviter and the new user
  - Clear the cookie
- Both users are immediately friends — no request/accept flow
- OAuth signups (Google, etc.) are handled the same way via the signIn callback

### API
- `GET /api/invite/code` — returns the current user's invite code (generates one if missing). Rate-limited: 10 requests/min per user.
- `POST /api/invite/accept` — accepts an invite (reads `invite_ref` cookie, creates friendship). Rate-limited: 5 requests/hour per user. Requires authentication.

## 2. Friend Leaderboard

### League Page Changes
- Add tab bar at top of League page: **"League"** (existing) | **"Friends"**
- "Friends" tab shows weekly XP ranking of the user's friends + the user
- Same visual style as existing `LeagueBoard` component

### Data Source
- Reuse existing `userProgress.totalXp` or compute weekly XP from `sessionHistory` for the current week (Mon–Sun)
- Query: get all friend IDs from `friendships` table, join with `sessionHistory` for current week, sum `xpEarned`, sort descending
- Include the current user in the ranking

### Empty State
- If user has no friends: show "Invite friends to see how you stack up!" with the invite share button

## 3. Activity Snippets on Friend Cards

### Dynamic Subtitle
- Replace static "Level X" on `FriendCard` with a contextual activity snippet
- Priority order (show the first that applies):
  1. "On a X-day streak 🔥" (if streak ≥ 3)
  2. "Earned X XP today ⭐" (if > 0 XP earned today)
  3. "Level X" (fallback)

### Data Source
- The existing `/api/friends` endpoint already returns `currentStreak` and `totalXp`
- Add `todayXp` to the friends API response by joining `sessionHistory` for today's date
- The friend card already shows streak and XP icons — the subtitle just makes it more readable

## 4. Remove User Search

### Deletions
- Remove `UserSearch` component import and usage from Friends page (`src/app/(app)/friends/page.tsx`)
- Delete `src/app/api/user/search/route.ts`
- Delete the `UserSearch` component file if it exists
- Remove `AddFriendButton` usage from user profile page — friends are only added via invite links
- Keep the friend request accept/decline flow for existing pending requests (no migration needed)

### Friends Page Redesign
- Top section: invite link card with:
  - Display of the user's invite URL (truncated)
  - "Copy Link" button
  - "Share" button (uses `navigator.share` with fallback to copy)
  - "Regenerate" option (small text link, generates a new code and invalidates the old one)
- Below: existing "Friends" / "Requests" tabs (requests tab will naturally empty out over time)
- Empty state for friends tab: "Share your invite link to add friends!" with share button

## 5. Database Changes

### Schema Change
```sql
ALTER TABLE users ADD COLUMN invite_code TEXT UNIQUE;
CREATE UNIQUE INDEX users_invite_code_idx ON users (invite_code);
```

In Drizzle schema (`src/lib/db/schema.ts`):
```typescript
// Add to users table:
inviteCode: text('invite_code').unique(),
```

### Migration
- Add a Drizzle migration for the new column
- No backfill needed — codes are generated lazily when a user first accesses their invite link

## 6. File Changes Summary

| File | Action |
|------|--------|
| `src/lib/db/schema.ts` | Add `inviteCode` to `users`, add index on `sessionHistory` |
| `src/app/invite/[code]/page.tsx` | New — invite landing page (server component, sets cookie) |
| `src/app/api/invite/code/route.ts` | New — get/generate invite code (rate-limited) |
| `src/app/api/invite/accept/route.ts` | New — POST endpoint to accept invite and create friendship |
| `src/app/(app)/friends/page.tsx` | Remove search, add invite share section |
| `src/app/(app)/league/page.tsx` | Add Friends/League tab switcher |
| `src/components/friends/FriendCard.tsx` | Add activity snippet subtitle, add `todayXp` prop |
| `src/components/friends/InviteShare.tsx` | New — invite link copy/share/regenerate component |
| `src/components/engagement/FriendLeaderboard.tsx` | New — friend ranking board |
| `src/app/api/friends/route.ts` | Add `todayXp` to response |
| `src/app/api/friends/weekly-xp/route.ts` | New — weekly XP for friends leaderboard |
| `src/app/api/user/search/route.ts` | Delete |
| `src/components/friends/UserSearch.tsx` | Delete (if exists) |
| `src/app/(app)/user/[id]/page.tsx` | Remove AddFriendButton (friends only via invite) |

## 7. Cookie Handling

- Cookie name: `invite_ref`
- Value: inviter's user ID
- Max age: 30 days
- Path: `/`
- httpOnly: true (server-side only — read in next-auth callback or POST endpoint)
- sameSite: lax
- Set server-side on the `/invite/[code]` page

## 8. Database Index

Add an index on `sessionHistory` for the weekly XP and today XP queries:
```typescript
// In sessionHistory table definition:
index('session_history_user_date_idx').on(table.userId, table.date)
```

## 9. Edge Cases

- **User clicks own invite link**: detect self-invite, show "This is your own link!" message
- **Already friends**: show "You're already friends with [name]!" and redirect to `/friends`
- **Friend cap reached (50)**: check both parties, show "Friends list is full" if either is at cap
- **Invalid/expired code**: show 404-style page with link to register normally
- **Invite code collision**: regenerate on unique constraint violation (extremely rare with 8-char base64url, ~281 trillion combinations)
- **Existing pending requests**: keep working — the Requests tab stays until they're all resolved
- **User regenerates invite code**: old links stop working, new code is issued immediately
