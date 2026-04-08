# League Server Sync — Close All Client/Server Gaps

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the client fully use the server-backed league system so promotions, XP, and competitor data are authoritative and consistent — like a real Duolingo league.

**Architecture:** The server league system (groups, memberships, cron finalization) is already built. These tasks close the gaps where the client ignores server data, silently drops XP, or freezes competitor scores. Changes span the API response shape, the client store sync handlers, and the PATCH route's XP cap.

**Tech Stack:** Next.js App Router, Drizzle ORM, Zustand 5, Vitest

---

### Task 1: Apply server-authoritative tier from API response

The cron job `finalizeLeagueWeek` writes each user's new tier to `leagueState`. The POST and GET `/api/league` responses include `tier` from the group. But the client's `.then()` handlers only read `data.members` — `data.tier` is discarded. A user demoted by the server still sees themselves promoted locally.

**Files:**
- Modify: `src/store/useEngagementStore.ts` (~lines 639-662 and 681-702)

- [ ] **Step 1: In the POST handler (new-week branch), apply `data.tier` to store**

In `src/store/useEngagementStore.ts`, find the POST `.then()` handler inside `simulateLeagueWeek` (around line 639). After `if (!data?.members) return;`, add tier reconciliation. Replace the block at lines 639-662:

```ts
              .then((data) => {
                if (!data?.members) return;
                const reqUserId = data.requestingUserId;
                const serverCompetitors: LeagueCompetitor[] = data.members
                  .filter((m: any) => !(m.isReal && m.userId === reqUserId))
                  .map((m: any) => ({
                    id: m.isReal ? m.userId : (m.fakeUserId || m.id),
                    name: m.displayName,
                    avatarInitial: m.avatarInitial,
                    countryFlag: m.countryFlag || '',
                    weeklyXp: m.weeklyXp,
                    dailyXpRate: m.dailyXpRate ?? 0,
                    variance: m.variance ?? 0,
                    fakeUserId: m.isReal ? undefined : m.fakeUserId,
                    frameStyle: m.frameStyle,
                    realUserId: m.isReal ? m.userId : undefined,
                  }));
                if (get().league.weekStartDate === monday) {
                  const serverTier = (data.tier >= 1 && data.tier <= 5) ? data.tier as 1|2|3|4|5 : undefined;
                  set((s) => ({
                    league: {
                      ...s.league,
                      competitors: serverCompetitors,
                      ...(serverTier ? { currentTier: serverTier } : {}),
                    },
                  }));
                }
              })
```

Note: `dailyXpRate` and `variance` are also mapped here (they'll be added to the API response in Task 5). For now they fall back to 0 via `?? 0`.

- [ ] **Step 2: In the GET handler (same-week branch), apply `data.tier` to store**

Same change for the GET handler around lines 681-702:

```ts
              .then((data) => {
                if (!data?.members) return;
                const reqUserId = data.requestingUserId;
                const serverCompetitors: LeagueCompetitor[] = data.members
                  .filter((m: any) => !(m.isReal && m.userId === reqUserId))
                  .map((m: any) => ({
                    id: m.isReal ? m.userId : (m.fakeUserId || m.id),
                    name: m.displayName,
                    avatarInitial: m.avatarInitial,
                    countryFlag: m.countryFlag || '',
                    weeklyXp: m.weeklyXp,
                    dailyXpRate: m.dailyXpRate ?? 0,
                    variance: m.variance ?? 0,
                    fakeUserId: m.isReal ? undefined : m.fakeUserId,
                    frameStyle: m.frameStyle,
                    realUserId: m.isReal ? m.userId : undefined,
                  }));
                if (get().league.weekStartDate === monday) {
                  const serverTier = (data.tier >= 1 && data.tier <= 5) ? data.tier as 1|2|3|4|5 : undefined;
                  set((s) => ({
                    league: {
                      ...s.league,
                      competitors: serverCompetitors,
                      ...(serverTier ? { currentTier: serverTier } : {}),
                    },
                  }));
                }
              })
```

- [ ] **Step 3: Run league tests**

```bash
npx vitest run src/__tests__/store/useEngagementStore.test.ts src/__tests__/lib/engagement-init.test.ts --reporter=verbose
```

Expected: All pass (server fetch is not called in tests — these are local-only).

- [ ] **Step 4: Commit**

```bash
git add src/store/useEngagementStore.ts
git commit -m "fix: apply server-authoritative tier from league API response"
```

---

### Task 2: Raise XP cap in PATCH route

The PATCH `/api/league` route enforces `MAX_XP_PER_REQUEST = 100`. But placement tests, double-XP boosts, and event multipliers can produce XP above 100. The 400 error is silently swallowed by the client, causing the server leaderboard to show less XP than the user actually earned.

**Files:**
- Modify: `src/app/api/league/route.ts` (line 93)

- [ ] **Step 1: Raise the cap to 500**

In `src/app/api/league/route.ts`, change line 93:

```ts
// OLD:
  const MAX_XP_PER_REQUEST = 100;

// NEW:
  const MAX_XP_PER_REQUEST = 500;
```

500 covers: base XP (10-25) * accuracy bonus (up to 1.5x) * double-XP (2x) * event multiplier (up to 2x) = max ~150 per lesson. Placement test sums multiple lessons. 500 is generous without being exploitable.

- [ ] **Step 2: Update the comment**

Replace the comment on line 92:

```ts
// OLD:
  // Cap per-request XP to a reasonable session maximum (one lesson = ~25 XP max)

// NEW:
  // Cap per-request XP — covers base XP * accuracy bonus * double-XP * event multiplier
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/league/route.ts
git commit -m "fix: raise league XP cap from 100 to 500 to cover boosted sessions"
```

---

### Task 3: Send current XP when joining a group mid-week

When `assignUserToLeague` inserts a membership row, `weeklyXp` is hardcoded to `0`. If a user rejoins mid-week (cleared localStorage, new device), they appear at 0 XP in the server leaderboard.

**Files:**
- Modify: `src/app/api/league/route.ts` (POST handler, lines 41-67)
- Modify: `src/lib/league-matching.ts` (assignUserToLeague, lines 26-149)
- Modify: `src/store/useEngagementStore.ts` (POST body in simulateLeagueWeek, ~line 636)

- [ ] **Step 1: Add `weeklyXp` to the POST body from the client**

In `src/store/useEngagementStore.ts`, find the POST fetch at ~line 633. The new-week branch sends `weeklyXp: 0` (it's a fresh week), but the same-week GET refresh path doesn't seed XP. More importantly, when the POST is called for a new week, the client has already reset `weeklyXp` to 0, so sending it is correct for the new-week case.

The real gap is: what if the user already has local XP from before the server group was joined? This happens when the user earns XP offline and the POST hasn't fired yet. The fix is: in the POST body, also send the current `weeklyXp` from the store.

Change the POST body at ~line 636:

```ts
// OLD:
              body: JSON.stringify({ tier: result.newTier, weekStart: monday }),

// NEW:
              body: JSON.stringify({ tier: result.newTier, weekStart: monday, weeklyXp: 0 }),
```

And in the same-week GET branch (~line 678), add a POST fallback for users who don't have a server group yet. Actually, the same-week branch only fires GET, not POST. But the user might not be assigned yet. The POST at new-week handles assignment. The real fix is on the server side:

- [ ] **Step 2: Accept optional `weeklyXp` in the POST route**

In `src/app/api/league/route.ts`, modify the POST handler to accept and forward `weeklyXp`:

```ts
// Change the body type at line 47:
  let body: { tier?: number; weekStart?: string; weeklyXp?: number };

// After the existing validation (after line 61), add:
  const initialXp = typeof body.weeklyXp === 'number' && body.weeklyXp >= 0
    ? Math.min(Math.floor(body.weeklyXp), 5000)
    : 0;

// Change the assignUserToLeague call at line 63:
  const groupId = await assignUserToLeague(userId, tier as 1 | 2 | 3 | 4 | 5, weekStart, initialXp);
```

- [ ] **Step 3: Accept `initialXp` in `assignUserToLeague`**

In `src/lib/league-matching.ts`, modify the function signature at line 26:

```ts
// OLD:
export async function assignUserToLeague(
  userId: string,
  tier: 1 | 2 | 3 | 4 | 5,
  weekStart: string,
): Promise<string> {

// NEW:
export async function assignUserToLeague(
  userId: string,
  tier: 1 | 2 | 3 | 4 | 5,
  weekStart: string,
  initialXp: number = 0,
): Promise<string> {
```

And at the insert (line 130), use `initialXp`:

```ts
// OLD:
      weeklyXp: 0,

// NEW:
      weeklyXp: initialXp,
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/league/route.ts src/lib/league-matching.ts src/store/useEngagementStore.ts
git commit -m "fix: seed league membership with current XP when joining group"
```

---

### Task 4: Return `dailyXpRate` and `variance` for fake competitors

The server fetches `dailyXpRate` and `variance` from the DB for fake members but strips them before returning. The client stores 0 for both, so local `simulateCompetitorXp` does nothing between page loads — competitor scores freeze.

**Files:**
- Modify: `src/lib/league-matching.ts` (lines 241-251, the return mapping)

- [ ] **Step 1: Include `dailyXpRate` and `variance` in the response**

In `src/lib/league-matching.ts`, modify the `members` mapping in the return statement at lines 241-251:

```ts
// OLD:
    members: simulatedMembers.map((m) => ({
      id: m.id,
      userId: m.userId,
      fakeUserId: m.fakeUserId,
      displayName: m.displayName,
      avatarInitial: m.avatarInitial,
      countryFlag: m.countryFlag,
      weeklyXp: m.weeklyXp,
      isReal: m.isReal,
      frameStyle: m.frameStyle,
    })),

// NEW:
    members: simulatedMembers.map((m) => ({
      id: m.id,
      userId: m.userId,
      fakeUserId: m.fakeUserId,
      displayName: m.displayName,
      avatarInitial: m.avatarInitial,
      countryFlag: m.countryFlag,
      weeklyXp: m.weeklyXp,
      isReal: m.isReal,
      frameStyle: m.frameStyle,
      dailyXpRate: m.isReal ? 0 : m.dailyXpRate,
      variance: m.isReal ? 0 : m.variance,
    })),
```

- [ ] **Step 2: Update the return type signature**

Update the return type at lines 162-172 to include the new fields:

```ts
  members: Array<{
    id: string;
    userId: string | null;
    fakeUserId: string | null;
    displayName: string;
    avatarInitial: string;
    countryFlag: string | null;
    weeklyXp: number;
    isReal: boolean;
    frameStyle: string | null;
    dailyXpRate: number;
    variance: number;
  }>;
```

The client store changes in Task 1 already map `m.dailyXpRate ?? 0` and `m.variance ?? 0`, so the client will pick these up automatically.

- [ ] **Step 3: Commit**

```bash
git add src/lib/league-matching.ts
git commit -m "fix: return dailyXpRate/variance for fake competitors so client can simulate XP growth"
```

---

### Task 5: Remove dead `leagueState` XP/weekStart mirror writes

The PATCH route mirrors XP increments into `leagueState.weeklyXp` and the cron writes `weekStart` there too. But nobody reads these columns — only `leagueState.tier` is read (for profiles and friend lists). The mirror writes are wasted DB operations.

**Files:**
- Modify: `src/app/api/league/route.ts` (lines 100-112)

- [ ] **Step 1: Remove the legacy mirror in PATCH**

In `src/app/api/league/route.ts`, remove lines 100-112 (the entire `leagueState` update block after `updateMemberXp`):

```ts
// REMOVE this entire block:
  // Also update the legacy leagueState table for backwards compatibility
  const existingState = await db
    .select({ id: leagueState.id })
    .from(leagueState)
    .where(eq(leagueState.userId, userId))
    .limit(1);

  if (existingState.length > 0) {
    await db.update(leagueState).set({
      weeklyXp: sql`${leagueState.weeklyXp} + ${Math.floor(xpDelta)}`,
      updatedAt: new Date(),
    }).where(eq(leagueState.userId, userId));
  }
```

Also remove the unused imports that this block required. Check if `leagueState` import is still needed by other parts of the file — it's not used elsewhere in this route file, so remove it from the import. Also remove `sql` if no longer used.

After removal, the PATCH handler becomes:

```ts
export async function PATCH(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { weekStart?: string; xpDelta?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { weekStart, xpDelta } = body;

  if (!weekStart || !/^\d{4}-\d{2}-\d{2}$/.test(weekStart) || !isMonday(weekStart)) {
    return NextResponse.json({ error: 'Invalid weekStart (must be a Monday)' }, { status: 400 });
  }
  // Cap per-request XP — covers base XP * accuracy bonus * double-XP * event multiplier
  const MAX_XP_PER_REQUEST = 500;
  if (typeof xpDelta !== 'number' || xpDelta <= 0 || xpDelta > MAX_XP_PER_REQUEST) {
    return NextResponse.json({ error: `Invalid xpDelta (must be 1-${MAX_XP_PER_REQUEST})` }, { status: 400 });
  }

  await updateMemberXp(userId, weekStart, Math.floor(xpDelta));

  return NextResponse.json({ ok: true });
}
```

Check whether `db`, `leagueState`, `eq`, `sql` imports are still needed by the POST or GET handlers in this file. The POST handler uses `assignUserToLeague` and `getLeagueLeaderboard` (imported from league-matching), and the GET handler uses `getLeagueLeaderboard`. Neither uses `db`, `leagueState`, `eq`, or `sql` directly. Remove all four unused imports.

- [ ] **Step 2: Commit**

```bash
git add src/app/api/league/route.ts
git commit -m "fix: remove dead leagueState XP mirror writes from PATCH route"
```

---

### Task 6: Run full test suite

**Files:**
- Test: all

- [ ] **Step 1: Run all tests**

```bash
npm test
```

Expected: All pass. The league tests mock `fetch` or test only local store logic, so the server-side changes don't affect them.

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors. Verify the new `dailyXpRate`/`variance` fields in the response type and the updated function signature compile cleanly.

- [ ] **Step 3: Commit if any fixes were needed**
