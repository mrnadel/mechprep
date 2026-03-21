// ============================================================
// Engagement System — Complete Type System & Constants
// ============================================================

// --------------- Constants ---------------

export const FAST_ANSWER_THRESHOLD_MS = 30000;
export const MAX_STREAK_FREEZES = 2;
export const MAX_GEM_TRANSACTIONS_CLIENT = 100;
export const DOUBLE_XP_FREE_DURATION_MS = 10 * 60 * 1000;
export const DOUBLE_XP_SHOP_DURATION_MS = 30 * 60 * 1000;
export const COMEBACK_THRESHOLD_DAYS = 3;
export const STALE_TOPIC_DAYS = 7;

// --------------- Quest Types ---------------

export type QuestTrackingKey =
  | 'lessons_completed'
  | 'sessions_completed'
  | 'questions_correct'
  | 'accuracy_above_threshold'
  | 'topics_practiced'
  | 'xp_earned'
  | 'stars_earned'
  | 'daily_challenges_completed'
  | 'streak_days'
  | 'perfect_sessions'
  | 'fast_answers'
  | 'stale_topic_practiced';

export type QuestDifficulty = 'easy' | 'medium' | 'stretch';

export interface QuestDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  trackingKey: QuestTrackingKey;
  target: number;
  difficulty: QuestDifficulty;
  reward: {
    xp: number;
    gems: number;
  };
  filter?: Record<string, unknown>;
}

export interface Quest {
  definitionId: string;
  type: 'daily' | 'weekly';
  title: string;
  description: string;
  icon: string;
  target: number;
  progress: number;
  reward: {
    xp: number;
    gems: number;
  };
  trackingKey: QuestTrackingKey;
  filter?: Record<string, unknown>;
  completed: boolean;
  claimed: boolean;
}

// --------------- Gems ---------------

export interface GemTransaction {
  id: string;
  amount: number;
  source: string;
  timestamp: string; // ISO date
}

export interface GemsState {
  balance: number;
  totalEarned: number;
  transactions: GemTransaction[];
  inventory: {
    activeTitles: string[];
    activeFrames: string[];
  };
}

// --------------- Shop ---------------

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  category: string;
  type: string;
  metadata?: Record<string, unknown>;
}

// --------------- League ---------------

export interface LeagueCompetitor {
  id: string;
  name: string;
  avatarInitial: string;
  countryFlag: string;
  weeklyXp: number;
  dailyXpRate: number;
  variance: number;
}

export interface LeagueWeekResult {
  rank: number;
  promoted: boolean;
  demoted: boolean;
  tier: number;
}

export interface LeagueState {
  currentTier: 1 | 2 | 3 | 4 | 5;
  weeklyXp: number;
  weekStartDate: string; // ISO date
  competitors: LeagueCompetitor[];
  lastWeekResult: LeagueWeekResult | null;
  resultSeen: boolean;
}

export interface LeagueTier {
  tier: 1 | 2 | 3 | 4 | 5;
  name: string;
  icon: string;
  color: string;
  promoteCount: number;
  demoteCount: number;
  xpRange: {
    min: number;
    max: number;
  };
}

// --------------- Streak ---------------

export interface StreakEnhancements {
  freezesOwned: number;
  freezeUsedToday: boolean;
  lastStreakBreakDate: string | null; // ISO date
  lastStreakValueBeforeBreak: number;
  repairAvailable: boolean;
  milestonesReached: number[];
}

export interface StreakMilestoneDefinition {
  days: number;
  gems: number;
  badgeName: string;
  badgeIcon: string;
  hasFrame?: boolean;
  hasTitle?: boolean;
  titleText?: string;
}

// --------------- Comeback ---------------

export interface ComebackState {
  isInComebackFlow: boolean;
  comebackQuestsCompleted: number;
  daysAway: number;
}

// --------------- Nudges & Hooks ---------------

export type NudgeType =
  | 'streak_warning'
  | 'quest_expiring'
  | 'league_falling'
  | 'chest_ready'
  | 'comeback'
  | 'neglected_topic';

export interface NudgeCard {
  type: NudgeType;
  title: string;
  body: string;
  cta: string;
  icon: string;
  dismissible: boolean;
}

export type HookType =
  | 'streak_freeze_low'
  | 'quest_near_complete'
  | 'league_rank_close'
  | 'double_xp_active';

export interface ContinuationHook {
  type: HookType;
  message: string;
  urgency: 'low' | 'medium' | 'high';
}

// --------------- Root Engagement State ---------------

export interface EngagementState {
  gems: GemsState;
  dailyQuests: Quest[];
  weeklyQuests: Quest[];
  dailyQuestDate: string | null;  // ISO date of last daily refresh
  weeklyQuestDate: string | null; // ISO date of last weekly refresh
  dailyChestClaimed: boolean;
  weeklyChestClaimed: boolean;
  lastDailyQuestIds: string[];
  lastWeeklyQuestIds: string[];
  league: LeagueState;
  streak: StreakEnhancements;
  comeback: ComebackState;
  dismissedNudges: NudgeType[];
  doubleXpExpiry: string | null; // ISO timestamp
}
