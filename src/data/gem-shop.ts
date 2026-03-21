import type { ShopItem } from './engagement-types';

export const shopItems: ShopItem[] = [
  // --------------- Power-ups ---------------
  {
    id: 'shop-streak-freeze',
    name: 'Streak Freeze',
    description: 'Protect your streak for one missed day. Max 2 owned at a time.',
    icon: '🧊',
    cost: 30,
    category: 'power-up',
    type: 'streak_freeze',
    metadata: { maxOwnable: 2 },
  },
  {
    id: 'shop-streak-repair',
    name: 'Streak Repair',
    description: 'Restore your streak after you miss a day (available for 24h after a break).',
    icon: '🔧',
    cost: 50,
    category: 'power-up',
    type: 'streak_repair',
  },
  {
    id: 'shop-double-xp-30',
    name: 'Double XP — 30 min',
    description: 'Earn 2× XP on all questions for 30 minutes.',
    icon: '⚡',
    cost: 40,
    category: 'power-up',
    type: 'double_xp',
    metadata: { durationMs: 30 * 60 * 1000 },
  },

  // --------------- Titles ---------------
  {
    id: 'shop-title-thermal-king',
    name: 'Thermal King',
    description: 'Display the "Thermal King" title on your profile.',
    icon: '🌡️',
    cost: 20,
    category: 'cosmetic',
    type: 'title',
    metadata: { titleText: 'Thermal King' },
  },
  {
    id: 'shop-title-stress-master',
    name: 'Stress Master',
    description: 'Display the "Stress Master" title on your profile.',
    icon: '💪',
    cost: 20,
    category: 'cosmetic',
    type: 'title',
    metadata: { titleText: 'Stress Master' },
  },
  {
    id: 'shop-title-flow-guru',
    name: 'Flow Guru',
    description: 'Display the "Flow Guru" title on your profile.',
    icon: '🌊',
    cost: 20,
    category: 'cosmetic',
    type: 'title',
    metadata: { titleText: 'Flow Guru' },
  },

  // --------------- Frames ---------------
  {
    id: 'shop-frame-gold',
    name: 'Gold Frame',
    description: 'A shimmering gold border for your avatar.',
    icon: '🟡',
    cost: 35,
    category: 'cosmetic',
    type: 'frame',
    metadata: { frameStyle: 'gold' },
  },
  {
    id: 'shop-frame-diamond',
    name: 'Diamond Frame',
    description: 'A prismatic diamond border for your avatar.',
    icon: '💠',
    cost: 35,
    category: 'cosmetic',
    type: 'frame',
    metadata: { frameStyle: 'diamond' },
  },
];
