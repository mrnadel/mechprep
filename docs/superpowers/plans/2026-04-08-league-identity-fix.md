# League Identity & Weekly Allocation Fix

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the league leaderboard so the current user's row shows their real authenticated name (not seed data like "Alex Chen"), and ensure the server-backed weekly allocation is the source of truth.

**Architecture:** The server-backed league system (`league-matching.ts`) already handles group allocation, real/fake user mixing, and XP tracking. The fix is in the UI layer: `LeagueBoard` currently constructs a synthetic user entry from `useStore.progress.displayName` (which comes from seed data). Instead, it should get the user's name from the NextAuth session. The seed default is also changed to be generic.

**Tech Stack:** Next.js App Router, NextAuth v5, Zustand 5, React 19

---

### Task 1: Fix LeagueBoard to use auth session for user identity

The core bug: `LeagueBoard` reads `displayName` from `useStore.progress.displayName`, which is populated from seed data or the DB `display_name` column — not the auth session. This is why "Alex Chen" shows up.

**Files:**
- Modify: `src/components/engagement/LeagueBoard.tsx`

- [ ] **Step 1: Add `useSession` import and get the authenticated user's name**

In `src/components/engagement/LeagueBoard.tsx`, replace the `displayName` source:

```tsx
// OLD (line 17):
const displayName = useStore((s) => s.progress.displayName);

// NEW:
import { useSession } from 'next-auth/react';
```

Add inside the `LeagueBoard` component, replacing line 17:

```tsx
const { data: session } = useSession();
const storeDisplayName = useStore((s) => s.progress.displayName);
const displayName = session?.user?.name || storeDisplayName || 'You';
```

This prioritizes:
1. Auth session name (the real user)
2. Store displayName (fallback for server-hydrated name)
3. `'You'` as last resort

- [ ] **Step 2: Verify the fix locally**

Run the dev server, sign in, and open the league page. The "You" row should show your real Google account name, not "Alex Chen".

- [ ] **Step 3: Commit**

```bash
git add src/components/engagement/LeagueBoard.tsx
git commit -m "fix: league board uses auth session name instead of store seed data"
```

---

### Task 2: Fix seed data default display name

The seed file `seed-progress.ts` has `displayName: 'Alex Chen'`, which pollutes localStorage for anyone who ran the app in demo mode. The store default is `'Engineer'` which is also not a real name. Both should be generic.

**Files:**
- Modify: `src/data/seed-progress.ts:5`
- Modify: `src/store/useStore.ts:99`

- [ ] **Step 1: Change seed displayName**

In `src/data/seed-progress.ts`, change line 5:

```ts
// OLD:
displayName: 'Alex Chen',

// NEW:
displayName: 'Learner',
```

- [ ] **Step 2: Change store default displayName**

In `src/store/useStore.ts`, change line 99:

```ts
// OLD:
displayName: 'Engineer',

// NEW:
displayName: 'Learner',
```

- [ ] **Step 3: Commit**

```bash
git add src/data/seed-progress.ts src/store/useStore.ts
git commit -m "fix: change default displayName from 'Alex Chen'/'Engineer' to 'Learner'"
```

---

### Task 3: Run tests to confirm nothing breaks

**Files:**
- Test: `src/__tests__/lib/engagement-init.test.ts`
- Test: `src/__tests__/store/useEngagementStore.test.ts`

- [ ] **Step 1: Run the league-related tests**

```bash
npx vitest run src/__tests__/lib/engagement-init.test.ts src/__tests__/store/useEngagementStore.test.ts --reporter=verbose
```

Expected: All tests pass. The tests use `simulateLeagueWeek` and league state but don't depend on the specific `displayName` value.

- [ ] **Step 2: Run full test suite**

```bash
npm test
```

Expected: All tests pass.

- [ ] **Step 3: Commit if any test fixes were needed**

Only if tests required updates (unlikely for this change).
