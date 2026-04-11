'use client';

import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { DAILY_REWARD_CYCLE } from '@/data/daily-rewards';
import type { DailyRewardTier } from '@/data/daily-rewards';
import type { DailyRewardCalendarState } from '@/data/engagement-types';
import { useDailyRewardCalendar } from '@/store/useEngagementStore';
import { useIsDark } from '@/store/useThemeStore';

interface DailyRewardCalendarProps {
  /** If true, renders in compact mode (e.g., inside quest board) */
  compact?: boolean;
}

function getDayStatus(
  day: number,
  cal: DailyRewardCalendarState,
): 'claimed' | 'current' | 'locked' {
  if (cal.todayClaimed && day <= cal.currentDay) return 'claimed';
  if (!cal.todayClaimed && day < cal.currentDay) return 'claimed';
  if (day === cal.currentDay && !cal.todayClaimed) return 'current';
  return 'locked';
}

function DayCircle({
  tier,
  status,
  isCurrent,
  isDark,
}: {
  tier: DailyRewardTier;
  status: 'claimed' | 'current' | 'locked';
  isCurrent: boolean;
  isDark: boolean;
}) {
  const isMilestone = tier.isMilestone;
  const size = isMilestone ? 'w-11 h-11' : 'w-9 h-9';

  if (status === 'claimed') {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <motion.div
          className={`${size} rounded-full flex items-center justify-center relative`}
          style={{
            background: isDark
              ? 'rgba(16,185,129,0.2)'
              : 'rgba(16,185,129,0.12)',
            border: `2px solid ${isDark ? '#10B981' : '#059669'}`,
          }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Check
            className="w-4 h-4"
            style={{ color: isDark ? '#34D399' : '#059669' }}
          />
        </motion.div>
        <span
          className="text-[10px] font-bold tabular-nums"
          style={{ color: isDark ? '#6EE7B7' : '#059669' }}
        >
          {tier.gems}
        </span>
        {isMilestone && tier.bonusLabel && (
          <span
            className="text-[8px] font-semibold leading-tight"
            style={{
              color: isDark ? '#6EE7B7' : '#059669',
            }}
          >
            {tier.bonusType === 'streak_freeze' ? '🧊' : '🎁'}
          </span>
        )}
      </div>
    );
  }

  if (status === 'current' && isCurrent) {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <motion.div
          className={`${size} rounded-full flex items-center justify-center relative`}
          style={{
            background: isDark
              ? 'rgba(245,158,11,0.15)'
              : 'rgba(245,158,11,0.1)',
            border: '2px solid #F59E0B',
            boxShadow: '0 0 12px rgba(245,158,11,0.4)',
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span className="text-sm">{tier.icon}</span>
        </motion.div>
        <span
          className="text-[10px] font-extrabold tabular-nums"
          style={{ color: '#F59E0B' }}
        >
          {tier.gems}
        </span>
        {isMilestone && tier.bonusLabel && (
          <span
            className="text-[8px] font-semibold leading-tight"
            style={{ color: '#F59E0B' }}
          >
            {tier.bonusType === 'streak_freeze' ? '🧊' : '🎁'}
          </span>
        )}
      </div>
    );
  }

  // Locked
  return (
    <div className="flex flex-col items-center gap-0.5 opacity-40">
      <div
        className={`${size} rounded-full flex items-center justify-center relative`}
        style={{
          background: isDark
            ? 'rgba(100,116,139,0.12)'
            : 'rgba(148,163,184,0.1)',
          border: `2px solid ${isDark ? '#475569' : '#CBD5E1'}`,
        }}
      >
        <Lock className="w-3 h-3" style={{ color: isDark ? '#64748B' : '#94A3B8' }} />
      </div>
      <span
        className="text-[10px] font-bold tabular-nums"
        style={{ color: isDark ? '#64748B' : '#94A3B8' }}
      >
        {tier.gems}
      </span>
      {isMilestone && tier.bonusLabel && (
        <span
          className="text-[8px] font-semibold leading-tight"
          style={{ color: isDark ? '#64748B' : '#94A3B8' }}
        >
          {tier.bonusType === 'streak_freeze' ? '🧊' : '🎁'}
        </span>
      )}
    </div>
  );
}

export function DailyRewardCalendar({ compact = false }: DailyRewardCalendarProps) {
  const calendar = useDailyRewardCalendar();
  const isDark = useIsDark();

  return (
    <div className="w-full">
      {!compact && (
        <div className="flex items-center justify-between px-1 mb-3">
          <h3 className="text-sm font-extrabold text-gray-800 dark:text-surface-50">
            Daily Rewards
          </h3>
          <span className="text-xs font-semibold text-gray-400 dark:text-surface-500">
            Day {calendar.currentDay} of 7
          </span>
        </div>
      )}

      {/* 7-day strip */}
      <div
        className="flex items-start justify-between gap-1 px-1 py-2 rounded-xl"
        style={{
          background: isDark
            ? 'rgba(30,41,59,0.5)'
            : 'rgba(241,245,249,0.7)',
        }}
      >
        {DAILY_REWARD_CYCLE.map((tier) => (
          <DayCircle
            key={tier.day}
            tier={tier}
            status={getDayStatus(tier.day, calendar)}
            isCurrent={tier.day === calendar.currentDay && !calendar.todayClaimed}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
}
