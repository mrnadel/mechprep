// ============================================================
// Level-Up Rewards — Tangible rewards for every level gained
// ============================================================

export interface LevelReward {
  level: number;
  gems: number;
  isMilestone: boolean;
  title?: string;         // Exclusive title text to unlock
  titleId?: string;       // ID for the title (for inventory tracking)
  frame?: boolean;        // Unlocks a level-exclusive frame
  frameId?: string;       // ID for the frame
  streakFreeze?: boolean; // Awards a free streak freeze
  message: string;        // Celebration message
}

export const levelRewards: LevelReward[] = [
  // --- Early game (Levels 2-4): Small but consistent ---
  { level: 2,  gems: 5,   isMilestone: false, message: 'First steps!' },
  { level: 3,  gems: 5,   isMilestone: false, message: 'Keep it up!' },
  { level: 4,  gems: 5,   isMilestone: false, message: 'Getting stronger!' },

  // --- Milestone: Level 5 ---
  {
    level: 5, gems: 20, isMilestone: true,
    title: 'Rising Star', titleId: 'reward-title-rising-star',
    message: 'You\'re on your way!',
  },

  // --- Mid-early (Levels 6-9) ---
  { level: 6,  gems: 5,   isMilestone: false, message: 'Solid progress!' },
  { level: 7,  gems: 5,   isMilestone: false, message: 'Building momentum!' },
  { level: 8,  gems: 8,   isMilestone: false, message: 'Impressive work!' },
  { level: 9,  gems: 8,   isMilestone: false, message: 'Almost there!' },

  // --- Milestone: Level 10 ---
  {
    level: 10, gems: 30, isMilestone: true,
    streakFreeze: true,
    message: 'Double digits!',
  },

  // --- Mid game (Levels 11-14) ---
  { level: 11, gems: 8,   isMilestone: false, message: 'Going strong!' },
  { level: 12, gems: 8,   isMilestone: false, message: 'Halfway to mastery!' },
  { level: 13, gems: 10,  isMilestone: false, message: 'Unstoppable!' },
  { level: 14, gems: 10,  isMilestone: false, message: 'True dedication!' },

  // --- Milestone: Level 15 ---
  {
    level: 15, gems: 40, isMilestone: true,
    frame: true, frameId: 'reward-frame-level-15',
    message: 'Senior status!',
  },

  // --- Mid-late (Levels 16-19) ---
  { level: 16, gems: 10,  isMilestone: false, message: 'Deep knowledge!' },
  { level: 17, gems: 10,  isMilestone: false, message: 'Leading the way!' },
  { level: 18, gems: 12,  isMilestone: false, message: 'Principal caliber!' },
  { level: 19, gems: 12,  isMilestone: false, message: 'Innovation awaits!' },

  // --- Milestone: Level 20 ---
  {
    level: 20, gems: 60, isMilestone: true,
    title: 'Master Engineer', titleId: 'reward-title-master-eng',
    frame: true, frameId: 'reward-frame-level-20',
    message: 'Engineering mastery!',
  },

  // --- Late game (Levels 21-24) ---
  { level: 21, gems: 12,  isMilestone: false, message: 'Staff-level skill!' },
  { level: 22, gems: 15,  isMilestone: false, message: 'Domain expertise!' },
  { level: 23, gems: 15,  isMilestone: false, message: 'Distinguished!' },
  { level: 24, gems: 15,  isMilestone: false, message: 'Chief material!' },

  // --- Milestone: Level 25 ---
  {
    level: 25, gems: 80, isMilestone: true,
    title: 'Elite Engineer', titleId: 'reward-title-elite',
    frame: true, frameId: 'reward-frame-level-25',
    streakFreeze: true,
    message: 'Elite status achieved!',
  },

  // --- Endgame (Levels 26-29) ---
  { level: 26, gems: 15,  isMilestone: false, message: 'Technical director!' },
  { level: 27, gems: 15,  isMilestone: false, message: 'VP vibes!' },
  { level: 28, gems: 18,  isMilestone: false, message: 'C-suite bound!' },
  { level: 29, gems: 18,  isMilestone: false, message: 'Legendary status!' },

  // --- Milestone: Level 30 (MAX) ---
  {
    level: 30, gems: 100, isMilestone: true,
    title: 'Grandmaster', titleId: 'reward-title-grandmaster',
    frame: true, frameId: 'reward-frame-level-30',
    message: 'The pinnacle of engineering!',
  },
];

/** Look up reward for a given level. Returns null if no reward exists (level 1). */
export function getLevelReward(level: number): LevelReward | null {
  return levelRewards.find((r) => r.level === level) ?? null;
}
