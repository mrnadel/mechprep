'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { getLessonByIdMeta } from '@/data/course/course-meta';
import { useBackHandler } from '@/hooks/useBackHandler';
import { useEngagementActions } from '@/store/useEngagementStore';
import { TrialPromptModal } from '@/components/ui/TrialPromptModal';
import { GameButton } from '@/components/ui/GameButton';
import { ScreenFX } from '@/components/ui/ScreenFX';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';
import type { FXName } from '@/components/ui/ScreenFX';

export { ResultScreen };
export default function ResultScreen() {
  const lessonResult = useCourseStore((s) => s.lessonResult);
  const dismissResult = useCourseStore((s) => s.dismissResult);
  const { updateQuestProgress, updateLeagueXp, addGems } = useEngagementActions();
  const engagementTracked = useRef(false);

  useBackHandler(!!lessonResult, dismissResult);

  const lessonInfo = lessonResult ? getLessonByIdMeta(lessonResult.lessonId) : null;

  useEffect(() => {
    if (!lessonResult) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dismissResult(); }
    };
    const timer = setTimeout(() => window.addEventListener('keydown', handleKeyDown), 500);
    return () => { clearTimeout(timer); window.removeEventListener('keydown', handleKeyDown); };
  }, [lessonResult, dismissResult]);

  useEffect(() => {
    if (!lessonResult || engagementTracked.current) return;
    engagementTracked.current = true;
    updateLeagueXp(lessonResult.xpEarned);
    updateQuestProgress('xp_earned', lessonResult.xpEarned);
    if (lessonResult.passed) {
      updateQuestProgress('lessons_completed', 1);
      if (lessonResult.accuracy >= 90) updateQuestProgress('accuracy_above_threshold', 1, { threshold: 0.9 });
      if (lessonResult.accuracy >= 80) updateQuestProgress('accuracy_above_threshold', 1, { threshold: 0.8 });
      if (lessonResult.accuracy === 100 && lessonResult.totalQuestions >= 3) updateQuestProgress('perfect_sessions', 1);
      if (lessonResult.stars === 3) updateQuestProgress('stars_earned', 1);
      updateQuestProgress('topics_practiced', 1);
      if (lessonResult.isFirstCompletion && lessonResult.stars === 3) addGems(10, '3_star_first_time');
    }
  }, [lessonResult]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lessonResult) return null;

  const passed = lessonResult.passed;
  const isFlawless = lessonResult.isFlawless;
  const isGolden = lessonResult.isGolden;
  const lessonProgress = useCourseStore((s) => s.progress.completedLessons[lessonResult.lessonId]);
  const attempts = lessonProgress?.attempts ?? 1;

  // Design system colors
  const bg = !passed ? '#CE3030' : isFlawless ? '#5B4FCF' : isGolden ? '#E8850C' : '#58A700';
  const fx: FXName = !passed ? 'hearts' : isFlawless ? 'sparkle-dust' : isGolden ? 'golden-rain' : 'confetti';
  const mascotPose = !passed ? 'sad' as const : isFlawless ? 'celebrating' as const : isGolden ? 'excited' as const : 'laughing' as const;
  const btnVariant = !passed ? 'red' as const : 'gold' as const;

  const getMessage = () => {
    if (!passed) return 'Not Quite!';
    if (isFlawless && isGolden) return 'Flawless Mastery!';
    if (isFlawless) return 'Flawless!';
    if (isGolden) return 'Mastered!';
    if (attempts >= 3) return 'Golden Unlocked!';
    if (lessonResult.accuracy >= 90) return 'Perfect Score!';
    return 'Great Work!';
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="result-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex flex-col"
          style={{ zIndex: 9999, background: bg }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="result-heading"
        >
          <ScreenFX effect={fx} />

          {/* Content — upper area */}
          <div className="flex-1 flex flex-col items-center relative z-[1] px-6 pt-[12vh] sm:pt-10 text-center text-white">
            <motion.div
              className="mb-4"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
            >
              <MascotWithGlow pose={mascotPose} size={160} />
            </motion.div>

            <motion.h1
              id="result-heading"
              className="text-[28px] font-extrabold mb-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {getMessage()}
            </motion.h1>

            <motion.p
              className="text-sm text-white/50 font-semibold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {lessonResult.lessonTitle}
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex w-full max-w-xs bg-white/10 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex-1 py-4 text-center">
                <div className="text-2xl font-extrabold">{lessonResult.accuracy}%</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mt-1">Accuracy</div>
              </div>
              <div className="w-px bg-white/10 my-3" />
              <div className="flex-1 py-4 text-center">
                <motion.div
                  className="text-2xl font-extrabold"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.7 }}
                >
                  +{lessonResult.xpEarned}
                </motion.div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mt-1">XP</div>
              </div>
              <div className="w-px bg-white/10 my-3" />
              <div className="flex-1 py-4 text-center">
                <div className="text-2xl font-extrabold">{lessonResult.correctAnswers}/{lessonResult.totalQuestions}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mt-1">Correct</div>
              </div>
            </motion.div>

            {isFlawless && passed && (
              <motion.p className="mt-4 text-sm font-bold text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                Flawless! 4x XP bonus
              </motion.p>
            )}
          </div>

          {/* Footer — pinned bottom */}
          <div className="shrink-0 px-6 pb-8 sm:pb-5 relative z-[1]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              <GameButton variant={btnVariant} onClick={dismissResult}>
                {passed ? 'Continue' : 'Try Again'}
              </GameButton>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      {lessonResult.isFirstCompletion && lessonResult.passed && <TrialPromptModal />}
    </>
  );
}
