import { describe, it, expect } from 'vitest';
import {
  generateNudgeCards,
  generateContinuationHooks,
} from '@/lib/nudge-engine';
import type { NudgeContext, HookContext } from '@/lib/nudge-engine';
import type { Quest } from '@/data/engagement-types';

// --------------- Helpers ---------------

function baseNudgeCtx(overrides: Partial<NudgeContext> = {}): NudgeContext {
  return {
    currentStreak: 5,
    lastActiveDate: null,
    todayDate: '2025-06-10',
    currentHour: 20, // after 6pm
    dailyQuests: [],
    leagueRank: 15,
    leagueTier: 3,
    courseProgressPercent: 50,
    currentUnitLessonsRemaining: 10,
    currentUnitTitle: 'Thermodynamics',
    achievementProximity: null,
    neglectedTopic: null,
    dismissedNudges: {},
    ...overrides,
  };
}

function makeQuest(overrides: Partial<Quest> = {}): Quest {
  return {
    definitionId: 'q1',
    type: 'daily',
    title: 'Test Quest',
    description: '',
    icon: '',
    target: 3,
    progress: 0,
    reward: { xp: 25, gems: 5 },
    trackingKey: 'lessons_completed',
    completed: false,
    claimed: false,
    ...overrides,
  };
}

function baseHookCtx(overrides: Partial<HookContext> = {}): HookContext {
  return {
    currentStreak: 5,
    lastActiveDate: null,
    todayDate: '2025-06-10',
    dailyQuests: [],
    lessonsRemainingInUnit: 10,
    nextLessonId: 'lesson-1',
    unitTitle: 'Thermodynamics',
    xpToNextLevel: 200,
    nextLevelNumber: 8,
    leagueRank: 15,
    doubleXpActive: false,
    ...overrides,
  };
}

// ============================================================
// generateNudgeCards()
// ============================================================

describe('generateNudgeCards()', () => {
  it('returns at most 3 cards', () => {
    // Activate many conditions
    const ctx = baseNudgeCtx({
      currentStreak: 10,
      lastActiveDate: null,
      currentHour: 20,
      dailyQuests: [makeQuest({ target: 3, progress: 2 })],
      leagueRank: 6,
      currentUnitLessonsRemaining: 2,
      achievementProximity: { name: 'Speed Demon', remaining: 1 },
      neglectedTopic: { name: 'Fluids', daysSince: 10 },
    });
    const cards = generateNudgeCards(ctx);
    expect(cards.length).toBeLessThanOrEqual(3);
  });

  it('returns empty when no conditions are met', () => {
    const ctx = baseNudgeCtx({
      currentStreak: 0, // no streak to warn about
      lastActiveDate: '2025-06-10', // active today
      currentHour: 10,
      leagueRank: 3, // safe
      currentUnitLessonsRemaining: 10, // not close
    });
    const cards = generateNudgeCards(ctx);
    expect(cards).toHaveLength(0);
  });

  // --- Streak Warning ---

  it('generates streak_warning when after 6pm, not active today, streak > 0', () => {
    const ctx = baseNudgeCtx({
      currentStreak: 5,
      lastActiveDate: '2025-06-09', // yesterday
      currentHour: 18,
    });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'streak_warning')).toBe(true);
  });

  it('does NOT generate streak_warning before 6pm', () => {
    const ctx = baseNudgeCtx({
      currentStreak: 5,
      lastActiveDate: '2025-06-09',
      currentHour: 17,
    });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'streak_warning')).toBe(false);
  });

  it('does NOT generate streak_warning if already active today', () => {
    const ctx = baseNudgeCtx({
      currentStreak: 5,
      lastActiveDate: '2025-06-10', // matches todayDate
      currentHour: 20,
    });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'streak_warning')).toBe(false);
  });

  it('does NOT generate streak_warning if streak is 0', () => {
    const ctx = baseNudgeCtx({
      currentStreak: 0,
      lastActiveDate: '2025-06-09',
      currentHour: 20,
    });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'streak_warning')).toBe(false);
  });

  // --- Quest Proximity ---

  it('generates quest_expiring when quest is within 1 of target', () => {
    const ctx = baseNudgeCtx({
      dailyQuests: [makeQuest({ target: 3, progress: 2 })],
    });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'quest_expiring')).toBe(true);
  });

  it('does NOT generate quest_expiring when quest is far from target', () => {
    const ctx = baseNudgeCtx({
      dailyQuests: [makeQuest({ target: 5, progress: 1 })],
    });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'quest_expiring')).toBe(false);
  });

  it('ignores completed quests for quest_expiring', () => {
    const ctx = baseNudgeCtx({
      dailyQuests: [makeQuest({ target: 3, progress: 3, completed: true })],
    });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'quest_expiring')).toBe(false);
  });

  // --- League Alert ---

  it('generates league_falling when rank is 6-7', () => {
    const ctx = baseNudgeCtx({ leagueRank: 6 });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'league_falling')).toBe(true);
  });

  it('generates league_falling at rank 7', () => {
    const ctx = baseNudgeCtx({ leagueRank: 7 });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'league_falling')).toBe(true);
  });

  it('does NOT generate league_falling at rank 5', () => {
    const ctx = baseNudgeCtx({ leagueRank: 5 });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'league_falling')).toBe(false);
  });

  it('does NOT generate league_falling at rank 8', () => {
    const ctx = baseNudgeCtx({ leagueRank: 8 });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'league_falling')).toBe(false);
  });

  // --- Course Progress (chest_ready) ---

  it('generates chest_ready when <=3 lessons remain', () => {
    const ctx = baseNudgeCtx({ currentUnitLessonsRemaining: 3 });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'chest_ready')).toBe(true);
  });

  it('does NOT generate chest_ready when 0 lessons remain', () => {
    const ctx = baseNudgeCtx({ currentUnitLessonsRemaining: 0 });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'chest_ready')).toBe(false);
  });

  it('does NOT generate chest_ready when >3 lessons remain', () => {
    const ctx = baseNudgeCtx({ currentUnitLessonsRemaining: 4 });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'chest_ready')).toBe(false);
  });

  // --- Achievement Proximity ---

  it('generates comeback nudge when achievementProximity is set', () => {
    const ctx = baseNudgeCtx({
      achievementProximity: { name: 'Speed Demon', remaining: 2 },
    });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'comeback')).toBe(true);
  });

  // --- Neglected Topic ---

  it('generates neglected_topic nudge when topic is neglected', () => {
    const ctx = baseNudgeCtx({
      neglectedTopic: { name: 'Fluids', daysSince: 14 },
    });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'neglected_topic')).toBe(true);
  });

  // --- Dismissals ---

  it('does not generate dismissed nudge types', () => {
    const ctx = baseNudgeCtx({
      currentStreak: 5,
      lastActiveDate: '2025-06-09',
      currentHour: 20,
      dismissedNudges: { streak_warning: '2025-06-10T12:00:00Z' },
    });
    const cards = generateNudgeCards(ctx);
    expect(cards.some((c) => c.type === 'streak_warning')).toBe(false);
  });

  // --- Priority sorting ---

  it('returns cards sorted by priority (streak_warning first)', () => {
    const ctx = baseNudgeCtx({
      currentStreak: 5,
      lastActiveDate: '2025-06-09',
      currentHour: 20,
      dailyQuests: [makeQuest({ target: 3, progress: 2 })],
      leagueRank: 6,
    });
    const cards = generateNudgeCards(ctx);
    expect(cards[0].type).toBe('streak_warning');
    if (cards.length >= 2) {
      expect(cards[1].type).toBe('quest_expiring');
    }
  });
});

// ============================================================
// generateContinuationHooks()
// ============================================================

describe('generateContinuationHooks()', () => {
  it('always appends double XP hook when not active', () => {
    const ctx = baseHookCtx({ doubleXpActive: false });
    const hooks = generateContinuationHooks(ctx);
    expect(hooks[hooks.length - 1].type).toBe('double_xp_active');
  });

  it('does NOT append double XP hook when already active', () => {
    const ctx = baseHookCtx({ doubleXpActive: true });
    const hooks = generateContinuationHooks(ctx);
    expect(hooks.some((h) => h.type === 'double_xp_active')).toBe(false);
  });

  it('generates streak hook when not active today and streak > 0', () => {
    const ctx = baseHookCtx({
      currentStreak: 10,
      lastActiveDate: '2025-06-09',
    });
    const hooks = generateContinuationHooks(ctx);
    expect(hooks.some((h) => h.type === 'streak_freeze_low')).toBe(true);
  });

  it('generates quest_near_complete when quest is within 1 of target', () => {
    const ctx = baseHookCtx({
      dailyQuests: [makeQuest({ target: 3, progress: 2 })],
    });
    const hooks = generateContinuationHooks(ctx);
    expect(hooks.some((h) => h.type === 'quest_near_complete')).toBe(true);
  });

  it('generates unit proximity hook when <=2 lessons remaining', () => {
    const ctx = baseHookCtx({ lessonsRemainingInUnit: 2 });
    const hooks = generateContinuationHooks(ctx);
    expect(hooks.some((h) => h.message.includes('lesson'))).toBe(true);
  });

  it('generates XP proximity hook when <=50 XP to next level', () => {
    const ctx = baseHookCtx({ xpToNextLevel: 30, nextLevelNumber: 10 });
    const hooks = generateContinuationHooks(ctx);
    expect(hooks.some((h) => h.message.includes('30 XP'))).toBe(true);
  });

  it('generates league rank hook when rank is 6-7', () => {
    const ctx = baseHookCtx({ leagueRank: 6 });
    const hooks = generateContinuationHooks(ctx);
    expect(hooks.some((h) => h.type === 'league_rank_close')).toBe(true);
  });

  it('returns at most 2 priority hooks + optional double XP = 3 total', () => {
    const ctx = baseHookCtx({
      currentStreak: 5,
      lastActiveDate: '2025-06-09',
      dailyQuests: [makeQuest({ target: 3, progress: 2 })],
      lessonsRemainingInUnit: 1,
      xpToNextLevel: 10,
      leagueRank: 6,
      doubleXpActive: false,
    });
    const hooks = generateContinuationHooks(ctx);
    expect(hooks.length).toBeLessThanOrEqual(3);
  });

  it('returns only double XP when no conditions met', () => {
    const ctx = baseHookCtx({
      currentStreak: 0, // no streak risk
      lastActiveDate: '2025-06-10', // active today
      dailyQuests: [],
      lessonsRemainingInUnit: 10,
      xpToNextLevel: 200,
      leagueRank: 3,
      doubleXpActive: false,
    });
    const hooks = generateContinuationHooks(ctx);
    expect(hooks).toHaveLength(1);
    expect(hooks[0].type).toBe('double_xp_active');
  });
});
