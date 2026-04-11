/**
 * Character Arc & Story Unlock data model for Gap 11: Story Narrative.
 *
 * Each course has 2-3 characters with personality and emoji avatars.
 * Story unlocks are short narrative rewards shown after completing all
 * units in a section, giving characters continuity across the course.
 */

export interface CharacterArc {
  id: string;
  name: string;
  emoji: string; // character emoji/avatar
  role: string; // e.g., "Your Study Buddy", "The Professor"
  personality: string; // Brief personality description
}

export type SectionCharacterMap = Record<number, string>; // sectionIndex → characterId

export interface StoryUnlockEntry {
  id: string;
  /** Trigger: show this story unlock after completing all units in this section */
  afterSectionIndex: number;
  characterId: string;
  dialogue: string; // The character's speech (3-5 short sentences max)
  callbackLine?: string; // Optional reference to earlier content
  gemReward?: number; // Gems earned (uses 'story_unlock' source)
}
