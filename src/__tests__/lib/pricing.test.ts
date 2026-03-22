import { describe, it, expect } from 'vitest';
import {
  getFeatureAccess,
  getTierLimits,
  formatPrice,
  getYearlySavingsPercent,
  FEATURES,
  LIMITS,
  TIERS,
} from '@/lib/pricing';

// ============================================================
// getFeatureAccess()
// ============================================================

describe('getFeatureAccess()', () => {
  // --- Free tier ---

  it('denies free user access to pro features', () => {
    const result = getFeatureAccess('free', FEATURES.FULL_ANALYTICS);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('tier_required');
    expect(result.requiredTier).toBe('pro');
  });

  it('denies free user access to streak freeze', () => {
    const result = getFeatureAccess('free', FEATURES.STREAK_FREEZE);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('tier_required');
  });

  it('allows free user under daily question limit', () => {
    const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE, {
      dailyQuestionsUsed: 3,
    });
    expect(result.allowed).toBe(true);
    expect(result.reason).toBe('included');
    expect(result.currentUsage).toBe(3);
    expect(result.limit).toBe(5);
  });

  it('denies free user at daily question limit', () => {
    const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE, {
      dailyQuestionsUsed: 5,
    });
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('limit_reached');
    expect(result.currentUsage).toBe(5);
    expect(result.limit).toBe(5);
  });

  it('denies free user over daily question limit', () => {
    const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE, {
      dailyQuestionsUsed: 10,
    });
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('limit_reached');
  });

  it('allows free user unlimited practice with 0 used', () => {
    const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE, {
      dailyQuestionsUsed: 0,
    });
    expect(result.allowed).toBe(true);
  });

  // --- Pro tier ---

  it('allows pro user access to all features', () => {
    for (const feature of TIERS.pro.features) {
      const result = getFeatureAccess('pro', feature);
      expect(result.allowed).toBe(true);
      expect(result.reason).toBe('included');
    }
  });

  it('pro user has unlimited practice (feature included)', () => {
    const result = getFeatureAccess('pro', FEATURES.UNLIMITED_PRACTICE);
    expect(result.allowed).toBe(true);
    expect(result.reason).toBe('included');
  });

  // --- Trial ---

  it('trial gives free user pro-level access', () => {
    const result = getFeatureAccess('free', FEATURES.FULL_ANALYTICS, {
      isTrialing: true,
    });
    expect(result.allowed).toBe(true);
    expect(result.reason).toBe('trial_active');
  });

  it('trial gives free user unlimited practice', () => {
    const result = getFeatureAccess('free', FEATURES.UNLIMITED_PRACTICE, {
      isTrialing: true,
      dailyQuestionsUsed: 100,
    });
    expect(result.allowed).toBe(true);
    expect(result.reason).toBe('trial_active');
  });

  it('trial does not affect pro user', () => {
    const result = getFeatureAccess('pro', FEATURES.FULL_ANALYTICS, {
      isTrialing: true,
    });
    expect(result.allowed).toBe(true);
    expect(result.reason).toBe('included'); // not trial_active
  });

  it('trial=false on free user does not grant access', () => {
    const result = getFeatureAccess('free', FEATURES.FULL_ANALYTICS, {
      isTrialing: false,
    });
    expect(result.allowed).toBe(false);
  });
});

// ============================================================
// getTierLimits()
// ============================================================

describe('getTierLimits()', () => {
  it('returns free tier limits', () => {
    const limits = getTierLimits('free');
    expect(limits.dailyQuestions).toBe(5);
    expect(limits.practiceModesUnlocked).toBe(false);
    expect(limits.fullAnalytics).toBe(false);
    expect(limits.streakFreezePerWeek).toBe(0);
    expect(limits.interviewReadinessScore).toBe(false);
    expect(limits.unlockedUnits).toEqual([0]);
  });

  it('returns pro tier limits', () => {
    const limits = getTierLimits('pro');
    expect(limits.dailyQuestions).toBe(-1); // unlimited
    expect(limits.practiceModesUnlocked).toBe(true);
    expect(limits.fullAnalytics).toBe(true);
    expect(limits.streakFreezePerWeek).toBe(1);
    expect(limits.interviewReadinessScore).toBe(true);
    expect(limits.unlockedUnits).toHaveLength(10);
  });

  it('trial elevates free to pro limits', () => {
    const limits = getTierLimits('free', { isTrialing: true });
    expect(limits.dailyQuestions).toBe(-1);
    expect(limits.practiceModesUnlocked).toBe(true);
    expect(limits.fullAnalytics).toBe(true);
  });

  it('unlockedUnits is a copy (not the original array)', () => {
    const limits1 = getTierLimits('pro');
    const limits2 = getTierLimits('pro');
    expect(limits1.unlockedUnits).not.toBe(limits2.unlockedUnits);
    expect(limits1.unlockedUnits).toEqual(limits2.unlockedUnits);
  });
});

// ============================================================
// formatPrice()
// ============================================================

describe('formatPrice()', () => {
  it('returns "Free" for 0 cents', () => {
    expect(formatPrice(0)).toBe('Free');
  });

  it('formats whole dollar amount without decimals', () => {
    expect(formatPrice(900)).toBe('$9');
  });

  it('formats cents with two decimal places', () => {
    expect(formatPrice(7900)).toBe('$79');
  });

  it('formats odd cents properly', () => {
    expect(formatPrice(999)).toBe('$9.99');
  });

  it('formats single digit cents', () => {
    expect(formatPrice(101)).toBe('$1.01');
  });
});

// ============================================================
// getYearlySavingsPercent()
// ============================================================

describe('getYearlySavingsPercent()', () => {
  it('returns 0 for free tier', () => {
    expect(getYearlySavingsPercent('free')).toBe(0);
  });

  it('returns correct savings for pro tier', () => {
    const monthlyCostPerYear = TIERS.pro.priceMonthly * 12; // 10800
    const expected = Math.round(
      ((monthlyCostPerYear - TIERS.pro.priceYearly) / monthlyCostPerYear) * 100
    );
    expect(getYearlySavingsPercent('pro')).toBe(expected);
  });

  it('pro savings is positive', () => {
    expect(getYearlySavingsPercent('pro')).toBeGreaterThan(0);
  });
});
