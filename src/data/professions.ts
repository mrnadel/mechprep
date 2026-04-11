export interface Profession {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  description: string;
  unitCount: number;
  questionCount: number;
  isComingSoon?: boolean;
  /** Requires admin-granted access to use this course. */
  requiresAccess?: boolean;
}

export const PROFESSION_ID = {
  MECHANICAL_ENGINEERING: 'mechanical-engineering',
  PERSONAL_FINANCE: 'personal-finance',
  PSYCHOLOGY: 'psychology',
  SPACE_ASTRONOMY: 'space-astronomy',
} as const;

export type ProfessionId = (typeof PROFESSION_ID)[keyof typeof PROFESSION_ID];

export const PROFESSIONS: Profession[] = [
  {
    id: PROFESSION_ID.MECHANICAL_ENGINEERING,
    name: 'Mechanical Engineering',
    shortName: 'ME',
    icon: '\u2699\uFE0F',
    color: '#3B82F6',
    description: 'Thermodynamics, fluid mechanics, materials, and machine design',
    unitCount: 10,
    questionCount: 1700,
    requiresAccess: true,
  },
  {
    id: PROFESSION_ID.PERSONAL_FINANCE,
    name: 'Personal Finance',
    shortName: 'Finance',
    icon: '\uD83D\uDCB0',
    color: '#10B981',
    description: 'Budgeting, investing, taxes, and building wealth',
    unitCount: 19,
    questionCount: 2988,
  },
  {
    id: PROFESSION_ID.PSYCHOLOGY,
    name: 'Psychology & Human Behavior',
    shortName: 'Psychology',
    icon: '\uD83E\uDDE0',
    color: '#A78BFA',
    description: 'Cognitive biases, social psychology, behavioral economics, and mental models',
    unitCount: 18,
    questionCount: 1766,
  },
  {
    id: PROFESSION_ID.SPACE_ASTRONOMY,
    name: 'Space & Astronomy',
    shortName: 'Space',
    icon: '\uD83D\uDE80',
    color: '#818CF8',
    description: 'Planets, stars, black holes, space exploration, and cosmology',
    unitCount: 10,
    questionCount: 644,
  },
];

export const DEFAULT_PROFESSION = PROFESSION_ID.PERSONAL_FINANCE;

export function getProfession(id: string) {
  return PROFESSIONS.find(p => p.id === id);
}
