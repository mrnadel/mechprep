'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { getLessonById } from '@/data/course';
import { getUnitTheme } from '@/lib/unitThemes';
import { useBackHandler } from '@/hooks/useBackHandler';

export { ResultScreen };
export default function ResultScreen() {
  const lessonResult = useCourseStore((s) => s.lessonResult);
  const dismissResult = useCourseStore((s) => s.dismissResult);

  // Mobile back button dismisses result
  useBackHandler(!!lessonResult, dismissResult);

  useEffect(() => {
    if (!lessonResult) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dismissResult();
      }
    };
    const timer = setTimeout(() => {
      window.addEventListener('keydown', handleKeyDown);
    }, 500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lessonResult, dismissResult]);

  if (!lessonResult) return null;

  const lessonInfo = getLessonById(lessonResult.lessonId);
  const theme = getUnitTheme(lessonInfo?.unitIndex ?? 0);

  const getMessage = () => {
    if (lessonResult.stars === 3) return 'Perfect Score!';
    if (lessonResult.stars === 2) return 'Great Work!';
    return 'Lesson Complete!';
  };

  return (
    <AnimatePresence>
      <motion.div
        key="result-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex flex-col"
        style={{
          background: 'white',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Colored header area */}
        <div
          className="flex flex-col items-center"
          style={{
            background: theme.bg,
            padding: '36px 24px 28px',
          }}
        >
          {/* Icon */}
          <motion.div
            className="flex items-center justify-center"
            style={{
              width: 72,
              height: 72,
              borderRadius: 24,
              background: theme.color,
              boxShadow: `0 6px 0 ${theme.dark}`,
              fontSize: 36,
              marginBottom: 16,
            }}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.15 }}
          >
            {lessonResult.stars === 3 ? '\uD83D\uDC51' : '\uD83C\uDFC6'}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: theme.dark,
              margin: '0 0 8px',
            }}
          >
            {getMessage()}
          </motion.h1>

          {/* Stars as dots */}
          <motion.div
            className="flex items-center"
            style={{ gap: 6 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[1, 2, 3].map((starNum) => {
              const earned = starNum <= lessonResult.stars;
              return (
                <motion.div
                  key={starNum}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                    delay: 0.5 + starNum * 0.12,
                  }}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: earned ? theme.color : `${theme.color}35`,
                  }}
                />
              );
            })}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="flex-1 flex flex-col"
          style={{ padding: '20px 20px 0' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Lesson info */}
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#AFAFAF',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 2,
            }}
          >
            {lessonResult.unitTitle}
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: '#3C3C3C',
              marginBottom: 20,
            }}
          >
            {lessonResult.lessonTitle}
          </div>

          {/* Stat rows */}
          <div
            style={{
              borderRadius: 16,
              border: '2px solid #E5E5E5',
              overflow: 'hidden',
            }}
          >
            {/* Accuracy */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: '14px 16px',
                borderBottom: '1.5px solid #F0F0F0',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: '#777' }}>
                Accuracy
              </span>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color:
                    lessonResult.accuracy >= 90
                      ? '#58CC02'
                      : lessonResult.accuracy >= 70
                        ? '#FF9600'
                        : '#FF4B4B',
                }}
              >
                {lessonResult.accuracy}%
              </span>
            </div>

            {/* Questions */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: '14px 16px',
                borderBottom: '1.5px solid #F0F0F0',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: '#777' }}>
                Questions
              </span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#3C3C3C' }}>
                {lessonResult.correctAnswers}/{lessonResult.totalQuestions}
              </span>
            </div>

            {/* XP */}
            <div
              className="flex items-center justify-between"
              style={{ padding: '14px 16px' }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: '#777' }}>
                XP earned
              </span>
              <motion.span
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: theme.color,
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.8 }}
              >
                +{lessonResult.xpEarned}
              </motion.span>
            </div>
          </div>

          {/* Achievement badges */}
          {(lessonResult.isNewBest || lessonResult.isFirstCompletion) && (
            <div className="flex flex-col" style={{ gap: 8, marginTop: 12 }}>
              {lessonResult.isNewBest && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-center"
                  style={{
                    gap: 8,
                    padding: '10px 14px',
                    borderRadius: 14,
                    background: '#FFF5D4',
                    border: '1.5px solid #FFE4B8',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{'\uD83C\uDFC6'}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#B56E00' }}>
                    New personal best!
                  </span>
                </motion.div>
              )}
              {lessonResult.isFirstCompletion && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="flex items-center"
                  style={{
                    gap: 8,
                    padding: '10px 14px',
                    borderRadius: 14,
                    background: theme.bg,
                    border: `1.5px solid ${theme.color}40`,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{'\uD83C\uDFAF'}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: theme.dark }}>
                    First time completing!
                  </span>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Continue button */}
        <motion.div
          style={{
            padding: '16px 20px',
            paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 20px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={dismissResult}
            className="w-full transition-transform active:scale-[0.98]"
            style={{
              padding: '14px 0',
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              background: theme.color,
              color: '#FFFFFF',
              boxShadow: `0 4px 0 ${theme.dark}`,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Continue
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
