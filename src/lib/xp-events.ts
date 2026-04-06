// ============================================================
// XP Events — Time-Limited Multiplier System
// ============================================================
// Provides multiplier detection for weekend double XP (Pro),
// Power Hour (everyone), and League Sprint (last 24h of week).

import { getCurrentWeekMonday } from '@/lib/quest-engine';

// --------------- Types ---------------

export interface ActiveXpEvent {
  id: string;
  name: string;
  icon: string;
  multiplier: number;
  /** ISO timestamp when this event ends */
  endsAt: string;
  /** Whether this requires Pro subscription */
  proOnly: boolean;
}

// --------------- Weekend Double XP (Pro) ---------------

function isWeekend(date: Date = new Date()): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Saturday or Sunday
}

/** Returns end-of-Sunday midnight for the current weekend. */
function getWeekendEnd(now: Date = new Date()): Date {
  const end = new Date(now);
  const day = end.getDay();
  // If Saturday, end is Sunday 23:59:59
  // If Sunday, end is today 23:59:59
  if (day === 6) {
    end.setDate(end.getDate() + 1);
  }
  end.setHours(23, 59, 59, 999);
  return end;
}

// --------------- Power Hour (Everyone, daily 7-9 PM local) ---------------

const POWER_HOUR_START = 19; // 7 PM local
const POWER_HOUR_END = 21;   // 9 PM local
const POWER_HOUR_MULTIPLIER = 1.5;

function isPowerHour(date: Date = new Date()): boolean {
  const hour = date.getHours();
  return hour >= POWER_HOUR_START && hour < POWER_HOUR_END;
}

function getPowerHourEnd(now: Date = new Date()): Date {
  const end = new Date(now);
  end.setHours(POWER_HOUR_END, 0, 0, 0);
  return end;
}

// --------------- League Sprint (Last 24h of league week) ---------------

const LEAGUE_SPRINT_MULTIPLIER = 1.25;

function getLeagueWeekEndDate(): Date {
  // League weeks run Monday → Sunday. getCurrentWeekMonday() gives us the start.
  const monday = new Date(getCurrentWeekMonday() + 'T00:00:00');
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return sunday;
}

function isLeagueSprint(now: Date = new Date()): boolean {
  const weekEnd = getLeagueWeekEndDate();
  const hoursUntilEnd = (weekEnd.getTime() - now.getTime()) / (1000 * 60 * 60);
  return hoursUntilEnd > 0 && hoursUntilEnd <= 24;
}

// --------------- Public API ---------------

/**
 * Get all currently active XP events.
 * @param isPro - Whether the user has a Pro subscription
 */
export function getActiveXpEvents(isPro: boolean): ActiveXpEvent[] {
  const now = new Date();
  const events: ActiveXpEvent[] = [];

  // Weekend Double XP (Pro only)
  if (isWeekend(now) && isPro) {
    events.push({
      id: 'weekend-double-xp',
      name: 'Weekend Double XP',
      icon: '🎉',
      multiplier: 2,
      endsAt: getWeekendEnd(now).toISOString(),
      proOnly: true,
    });
  }

  // Power Hour (everyone)
  if (isPowerHour(now)) {
    events.push({
      id: 'power-hour',
      name: 'Power Hour',
      icon: '⚡',
      multiplier: POWER_HOUR_MULTIPLIER,
      endsAt: getPowerHourEnd(now).toISOString(),
      proOnly: false,
    });
  }

  // League Sprint (everyone, last 24h of league week)
  if (isLeagueSprint(now)) {
    events.push({
      id: 'league-sprint',
      name: 'League Sprint',
      icon: '🏆',
      multiplier: LEAGUE_SPRINT_MULTIPLIER,
      endsAt: getLeagueWeekEndDate().toISOString(),
      proOnly: false,
    });
  }

  return events;
}

/**
 * Calculate the combined XP multiplier from all active events.
 * Events stack additively: base 1x + (2x-1) + (1.5x-1) = 2.5x
 * This prevents absurd stacking (e.g., 2 × 1.5 × 1.25 = 3.75x).
 */
export function getEventXpMultiplier(isPro: boolean): number {
  const events = getActiveXpEvents(isPro);
  if (events.length === 0) return 1;

  // Additive stacking: base 1 + sum of (multiplier - 1)
  const bonus = events.reduce((sum, e) => sum + (e.multiplier - 1), 0);
  return 1 + bonus;
}

/**
 * Format remaining time until event ends as a human-readable string.
 */
export function formatEventTimeLeft(endsAt: string): string {
  const ms = new Date(endsAt).getTime() - Date.now();
  if (ms <= 0) return 'Ending soon';
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}
