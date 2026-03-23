'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { getLessonByIdMeta } from '@/data/course/course-meta';
import { getUnitTheme } from '@/lib/unitThemes';
import { useBackHandler } from '@/hooks/useBackHandler';
import { useEngagementActions } from '@/store/useEngagementStore';

export { ResultScreen };
export default function ResultScreen() {
  const lessonResult = useCourseStore((s) => s.lessonResult);
  const dismissResult = useCourseStore((s) => s.dismissResult);
  const startLesson = useCourseStore((s) => s.startLesson);
  const { updateQuestProgress, updateLeagueXp, addGems } = useEngagementActions();
  const engagementTracked = useRef(false);

  // Mobile back button dismisses result
  useBackHandler(!!lessonResult, dismissResult);

  const lessonInfo = lessonResult ? getLessonByIdMeta(lessonResult.lessonId) : null;

  useEffect(() => {
    if (!lessonResult) return;
    const info = lessonInfo;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!lessonResult.passed && info) {
          dismissResult();
          startLesson(info.unitIndex, info.lessonIndex);
        } else {
          dismissResult();
        }
      }
    };
    const timer = setTimeout(() => {
      window.addEventListener('keydown', handleKeyDown);
    }, 500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lessonResult, dismissResult, startLesson, lessonInfo]);

  // Track engagement metrics when lesson result appears (only on passing attempts)
  useEffect(() => {
    if (!lessonResult || engagementTracked.current) return;
    engagementTracked.current = true;

    // Always award XP and league XP (even on failure — multiplier handles reduced amount)
    updateLeagueXp(lessonResult.xpEarned);
    updateQuestProgress('xp_earned', lessonResult.xpEarned);

    // Quest/achievement progress only on passing attempts
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

  const theme = getUnitTheme(lessonInfo?.unitIndex ?? 0);
  const isGolden = lessonResult.isGolden;

  const lessonProgress = useCourseStore((s) => s.progress.completedLessons[lessonResult.lessonId]);
  const attempts = lessonProgress?.attempts ?? 1;

  const passed = lessonResult.passed;
  const isFlawless = lessonResult.isFlawless;
  const requiredCorrect = Math.ceil(lessonResult.totalQuestions * 0.7);

  const getMessage = () => {
    if (!passed) return 'Keep Practicing!';
    if (isFlawless && isGolden) return 'Flawless Mastery!';
    if (isFlawless) return 'Flawless!';
    if (isGolden) return 'Mastered!';
    if (attempts >= 3) return 'Golden Unlocked!';
    if (lessonResult.accuracy >= 90) return 'Perfect Score!';
    if (lessonResult.accuracy >= 70) return 'Great Work!';
    return 'Lesson Complete!';
  };

  // Theme-consistent accent colors (light bg, vibrant accents — matches app style)
  const accentColor = !passed ? '#FF4B4B' : isFlawless ? '#7B68EE' : isGolden ? '#FFB800' : theme.color;
  const accentDark = !passed ? '#CC2D2D' : isFlawless ? '#5C49CE' : isGolden ? '#996E00' : theme.dark;
  const accentBg = !passed ? '#FFE5E5' : isFlawless ? '#EDEAFF' : isGolden ? '#FFF5D4' : theme.bg;

  return (
    <AnimatePresence>
      <motion.div
        key="result-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-heading"
        style={{
          background: '#FAFAFA',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="w-full h-full max-w-3xl flex flex-col lg:shadow-lg">
          {/* Flawless sparkles */}
          {isFlawless && !isGolden && (
            <>
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`flawless-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.8, 0],
                    scale: [0, 1.2, 0.9, 0],
                    y: [0, -20 - Math.random() * 40, -40 - Math.random() * 30, -70],
                  }}
                  transition={{
                    duration: 2.5 + Math.random() * 1.5,
                    delay: 0.2 + Math.random() * 0.6,
                    repeat: Infinity,
                    repeatDelay: 0.8 + Math.random() * 1.5,
                  }}
                  style={{
                    position: 'absolute',
                    top: `${15 + Math.random() * 50}%`,
                    left: `${5 + Math.random() * 90}%`,
                    width: 5 + Math.random() * 5,
                    height: 5 + Math.random() * 5,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <svg viewBox="0 0 10 10" width="100%" height="100%">
                    <path
                      d="M5 0L6 4L10 5L6 6L5 10L4 6L0 5L4 4Z"
                      fill={['#7B68EE', '#9585F0', '#5C49CE', '#A78BFA'][i % 4]}
                      opacity={0.7}
                    />
                  </svg>
                </motion.div>
              ))}
            </>
          )}

          {/* Golden sparkles */}
          {isGolden && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.6, 0],
                    scale: [0, 1, 0.8, 0],
                    y: [0, -15 - Math.random() * 30, -30 - Math.random() * 20, -50],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1.5,
                    delay: 0.3 + Math.random() * 0.8,
                    repeat: Infinity,
                    repeatDelay: 1 + Math.random() * 2,
                  }}
                  style={{
                    position: 'absolute',
                    top: `${20 + Math.random() * 40}%`,
                    left: `${10 + Math.random() * 80}%`,
                    width: 4 + Math.random() * 4,
                    height: 4 + Math.random() * 4,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <svg viewBox="0 0 10 10" width="100%" height="100%">
                    <path
                      d="M5 0L6 4L10 5L6 6L5 10L4 6L0 5L4 4Z"
                      fill={i % 2 === 0 ? '#FFD54F' : '#FFA000'}
                      opacity={0.8}
                    />
                  </svg>
                </motion.div>
              ))}
            </>
          )}

          {/* Main content — centered vertically */}
          <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: '0 32px', position: 'relative', zIndex: 2 }}>
            {/* Icon */}
            <motion.div
              className="flex items-center justify-center"
              style={{
                width: 80,
                height: 80,
                borderRadius: 28,
                background: accentBg,
                border: `3px solid ${accentColor}30`,
                fontSize: 40,
                marginBottom: 20,
              }}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.15 }}
            >
              <motion.span
                animate={isGolden ? { rotate: [0, -5, 5, -3, 3, 0] } : undefined}
                transition={isGolden ? { duration: 1.2, delay: 0.6, ease: 'easeInOut' } : undefined}
                style={{ display: 'inline-block' }}
                aria-hidden="true"
              >
                {!passed ? '📚' : isFlawless ? '💎' : isGolden ? '👑' : lessonResult.stars === 3 ? '👑' : '🏆'}
              </motion.span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              id="result-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: accentDark,
                margin: '0 0 10px',
                textAlign: 'center',
              }}
            >
              {getMessage()}
            </motion.h1>

            {/* Lesson title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#AFAFAF',
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              {lessonResult.lessonTitle}
            </motion.div>

            {/* Progress dots */}
            <motion.div
              className="flex items-center"
              style={{ gap: 8, marginBottom: 32 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isGolden ? (
                <motion.svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.55 }}
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                    fill={accentColor}
                    strokeLinejoin="round"
                  />
                </motion.svg>
              ) : (
                [1, 2, 3].map((n) => (
                  <motion.div
                    key={n}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 15,
                      delay: 0.5 + n * 0.12,
                    }}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: n <= attempts ? accentColor : '#E5E5E5',
                    }}
                  />
                ))
              )}
            </motion.div>

            {/* Stats card */}
            <motion.div
              className="flex items-stretch"
              style={{
                background: '#FFFFFF',
                borderRadius: 20,
                border: `2px solid ${accentColor}20`,
                width: '100%',
                maxWidth: 320,
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Accuracy */}
              <div
                className="flex-1 flex flex-col items-center justify-center"
                style={{ padding: '16px 12px' }}
              >
                <div style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: accentDark,
                  lineHeight: 1,
                }}>
                  {lessonResult.accuracy}%
                </div>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#AFAFAF',
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  marginTop: 4,
                }}>
                  Accuracy
                </div>
              </div>

              {/* Divider */}
              <div style={{
                width: 1.5,
                background: '#E5E5E5',
                margin: '12px 0',
              }} />

              {/* XP */}
              <div
                className="flex-1 flex flex-col items-center justify-center"
                style={{ padding: '16px 12px' }}
              >
                <motion.div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: accentDark,
                    lineHeight: 1,
                  }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.7 }}
                >
                  +{lessonResult.xpEarned}
                </motion.div>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#AFAFAF',
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  marginTop: 4,
                }}>
                  XP
                </div>
              </div>

              {/* Divider */}
              <div style={{
                width: 1.5,
                background: '#E5E5E5',
                margin: '12px 0',
              }} />

              {/* Correct */}
              <div
                className="flex-1 flex flex-col items-center justify-center"
                style={{ padding: '16px 12px' }}
              >
                <div style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: accentDark,
                  lineHeight: 1,
                }}>
                  {lessonResult.correctAnswers}/{lessonResult.totalQuestions}
                </div>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#AFAFAF',
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  marginTop: 4,
                }}>
                  Correct
                </div>
              </div>
            </motion.div>

            {/* Failure hint */}
            {!passed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  fontWeight: 700,
                  color: accentDark,
                  textAlign: 'center',
                }}
              >
                Need {requiredCorrect}/{lessonResult.totalQuestions} correct to pass
              </motion.div>
            )}

            {/* Flawless bonus hint */}
            {isFlawless && passed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  fontWeight: 700,
                  color: accentDark,
                  textAlign: 'center',
                }}
              >
                💎 Flawless! 4x XP bonus
              </motion.div>
            )}

            {/* Achievement inline — subtle, no extra button */}
            {passed && !isFlawless && (isGolden || (!isGolden && attempts >= 3)) && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 700,
                  color: accentDark,
                  textAlign: 'center',
                }}
              >
                {isGolden ? '✨ Golden mastery unlocked!' : '👑 Golden challenge now available!'}
              </motion.div>
            )}
          </div>

          {/* Continue / Try Again button */}
          <motion.div
            style={{
              padding: '16px 24px',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)',
              position: 'relative',
              zIndex: 2,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={() => {
                if (!passed && lessonInfo) {
                  dismissResult();
                  startLesson(lessonInfo.unitIndex, lessonInfo.lessonIndex);
                } else {
                  dismissResult();
                }
              }}
              className="w-full transition-transform active:scale-[0.98]"
              style={{
                padding: '16px 0',
                borderRadius: 16,
                fontSize: 15,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                background: accentColor,
                color: '#FFFFFF',
                boxShadow: `0 4px 0 ${accentDark}`,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {passed ? 'Continue' : 'Try Again'}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
