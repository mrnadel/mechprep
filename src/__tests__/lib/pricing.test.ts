import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  getYearlySavingsPercent,
  FEATURES,
  LIMITS,
  TIERS,
} from '@/lib/pricing';

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
