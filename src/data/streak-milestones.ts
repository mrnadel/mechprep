import type { StreakMilestoneDefinition } from './engagement-types';

export const streakMilestones: StreakMilestoneDefinition[] = [
  {
    days: 7,
    gems: 10,
    badgeName: 'Week Warrior',
    badgeIcon: '🔥',
  },
  {
    days: 14,
    gems: 20,
    badgeName: 'Fortnight of Focus',
    badgeIcon: '⚡',
    hasTitle: true,
    titleText: 'Consistent',
  },
  {
    days: 30,
    gems: 50,
    badgeName: 'Iron Will',
    badgeIcon: '🏆',
    hasFrame: true,
    hasTitle: true,
    titleText: 'Iron Will',
  },
  {
    days: 60,
    gems: 100,
    badgeName: 'Diamond Dedication',
    badgeIcon: '💎',
    hasFrame: true,
    hasTitle: true,
    titleText: 'Diamond Mind',
  },
  {
    days: 100,
    gems: 200,
    badgeName: 'Centurion',
    badgeIcon: '👑',
    hasFrame: true,
    hasTitle: true,
    titleText: 'Centurion',
  },
];
