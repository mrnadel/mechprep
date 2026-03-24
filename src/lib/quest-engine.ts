// ============================================================
// Quest Engine — Pure Logic (no React, no store imports)
// ============================================================

import { Quest, QuestDefinition } from '@/data/engagement-types';
import { dailyQuestPool, weeklyQuestPool } from '@/data/quests';

// --------------- Date Utilities ---------------

// Debug day offset — admin "Skip day" increments this so
// getTodayDate / getCurrentWeekMonday advance without waiting.
let _debugDayOffset = 0;
function getDebugDayOffset() { return _debugDayOffset; }
export function resetDebugDayOffset() { _debugDayOffset = 0; }
export function addDebugDayOffset(days: number) { _debugDayOffset += days; }

function getSimulatedNow(): Date {
  const d = new Date();
  if (_debugDayOffset) d.setDate(d.getDate() + _debugDayOffset);
  return d;
}

export function getTodayDate(): string {
  const d = getSimulatedNow();
  // Use local time, not UTC — so a user practicing at 11pm local time
  // doesn't get tomorrow's date and break their streak.
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getCurrentWeekMonday(): string {
  const d = getSimulatedNow();
  const day = d.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat (local time)
  const diff = (day === 0 ? -6 : 1 - day); // days to subtract to get Monday
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;
}

// --------------- Hash Utility ---------------

export function hashString(str: string): number {
  let hash = 2166136261; // FNV-1a offset basis (32-bit)
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 16777619) >>> 0; // FNV prime, keep unsigned 32-bit
  }
  return hash;
}

// --------------- Quest Selection ---------------

/**
 * Deterministically select `count` quests from `pool` using `dateSeed`.
 * Filters out quests whose IDs are in `lastIds`.
 * Ensures difficulty balance: at least 1 easy, at least 1 stretch if available.
 */
export function selectQuests(
  pool: QuestDefinition[],
  count: number,
  dateSeed: string,
  lastIds: string[],
): QuestDefinition[] {
  const seed = hashString(dateSeed);
  const lastIdSet = new Set(lastIds);

  // Filter out previously shown quests
  const available = pool.filter((q) => !lastIdSet.has(q.id));

  // If not enough after filtering, fall back to full pool
  const candidates = available.length >= count ? available : pool;

  // Shuffle deterministically using seed
  const shuffled = [...candidates];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (hashString(`${seed}-${i}`) % (i + 1) + (i + 1)) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Separate by difficulty
  const easy = shuffled.filter((q) => q.difficulty === 'easy');
  const medium = shuffled.filter((q) => q.difficulty === 'medium');
  const stretch = shuffled.filter((q) => q.difficulty === 'stretch');

  const selected: QuestDefinition[] = [];

  // Guarantee at least 1 easy
  if (easy.length > 0) {
    selected.push(easy[0]);
  }

  // Guarantee at least 1 stretch if available and count allows
  if (stretch.length > 0 && count >= 2) {
    const stretchPick = stretch.find((q) => !selected.includes(q));
    if (stretchPick) {
      selected.push(stretchPick);
    }
  }

  // Fill remaining slots from the full shuffled pool (no duplicates)
  for (const q of shuffled) {
    if (selected.length >= count) break;
    if (!selected.includes(q)) {
      selected.push(q);
    }
  }

  // Trim to exact count
  return selected.slice(0, count);
}

// --------------- Quest Instantiation ---------------

/**
 * Convert QuestDefinitions to active Quest instances
 * with progress=0, completed=false, claimed=false.
 */
export function createQuests(
  definitions: QuestDefinition[],
  type: 'daily' | 'weekly',
): Quest[] {
  return definitions.map((def) => ({
    definitionId: def.id,
    type,
    title: def.title,
    description: def.description,
    icon: def.icon,
    target: def.target,
    progress: 0,
    reward: { xp: def.reward.xp, gems: def.reward.gems },
    trackingKey: def.trackingKey,
    filter: def.filter,
    completed: false,
    claimed: false,
  }));
}

// --------------- Reset Detection ---------------

export function needsDailyReset(storedDate: string | null): boolean {
  return storedDate !== getTodayDate();
}

export function needsWeeklyReset(storedMonday: string | null): boolean {
  return storedMonday !== getCurrentWeekMonday();
}

// --------------- Convenience Selectors ---------------

export function selectDailyQuests(lastIds: string[]): QuestDefinition[] {
  return selectQuests(dailyQuestPool, 3, getTodayDate(), lastIds);
}

export function selectWeeklyQuests(lastIds: string[]): QuestDefinition[] {
  return selectQuests(weeklyQuestPool, 3, getCurrentWeekMonday(), lastIds);
}
