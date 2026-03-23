import type { FakeUser, FakeUserPool, LeagueCompetitor } from '@/data/engagement-types';
import { fakeNames } from '@/data/fake-names';
import { competitorFlags } from '@/data/league';
import { topics } from '@/data/topics';
import { seededRandom, hashSeed, getTierConfig } from '@/lib/league-simulator';
import { getCurrentWeekMonday } from '@/lib/quest-engine';

// --------------- Constants ---------------

const POOL_VERSION = 4; // v4: ~20% avatars with random photos (picsum), 80% initials only
const POOL_STORAGE_KEY = 'mechready-fake-users';
const MAX_POOL_SIZE = 300;

const TIER_POOL_SIZES: Record<number, number> = {
  1: 80, 2: 70, 3: 50, 4: 30, 5: 20,
};

// Name quality distribution per tier: [Q1%, Q2%, Q3%, Q4%, Q5%]
const NAME_QUALITY_DIST: Record<number, number[]> = {
  1: [0.30, 0.30, 0.30, 0.10, 0.00],
  2: [0.10, 0.25, 0.40, 0.20, 0.05],
  3: [0.05, 0.10, 0.30, 0.45, 0.10],
  4: [0.00, 0.05, 0.15, 0.50, 0.30],
  5: [0.00, 0.00, 0.10, 0.40, 0.50],
};

// Avatar probability (chance of having a profile image) per tier — ~20% have one
const AVATAR_PROBABILITY: Record<number, number> = {
  1: 0.12, 2: 0.15, 3: 0.20, 4: 0.25, 5: 0.30,
};

// Frame probability per tier (chance of having any frame equipped)
const FRAME_PROBABILITY: Record<number, number> = {
  1: 0.15, 2: 0.30, 3: 0.50, 4: 0.70, 5: 0.85,
};

// Frame pool per tier — weighted by rarity (higher tiers get rarer frames)
const FRAME_POOLS: Record<number, { style: string; weight: number }[]> = {
  1: [
    // Bronze: mostly common, tiny chance of rare
    { style: 'steel', weight: 10 }, { style: 'copper', weight: 10 }, { style: 'bolt', weight: 10 },
    { style: 'wire', weight: 10 }, { style: 'concrete', weight: 8 }, { style: 'gasket', weight: 8 },
    { style: 'titanium', weight: 6 }, { style: 'gold', weight: 4 },
    { style: 'league-bronze', weight: 5 },
    { style: 'wrench', weight: 2 }, { style: 'piston', weight: 1 },
  ],
  2: [
    // Silver: common + rare
    { style: 'gold', weight: 6 }, { style: 'emerald', weight: 6 }, { style: 'ruby', weight: 5 },
    { style: 'blueprint', weight: 5 }, { style: 'rivet', weight: 5 }, { style: 'spring', weight: 4 },
    { style: 'gear', weight: 4 }, { style: 'cast-iron', weight: 3 },
    { style: 'league-bronze', weight: 4 }, { style: 'league-silver', weight: 5 },
    { style: 'wrench', weight: 6 }, { style: 'piston', weight: 5 }, { style: 'circuit', weight: 5 },
    { style: 'diamond', weight: 3 }, { style: 'sunset', weight: 2 },
  ],
  3: [
    // Gold: rare + some epic
    { style: 'sapphire', weight: 4 }, { style: 'emerald', weight: 3 }, { style: 'ruby', weight: 3 },
    { style: 'league-silver', weight: 3 }, { style: 'league-gold', weight: 6 },
    { style: 'diamond', weight: 6 }, { style: 'sunset', weight: 5 }, { style: 'wrench', weight: 4 },
    { style: 'circuit', weight: 4 }, { style: 'thermal', weight: 5 }, { style: 'weld', weight: 5 },
    { style: 'aurora', weight: 3 }, { style: 'neon', weight: 3 }, { style: 'turbine', weight: 2 },
    { style: 'streak-iron', weight: 2 },
  ],
  4: [
    // Platinum: rare + epic + some legendary
    { style: 'league-gold', weight: 3 }, { style: 'league-platinum', weight: 6 },
    { style: 'thermal', weight: 4 }, { style: 'weld', weight: 4 },
    { style: 'aurora', weight: 5 }, { style: 'neon', weight: 5 }, { style: 'turbine', weight: 5 },
    { style: 'plasma', weight: 5 }, { style: 'star-drive', weight: 4 },
    { style: 'streak-iron', weight: 3 }, { style: 'streak-diamond', weight: 2 },
    { style: 'singularity', weight: 2 }, { style: 'fusion-reactor', weight: 1 },
    { style: 'perfectionist', weight: 2 }, { style: 'marathon', weight: 2 },
  ],
  5: [
    // Masters: epic + legendary dominate
    { style: 'league-platinum', weight: 2 }, { style: 'league-masters', weight: 8 },
    { style: 'aurora', weight: 3 }, { style: 'turbine', weight: 3 }, { style: 'plasma', weight: 4 },
    { style: 'star-drive', weight: 4 },
    { style: 'singularity', weight: 5 }, { style: 'fusion-reactor', weight: 5 },
    { style: 'supernova', weight: 4 }, { style: 'all-gold', weight: 2 },
    { style: 'streak-diamond', weight: 3 }, { style: 'streak-centurion', weight: 2 },
    { style: 'perfectionist', weight: 2 }, { style: 'speed-demon', weight: 2 },
  ],
};

function pickRandomFrame(rng: () => number, tier: number): string | undefined {
  if (rng() > FRAME_PROBABILITY[tier]) return undefined;
  const pool = FRAME_POOLS[tier];
  const totalWeight = pool.reduce((s, p) => s + p.weight, 0);
  let roll = rng() * totalWeight;
  for (const entry of pool) {
    roll -= entry.weight;
    if (roll <= 0) return entry.style;
  }
  return pool[pool.length - 1].style;
}

// Avatar styles (kept for seed generation, photos come from pravatar.cc)
const AVATAR_STYLES = ['photo-a', 'photo-b', 'photo-c', 'photo-d'];

// XP ranges per tier (aligned with levels.ts)
const TIER_XP_RANGES: Record<number, { min: number; max: number }> = {
  1: { min: 0, max: 850 },
  2: { min: 850, max: 7100 },
  3: { min: 7100, max: 20300 },
  4: { min: 20300, max: 52000 },
  5: { min: 52000, max: 100000 },
};

const STREAK_RANGES: Record<number, { min: number; max: number; zeroWeight: number }> = {
  1: { min: 0, max: 5, zeroWeight: 0.6 },
  2: { min: 0, max: 14, zeroWeight: 0.2 },
  3: { min: 2, max: 30, zeroWeight: 0.0 },
  4: { min: 5, max: 60, zeroWeight: 0.0 },
  5: { min: 14, max: 200, zeroWeight: 0.0 },
};

const LONGEST_STREAK_RANGES: Record<number, { min: number; max: number }> = {
  1: { min: 0, max: 7 },
  2: { min: 3, max: 21 },
  3: { min: 7, max: 45 },
  4: { min: 14, max: 90 },
  5: { min: 30, max: 365 },
};

const ACHIEVEMENT_COUNTS: Record<number, { min: number; max: number }> = {
  1: { min: 0, max: 3 },
  2: { min: 2, max: 8 },
  3: { min: 5, max: 15 },
  4: { min: 8, max: 22 },
  5: { min: 12, max: 27 },
};

const TOPIC_COUNTS: Record<number, { min: number; max: number }> = {
  1: { min: 0, max: 3 },
  2: { min: 2, max: 5 },
  3: { min: 4, max: 8 },
  4: { min: 6, max: 10 },
  5: { min: 8, max: 11 },
};

// Achievement tiers: base achievements available at each tier (always in the eligible pool)
const ACHIEVEMENT_TIERS: Record<number, string[]> = {
  1: ['ach-first-correct', 'ach-first-topic', 'ach-streak-3'],
  2: ['ach-ten-correct', 'ach-streak-7', 'ach-daily-challenge-5', 'ach-five-topics'],
  3: ['ach-fifty-correct', 'ach-streak-14', 'ach-perfect-session', 'ach-topic-master', 'ach-all-types', 'ach-all-advanced'],
  4: ['ach-hundred-correct', 'ach-streak-30', 'ach-speed-round', 'ach-multi-master', 'ach-all-topics'],
  5: ['ach-interview-ready', 'ach-hard-streak', 'ach-scenario-master'],
};

// Probability-gated achievements: only added if rng() < probability AND tier >= minTier
const TIER_GATED_ACHIEVEMENTS = [
  { id: 'ach-estimation-ace', minTier: 2, probability: 0.15 },
  { id: 'ach-flaw-finder', minTier: 2, probability: 0.15 },
  { id: 'ach-confidence-calibrated', minTier: 3, probability: 0.20 },
  { id: 'ach-weakness-conquered', minTier: 3, probability: 0.15 },
];

// Sprinkle achievements (any tier, with probability)
const SPRINKLE_ACHIEVEMENTS = [
  { id: 'ach-weekend-warrior', probability: 0.20 },
  { id: 'ach-bookworm', probability: 0.25 },
  { id: 'ach-night-owl', probability: 0.10 },
  { id: 'ach-early-bird', probability: 0.10 },
  { id: 'ach-wrong-five', probability: 0.10 },
];

// Critical topics get 2x draw weight
const CRITICAL_TOPICS = new Set([
  'engineering-mechanics',
  'strength-of-materials',
  'materials-engineering',
  'design-tolerancing',
]);

const MASTERY_LEVELS = ['needs-work', 'developing', 'strong'] as const;

// Mastery level weights per tier (higher tiers = more "strong")
const MASTERY_WEIGHTS: Record<number, number[]> = {
  1: [0.70, 0.25, 0.05],   // mostly needs-work
  2: [0.40, 0.45, 0.15],   // needs-work + developing
  3: [0.15, 0.50, 0.35],   // developing + some strong
  4: [0.05, 0.40, 0.55],   // developing to strong
  5: [0.00, 0.20, 0.80],   // mostly strong
};

// --------------- Helper ---------------

function randInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function randFloat(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}

function pickWeighted(rng: () => number, weights: number[]): number {
  const r = rng();
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (r < cumulative) return i;
  }
  return weights.length - 1;
}

function shuffleArray<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function daysAgoToISO(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

// getCurrentWeekMonday is imported from @/lib/quest-engine (not redefined)

// --------------- Pool Generation ---------------

function pickNameQuality(rng: () => number, tier: number): 1 | 2 | 3 | 4 | 5 {
  const dist = NAME_QUALITY_DIST[tier];
  return (pickWeighted(rng, dist) + 1) as 1 | 2 | 3 | 4 | 5;
}

function generateAchievements(
  rng: () => number,
  tier: number,
  count: number,
): string[] {
  // Collect all eligible achievements up to this tier
  const eligible: string[] = [];
  for (let t = 1; t <= tier; t++) {
    eligible.push(...(ACHIEVEMENT_TIERS[t] ?? []));
  }

  const shuffled = shuffleArray(eligible, rng);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // Add tier-gated achievements (probability-based, per spec)
  for (const gated of TIER_GATED_ACHIEVEMENTS) {
    if (tier >= gated.minTier && rng() < gated.probability && !selected.includes(gated.id)) {
      selected.push(gated.id);
    }
  }

  // Add sprinkle achievements (any tier)
  for (const sprinkle of SPRINKLE_ACHIEVEMENTS) {
    if (rng() < sprinkle.probability && !selected.includes(sprinkle.id)) {
      selected.push(sprinkle.id);
    }
  }

  return selected;
}

function generateTopicMastery(
  rng: () => number,
  tier: number,
  count: number,
): FakeUser['topicMastery'] {
  // Build weighted topic list (critical topics appear twice)
  const weightedTopics: string[] = [];
  for (const topic of topics) {
    weightedTopics.push(topic.id);
    if (CRITICAL_TOPICS.has(topic.id)) {
      weightedTopics.push(topic.id); // 2x weight
    }
  }

  const shuffled = shuffleArray(weightedTopics, rng);
  // Deduplicate while preserving order
  const seen = new Set<string>();
  const selected: string[] = [];
  for (const id of shuffled) {
    if (!seen.has(id)) {
      seen.add(id);
      selected.push(id);
    }
    if (selected.length >= count) break;
  }

  const weights = MASTERY_WEIGHTS[tier];
  return selected.map((topicId) => ({
    topicId,
    masteryLevel: MASTERY_LEVELS[pickWeighted(rng, weights)],
  }));
}

function generateFakeUser(
  rng: () => number,
  tier: 1 | 2 | 3 | 4 | 5,
  index: number,
  name: string,
  nameQuality: 1 | 2 | 3 | 4 | 5,
): FakeUser {
  const id = `fake-${String(index).padStart(3, '0')}`;
  const flag = competitorFlags[Math.floor(rng() * competitorFlags.length)];

  // Avatar
  const hasAvatar = rng() < AVATAR_PROBABILITY[tier];
  const avatarStyle = AVATAR_STYLES[Math.floor(rng() * AVATAR_STYLES.length)];

  // Join date: tier determines how long ago
  const joinDaysRanges: Record<number, { min: number; max: number }> = {
    1: { min: 0, max: 30 },
    2: { min: 7, max: 84 },
    3: { min: 21, max: 168 },
    4: { min: 42, max: 280 },
    5: { min: 84, max: 365 },
  };
  const joinRange = joinDaysRanges[tier];
  const joinDaysAgo = randInt(rng, joinRange.min, joinRange.max);

  // XP
  const xpRange = TIER_XP_RANGES[tier];
  const totalXp = randInt(rng, xpRange.min, xpRange.max);

  // Streak
  const streakRange = STREAK_RANGES[tier];
  let currentStreak: number;
  if (rng() < streakRange.zeroWeight) {
    currentStreak = randInt(rng, 0, 1);
  } else {
    currentStreak = randInt(rng, streakRange.min, streakRange.max);
  }

  const longestStreakRange = LONGEST_STREAK_RANGES[tier];
  const longestStreak = Math.max(
    currentStreak,
    randInt(rng, longestStreakRange.min, longestStreakRange.max),
  );

  // Achievements
  const achRange = ACHIEVEMENT_COUNTS[tier];
  const achCount = randInt(rng, achRange.min, achRange.max);
  const achievementsUnlocked = generateAchievements(rng, tier, achCount);

  // Topic mastery
  const topicRange = TOPIC_COUNTS[tier];
  const topicCount = randInt(rng, topicRange.min, topicRange.max);
  const topicMastery = generateTopicMastery(rng, tier, topicCount);

  // Activity/consistency params
  const activityLevel = randFloat(rng, 0.1, 1.0);
  const consistency = randFloat(rng, 0.2, 0.95);

  // Frame
  const frameStyle = pickRandomFrame(rng, tier);

  return {
    id,
    name,
    nameQuality,
    avatarType: hasAvatar ? 'dicebear' : 'none',
    avatarStyle: hasAvatar ? avatarStyle : undefined,
    avatarSeed: `${id}-avatar`,
    countryFlag: flag,
    joinDate: daysAgoToISO(joinDaysAgo),
    totalXp,
    currentStreak,
    longestStreak,
    accuracy: randInt(rng, 45, 98),
    achievementsUnlocked,
    topicMastery,
    currentTier: tier,
    activityLevel,
    consistency,
    lastProgressedWeek: getCurrentWeekMonday(),
    frameStyle,
  };
}

function generateFakeUserPool(): FakeUserPool {
  const rng = seededRandom(hashSeed('mechready-fake-pool-v1'));
  const pool: FakeUser[] = [];
  let index = 0;

  // Group names by quality
  const namesByQuality: Record<number, string[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const entry of fakeNames) {
    namesByQuality[entry.quality].push(entry.name);
  }
  // Shuffle each quality pool
  for (const q of [1, 2, 3, 4, 5]) {
    namesByQuality[q] = shuffleArray(namesByQuality[q], rng);
  }
  const nameCounters: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const tier of [1, 2, 3, 4, 5] as const) {
    const count = TIER_POOL_SIZES[tier];
    for (let i = 0; i < count; i++) {
      const quality = pickNameQuality(rng, tier);
      const qualityPool = namesByQuality[quality];
      const nameIdx = nameCounters[quality] % qualityPool.length;
      const name = qualityPool[nameIdx];
      nameCounters[quality]++;

      pool.push(generateFakeUser(rng, tier, index, name, quality));
      index++;
    }
  }

  return {
    version: POOL_VERSION,
    pool,
    lastWeekProcessed: getCurrentWeekMonday(),
  };
}

// --------------- Storage ---------------

function getFakeUserPool(): FakeUserPool | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(POOL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FakeUserPool;
    if (parsed.version !== POOL_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveFakeUserPool(pool: FakeUserPool): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(POOL_STORAGE_KEY, JSON.stringify(pool));
}

export function initFakeUserPool(): FakeUserPool {
  const existing = getFakeUserPool();
  if (existing) return existing;
  const pool = generateFakeUserPool();
  saveFakeUserPool(pool);
  return pool;
}

/**
 * Look up a FakeUser by ID from the pool in localStorage.
 */
export function getFakeUserById(id: string): FakeUser | null {
  const pool = getFakeUserPool();
  if (!pool) return null;
  return pool.pool.find((u) => u.id === id) ?? null;
}

// --------------- Weekly Progression ---------------

/**
 * Advance all fake users by one week if a new Monday has started.
 * Call this on app mount, before simulateLeagueWeek().
 */
export function progressFakeUsers(): void {
  const pool = getFakeUserPool();
  if (!pool) return;

  const currentMonday = getCurrentWeekMonday();
  if (pool.lastWeekProcessed === currentMonday) return; // Already progressed this week

  const rng = seededRandom(hashSeed(`progress-${currentMonday}`));

  for (const user of pool.pool) {
    progressSingleUser(user, rng);
  }

  // Tier movement
  simulateTierMovement(pool.pool, rng);

  // Churn: 5% of Bronze go semi-inactive
  const bronzeUsers = pool.pool.filter((u) => u.currentTier === 1);
  for (const user of bronzeUsers) {
    if (rng() < 0.05) {
      user.activityLevel *= 0.3;
    }
  }

  // Churn: 2% chance to add a new Bronze user (replacing most inactive)
  if (rng() < 0.02 && pool.pool.length < MAX_POOL_SIZE) {
    const mostInactive = pool.pool
      .filter((u) => u.currentTier === 1)
      .sort((a, b) => a.activityLevel - b.activityLevel)[0];

    if (mostInactive && mostInactive.activityLevel < 0.05) {
      // Replace the most inactive user
      const newIndex = pool.pool.length;
      const quality = pickNameQuality(rng, 1);
      const qualityNames = fakeNames.filter((n) => n.quality === quality);
      const name = qualityNames[Math.floor(rng() * qualityNames.length)]?.name ?? 'New User';
      const newUser = generateFakeUser(rng, 1, newIndex, name, quality);
      const idx = pool.pool.indexOf(mostInactive);
      pool.pool[idx] = newUser;
    }
  }

  pool.lastWeekProcessed = currentMonday;
  saveFakeUserPool(pool);
}

function progressSingleUser(user: FakeUser, rng: () => number): void {
  const tierConfig = getTierConfig(user.currentTier);
  const xpRange = tierConfig.xpRange;
  const midpointXp = (xpRange.min + xpRange.max) / 2;

  // Weekly XP gain
  const weeklyXpGain = Math.round(midpointXp * user.activityLevel * (0.5 + rng()));
  user.totalXp += weeklyXpGain;

  // Streak: simulate 7 individual days
  let consecutiveFromEnd = 0;
  let streakBroken = false;
  const dailyResults: boolean[] = [];
  for (let day = 0; day < 7; day++) {
    dailyResults.push(rng() < user.consistency);
  }
  // Count consecutive active days from end of week
  for (let day = 6; day >= 0; day--) {
    if (dailyResults[day]) {
      consecutiveFromEnd++;
    } else {
      streakBroken = true;
      break;
    }
  }

  if (streakBroken || consecutiveFromEnd === 0) {
    // Streak was broken at some point
    user.currentStreak = consecutiveFromEnd; // Could be 0
  } else {
    // All 7 days active — streak continues
    user.currentStreak += 7;
  }
  user.longestStreak = Math.max(user.longestStreak, user.currentStreak);

  // Achievements: check milestones based on updated stats
  const achChecks: { id: string; condition: () => boolean }[] = [
    { id: 'ach-streak-7', condition: () => user.longestStreak >= 7 },
    { id: 'ach-streak-14', condition: () => user.longestStreak >= 14 },
    { id: 'ach-streak-30', condition: () => user.longestStreak >= 30 },
    { id: 'ach-ten-correct', condition: () => user.totalXp >= 1000 },
    { id: 'ach-fifty-correct', condition: () => user.totalXp >= 5000 },
    { id: 'ach-hundred-correct', condition: () => user.totalXp >= 12000 },
  ];
  for (const check of achChecks) {
    if (check.condition() && !user.achievementsUnlocked.includes(check.id)) {
      user.achievementsUnlocked.push(check.id);
    }
  }

  // Topic mastery: 15% chance to advance one topic
  if (rng() < 0.15 && user.topicMastery.length > 0) {
    const topicIdx = Math.floor(rng() * user.topicMastery.length);
    const topic = user.topicMastery[topicIdx];
    if (topic.masteryLevel === 'needs-work') {
      topic.masteryLevel = 'developing';
    } else if (topic.masteryLevel === 'developing') {
      topic.masteryLevel = 'strong';
    }
  }

  // Maybe start a new topic
  if (rng() < 0.05 && user.topicMastery.length < 11) {
    const existingTopics = new Set(user.topicMastery.map((t) => t.topicId));
    const available = topics.filter((t) => !existingTopics.has(t.id));
    if (available.length > 0) {
      const newTopic = available[Math.floor(rng() * available.length)];
      user.topicMastery.push({ topicId: newTopic.id, masteryLevel: 'needs-work' });
    }
  }

  user.lastProgressedWeek = getCurrentWeekMonday();
}

function simulateTierMovement(pool: FakeUser[], rng: () => number): void {
  // Group by tier
  const byTier: Record<number, FakeUser[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const user of pool) {
    byTier[user.currentTier].push(user);
  }

  for (const tier of [1, 2, 3, 4, 5] as const) {
    const tierConfig = getTierConfig(tier);
    const group = byTier[tier];
    if (group.length === 0) continue;

    // Assign simulated weekly XP for ranking
    const ranked = group
      .map((u) => ({
        user: u,
        simulatedXp: (tierConfig.xpRange.min + tierConfig.xpRange.max) / 2 * u.activityLevel * (0.5 + rng()),
      }))
      .sort((a, b) => b.simulatedXp - a.simulatedXp);

    // Proportional promote/demote counts
    const promoteCount = Math.ceil(group.length * tierConfig.promoteCount / 30);
    const demoteCount = Math.ceil(group.length * tierConfig.demoteCount / 30);

    for (let i = 0; i < ranked.length; i++) {
      const user = ranked[i].user;
      if (i < promoteCount && tier < 5) {
        user.currentTier = (tier + 1) as 1 | 2 | 3 | 4 | 5;
      } else if (i >= ranked.length - demoteCount && demoteCount > 0 && tier > 1) {
        user.currentTier = (tier - 1) as 1 | 2 | 3 | 4 | 5;
      }
    }
  }
}

// --------------- League Drawing ---------------

/**
 * Draw 29 competitors from the fake user pool for the given week and tier.
 * Replaces the old generateCompetitors() function.
 */
export function drawCompetitorsFromPool(
  weekStartDate: string,
  tier: 1 | 2 | 3 | 4 | 5,
): LeagueCompetitor[] {
  const pool = getFakeUserPool();
  if (!pool) {
    // Fallback: create pool on the fly
    const newPool = generateFakeUserPool();
    saveFakeUserPool(newPool);
    return drawFromPool(newPool.pool, weekStartDate, tier);
  }
  return drawFromPool(pool.pool, weekStartDate, tier);
}

function drawFromPool(
  pool: FakeUser[],
  weekStartDate: string,
  tier: 1 | 2 | 3 | 4 | 5,
): LeagueCompetitor[] {
  const tierConfig = getTierConfig(tier);
  const rng = seededRandom(hashSeed(`${weekStartDate}-${tier}`));

  // Filter by tier
  let candidates = pool.filter((u) => u.currentTier === tier);

  // Backfill from adjacent tier if insufficient
  if (candidates.length < 29) {
    const adjacentTier = tier > 1 ? tier - 1 : tier + 1;
    const adjacent = pool.filter((u) => u.currentTier === adjacentTier);
    candidates = [...candidates, ...adjacent];
  }

  // Shuffle and take 29
  const shuffled = shuffleArray(candidates, rng);
  const selected = shuffled.slice(0, 29);

  const { min: xpMin, max: xpMax } = tierConfig.xpRange;
  const midpointXp = (xpMin + xpMax) / 2;

  return selected.map((user) => {
    const baseDailyRate = (midpointXp / 7) * user.activityLevel;
    const dailyXpRate = baseDailyRate * (0.8 + rng() * 0.4);
    const variance = dailyXpRate * 0.3;

    return {
      id: user.id,
      name: user.name,
      avatarInitial: user.name.charAt(0).toUpperCase(),
      countryFlag: user.countryFlag,
      weeklyXp: 0,
      dailyXpRate,
      variance,
      fakeUserId: user.id,
      frameStyle: user.frameStyle,
    };
  });
}
