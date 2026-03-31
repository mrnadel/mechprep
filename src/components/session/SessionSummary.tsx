'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { SessionSummary as SessionSummaryType } from '@/store/useStore';
import { useSessionActions, useStore } from '@/store/useStore';
import { useBackHandler } from '@/hooks/useBackHandler';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useEngagementActions } from '@/store/useEngagementStore';
import { analytics } from '@/lib/mixpanel';
import { achievements } from '@/data/achievements';
import { playSound } from '@/lib/sounds';
import { useAdManager } from '@/components/ads/useAdManager';
import { InterstitialAd } from '@/components/ads/InterstitialAd';

interface Props {
  summary: SessionSummaryType;
}

const PRACTICE_THEME = {
  color: '#3B82F6',
  dark: '#1D4ED8',
};

function getGrade(accuracy: number) {
  if (accuracy >= 90) return { label: 'Outstanding!', icon: '👑', color: '#10B981', dark: '#059669' };
  if (accuracy >= 75) return { label: 'Great Work!', icon: '🏆', color: '#3B82F6', dark: '#1D4ED8' };
  if (accuracy >= 60) return { label: 'Good Progress!', icon: '💪', color: '#F59E0B', dark: '#B45309' };
  return { label: 'Keep Practicing!', icon: '📚', color: '#8B5E5E', dark: '#5C3D3D' };
}

export default function SessionSummary({ summary }: Props) {
  const { startSession, abandonSession } = useSessionActions();
  const { updateQuestProgress, updateLeagueXp } = useEngagementActions();
  const router = useRouter();
  const tracked = useRef(false);
  const adTracked = useRef(false);
  const [showingAd, setShowingAd] = useState(false);
  const { shouldShowAd, recordCompletion, recordAdShown } = useAdManager();

  // Record completion for ad frequency tracking (once per summary)
  useEffect(() => {
    if (adTracked.current) return;
    adTracked.current = true;
    recordCompletion();
  }, [recordCompletion]);

  const handleBack = useCallback(() => {
    abandonSession();
    router.replace('/');
  }, [abandonSession, router]);

  const handleContinue = useCallback(() => {
    if (shouldShowAd) {
      setShowingAd(true);
      recordAdShown();
    } else {
      handleBack();
    }
  }, [shouldShowAd, recordAdShown, handleBack]);

  useBackHandler(true, handleContinue);
  useScrollLock(true);

  // Keyboard: Enter/Space to continue
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleContinue();
      }
    };
    const timer = setTimeout(() => {
      window.addEventListener('keydown', handleKeyDown);
    }, 500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleContinue]);

  // Sound on mount
  useEffect(() => { playSound('sessionComplete'); }, []);

  // Track engagement metrics (fires once)
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    updateQuestProgress('sessions_completed', 1);
    updateQuestProgress('questions_correct', summary.questionsCorrect);
    updateLeagueXp(summary.xpEarned);
    updateQuestProgress('xp_earned', summary.xpEarned);
    if (summary.accuracy >= 90) updateQuestProgress('accuracy_above_threshold', 1, { threshold: 0.9 });
    if (summary.accuracy >= 80) updateQuestProgress('accuracy_above_threshold', 1, { threshold: 0.8 });
    if (summary.accuracy === 100 && summary.questionsAttempted >= 3) updateQuestProgress('perfect_sessions', 1);
    updateQuestProgress('topics_practiced', 1);
    if (summary.type === 'daily-challenge') updateQuestProgress('daily_challenges_completed', 1);
    // streak_days: use absolute mode to set progress to the current streak value,
    // preventing multi-session-per-day inflation (quest target is 7 for a full week)
    const currentStreak = useStore.getState().progress.currentStreak;
    if (currentStreak > 0) updateQuestProgress('streak_days', currentStreak, { _absolute: true });

    const grade = getGrade(summary.accuracy);
    analytics.session({
      status: 'completed',
      mode: summary.type,
      questionsAttempted: summary.questionsAttempted,
      questionsCorrect: summary.questionsCorrect,
      accuracy: summary.accuracy,
      xpEarned: summary.xpEarned,
      durationSeconds: summary.duration,
      grade: grade.label,
    });
    summary.newAchievements.forEach((id) => {
      const achievement = achievements.find((a) => a.id === id);
      analytics.milestone({ type: 'achievement', name: achievement?.name ?? id });
    });
    if (summary.newLevel) {
      analytics.milestone({ type: 'level_up' });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const grade = getGrade(summary.accuracy);
  const bgColor = grade.color;
  const darkColor = grade.dark;
  const isFlawless = summary.accuracy === 100 && summary.questionsAttempted >= 3;

  return (
    <>
    <AnimatePresence>
      <motion.div
        key="session-summary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] flex items-center justify-center"
        style={{
          background: bgColor,
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="w-full h-full max-w-3xl flex flex-col lg:shadow-lg">
          {/* Flawless sparkles */}
          {isFlawless && (
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
                      fill={['#C4B5FD', '#A78BFA', '#818CF8', '#E9D5FF'][i % 4]}
                      opacity={0.9}
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
                background: 'rgba(255,255,255,0.25)',
                fontSize: 40,
                marginBottom: 20,
              }}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.15 }}
            >
              <motion.span style={{ display: 'inline-block' }}>
                {isFlawless ? '💎' : grade.icon}
              </motion.span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '0 0 10px',
                textAlign: 'center',
              }}
            >
              {isFlawless ? 'Flawless!' : grade.label}
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              Practice Session Complete
            </motion.div>

            {/* Stats card */}
            <motion.div
              className="flex items-stretch"
              style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 20,
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
                <div style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                  {summary.accuracy}%
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 4 }}>
                  Accuracy
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: 1.5, background: 'rgba(255,255,255,0.15)', margin: '12px 0' }} />

              {/* XP */}
              <div
                className="flex-1 flex flex-col items-center justify-center"
                style={{ padding: '16px 12px' }}
              >
                <motion.div
                  style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.7 }}
                >
                  +{summary.xpEarned}
                </motion.div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 4 }}>
                  XP
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: 1.5, background: 'rgba(255,255,255,0.15)', margin: '12px 0' }} />

              {/* Correct */}
              <div
                className="flex-1 flex flex-col items-center justify-center"
                style={{ padding: '16px 12px' }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                  {summary.questionsCorrect}/{summary.questionsAttempted}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 4 }}>
                  Correct
                </div>
              </div>
            </motion.div>

            {/* Flawless bonus */}
            {isFlawless && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ marginTop: 16, fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)', textAlign: 'center' }}
              >
                💎 Flawless! Perfect score
              </motion.div>
            )}

            {/* New achievements */}
            {summary.newAchievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                style={{ marginTop: 16, textAlign: 'center' }}
              >
                {summary.newAchievements.map((id) => {
                  const achievement = achievements.find((a) => a.id === id);
                  return (
                    <div
                      key={id}
                      style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 4 }}
                    >
                      {achievement?.icon ?? '⭐'} {achievement?.name ?? id}
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Level up */}
            {summary.newLevel && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                style={{ marginTop: 16, fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)', textAlign: 'center' }}
              >
                ⚡ Level Up!
              </motion.div>
            )}
          </div>

          {/* Bottom buttons */}
          <motion.div
            style={{
              padding: '16px 24px',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)',
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              gap: 12,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={handleContinue}
              className="flex-1 transition-transform active:scale-[0.98]"
              style={{
                padding: '16px 0',
                borderRadius: 16,
                fontSize: 15,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                background: '#FFFFFF',
                color: darkColor,
                boxShadow: `0 4px 0 ${darkColor}40`,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Continue
            </button>
            <button
              onClick={() => startSession(summary.type)}
              className="flex-1 transition-transform active:scale-[0.98]"
              style={{
                padding: '16px 0',
                borderRadius: 16,
                fontSize: 15,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                background: 'rgba(255,255,255,0.25)',
                color: '#FFFFFF',
                boxShadow: `0 4px 0 ${darkColor}30`,
                border: '2px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
              }}
            >
              Again
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
    <InterstitialAd
      show={showingAd}
      onClose={() => { setShowingAd(false); handleBack(); }}
    />
    </>
  );
}
