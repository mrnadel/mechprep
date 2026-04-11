// ============================================================
// Friend Quests — Weekly co-op quest system
// ============================================================
// Each week, paired friends get a shared quest. Both must
// contribute to complete it and earn bonus rewards.

import { getCurrentWeekMonday } from '@/lib/quest-engine';

// --------------- Quest Definitions ---------------

export interface FriendQuestDefinition {
  type: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  rewardXp: number;
  rewardGems: number;
}

export const FRIEND_QUEST_POOL: FriendQuestDefinition[] = [
  {
    type: 'combined_xp',
    title: 'Team XP Challenge',
    description: 'Together, earn {target} XP this week',
    icon: '⚡',
    target: 500,
    rewardXp: 0,
    rewardGems: 20,
  },
  {
    type: 'combined_lessons',
    title: 'Lesson Duo',
    description: 'Together, complete {target} lessons this week',
    icon: '📚',
    target: 10,
    rewardXp: 0,
    rewardGems: 15,
  },
  {
    type: 'combined_accuracy',
    title: 'Accuracy Alliance',
    description: 'Both complete {target} sessions at 80%+ accuracy',
    icon: '🎯',
    target: 3,
    rewardXp: 0,
    rewardGems: 25,
  },
  {
    type: 'combined_xp',
    title: 'XP Sprint',
    description: 'Together, earn {target} XP this week',
    icon: '🚀',
    target: 800,
    rewardXp: 0,
    rewardGems: 30,
  },
  {
    type: 'combined_lessons',
    title: 'Study Buddies',
    description: 'Together, complete {target} lessons this week',
    icon: '🤝',
    target: 6,
    rewardXp: 0,
    rewardGems: 10,
  },
];

// --------------- Deterministic Quest Selection ---------------

function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Pick a quest deterministically for a friend pair in a given week.
 * Both users see the same quest because the seed uses sorted IDs.
 */
export function pickFriendQuest(
  userId: string,
  partnerId: string,
  week?: string,
): FriendQuestDefinition {
  const questWeek = week ?? getCurrentWeekMonday();
  // Sort IDs for consistency regardless of who queries
  const sortedIds = [userId, partnerId].sort().join('-');
  const seed = hashSeed(`${questWeek}-${sortedIds}`);
  return FRIEND_QUEST_POOL[seed % FRIEND_QUEST_POOL.length];
}

/**
 * Format a quest description with the target value.
 */
export function formatQuestDescription(def: FriendQuestDefinition): string {
  return def.description.replace('{target}', String(def.target));
}

// --------------- Shared Streak ---------------

/**
 * Calculate shared streak days between two users.
 * A shared streak day = both users were active on the same date.
 */
export function calculateSharedStreak(
  userActiveDays: string[],
  partnerActiveDays: string[],
): number {
  const partnerSet = new Set(partnerActiveDays);
  // Find overlapping days, sorted descending
  const sharedDays = userActiveDays
    .filter((d) => partnerSet.has(d))
    .sort((a, b) => b.localeCompare(a));

  if (sharedDays.length === 0) return 0;

  // Count consecutive shared days from today backward
  let streak = 0;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Accept today or yesterday as the start
  const todayStr = today.toISOString().slice(0, 10);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);
  if (sharedDays[0] !== todayStr && sharedDays[0] !== yesterdayStr) return 0;

  let expectedDate = new Date(sharedDays[0]);
  for (const day of sharedDays) {
    const d = new Date(day + 'T00:00:00');
    const diff = Math.round((expectedDate.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diff > 0) break;
    streak++;
    expectedDate = new Date(d);
    expectedDate.setDate(expectedDate.getDate() - 1);
  }
  return streak;
}
