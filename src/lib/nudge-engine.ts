// ============================================================
// Nudge Engine — Pure Logic (no React, no store imports)
// ============================================================

import { NudgeCard, NudgeType, ContinuationHook, Quest } from '@/data/engagement-types';
import { nudgePriority, MAX_NUDGE_CARDS, STREAK_WARNING_HOUR } from '@/data/nudge-cards';

// --------------- Context Interfaces ---------------

export interface NudgeContext {
  currentStreak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  todayDate: string;             // YYYY-MM-DD
  currentHour: number;           // 0–23

  dailyQuests: Quest[];
  leagueRank: number;
  leagueTier: 1 | 2 | 3 | 4 | 5;

  courseProgressPercent: number;
  currentUnitLessonsRemaining: number;
  currentUnitTitle: string;

  achievementProximity: { name: string; remaining: number } | null;
  neglectedTopic: { name: string; daysSince: number } | null;

  /** Keys are NudgeType strings; values are ISO timestamp of dismissal. */
  dismissedNudges: Record<string, string>;
}

export interface HookContext {
  currentStreak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  todayDate: string;             // YYYY-MM-DD

  dailyQuests: Quest[];

  lessonsRemainingInUnit: number;
  nextLessonId: string;
  unitTitle: string;

  xpToNextLevel: number;
  nextLevelNumber: number;

  leagueRank: number;

  doubleXpActive: boolean;
}

// --------------- Helpers ---------------

function hasActiveToday(lastActiveDate: string | null, todayDate: string): boolean {
  return lastActiveDate === todayDate;
}

/** Return the quest closest to completion that is not yet completed. */
function getNearestIncompleteQuest(quests: Quest[]): Quest | null {
  const incomplete = quests.filter((q) => !q.completed);
  if (incomplete.length === 0) return null;
  return incomplete.reduce((best, q) => {
    const remaining = q.target - q.progress;
    const bestRemaining = best.target - best.progress;
    return remaining < bestRemaining ? q : best;
  });
}

// --------------- Nudge Card Generation ---------------

/**
 * Generate nudge cards based on the current context.
 * Returns up to MAX_NUDGE_CARDS (3) cards sorted by priority.
 */
export function generateNudgeCards(ctx: NudgeContext): NudgeCard[] {
  const candidates: Array<{ type: NudgeType; card: NudgeCard }> = [];

  // Helper to skip dismissed nudges
  const isDismissed = (type: NudgeType) => type in ctx.dismissedNudges;

  // 1. Streak Warning — after 6pm, haven't practiced today
  if (
    !isDismissed('streak_warning') &&
    ctx.currentHour >= STREAK_WARNING_HOUR &&
    !hasActiveToday(ctx.lastActiveDate, ctx.todayDate) &&
    ctx.currentStreak > 0
  ) {
    candidates.push({
      type: 'streak_warning',
      card: {
        type: 'streak_warning',
        title: `Don't break your ${ctx.currentStreak}-day streak!`,
        body: "You haven't practiced today. Complete a quick session to keep your streak alive.",
        cta: 'Practice Now',
        icon: '🔥',
        dismissible: false,
      },
    });
  }

  // 2. Quest Proximity — within 1 of completion
  if (!isDismissed('quest_expiring')) {
    const nearQuest = getNearestIncompleteQuest(ctx.dailyQuests);
    if (nearQuest && nearQuest.target - nearQuest.progress <= 1) {
      candidates.push({
        type: 'quest_expiring',
        card: {
          type: 'quest_expiring',
          title: 'Quest Almost Done!',
          body: `You're 1 away from completing "${nearQuest.title}". Finish it before midnight!`,
          cta: 'Complete Quest',
          icon: nearQuest.icon,
          dismissible: true,
        },
      });
    }
  }

  // 3. League Alert — rank 6–7 (near demotion zone)
  if (!isDismissed('league_falling') && ctx.leagueRank >= 6 && ctx.leagueRank <= 7) {
    candidates.push({
      type: 'league_falling',
      card: {
        type: 'league_falling',
        title: 'You\'re on the edge!',
        body: `You're ranked #${ctx.leagueRank} this week. Earn more XP to avoid dropping down.`,
        cta: 'Climb the Ranks',
        icon: '⚔️',
        dismissible: true,
      },
    });
  }

  // 4. Course Progress — ≤3 lessons remaining in unit
  if (
    !isDismissed('chest_ready') &&
    ctx.currentUnitLessonsRemaining > 0 &&
    ctx.currentUnitLessonsRemaining <= 3
  ) {
    candidates.push({
      type: 'chest_ready',
      card: {
        type: 'chest_ready',
        title: `Almost done with ${ctx.currentUnitTitle}!`,
        body: `Only ${ctx.currentUnitLessonsRemaining} lesson${ctx.currentUnitLessonsRemaining === 1 ? '' : 's'} left. Finish the unit to unlock your reward!`,
        cta: 'Continue Unit',
        icon: '🏆',
        dismissible: true,
      },
    });
  }

  // 5. Achievement Proximity
  if (!isDismissed('comeback') && ctx.achievementProximity !== null) {
    const { name, remaining } = ctx.achievementProximity;
    candidates.push({
      type: 'comeback',
      card: {
        type: 'comeback',
        title: 'Achievement in Reach!',
        body: `You're only ${remaining} away from earning "${name}". Keep going!`,
        cta: 'Keep Going',
        icon: '🏅',
        dismissible: true,
      },
    });
  }

  // 6. Neglected Topic
  if (!isDismissed('neglected_topic') && ctx.neglectedTopic !== null) {
    const { name, daysSince } = ctx.neglectedTopic;
    candidates.push({
      type: 'neglected_topic',
      card: {
        type: 'neglected_topic',
        title: `${name} needs some love`,
        body: `You haven't practiced ${name} in ${daysSince} days. A quick review keeps it fresh.`,
        cta: 'Practice Topic',
        icon: '📚',
        dismissible: true,
      },
    });
  }

  // Sort by priority (lower number = higher priority)
  candidates.sort((a, b) => nudgePriority[a.type] - nudgePriority[b.type]);

  return candidates.slice(0, MAX_NUDGE_CARDS).map((c) => c.card);
}

// --------------- Continuation Hook Generation ---------------

interface RankedHook {
  priority: number;
  hook: ContinuationHook;
  isDoubleXp?: boolean;
}

/**
 * Generate continuation hooks.
 * Returns top 2 priority hooks + always appends double XP hook (unless already active).
 */
export function generateContinuationHooks(ctx: HookContext): ContinuationHook[] {
  const candidates: RankedHook[] = [];

  // 1. Streak at risk — hasn't practiced today
  if (!hasActiveToday(ctx.lastActiveDate, ctx.todayDate) && ctx.currentStreak > 0) {
    candidates.push({
      priority: 1,
      hook: {
        type: 'streak_freeze_low',
        message: `Keep your ${ctx.currentStreak}-day streak alive — one more session!`,
        urgency: 'high',
      },
    });
  }

  // 2. Quest near completion — within 1 of target
  const nearQuest = getNearestIncompleteQuest(ctx.dailyQuests);
  if (nearQuest && nearQuest.target - nearQuest.progress <= 1) {
    candidates.push({
      priority: 2,
      hook: {
        type: 'quest_near_complete',
        message: `Almost there! One more to finish "${nearQuest.title}".`,
        urgency: 'medium',
      },
    });
  }

  // 3. Unit proximity — ≤2 lessons remaining
  if (ctx.lessonsRemainingInUnit <= 2 && ctx.lessonsRemainingInUnit > 0) {
    candidates.push({
      priority: 3,
      hook: {
        type: 'quest_near_complete', // closest HookType for unit proximity
        message: `Only ${ctx.lessonsRemainingInUnit} lesson${ctx.lessonsRemainingInUnit === 1 ? '' : 's'} left in ${ctx.unitTitle}!`,
        urgency: 'medium',
      },
    });
  }

  // 4. XP/Level proximity — ≤50 XP to next level
  if (ctx.xpToNextLevel <= 50 && ctx.xpToNextLevel > 0) {
    candidates.push({
      priority: 4,
      hook: {
        type: 'quest_near_complete',
        message: `Only ${ctx.xpToNextLevel} XP away from Level ${ctx.nextLevelNumber}!`,
        urgency: 'medium',
      },
    });
  }

  // 5. League promotion — rank 6–7
  if (ctx.leagueRank >= 6 && ctx.leagueRank <= 7) {
    candidates.push({
      priority: 5,
      hook: {
        type: 'league_rank_close',
        message: `You're ranked #${ctx.leagueRank} — push into the top 5 to get promoted!`,
        urgency: 'medium',
      },
    });
  }

  // Sort by priority
  candidates.sort((a, b) => a.priority - b.priority);

  // Take top 2 (non-doubleXp)
  const top2 = candidates.slice(0, 2).map((c) => c.hook);

  // Always append double XP hook unless already active
  if (!ctx.doubleXpActive) {
    top2.push({
      type: 'double_xp_active',
      message: 'Activate Double XP to earn 2× rewards on your next session!',
      urgency: 'low',
    });
  }

  return top2;
}
