'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { StreakFlame } from '@/components/icons/StreakFlame';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';
import { useStore } from '@/store/useStore';
import { toLocalDateString } from '@/lib/utils';
import { playSound } from '@/lib/sounds';

interface Props {
  streak: number;
  onClose: () => void;
}

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

export function StreakContinued({ streak, onClose }: Props) {
  const storedActiveDays = useStore((s) => s.progress.activeDays) ?? [];
  const weekDays = useMemo(() => getWeekDays(), []);

  // Derive active days from streak count when activeDays array lacks history.
  // If streak is N, the last N consecutive days (up to today) must have been active.
  const activeDays = useMemo(() => {
    const streakDates = new Set(storedActiveDays);
    const today = new Date();
    for (let i = 0; i < streak; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      streakDates.add(toLocalDateString(d));
    }
    return [...streakDates];
  }, [storedActiveDays, streak]);

  useEffect(() => { playSound('streakMilestone'); }, []);

  const getMessage = () => {
    if (streak >= 100) return 'Legendary!';
    if (streak >= 30) return 'Unstoppable!';
    if (streak >= 14) return 'On fire!';
    if (streak >= 7) return 'Great streak!';
    if (streak >= 3) return 'Keep it up!';
    return 'Streak alive!';
  };

  const mascotPose = streak >= 14 ? 'celebrating' as const : 'streak' as const;

  return (
    <FullScreenModal
      show
      bg="#FF9600"
      fx="confetti"
      labelId="streak-continued-title"
      footer={<GameButton variant="gold" onClick={onClose}>Continue</GameButton>}
    >
      {/* Mascot */}
      <motion.div
        className="mb-2"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
      >
        <MascotWithGlow pose={mascotPose} size={120} />
      </motion.div>

      {/* Streak count with flame */}
      <motion.div
        className="flex items-center gap-2 mb-1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 0.25 }}
      >
        <StreakFlame state="active" size={48} />
        <span className="text-[56px] font-extrabold text-white leading-none">{streak}</span>
      </motion.div>

      <motion.p
        className="text-sm font-bold text-white/60 uppercase tracking-widest mb-1"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        day streak
      </motion.p>

      <motion.h2
        id="streak-continued-title"
        className="text-[22px] font-extrabold text-white mb-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {getMessage()}
      </motion.h2>

      {/* Week calendar */}
      <motion.div
        className="flex gap-2 w-full max-w-xs justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {weekDays.map((day, i) => {
          const isActive = activeDays.includes(day.dateStr);
          const isCurrent = day.isToday;
          return (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.55 + i * 0.04, type: 'spring', stiffness: 300, damping: 18 }}
            >
              <span className="text-[10px] font-bold text-white/50">{day.label}</span>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  isCurrent
                    ? 'ring-2 ring-white'
                    : ''
                }`}
                style={{
                  background: isActive
                    ? 'rgba(255,255,255,0.3)'
                    : day.isFuture
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(255,255,255,0.12)',
                }}
              >
                {isActive ? (
                  <StreakFlame state="active" size={18} />
                ) : day.isFuture ? (
                  <div className="w-2 h-2 rounded-full bg-white/15" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white/25" />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </FullScreenModal>
  );
}
