'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useDailyQuests,
  useWeeklyQuests,
  useLeague,
  useEngagementActions,
  useEngagementStore,
} from '@/store/useEngagementStore';
import { leagueTiers } from '@/data/league';
import { getUserRank } from '@/lib/league-simulator';
import { dailyChestReward, weeklyChestReward } from '@/data/quests';
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

export function EngagementBar() {
  const dailyQuests = useDailyQuests();
  const weeklyQuests = useWeeklyQuests();
  const league = useLeague();
  const { claimQuestReward, claimChest, initDailyQuests, initWeeklyQuests } = useEngagementActions();
  const dailyChestClaimed = useEngagementStore((s) => s.dailyChestClaimed);
  const weeklyChestClaimed = useEngagementStore((s) => s.weeklyChestClaimed);
  const { data: session } = useSession();
  const isAdmin = session?.user?.id === process.env.NEXT_PUBLIC_ADMIN_USER_ID;

  const [questsOpen, setQuestsOpen] = useState(false);
  const [chestOpen, setChestOpen] = useState<{ type: 'daily' | 'weekly'; reward: { xp: number; gems: number } } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeLeft = useMidnightCountdown();

  useEffect(() => {
    initDailyQuests();
    initWeeklyQuests();
  }, [initDailyQuests, initWeeklyQuests]);

  // Close on outside click
  useEffect(() => {
    if (!questsOpen) return;
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setQuestsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [questsOpen]);

  // Quest stats
  const dailyDone = dailyQuests.filter((q) => q.completed).length;
  const weeklyDone = weeklyQuests.filter((q) => q.completed).length;
  const totalQuests = dailyQuests.length + weeklyQuests.length;
  const totalDone = dailyDone + weeklyDone;
  const questsRemaining = totalQuests - totalDone;
  const allDailyComplete = dailyQuests.length >= 3 && dailyQuests.every((q) => q.completed);
  const allWeeklyComplete = weeklyQuests.length >= 3 && weeklyQuests.every((q) => q.completed);
  const dailyProgressPercent = dailyQuests.length > 0 ? (dailyDone / dailyQuests.length) * 100 : 0;
  const weeklyProgressPercent = weeklyQuests.length > 0 ? (weeklyDone / weeklyQuests.length) * 100 : 0;

  // League stats
  const tier = leagueTiers.find((t) => t.tier === league.currentTier) ?? leagueTiers[0];
  const rank = getUserRank(league.weeklyXp, league.competitors);

  const handleDailyChest = () => {
    if (!allDailyComplete || dailyChestClaimed) return;
    claimChest('daily');
    setChestOpen({ type: 'daily', reward: dailyChestReward });
  };

  const handleWeeklyChest = () => {
    if (!allWeeklyComplete || weeklyChestClaimed) return;
    claimChest('weekly');
    setChestOpen({ type: 'weekly', reward: weeklyChestReward });
  };

  const skipToNextDay = useCallback(() => {
    // Reset dailyQuestDate to force initDailyQuests to generate new quests
    useEngagementStore.setState({
      dailyQuestDate: '',
      dailyChestClaimed: false,
    });
    initDailyQuests();
  }, [initDailyQuests]);

  const completeAllQuests = useCallback(() => {
    useEngagementStore.setState((state) => ({
      dailyQuests: state.dailyQuests.map((q) => ({
        ...q,
        progress: q.target,
        completed: true,
      })),
      weeklyQuests: state.weeklyQuests.map((q) => ({
        ...q,
        progress: q.target,
        completed: true,
      })),
    }));
  }, []);

  const buttons = [
    {
      href: '/league',
      icon: tier.icon,
      label: tier.name,
      badge: `#${rank}`,
      badgeDone: false,
      bg: '#EFF6FF',
      border: '#BFDBFE',
      color: '#1D4ED8',
    },
    {
      href: '/skills',
      icon: '\uD83C\uDFAF',
      label: 'Skills',
      badge: null,
      badgeDone: false,
      bg: '#F0FDF4',
      border: '#BBF7D0',
      color: '#15803D',
    },
  ];

  return (
    <div style={{ padding: '12px 20px 0' }}>
      <div className="flex" style={{ gap: 8 }}>
        {/* Quests button */}
        <div className="flex-1 relative" ref={popoverRef}>
          <button
            onClick={() => setQuestsOpen((v) => !v)}
            className="w-full flex items-center justify-center transition-all active:scale-95"
            style={{
              gap: 6,
              padding: '10px 8px',
              borderRadius: 14,
              background: questsOpen ? '#FFF3D6' : '#FFF9E8',
              border: `1.5px solid ${questsOpen ? '#F59E0B' : '#FFE4B8'}`,
              cursor: 'pointer',
              boxShadow: questsOpen ? '0 2px 8px rgba(245, 158, 11, 0.15)' : 'none',
            }}
          >
            <span style={{ fontSize: 18 }}>⚔️</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#B56E00', whiteSpace: 'nowrap' }}>
              Quests
            </span>
            {totalQuests > 0 && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: questsRemaining === 0 ? 'white' : '#B56E00',
                  background: questsRemaining === 0 ? '#58CC02' : 'rgba(0,0,0,0.06)',
                  padding: '1px 6px',
                  borderRadius: 8,
                  marginLeft: 2,
                }}
              >
                {totalDone}/{totalQuests}
              </span>
            )}
          </button>

          {/* Quest popover */}
          <AnimatePresence>
            {questsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute left-0 top-full mt-2 z-50 bg-white rounded-2xl border border-gray-200 overflow-y-auto overflow-x-hidden"
                style={{
                  minWidth: 300,
                  width: 'calc(100vw - 40px)',
                  maxWidth: 380,
                  maxHeight: 'calc(100vh - 160px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)',
                }}
              >
                {/* Header */}
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center justify-between mb-2.5">
                    <div>
                      <h3 className="text-[15px] font-extrabold text-gray-900">Daily Quests</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[11px] text-gray-400 font-medium">
                          Resets in {timeLeft}
                        </p>
                        {isAdmin && (
                          <>
                            <button
                              onClick={skipToNextDay}
                              className="text-[10px] font-bold text-orange-500 bg-orange-50 hover:bg-orange-100 px-1.5 py-0.5 rounded transition-colors"
                            >
                              Skip day
                            </button>
                            <button
                              onClick={completeAllQuests}
                              className="text-[10px] font-bold text-emerald-500 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.5 rounded transition-colors"
                            >
                              Finish all
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleDailyChest}
                      disabled={!allDailyComplete || dailyChestClaimed}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                      style={{
                        background: dailyChestClaimed
                          ? '#F0FDF4'
                          : allDailyComplete
                            ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                            : '#F3F4F6',
                        color: dailyChestClaimed
                          ? '#16A34A'
                          : allDailyComplete
                            ? '#FFFFFF'
                            : '#9CA3AF',
                        cursor: allDailyComplete && !dailyChestClaimed ? 'pointer' : 'default',
                        border: 'none',
                        boxShadow: allDailyComplete && !dailyChestClaimed
                          ? '0 2px 8px rgba(124, 58, 237, 0.3)'
                          : 'none',
                      }}
                    >
                      {dailyChestClaimed ? '✓ Collected' : '🎁 Open Chest'}
                    </button>
                  </div>

                  {/* Overall progress bar */}
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${dailyProgressPercent}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{
                        background: allDailyComplete
                          ? 'linear-gradient(90deg, #34D399, #10B981)'
                          : 'linear-gradient(90deg, #F59E0B, #F97316)',
                      }}
                    />
                  </div>
                </div>

                {/* Quest cards */}
                <div className="px-3 pb-3 space-y-1">
                  {dailyQuests.slice(0, 3).map((quest) => (
                    <QuestCard
                      key={quest.definitionId}
                      quest={quest}
                      onClaim={claimQuestReward}
                      compact
                    />
                  ))}
                  {dailyQuests.length === 0 && (
                    <p className="text-center text-xs text-gray-400 py-4">No quests today yet.</p>
                  )}
                </div>

                {/* Weekly quests */}
                {weeklyQuests.length > 0 && (
                  <div className="border-t border-gray-200">
                    <div className="px-4 pt-3 pb-1.5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[15px] font-extrabold text-gray-900">Weekly Quests</h3>
                        <button
                          onClick={handleWeeklyChest}
                          disabled={!allWeeklyComplete || weeklyChestClaimed}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                          style={{
                            background: weeklyChestClaimed
                              ? '#F0FDF4'
                              : allWeeklyComplete
                                ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                                : '#F3F4F6',
                            color: weeklyChestClaimed
                              ? '#16A34A'
                              : allWeeklyComplete
                                ? '#FFFFFF'
                                : '#9CA3AF',
                            cursor: allWeeklyComplete && !weeklyChestClaimed ? 'pointer' : 'default',
                            border: 'none',
                            boxShadow: allWeeklyComplete && !weeklyChestClaimed
                              ? '0 2px 8px rgba(124, 58, 237, 0.3)'
                              : 'none',
                          }}
                        >
                          {weeklyChestClaimed ? '✓ Collected' : '🎁 Open Chest'}
                        </button>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${weeklyProgressPercent}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          style={{
                            background: allWeeklyComplete
                              ? 'linear-gradient(90deg, #34D399, #10B981)'
                              : 'linear-gradient(90deg, #818CF8, #6366F1)',
                          }}
                        />
                      </div>
                    </div>
                    <div className="px-3 pb-3 space-y-1">
                      {weeklyQuests.slice(0, 3).map((quest) => (
                        <QuestCard
                          key={quest.definitionId}
                          quest={quest}
                          onClaim={claimQuestReward}
                          compact
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Other buttons (League, Skills) */}
        {buttons.map((btn) => (
          <Link
            key={btn.href}
            href={btn.href}
            className="flex-1 flex items-center justify-center transition-transform active:scale-95"
            style={{
              gap: 6,
              padding: '10px 8px',
              borderRadius: 14,
              background: btn.bg,
              border: `1.5px solid ${btn.border}`,
              textDecoration: 'none',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: 18 }}>{btn.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: btn.color, whiteSpace: 'nowrap' }}>
              {btn.label}
            </span>
            {btn.badge && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: btn.badgeDone ? 'white' : btn.color,
                  background: btn.badgeDone ? '#58CC02' : 'rgba(0,0,0,0.06)',
                  padding: '1px 6px',
                  borderRadius: 8,
                  marginLeft: 2,
                }}
              >
                {btn.badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Chest animation */}
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
