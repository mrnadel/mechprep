import type { Unit } from '../types';
import { lesson1, lesson2 } from './htw-L1-L2';
import { lesson3, lesson4 } from './htw-L3-L4';
import { lesson5, lesson6 } from './htw-L5-L6';
import { lesson7 } from './htw-L7';

export const unitHowThingsWork: Unit = {
  id: 'u7-how-things-work',
  title: 'How Things Work',
  description: 'Real-world engineering in everyday objects — from kitchen appliances to car engines, connecting theory to the mechanisms all around us.',
  color: '#78716C',
  icon: '🔧',
  topicId: 'real-world-mechanisms',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6, lesson7],
};
