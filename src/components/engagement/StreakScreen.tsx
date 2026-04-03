'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Snowflake, Trophy } from 'lucide-react';
import { CurrencyIcon } from '@/components/ui/CurrencyIcon';
import { StreakFlame } from '@/components/icons/StreakFlame';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useStore } from '@/store/useStore';
import { useStreakEnhancements } from '@/store/useEngagementStore';
import { useIsDark } from '@/store/useThemeStore';
import { streakMilestones } from '@/data/streak-milestones';
import { getStreakStatus, toLocalDateString } from '@/lib/utils';
import type { StreakState } from '@/components/icons/StreakFlame';

// ─── Week calendar helper ─────────────────────────────────────

function getWeekDays() {
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const todayIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  return labels.map((label, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - todayIdx + i);
    const dateStr = toLocalDateString(d);
    return { label, isToday: i === todayIdx, isFuture: i > todayIdx, dateStr };
  });
}

// ─── Main Component ───────────────────────────────────────────

export function StreakScreen() {
  const currentStreak = useStore((s) => s.progress.currentStreak);
  const longestStreak = useStore((s) => s.progress.longestStreak);
  const lastActiveDate = useStore((s) => s.progress.lastActiveDate);
  const activeDays = useStore((s) => s.progress.activeDays) ?? [];
  const streakEnhancements = useStreakEnhancements();
  const dark = useIsDark();

  const streakStatus = getStreakStatus(lastActiveDate);
  const isActiveToday = lastActiveDate === toLocalDateString(new Date());

  const flameState: StreakState =
    currentStreak === 0
      ? 'none'
      : streakStatus === 'active'
        ? 'active'
        : streakStatus === 'at-risk'
          ? 'weak'
          : 'lost';

  const mascotPose = useMemo(() => {
    if (currentStreak === 0) return 'thinking' as const;
    if (!isActiveToday) return 'worried' as const;
    if (currentStreak >= 30) return 'champion' as const;
    if (currentStreak >= 7) return 'celebrating' as const;
    return 'streak' as const;
  }, [currentStreak, isActiveToday]);

  const heroMessage = useMemo(() => {
    if (currentStreak === 0) return 'Start your streak today!';
    if (isActiveToday) {
      if (currentStreak >= 30) return 'Unstoppable!';
      if (currentStreak >= 7) return "You're on fire!";
      return 'Nice work today!';
    }
    return 'Practice to keep your streak!';
  }, [currentStreak, isActiveToday]);

  const weekDays = useMemo(() => getWeekDays(), []);

  const nextMilestone = useMemo(() => {
    for (const m of streakMilestones) {
      if (currentStreak < m.days) return m;
    }
    return null;
  }, [currentStreak]);

  const milestoneProgress = nextMilestone
    ? Math.min((currentStreak / nextMilestone.days) * 100, 100)
    : 100;

  const thisWeekCount = activeDays.filter(d => weekDays.some(w => w.dateStr === d)).length;

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-surface-950">
      <PageHeader
        title="Streak"
        icon={<StreakFlame state={flameState} size={22} />}
      />

      <div className="px-4 sm:px-5 pb-8">

        {/* ── Hero ── */}
        <motion.div
          className="flex flex-col items-center pt-6 pb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MascotWithGlow pose={mascotPose} size={100} />

          <div className="flex items-center gap-2 mt-3">
            <StreakFlame state={flameState} size={32} />
            <span
              className="font-extrabold tabular-nums"
              style={{ fontSize: 48, color: currentStreak > 0 ? '#FF9600' : undefined, lineHeight: 1 }}
            >
              {currentStreak}
            </span>
          </div>
          <p className="text-sm font-bold text-surface-900 dark:text-surface-100 mt-1">
            {heroMessage}
          </p>
        </motion.div>

        {/* ── Week Calendar ── */}
        <motion.div
          className="card rounded-2xl p-4 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="flex justify-between">
            {weekDays.map((day, i) => {
              const isActive = activeDays.includes(day.dateStr);
              const isAtRisk = day.isToday && !isActive && streakStatus === 'at-risk';
              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-surface-400 dark:text-surface-500">
                    {day.label}
                  </span>
                  <motion.div
                    className="flex items-center justify-center w-9 h-9 rounded-full text-xs font-extrabold"
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, #FBBF24, #D97706)'
                        : isAtRisk
                          ? (dark ? 'rgba(220,38,38,0.15)' : '#FEF2F2')
                          : day.isFuture
                            ? 'transparent'
                            : (dark ? '#1E293B' : '#F0F0F0'),
                      color: isActive
                        ? 'white'
                        : isAtRisk
                          ? '#DC2626'
                          : day.isFuture
                            ? (dark ? '#334155' : '#E5E5E5')
                            : (dark ? '#64748B' : '#AFAFAF'),
                      border: isAtRisk
                        ? '2px dashed #DC2626'
                        : day.isToday && !isActive
                          ? `2px dashed ${dark ? '#475569' : '#D1D5DB'}`
                          : '2px solid transparent',
                      boxShadow: isActive ? '0 2px 6px rgba(217,119,6,0.25)' : 'none',
                    }}
                    initial={isActive ? { scale: 0.8 } : undefined}
                    animate={isActive ? { scale: 1 } : undefined}
                    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: i * 0.03 }}
                  >
                    {isActive ? <StreakFlame state="active" size={16} /> : null}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          className="grid grid-cols-3 gap-2.5 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="card rounded-xl p-3 text-center">
            <p className="text-xl font-extrabold text-[#FF9600] leading-none">{currentStreak}</p>
            <p className="text-[10px] font-bold text-surface-400 dark:text-surface-500 mt-1 uppercase tracking-wide">Current</p>
          </div>
          <div className="card rounded-xl p-3 text-center">
            <p className="text-xl font-extrabold text-surface-800 dark:text-surface-200 leading-none">{longestStreak}</p>
            <p className="text-[10px] font-bold text-surface-400 dark:text-surface-500 mt-1 uppercase tracking-wide">Best</p>
          </div>
          <div className="card rounded-xl p-3 text-center">
            <p className="text-xl font-extrabold text-accent-500 leading-none">{thisWeekCount}/7</p>
            <p className="text-[10px] font-bold text-surface-400 dark:text-surface-500 mt-1 uppercase tracking-wide">This Week</p>
          </div>
        </motion.div>

        {/* ── Next Milestone ── */}
        {nextMilestone && (
          <motion.div
            className="card rounded-2xl p-4 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">{nextMilestone.badgeIcon}</span>
                <div>
                  <p className="text-sm font-extrabold text-surface-900 dark:text-surface-100">
                    {nextMilestone.badgeName}
                  </p>
                  <p className="text-xs font-semibold text-surface-400 dark:text-surface-500">
                    {nextMilestone.days}-day streak
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-brand-500">
                <CurrencyIcon size={14} />
                <span>+{nextMilestone.gems}</span>
              </div>
            </div>
            <ProgressBar percent={milestoneProgress} color="#D97706" height="h-2.5" />
            <p className="text-[11px] font-bold text-surface-400 dark:text-surface-500 mt-1.5 text-right">
              {currentStreak} / {nextMilestone.days} days
            </p>
          </motion.div>
        )}

        {!nextMilestone && currentStreak > 0 && (
          <motion.div
            className="card rounded-2xl p-5 mb-3 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Trophy className="w-7 h-7 mx-auto mb-2 text-brand-500" />
            <p className="text-sm font-extrabold text-surface-900 dark:text-surface-100">All milestones reached!</p>
            <p className="text-xs font-semibold text-surface-400 dark:text-surface-500 mt-0.5">
              You&apos;ve conquered every streak milestone.
            </p>
          </motion.div>
        )}

        {/* ── Streak Freezes ── */}
        {streakEnhancements.freezesOwned > 0 && (
          <motion.div
            className="card rounded-2xl px-4 py-3 mb-3 flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
              style={{ background: dark ? 'rgba(59,130,246,0.15)' : '#EFF6FF' }}
            >
              <Snowflake className="w-4.5 h-4.5 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-surface-900 dark:text-surface-100">
                {streakEnhancements.freezesOwned} Streak Freeze{streakEnhancements.freezesOwned > 1 ? 's' : ''}
              </p>
              <p className="text-xs font-medium text-surface-400 dark:text-surface-500">
                Protects your streak if you miss a day
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
