import { describe, it, expect } from 'vitest';
import { getFakeAvatarUrl, getInitialsColor } from '@/lib/fake-avatar';
import type { FakeUser } from '@/data/engagement-types';

// --------------- Helpers ---------------

function makeFakeUser(overrides: Partial<FakeUser> = {}): FakeUser {
  return {
    id: 'fake-000',
    name: 'Test User',
    nameQuality: 3,
    avatarType: 'dicebear',
    avatarStyle: 'photo-a',
    avatarSeed: 'fake-000-avatar',
    countryFlag: '🇺🇸',
    joinDate: '2025-01-01',
    totalXp: 1000,
    currentStreak: 5,
    longestStreak: 10,
    currentTier: 2,
    activityLevel: 0.7,
    consistency: 0.6,
    achievementsUnlocked: [],
    topicMastery: [],
    ...overrides,
  };
}

// ============================================================
// getFakeAvatarUrl()
// ============================================================

describe('getFakeAvatarUrl()', () => {
  it('returns a picsum.photos URL for users with avatarType "dicebear"', () => {
    const user = makeFakeUser({ avatarType: 'dicebear' });
    const url = getFakeAvatarUrl(user);
    expect(url).not.toBeNull();
    expect(url).toContain('picsum.photos');
    expect(url).toContain('/128/128');
  });

  it('returns null for users with avatarType "none"', () => {
    const user = makeFakeUser({ avatarType: 'none', avatarStyle: undefined });
    const url = getFakeAvatarUrl(user);
    expect(url).toBeNull();
  });

  it('returns a deterministic URL for the same user', () => {
    const user = makeFakeUser({ avatarSeed: 'test-seed-123' });
    const url1 = getFakeAvatarUrl(user);
    const url2 = getFakeAvatarUrl(user);
    expect(url1).toBe(url2);
  });

  it('returns different URLs for different avatar seeds', () => {
    const user1 = makeFakeUser({ avatarSeed: 'seed-a' });
    const user2 = makeFakeUser({ avatarSeed: 'seed-b' });
    const url1 = getFakeAvatarUrl(user1);
    const url2 = getFakeAvatarUrl(user2);
    expect(url1).not.toBe(url2);
  });

  it('returns a URL with a valid photo ID (0-999)', () => {
    const user = makeFakeUser({ avatarSeed: 'test-photo-id' });
    const url = getFakeAvatarUrl(user)!;
    const match = url.match(/\/id\/(\d+)\//);
    expect(match).not.toBeNull();
    const photoId = parseInt(match![1], 10);
    expect(photoId).toBeGreaterThanOrEqual(0);
    expect(photoId).toBeLessThan(1000);
  });
});

// ============================================================
// getInitialsColor()
// ============================================================

describe('getInitialsColor()', () => {
  it('returns a hex color string', () => {
    const color = getInitialsColor('user-1');
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it('is deterministic for the same userId', () => {
    const color1 = getInitialsColor('same-user');
    const color2 = getInitialsColor('same-user');
    expect(color1).toBe(color2);
  });

  it('returns different colors for different userIds (usually)', () => {
    const colors = new Set<string>();
    for (let i = 0; i < 20; i++) {
      colors.add(getInitialsColor(`user-${i}`));
    }
    // With 12 possible colors and 20 samples, we should see at least a few unique ones
    expect(colors.size).toBeGreaterThan(1);
  });

  it('returns a color from the predefined palette', () => {
    const PALETTE = [
      '#64748b', '#71717a', '#78716c', '#f59e0b', '#10b981', '#0ea5e9',
      '#8b5cf6', '#f43f5e', '#06b6d4', '#ec4899', '#84cc16', '#14b8a6',
    ];
    for (let i = 0; i < 50; i++) {
      const color = getInitialsColor(`user-${i}`);
      expect(PALETTE).toContain(color);
    }
  });
});
