import { describe, it, expect } from 'vitest';
import { financeCharacters, financeSectionCharacters } from '@/data/course/professions/personal-finance/characters';
import { financeCharacterLines } from '@/data/course/professions/personal-finance/character-lines';
import { psychologyCharacters, psychologySectionCharacters } from '@/data/course/professions/psychology/characters';
import { psychologyCharacterLines } from '@/data/course/professions/psychology/character-lines';
import { spaceCharacters, spaceSectionCharacters } from '@/data/course/professions/space-astronomy/characters';
import { spaceCharacterLines } from '@/data/course/professions/space-astronomy/character-lines';
import type { CharacterLines } from '@/data/course/character-lines';
import type { CharacterArc, SectionCharacterMap } from '@/data/course/character-arcs';

function runValidation(characters: CharacterArc[], lines: CharacterLines[], sectionMap: SectionCharacterMap, courseName: string) {
  const charIds = new Set(characters.map(c => c.id));

  for (const char of characters) {
    const cl = lines.find(l => l.characterId === char.id);

    it(`${char.id} has character lines`, () => {
      expect(cl).toBeDefined();
    });

    it(`${char.id} has fallback teaching line`, () => {
      expect(cl!.teachingLines.some(tl => tl.match === null)).toBe(true);
    });

    it(`${char.id} has result line for 0%`, () => {
      expect(cl!.resultLines.some(rl => rl.minAccuracy === 0)).toBe(true);
    });

    it(`${char.id} has all 3 celebration types`, () => {
      const types = new Set(cl!.celebrationLines.map(c => c.type));
      expect(types.has('halfway')).toBe(true);
      expect(types.has('last-question')).toBe(true);
      expect(types.has('streak')).toBe(true);
    });
  }

  it(`${courseName} section map references valid IDs`, () => {
    for (const charId of Object.values(sectionMap)) {
      expect(charIds.has(charId), `Invalid: ${charId}`).toBe(true);
    }
  });
}

describe('Personal Finance characters', () => {
  runValidation(financeCharacters, financeCharacterLines, financeSectionCharacters, 'PF');
});

describe('Psychology characters', () => {
  runValidation(psychologyCharacters, psychologyCharacterLines, psychologySectionCharacters, 'Psych');
});

describe('Space characters', () => {
  runValidation(spaceCharacters, spaceCharacterLines, spaceSectionCharacters, 'Space');
});
