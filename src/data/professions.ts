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

export const PROFESSIONS: Profession[] = [
  {
    id: 'mechanical-engineering',
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
    id: 'personal-finance',
    name: 'Personal Finance',
    shortName: 'Finance',
    icon: '\uD83D\uDCB0',
    color: '#10B981',
    description: 'Budgeting, investing, taxes, and building wealth',
    unitCount: 1,
    questionCount: 30,
  },
  {
    id: 'psychology',
    name: 'Psychology & Human Behavior',
    shortName: 'Psychology',
    icon: '\uD83E\uDDE0',
    color: '#A78BFA',
    description: 'Cognitive biases, social psychology, behavioral economics, and mental models',
    unitCount: 10,
    questionCount: 0,
  },
  {
    id: 'space-astronomy',
    name: 'Space & Astronomy',
    shortName: 'Space',
    icon: '\uD83D\uDE80',
    color: '#818CF8',
    description: 'Planets, stars, black holes, space exploration, and cosmology',
    unitCount: 10,
    questionCount: 0,
  },
];

export const DEFAULT_PROFESSION = 'mechanical-engineering';

export function getProfession(id: string) {
  return PROFESSIONS.find(p => p.id === id);
}
