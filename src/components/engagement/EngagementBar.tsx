'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  useDailyQuests,
  useWeeklyQuests,
  useLeague,
  useEngagementActions,
  useEngagementStore,
} from '@/store/useEngagementStore';
import { leagueTiers } from '@/data/league';
import { getUserRank } from '@/lib/league-simulator';
import { dailyChestReward } from '@/data/quests';
import { QuestCard } from './QuestCard';
import { ChestAnimation } from './ChestAnimation';

export function EngagementBar() {
  const dailyQuests = useDailyQuests();
  const weeklyQuests = useWeeklyQuests();
  const league = useLeague();
  const { claimQuestReward, claimChest, initDailyQuests, initWeeklyQuests } = useEngagementActions();
  const dailyChestClaimed = useEngagementStore((s) => s.dailyChestClaimed);

  const [questsOpen, setQuestsOpen] = useState(false);
  const [chestOpen, setChestOpen] = useState<{ type: 'daily' | 'weekly'; reward: { xp: number; gems: number } } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

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

  // League stats
  const tier = leagueTiers.find((t) => t.tier === league.currentTier) ?? leagueTiers[0];
  const rank = getUserRank(league.weeklyXp, league.competitors);

  const handleDailyChest = () => {
    if (!allDailyComplete || dailyChestClaimed) return;
    claimChest('daily');
    setChestOpen({ type: 'daily', reward: dailyChestReward });
  };

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
        {/* Quests button — opens popover */}
        <div className="flex-1 relative" ref={popoverRef}>
          <button
            onClick={() => setQuestsOpen((v) => !v)}
            className="w-full flex items-center justify-center transition-transform active:scale-95"
            style={{
              gap: 6,
              padding: '10px 8px',
              borderRadius: 14,
              background: questsOpen ? '#FFF3D6' : '#FFF9E8',
              border: `1.5px solid ${questsOpen ? '#F59E0B' : '#FFE4B8'}`,
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 18 }}>⚔️</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: '#B56E00',
                whiteSpace: 'nowrap',
              }}
            >
              Quests
            </span>
            {questsRemaining > 0 ? (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#B56E00',
                  background: 'rgba(0,0,0,0.06)',
                  padding: '1px 6px',
                  borderRadius: 8,
                  marginLeft: 2,
                }}
              >
                {totalDone}/{totalQuests}
              </span>
            ) : totalQuests > 0 ? (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: 'white',
                  background: '#58CC02',
                  padding: '1px 6px',
                  borderRadius: 8,
                  marginLeft: 2,
                }}
              >
                {totalDone}/{totalQuests}
              </span>
            ) : null}
          </button>

          {/* Quest popover */}
          {questsOpen && (
            <div
              className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              style={{ minWidth: 280, maxWidth: 360, width: '100%' }}
            >
              {/* Daily quests header */}
              <div className="flex items-center justify-between px-3.5 pt-3.5 pb-1.5">
                <div>
                  <h3 className="text-sm font-extrabold text-gray-800">Daily Quests</h3>
                </div>
                <button
                  onClick={handleDailyChest}
                  disabled={!allDailyComplete || dailyChestClaimed}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
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
                  {dailyChestClaimed ? '✓ Collected' : '🎁 Chest'}
                </button>
              </div>

              {/* Daily quest cards */}
              <div className="px-2.5 pb-2 space-y-1.5">
                {dailyQuests.slice(0, 3).map((quest) => (
                  <QuestCard
                    key={quest.definitionId}
                    quest={quest}
                    onClaim={claimQuestReward}
                  />
                ))}
                {dailyQuests.length === 0 && (
                  <p className="text-center text-xs text-gray-400 py-3">No quests today yet.</p>
                )}
              </div>

              {/* Weekly progress summary */}
              {weeklyQuests.length > 0 && (
                <div className="border-t border-gray-100 px-3.5 py-2.5">
                  <Link
                    href="/quests"
                    onClick={() => setQuestsOpen(false)}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-gray-500">
                      Weekly: {weeklyDone}/{weeklyQuests.length} done
                    </span>
                    <span className="font-bold text-primary-600">View all →</span>
                  </Link>
                </div>
              )}
            </div>
          )}
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
            <span
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: btn.color,
                whiteSpace: 'nowrap',
              }}
            >
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
