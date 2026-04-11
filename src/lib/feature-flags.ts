/**
 * Feature Flags Registry
 *
 * All flags are defined here with their default values.
 * The database overrides these defaults at runtime.
 * Add new flags here, then run the seed to insert them into the DB.
 */

export interface FlagDefinition {
  key: string;
  enabled: boolean;
  description: string;
  category: 'engagement' | 'ui' | 'practice' | 'course' | 'prompts';
}

export const FLAG_DEFINITIONS: FlagDefinition[] = [
  // ─── Engagement ────────────────────────────────────
  { key: 'engagement.leagues',       enabled: true,  category: 'engagement', description: 'Weekly league leaderboard, promotions, and demotions' },
  { key: 'engagement.streaks',       enabled: true,  category: 'engagement', description: 'Daily streak tracking, milestones, and freeze/repair' },
  { key: 'engagement.quests',        enabled: true,  category: 'engagement', description: 'Daily and weekly quest system with Octoken rewards' },
  { key: 'engagement.celebrations',  enabled: true,  category: 'engagement', description: 'Level up, chapter complete, and course complete celebrations' },
  { key: 'engagement.gems_shop',     enabled: true,  category: 'engagement', description: 'Octoken shop for streak freezes, heart refills, and cosmetics' },
  { key: 'engagement.comeback_flow', enabled: true,  category: 'engagement', description: 'Welcome back screen with comeback quests for returning users' },

  // ─── UI ────────────────────────────────────────────
  { key: 'ui.daily_goal_bar',        enabled: true,  category: 'ui',         description: 'Daily XP goal progress bar on home screen' },
  { key: 'ui.mascot',                enabled: true,  category: 'ui',         description: 'Mascot character in modals and celebrations' },
  { key: 'ui.practice_card',         enabled: true,  category: 'ui',         description: 'Smart practice recommendation card on home screen' },

  // ─── Practice Modes ────────────────────────────────
  { key: 'practice.daily',           enabled: true,  category: 'practice',   description: 'Daily challenge practice mode' },

  // ─── Course ────────────────────────────────────────
  { key: 'course.intro_flow',        enabled: true,  category: 'course',     description: 'Multi-step onboarding flow for new professions' },
  { key: 'course.placement_test',    enabled: true,  category: 'course',     description: 'Placement test to skip ahead in a course' },
  { key: 'course.switching',         enabled: true,  category: 'course',     description: 'Allow switching between profession courses' },

  // ─── Prompts ───────────────────────────────────────
  { key: 'prompts.trial',            enabled: true,  category: 'prompts',    description: 'Pro trial upsell modal after first lesson' },
  { key: 'prompts.push',             enabled: true,  category: 'prompts',    description: 'Push notification opt-in prompt' },
];

/** Get default value for a flag */
export function getDefaultFlag(key: string): boolean {
  return FLAG_DEFINITIONS.find((f) => f.key === key)?.enabled ?? true;
}
