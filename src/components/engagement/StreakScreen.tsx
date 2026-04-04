'use client';

import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Snowflake } from 'lucide-react';
import { CurrencyIcon } from '@/components/ui/CurrencyIcon';
import { StreakFlame } from '@/components/icons/StreakFlame';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useStore } from '@/store/useStore';
import { useStreakEnhancements } from '@/store/useEngagementStore';
import { useIsDark } from '@/store/useThemeStore';
import { streakMilestones } from '@/data/streak-milestones';
import { getStreakStatus, toLocalDateString } from '@/lib/utils';
import type { StreakState } from '@/components/icons/StreakFlame';

// ─── Month calendar helpers ───────────────────────────────────

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rows: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstDay).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      rows.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    rows.push(week);
  }
  return rows;
}

function dateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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

  const heroMessage = useMemo(() => {
    if (currentStreak === 0) return 'Start your streak today!';
    if (isActiveToday) {
      if (currentStreak >= 30) return 'Unstoppable!';
      if (currentStreak >= 7) return "You're on fire!";
      return 'Nice work today!';
    }
    return 'Practice to keep your streak!';
  }, [currentStreak, isActiveToday]);

  // Month calendar state
  const now = new Date();
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calYear, setCalYear] = useState(now.getFullYear());
  const todayStr = toLocalDateString(now);
  const activeDaysSet = useMemo(() => new Set(activeDays), [activeDays]);
  const monthGrid = useMemo(() => getMonthGrid(calYear, calMonth), [calYear, calMonth]);

  const isCurrentMonth = calMonth === now.getMonth() && calYear === now.getFullYear();

  const prevMonth = useCallback(() => {
    setCalMonth(m => m === 0 ? 11 : m - 1);
    if (calMonth === 0) setCalYear(y => y - 1);
  }, [calMonth]);

  const nextMonth = useCallback(() => {
    if (isCurrentMonth) return;
    setCalMonth(m => m === 11 ? 0 : m + 1);
    if (calMonth === 11) setCalYear(y => y + 1);
  }, [calMonth, isCurrentMonth]);

  // Milestone
  const nextMilestone = useMemo(() => {
    for (const m of streakMilestones) {
      if (currentStreak < m.days) return m;
    }
    return null;
  }, [currentStreak]);

  const milestoneProgress = nextMilestone
    ? Math.min((currentStreak / nextMilestone.days) * 100, 100)
    : 100;

  // Week count
  const thisWeekDays = useMemo(() => {
    const dayOfWeek = now.getDay();
    const mondayIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekDates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - mondayIdx + i);
      weekDates.push(toLocalDateString(d));
    }
    return activeDays.filter(d => weekDates.includes(d)).length;
  }, [activeDays, now]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-surface-950">
      <PageHeader
        title="Streak"
        icon={<StreakFlame state={flameState} size={22} />}
      />

      <div className="px-4 sm:px-5 pb-8">

        {/* ── Hero ── */}
        <motion.div
          className="flex items-center justify-between pt-6 pb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-extrabold tabular-nums"
                style={{
                  fontSize: 52,
                  lineHeight: 1,
                  color: currentStreak > 0 ? '#FF9600' : (dark ? '#475569' : '#CBD5E1'),
                }}
              >
                {currentStreak}
              </span>
            </div>
            <p className="text-lg font-extrabold text-surface-900 dark:text-surface-100 mt-0.5">
              day streak
            </p>
            <p className="text-sm font-semibold text-surface-400 dark:text-surface-500 mt-0.5">
              {heroMessage}
            </p>
          </div>
          <div className="flex-shrink-0">
            <StreakFlame state={flameState} size={72} />
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          className="grid grid-cols-3 gap-2.5 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
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
            <p className="text-xl font-extrabold text-accent-500 leading-none">{thisWeekDays}/7</p>
            <p className="text-[10px] font-bold text-surface-400 dark:text-surface-500 mt-1 uppercase tracking-wide">This Week</p>
          </div>
        </motion.div>

        {/* ── Calendar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5"
        >
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-base font-extrabold text-surface-900 dark:text-surface-100">
              Calendar
            </h2>
            {!isCurrentMonth && (
              <button
                onClick={() => { setCalMonth(now.getMonth()); setCalYear(now.getFullYear()); }}
                className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Today
              </button>
            )}
          </div>
          <div className="card rounded-2xl p-4">
            {/* Month header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              >
                <ChevronLeft className="w-4.5 h-4.5 text-surface-500" />
              </button>
              <p className="text-sm font-extrabold text-surface-900 dark:text-surface-100 uppercase tracking-wide">
                {MONTH_NAMES[calMonth]} {calYear}
              </p>
              <button
                onClick={nextMonth}
                className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                style={{ opacity: isCurrentMonth ? 0.3 : 1, pointerEvents: isCurrentMonth ? 'none' : 'auto' }}
              >
                <ChevronRight className="w-4.5 h-4.5 text-surface-500" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid mb-1.5" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {DAY_LABELS.map((d, i) => (
                <div key={i} className="text-center">
                  <span className="text-[11px] font-bold text-surface-400 dark:text-surface-500">{d}</span>
                </div>
              ))}
            </div>

            {/* Day grid */}
            {monthGrid.map((week, wi) => (
              <div key={wi} className="grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {week.map((day, di) => {
                  if (day === null) return <div key={di} className="h-10" />;
                  const ds = dateStr(calYear, calMonth, day);
                  const isActive = activeDaysSet.has(ds);
                  const isToday = ds === todayStr;
                  const isFuture = ds > todayStr;

                  return (
                    <div key={di} className="flex items-center justify-center h-10">
                      <div
                        className="flex items-center justify-center rounded-full transition-colors"
                        style={{
                          width: 32,
                          height: 32,
                          background: isActive
                            ? 'linear-gradient(135deg, #FBBF24, #D97706)'
                            : 'transparent',
                          border: isToday && !isActive
                            ? `2px solid ${dark ? '#475569' : '#D1D5DB'}`
                            : '2px solid transparent',
                          boxShadow: isActive ? '0 1px 4px rgba(217,119,6,0.25)' : 'none',
                        }}
                      >
                        <span
                          className="text-[13px] font-bold"
                          style={{
                            color: isActive
                              ? 'white'
                              : isFuture
                                ? (dark ? '#334155' : '#D1D5DB')
                                : isToday
                                  ? (dark ? '#F1F5F9' : '#3C3C3C')
                                  : (dark ? '#94A3B8' : '#6B7280'),
                          }}
                        >
                          {day}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Next Milestone ── */}
        {nextMilestone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-5"
          >
            <h2 className="text-base font-extrabold text-surface-900 dark:text-surface-100 mb-2.5">
              Next Milestone
            </h2>
            <div className="card rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
                  style={{ background: dark ? 'rgba(251,191,36,0.12)' : '#FFF8E8' }}
                >
                  <span className="text-xl">{nextMilestone.badgeIcon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-extrabold text-surface-900 dark:text-surface-100">
                    {nextMilestone.badgeName}
                  </p>
                  <p className="text-xs font-semibold text-surface-400 dark:text-surface-500">
                    Reach a {nextMilestone.days}-day streak
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-brand-500 flex-shrink-0">
                  <CurrencyIcon size={14} />
                  <span>+{nextMilestone.gems}</span>
                </div>
              </div>
              <ProgressBar percent={milestoneProgress} color="#D97706" height="h-2.5" />
              <p className="text-[11px] font-bold text-surface-400 dark:text-surface-500 mt-1.5 text-right">
                {currentStreak} / {nextMilestone.days} days
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Streak Freezes ── */}
        {streakEnhancements.freezesOwned > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card rounded-2xl px-4 py-3.5 flex items-center gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                style={{ background: dark ? 'rgba(59,130,246,0.12)' : '#EFF6FF' }}
              >
                <Snowflake className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-surface-900 dark:text-surface-100">
                  Streak Freeze{streakEnhancements.freezesOwned > 1 ? 's' : ''}
                </p>
                <p className="text-xs font-medium text-surface-400 dark:text-surface-500">
                  {streakEnhancements.freezesOwned} available — protects your streak if you miss a day
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
