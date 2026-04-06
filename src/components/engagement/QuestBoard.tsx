'use client';

import { useState, useEffect, useCallback } from 'react';
import { DAILY_QUEST_COUNT, WEEKLY_QUEST_COUNT, createQuests } from '@/lib/quest-engine';
import {
  useDailyQuests,
  useWeeklyQuests,
  useEngagementActions,
  useComeback,
} from '@/store/useEngagementStore';
import { comebackQuests, dailyQuestPool, weeklyQuestPool } from '@/data/quests';
import { QuestCard } from './QuestCard';
import { ChestAnimation } from './ChestAnimation';
import { useIsDark } from '@/store/useThemeStore';
import type { Quest } from '@/data/engagement-types';

const IS_DEV = process.env.NODE_ENV === 'development';

function useMidnightCountdown() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    function update() {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${h}h ${m}m`);
    }
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

function useWeeklyCountdown() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    function update() {
      const now = new Date();
      const day = now.getDay(); // 0=Sun, 1=Mon
      const daysUntilMonday = (8 - day) % 7 || 7;
      const nextMonday = new Date(now);
      nextMonday.setDate(now.getDate() + daysUntilMonday);
      nextMonday.setHours(0, 0, 0, 0);
      const diff = nextMonday.getTime() - now.getTime();
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else {
        const m = Math.floor((diff % 3600000) / 60000);
        setTimeLeft(`${hours}h ${m}m`);
      }
    }
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

function shufflePick<T>(pool: T[], count: number): T[] {
  const copy = [...pool];
  const picked: T[] = [];
  for (let i = 0; i < count && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(idx, 1)[0]);
  }
  return picked;
}

export function QuestBoard() {
  const dailyQuests = useDailyQuests();
  const weeklyQuests = useWeeklyQuests();
  const comeback = useComeback();
  const { claimQuestReward, initDailyQuests, initWeeklyQuests } = useEngagementActions();

  const [chestOpen, setChestOpen] = useState<{
    questId: string;
    type: 'daily' | 'weekly';
    reward: { xp: number; gems: number };
  } | null>(null);

  const [debugDaily, setDebugDaily] = useState<Quest[] | null>(null);
  const [debugWeekly, setDebugWeekly] = useState<Quest[] | null>(null);

  const dailyTimeLeft = useMidnightCountdown();
  const weeklyTimeLeft = useWeeklyCountdown();
  const isDark = useIsDark();

  useEffect(() => {
    initDailyQuests();
    initWeeklyQuests();
  }, [initDailyQuests, initWeeklyQuests]);

  const handleOpenChest = useCallback((quest: Quest) => {
    setChestOpen({ questId: quest.definitionId, type: quest.type, reward: quest.reward });
  }, []);

  const handleCloseChest = useCallback(() => {
    if (chestOpen) {
      claimQuestReward(chestOpen.questId);
    }
    setChestOpen(null);
  }, [chestOpen, claimQuestReward]);

  const handleDebugRegenDaily = useCallback(() => {
    const defs = shufflePick(dailyQuestPool, DAILY_QUEST_COUNT);
    const quests = createQuests(defs, 'daily');
    // Fake states: first quest claimed, second quest complete-unclaimed, rest in-progress
    setDebugDaily(quests.map((q, i) => {
      if (i === 0) return { ...q, progress: q.target, completed: true, claimed: true };
      if (i === 1) return { ...q, progress: q.target, completed: true, claimed: false };
      return { ...q, progress: Math.floor(Math.random() * q.target) };
    }));
  }, []);

  const handleDebugRegenWeekly = useCallback(() => {
    const defs = shufflePick(weeklyQuestPool, WEEKLY_QUEST_COUNT);
    const quests = createQuests(defs, 'weekly');
    setDebugWeekly(quests.map((q, i) => {
      if (i === 0) return { ...q, progress: q.target, completed: true, claimed: true };
      if (i === 1) return { ...q, progress: q.target, completed: true, claimed: false };
      return { ...q, progress: Math.floor(Math.random() * q.target) };
    }));
  }, []);

  const displayDailyQuests = debugDaily
    ? debugDaily
    : comeback.isInComebackFlow
      ? comebackQuests.map((def, idx) => {
          const storeQuest = dailyQuests[idx];
          return {
            definitionId: def.id,
            type: 'daily' as const,
            title: def.title,
            description: def.description,
            icon: def.icon,
            target: def.target,
            progress: storeQuest?.progress ?? 0,
            rarity: def.rarity,
            reward: def.reward,
            trackingKey: def.trackingKey,
            filter: def.filter,
            completed: storeQuest?.completed ?? false,
            claimed: storeQuest?.claimed ?? false,
          };
        })
      : dailyQuests;

  const displayWeeklyQuests = debugWeekly ?? weeklyQuests;

  return (
    <div className="space-y-6">
      {/* ---- Daily Quests ---- */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="min-w-0">
            <h2 className="text-base font-extrabold text-gray-800 dark:text-surface-50">
              {comeback.isInComebackFlow && !debugDaily ? 'Welcome Back!' : 'Daily Quests'}
            </h2>
            {debugDaily && (
              <p className="text-[11px] text-amber-500 dark:text-amber-400 font-medium mt-0.5">
                Debug preview — refresh to revert
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {IS_DEV && (
              <button
                onClick={handleDebugRegenDaily}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors"
                style={{
                  background: isDark ? 'rgba(245,158,11,0.15)' : '#FEF3C7',
                  color: isDark ? '#FBBF24' : '#B45309',
                  border: `1px solid ${isDark ? 'rgba(245,158,11,0.25)' : 'rgba(245,158,11,0.3)'}`,
                  cursor: 'pointer',
                }}
                title="Regenerate daily quests (debug)"
              >
                <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>↻</span>
                Shuffle
              </button>
            )}
            <span
              className="text-xs font-semibold tabular-nums px-2.5 py-1 rounded-lg"
              style={{
                background: isDark ? 'rgba(100,116,139,0.15)' : 'rgba(148,163,184,0.12)',
                color: isDark ? '#94A3B8' : '#64748B',
              }}
            >
              {dailyTimeLeft}
            </span>
          </div>
        </div>

        {displayDailyQuests.slice(0, 3).map((quest) => (
          <QuestCard
            key={quest.definitionId}
            quest={quest}
            onClaim={claimQuestReward}
            onOpenChest={handleOpenChest}
          />
        ))}
        {displayDailyQuests.length === 0 && (
          <p className="text-center text-sm text-gray-400 dark:text-surface-500 py-4">No quests today yet.</p>
        )}
      </section>

      {/* ---- Weekly Quests ---- */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="min-w-0">
            <h2 className="text-base font-extrabold text-gray-800 dark:text-surface-50">Weekly Quests</h2>
            {debugWeekly && (
              <p className="text-[11px] text-violet-500 dark:text-violet-400 font-medium mt-0.5">
                Debug preview — refresh to revert
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {IS_DEV && (
              <button
                onClick={handleDebugRegenWeekly}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors"
                style={{
                  background: isDark ? 'rgba(139,92,246,0.15)' : '#EDE9FE',
                  color: isDark ? '#A78BFA' : '#6D28D9',
                  border: `1px solid ${isDark ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.3)'}`,
                  cursor: 'pointer',
                }}
                title="Regenerate weekly quests (debug)"
              >
                <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>↻</span>
                Shuffle
              </button>
            )}
            <span
              className="text-xs font-semibold tabular-nums px-2.5 py-1 rounded-lg"
              style={{
                background: isDark ? 'rgba(100,116,139,0.15)' : 'rgba(148,163,184,0.12)',
                color: isDark ? '#94A3B8' : '#64748B',
              }}
            >
              {weeklyTimeLeft}
            </span>
          </div>
        </div>

        {displayWeeklyQuests.slice(0, 3).map((quest) => (
          <QuestCard
            key={quest.definitionId}
            quest={quest}
            onClaim={claimQuestReward}
            onOpenChest={handleOpenChest}
          />
        ))}
        {displayWeeklyQuests.length === 0 && (
          <p className="text-center text-sm text-gray-400 dark:text-surface-500 py-4">No weekly quests yet.</p>
        )}
      </section>

      {chestOpen && (
        <ChestAnimation
          isOpen={!!chestOpen}
          type={chestOpen.type}
          reward={chestOpen.reward}
          onClose={handleCloseChest}
        />
      )}
    </div>
  );
}
