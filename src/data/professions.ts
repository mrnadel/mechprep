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
];

export const DEFAULT_PROFESSION = 'mechanical-engineering';

export function getProfession(id: string) {
  return PROFESSIONS.find(p => p.id === id);
}
