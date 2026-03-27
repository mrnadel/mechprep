import type { LeagueTier } from './engagement-types';

// --------------- Config ---------------

export const COMPETITORS_PER_LEAGUE = 30;
export const LEAGUE_GEM_REWARD_PROMOTION = 25;

// --------------- League Tiers ---------------

export const leagueTiers: LeagueTier[] = [
  {
    tier: 1,
    name: 'Bronze',
    icon: '🥉',
    image: '/badges/league-bronze.png',
    color: '#cd7f32',
    promoteCount: 5,
    demoteCount: 0,
    xpRange: { min: 0, max: 299 },
  },
  {
    tier: 2,
    name: 'Silver',
    icon: '🥈',
    image: '/badges/league-silver.png',
    color: '#c0c0c0',
    promoteCount: 5,
    demoteCount: 5,
    xpRange: { min: 300, max: 699 },
  },
  {
    tier: 3,
    name: 'Gold',
    icon: '🥇',
    image: '/badges/league-gold.png',
    color: '#ffd700',
    promoteCount: 5,
    demoteCount: 5,
    xpRange: { min: 700, max: 1299 },
  },
  {
    tier: 4,
    name: 'Platinum',
    icon: '💎',
    image: '/badges/league-platinum.png',
    color: '#00bcd4',
    promoteCount: 3,
    demoteCount: 5,
    xpRange: { min: 1300, max: 2199 },
  },
  {
    tier: 5,
    name: 'Masters',
    icon: '👑',
    image: '/badges/league-masters.png',
    color: '#9c27b0',
    promoteCount: 0,
    demoteCount: 5,
    xpRange: { min: 2200, max: 9999 },
  },
];

// --------------- Competitor Name Pool (60 names) ---------------

export const competitorNames: string[] = [
  // Israeli & Hebrew names
  'Amit Cohen', 'Yael Levi', 'Noam Ben-David', 'Shira Goldberg', 'Eitan Shapiro',
  'Noa Mizrahi', 'Oren Katz', 'Maya Friedman', 'Tal Weiss', 'Gal Peretz',
  // American
  'James Carter', 'Emily Chen', 'Michael Torres', 'Sarah Johnson', 'Ryan Williams',
  'Ashley Davis', 'Kevin Nguyen', 'Rachel Martinez', 'Tyler Anderson', 'Jessica Lee',
  // European
  'Lucas Müller', 'Sofia Rossi', 'Thomas Dupont', 'Elena Petrov', 'Henrik Andersen',
  'Maria García', 'Luca Bianchi', 'Anna Kowalski', 'Pieter van den Berg', 'Ingrid Larsson',
  // Asian
  'Wei Zhang', 'Priya Sharma', 'Ryo Tanaka', 'Mei Lin', 'Arjun Patel',
  'Yuki Sato', 'Pooja Nair', 'Jae-won Kim', 'Fang Liu', 'Divya Menon',
  // Latin American
  'Carlos Herrera', 'Valentina Cruz', 'Diego Fernández', 'Camila Rojas', 'Andrés Morales',
  'Isabella Santos', 'Mateo Vargas', 'Lucia Gómez', 'Sebastián López', 'Natalia Reyes',
  // Middle Eastern & African
  'Omar Hassan', 'Layla Khalil', 'Ahmed Al-Rashid', 'Fatima Malik', 'Yusuf Okonkwo',
  'Aisha Diallo', 'Khalid Mansour', 'Zara Nwosu', 'Tariq Al-Amin', 'Amara Traoré',
];

// --------------- Country Flag Pool (30 flags) ---------------

export const competitorFlags: string[] = [
  '🇮🇱', '🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷',
  '🇮🇹', '🇪🇸', '🇵🇱', '🇳🇱', '🇸🇪',
  '🇯🇵', '🇰🇷', '🇨🇳', '🇮🇳', '🇧🇷',
  '🇲🇽', '🇦🇷', '🇨🇴', '🇨🇱', '🇵🇪',
  '🇪🇬', '🇸🇦', '🇦🇪', '🇵🇰', '🇳🇬',
  '🇬🇭', '🇿🇦', '🇺🇦', '🇷🇺', '🇹🇷',
];
