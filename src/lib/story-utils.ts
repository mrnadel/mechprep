/**
 * Story narrative utilities (Gap 11).
 *
 * These functions live OUTSIDE the store because they need course data
 * (section grouping) that the store doesn't track. Called from components
 * where courseData is already available. (CR-C16)
 */

import type { Unit, LessonProgress } from '@/data/course/types';
import type { CharacterArc, SectionCharacterMap, StoryUnlockEntry } from '@/data/course/character-arcs';
import type { CharacterLines } from '@/data/course/character-lines';
import { PROFESSION_ID } from '@/data/professions';

// ─── Lazy loaders ────────────────────────────────────────────
// Follow the same dynamic import() pattern as loadUnitData in course-meta.ts
// so character data doesn't bloat the initial bundle. (CR-C7)

export async function loadCharacters(professionId: string): Promise<CharacterArc[]> {
  switch (professionId) {
    case PROFESSION_ID.PERSONAL_FINANCE: {
      const m = await import('@/data/course/professions/personal-finance/characters');
      return m.financeCharacters;
    }
    case PROFESSION_ID.PSYCHOLOGY: {
      const m = await import('@/data/course/professions/psychology/characters');
      return m.psychologyCharacters;
    }
    case PROFESSION_ID.SPACE_ASTRONOMY: {
      const m = await import('@/data/course/professions/space-astronomy/characters');
      return m.spaceCharacters;
    }
    default:
      return [];
  }
}

export async function loadStoryUnlocks(professionId: string): Promise<StoryUnlockEntry[]> {
  switch (professionId) {
    case PROFESSION_ID.PERSONAL_FINANCE: {
      const m = await import('@/data/course/professions/personal-finance/story-unlocks');
      return m.financeStoryUnlocks;
    }
    case PROFESSION_ID.PSYCHOLOGY: {
      const m = await import('@/data/course/professions/psychology/story-unlocks');
      return m.psychologyStoryUnlocks;
    }
    case PROFESSION_ID.SPACE_ASTRONOMY: {
      const m = await import('@/data/course/professions/space-astronomy/story-unlocks');
      return m.spaceStoryUnlocks;
    }
    default:
      return [];
  }
}

export async function loadSectionCharacterMap(professionId: string): Promise<SectionCharacterMap> {
  switch (professionId) {
    case PROFESSION_ID.PERSONAL_FINANCE: {
      const m = await import('@/data/course/professions/personal-finance/characters');
      return m.financeSectionCharacters;
    }
    case PROFESSION_ID.PSYCHOLOGY: {
      const m = await import('@/data/course/professions/psychology/characters');
      return m.psychologySectionCharacters;
    }
    case PROFESSION_ID.SPACE_ASTRONOMY: {
      const m = await import('@/data/course/professions/space-astronomy/characters');
      return m.spaceSectionCharacters;
    }
    default:
      return {};
  }
}

export async function loadCharacterLines(professionId: string): Promise<CharacterLines[]> {
  switch (professionId) {
    case PROFESSION_ID.PERSONAL_FINANCE: {
      const m = await import('@/data/course/professions/personal-finance/character-lines');
      return m.financeCharacterLines;
    }
    case PROFESSION_ID.PSYCHOLOGY: {
      const m = await import('@/data/course/professions/psychology/character-lines');
      return m.psychologyCharacterLines;
    }
    case PROFESSION_ID.SPACE_ASTRONOMY: {
      const m = await import('@/data/course/professions/space-astronomy/character-lines');
      return m.spaceCharacterLines;
    }
    default:
      return [];
  }
}

// ─── Pure utility functions ─────────────────────────────────

/** Check if ALL units in a given section have ALL their lessons completed. */
export function checkSectionComplete(
  completedLessons: Record<string, LessonProgress>,
  units: Unit[],
  sectionIndex: number,
): boolean {
  const sectionUnits = units.filter((u) => u.sectionIndex === sectionIndex);
  if (sectionUnits.length === 0) return false;

  return sectionUnits.every((unit) =>
    unit.lessons.every((lesson) => completedLessons[lesson.id]?.passed),
  );
}

/**
 * Get the next story unlock to show — the first unlock whose section is
 * fully complete but hasn't been viewed yet.
 */
export function getNextStoryUnlock(
  completedLessons: Record<string, LessonProgress>,
  viewedStoryUnlocks: string[],
  storyUnlocks: StoryUnlockEntry[],
  units: Unit[],
): StoryUnlockEntry | null {
  const viewedSet = new Set(viewedStoryUnlocks);

  for (const unlock of storyUnlocks) {
    if (viewedSet.has(unlock.id)) continue;
    if (checkSectionComplete(completedLessons, units, unlock.afterSectionIndex)) {
      return unlock;
    }
  }

  return null;
}

/** Get a character by ID from a character list. */
export function getCharacter(
  characterId: string,
  characters: CharacterArc[],
): CharacterArc | null {
  return characters.find((c) => c.id === characterId) ?? null;
}

// ─── Character line helpers ─────────────────────────────────

/** Get the character assigned to a section from the section-character map. */
export function getCharacterForSection(
  sectionIndex: number,
  sectionMap: SectionCharacterMap,
  characters: CharacterArc[],
): CharacterArc | null {
  const charId = sectionMap[sectionIndex];
  if (!charId) return null;
  return getCharacter(charId, characters);
}

/**
 * Get a teaching line for a question. Checks keyword matches first,
 * then falls back to the null-match line.
 */
export function getTeachingLine(
  questionText: string,
  characterId: string,
  allLines: CharacterLines[],
): string | null {
  const charLines = allLines.find((cl) => cl.characterId === characterId);
  if (!charLines) return null;

  const lowerText = questionText.toLowerCase();

  // Try keyword matches first
  for (const tl of charLines.teachingLines) {
    if (tl.match !== null && lowerText.includes(tl.match.toLowerCase())) {
      return tl.line;
    }
  }

  // Fall back to the null-match line
  const fallback = charLines.teachingLines.find((tl) => tl.match === null);
  return fallback?.line ?? null;
}

/**
 * Get the result line for an accuracy score. Lines are checked
 * high-to-low by minAccuracy; the first one where accuracy >= minAccuracy wins.
 */
export function getResultLine(
  accuracy: number,
  characterId: string,
  allLines: CharacterLines[],
): string | null {
  const charLines = allLines.find((cl) => cl.characterId === characterId);
  if (!charLines) return null;

  const sorted = [...charLines.resultLines].sort((a, b) => b.minAccuracy - a.minAccuracy);
  const match = sorted.find((rl) => accuracy >= rl.minAccuracy);
  return match?.line ?? null;
}

/** Get a celebration line by type for a character. */
export function getCelebrationLine(
  type: 'halfway' | 'last-question' | 'streak',
  characterId: string,
  allLines: CharacterLines[],
): string | null {
  const charLines = allLines.find((cl) => cl.characterId === characterId);
  if (!charLines) return null;

  const match = charLines.celebrationLines.find((cl) => cl.type === type);
  return match?.line ?? null;
}
