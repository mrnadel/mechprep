import type { Level } from './types';

export const levels: Level[] = [
  { level: 1,  title: 'Apprentice',                xpRequired: 0,      icon: '🔩' },
  { level: 2,  title: 'Shop Hand',                  xpRequired: 100,    icon: '🔧' },
  { level: 3,  title: 'Drafter',                     xpRequired: 250,    icon: '📏' },
  { level: 4,  title: 'Junior Technician',           xpRequired: 500,    icon: '🛠️' },
  { level: 5,  title: 'Lab Assistant',               xpRequired: 850,    icon: '🔬' },
  { level: 6,  title: 'Design Intern',               xpRequired: 1300,   icon: '📐' },
  { level: 7,  title: 'Associate Engineer',          xpRequired: 1900,   icon: '⚙️' },
  { level: 8,  title: 'Project Engineer',            xpRequired: 2600,   icon: '🏗️' },
  { level: 9,  title: 'Stress Analyst',              xpRequired: 3500,   icon: '📊' },
  { level: 10, title: 'Thermal Specialist',          xpRequired: 4500,   icon: '🌡️' },
  { level: 11, title: 'Design Lead',                 xpRequired: 5700,   icon: '✏️' },
  { level: 12, title: 'Manufacturing Engineer',      xpRequired: 7100,   icon: '🏭' },
  { level: 13, title: 'Reliability Engineer',        xpRequired: 8700,   icon: '🔗' },
  { level: 14, title: 'Systems Engineer',            xpRequired: 10500,  icon: '🌐' },
  { level: 15, title: 'Senior Engineer',             xpRequired: 12500,  icon: '🎖️' },
  { level: 16, title: 'Materials Specialist',        xpRequired: 14800,  icon: '💎' },
  { level: 17, title: 'Technical Lead',              xpRequired: 17400,  icon: '🗂️' },
  { level: 18, title: 'Principal Engineer',          xpRequired: 20300,  icon: '🏛️' },
  { level: 19, title: 'R&D Innovator',              xpRequired: 23500,  icon: '💡' },
  { level: 20, title: 'Engineering Manager',         xpRequired: 27000,  icon: '📋' },
  { level: 21, title: 'Staff Engineer',              xpRequired: 31000,  icon: '⭐' },
  { level: 22, title: 'Domain Expert',               xpRequired: 35500,  icon: '🧠' },
  { level: 23, title: 'Distinguished Engineer',      xpRequired: 40500,  icon: '🏆' },
  { level: 24, title: 'Chief Engineer',              xpRequired: 46000,  icon: '👔' },
  { level: 25, title: 'Engineering Fellow',          xpRequired: 52000,  icon: '🎓' },
  { level: 26, title: 'Technical Director',          xpRequired: 59000,  icon: '🗝️' },
  { level: 27, title: 'VP of Engineering',           xpRequired: 67000,  icon: '🏢' },
  { level: 28, title: 'CTO',                        xpRequired: 76000,  icon: '💼' },
  { level: 29, title: 'Engineering Legend',          xpRequired: 86000,  icon: '🌟' },
  { level: 30, title: 'Mechanical Grandmaster',      xpRequired: 100000, icon: '👑' },
];

// --------------- Helper functions ---------------

function getLevelForXp(totalXp: number): Level {
  let current = levels[0];
  for (const level of levels) {
    if (totalXp >= level.xpRequired) {
      current = level;
    } else {
      break;
    }
  }
  return current;
}

export function getXpToNextLevel(totalXp: number): {
  current: Level;
  next: Level | null;
  xpNeeded: number;
  progress: number;
} {
  const current = getLevelForXp(totalXp);
  const nextIndex = levels.findIndex((l) => l.level === current.level) + 1;
  const next = nextIndex < levels.length ? levels[nextIndex] : null;

  if (!next) {
    return { current, next: null, xpNeeded: 0, progress: 1 };
  }

  const xpIntoCurrentLevel = totalXp - current.xpRequired;
  const xpForCurrentLevel = next.xpRequired - current.xpRequired;
  const progress = xpIntoCurrentLevel / xpForCurrentLevel;

  return {
    current,
    next,
    xpNeeded: next.xpRequired - totalXp,
    progress: Math.min(progress, 1),
  };
}
