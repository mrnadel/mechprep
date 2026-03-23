import { describe, it, expect } from 'vitest';
import {
  getFeatureAccess,
  getTierLimits,
  formatPrice,
  getYearlySavingsPercent,
  FEATURES,
  LIMITS,
  TIERS,
  PRO_SESSION_TYPES,
  PADDLE_PRICES,
  PRO_TRIAL_DAYS,
} from '@/lib/pricing';

// ==============================================================
// SUBSCRIPTION GATING — COMPREHENSIVE TESTS
// ==============================================================

describe('Subscription Gating', () => {
  describe('Feature definitions', () => {
    it('Free tier has no features', () => {
      expect(TIERS.free.features).toEqual([]);
    });

    it('Pro tier has all 7 features', () => {
      expect(TIERS.pro.features).toHaveLength(7);
      expect(TIERS.pro.features).toContain(FEATURES.UNIT_ACCESS_ALL);
      expect(TIERS.pro.features).toContain(FEATURES.UNLIMITED_PRACTICE);
      expect(TIERS.pro.features).toContain(FEATURES.ALL_PRACTICE_MODES);
      expect(TIERS.pro.features).toContain(FEATURES.FULL_ANALYTICS);
      expect(TIERS.pro.features).toContain(FEATURES.STREAK_FREEZE);
      expect(TIERS.pro.features).toContain(FEATURES.INTERVIEW_READINESS);
      expect(TIERS.pro.features).toContain(FEATURES.DETAILED_EXPLANATIONS);
    });

    it('Pro trial is 7 days', () => {
      expect(PRO_TRIAL_DAYS).toBe(7);
    });
  });

  describe('Free tier limits', () => {
    it('free tier has 5 daily questions', () => {
      expect(LIMITS.free.dailyQuestions).toBe(5);
    });

    it('free tier has 0 streak freezes per week', () => {
      expect(LIMITS.free.streakFreezesPerWeek).toBe(0);
    });

    it('free tier only unlocks unit 0', () => {
      expect(LIMITS.free.unlockedUnits).toEqual([0]);
    });
  });

  describe('Pro tier limits', () => {
    it('pro tier has unlimited daily questions', () => {
      expect(LIMITS.pro.dailyQuestions).toBe(-1);
    });

    it('pro tier has 1 streak freeze per week', () => {
      expect(LIMITS.pro.streakFreezesPerWeek).toBe(1);
    });

    it('pro tier unlocks all 10 units', () => {
      expect(LIMITS.pro.unlockedUnits).toHaveLength(10);
    });
  });

  describe('Pro-only session types', () => {
    it('adaptive is a Pro-only session type', () => {
      expect(PRO_SESSION_TYPES.has('adaptive')).toBe(true);
    });

    it('interview-sim is a Pro-only session type', () => {
      expect(PRO_SESSION_TYPES.has('interview-sim')).toBe(true);
    });

    it('weak-areas is a Pro-only session type', () => {
      expect(PRO_SESSION_TYPES.has('weak-areas')).toBe(true);
    });

    it('daily-challenge is NOT a Pro-only session type', () => {
      expect(PRO_SESSION_TYPES.has('daily-challenge')).toBe(false);
    });

    it('topic-deep-dive is NOT a Pro-only session type', () => {
      expect(PRO_SESSION_TYPES.has('topic-deep-dive')).toBe(false);
    });
  });

  describe('getFeatureAccess — free tier', () => {
    it('denies Pro features for free tier', () => {
      const result = getFeatureAccess('free', FEATURES.FULL_ANALYTICS);
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('tier_required');
      expect(result.requiredTier).toBe('pro');
    });

    it('denies all practice modes for free tier', () => {
      const result = getFeatureAccess('free', FEATURES.ALL_PRACTICE_MODES);
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('tier_required');
    });

    it('denies streak freeze for free tier', () => {
      const result = getFeatureAccess('free', FEATURES.STREAK_FREEZE);
      expect(result.allowed).toBe(false);
    });

    it('denies interview readiness for free tier', () => {
      const result = getFeatureAccess('free', FEATURES.INTERVIEW_READINESS);
      expect(result.allowed).toBe(false);
    });
  });

  describe('getFeatureAccess — free tier daily limit', () => {
    it('allows unlimited practice when under free daily limit', () => {
      const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE, {
        dailyQuestionsUsed: 3,
      });
      expect(result.allowed).toBe(true);
      expect(result.currentUsage).toBe(3);
      expect(result.limit).toBe(5);
    });

    it('allows at exactly 4 questions used (under limit of 5)', () => {
      const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE, {
        dailyQuestionsUsed: 4,
      });
      expect(result.allowed).toBe(true);
    });

    it('denies at exactly 5 questions used (at limit)', () => {
      const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE, {
        dailyQuestionsUsed: 5,
      });
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('limit_reached');
    });

    it('denies when over the daily limit', () => {
      const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE, {
        dailyQuestionsUsed: 10,
      });
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe('limit_reached');
    });

    it('allows when dailyQuestionsUsed is 0', () => {
      const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE, {
        dailyQuestionsUsed: 0,
      });
      expect(result.allowed).toBe(true);
    });

    it('defaults dailyQuestionsUsed to 0 if not provided', () => {
      const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE);
      expect(result.allowed).toBe(true);
    });
  });

  describe('getFeatureAccess — pro tier', () => {
    it('allows all features for pro tier', () => {
      for (const feature of Object.values(FEATURES)) {
        const result = getFeatureAccess('pro', feature);
        expect(result.allowed).toBe(true);
        expect(result.reason).toBe('included');
      }
    });

    it('has unlimited practice for pro tier', () => {
      const result = getFeatureAccess('pro', FEATURES.UNLIMITED_PRACTICE, {
        dailyQuestionsUsed: 100,
      });
      expect(result.allowed).toBe(true);
    });
  });

  describe('getFeatureAccess — trial mode', () => {
    it('free tier with trial gets pro access', () => {
      const result = getFeatureAccess('free', FEATURES.FULL_ANALYTICS, {
        isTrialing: true,
      });
      expect(result.allowed).toBe(true);
      expect(result.reason).toBe('trial_active');
    });

    it('free tier with trial gets unlimited practice', () => {
      const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE, {
        isTrialing: true,
        dailyQuestionsUsed: 100,
      });
      expect(result.allowed).toBe(true);
    });

    it('free tier with trial gets all practice modes', () => {
      const result = getFeatureAccess('free', FEATURES.ALL_PRACTICE_MODES, {
        isTrialing: true,
      });
      expect(result.allowed).toBe(true);
    });

    it('pro tier with trial flag still works (no double-upgrade)', () => {
      const result = getFeatureAccess('pro', FEATURES.FULL_ANALYTICS, {
        isTrialing: true,
      });
      expect(result.allowed).toBe(true);
    });
  });

  describe('getTierLimits', () => {
    it('returns free tier limits correctly', () => {
      const limits = getTierLimits('free');
      expect(limits.dailyQuestions).toBe(5);
      expect(limits.practiceModesUnlocked).toBe(false);
      expect(limits.fullAnalytics).toBe(false);
      expect(limits.streakFreezePerWeek).toBe(0);
      expect(limits.interviewReadinessScore).toBe(false);
      expect(limits.unlockedUnits).toEqual([0]);
    });

    it('returns pro tier limits correctly', () => {
      const limits = getTierLimits('pro');
      expect(limits.dailyQuestions).toBe(-1);
      expect(limits.practiceModesUnlocked).toBe(true);
      expect(limits.fullAnalytics).toBe(true);
      expect(limits.streakFreezePerWeek).toBe(1);
      expect(limits.interviewReadinessScore).toBe(true);
      expect(limits.unlockedUnits).toHaveLength(10);
    });

    it('returns pro limits for free tier with trial', () => {
      const limits = getTierLimits('free', { isTrialing: true });
      expect(limits.dailyQuestions).toBe(-1);
      expect(limits.practiceModesUnlocked).toBe(true);
      expect(limits.fullAnalytics).toBe(true);
    });

    it('returns a copy of unlockedUnits (not a reference)', () => {
      const limits1 = getTierLimits('pro');
      const limits2 = getTierLimits('pro');
      expect(limits1.unlockedUnits).toEqual(limits2.unlockedUnits);
      expect(limits1.unlockedUnits).not.toBe(limits2.unlockedUnits);
    });
  });

  describe('formatPrice', () => {
    it('formats 0 as "Free"', () => {
      expect(formatPrice(0)).toBe('Free');
    });

    it('formats 900 cents as "$9"', () => {
      expect(formatPrice(900)).toBe('$9');
    });

    it('formats 7900 cents as "$79"', () => {
      expect(formatPrice(7900)).toBe('$79');
    });

    it('formats 999 cents as "$9.99"', () => {
      expect(formatPrice(999)).toBe('$9.99');
    });

    it('formats 150 cents as "$1.50"', () => {
      expect(formatPrice(150)).toBe('$1.50');
    });
  });

  describe('getYearlySavingsPercent', () => {
    it('returns 0 for free tier', () => {
      expect(getYearlySavingsPercent('free')).toBe(0);
    });

    it('returns savings percentage for pro tier', () => {
      // Monthly: $9 * 12 = $108/year
      // Yearly: $79/year
      // Savings: (108 - 79) / 108 * 100 = 26.85% -> rounded to 27
      const savings = getYearlySavingsPercent('pro');
      expect(savings).toBeGreaterThan(0);
      expect(savings).toBeLessThan(100);
    });

    it('pro yearly savings is approximately 27%', () => {
      const savings = getYearlySavingsPercent('pro');
      expect(savings).toBe(27);
    });
  });

  describe('Pricing consistency', () => {
    it('Pro monthly price is $9 (900 cents)', () => {
      expect(TIERS.pro.priceMonthly).toBe(900);
    });

    it('Pro yearly price is $79 (7900 cents)', () => {
      expect(TIERS.pro.priceYearly).toBe(7900);
    });

    it('Free tier prices are 0', () => {
      expect(TIERS.free.priceMonthly).toBe(0);
      expect(TIERS.free.priceYearly).toBe(0);
    });

    it('Pro is highlighted, Free is not', () => {
      expect(TIERS.pro.highlighted).toBe(true);
      expect(TIERS.free.highlighted).toBe(false);
    });
  });
});
