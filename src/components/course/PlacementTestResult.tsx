'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { useBackHandler } from '@/hooks/useBackHandler';
import { GameButton } from '@/components/ui/GameButton';
import { FloatingParticles } from '@/components/ui/FloatingParticles';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';

export default function PlacementTestResult() {
  const result = useCourseStore((s) => s.placementTestResult);
  const dismiss = useCourseStore((s) => s.dismissPlacementResult);

  useBackHandler(!!result, dismiss);

  // Enter / Space dismisses
  useEffect(() => {
    if (!result) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dismiss();
      }
    };
    const timer = setTimeout(() => window.addEventListener('keydown', handle), 500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handle);
    };
  }, [result, dismiss]);

  if (!result) return null;

  const passed = result.passed;

  return (
    <AnimatePresence>
      <motion.div
        key="placement-result"
        className="fixed inset-0 z-[70] flex flex-col overflow-hidden"
        style={{ background: passed ? '#58A700' : '#CE3030' }}
        role="dialog"
        aria-modal="true"
        aria-label="Placement test result"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
          <FloatingParticles
            color="rgba(255,255,255,0.06)"
            intensity={passed ? 'celebration' : 'subtle'}
          />

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center relative z-[1] p-6 text-white">
            {/* Mascot */}
            <motion.div
              className="mb-4"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              {passed ? (
                <MascotWithGlow pose="celebrating" size={120} flame />
              ) : (
                <MascotWithGlow pose="thinking" size={120} />
              )}
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl font-extrabold text-white text-center mb-1">
              {passed ? 'Placement Test Passed!' : 'Not quite yet'}
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-white/60 text-center mb-6">
              {passed
                ? `You unlocked ${result.targetUnitTitle}`
                : 'Work through the earlier units to build a stronger foundation.'}
            </p>

            {/* Stats */}
            {result.totalQuestions > 0 && (
              <div className="flex gap-6 mb-2">
                <Stat
                  label="Correct"
                  value={`${result.correctAnswers}/${result.totalQuestions}`}
                />
                <Stat
                  label="Mistakes"
                  value={`${result.mistakes}`}
                  highlight={result.mistakes >= result.maxMistakes}
                />
                {passed && (
                  <Stat label="Skipped" value={`${result.unitsSkipped} units`} />
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 px-6 pb-10 relative z-[1]">
            <GameButton
              variant={passed ? 'gold' : 'red'}
              onClick={dismiss}
            >
              {passed ? 'Continue' : 'Start from the beginning'}
            </GameButton>
          </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="text-center">
      <p
        className="text-xl font-extrabold"
        style={{ color: highlight ? '#FFB3B3' : '#fff' }}
      >
        {value}
      </p>
      <p className="text-[10px] font-bold uppercase tracking-wide text-white/50">
        {label}
      </p>
    </div>
  );
}
