'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useDailyQuests,
  useWeeklyQuests,
  useEngagementActions,
  useComeback,
  useEngagementStore,
} from '@/store/useEngagementStore';
import { comebackQuests, dailyChestReward, weeklyChestReward } from '@/data/quests';
import { QuestCard } from './QuestCard';
import { ChestAnimation } from './ChestAnimation';

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

export function QuestBoard() {
  const dailyQuests = useDailyQuests();
  const weeklyQuests = useWeeklyQuests();
  const comeback = useComeback();
  const { claimQuestReward, claimChest, initDailyQuests, initWeeklyQuests } = useEngagementActions();
  const dailyChestClaimed = useEngagementStore((s) => s.dailyChestClaimed);
  const weeklyChestClaimed = useEngagementStore((s) => s.weeklyChestClaimed);

  const [weeklyExpanded, setWeeklyExpanded] = useState(true);
  const [chestOpen, setChestOpen] = useState<{ type: 'daily' | 'weekly'; reward: { xp: number; gems: number } } | null>(null);

  const timeLeft = useMidnightCountdown();

  useEffect(() => {
    initDailyQuests();
    initWeeklyQuests();
  }, [initDailyQuests, initWeeklyQuests]);

  const allDailyComplete = dailyQuests.length >= 3 && dailyQuests.every((q) => q.completed);
  const allWeeklyComplete = weeklyQuests.length >= 3 && weeklyQuests.every((q) => q.completed);

  const handleDailyChest = useCallback(() => {
    if (!allDailyComplete || dailyChestClaimed) return;
    claimChest('daily');
    setChestOpen({ type: 'daily', reward: dailyChestReward });
  }, [allDailyComplete, dailyChestClaimed, claimChest]);

  const handleWeeklyChest = useCallback(() => {
    if (!allWeeklyComplete || weeklyChestClaimed) return;
    claimChest('weekly');
    setChestOpen({ type: 'weekly', reward: weeklyChestReward });
  }, [allWeeklyComplete, weeklyChestClaimed, claimChest]);

  // Determine displayed daily quests
  const displayDailyQuests = comeback.isInComebackFlow
    ? comebackQuests.map((def, idx) => {
        // Use actual quest progress from store if available, otherwise default
        const storeQuest = dailyQuests[idx];
        return {
          definitionId: def.id,
          type: 'daily' as const,
          title: def.title,
          description: def.description,
          icon: def.icon,
          target: def.target,
          progress: storeQuest?.progress ?? 0,
          reward: def.reward,
          trackingKey: def.trackingKey,
          filter: def.filter,
          completed: storeQuest?.completed ?? false,
          claimed: storeQuest?.claimed ?? false,
        };
      })
    : dailyQuests;

  return (
    <div className="space-y-4">
      {/* Daily Quests Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div>
            {comeback.isInComebackFlow ? (
              <h2 className="text-base font-extrabold text-gray-800">Welcome Back! 👋</h2>
            ) : (
              <h2 className="text-base font-extrabold text-gray-800">Daily Quests</h2>
            )}
            {!comeback.isInComebackFlow && timeLeft && (
              <p className="text-xs text-gray-400 mt-0.5">Resets in {timeLeft}</p>
            )}
            {comeback.isInComebackFlow && (
              <p className="text-xs text-gray-400 mt-0.5">Complete 3 quests to get back on track</p>
            )}
          </div>

          {/* Daily chest button */}
          <button
            onClick={handleDailyChest}
            disabled={!allDailyComplete || dailyChestClaimed}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all"
            style={{
              background: dailyChestClaimed
                ? '#F0FDF4'
                : allDailyComplete
                  ? '#7C3AED'
                  : '#F3F4F6',
              color: dailyChestClaimed
                ? '#16A34A'
                : allDailyComplete
                  ? '#FFFFFF'
                  : '#9CA3AF',
              cursor: allDailyComplete && !dailyChestClaimed ? 'pointer' : 'default',
              border: 'none',
            }}
          >
            {dailyChestClaimed ? (
              <>✓ Collected</>
            ) : (
              <>
                <span>🎁</span>
                <span>{allDailyComplete ? 'Open Chest!' : 'Chest'}</span>
              </>
            )}
          </button>
        </div>

        {/* Quest cards */}
        <div className="px-3 pb-3 space-y-2">
          {displayDailyQuests.slice(0, 3).map((quest) => (
            <QuestCard
              key={quest.definitionId}
              quest={quest}
              onClaim={claimQuestReward}
            />
          ))}
          {displayDailyQuests.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-4">No quests today yet.</p>
          )}
        </div>
      </div>

      {/* Weekly Quests Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Expandable header */}
        <button
          onClick={() => setWeeklyExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <h2 className="text-base font-extrabold text-gray-800">Weekly Quests</h2>
          <motion.span
            animate={{ rotate: weeklyExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400 text-lg"
          >
            ▾
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {weeklyExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              {/* Weekly chest button */}
              <div className="flex items-center justify-between px-4 pb-2">
                <p className="text-xs text-gray-400">Resets each Monday</p>
                <button
                  onClick={handleWeeklyChest}
                  disabled={!allWeeklyComplete || weeklyChestClaimed}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: weeklyChestClaimed
                      ? '#F0FDF4'
                      : allWeeklyComplete
                        ? '#7C3AED'
                        : '#F3F4F6',
                    color: weeklyChestClaimed
                      ? '#16A34A'
                      : allWeeklyComplete
                        ? '#FFFFFF'
                        : '#9CA3AF',
                    cursor: allWeeklyComplete && !weeklyChestClaimed ? 'pointer' : 'default',
                    border: 'none',
                  }}
                >
                  {weeklyChestClaimed ? (
                    <>✓ Collected</>
                  ) : (
                    <>
                      <span>🎁</span>
                      <span>{allWeeklyComplete ? 'Open Chest!' : 'Chest'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Weekly quest cards */}
              <div className="px-3 pb-3 space-y-2">
                {weeklyQuests.slice(0, 3).map((quest) => (
                  <QuestCard
                    key={quest.definitionId}
                    quest={quest}
                    onClaim={claimQuestReward}
                  />
                ))}
                {weeklyQuests.length === 0 && (
                  <p className="text-center text-sm text-gray-400 py-4">No weekly quests yet.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chest animation modal */}
      {chestOpen && (
        <ChestAnimation
          isOpen={!!chestOpen}
          type={chestOpen.type}
          reward={chestOpen.reward}
          onClose={() => setChestOpen(null)}
        />
      )}
    </div>
  );
}
