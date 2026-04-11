// ============================================================
// Daily Reward Calendar — 7-Day Escalating Rewards
// ============================================================

export interface DailyRewardTier {
  day: number;         // 1-7
  gems: number;
  xp: number;
  /** Optional bonus item on milestone days */
  bonusType?: 'streak_freeze' | 'double_xp' | 'mystery_frame';
  bonusLabel?: string;
  /** Visual styling */
  icon: string;        // emoji
  glowColor: string;
  isMilestone: boolean;
}

export const DAILY_REWARD_CYCLE: DailyRewardTier[] = [
  { day: 1, gems: 3,  xp: 10, icon: '🎁', glowColor: 'rgba(59,130,246,0.3)',  isMilestone: false },
  { day: 2, gems: 5,  xp: 15, icon: '🎁', glowColor: 'rgba(59,130,246,0.3)',  isMilestone: false },
  { day: 3, gems: 7,  xp: 20, icon: '🎁', glowColor: 'rgba(16,185,129,0.3)',  isMilestone: false },
  { day: 4, gems: 10, xp: 25, icon: '🎁', glowColor: 'rgba(16,185,129,0.3)',  isMilestone: true,
    bonusType: 'streak_freeze', bonusLabel: 'Streak Freeze' },
  { day: 5, gems: 12, xp: 30, icon: '🎁', glowColor: 'rgba(245,158,11,0.3)', isMilestone: false },
  { day: 6, gems: 18, xp: 40, icon: '🎁', glowColor: 'rgba(245,158,11,0.3)', isMilestone: false },
  { day: 7, gems: 25, xp: 50, icon: '🏆', glowColor: 'rgba(168,85,247,0.5)', isMilestone: true,
    bonusType: 'mystery_frame', bonusLabel: 'Mystery Reward' },
];

/** Total gems in a full 7-day cycle */
export const TOTAL_CYCLE_GEMS = DAILY_REWARD_CYCLE.reduce((sum, r) => sum + r.gems, 0); // 80

/** After claiming Day 7, the cycle resets to Day 1 */
export const REWARD_CYCLE_LENGTH = 7;

// --------------- Mystery Reward Pool (Day 7 Bonus) ---------------

export interface MysteryReward {
  id: string;
  type: 'frame' | 'title' | 'double_xp' | 'gems_bonus';
  label: string;
  icon: string;
  /** For frame/title types: the item ID to grant */
  itemId?: string;
  /** For gems_bonus type: extra gems on top of Day 7 base */
  gemsAmount?: number;
  /** For double_xp type: duration in ms */
  durationMs?: number;
  rarity: 'common' | 'rare' | 'epic';
}

export const MYSTERY_REWARD_POOL: MysteryReward[] = [
  { id: 'mystery-gems-20', type: 'gems_bonus', label: '+20 Bonus Gems', icon: '💎',
    gemsAmount: 20, rarity: 'common' },
  { id: 'mystery-gems-35', type: 'gems_bonus', label: '+35 Bonus Gems', icon: '💎',
    gemsAmount: 35, rarity: 'rare' },
  { id: 'mystery-double-xp', type: 'double_xp', label: '30min Double XP', icon: '⚡',
    durationMs: 30 * 60 * 1000, rarity: 'common' },
  { id: 'mystery-frame-calendar', type: 'frame', label: 'Calendar Collector Frame', icon: '📅',
    itemId: 'reward-frame-calendar-collector', rarity: 'epic' },
];
