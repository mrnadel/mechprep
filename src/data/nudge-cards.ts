import type { NudgeType } from './engagement-types';

export const MAX_NUDGE_CARDS = 3;
export const STREAK_WARNING_HOUR = 18;

// Lower number = higher priority (1 is most urgent)
export const nudgePriority: Record<NudgeType, number> = {
  streak_warning: 1,
  quest_expiring: 2,
  league_falling: 3,
  chest_ready: 4,
  comeback: 5,
  neglected_topic: 6,
};
