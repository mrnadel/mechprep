import type { CharacterArc, SectionCharacterMap } from '../../character-arcs';

export const psychologyCharacters: CharacterArc[] = [
  {
    id: 'psy-maya',
    name: 'Dr. Maya',
    emoji: '👩‍🏫',
    role: 'The Professor',
    personality:
      'Warm but sharp psychology professor who teaches through real-life examples from her own research. Asks questions that linger in your head for hours. Occasionally shares personal anecdotes about what drew her to the field. Speaks with precision but never talks down to anyone.',
  },
  {
    id: 'psy-sam',
    name: 'Sam',
    emoji: '🧑‍🎓',
    role: 'The Curious Student',
    personality:
      'College sophomore who took psych as an elective and is getting hooked. Full of "no way" moments and connects everything to social media, dating, and gaming. Growth arc: starts thinking psychology is just common sense, ends up realizing nothing about the mind is simple.',
  },
];

/** Maya on odd sections, Sam on even. */
export const psychologySectionCharacters: SectionCharacterMap = {
  1: 'psy-maya',
  2: 'psy-sam',
  3: 'psy-maya',
  4: 'psy-sam',
  5: 'psy-maya',
  6: 'psy-sam',
  7: 'psy-maya',
  8: 'psy-sam',
  9: 'psy-maya',
  10: 'psy-sam',
  11: 'psy-maya',
  12: 'psy-sam',
  13: 'psy-maya',
  14: 'psy-sam',
};
