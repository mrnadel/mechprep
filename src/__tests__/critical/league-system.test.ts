import { describe, it, expect } from 'vitest';
import {
  getUserRank,
  getWeekResult,
  getTierConfig,
  generateCompetitors,
  simulateCompetitorXp,
  seededRandom,
  hashSeed,
} from '@/lib/league-simulator';
import { leagueTiers, COMPETITORS_PER_LEAGUE, LEAGUE_GEM_REWARD_PROMOTION } from '@/data/league';
import type { LeagueCompetitor } from '@/data/engagement-types';

// --- Helpers ---

function makeCompetitor(id: string, weeklyXp: number): LeagueCompetitor {
  return {
    id,
    name: `Competitor ${id}`,
    avatarInitial: 'C',
    countryFlag: '🏳️',
    weeklyXp,
    dailyXpRate: 50,
    variance: 10,
  };
}

function makeCompetitors(xpValues: number[]): LeagueCompetitor[] {
  return xpValues.map((xp, i) => makeCompetitor(`bot-${i}`, xp));
}

// ==============================================================
// LEAGUE SYSTEM — COMPREHENSIVE TESTS
// ==============================================================

describe('League System', () => {
  describe('League tier configuration', () => {
    it('has exactly 5 tiers', () => {
      expect(leagueTiers).toHaveLength(5);
    });

    it('tiers are numbered 1 through 5', () => {
      expect(leagueTiers.map(t => t.tier)).toEqual([1, 2, 3, 4, 5]);
    });

    it('tiers have correct names', () => {
      expect(leagueTiers[0].name).toBe('Bronze');
      expect(leagueTiers[1].name).toBe('Silver');
      expect(leagueTiers[2].name).toBe('Gold');
      expect(leagueTiers[3].name).toBe('Platinum');
      expect(leagueTiers[4].name).toBe('Masters');
    });

    it('Bronze has 0 demotion slots (cannot demote from lowest)', () => {
      expect(leagueTiers[0].demoteCount).toBe(0);
    });

    it('Masters has 0 promotion slots (cannot promote from highest)', () => {
      expect(leagueTiers[4].promoteCount).toBe(0);
    });

    it('xpRange min values are monotonically increasing', () => {
      for (let i = 1; i < leagueTiers.length; i++) {
        expect(leagueTiers[i].xpRange.min).toBeGreaterThan(leagueTiers[i - 1].xpRange.min);
      }
    });

    it('each tier has 30 competitors per league', () => {
      expect(COMPETITORS_PER_LEAGUE).toBe(30);
    });

    it('promotion reward is 25 gems', () => {
      expect(LEAGUE_GEM_REWARD_PROMOTION).toBe(25);
    });
  });

  describe('getTierConfig', () => {
    it('returns correct config for tier 1', () => {
      const config = getTierConfig(1);
      expect(config.name).toBe('Bronze');
      expect(config.promoteCount).toBe(5);
      expect(config.demoteCount).toBe(0);
    });

    it('returns correct config for tier 3', () => {
      const config = getTierConfig(3);
      expect(config.name).toBe('Gold');
      expect(config.promoteCount).toBe(5);
      expect(config.demoteCount).toBe(5);
    });

    it('returns correct config for tier 5', () => {
      const config = getTierConfig(5);
      expect(config.name).toBe('Masters');
      expect(config.promoteCount).toBe(0);
      expect(config.demoteCount).toBe(5);
    });
  });

  describe('getUserRank', () => {
    it('returns rank 1 when user has highest XP', () => {
      const competitors = makeCompetitors([100, 200, 300, 400]);
      const rank = getUserRank(500, competitors);
      expect(rank).toBe(1);
    });

    it('returns rank 2 when one competitor has more XP', () => {
      const competitors = makeCompetitors([100, 200, 300, 600]);
      const rank = getUserRank(500, competitors);
      expect(rank).toBe(2);
    });

    it('returns rank 1 when tied with highest (user wins ties)', () => {
      const competitors = makeCompetitors([500, 200, 300]);
      const rank = getUserRank(500, competitors);
      // Competitors with weeklyXp > userXp: none (500 is not > 500)
      expect(rank).toBe(1);
    });

    it('returns last rank when user has lowest XP', () => {
      const competitors = makeCompetitors([100, 200, 300, 400]);
      const rank = getUserRank(50, competitors);
      expect(rank).toBe(5); // 4 competitors above + user = rank 5
    });

    it('returns rank 1 with no competitors', () => {
      const rank = getUserRank(100, []);
      expect(rank).toBe(1);
    });

    it('handles all competitors having 0 XP', () => {
      const competitors = makeCompetitors([0, 0, 0, 0]);
      const rank = getUserRank(0, competitors);
      expect(rank).toBe(1); // No one has more, so rank 1
    });

    it('handles very large XP values', () => {
      const competitors = makeCompetitors([999999, 888888, 777777]);
      const rank = getUserRank(1000000, competitors);
      expect(rank).toBe(1);
    });

    it('correctly counts multiple competitors above user', () => {
      const competitors = makeCompetitors([600, 700, 800, 100, 200]);
      const rank = getUserRank(500, competitors);
      expect(rank).toBe(4); // 3 competitors above (600, 700, 800)
    });
  });

  describe('getWeekResult — promotion', () => {
    it('promotes when rank is within promoteCount in Bronze', () => {
      // Bronze promoteCount = 5, so ranks 1-5 promote
      const result = getWeekResult(1, 1);
      expect(result.promoted).toBe(true);
      expect(result.demoted).toBe(false);
      expect(result.newTier).toBe(2);
    });

    it('promotes at exactly the promoteCount boundary', () => {
      const result = getWeekResult(5, 1); // rank 5, promoteCount=5
      expect(result.promoted).toBe(true);
      expect(result.newTier).toBe(2);
    });

    it('does not promote when rank is just outside promoteCount', () => {
      const result = getWeekResult(6, 1); // rank 6, promoteCount=5
      expect(result.promoted).toBe(false);
    });

    it('does not promote from Masters (tier 5)', () => {
      const result = getWeekResult(1, 5); // rank 1 in Masters
      expect(result.promoted).toBe(false);
      expect(result.newTier).toBe(5);
    });

    it('promotes from Silver to Gold', () => {
      const result = getWeekResult(3, 2);
      expect(result.promoted).toBe(true);
      expect(result.newTier).toBe(3);
    });

    it('promotes from Platinum to Masters', () => {
      const config = getTierConfig(4);
      const result = getWeekResult(1, 4);
      expect(result.promoted).toBe(true);
      expect(result.newTier).toBe(5);
    });
  });

  describe('getWeekResult — demotion', () => {
    it('does not demote from Bronze (tier 1)', () => {
      const result = getWeekResult(30, 1); // last place in Bronze
      expect(result.demoted).toBe(false);
      expect(result.newTier).toBe(1);
    });

    it('demotes from Silver when rank is in bottom demoteCount', () => {
      // Silver: demoteCount=5, 30 competitors
      // Demotion zone: rank > (30 - 5) = rank > 25
      const result = getWeekResult(26, 2);
      expect(result.demoted).toBe(true);
      expect(result.newTier).toBe(1);
    });

    it('does not demote when rank is exactly at demotion boundary', () => {
      // demoteCount=5 for Silver, rank > (30 - 5) = rank > 25
      const result = getWeekResult(25, 2);
      expect(result.demoted).toBe(false);
    });

    it('demotes from Gold to Silver', () => {
      const result = getWeekResult(30, 3);
      expect(result.demoted).toBe(true);
      expect(result.newTier).toBe(2);
    });

    it('demotes from Masters to Platinum', () => {
      const result = getWeekResult(30, 5);
      expect(result.demoted).toBe(true);
      expect(result.newTier).toBe(4);
    });
  });

  describe('getWeekResult — staying in place', () => {
    it('stays in current tier when in the middle of rankings', () => {
      const result = getWeekResult(15, 2); // middle of Silver
      expect(result.promoted).toBe(false);
      expect(result.demoted).toBe(false);
      expect(result.newTier).toBe(2);
    });

    it('stays in Bronze at any rank (no demotion)', () => {
      const result = getWeekResult(30, 1);
      expect(result.newTier).toBe(1);
    });

    it('stays in Masters at rank 1 (no promotion)', () => {
      const result = getWeekResult(1, 5);
      expect(result.newTier).toBe(5);
    });
  });

  describe('seededRandom — determinism', () => {
    it('produces same sequence with same seed', () => {
      const rng1 = seededRandom(42);
      const rng2 = seededRandom(42);

      const seq1 = Array.from({ length: 10 }, () => rng1());
      const seq2 = Array.from({ length: 10 }, () => rng2());

      expect(seq1).toEqual(seq2);
    });

    it('produces different sequences with different seeds', () => {
      const rng1 = seededRandom(42);
      const rng2 = seededRandom(99);

      const seq1 = Array.from({ length: 10 }, () => rng1());
      const seq2 = Array.from({ length: 10 }, () => rng2());

      expect(seq1).not.toEqual(seq2);
    });

    it('produces values in [0, 1) range', () => {
      const rng = seededRandom(12345);
      for (let i = 0; i < 1000; i++) {
        const val = rng();
        expect(val).toBeGreaterThanOrEqual(0);
        expect(val).toBeLessThan(1);
      }
    });
  });

  describe('hashSeed — determinism', () => {
    it('produces same hash for same string', () => {
      expect(hashSeed('test-string')).toBe(hashSeed('test-string'));
    });

    it('produces different hashes for different strings', () => {
      expect(hashSeed('week-1')).not.toBe(hashSeed('week-2'));
    });

    it('returns a number', () => {
      expect(typeof hashSeed('anything')).toBe('number');
    });
  });

  describe('generateCompetitors', () => {
    it('generates exactly 29 competitors (30 minus user)', () => {
      const competitors = generateCompetitors('2026-03-16', 1);
      expect(competitors).toHaveLength(29);
    });

    it('all competitors start with 0 weeklyXp', () => {
      const competitors = generateCompetitors('2026-03-16', 1);
      expect(competitors.every(c => c.weeklyXp === 0)).toBe(true);
    });

    it('all competitors have positive dailyXpRate', () => {
      const competitors = generateCompetitors('2026-03-16', 1);
      expect(competitors.every(c => c.dailyXpRate > 0)).toBe(true);
    });

    it('all competitors have positive variance', () => {
      const competitors = generateCompetitors('2026-03-16', 1);
      expect(competitors.every(c => c.variance > 0)).toBe(true);
    });

    it('generates same competitors for same week+tier (deterministic)', () => {
      const comp1 = generateCompetitors('2026-03-16', 1);
      const comp2 = generateCompetitors('2026-03-16', 1);
      expect(comp1.map(c => c.id)).toEqual(comp2.map(c => c.id));
    });

    it('generates different competitors for different weeks', () => {
      const comp1 = generateCompetitors('2026-03-16', 1);
      const comp2 = generateCompetitors('2026-03-09', 1);
      expect(comp1.map(c => c.id)).not.toEqual(comp2.map(c => c.id));
    });

    it('generates different competitors for different tiers', () => {
      const comp1 = generateCompetitors('2026-03-16', 1);
      const comp2 = generateCompetitors('2026-03-16', 3);
      // IDs include tier, so they should differ
      expect(comp1[0].id).not.toBe(comp2[0].id);
    });

    it('all competitors have names and flags', () => {
      const competitors = generateCompetitors('2026-03-16', 1);
      for (const c of competitors) {
        expect(c.name).toBeTruthy();
        expect(c.countryFlag).toBeTruthy();
        expect(c.avatarInitial).toBeTruthy();
      }
    });
  });

  describe('simulateCompetitorXp', () => {
    it('returns same-length array', () => {
      const competitors = generateCompetitors('2026-03-16', 1);
      const simulated = simulateCompetitorXp(competitors, '2026-03-16');
      expect(simulated).toHaveLength(competitors.length);
    });

    it('produces non-negative XP values', () => {
      const competitors = generateCompetitors('2026-01-01', 1);
      const simulated = simulateCompetitorXp(competitors, '2026-01-01');
      for (const c of simulated) {
        expect(c.weeklyXp).toBeGreaterThanOrEqual(0);
      }
    });

    it('is deterministic for same inputs', () => {
      const competitors = generateCompetitors('2026-01-01', 1);
      const sim1 = simulateCompetitorXp(competitors, '2026-01-01');
      const sim2 = simulateCompetitorXp(competitors, '2026-01-01');
      expect(sim1.map(c => c.weeklyXp)).toEqual(sim2.map(c => c.weeklyXp));
    });

    it('handles future weekStartDate (no days elapsed = 0 XP)', () => {
      const futureDate = '2099-01-01';
      const competitors = generateCompetitors(futureDate, 1);
      const simulated = simulateCompetitorXp(competitors, futureDate);
      // If week hasn't started yet, no days have elapsed
      expect(simulated.every(c => c.weeklyXp === 0)).toBe(true);
    });
  });

  describe('Platinum tier promotion rules', () => {
    it('Platinum promoteCount is 3 (harder to promote)', () => {
      const config = getTierConfig(4);
      expect(config.promoteCount).toBe(3);
    });

    it('only top 3 in Platinum promote to Masters', () => {
      const result3 = getWeekResult(3, 4);
      const result4 = getWeekResult(4, 4);
      expect(result3.promoted).toBe(true);
      expect(result4.promoted).toBe(false);
    });
  });
});
