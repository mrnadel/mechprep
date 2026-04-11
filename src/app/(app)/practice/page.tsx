'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, useSessionActions } from '@/store/useStore';
import { useMistakeQuestionIds } from '@/store/useEngagementStore';
import { useCourseStore } from '@/store/useCourseStore';
import { useSubscription } from '@/hooks/useSubscription';
import SessionView from '@/components/session/SessionView';
import { UpgradeModal } from '@/components/ui/UpgradeModal';
import { FEATURES } from '@/lib/pricing';
import { Loader2, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

/** Practice unlocks after completing all lessons in the first section (sectionIndex 0). */
function useIsPracticeUnlocked(): { unlocked: boolean; progress: number; total: number } {
  const courseData = useCourseStore((s) => s.courseData);
  const completedLessons = useCourseStore((s) => s.progress.completedLessons);

  return useMemo(() => {
    // Get all units in section 0 (the first section)
    const section0Units = courseData.filter((u) => (u.sectionIndex ?? 0) === 0);
    if (section0Units.length === 0) return { unlocked: false, progress: 0, total: 0 };

    let total = 0;
    let completed = 0;
    for (const unit of section0Units) {
      for (const lesson of unit.lessons) {
        total++;
        if (completedLessons[lesson.id]?.passed) completed++;
      }
    }

    return { unlocked: completed >= total && total > 0, progress: completed, total };
  }, [courseData, completedLessons]);
}

export default function PracticePage() {
  const router = useRouter();
  const { session, sessionSummary } = useSession();
  const { startSession } = useSessionActions();
  const mistakeIds = useMistakeQuestionIds();
  const { canAccess } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { unlocked, progress, total } = useIsPracticeUnlocked();

  // If a session is active or summary is showing, render SessionView
  if (session || sessionSummary) {
    return <SessionView />;
  }

  // Locked state: show progress toward unlocking
  if (!unlocked) {
    return (
      <div className="bg-[#FAFAFA] dark:bg-surface-950">
        <div className="px-5 pt-5 pb-1">
          <h1 className="text-[22px] font-extrabold text-gray-800 dark:text-surface-50">Practice</h1>
        </div>

        <div className="px-4 pb-4 flex flex-col items-center pt-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-full bg-gray-100 dark:bg-surface-800 flex items-center justify-center mb-6"
          >
            <Lock size={40} className="text-gray-300 dark:text-surface-600" />
          </motion.div>

          <h2 className="text-xl font-extrabold text-gray-800 dark:text-surface-50 mb-2 text-center">
            Complete your first section to unlock
          </h2>
          <p className="text-sm text-gray-500 dark:text-surface-400 text-center mb-8 max-w-[280px]">
            Finish the intro lessons in your course, then come back to practice what you learned
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-[280px]">
            <div className="flex justify-between text-xs font-bold text-gray-400 dark:text-surface-400 mb-2">
              <span>Progress</span>
              <span>{progress} / {total} lessons</span>
            </div>
            <div className="h-3 rounded-full bg-gray-100 dark:bg-surface-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-brand-500"
                initial={{ width: 0 }}
                animate={{ width: total > 0 ? `${(progress / total) * 100}%` : '0%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          <button
            onClick={() => router.push('/')}
            className="mt-8 px-6 py-2.5 rounded-xl text-sm font-extrabold text-white bg-brand-500 active:translate-y-0.5 transition-transform"
            style={{ boxShadow: '0 4px 0 var(--color-brand-700)' }}
          >
            Continue Learning
          </button>
        </div>
      </div>
    );
  }

  function handleStartPractice() {
    setLoading(true);
    startSession('smart-practice');
  }

  function handleMistakes() {
    if (!canAccess(FEATURES.PRACTICE_MISTAKES)) {
      setShowUpgrade(true);
      return;
    }
    startSession('smart-practice');
  }

  function handleReview() {
    if (!canAccess(FEATURES.PRACTICE_REVIEW)) {
      setShowUpgrade(true);
      return;
    }
    router.push('/practice/review');
  }

  function handleDaily() {
    router.push('/practice/daily');
  }

  return (
    <div className="bg-[#FAFAFA] dark:bg-surface-950">
      {/* Header */}
      <div className="px-5 pt-5 pb-1">
        <h1 className="text-[22px] font-extrabold text-gray-800 dark:text-surface-50">Practice</h1>
      </div>

      <div className="px-4 pb-4">
        {/* TODAY'S PRACTICE */}
        <p className="text-xs font-extrabold text-gray-400 dark:text-surface-400 uppercase tracking-wider px-1 pt-5 pb-3">
          Today&apos;s Practice
        </p>

        {/* Featured Smart Practice Card */}
        <button
          onClick={handleStartPractice}
          disabled={loading}
          className="w-full text-left rounded-2xl p-6 relative overflow-hidden border-2 border-[rgba(108,99,255,0.3)] mb-4"
          style={{ background: 'linear-gradient(135deg, #1a1a3e 0%, #2d1b4e 40%, #3b1d5e 100%)' }}
        >
          <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full" style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)' }} />
          <span className="inline-block text-[11px] font-extrabold text-[#6C63FF] bg-[rgba(108,99,255,0.2)] px-2.5 py-1 rounded-md mb-3 tracking-wide">
            PERSONALIZED
          </span>
          <h2 className="text-2xl font-extrabold text-white mb-2">Smart Practice</h2>
          <p className="text-sm text-white/60 font-medium mb-5 max-w-[220px]">
            Questions picked just for you based on what you need most
          </p>
          <span
            className="inline-flex items-center gap-2 bg-[#6C63FF] text-white text-sm font-extrabold px-6 py-2.5 rounded-xl uppercase tracking-wide relative z-10 active:translate-y-1 active:shadow-none transition-transform"
            style={{ boxShadow: '0 4px 0 #4a3fd0' }}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Start'}
          </span>
          <div className="absolute right-4 bottom-4 w-[90px] h-[90px] rounded-2xl bg-[rgba(108,99,255,0.15)] flex items-center justify-center text-5xl">
            🧠
          </div>
        </button>

        {/* YOUR COLLECTIONS */}
        <p className="text-xs font-extrabold text-gray-400 dark:text-surface-400 uppercase tracking-wider px-1 pt-4 pb-3">
          Your collections
        </p>

        {/* Mistakes Card */}
        <button
          onClick={handleMistakes}
          className="w-full flex items-center gap-3.5 rounded-2xl border border-gray-100 dark:border-surface-700 p-4 mb-3 relative overflow-hidden text-left bg-white dark:bg-surface-900"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #FF9600, #FF6B00)' }}
          >
            🔄
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-extrabold text-gray-800 dark:text-surface-50 flex items-center gap-1.5">
              Mistakes
              {!canAccess(FEATURES.PRACTICE_MISTAKES) && <Lock size={14} className="text-gray-400 dark:text-surface-400" />}
            </h3>
            <p className="text-xs text-gray-500 dark:text-surface-400 font-medium mt-0.5">
              Practice the questions you got wrong recently
            </p>
          </div>
          {mistakeIds.length > 0 && (
            <span className="absolute top-3 right-3 bg-[#FF4B4B] text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">
              {mistakeIds.length}
            </span>
          )}
        </button>

        {/* Daily Challenge Card */}
        <button
          onClick={handleDaily}
          className="w-full flex items-center gap-3.5 rounded-2xl border border-gray-100 dark:border-surface-700 p-4 mb-3 text-left bg-white dark:bg-surface-900"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #58CC02, #46A302)' }}
          >
            ⚡
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-extrabold text-gray-800 dark:text-surface-50">Daily Challenge</h3>
            <p className="text-xs text-gray-500 dark:text-surface-400 font-medium mt-0.5">
              5 themed questions, new every day
            </p>
          </div>
        </button>

        {/* Review Card */}
        <button
          onClick={handleReview}
          className="w-full flex items-center gap-3.5 rounded-2xl border border-gray-100 dark:border-surface-700 p-4 mb-3 text-left bg-white dark:bg-surface-900"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-[28px] flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #CE82FF, #A855F7)' }}
          >
            🔮
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-extrabold text-gray-800 dark:text-surface-50 flex items-center gap-1.5">
              Review
              {!canAccess(FEATURES.PRACTICE_REVIEW) && <Lock size={14} className="text-gray-400 dark:text-surface-400" />}
            </h3>
            <p className="text-xs text-gray-500 dark:text-surface-400 font-medium mt-0.5">
              Revisit topics before you forget them
            </p>
          </div>
        </button>
      </div>

      {showUpgrade && <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />}
    </div>
  );
}
