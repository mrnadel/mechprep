import { describe, it, expect } from 'vitest';
import { achievements } from '@/data/achievements';

describe('achievements data integrity', () => {
  it('has at least 25 achievements', () => {
    expect(achievements.length).toBeGreaterThanOrEqual(25);
  });

  it('all achievement IDs are unique', () => {
    const ids = achievements.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all achievements have an "ach-" prefix', () => {
    for (const a of achievements) {
      expect(a.id).toMatch(/^ach-/);
    }
  });

  it('all achievements have required fields', () => {
    for (const a of achievements) {
      expect(a.id).toBeTruthy();
      expect(a.name).toBeTruthy();
      expect(a.description).toBeTruthy();
      expect(a.icon).toBeTruthy();
      expect(a.category).toBeTruthy();
      expect(a.condition).toBeTruthy();
      expect(typeof a.xpReward).toBe('number');
      expect(a.xpReward).toBeGreaterThan(0);
    }
  });

  it('all categories are valid', () => {
    const validCategories = ['knowledge', 'consistency', 'challenge', 'exploration', 'mastery', 'hidden'];
    for (const a of achievements) {
      expect(validCategories).toContain(a.category);
    }
  });

  it('has achievements in each category', () => {
    const categories = new Set(achievements.map((a) => a.category));
    expect(categories.has('knowledge')).toBe(true);
    expect(categories.has('consistency')).toBe(true);
    expect(categories.has('challenge')).toBe(true);
    expect(categories.has('exploration')).toBe(true);
    expect(categories.has('mastery')).toBe(true);
    expect(categories.has('hidden')).toBe(true);
  });

  it('xpReward is within reasonable bounds (25-1000)', () => {
    for (const a of achievements) {
      expect(a.xpReward).toBeGreaterThanOrEqual(25);
      expect(a.xpReward).toBeLessThanOrEqual(1000);
    }
  });

  // Verify specific key achievements exist (referenced by store logic)
  it('contains "ach-first-correct" (first question correct)', () => {
    expect(achievements.find((a) => a.id === 'ach-first-correct')).toBeDefined();
  });

  it('contains "ach-first-topic" (first exploration step)', () => {
    expect(achievements.find((a) => a.id === 'ach-first-topic')).toBeDefined();
  });

  it('contains streak achievements (ach-streak-3, 7, 14, 30)', () => {
    expect(achievements.find((a) => a.id === 'ach-streak-3')).toBeDefined();
    expect(achievements.find((a) => a.id === 'ach-streak-7')).toBeDefined();
    expect(achievements.find((a) => a.id === 'ach-streak-14')).toBeDefined();
    expect(achievements.find((a) => a.id === 'ach-streak-30')).toBeDefined();
  });

  it('contains knowledge milestones (10, 50, 100)', () => {
    expect(achievements.find((a) => a.id === 'ach-ten-correct')).toBeDefined();
    expect(achievements.find((a) => a.id === 'ach-fifty-correct')).toBeDefined();
    expect(achievements.find((a) => a.id === 'ach-hundred-correct')).toBeDefined();
  });

  it('contains the interview readiness achievement', () => {
    const ach = achievements.find((a) => a.id === 'ach-interview-ready');
    expect(ach).toBeDefined();
    expect(ach!.category).toBe('mastery');
    expect(ach!.xpReward).toBe(1000); // highest reward
  });

  it('hidden achievements have the hidden category', () => {
    const hidden = achievements.filter((a) => a.category === 'hidden');
    expect(hidden.length).toBeGreaterThanOrEqual(3);
    expect(hidden.some((a) => a.id === 'ach-night-owl')).toBe(true);
    expect(hidden.some((a) => a.id === 'ach-early-bird')).toBe(true);
    expect(hidden.some((a) => a.id === 'ach-wrong-five')).toBe(true);
  });
});
