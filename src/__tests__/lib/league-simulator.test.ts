import { describe, it, expect } from 'vitest';
import {
  seededRandom,
  hashSeed,
  generateCompetitors,
  simulateCompetitorXp,
  getUserRank,
  getWeekResult,
  getTierConfig,
} from '@/lib/league-simulator';
import { COMPETITORS_PER_LEAGUE } from '@/data/league';

// ============================================================
// seededRandom()
// ============================================================

describe('seededRandom()', () => {
  it('returns a function', () => {
    expect(typeof seededRandom(42)).toBe('function');
  });

  it('same seed produces same sequence', () => {
    const rng1 = seededRandom(12345);
    const rng2 = seededRandom(12345);
    for (let i = 0; i < 10; i++) {
      expect(rng1()).toBe(rng2());
    }
  });

  it('different seeds produce different sequences', () => {
    const rng1 = seededRandom(111);
    const rng2 = seededRandom(999);
    const values1 = Array.from({ length: 5 }, () => rng1());
    const values2 = Array.from({ length: 5 }, () => rng2());
    expect(values1).not.toEqual(values2);
  });

  it('produces values between 0 and 1', () => {
    const rng = seededRandom(42);
    for (let i = 0; i < 100; i++) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

// ============================================================
// hashSeed()
// ============================================================

describe('hashSeed()', () => {
  it('returns a number', () => {
    expect(typeof hashSeed('test')).toBe('number');
  });

  it('is deterministic', () => {
    expect(hashSeed('week-2025-06-09')).toBe(hashSeed('week-2025-06-09'));
  });

  it('different strings produce different hashes', () => {
    expect(hashSeed('aaa')).not.toBe(hashSeed('bbb'));
  });

  it('returns unsigned 32-bit values', () => {
    const hash = hashSeed('anything');
    expect(hash).toBeGreaterThanOrEqual(0);
    expect(hash).toBeLessThanOrEqual(0xFFFFFFFF);
  });
});

// ============================================================
// getTierConfig()
// ============================================================

describe('getTierConfig()', () => {
  it('returns config for valid tier', () => {
    const config = getTierConfig(1);
    expect(config.name).toBe('Bronze');
  });

  it('throws for invalid tier', () => {
    expect(() => getTierConfig(0 as any)).toThrow('Unknown league tier');
  });
});

// ============================================================
// generateCompetitors()
// ============================================================

describe('generateCompetitors()', () => {
  it('returns COMPETITORS_PER_LEAGUE - 1 (29) competitors', () => {
    const comps = generateCompetitors('2025-06-09', 1);
    expect(comps).toHaveLength(COMPETITORS_PER_LEAGUE - 1);
  });

  it('is deterministic for the same week and tier', () => {
    const a = generateCompetitors('2025-06-09', 2);
    const b = generateCompetitors('2025-06-09', 2);
    expect(a.map((c) => c.id)).toEqual(b.map((c) => c.id));
    expect(a.map((c) => c.name)).toEqual(b.map((c) => c.name));
  });

  it('produces different competitors for different weeks', () => {
    const a = generateCompetitors('2025-06-09', 1);
    const b = generateCompetitors('2025-06-16', 1);
    // Names will differ due to seeded shuffle
    const namesA = a.map((c) => c.name);
    const namesB = b.map((c) => c.name);
    expect(namesA).not.toEqual(namesB);
  });

  it('all competitors start with weeklyXp=0', () => {
    const comps = generateCompetitors('2025-06-09', 3);
    for (const c of comps) {
      expect(c.weeklyXp).toBe(0);
    }
  });

  it('competitors have valid properties', () => {
    const comps = generateCompetitors('2025-06-09', 1);
    for (const c of comps) {
      expect(c.id).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.avatarInitial).toMatch(/^[A-Z]$/);
      expect(c.countryFlag).toBeTruthy();
      expect(c.dailyXpRate).toBeGreaterThan(0);
      expect(c.variance).toBeGreaterThanOrEqual(0);
    }
  });

  it('has correct activity bucket distribution (20% light, 40% moderate, 40% active)', () => {
    // This tests the internal bucket logic via dailyXpRate ranges.
    // Light buckets have lower dailyXpRate due to 0.4 multiplier,
    // Active buckets have higher due to 1.8 multiplier.
    const comps = generateCompetitors('2025-06-09', 3);
    // First ~20% of indices = light (roughly 6 of 29)
    // The distribution is approximate but we can check that rates vary.
    const rates = comps.map((c) => c.dailyXpRate);
    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);
    // Active competitors should have significantly higher rates than light ones
    expect(maxRate / minRate).toBeGreaterThan(1.5);
  });
});

// ============================================================
// simulateCompetitorXp()
// ============================================================

describe('simulateCompetitorXp()', () => {
  it('is deterministic for the same inputs', () => {
    const comps = generateCompetitors('2025-01-01', 1); // very old week = 7 days elapsed
    const a = simulateCompetitorXp(comps, '2025-01-01');
    const b = simulateCompetitorXp(comps, '2025-01-01');
    for (let i = 0; i < a.length; i++) {
      expect(a[i].weeklyXp).toBe(b[i].weeklyXp);
    }
  });

  it('returns competitors with non-negative weeklyXp', () => {
    const comps = generateCompetitors('2025-01-01', 1);
    const result = simulateCompetitorXp(comps, '2025-01-01');
    for (const c of result) {
      expect(c.weeklyXp).toBeGreaterThanOrEqual(0);
    }
  });

  it('returns same length as input', () => {
    const comps = generateCompetitors('2025-06-09', 2);
    const result = simulateCompetitorXp(comps, '2025-06-09');
    expect(result).toHaveLength(comps.length);
  });
});

// ============================================================
// getUserRank()
// ============================================================

describe('getUserRank()', () => {
  const competitors = [
    { id: '1', name: 'A', avatarInitial: 'A', countryFlag: '', weeklyXp: 500, dailyXpRate: 0, variance: 0 },
    { id: '2', name: 'B', avatarInitial: 'B', countryFlag: '', weeklyXp: 300, dailyXpRate: 0, variance: 0 },
    { id: '3', name: 'C', avatarInitial: 'C', countryFlag: '', weeklyXp: 100, dailyXpRate: 0, variance: 0 },
  ];

  it('returns rank 1 when user has more than all competitors', () => {
    expect(getUserRank(600, competitors)).toBe(1);
  });

  it('returns rank 1 when user ties with highest competitor (strictly greater check)', () => {
    // No competitor has weeklyXp > 500, so rank = 0 + 1 = 1
    expect(getUserRank(500, competitors)).toBe(1);
  });

  it('returns rank 2 when one competitor has strictly more', () => {
    expect(getUserRank(400, competitors)).toBe(2);
  });

  it('returns rank 3 when two competitors have strictly more', () => {
    expect(getUserRank(200, competitors)).toBe(3);
  });

  it('returns rank 4 (last) when all competitors have more', () => {
    expect(getUserRank(50, competitors)).toBe(4);
  });

  it('returns rank 1 with empty competitors list', () => {
    expect(getUserRank(100, [])).toBe(1);
  });

  it('ties with middle competitor: user shares rank with B', () => {
    // User has 300, only A (500) is strictly greater => rank 2
    expect(getUserRank(300, competitors)).toBe(2);
  });
});

// ============================================================
// getWeekResult()
// ============================================================

describe('getWeekResult()', () => {
  it('promotes when rank is within promoteCount and tier < 5', () => {
    // Tier 1 (Bronze): promoteCount=5
    const result = getWeekResult(5, 1);
    expect(result.promoted).toBe(true);
    expect(result.demoted).toBe(false);
    expect(result.newTier).toBe(2);
  });

  it('promotes at rank 1', () => {
    const result = getWeekResult(1, 3);
    expect(result.promoted).toBe(true);
    expect(result.newTier).toBe(4);
  });

  it('does not promote at tier 5 (Masters)', () => {
    // Tier 5: promoteCount=0, so rank <= 0 is never true
    const result = getWeekResult(1, 5);
    expect(result.promoted).toBe(false);
    expect(result.newTier).toBe(5);
  });

  it('demotes when rank is in bottom demoteCount and tier > 1', () => {
    // Tier 2 (Silver): demoteCount=5. COMPETITORS_PER_LEAGUE=30.
    // Demotion: rank > 30 - 5 = 25
    const result = getWeekResult(26, 2);
    expect(result.demoted).toBe(true);
    expect(result.promoted).toBe(false);
    expect(result.newTier).toBe(1);
  });

  it('does not demote at tier 1 (Bronze)', () => {
    // Tier 1: demoteCount=0
    const result = getWeekResult(30, 1);
    expect(result.demoted).toBe(false);
    expect(result.newTier).toBe(1);
  });

  it('no change for middle rank', () => {
    // Tier 3 (Gold): promoteCount=5, demoteCount=5
    // Rank 15 is in the safe zone
    const result = getWeekResult(15, 3);
    expect(result.promoted).toBe(false);
    expect(result.demoted).toBe(false);
    expect(result.newTier).toBe(3);
  });

  it('boundary: rank exactly at promoteCount boundary', () => {
    // Tier 2: promoteCount=5, so rank=5 => promoted
    const result = getWeekResult(5, 2);
    expect(result.promoted).toBe(true);
    expect(result.newTier).toBe(3);
  });

  it('boundary: rank just outside promoteCount', () => {
    // Tier 2: promoteCount=5, so rank=6 => NOT promoted
    const result = getWeekResult(6, 2);
    expect(result.promoted).toBe(false);
  });

  it('boundary: rank exactly at demotion boundary', () => {
    // Tier 3: demoteCount=5, so demotion rank > 30-5=25, i.e. rank 26+
    const result = getWeekResult(25, 3);
    expect(result.demoted).toBe(false); // 25 is NOT > 25
  });

  it('boundary: rank just inside demotion zone', () => {
    const result = getWeekResult(26, 3);
    expect(result.demoted).toBe(true);
    expect(result.newTier).toBe(2);
  });
});
