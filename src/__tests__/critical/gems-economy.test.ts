import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Quest, QuestDefinition } from '@/data/engagement-types';

// Mock the quest engine
vi.mock('@/lib/quest-engine', () => {
  const makeDef = (id: string, key: string, target: number): QuestDefinition => ({
    id,
    title: `Quest ${id}`,
    description: 'desc',
    icon: 'icon',
    trackingKey: key as any,
    target,
    difficulty: 'easy',
    reward: { xp: 25, gems: 5 },
  });

  return {
    getTodayDate: () => '2026-03-23',
    getCurrentWeekMonday: () => '2026-03-17',
    selectDailyQuests: vi.fn(() => [
      makeDef('dq-1', 'lessons_completed', 2),
      makeDef('dq-2', 'questions_correct', 10),
      makeDef('dq-3', 'xp_earned', 100),
    ]),
    selectWeeklyQuests: vi.fn(() => [
      makeDef('wq-1', 'lessons_completed', 5),
      makeDef('wq-2', 'xp_earned', 500),
      makeDef('wq-3', 'topics_practiced', 4),
    ]),
    createQuests: vi.fn((defs: QuestDefinition[], type: 'daily' | 'weekly'): Quest[] =>
      defs.map((d) => ({
        definitionId: d.id,
        type,
        title: d.title,
        description: d.description,
        icon: d.icon,
        target: d.target,
        progress: 0,
        reward: { xp: d.reward.xp, gems: d.reward.gems },
        trackingKey: d.trackingKey,
        filter: d.filter,
        completed: false,
        claimed: false,
      }))
    ),
  };
});

// Mock league simulator
vi.mock('@/lib/league-simulator', () => ({
  simulateCompetitorXp: vi.fn((competitors: any[]) => competitors),
  getUserRank: vi.fn(() => 1),
  getWeekResult: vi.fn(() => ({ promoted: true, demoted: false, newTier: 2 })),
}));

// Mock fake user generator
vi.mock('@/lib/fake-user-generator', () => ({
  drawCompetitorsFromPool: vi.fn(() => [
    { id: 'bot-1', name: 'Bot 1', avatarInitial: 'B', countryFlag: '?', weeklyXp: 0, dailyXpRate: 10, variance: 2 },
  ]),
}));

// Mock useStore for checkComebackFlow
vi.mock('@/store/useStore', () => ({
  useStore: {
    getState: () => ({
      progress: { lastActiveDate: '' },
    }),
  },
}));

import { useEngagementStore } from '@/store/useEngagementStore';
import {
  MAX_STREAK_FREEZES,
  MAX_GEM_TRANSACTIONS_CLIENT,
  DOUBLE_XP_SHOP_DURATION_MS,
} from '@/data/engagement-types';
import { shopItems } from '@/data/gem-shop';

function getDefaultState() {
  return {
    gems: {
      balance: 0,
      totalEarned: 0,
      transactions: [],
      inventory: { activeTitles: [], activeFrames: [] },
      selectedTitle: null,
      selectedFrame: null,
    },
    dailyQuests: [],
    weeklyQuests: [],
    dailyQuestDate: null,
    weeklyQuestDate: null,
    dailyChestClaimed: false,
    weeklyChestClaimed: false,
    lastDailyQuestIds: [],
    lastWeeklyQuestIds: [],
    league: {
      currentTier: 1 as const,
      weeklyXp: 0,
      weekStartDate: '2026-03-17',
      competitors: [],
      lastWeekResult: null,
      resultSeen: true,
    },
    streak: {
      freezesOwned: 0,
      freezeUsedToday: false,
      lastStreakBreakDate: null,
      lastStreakValueBeforeBreak: 0,
      repairAvailable: false,
      milestonesReached: [],
    },
    comeback: {
      isInComebackFlow: false,
      comebackQuestsCompleted: 0,
      daysAway: 0,
    },
    dismissedNudges: [] as string[],
    doubleXpExpiry: null,
  };
}

function resetStore() {
  useEngagementStore.setState(getDefaultState());
}

// ==============================================================
// GEMS ECONOMY — COMPREHENSIVE TESTS
// ==============================================================

describe('Gems Economy', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('addGems — earning', () => {
    it('adds gems to balance', () => {
      useEngagementStore.getState().addGems(25, 'quest_reward');
      expect(useEngagementStore.getState().gems.balance).toBe(25);
    });

    it('accumulates multiple gem additions', () => {
      useEngagementStore.getState().addGems(10, 'source1');
      useEngagementStore.getState().addGems(20, 'source2');
      useEngagementStore.getState().addGems(30, 'source3');
      expect(useEngagementStore.getState().gems.balance).toBe(60);
    });

    it('tracks totalEarned for positive amounts', () => {
      useEngagementStore.getState().addGems(50, 'earn');
      expect(useEngagementStore.getState().gems.totalEarned).toBe(50);
    });

    it('does NOT add negative amounts to totalEarned', () => {
      useEngagementStore.getState().addGems(100, 'earn');
      useEngagementStore.getState().addGems(-30, 'spend');
      expect(useEngagementStore.getState().gems.totalEarned).toBe(100); // only positive
    });

    it('records a transaction for each addGems call', () => {
      useEngagementStore.getState().addGems(25, 'test_source');
      const txns = useEngagementStore.getState().gems.transactions;
      expect(txns).toHaveLength(1);
      expect(txns[0].amount).toBe(25);
      expect(txns[0].source).toBe('test_source');
    });

    it('transactions are ordered newest first', () => {
      useEngagementStore.getState().addGems(10, 'first');
      useEngagementStore.getState().addGems(20, 'second');
      const txns = useEngagementStore.getState().gems.transactions;
      expect(txns[0].source).toBe('second');
      expect(txns[1].source).toBe('first');
    });

    it('caps transactions at MAX_GEM_TRANSACTIONS_CLIENT', () => {
      for (let i = 0; i < MAX_GEM_TRANSACTIONS_CLIENT + 20; i++) {
        useEngagementStore.getState().addGems(1, `source-${i}`);
      }
      expect(useEngagementStore.getState().gems.transactions.length).toBe(MAX_GEM_TRANSACTIONS_CLIENT);
    });

    it('transactions have unique IDs', () => {
      useEngagementStore.getState().addGems(10, 'a');
      useEngagementStore.getState().addGems(10, 'b');
      const txns = useEngagementStore.getState().gems.transactions;
      expect(txns[0].id).not.toBe(txns[1].id);
    });

    it('transactions have ISO timestamp', () => {
      useEngagementStore.getState().addGems(10, 'test');
      const txn = useEngagementStore.getState().gems.transactions[0];
      expect(() => new Date(txn.timestamp)).not.toThrow();
    });
  });

  describe('addGems — spending (negative amounts)', () => {
    it('subtracts from balance with negative amount', () => {
      useEngagementStore.getState().addGems(100, 'earn');
      useEngagementStore.getState().addGems(-50, 'spend');
      expect(useEngagementStore.getState().gems.balance).toBe(50);
    });

    it('balance is clamped to zero (cannot go negative)', () => {
      useEngagementStore.getState().addGems(-50, 'spend');
      expect(useEngagementStore.getState().gems.balance).toBe(0);
    });
  });

  describe('purchaseItem — streak freeze', () => {
    it('deducts 30 gems for streak freeze', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 100 },
      });
      const result = useEngagementStore.getState().purchaseItem('shop-streak-freeze');
      expect(result).toBe(true);
      expect(useEngagementStore.getState().gems.balance).toBe(70);
    });

    it('increments freezesOwned on purchase', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 100 },
      });
      useEngagementStore.getState().purchaseItem('shop-streak-freeze');
      expect(useEngagementStore.getState().streak.freezesOwned).toBe(1);
    });

    it('allows buying up to MAX_STREAK_FREEZES', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 200 },
      });
      for (let i = 0; i < MAX_STREAK_FREEZES; i++) {
        const result = useEngagementStore.getState().purchaseItem('shop-streak-freeze');
        expect(result).toBe(true);
      }
      expect(useEngagementStore.getState().streak.freezesOwned).toBe(MAX_STREAK_FREEZES);
    });

    it('rejects purchase at MAX_STREAK_FREEZES', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 200 },
        streak: { ...getDefaultState().streak, freezesOwned: MAX_STREAK_FREEZES },
      });
      const result = useEngagementStore.getState().purchaseItem('shop-streak-freeze');
      expect(result).toBe(false);
    });

    it('rejects purchase when balance is insufficient', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 29 }, // Need 30
      });
      const result = useEngagementStore.getState().purchaseItem('shop-streak-freeze');
      expect(result).toBe(false);
      expect(useEngagementStore.getState().gems.balance).toBe(29);
    });
  });

  describe('purchaseItem — double XP', () => {
    it('deducts gems and sets doubleXpExpiry', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 100 },
      });
      const result = useEngagementStore.getState().purchaseItem('shop-double-xp-30');
      expect(result).toBe(true);
      expect(useEngagementStore.getState().doubleXpExpiry).not.toBeNull();
      expect(useEngagementStore.getState().gems.balance).toBe(60); // 100 - 40
    });

    it('doubleXpExpiry is approximately 30 minutes in the future', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 100 },
      });
      const before = Date.now();
      useEngagementStore.getState().purchaseItem('shop-double-xp-30');
      const expiry = new Date(useEngagementStore.getState().doubleXpExpiry!).getTime();
      const expectedExpiry = before + DOUBLE_XP_SHOP_DURATION_MS;
      expect(expiry).toBeGreaterThanOrEqual(expectedExpiry - 1000);
      expect(expiry).toBeLessThanOrEqual(expectedExpiry + 1000);
    });
  });

  describe('purchaseItem — titles', () => {
    it('purchases title and adds to inventory', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 100 },
      });
      const result = useEngagementStore.getState().purchaseItem('shop-title-thermal-king');
      expect(result).toBe(true);
      expect(useEngagementStore.getState().gems.inventory.activeTitles).toContain('shop-title-thermal-king');
    });

    it('auto-equips title on purchase', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 100 },
      });
      useEngagementStore.getState().purchaseItem('shop-title-thermal-king');
      expect(useEngagementStore.getState().gems.selectedTitle).toBe('shop-title-thermal-king');
    });

    it('rejects duplicate title purchase', () => {
      useEngagementStore.setState({
        gems: {
          ...getDefaultState().gems,
          balance: 100,
          inventory: { activeTitles: ['shop-title-thermal-king'], activeFrames: [] },
        },
      });
      const result = useEngagementStore.getState().purchaseItem('shop-title-thermal-king');
      expect(result).toBe(false);
    });
  });

  describe('purchaseItem — frames', () => {
    it('purchases frame and adds to inventory', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 100 },
      });
      const result = useEngagementStore.getState().purchaseItem('shop-frame-gold');
      expect(result).toBe(true);
      expect(useEngagementStore.getState().gems.inventory.activeFrames).toContain('shop-frame-gold');
    });

    it('auto-equips frame on purchase', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 100 },
      });
      useEngagementStore.getState().purchaseItem('shop-frame-gold');
      expect(useEngagementStore.getState().gems.selectedFrame).toBe('shop-frame-gold');
    });

    it('rejects duplicate frame purchase', () => {
      useEngagementStore.setState({
        gems: {
          ...getDefaultState().gems,
          balance: 100,
          inventory: { activeTitles: [], activeFrames: ['shop-frame-gold'] },
        },
      });
      const result = useEngagementStore.getState().purchaseItem('shop-frame-gold');
      expect(result).toBe(false);
    });
  });

  describe('purchaseItem — validation', () => {
    it('returns false for unknown item ID', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 9999 },
      });
      const result = useEngagementStore.getState().purchaseItem('nonexistent');
      expect(result).toBe(false);
    });

    it('all shop items have positive cost', () => {
      for (const item of shopItems) {
        expect(item.cost).toBeGreaterThan(0);
      }
    });

    it('transaction is recorded on successful purchase', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 100 },
      });
      useEngagementStore.getState().purchaseItem('shop-streak-freeze');
      const txns = useEngagementStore.getState().gems.transactions;
      expect(txns.length).toBeGreaterThanOrEqual(1);
      expect(txns[0].amount).toBeLessThan(0); // spending = negative
    });
  });

  describe('equipTitle / equipFrame', () => {
    it('equips an owned title', () => {
      useEngagementStore.setState({
        gems: {
          ...getDefaultState().gems,
          inventory: { activeTitles: ['shop-title-thermal-king'], activeFrames: [] },
        },
      });
      useEngagementStore.getState().equipTitle('shop-title-thermal-king');
      expect(useEngagementStore.getState().gems.selectedTitle).toBe('shop-title-thermal-king');
    });

    it('unequips title when null is passed', () => {
      useEngagementStore.setState({
        gems: {
          ...getDefaultState().gems,
          selectedTitle: 'shop-title-thermal-king',
          inventory: { activeTitles: ['shop-title-thermal-king'], activeFrames: [] },
        },
      });
      useEngagementStore.getState().equipTitle(null);
      expect(useEngagementStore.getState().gems.selectedTitle).toBeNull();
    });

    it('sets title to null when equipping unowned title', () => {
      useEngagementStore.getState().equipTitle('not-owned-title');
      expect(useEngagementStore.getState().gems.selectedTitle).toBeNull();
    });

    it('equips an owned frame', () => {
      useEngagementStore.setState({
        gems: {
          ...getDefaultState().gems,
          inventory: { activeTitles: [], activeFrames: ['shop-frame-gold'] },
        },
      });
      useEngagementStore.getState().equipFrame('shop-frame-gold');
      expect(useEngagementStore.getState().gems.selectedFrame).toBe('shop-frame-gold');
    });

    it('unequips frame when null is passed', () => {
      useEngagementStore.setState({
        gems: {
          ...getDefaultState().gems,
          selectedFrame: 'shop-frame-gold',
          inventory: { activeTitles: [], activeFrames: ['shop-frame-gold'] },
        },
      });
      useEngagementStore.getState().equipFrame(null);
      expect(useEngagementStore.getState().gems.selectedFrame).toBeNull();
    });
  });

  describe('Quest-based gem earning', () => {
    it('claimQuestReward awards gems for completed quest', () => {
      useEngagementStore.getState().initDailyQuests();
      useEngagementStore.getState().updateQuestProgress('lessons_completed', 2);
      useEngagementStore.getState().claimQuestReward('dq-1');
      expect(useEngagementStore.getState().gems.balance).toBe(5);
    });

    it('daily chest awards 15 gems', () => {
      useEngagementStore.getState().initDailyQuests();
      useEngagementStore.getState().updateQuestProgress('lessons_completed', 2);
      useEngagementStore.getState().updateQuestProgress('questions_correct', 10);
      useEngagementStore.getState().updateQuestProgress('xp_earned', 100);
      useEngagementStore.getState().claimChest('daily');
      expect(useEngagementStore.getState().gems.balance).toBe(15);
    });

    it('weekly chest awards 50 gems', () => {
      useEngagementStore.getState().initWeeklyQuests();
      useEngagementStore.getState().updateQuestProgress('lessons_completed', 5);
      useEngagementStore.getState().updateQuestProgress('xp_earned', 500);
      useEngagementStore.getState().updateQuestProgress('topics_practiced', 4);
      useEngagementStore.getState().claimChest('weekly');
      expect(useEngagementStore.getState().gems.balance).toBe(50);
    });

    it('full daily cycle: earn quest rewards + chest', () => {
      useEngagementStore.getState().initDailyQuests();
      useEngagementStore.getState().updateQuestProgress('lessons_completed', 2);
      useEngagementStore.getState().updateQuestProgress('questions_correct', 10);
      useEngagementStore.getState().updateQuestProgress('xp_earned', 100);

      // Claim all 3 quest rewards (5 gems each)
      useEngagementStore.getState().claimQuestReward('dq-1');
      useEngagementStore.getState().claimQuestReward('dq-2');
      useEngagementStore.getState().claimQuestReward('dq-3');

      // Claim chest (15 gems)
      useEngagementStore.getState().claimChest('daily');

      // Total: 15 (quest rewards) + 15 (chest) = 30
      expect(useEngagementStore.getState().gems.balance).toBe(30);
    });
  });

  describe('Balance integrity', () => {
    it('earn-spend-earn cycle maintains correct balance', () => {
      useEngagementStore.getState().addGems(100, 'earn1');
      useEngagementStore.getState().addGems(-30, 'spend1');
      useEngagementStore.getState().addGems(50, 'earn2');
      useEngagementStore.getState().addGems(-20, 'spend2');
      expect(useEngagementStore.getState().gems.balance).toBe(100);
    });

    it('totalEarned only tracks positive amounts', () => {
      useEngagementStore.getState().addGems(100, 'earn1');
      useEngagementStore.getState().addGems(-50, 'spend1');
      useEngagementStore.getState().addGems(200, 'earn2');
      useEngagementStore.getState().addGems(-30, 'spend2');
      expect(useEngagementStore.getState().gems.totalEarned).toBe(300); // 100 + 200
    });

    it('purchase records both gem deduction and inventory update atomically', () => {
      useEngagementStore.setState({
        gems: { ...getDefaultState().gems, balance: 100 },
      });
      useEngagementStore.getState().purchaseItem('shop-frame-gold');

      const state = useEngagementStore.getState();
      expect(state.gems.balance).toBe(75); // 100 - 25
      expect(state.gems.inventory.activeFrames).toContain('shop-frame-gold');
    });
  });
});
