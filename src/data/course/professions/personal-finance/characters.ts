import type { CharacterArc, SectionCharacterMap } from '../../character-arcs';

export const financeCharacters: CharacterArc[] = [
  {
    id: 'pf-alex',
    name: 'Alex',
    emoji: '👨‍💼',
    role: 'Your Study Buddy',
    personality: 'A 24-year-old who just landed his first salaried job. Lives for takeout, impulsive Amazon orders, and "treating himself." Knows he should save but keeps saying "I\'ll start next month." Speaks casually, cracks jokes about his own bad habits, and slowly realizes adulting with money is non-negotiable.',
  },
  {
    id: 'pf-jordan',
    name: 'Jordan',
    emoji: '👩‍🔬',
    role: 'The Determined One',
    personality: 'A 30-year-old single mom with $38K in student loans and a lab tech salary. Tracks every penny in a spreadsheet but still feels behind. Speaks carefully, cites numbers, and gets anxious when the math doesn\'t add up. Her arc goes from paralyzed by debt to quietly confident with a real plan.',
  },
];

/** Alex on odd sections, Jordan on even. */
export const financeSectionCharacters: SectionCharacterMap = {
  1: 'pf-alex',
  2: 'pf-jordan',
  3: 'pf-alex',
  4: 'pf-jordan',
  5: 'pf-alex',
  6: 'pf-jordan',
  7: 'pf-alex',
  8: 'pf-jordan',
  9: 'pf-alex',
  10: 'pf-jordan',
  11: 'pf-alex',
  12: 'pf-jordan',
  13: 'pf-alex',
  14: 'pf-jordan',
  15: 'pf-alex',
};
