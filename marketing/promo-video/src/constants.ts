// Brand colors
export const COLORS = {
  primary: '#14B8A6',
  primaryDark: '#0D9488',
  accent: '#F59E0B',
  emerald: '#10B981',
  background: '#F8FAFC',
  backgroundDark: '#0F172A',
  text: '#0F172A',
  textLight: '#64748B',
  white: '#FFFFFF',

  // Course theme colors
  finance: '#F59E0B',
  psychology: '#8B5CF6',
  space: '#3B82F6',
  engineering: '#F43F5E',

  // League colors
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#00BCD4',
  masters: '#9C27B0',
};

// Video settings
export const FPS = 30;
export const DURATION_SECONDS = 30;
export const TOTAL_FRAMES = FPS * DURATION_SECONDS; // 900
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Scene timings (in frames)
export const SCENES = {
  logoReveal: { start: 0, duration: 3 * FPS },         // 0-3s
  problemHook: { start: 3 * FPS, duration: 3 * FPS },   // 3-6s
  gamification: { start: 6 * FPS, duration: 8 * FPS },  // 6-14s
  courses: { start: 14 * FPS, duration: 5 * FPS },      // 14-19s
  competition: { start: 19 * FPS, duration: 5 * FPS },  // 19-24s
  cta: { start: 24 * FPS, duration: 6 * FPS },          // 24-30s
};

// Asset paths (relative to public/)
export const ASSETS = {
  logo: '/logo.png',
  icon: '/icon-512.png',
  mascot: {
    excited: '/mascot/excited.png',
    celebrating: '/mascot/celebrating.png',
    onFire: '/mascot/on-fire.png',
    proud: '/mascot/proud.png',
    thinking: '/mascot/thinking.png',
    champion: '/mascot/champion.png',
    levelUp: '/mascot/level-up.png',
  },
  badges: {
    leagueBronze: '/badges/league-bronze.png',
    leagueSilver: '/badges/league-silver.png',
    leagueGold: '/badges/league-gold.png',
    leaguePlatinum: '/badges/league-platinum.png',
    leagueMasters: '/badges/league-masters.png',
    level5: '/badges/level-5.png',
    level10: '/badges/level-10.png',
    level20: '/badges/level-20.png',
    level30: '/badges/level-30.png',
    gem: '/badges/gem.png',
    crown: '/badges/crown.png',
    courseFinance: '/badges/course-personal-finance.png',
    coursePsychology: '/badges/course-psychology.png',
    courseSpace: '/badges/course-space-astronomy.png',
    courseEngineering: '/badges/course-mechanical-engineering.png',
  },
};
