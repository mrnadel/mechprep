'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { useBackHandler } from '@/hooks/useBackHandler';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
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
    <FullScreenModal
      show={true}
      bg={passed ? '#58A700' : '#CE3030'}
      fx={passed ? 'confetti' : 'hearts'}
      fullScreen
      labelId="placement-result-heading"
      footer={
        <GameButton variant={passed ? 'gold' : 'red'} onClick={dismiss}>
          {passed ? 'Continue' : 'Start from the beginning'}
        </GameButton>
      }
    >
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

      <h2 id="placement-result-heading" className="text-2xl font-extrabold mb-1">
        {passed ? 'Placement Test Passed!' : 'Not quite yet'}
      </h2>

      <p className="text-sm text-white/60 mb-6">
        {passed
          ? `You unlocked ${result.targetUnitTitle}`
          : 'Work through the earlier units to build a stronger foundation.'}
      </p>

      {result.totalQuestions > 0 && (
        <div className="flex w-full max-w-xs bg-white/10 rounded-2xl overflow-hidden">
          <div className="flex-1 py-4 text-center">
            <p className="text-xl font-extrabold">{result.correctAnswers}/{result.totalQuestions}</p>
            <p className="text-[10px] font-bold uppercase tracking-wide text-white/40 mt-1">Correct</p>
          </div>
          <div className="w-px bg-white/10 my-3" />
          <div className="flex-1 py-4 text-center">
            <p className="text-xl font-extrabold" style={{ color: result.mistakes >= result.maxMistakes ? '#FFB3B3' : '#fff' }}>
              {result.mistakes}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wide text-white/40 mt-1">Mistakes</p>
          </div>
          {passed && (
            <>
              <div className="w-px bg-white/10 my-3" />
              <div className="flex-1 py-4 text-center">
                <p className="text-xl font-extrabold">{result.unitsSkipped} units</p>
                <p className="text-[10px] font-bold uppercase tracking-wide text-white/40 mt-1">Skipped</p>
              </div>
            </>
          )}
        </div>
      )}
    </FullScreenModal>
  );
}

