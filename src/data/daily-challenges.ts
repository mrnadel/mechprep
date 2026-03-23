import type { DailyChallenge } from './types';

export const dailyChallenges: DailyChallenge[] = [
  {
    dayOfWeek: 0,
    dayName: 'Sunday',
    theme: 'Sunday Systems Review',
    description:
      'Wrap up the week with a cross-topic review — connect concepts across disciplines and see the bigger picture.',
    questionIds: ['em-003', 'som-007', 'thermo-004', 'fm-002', 'rwm-005'],
  },
  {
    dayOfWeek: 1,
    dayName: 'Monday',
    theme: 'Mechanical Monday',
    description:
      'Start the week strong with core mechanical engineering fundamentals — statics, dynamics, and machine elements.',
    questionIds: ['em-001', 'em-005', 'me-003', 'me-006', 'som-002'],
  },
  {
    dayOfWeek: 2,
    dayName: 'Tuesday',
    theme: 'Tradeoff Tuesday',
    description:
      'Engineering is all about tradeoffs. Practice weighing competing requirements and making justified decisions.',
    questionIds: ['mat-004', 'dt-003', 'me-007', 'mfg-005', 'rwm-003'],
  },
  {
    dayOfWeek: 3,
    dayName: 'Wednesday',
    theme: 'What Fails Wednesday',
    description:
      'Think like a failure analyst — identify weak points, predict failure modes, and understand what breaks first.',
    questionIds: ['som-005', 'som-009', 'mat-006', 'me-002', 'rwm-007'],
  },
  {
    dayOfWeek: 4,
    dayName: 'Thursday',
    theme: 'Thermo Thursday',
    description:
      'Heat, energy, and entropy await. Tackle thermodynamic cycles, heat transfer, and energy balance problems.',
    questionIds: ['thermo-002', 'thermo-006', 'ht-001', 'ht-004', 'thermo-008'],
  },
  {
    dayOfWeek: 5,
    dayName: 'Friday',
    theme: 'Fluid Friday',
    description:
      'Dive into fluid mechanics — from Bernoulli basics to pipe flow and pump selection.',
    questionIds: ['fm-001', 'fm-004', 'fm-005', 'fm-006', 'fm-008'],
  },
  {
    dayOfWeek: 6,
    dayName: 'Saturday',
    theme: 'Selection Saturday',
    description:
      'Explore materials and manufacturing — understand material properties, selection criteria, and how things are made.',
    questionIds: ['mat-001', 'mat-003', 'mat-007', 'mfg-002', 'mfg-008'],
  },
];
