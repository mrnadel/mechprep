'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useCourseStore } from '@/store/useCourseStore';
import { useNudgeState, useEngagementStore } from '@/store/useEngagementStore';
import { getTodayDate } from '@/lib/quest-engine';
import { getDisplayName } from '@/lib/get-display-name';
import { playSound } from '@/lib/sounds';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';
import { GameButton } from '@/components/ui/GameButton';

/**
 * In-app banner for returning users who have been away 1-2 days.
 * Uses component state for dismissal (NOT store), per CR-C11.
 * Reads lastActiveDate from BOTH stores, per CR-C12.
 */
export function StreakNudgeBanner() {
  const nudge = useNudgeState();
  const today = getTodayDate();
  const router = useRouter();

  // Read from both stores — course-only users also need nudges (CR-C12)
  const practiceLastActive = useStore((s) => s.progress.lastActiveDate);
  const courseLastActive = useCourseStore((s) => s.progress.lastActiveDate);
  const lastActiveDate = (practiceLastActive || '') > (courseLastActive || '')
    ? practiceLastActive
    : courseLastActive;

  const currentStreak = useStore((s) => s.progress.currentStreak);
  const freezesOwned = useEngagementStore((s) => s.streak.freezesOwned);

  // Component state for dismissal — resets each session (CR-C11)
  const [dismissed, setDismissed] = useState(false);

  // Determine urgency
  const isDay1 = nudge.lastDay1NudgeDate === today && lastActiveDate !== today;
  const isDay2 = nudge.lastDay2NudgeDate === today && lastActiveDate !== today;

  // Play sound on mount
  useEffect(() => {
    if ((isDay1 || isDay2) && !dismissed) {
      playSound(isDay2 ? 'nudgeUrgent' : 'nudgeGentle');
    }
  }, [isDay1, isDay2, dismissed]);

  if (dismissed) return null;
  if (!isDay1 && !isDay2) return null;

  const name = getDisplayName();

  // Graduated messaging based on days away
  const getMessage = (): { heading: string; subtext: string } => {
    const daysAway = nudge.daysAway || (isDay2 ? 2 : 1);

    if (daysAway >= 7) {
      return {
        heading: `Welcome back, ${name}!`,
        subtext: 'Ready for a fresh start?',
      };
    }
    if (daysAway >= 4) {
      return {
        heading: "It's been a few days",
        subtext: 'One lesson is all it takes to get back on track!',
      };
    }
    if (isDay2) {
      return {
        heading: currentStreak > 0
          ? `Your ${currentStreak}-day streak breaks tomorrow!`
          : 'We missed you!',
        subtext: 'Your streak is waiting to be rebuilt.',
      };
    }
    // Day 1
    return {
      heading: 'Welcome back!',
      subtext: 'Start a quick lesson to keep your streak alive.',
    };
  };

  const { heading, subtext } = getMessage();

  const handleCTA = () => {
    setDismissed(true);
    // Start first lesson of current course
    const courseData = useCourseStore.getState().courseData;
    if (courseData.length > 0 && courseData[0].lessons.length > 0) {
      useCourseStore.getState().startLesson(0, 0);
    }
  };

  const handleUseFreeze = () => {
    useEngagementStore.getState().useStreakFreeze();
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        role="alert"
        aria-label={isDay2 ? 'Urgent streak warning' : 'Welcome back nudge'}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ willChange: 'transform, opacity' }}
        className={`
          relative overflow-hidden rounded-2xl border p-4
          ${isDay2
            ? 'bg-gradient-to-r from-amber-50 to-rose-50 border-amber-300 dark:from-amber-950/50 dark:to-rose-950/50 dark:border-amber-700'
            : 'bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800'
          }
        `}
      >
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 p-1 rounded-full text-surface-400 hover:text-surface-600 dark:text-surface-500 dark:hover:text-surface-300 transition-colors"
          aria-label="Dismiss nudge"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3">
          {/* Mascot */}
          <div className="flex-shrink-0">
            <MascotWithGlow
              pose={isDay2 ? 'worried' : 'winking'}
              size={48}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-6">
            <p className={`text-sm font-bold ${
              isDay2
                ? 'text-amber-900 dark:text-amber-100'
                : 'text-blue-900 dark:text-blue-100'
            }`}>
              {heading}
            </p>
            <p className={`text-xs mt-0.5 ${
              isDay2
                ? 'text-amber-700 dark:text-amber-300'
                : 'text-blue-700 dark:text-blue-300'
            }`}>
              {subtext}
            </p>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <GameButton
              variant={isDay2 ? 'gold' : 'indigo'}
              className="!text-xs !px-3 !py-1.5"
              onClick={handleCTA}
            >
              {isDay2 ? 'Save Streak' : 'Start'}
            </GameButton>
          </div>
        </div>

        {/* Day-2: streak freeze option */}
        {isDay2 && freezesOwned > 0 && (
          <button
            onClick={handleUseFreeze}
            className="mt-2 ml-[60px] text-xs text-amber-600 dark:text-amber-400 hover:underline"
          >
            or use a Streak Freeze ({freezesOwned} left)
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
