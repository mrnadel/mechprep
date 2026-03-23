import { describe, it, expect } from 'vitest';
import { shopItems } from '@/data/gem-shop';

describe('gem shop data integrity', () => {
  it('has at least 5 shop items', () => {
    expect(shopItems.length).toBeGreaterThanOrEqual(5);
  });

  it('all item IDs are unique', () => {
    const ids = shopItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all items have required fields', () => {
    for (const item of shopItems) {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.description).toBeTruthy();
      expect(item.icon).toBeTruthy();
      expect(typeof item.cost).toBe('number');
      expect(item.cost).toBeGreaterThan(0);
      expect(item.category).toBeTruthy();
      expect(item.type).toBeTruthy();
    }
  });

  it('all categories are valid', () => {
    const validCategories = ['power-up', 'cosmetic', 'frame'];
    for (const item of shopItems) {
      expect(validCategories).toContain(item.category);
    }
  });

  it('all types are valid', () => {
    const validTypes = ['streak_freeze', 'streak_repair', 'double_xp', 'title', 'frame'];
    for (const item of shopItems) {
      expect(validTypes).toContain(item.type);
    }
  });

  it('has streak freeze item with id "shop-streak-freeze"', () => {
    const freeze = shopItems.find((i) => i.id === 'shop-streak-freeze');
    expect(freeze).toBeDefined();
    expect(freeze!.type).toBe('streak_freeze');
    expect(freeze!.cost).toBe(30);
  });

  it('has double XP item with duration metadata', () => {
    const doubleXp = shopItems.find((i) => i.id === 'shop-double-xp-30');
    expect(doubleXp).toBeDefined();
    expect(doubleXp!.type).toBe('double_xp');
    expect(doubleXp!.metadata?.durationMs).toBe(30 * 60 * 1000);
  });

  it('title items have titleText metadata', () => {
    const titles = shopItems.filter((i) => i.type === 'title');
    expect(titles.length).toBeGreaterThan(0);
    for (const title of titles) {
      expect(title.metadata?.titleText).toBeTruthy();
    }
  });

  it('all item IDs follow the "shop-" prefix convention', () => {
    for (const item of shopItems) {
      expect(item.id).toMatch(/^shop-/);
    }
  });

  it('costs are within reasonable bounds (10-200 gems)', () => {
    for (const item of shopItems) {
      expect(item.cost).toBeGreaterThanOrEqual(10);
      expect(item.cost).toBeLessThanOrEqual(200);
    }
  });
});
