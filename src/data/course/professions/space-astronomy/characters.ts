import type { CharacterArc, SectionCharacterMap } from '../../character-arcs';

export const spaceCharacters: CharacterArc[] = [
  {
    id: 'space-nova',
    name: 'Captain Nova',
    emoji: '👩‍🚀',
    role: 'Astronaut Mentor',
    personality: 'Retired astronaut who spent 6 months on the ISS. Speaks with quiet authority and genuine wonder. Shares specific memories from orbit. Uses phrases like "when I looked out the cupola..." Grows from teaching basics to sharing profound insights about humanity\'s place in the cosmos.',
  },
  {
    id: 'space-kai',
    name: 'Kai',
    emoji: '🔭',
    role: 'Backyard Astronomer',
    personality: 'A 16-year-old with a new 8-inch Dobsonian telescope. Speaks with pure excitement and impatience. Uses "dude," "no way," and "that\'s insane." Grows from spotting Jupiter\'s moons to understanding deep time and cosmic scale.',
  },
];

/** Alternate Kai/Nova across sections 1-14. */
export const spaceSectionCharacters: SectionCharacterMap = {
  1: 'space-kai',
  2: 'space-nova',
  3: 'space-kai',
  4: 'space-nova',
  5: 'space-kai',
  6: 'space-nova',
  7: 'space-kai',
  8: 'space-nova',
  9: 'space-kai',
  10: 'space-nova',
  11: 'space-kai',
  12: 'space-nova',
  13: 'space-kai',
  14: 'space-nova',
};
