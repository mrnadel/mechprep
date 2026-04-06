// ============================================================
// Quest Engine — Pure Logic (no React, no store imports)
// ============================================================

import { Quest, QuestDefinition, QuestRarity } from '@/data/engagement-types';
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

// --------------- Rarity Weights ---------------

/** Relative probability weights for each rarity tier. */
const RARITY_WEIGHTS: Record<QuestRarity, number> = {
  common: 50,
  rare: 30,
  epic: 15,
  legendary: 5,
};

// --------------- Quest Selection ---------------

/**
 * Deterministically select `count` quests from `pool` using `dateSeed`.
 * Filters out quests whose IDs are in `lastIds`.
 * Uses weighted random selection based on rarity: common quests appear
 * most often, legendary quests are rare treats.
 * Guarantees at least 1 common quest per selection.
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

  // Assign weighted scores: hash-based random * rarity weight
  const scored = candidates.map((q) => ({
    quest: q,
    score: (hashString(`${seed}-${q.id}`) / 0xFFFFFFFF) * RARITY_WEIGHTS[q.rarity],
  }));

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  const selected: QuestDefinition[] = [];

  // Guarantee at least 1 common quest
  const common = scored.filter((s) => s.quest.rarity === 'common');
  if (common.length > 0) {
    selected.push(common[0].quest);
  }

  // Fill remaining slots from the scored pool (no duplicates)
  for (const s of scored) {
    if (selected.length >= count) break;
    if (!selected.includes(s.quest)) {
      selected.push(s.quest);
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
  scale: number = 1.0,
): Quest[] {
  return definitions.map((def) => ({
    definitionId: def.id,
    type,
    title: def.title,
    description: def.description,
    icon: def.icon,
    target: Math.max(1, Math.round(def.target * scale)),
    progress: 0,
    rarity: def.rarity,
    reward: { xp: def.reward.xp, gems: def.reward.gems },
    trackingKey: def.trackingKey,
    filter: def.filter,
    completed: false,
    claimed: false,
    tooltip: def.tooltip,
  }));
}

/** Map daily commitment minutes to a quest difficulty scale factor. */
export function getCommitmentScale(dailyMinutes: number | undefined): number {
  switch (dailyMinutes) {
    case 5: return 0.6;
    case 10: return 1.0;  // baseline
    case 15: return 1.3;
    case 20: return 1.6;
    default: return 1.0;
  }
}

// --------------- Reset Detection ---------------

export function needsDailyReset(storedDate: string | null): boolean {
  return storedDate !== getTodayDate();
}

export function needsWeeklyReset(storedMonday: string | null): boolean {
  return storedMonday !== getCurrentWeekMonday();
}

// --------------- Convenience Selectors ---------------

export const DAILY_QUEST_COUNT = 3;
export const WEEKLY_QUEST_COUNT = 3;

export function selectDailyQuests(lastIds: string[]): QuestDefinition[] {
  return selectQuests(dailyQuestPool, DAILY_QUEST_COUNT, getTodayDate(), lastIds);
}

export function selectWeeklyQuests(lastIds: string[]): QuestDefinition[] {
  return selectQuests(weeklyQuestPool, WEEKLY_QUEST_COUNT, getCurrentWeekMonday(), lastIds);
}
