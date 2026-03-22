'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { getLessonById } from '@/data/course';
import { getUnitTheme } from '@/lib/unitThemes';
import { useBackHandler } from '@/hooks/useBackHandler';
import { ContinuationHooks } from '@/components/engagement/ContinuationHooks';
import { useEngagementActions } from '@/store/useEngagementStore';

export { ResultScreen };
export default function ResultScreen() {
  const lessonResult = useCourseStore((s) => s.lessonResult);
  const dismissResult = useCourseStore((s) => s.dismissResult);
  const { updateQuestProgress, updateLeagueXp, addGems } = useEngagementActions();
  const engagementTracked = useRef(false);

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

  // Track engagement metrics when lesson result appears
  useEffect(() => {
    if (!lessonResult || engagementTracked.current) return;
    engagementTracked.current = true;

    // Quest tracking
    updateQuestProgress('lessons_completed', 1);
    updateLeagueXp(lessonResult.xpEarned);
    updateQuestProgress('xp_earned', lessonResult.xpEarned);
    if (lessonResult.accuracy >= 80) updateQuestProgress('accuracy_above_threshold', 1);
    if (lessonResult.accuracy === 100 && lessonResult.totalQuestions >= 3) updateQuestProgress('perfect_sessions', 1);
    if (lessonResult.stars === 3) updateQuestProgress('stars_earned', 1);
    updateQuestProgress('topics_practiced', 1);

    // Gem awards
    if (lessonResult.isFirstCompletion && lessonResult.stars === 3) addGems(10, '3_star_first_time');
  }, [lessonResult]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lessonResult) return null;

  const lessonInfo = getLessonById(lessonResult.lessonId);
  const theme = getUnitTheme(lessonInfo?.unitIndex ?? 0);

  const isGolden = lessonResult.isGolden;

  // Get attempt info from store for messaging
  const lessonProgress = useCourseStore((s) => s.progress.completedLessons[lessonResult.lessonId]);
  const attempts = lessonProgress?.attempts ?? 1;

  const getMessage = () => {
    if (isGolden) return 'Mastered!';
    if (attempts >= 3) return 'Golden Unlocked!';
    if (lessonResult.accuracy >= 90) return 'Perfect Score!';
    if (lessonResult.accuracy >= 70) return 'Great Work!';
    return 'Lesson Complete!';
  };

  // Golden overrides for theme colors
  const accentColor = isGolden ? '#FFB800' : theme.color;
  const accentDark = isGolden ? '#B8860B' : theme.dark;

  return (
    <AnimatePresence>
      <motion.div
        key="result-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: 'white',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="w-full h-full max-w-3xl flex flex-col bg-white lg:shadow-lg lg:border-x lg:border-gray-200">
        {/* Colored header area */}
        <div
          className={`flex flex-col items-center ${isGolden ? 'golden-result-header' : ''}`}
          style={{
            background: isGolden ? undefined : theme.bg,
            padding: '36px 24px 28px',
            position: 'relative',
          }}
        >
          {/* Golden sparkle particles */}
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
                    top: `${20 + Math.random() * 50}%`,
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

          {/* Icon */}
          <motion.div
            className="flex items-center justify-center"
            style={{
              width: 72,
              height: 72,
              borderRadius: 24,
              background: isGolden
                ? '#CC9400'
                : accentColor,
              boxShadow: isGolden
                ? '0 6px 0 #996E00'
                : `0 6px 0 ${accentDark}`,
              fontSize: 36,
              marginBottom: 16,
              position: 'relative',
              zIndex: 2,
            }}
            initial={{ scale: 0, rotate: -20 }}
            animate={isGolden ? { scale: 1, rotate: 0 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.15 }}
          >
            <motion.span
              animate={isGolden ? { rotate: [0, -5, 5, -3, 3, 0] } : undefined}
              transition={isGolden ? { duration: 1.2, delay: 0.6, ease: 'easeInOut' } : undefined}
              style={{ display: 'inline-block' }}
            >
              {isGolden ? '\uD83D\uDC51' : lessonResult.stars === 3 ? '\uD83D\uDC51' : '\uD83C\uDFC6'}
            </motion.span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={isGolden ? 'golden-text' : ''}
            style={{
              fontSize: isGolden ? 28 : 24,
              fontWeight: 800,
              color: isGolden ? undefined : accentDark,
              margin: '0 0 8px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {getMessage()}
          </motion.h1>

          {/* Stars as dots (or golden star for golden completion) */}
          <motion.div
            className="flex items-center"
            style={{ gap: 6, position: 'relative', zIndex: 2 }}
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
                className="golden-star-pulse"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.55 }}
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                  fill="#FFB800"
                  stroke="#C8960B"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </motion.svg>
            ) : (
              [1, 2, 3].map((starNum) => {
                const earned = starNum <= attempts;
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
              })
            )}
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
                  color: accentColor,
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
          {(lessonResult.isNewBest || lessonResult.isFirstCompletion || isGolden || (!isGolden && attempts >= 3)) && (
            <div className="flex flex-col" style={{ gap: 8, marginTop: 12 }}>
              {isGolden && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center golden-achievement"
                  style={{
                    gap: 8,
                    padding: '10px 14px',
                    borderRadius: 14,
                  }}
                >
                  <motion.span
                    style={{ fontSize: 16, display: 'inline-block' }}
                    animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
                    transition={{ duration: 1, delay: 1.2, ease: 'easeInOut' }}
                  >
                    {'\uD83D\uDC51'}
                  </motion.span>
                  <span className="golden-text" style={{ fontSize: 13, fontWeight: 800 }}>
                    Golden mastery unlocked!
                  </span>
                </motion.div>
              )}
              {!isGolden && attempts >= 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center"
                  style={{
                    gap: 8,
                    padding: '10px 14px',
                    borderRadius: 14,
                    background: '#FFF8E1',
                    border: '1.5px solid #FFD54F',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{'\uD83D\uDC51'}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#B8860B' }}>
                    Golden challenge now available!
                  </span>
                </motion.div>
              )}
              {!isGolden && attempts < 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center"
                  style={{
                    gap: 8,
                    padding: '10px 14px',
                    borderRadius: 14,
                    background: theme.bg,
                    border: `1.5px solid ${theme.color}40`,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{'\u2B50'}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: theme.dark }}>
                    {attempts}/3 — {3 - attempts} more to unlock golden!
                  </span>
                </motion.div>
              )}
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
            </div>
          )}

          {/* Continuation hooks */}
          <div style={{ marginTop: 12 }}>
            <ContinuationHooks />
          </div>
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
            className={`w-full transition-transform active:scale-[0.98] ${isGolden ? 'golden-btn' : ''}`}
            style={{
              padding: '14px 0',
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              background: isGolden ? undefined : accentColor,
              color: '#FFFFFF',
              boxShadow: isGolden ? undefined : `0 4px 0 ${accentDark}`,
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            Continue
          </button>
        </motion.div>
        </div>{/* end centered wrapper */}
      </motion.div>
    </AnimatePresence>
  );
}
