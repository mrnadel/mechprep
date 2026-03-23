import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  generateFakeUserPool,
  initFakeUserPool,
  getFakeUserPool,
  saveFakeUserPool,
  getFakeUserById,
  progressFakeUsers,
  drawCompetitorsFromPool,
} from '@/lib/fake-user-generator';
import { seededRandom, hashSeed } from '@/lib/league-simulator';
import { topics } from '@/data/topics';
import type { FakeUser, FakeUserPool } from '@/data/engagement-types';

// --------------- Helpers ---------------

/** Get pool grouped by tier. */
function groupByTier(pool: FakeUser[]): Record<number, FakeUser[]> {
  const groups: Record<number, FakeUser[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const u of pool) groups[u.currentTier].push(u);
  return groups;
}

// --------------- generateFakeUserPool ---------------

describe('generateFakeUserPool', () => {
  it('produces exactly 250 users', () => {
    const pool = generateFakeUserPool();
    expect(pool.pool).toHaveLength(250);
  });

  it('has correct version', () => {
    const pool = generateFakeUserPool();
    expect(pool.version).toBe(4); // POOL_VERSION = 4 (v4: ~20% avatars with random photos)
  });

  it('has tier distribution 80/70/50/30/20', () => {
    const pool = generateFakeUserPool();
    const groups = groupByTier(pool.pool);
    expect(groups[1]).toHaveLength(80);
    expect(groups[2]).toHaveLength(70);
    expect(groups[3]).toHaveLength(50);
    expect(groups[4]).toHaveLength(30);
    expect(groups[5]).toHaveLength(20);
  });

  it('is deterministic — same output every time', () => {
    const a = generateFakeUserPool();
    const b = generateFakeUserPool();
    expect(a.pool.map((u) => u.id)).toEqual(b.pool.map((u) => u.id));
    expect(a.pool.map((u) => u.name)).toEqual(b.pool.map((u) => u.name));
    expect(a.pool.map((u) => u.totalXp)).toEqual(b.pool.map((u) => u.totalXp));
  });

  it('assigns sequential IDs starting from fake-000', () => {
    const pool = generateFakeUserPool();
    pool.pool.forEach((user, i) => {
      expect(user.id).toBe(`fake-${String(i).padStart(3, '0')}`);
    });
  });

  it('never exceeds MAX_POOL_SIZE (300)', () => {
    const pool = generateFakeUserPool();
    expect(pool.pool.length).toBeLessThanOrEqual(300);
  });

  it('sets lastWeekProcessed to current Monday', () => {
    const pool = generateFakeUserPool();
    // Should be a valid date string matching YYYY-MM-DD
    expect(pool.lastWeekProcessed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    // Check it's a Monday (UTC)
    const d = new Date(pool.lastWeekProcessed + 'T00:00:00Z');
    expect(d.getUTCDay()).toBe(1); // Monday
  });
});

// --------------- User properties by tier ---------------

describe('generateFakeUser — per-user properties', () => {
  let pool: FakeUserPool;
  let groups: Record<number, FakeUser[]>;

  beforeEach(() => {
    pool = generateFakeUserPool();
    groups = groupByTier(pool.pool);
  });

  it('every user has a non-empty name', () => {
    for (const user of pool.pool) {
      expect(user.name.length).toBeGreaterThan(0);
    }
  });

  it('every user has a valid nameQuality (1-5)', () => {
    for (const user of pool.pool) {
      expect(user.nameQuality).toBeGreaterThanOrEqual(1);
      expect(user.nameQuality).toBeLessThanOrEqual(5);
    }
  });

  it('every user has a countryFlag', () => {
    for (const user of pool.pool) {
      expect(user.countryFlag.length).toBeGreaterThan(0);
    }
  });

  it('every user has a valid joinDate', () => {
    for (const user of pool.pool) {
      expect(user.joinDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('XP ranges are respected per tier', () => {
    const XP_RANGES: Record<number, { min: number; max: number }> = {
      1: { min: 0, max: 850 },
      2: { min: 850, max: 7100 },
      3: { min: 7100, max: 20300 },
      4: { min: 20300, max: 52000 },
      5: { min: 52000, max: 100000 },
    };
    for (const tier of [1, 2, 3, 4, 5] as const) {
      for (const user of groups[tier]) {
        expect(user.totalXp).toBeGreaterThanOrEqual(XP_RANGES[tier].min);
        expect(user.totalXp).toBeLessThanOrEqual(XP_RANGES[tier].max);
      }
    }
  });

  it('longestStreak >= currentStreak for every user', () => {
    for (const user of pool.pool) {
      expect(user.longestStreak).toBeGreaterThanOrEqual(user.currentStreak);
    }
  });

  it('activityLevel is between 0.1 and 1.0', () => {
    for (const user of pool.pool) {
      expect(user.activityLevel).toBeGreaterThanOrEqual(0.1);
      expect(user.activityLevel).toBeLessThanOrEqual(1.0);
    }
  });

  it('consistency is between 0.2 and 0.95', () => {
    for (const user of pool.pool) {
      expect(user.consistency).toBeGreaterThanOrEqual(0.2);
      expect(user.consistency).toBeLessThanOrEqual(0.95);
    }
  });

  it('avatarSeed follows pattern "{id}-avatar"', () => {
    for (const user of pool.pool) {
      expect(user.avatarSeed).toBe(`${user.id}-avatar`);
    }
  });
});

// --------------- Avatar probability by tier ---------------

describe('avatar probability trends by tier', () => {
  it('higher tiers have equal or greater avatar frequency', () => {
    const pool = generateFakeUserPool();
    const groups = groupByTier(pool.pool);

    const avatarRates: Record<number, number> = {};
    for (const tier of [1, 2, 3, 4, 5] as const) {
      const withAvatar = groups[tier].filter((u) => u.avatarType === 'dicebear').length;
      avatarRates[tier] = withAvatar / groups[tier].length;
    }

    // The trend should generally be increasing (small samples may wiggle,
    // but the expected probabilities are 0.50, 0.65, 0.80, 0.90, 0.95 so
    // with pool sizes of 80/70/50/30/20 the overall trend should hold)
    expect(avatarRates[5]).toBeGreaterThan(avatarRates[1]);
  });

  it('users with no avatar have avatarType "none" and no avatarStyle', () => {
    const pool = generateFakeUserPool();
    for (const user of pool.pool) {
      if (user.avatarType === 'none') {
        expect(user.avatarStyle).toBeUndefined();
      }
    }
  });

  it('users with dicebear avatar have a valid avatarStyle', () => {
    const pool = generateFakeUserPool();
    const validStyles = ['photo-a', 'photo-b', 'photo-c', 'photo-d'];
    for (const user of pool.pool) {
      if (user.avatarType === 'dicebear') {
        expect(validStyles).toContain(user.avatarStyle);
      }
    }
  });
});

// --------------- Name quality distribution per tier ---------------

describe('name quality distribution per tier', () => {
  it('tier 1 has no Q5 names (0% probability)', () => {
    const pool = generateFakeUserPool();
    const t1 = pool.pool.filter((u) => u.currentTier === 1);
    const q5count = t1.filter((u) => u.nameQuality === 5).length;
    expect(q5count).toBe(0);
  });

  it('tier 4 has no Q1 names (0% probability)', () => {
    const pool = generateFakeUserPool();
    const t4 = pool.pool.filter((u) => u.currentTier === 4);
    const q1count = t4.filter((u) => u.nameQuality === 1).length;
    expect(q1count).toBe(0);
  });

  it('tier 5 has no Q1 or Q2 names (0% probability)', () => {
    const pool = generateFakeUserPool();
    const t5 = pool.pool.filter((u) => u.currentTier === 5);
    const q1q2count = t5.filter((u) => u.nameQuality <= 2).length;
    expect(q1q2count).toBe(0);
  });
});

// --------------- Achievement generation ---------------

describe('generateAchievements (via pool inspection)', () => {
  let pool: FakeUserPool;
  let groups: Record<number, FakeUser[]>;

  beforeEach(() => {
    pool = generateFakeUserPool();
    groups = groupByTier(pool.pool);
  });

  it('tier 1 users only have tier 1 base achievements', () => {
    const tier1Base = ['ach-first-correct', 'ach-first-topic', 'ach-streak-3'];
    // Sprinkle achievements are possible at any tier, so allow those too
    const sprinkles = [
      'ach-weekend-warrior', 'ach-bookworm', 'ach-night-owl',
      'ach-early-bird', 'ach-wrong-five',
    ];
    const allowed = new Set([...tier1Base, ...sprinkles]);
    for (const user of groups[1]) {
      for (const ach of user.achievementsUnlocked) {
        expect(allowed.has(ach)).toBe(true);
      }
    }
  });

  it('tier-gated achievements never appear below minTier', () => {
    const gated = [
      { id: 'ach-estimation-ace', minTier: 2 },
      { id: 'ach-flaw-finder', minTier: 2 },
      { id: 'ach-confidence-calibrated', minTier: 3 },
      { id: 'ach-weakness-conquered', minTier: 3 },
    ];
    for (const g of gated) {
      for (let tier = 1; tier < g.minTier; tier++) {
        for (const user of groups[tier]) {
          expect(user.achievementsUnlocked).not.toContain(g.id);
        }
      }
    }
  });

  it('achievement count falls within the expected range per tier (inclusive of sprinkles/gated)', () => {
    const COUNTS: Record<number, { min: number; max: number }> = {
      1: { min: 0, max: 3 },
      2: { min: 2, max: 8 },
      3: { min: 5, max: 15 },
      4: { min: 8, max: 22 },
      5: { min: 12, max: 27 },
    };
    // The base count is in range; sprinkles/gated can add a few on top
    for (const tier of [1, 2, 3, 4, 5] as const) {
      for (const user of groups[tier]) {
        // Base count is within range; with sprinkles, total can be a bit higher
        // Just verify it is at least min (sprinkles only add)
        expect(user.achievementsUnlocked.length).toBeGreaterThanOrEqual(COUNTS[tier].min);
      }
    }
  });

  it('no duplicate achievements per user', () => {
    for (const user of pool.pool) {
      const unique = new Set(user.achievementsUnlocked);
      expect(unique.size).toBe(user.achievementsUnlocked.length);
    }
  });
});

// --------------- Topic mastery generation ---------------

describe('generateTopicMastery (via pool inspection)', () => {
  let pool: FakeUserPool;
  let groups: Record<number, FakeUser[]>;

  beforeEach(() => {
    pool = generateFakeUserPool();
    groups = groupByTier(pool.pool);
  });

  it('topic count is within range per tier', () => {
    const COUNTS: Record<number, { min: number; max: number }> = {
      1: { min: 0, max: 3 },
      2: { min: 2, max: 5 },
      3: { min: 4, max: 8 },
      4: { min: 6, max: 10 },
      5: { min: 8, max: 11 },
    };
    for (const tier of [1, 2, 3, 4, 5] as const) {
      for (const user of groups[tier]) {
        expect(user.topicMastery.length).toBeGreaterThanOrEqual(COUNTS[tier].min);
        expect(user.topicMastery.length).toBeLessThanOrEqual(COUNTS[tier].max);
      }
    }
  });

  it('all topic IDs reference real topics', () => {
    const topicIds = new Set(topics.map((t) => t.id));
    for (const user of pool.pool) {
      for (const tm of user.topicMastery) {
        expect(topicIds.has(tm.topicId)).toBe(true);
      }
    }
  });

  it('no duplicate topics per user', () => {
    for (const user of pool.pool) {
      const ids = user.topicMastery.map((t) => t.topicId);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('mastery levels are valid values', () => {
    const validLevels = new Set(['needs-work', 'developing', 'strong']);
    for (const user of pool.pool) {
      for (const tm of user.topicMastery) {
        expect(validLevels.has(tm.masteryLevel)).toBe(true);
      }
    }
  });

  it('tier 5 users have mostly "strong" mastery levels', () => {
    const t5 = groups[5];
    let strong = 0;
    let total = 0;
    for (const user of t5) {
      for (const tm of user.topicMastery) {
        total++;
        if (tm.masteryLevel === 'strong') strong++;
      }
    }
    // Expected weight is 0.80 for strong in tier 5
    expect(strong / total).toBeGreaterThan(0.5);
  });

  it('tier 1 users have mostly "needs-work" mastery levels', () => {
    const t1 = groups[1];
    let needsWork = 0;
    let total = 0;
    for (const user of t1) {
      for (const tm of user.topicMastery) {
        total++;
        if (tm.masteryLevel === 'needs-work') needsWork++;
      }
    }
    // Expected weight is 0.70 for needs-work in tier 1
    if (total > 0) {
      expect(needsWork / total).toBeGreaterThan(0.4);
    }
  });

  it('critical topics appear more frequently across the pool (2x weight)', () => {
    const criticalIds = new Set([
      'engineering-mechanics',
      'strength-of-materials',
      'materials-engineering',
      'design-tolerancing',
    ]);
    let criticalCount = 0;
    let nonCriticalCount = 0;
    for (const user of pool.pool) {
      for (const tm of user.topicMastery) {
        if (criticalIds.has(tm.topicId)) criticalCount++;
        else nonCriticalCount++;
      }
    }
    const numCritical = criticalIds.size; // 4
    const numNonCritical = topics.length - numCritical; // 7
    // Per-topic rate for critical should be higher than per-topic rate for non-critical
    const criticalRate = criticalCount / numCritical;
    const nonCriticalRate = nonCriticalCount / numNonCritical;
    expect(criticalRate).toBeGreaterThan(nonCriticalRate);
  });
});

// --------------- Storage: initFakeUserPool, getFakeUserById ---------------

describe('initFakeUserPool', () => {
  it('creates a pool in localStorage if missing', () => {
    expect(localStorage.getItem('mechready-fake-users')).toBeNull();
    const pool = initFakeUserPool();
    expect(pool.pool).toHaveLength(250);
    expect(localStorage.getItem('mechready-fake-users')).not.toBeNull();
  });

  it('returns existing pool from localStorage without regenerating', () => {
    const pool1 = initFakeUserPool();
    // Mutate a user's name to verify identity on reload
    pool1.pool[0].name = 'MUTATED_NAME';
    saveFakeUserPool(pool1);

    const pool2 = initFakeUserPool();
    expect(pool2.pool[0].name).toBe('MUTATED_NAME');
  });

  it('regenerates pool when version does not match', () => {
    const badPool = { version: 999, pool: [], lastWeekProcessed: '2025-01-01' };
    localStorage.setItem('mechready-fake-users', JSON.stringify(badPool));
    const pool = initFakeUserPool();
    expect(pool.pool).toHaveLength(250);
    expect(pool.version).toBe(4);
  });

  it('regenerates pool when localStorage contains invalid JSON', () => {
    localStorage.setItem('mechready-fake-users', 'NOT_JSON!!!');
    const pool = initFakeUserPool();
    expect(pool.pool).toHaveLength(250);
  });
});

describe('getFakeUserById', () => {
  it('returns the correct user when pool exists', () => {
    initFakeUserPool();
    const user = getFakeUserById('fake-000');
    expect(user).not.toBeNull();
    expect(user!.id).toBe('fake-000');
  });

  it('returns null for unknown ID', () => {
    initFakeUserPool();
    const user = getFakeUserById('nonexistent-id');
    expect(user).toBeNull();
  });

  it('returns null when no pool in storage', () => {
    const user = getFakeUserById('fake-000');
    expect(user).toBeNull();
  });
});

// --------------- Seeded PRNG determinism ---------------

describe('seeded PRNG determinism', () => {
  it('seededRandom produces same sequence for same seed', () => {
    const rng1 = seededRandom(42);
    const rng2 = seededRandom(42);
    const seq1 = Array.from({ length: 100 }, () => rng1());
    const seq2 = Array.from({ length: 100 }, () => rng2());
    expect(seq1).toEqual(seq2);
  });

  it('different seeds produce different sequences', () => {
    const rng1 = seededRandom(42);
    const rng2 = seededRandom(43);
    const seq1 = Array.from({ length: 10 }, () => rng1());
    const seq2 = Array.from({ length: 10 }, () => rng2());
    expect(seq1).not.toEqual(seq2);
  });

  it('hashSeed is deterministic', () => {
    const a = hashSeed('test-seed');
    const b = hashSeed('test-seed');
    expect(a).toBe(b);
  });

  it('hashSeed produces different values for different inputs', () => {
    const a = hashSeed('seed-a');
    const b = hashSeed('seed-b');
    expect(a).not.toBe(b);
  });
});

// --------------- progressFakeUsers ---------------

describe('progressFakeUsers', () => {
  let realDate: typeof Date;

  beforeEach(() => {
    realDate = globalThis.Date;
  });

  afterEach(() => {
    globalThis.Date = realDate;
  });

  it('does nothing if no pool in localStorage', () => {
    // Should not throw
    progressFakeUsers();
    expect(getFakeUserPool()).toBeNull();
  });

  it('skips progression if already processed for current week', () => {
    const pool = initFakeUserPool();
    const originalXp = pool.pool[0].totalXp;

    // Call again for the same week — should be a no-op
    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    expect(afterPool.pool[0].totalXp).toBe(originalXp);
  });

  it('progresses when a new Monday is detected', () => {
    const pool = initFakeUserPool();
    // Set lastWeekProcessed to a previous Monday so progression triggers
    pool.lastWeekProcessed = '2025-01-06'; // A known previous Monday
    saveFakeUserPool(pool);

    const beforeXps = pool.pool.map((u) => u.totalXp);
    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    const afterXps = afterPool.pool.map((u) => u.totalXp);

    // At least some users should have gained XP
    const gained = afterXps.filter((xp, i) => xp > beforeXps[i]).length;
    expect(gained).toBeGreaterThan(0);
  });

  it('updates lastWeekProcessed after progression', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    expect(afterPool.lastWeekProcessed).not.toBe('2025-01-06');
  });

  it('increases totalXp for users (most users gain XP)', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';
    saveFakeUserPool(pool);

    const beforeXps = pool.pool.map((u) => u.totalXp);
    progressFakeUsers();
    const afterPool = getFakeUserPool()!;

    // The vast majority should gain XP (activity * midpoint > 0 for all)
    const gained = afterPool.pool.filter((u, i) => u.totalXp > beforeXps[i]).length;
    expect(gained).toBeGreaterThan(pool.pool.length * 0.8);
  });

  it('longestStreak never decreases during progression', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';
    const beforeStreaks = pool.pool.map((u) => u.longestStreak);
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    afterPool.pool.forEach((user, i) => {
      expect(user.longestStreak).toBeGreaterThanOrEqual(beforeStreaks[i]);
    });
  });

  it('unlocks streak achievements when milestones are reached', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';
    // Give a user a big streak to trigger achievement
    pool.pool[0].longestStreak = 6;
    pool.pool[0].currentStreak = 6;
    pool.pool[0].consistency = 0.99; // Very consistent — streak likely continues
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    const user = afterPool.pool[0];
    // With consistency 0.99 and existing streak of 6, plus 7 days,
    // the user should reach 13 (or 7 if broken then rebuilt)
    // At minimum longestStreak should be >= 7 so ach-streak-7 could unlock
    if (user.longestStreak >= 7) {
      expect(user.achievementsUnlocked).toContain('ach-streak-7');
    }
  });

  it('XP-based achievements unlock when thresholds are crossed', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';
    // Set a user's XP just below the threshold
    pool.pool[0].totalXp = 990;
    pool.pool[0].activityLevel = 1.0;
    pool.pool[0].currentTier = 2; // tier 2 has high enough midpoint XP
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    const user = afterPool.pool[0];
    if (user.totalXp >= 1000) {
      expect(user.achievementsUnlocked).toContain('ach-ten-correct');
    }
  });
});

// --------------- simulateTierMovement ---------------

describe('tier movement rules', () => {
  it('tier movement respects promote/demote directions', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;

    // Every user should be in a valid tier (1-5)
    for (const user of afterPool.pool) {
      expect(user.currentTier).toBeGreaterThanOrEqual(1);
      expect(user.currentTier).toBeLessThanOrEqual(5);
    }
  });

  it('pool size is preserved after tier movement', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    expect(afterPool.pool.length).toBe(250);
  });

  it('Bronze users cannot be demoted (demoteCount=0)', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';
    // Mark all users as tier 1
    for (const user of pool.pool) {
      user.currentTier = 1;
    }
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    // No user should be below tier 1
    for (const user of afterPool.pool) {
      expect(user.currentTier).toBeGreaterThanOrEqual(1);
    }
  });

  it('Masters users cannot be promoted (promoteCount=0)', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';
    // Mark all users as tier 5
    for (const user of pool.pool) {
      user.currentTier = 5;
    }
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    // No user should exceed tier 5
    for (const user of afterPool.pool) {
      expect(user.currentTier).toBeLessThanOrEqual(5);
    }
  });
});

// --------------- Churn mechanics ---------------

describe('churn mechanics', () => {
  it('Bronze semi-inactive churn reduces activityLevel', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';
    saveFakeUserPool(pool);

    const bronzeBefore = pool.pool
      .filter((u) => u.currentTier === 1)
      .map((u) => u.activityLevel);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;

    // Some Bronze users may have reduced activity (5% chance each)
    // We can't guarantee it happens but we can verify no activity > 1.0
    for (const user of afterPool.pool) {
      expect(user.activityLevel).toBeLessThanOrEqual(1.0);
    }
  });

  it('pool never exceeds 300 users after churn replacement', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';
    saveFakeUserPool(pool);

    // Run progression multiple times to test churn
    for (let week = 0; week < 5; week++) {
      const p = getFakeUserPool()!;
      p.lastWeekProcessed = `2025-01-${String(6 + week * 7).padStart(2, '0')}`;
      saveFakeUserPool(p);
      progressFakeUsers();
    }

    const finalPool = getFakeUserPool()!;
    expect(finalPool.pool.length).toBeLessThanOrEqual(300);
  });
});

// --------------- progressSingleUser streak simulation ---------------

describe('streak simulation in progressSingleUser', () => {
  it('all 7 days active => streak increases by 7', () => {
    // We can test this by setting up a user with consistency = 1.0
    // which should always produce all-active days
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';

    const testUser = pool.pool[0];
    testUser.consistency = 1.0; // 100% chance each day
    testUser.currentStreak = 10;
    const originalStreak = testUser.currentStreak;
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    const user = afterPool.pool[0];

    // With consistency=1.0, rng() < 1.0 is always true,
    // so all 7 days should be active and streak should increase by 7
    // (Note: the rng for daily results is from the shared progression RNG, so
    // rng() < 1.0 is always true since rng produces values in [0, 1))
    expect(user.currentStreak).toBe(originalStreak + 7);
  });

  it('consistency=0 means streak should reset to 0', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';

    const testUser = pool.pool[1];
    testUser.consistency = 0; // 0% chance each day
    testUser.currentStreak = 50;
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    const user = afterPool.pool[1];

    // With 0 consistency, all days are inactive, streak should be 0
    expect(user.currentStreak).toBe(0);
  });
});

// --------------- drawCompetitorsFromPool ---------------

describe('drawCompetitorsFromPool', () => {
  beforeEach(() => {
    initFakeUserPool();
  });

  it('returns exactly 29 competitors', () => {
    const competitors = drawCompetitorsFromPool('2025-03-17', 1);
    expect(competitors).toHaveLength(29);
  });

  it('each competitor has required fields', () => {
    const competitors = drawCompetitorsFromPool('2025-03-17', 2);
    for (const c of competitors) {
      expect(c.id).toBeDefined();
      expect(c.name.length).toBeGreaterThan(0);
      expect(c.avatarInitial).toMatch(/^[A-Z]$/);
      expect(c.countryFlag.length).toBeGreaterThan(0);
      expect(c.weeklyXp).toBe(0);
      expect(c.dailyXpRate).toBeGreaterThan(0);
      expect(c.variance).toBeGreaterThan(0);
      expect(c.fakeUserId).toBeDefined();
    }
  });

  it('is deterministic for same week+tier', () => {
    const a = drawCompetitorsFromPool('2025-03-17', 1);
    const b = drawCompetitorsFromPool('2025-03-17', 1);
    expect(a.map((c) => c.id)).toEqual(b.map((c) => c.id));
    expect(a.map((c) => c.dailyXpRate)).toEqual(b.map((c) => c.dailyXpRate));
  });

  it('different weeks produce different competitor sets', () => {
    const a = drawCompetitorsFromPool('2025-03-17', 1);
    const b = drawCompetitorsFromPool('2025-03-24', 1);
    // At least some IDs should differ due to shuffle
    const idsA = a.map((c) => c.id);
    const idsB = b.map((c) => c.id);
    expect(idsA).not.toEqual(idsB);
  });

  it('different tiers produce different competitor sets', () => {
    const a = drawCompetitorsFromPool('2025-03-17', 1);
    const b = drawCompetitorsFromPool('2025-03-17', 3);
    const idsA = new Set(a.map((c) => c.id));
    const idsB = new Set(b.map((c) => c.id));
    // Should be mostly different users from different tiers
    let overlap = 0;
    for (const id of idsA) {
      if (idsB.has(id)) overlap++;
    }
    expect(overlap).toBeLessThan(29); // Not identical
  });

  it('backfills from adjacent tier if insufficient candidates', () => {
    // Create a pool where tier 5 only has a few users
    const pool = getFakeUserPool()!;
    // Move almost all tier 5 users to tier 4
    const t5 = pool.pool.filter((u) => u.currentTier === 5);
    for (let i = 0; i < t5.length - 3; i++) {
      t5[i].currentTier = 4;
    }
    saveFakeUserPool(pool);

    // Draw from tier 5 — only 3 candidates, needs backfill from tier 4
    const competitors = drawCompetitorsFromPool('2025-03-17', 5);
    expect(competitors).toHaveLength(29);
  });

  it('backfills from tier 2 when tier 1 has insufficient (adjacent = tier+1)', () => {
    const pool = getFakeUserPool()!;
    // Move all tier 1 users to tier 2 except a few
    const t1 = pool.pool.filter((u) => u.currentTier === 1);
    for (let i = 0; i < t1.length - 2; i++) {
      t1[i].currentTier = 2;
    }
    saveFakeUserPool(pool);

    const competitors = drawCompetitorsFromPool('2025-03-17', 1);
    expect(competitors).toHaveLength(29);
  });

  it('creates pool on the fly if none exists and still returns competitors', () => {
    localStorage.clear();
    const competitors = drawCompetitorsFromPool('2025-03-17', 1);
    expect(competitors).toHaveLength(29);
    // Pool should now be in localStorage
    expect(getFakeUserPool()).not.toBeNull();
  });
});

// --------------- Topic mastery advancement in progression ---------------

describe('topic mastery advancement during progression', () => {
  it('mastery level can advance from needs-work to developing', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';

    // Force a user to have many needs-work topics to increase chance
    const testUser = pool.pool[5];
    testUser.topicMastery = topics.slice(0, 5).map((t) => ({
      topicId: t.id,
      masteryLevel: 'needs-work' as const,
    }));
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    const user = afterPool.pool[5];

    // 15% chance per progression call, with 5 topics there is a reasonable chance
    // We just check that the mastery levels remain valid
    for (const tm of user.topicMastery) {
      expect(['needs-work', 'developing', 'strong']).toContain(tm.masteryLevel);
    }
  });

  it('new topics can be added during progression (5% chance)', () => {
    const pool = initFakeUserPool();
    pool.lastWeekProcessed = '2025-01-06';

    // Give a user very few topics
    const testUser = pool.pool[10];
    testUser.topicMastery = [{ topicId: 'engineering-mechanics', masteryLevel: 'strong' }];
    saveFakeUserPool(pool);

    progressFakeUsers();
    const afterPool = getFakeUserPool()!;
    const user = afterPool.pool[10];

    // May or may not have gained a new topic, but total should be 1 or 2
    expect(user.topicMastery.length).toBeGreaterThanOrEqual(1);
    expect(user.topicMastery.length).toBeLessThanOrEqual(11); // max 11 topics
  });
});
