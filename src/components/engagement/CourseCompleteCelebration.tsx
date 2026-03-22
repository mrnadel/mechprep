'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blueprints } from '@/data/blueprints';
import { getUnitTheme } from '@/lib/unitThemes';
import { useCourseStore } from '@/store/useCourseStore';
import { useBackHandler } from '@/hooks/useBackHandler';

interface Props {
  onDismiss: () => void;
}

function MiniBlueprint({ unitIndex, delay }: { unitIndex: number; delay: number }) {
  const blueprint = blueprints[unitIndex] ?? blueprints[0];
  const theme = getUnitTheme(unitIndex);
  const courseData = useCourseStore((s) => s.courseData);
  const title = courseData[unitIndex]?.title ?? blueprint.name;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <div
        className="w-full aspect-square rounded-2xl p-3 bg-white border border-surface-200 flex items-center justify-center"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
      >
        <svg
          viewBox={blueprint.viewBox}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {blueprint.paths.map((path, i) => (
            <motion.path
              key={i}
              d={path.d}
              fill="none"
              stroke={theme.dark}
              strokeWidth={path.strokeWidth ?? 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.6, delay: delay + 0.3 + i * 0.08, ease: 'easeInOut' },
                opacity: { duration: 0.1, delay: delay + 0.3 + i * 0.08 },
              }}
            />
          ))}
        </svg>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.8 }}
        className="mt-2 text-[11px] font-bold text-surface-500 text-center leading-tight"
      >
        {title}
      </motion.p>
    </motion.div>
  );
}

export function CourseCompleteCelebration({ onDismiss }: Props) {
  const [showButton, setShowButton] = useState(false);
  const totalUnits = blueprints.length;

  // Show button after all blueprints have drawn
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), totalUnits * 0.35 * 1000 + 3000);
    return () => clearTimeout(timer);
  }, [totalUnits]);

  useBackHandler(true, () => { if (showButton) onDismiss(); });

  const handleDismiss = useCallback(() => {
    if (showButton) onDismiss();
  }, [showButton, onDismiss]);

  // Confetti colors from unit themes
  const confettiColors = Array.from({ length: totalUnits }, (_, i) => getUnitTheme(i).color);

  return (
    <AnimatePresence>
      <motion.div
        key="course-complete"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-[#FAFAFA] overflow-y-auto"
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Confetti */}
        <div className="fixed inset-0 pointer-events-none z-[5]">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`cc-${i}`}
              initial={{ opacity: 0, y: -20, x: `${Math.random() * 100}vw`, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: ['0vh', `${60 + Math.random() * 40}vh`],
                scale: [0, 1, 0.8, 0.5],
                rotate: Math.random() * 720,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: 0.5 + Math.random() * 2,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                width: 6 + Math.random() * 8,
                height: 6 + Math.random() * 8,
                borderRadius: i % 3 === 0 ? '50%' : '2px',
                background: confettiColors[i % confettiColors.length],
              }}
            />
          ))}
        </div>

        <div className="max-w-md mx-auto px-5 py-10 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="text-xs font-extrabold tracking-[3px] uppercase text-[#58CC02] mb-2">
              Course complete
            </div>
            <h1 className="text-3xl font-black text-surface-900 mb-2">
              You did it.
            </h1>
            <p className="text-surface-400 text-sm font-semibold">
              Every chapter mastered. Here&apos;s everything you built along the way.
            </p>
          </motion.div>

          {/* Blueprint grid — all 10 drawings */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {Array.from({ length: totalUnits }, (_, i) => (
              <MiniBlueprint key={i} unitIndex={i} delay={0.5 + i * 0.35} />
            ))}
          </div>

          {/* Continue button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showButton ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <button
              onClick={handleDismiss}
              className="w-full max-w-xs py-4 text-white font-extrabold rounded-2xl text-[17px] tracking-wide transition-transform active:translate-y-[2px]"
              style={{
                background: '#58CC02',
                boxShadow: '0 5px 0 #46A302',
              }}
            >
              CONTINUE
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
