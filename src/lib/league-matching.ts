/**
 * League Matching — Server-side logic for assigning real users to league groups.
 *
 * When a user starts a new week, they are assigned to a league group of up to 30 members.
 * Real users fill slots first; remaining slots are filled with fake users.
 * Fake user XP is simulated deterministically using the same seeded RNG as before.
 */

import { db } from '@/lib/db';
import { leagueGroups, leagueMemberships, users, leagueState } from '@/lib/db/schema';
import { eq, and, lt, sql } from 'drizzle-orm';
import { COMPETITORS_PER_LEAGUE } from '@/data/league';
import { seededRandom, hashSeed, getTierConfig, simulateCompetitorXp } from '@/lib/league-simulator';
import { fakeNames } from '@/data/fake-names';
import { competitorFlags } from '@/data/league';
import type { LeagueCompetitor } from '@/data/engagement-types';

// Max real users per group before a new group is created
const MAX_REAL_USERS_PER_GROUP = COMPETITORS_PER_LEAGUE; // 30

/**
 * Assign a real user to a league group for the given week and tier.
 * Finds an existing group with open slots, or creates a new one.
 * Returns the group ID.
 */
export async function assignUserToLeague(
  userId: string,
  tier: 1 | 2 | 3 | 4 | 5,
  weekStart: string,
): Promise<string> {
  // Check if user already has an assignment this week (any tier — prevents duplicates after promotion)
  const existing = await db
    .select({ id: leagueMemberships.id, groupId: leagueMemberships.groupId })
    .from(leagueMemberships)
    .innerJoin(leagueGroups, eq(leagueMemberships.groupId, leagueGroups.id))
    .where(
      and(
        eq(leagueMemberships.userId, userId),
        eq(leagueGroups.weekStart, weekStart),
      )
    )
    .limit(1);

  if (existing.length > 0) {
    return existing[0].groupId;
  }

  // Find an open group (has room for more real users, not yet at 30)
  const openGroups = await db
    .select({ id: leagueGroups.id, realUserCount: leagueGroups.realUserCount })
    .from(leagueGroups)
    .where(
      and(
        eq(leagueGroups.tier, tier),
        eq(leagueGroups.weekStart, weekStart),
        lt(leagueGroups.realUserCount, MAX_REAL_USERS_PER_GROUP),
        eq(leagueGroups.finalized, false),
      )
    )
    .orderBy(leagueGroups.createdAt)
    .limit(1);

  let groupId: string;

  if (openGroups.length > 0) {
    groupId = openGroups[0].id;
  } else {
    // Create a new group
    const [newGroup] = await db
      .insert(leagueGroups)
      .values({ tier, weekStart, realUserCount: 0 })
      .returning({ id: leagueGroups.id });
    groupId = newGroup.id;

    // Populate with fake users (all 29 slots, will be replaced as real users join)
    await populateFakeMembers(groupId, tier, weekStart, COMPETITORS_PER_LEAGUE - 1);
  }

  // Get user info for the membership row
  const [userInfo] = await db
    .select({ displayName: users.displayName, name: users.name, image: users.image })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const displayName = userInfo?.displayName || userInfo?.name || 'User';

  // Remove one fake user to make room (remove the one with lowest dailyXpRate to keep competition balanced)
  const fakeToRemove = await db
    .select({ id: leagueMemberships.id })
    .from(leagueMemberships)
    .where(
      and(
        eq(leagueMemberships.groupId, groupId),
        eq(leagueMemberships.isReal, false),
      )
    )
    .orderBy(leagueMemberships.dailyXpRate)
    .limit(1);

  if (fakeToRemove.length > 0) {
    await db.delete(leagueMemberships).where(eq(leagueMemberships.id, fakeToRemove[0].id));
  } else {
    // No fake slots left in this group. Find or create a different group.
    const [altGroup] = await db
      .insert(leagueGroups)
      .values({ tier, weekStart, realUserCount: 0 })
      .returning({ id: leagueGroups.id });
    groupId = altGroup.id;
    await populateFakeMembers(groupId, tier, weekStart, COMPETITORS_PER_LEAGUE - 1);
    // Remove one fake from the new group
    const [newFake] = await db
      .select({ id: leagueMemberships.id })
      .from(leagueMemberships)
      .where(and(eq(leagueMemberships.groupId, groupId), eq(leagueMemberships.isReal, false)))
      .limit(1);
    if (newFake) {
      await db.delete(leagueMemberships).where(eq(leagueMemberships.id, newFake.id));
    }
  }

  // Insert real user membership (ON CONFLICT handles race condition from concurrent requests)
  try {
    await db.insert(leagueMemberships).values({
      groupId,
      userId,
      displayName,
      avatarInitial: displayName.charAt(0).toUpperCase(),
      isReal: true,
      weeklyXp: 0,
      dailyXpRate: 0,
      variance: 0,
    });

    // Increment real user count (only if insert succeeded)
    await db
      .update(leagueGroups)
      .set({ realUserCount: sql`${leagueGroups.realUserCount} + 1` })
      .where(eq(leagueGroups.id, groupId));
  } catch (err: any) {
    // Unique constraint violation = user already in this group (concurrent request)
    if (err?.code === '23505') {
      return groupId; // Already assigned, return existing group
    }
    throw err;
  }

  return groupId;
}

/**
 * Get the league leaderboard for a user's current week.
 * Returns all members (real + fake) with simulated fake XP.
 */
export async function getLeagueLeaderboard(
  userId: string,
  weekStart: string,
): Promise<{
  groupId: string;
  tier: number;
  requestingUserId: string;
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
  }>;
} | null> {
  // Find user's group
  const membership = await db
    .select({
      groupId: leagueMemberships.groupId,
    })
    .from(leagueMemberships)
    .innerJoin(leagueGroups, eq(leagueMemberships.groupId, leagueGroups.id))
    .where(
      and(
        eq(leagueMemberships.userId, userId),
        eq(leagueGroups.weekStart, weekStart),
      )
    )
    .limit(1);

  if (membership.length === 0) return null;

  const groupId = membership[0].groupId;

  // Get group info
  const [group] = await db
    .select({ tier: leagueGroups.tier })
    .from(leagueGroups)
    .where(eq(leagueGroups.id, groupId))
    .limit(1);

  // Get all members
  const members = await db
    .select({
      id: leagueMemberships.id,
      userId: leagueMemberships.userId,
      fakeUserId: leagueMemberships.fakeUserId,
      displayName: leagueMemberships.displayName,
      avatarInitial: leagueMemberships.avatarInitial,
      countryFlag: leagueMemberships.countryFlag,
      weeklyXp: leagueMemberships.weeklyXp,
      isReal: leagueMemberships.isReal,
      frameStyle: leagueMemberships.frameStyle,
      dailyXpRate: leagueMemberships.dailyXpRate,
      variance: leagueMemberships.variance,
    })
    .from(leagueMemberships)
    .where(eq(leagueMemberships.groupId, groupId));

  // Simulate fake user XP for elapsed days
  const simulatedMembers = members.map((m) => {
    if (m.isReal) {
      return m; // Real user XP is already in the DB
    }
    // Simulate fake user XP using the same deterministic logic
    const fakeCompetitor: LeagueCompetitor = {
      id: m.fakeUserId || m.id,
      name: m.displayName,
      avatarInitial: m.avatarInitial,
      countryFlag: m.countryFlag || '',
      weeklyXp: 0,
      dailyXpRate: m.dailyXpRate,
      variance: m.variance,
    };
    const [simulated] = simulateCompetitorXp([fakeCompetitor], weekStart);
    return { ...m, weeklyXp: simulated.weeklyXp };
  });

  return {
    groupId,
    tier: group.tier,
    requestingUserId: userId,
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
  };
}

/**
 * Update a real user's weekly XP in their league membership.
 * Called when user earns XP from lessons/sessions.
 */
export async function updateMemberXp(
  userId: string,
  weekStart: string,
  xpDelta: number,
): Promise<void> {
  if (xpDelta <= 0) return;

  // Find membership for this week
  const membership = await db
    .select({ id: leagueMemberships.id, groupId: leagueMemberships.groupId })
    .from(leagueMemberships)
    .innerJoin(leagueGroups, eq(leagueMemberships.groupId, leagueGroups.id))
    .where(
      and(
        eq(leagueMemberships.userId, userId),
        eq(leagueGroups.weekStart, weekStart),
      )
    )
    .limit(1);

  if (membership.length === 0) return;

  await db
    .update(leagueMemberships)
    .set({ weeklyXp: sql`${leagueMemberships.weeklyXp} + ${xpDelta}` })
    .where(eq(leagueMemberships.id, membership[0].id));
}

// ─── Internal helpers ────────────────────────────────────────

/**
 * Populate a new group with fake members.
 * Uses deterministic seeded RNG so same group always gets same fake users.
 */
async function populateFakeMembers(
  groupId: string,
  tier: number,
  weekStart: string,
  count: number,
): Promise<void> {
  const rng = seededRandom(hashSeed(`${weekStart}-${tier}-${groupId}`));
  const tierConfig = getTierConfig(tier as 1 | 2 | 3 | 4 | 5);
  const { min: xpMin, max: xpMax } = tierConfig.xpRange;
  const midpointXp = (xpMin + xpMax) / 2;
  const baseDailyRate = midpointXp / 7;

  // Activity buckets: 20% light, 40% moderate, 40% active
  const bucketConfigs = {
    light: { rateMultiplier: 0.4, varianceMultiplier: 0.5 },
    moderate: { rateMultiplier: 1.0, varianceMultiplier: 0.3 },
    active: { rateMultiplier: 1.8, varianceMultiplier: 0.4 },
  };

  // Shuffle name and flag pools
  const namePool = fakeNames.map((f) => f.name);
  const flagPool = [...competitorFlags];
  for (let i = namePool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [namePool[i], namePool[j]] = [namePool[j], namePool[i]];
  }
  for (let i = flagPool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [flagPool[i], flagPool[j]] = [flagPool[j], flagPool[i]];
  }

  // Frame pool (simple version)
  const frameOptions = ['steel', 'copper', 'bolt', 'wire', 'titanium', 'gold', null, null, null, null];

  const rows = [];
  for (let i = 0; i < count; i++) {
    const ratio = i / count;
    const bucket = ratio < 0.20 ? 'light' : ratio < 0.60 ? 'moderate' : 'active';
    const { rateMultiplier, varianceMultiplier } = bucketConfigs[bucket];

    const dailyXpRate = baseDailyRate * rateMultiplier * (0.8 + rng() * 0.4);
    const variance = dailyXpRate * varianceMultiplier;

    const name = namePool[i % namePool.length];
    const flag = flagPool[i % flagPool.length];
    const frame = rng() < 0.3 ? frameOptions[Math.floor(rng() * frameOptions.length)] : null;

    rows.push({
      groupId,
      fakeUserId: `bot-${weekStart}-${tier}-${i}`,
      displayName: name,
      avatarInitial: name.charAt(0).toUpperCase(),
      countryFlag: flag,
      weeklyXp: 0,
      dailyXpRate,
      variance,
      isReal: false,
      frameStyle: frame,
    });
  }

  if (rows.length > 0) {
    await db.insert(leagueMemberships).values(rows);
  }
}

/**
 * Finalize all league groups for the given week.
 * Calculates ranks, promotes/demotes real users, and marks groups as finalized.
 * Returns the number of groups processed.
 */
export async function finalizeLeagueWeek(weekStart: string): Promise<number> {
  // Get all non-finalized groups for this week
  const groups = await db
    .select({ id: leagueGroups.id, tier: leagueGroups.tier })
    .from(leagueGroups)
    .where(
      and(
        eq(leagueGroups.weekStart, weekStart),
        eq(leagueGroups.finalized, false),
      )
    );

  let processed = 0;

  for (const group of groups) {
    // Get all members with simulated fake XP
    const members = await db
      .select({
        id: leagueMemberships.id,
        userId: leagueMemberships.userId,
        isReal: leagueMemberships.isReal,
        weeklyXp: leagueMemberships.weeklyXp,
        dailyXpRate: leagueMemberships.dailyXpRate,
        variance: leagueMemberships.variance,
        fakeUserId: leagueMemberships.fakeUserId,
        displayName: leagueMemberships.displayName,
      })
      .from(leagueMemberships)
      .where(eq(leagueMemberships.groupId, group.id));

    // Compute final fake XP for the full 7 days
    const finalMembers = members.map((m) => {
      if (m.isReal) return { ...m, finalXp: m.weeklyXp };
      const fakeCompetitor: LeagueCompetitor = {
        id: m.fakeUserId || m.id,
        name: m.displayName,
        avatarInitial: m.displayName.charAt(0).toUpperCase(),
        countryFlag: '',
        weeklyXp: 0,
        dailyXpRate: m.dailyXpRate,
        variance: m.variance,
      };
      const [simulated] = simulateCompetitorXp([fakeCompetitor], weekStart);
      return { ...m, finalXp: simulated.weeklyXp };
    });

    // Sort by XP descending
    finalMembers.sort((a, b) => b.finalXp - a.finalXp);

    const tier = group.tier as 1 | 2 | 3 | 4 | 5;
    const tierConfig = getTierConfig(tier);

    // Collect all real user state updates, then batch upsert (avoids N+1 queries)
    const stateUpdates: { userId: string; tier: number; weeklyXp: number }[] = [];
    for (let rank = 0; rank < finalMembers.length; rank++) {
      const member = finalMembers[rank];
      if (!member.isReal || !member.userId) continue;

      const rank1Based = rank + 1;
      const promoted = rank1Based <= tierConfig.promoteCount && tier < 5;
      const demoted =
        rank1Based > COMPETITORS_PER_LEAGUE - tierConfig.demoteCount &&
        tierConfig.demoteCount > 0 &&
        tier > 1;

      let newTier = tier;
      if (promoted) newTier = (tier + 1) as 1 | 2 | 3 | 4 | 5;
      if (demoted) newTier = (tier - 1) as 1 | 2 | 3 | 4 | 5;

      stateUpdates.push({ userId: member.userId, tier: newTier, weeklyXp: member.weeklyXp });
    }

    // Batch upsert all league states for this group in one query
    if (stateUpdates.length > 0) {
      await db
        .insert(leagueState)
        .values(stateUpdates.map((u) => ({
          userId: u.userId,
          tier: u.tier,
          weeklyXp: u.weeklyXp,
          weekStart,
          competitors: [],
          updatedAt: new Date(),
        })))
        .onConflictDoUpdate({
          target: leagueState.userId,
          set: {
            tier: sql`excluded.tier`,
            weeklyXp: sql`excluded.weekly_xp`,
            weekStart: sql`excluded.week_start`,
            competitors: sql`excluded.competitors`,
            updatedAt: new Date(),
          },
        });
    }

    // Mark group as finalized
    await db.update(leagueGroups).set({ finalized: true }).where(eq(leagueGroups.id, group.id));
    processed++;
  }

  return processed;
}
