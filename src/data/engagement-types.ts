// ============================================================
// Engagement System — Complete Type System & Constants
// ============================================================

// --------------- Constants ---------------

export const MAX_STREAK_FREEZES = 2;
export const MAX_GEM_TRANSACTIONS_CLIENT = 100;
export const DOUBLE_XP_SHOP_DURATION_MS = 30 * 60 * 1000;
export const COMEBACK_THRESHOLD_DAYS = 3;

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
  selectedTitle: string | null;   // item ID of equipped title
  selectedFrame: string | null;   // item ID of equipped frame
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
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
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
  fakeUserId?: string;
  frameStyle?: string;
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

// --------------- Fake User Pool ---------------

export interface FakeUser {
  id: string;
  name: string;
  nameQuality: 1 | 2 | 3 | 4 | 5;
  avatarType: 'none' | 'dicebear';
  avatarStyle?: string;
  avatarSeed: string;
  countryFlag: string;
  joinDate: string;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  accuracy: number;
  achievementsUnlocked: string[];
  topicMastery: {
    topicId: string;
    masteryLevel: 'not-started' | 'needs-work' | 'developing' | 'strong';
  }[];
  currentTier: 1 | 2 | 3 | 4 | 5;
  activityLevel: number;
  consistency: number;
  lastProgressedWeek: string;
  frameStyle?: string;
}

export interface FakeUserPool {
  version: number;
  pool: FakeUser[];
  lastWeekProcessed: string;
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
