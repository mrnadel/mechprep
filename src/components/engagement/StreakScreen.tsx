'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Gem, Zap, Trophy, Check, X } from 'lucide-react';
import { StreakFlame } from '@/components/icons/StreakFlame';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';
import { GameButton } from '@/components/ui/GameButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { useStore } from '@/store/useStore';
import { useCourseStore } from '@/store/useCourseStore';
import { useEngagementStore, useStreakEnhancements } from '@/store/useEngagementStore';
import { useIsDark } from '@/store/useThemeStore';
import { streakMilestones } from '@/data/streak-milestones';
import { getStreakStatus, toLocalDateString, getYesterdayString } from '@/lib/utils';
import { awardStreakMilestones } from '@/lib/streak-rewards';
import type { CourseQuestion } from '@/data/course/types';
import type { StreakState } from '@/components/icons/StreakFlame';

// ─── Week calendar helper ─────────────────────────────────────

function getWeekDays() {
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const todayIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  return labels.map((label, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - todayIdx + i);
    const dateStr = toLocalDateString(d);
    return { label, isToday: i === todayIdx, isFuture: i > todayIdx, dateStr };
  });
}

// ─── Question gathering for streak challenge ──────────────────

function gatherChallengeQuestions(): CourseQuestion[] {
  const courseData = useCourseStore.getState().courseData;
  const all: CourseQuestion[] = [];
  for (const unit of courseData) {
    for (const lesson of unit.lessons) {
      for (const q of lesson.questions) {
        if (q.type === 'multiple-choice' && q.options && q.options.length >= 2) {
          all.push(q);
        }
      }
    }
  }
  return all;
}

function pickRandomQuestions(pool: CourseQuestion[], count: number): CourseQuestion[] {
  if (pool.length <= count) return [...pool];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ─── Streak update logic ──────────────────────────────────────

function updateStreakForChallenge(): { newStreak: number; wasAlreadyActive: boolean } {
  const today = toLocalDateString(new Date());
  const progress = useStore.getState().progress;
  const lastActive = progress.lastActiveDate;

  if (lastActive === today) {
    return { newStreak: progress.currentStreak, wasAlreadyActive: true };
  }

  let newStreak = progress.currentStreak;
  const engState = useEngagementStore.getState();

  if (lastActive === getYesterdayString()) {
    newStreak += 1;
  } else if (!lastActive) {
    newStreak = 1;
  } else {
    if (engState.streak.freezesOwned > 0 && newStreak > 0) {
      engState.useStreakFreeze();
      newStreak += 1;
    } else {
      if (newStreak > 0) {
        engState.recordStreakBreak(newStreak);
      }
      newStreak = 1;
    }
  }

  // Award milestone rewards
  if (newStreak > progress.currentStreak) {
    awardStreakMilestones(newStreak);
  }

  const activeDays = progress.activeDays ?? [];
  const updatedActiveDays = activeDays.includes(today)
    ? activeDays
    : [...activeDays, today].slice(-14);

  // Update useStore
  useStore.setState((s) => ({
    progress: {
      ...s.progress,
      currentStreak: newStreak,
      longestStreak: Math.max(s.progress.longestStreak, newStreak),
      lastActiveDate: today,
      activeDays: updatedActiveDays,
    },
  }));

  // Cross-store sync to useCourseStore
  useCourseStore.setState((cs) => {
    const csActiveDays = cs.progress.activeDays ?? [];
    return {
      progress: {
        ...cs.progress,
        currentStreak: newStreak,
        longestStreak: Math.max(cs.progress.longestStreak, newStreak),
        lastActiveDate: today,
        activeDays: csActiveDays.includes(today)
          ? csActiveDays
          : [...csActiveDays, today].slice(-14),
      },
    };
  });

  return { newStreak, wasAlreadyActive: false };
}

// ─── Constants ────────────────────────────────────────────────

const CHALLENGE_QUESTION_COUNT = 3;
const XP_PER_CORRECT = 5;

// ─── Main Component ───────────────────────────────────────────

export function StreakScreen() {
  const currentStreak = useStore((s) => s.progress.currentStreak);
  const longestStreak = useStore((s) => s.progress.longestStreak);
  const lastActiveDate = useStore((s) => s.progress.lastActiveDate);
  const activeDays = useStore((s) => s.progress.activeDays) ?? [];
  const streakEnhancements = useStreakEnhancements();
  const addGems = useEngagementStore((s) => s.addGems);
  const dark = useIsDark();

  const streakStatus = getStreakStatus(lastActiveDate);
  const isActiveToday = lastActiveDate === toLocalDateString(new Date());

  const flameState: StreakState =
    currentStreak === 0
      ? 'none'
      : streakStatus === 'active'
        ? 'active'
        : streakStatus === 'at-risk'
          ? 'weak'
          : 'lost';

  // Motivational messaging
  const heroMessage = useMemo(() => {
    if (currentStreak === 0) return 'Start your streak today!';
    if (isActiveToday) {
      if (currentStreak >= 30) return 'Unstoppable!';
      if (currentStreak >= 7) return "You're on fire!";
      return 'Nice work today!';
    }
    return 'Practice now to keep your streak alive!';
  }, [currentStreak, isActiveToday]);

  const mascotPose = useMemo(() => {
    if (currentStreak === 0) return 'thinking' as const;
    if (!isActiveToday) return 'worried' as const;
    if (currentStreak >= 30) return 'champion' as const;
    if (currentStreak >= 7) return 'celebrating' as const;
    return 'streak' as const;
  }, [currentStreak, isActiveToday]);

  // Week calendar
  const weekDays = useMemo(() => getWeekDays(), []);

  // Next milestone
  const nextMilestone = useMemo(() => {
    for (const m of streakMilestones) {
      if (currentStreak < m.days) return m;
    }
    return null;
  }, [currentStreak]);

  const milestoneProgress = nextMilestone
    ? Math.min((currentStreak / nextMilestone.days) * 100, 100)
    : 100;

  // Total active days count
  const totalActiveDays = activeDays.length;

  // Challenge state
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [challengeQuestions, setChallengeQuestions] = useState<CourseQuestion[]>([]);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [streakUpdated, setStreakUpdated] = useState(false);

  const startChallenge = useCallback(() => {
    const pool = gatherChallengeQuestions();
    if (pool.length === 0) return;
    const picked = pickRandomQuestions(pool, CHALLENGE_QUESTION_COUNT);
    setChallengeQuestions(picked);
    setChallengeIndex(0);
    setSelectedOption(null);
    setAnswered(false);
    setResults([]);
    setChallengeComplete(false);
    setChallengeStarted(true);
  }, []);

  const currentQuestion = challengeQuestions[challengeIndex] ?? null;

  const checkAnswer = useCallback(() => {
    if (selectedOption === null || !currentQuestion) return;
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    setAnswered(true);
    setResults((prev) => [...prev, isCorrect]);
  }, [selectedOption, currentQuestion]);

  const nextQuestion = useCallback(() => {
    if (challengeIndex + 1 >= challengeQuestions.length) {
      // Challenge complete
      setChallengeComplete(true);
      // Update streak
      if (!streakUpdated) {
        const { wasAlreadyActive } = updateStreakForChallenge();
        // Add XP for correct answers
        const totalCorrect = results.filter(Boolean).length;
        if (totalCorrect > 0) {
          const xpToAdd = totalCorrect * XP_PER_CORRECT;
          useStore.setState((s) => ({
            progress: {
              ...s.progress,
              totalXp: s.progress.totalXp + xpToAdd,
            },
          }));
        }
        setStreakUpdated(true);
      }
    } else {
      setChallengeIndex((i) => i + 1);
      setSelectedOption(null);
      setAnswered(false);
    }
  }, [challengeIndex, challengeQuestions.length, results, streakUpdated, selectedOption, currentQuestion]);

  const hasQuestions = useMemo(() => gatherChallengeQuestions().length > 0, []);
  const correctCount = results.filter(Boolean).length;

  // Dark mode color helpers
  const cardBg = dark ? '#1E293B' : 'white';
  const cardBorder = dark ? '#334155' : '#E5E5E5';
  const textPrimary = dark ? '#F1F5F9' : '#3C3C3C';
  const textMuted = dark ? '#94A3B8' : '#AFAFAF';
  const textDimmed = dark ? '#64748B' : '#CFCFCF';

  return (
    <div className="min-h-screen" style={{ background: dark ? '#020617' : '#FAFAFA' }}>
      <PageHeader
        title="Streak"
        icon={<StreakFlame state={flameState} size={22} />}
      />

      <div className="px-4 sm:px-5 pb-8">
        {/* ── Hero ── */}
        <motion.div
          className="flex flex-col items-center pt-6 pb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MascotWithGlow pose={mascotPose} size={110} flame={currentStreak > 0 && isActiveToday} />

          <div className="flex items-baseline gap-2 mt-3">
            <StreakFlame state={flameState} size={36} />
            <span
              className="font-extrabold"
              style={{ fontSize: 52, color: currentStreak > 0 ? '#FF9600' : textDimmed, lineHeight: 1 }}
            >
              {currentStreak}
            </span>
          </div>
          <p className="text-base font-extrabold mt-1" style={{ color: textPrimary }}>
            {currentStreak === 1 ? 'day streak' : 'day streak'}
          </p>
          <p
            className="text-sm font-semibold mt-1"
            style={{ color: !isActiveToday && currentStreak > 0 ? '#DC2626' : textMuted }}
          >
            {heroMessage}
          </p>
        </motion.div>

        {/* ── Status badge ── */}
        {currentStreak > 0 && (
          <motion.div
            className="flex justify-center mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{
                background: isActiveToday
                  ? (dark ? 'rgba(5,150,105,0.15)' : '#ECFDF5')
                  : (dark ? 'rgba(220,38,38,0.15)' : '#FEF2F2'),
                color: isActiveToday ? '#059669' : '#DC2626',
                border: `1.5px solid ${isActiveToday ? (dark ? '#065F46' : '#A7F3D0') : (dark ? '#991B1B' : '#FECACA')}`,
              }}
            >
              {isActiveToday ? (
                <><Check className="w-4 h-4" /> Streak charged for today</>
              ) : (
                <><Zap className="w-4 h-4" /> Practice to save your streak!</>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Week Calendar ── */}
        <motion.div
          className="rounded-2xl p-4 mb-4"
          style={{ background: cardBg, border: `2px solid ${cardBorder}` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-xs font-bold uppercase tracking-wide mb-3 text-center" style={{ color: textMuted }}>
            This Week
          </p>
          <div className="flex justify-between gap-1">
            {weekDays.map((day, i) => {
              const isActive = activeDays.includes(day.dateStr);
              const isAtRisk = day.isToday && !isActive && streakStatus === 'at-risk';
              return (
                <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                  <motion.div
                    className="flex items-center justify-center"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      fontSize: isActive ? 15 : 13,
                      fontWeight: 800,
                      background: isActive
                        ? 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)'
                        : isAtRisk
                          ? (dark ? 'rgba(220,38,38,0.2)' : '#FEE2E2')
                          : day.isToday
                            ? (dark ? '#334155' : '#E5E5E5')
                            : 'transparent',
                      color: isActive
                        ? 'white'
                        : isAtRisk
                          ? '#DC2626'
                          : day.isToday
                            ? textPrimary
                            : day.isFuture
                              ? (dark ? '#334155' : '#E5E5E5')
                              : textDimmed,
                      border: isAtRisk
                        ? '2px dashed #DC2626'
                        : day.isToday && !isActive
                          ? `2px dashed ${textDimmed}`
                          : 'none',
                      boxShadow: isActive ? '0 2px 8px rgba(217,119,6,0.3)' : 'none',
                    }}
                    initial={isActive ? { scale: 0.8 } : undefined}
                    animate={isActive ? { scale: 1 } : undefined}
                    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: i * 0.03 }}
                  >
                    {isActive ? '⚡' : day.label}
                  </motion.div>
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: day.isToday ? textPrimary : textDimmed }}
                  >
                    {day.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Next Milestone ── */}
        {nextMilestone && (
          <motion.div
            className="rounded-2xl p-4 mb-4"
            style={{
              background: dark
                ? 'linear-gradient(135deg, rgba(120,53,15,0.25) 0%, rgba(120,53,15,0.15) 100%)'
                : 'linear-gradient(135deg, #FFF6E8 0%, #FFF0DB 100%)',
              border: `2px solid ${dark ? '#92400E' : '#FFE4B8'}`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: dark ? '#FBBF24' : '#CC8B1F' }}>
                  Next Milestone
                </p>
                <p className="text-sm font-extrabold mt-0.5" style={{ color: dark ? '#FDE68A' : '#92400E' }}>
                  {nextMilestone.badgeName}
                </p>
              </div>
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg"
                style={{ background: dark ? 'rgba(120,53,15,0.3)' : 'rgba(255,255,255,0.6)' }}
              >
                <Gem className="w-3.5 h-3.5" style={{ color: dark ? '#FBBF24' : '#CC8B1F' }} />
                <span className="text-sm font-extrabold" style={{ color: dark ? '#FDE68A' : '#92400E' }}>+{nextMilestone.gems}</span>
              </div>
            </div>
            <div className="relative h-3 rounded-full overflow-hidden" style={{ background: dark ? '#78350F' : '#FFE4B8' }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: 'linear-gradient(90deg, #FBBF24, #D97706)' }}
                initial={{ width: 0 }}
                animate={{ width: `${milestoneProgress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
            <p className="text-xs font-bold mt-2 text-right" style={{ color: dark ? '#FBBF24' : '#CC8B1F' }}>
              {currentStreak} / {nextMilestone.days} days
            </p>
          </motion.div>
        )}

        {!nextMilestone && currentStreak > 0 && (
          <motion.div
            className="rounded-2xl p-4 mb-4 text-center"
            style={{
              background: dark
                ? 'linear-gradient(135deg, rgba(120,53,15,0.25) 0%, rgba(120,53,15,0.15) 100%)'
                : 'linear-gradient(135deg, #FFF6E8 0%, #FFF0DB 100%)',
              border: `2px solid ${dark ? '#92400E' : '#FFE4B8'}`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Trophy className="w-8 h-8 mx-auto mb-2" style={{ color: '#D97706' }} />
            <p className="text-sm font-extrabold" style={{ color: dark ? '#FDE68A' : '#92400E' }}>All milestones reached!</p>
            <p className="text-xs font-semibold mt-1" style={{ color: dark ? '#FBBF24' : '#CC8B1F' }}>
              You've conquered every streak milestone. Legend.
            </p>
          </motion.div>
        )}

        {/* ── Streak Freezes ── */}
        {streakEnhancements.freezesOwned > 0 && (
          <motion.div
            className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-4"
            style={{
              background: dark ? 'rgba(30,64,175,0.15)' : '#EFF6FF',
              border: `1.5px solid ${dark ? '#1E40AF' : '#BFDBFE'}`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Snowflake className="w-5 h-5 text-[#3B82F6] flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: dark ? '#93C5FD' : '#1E40AF' }}>
                Streak Freeze{streakEnhancements.freezesOwned > 1 ? 's' : ''}
              </p>
              <p className="text-xs font-semibold" style={{ color: dark ? '#60A5FA' : '#60A5FA' }}>
                {streakEnhancements.freezesOwned} available. Protects your streak if you miss a day.
              </p>
            </div>
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{ background: dark ? 'rgba(30,64,175,0.3)' : '#DBEAFE' }}
            >
              <span className="text-sm font-extrabold" style={{ color: dark ? '#93C5FD' : '#1E40AF' }}>
                {streakEnhancements.freezesOwned}
              </span>
            </div>
          </motion.div>
        )}

        {/* ── Streak Challenge ── */}
        <motion.div
          className="rounded-2xl overflow-hidden mb-4"
          style={{ background: cardBg, border: `2px solid ${cardBorder}` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Challenge header */}
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{
              background: isActiveToday
                ? (dark ? 'rgba(5,150,105,0.15)' : 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)')
                : (dark ? 'rgba(234,88,12,0.15)' : 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)'),
              borderBottom: `1.5px solid ${isActiveToday ? (dark ? '#065F46' : '#A7F3D0') : (dark ? '#9A3412' : '#FED7AA')}`,
            }}
          >
            <Zap
              className="w-4.5 h-4.5"
              style={{ color: isActiveToday ? '#059669' : '#EA580C' }}
            />
            <p
              className="text-sm font-extrabold"
              style={{ color: isActiveToday ? (dark ? '#34D399' : '#065F46') : (dark ? '#FB923C' : '#9A3412') }}
            >
              {isActiveToday ? 'Bonus Challenge' : 'Streak Challenge'}
            </p>
            {!isActiveToday && currentStreak > 0 && (
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: dark ? 'rgba(220,38,38,0.2)' : '#FEE2E2', color: '#DC2626' }}
              >
                Save your streak!
              </span>
            )}
          </div>

          <div className="p-4">
            {!hasQuestions ? (
              <div className="text-center py-4">
                <p className="text-sm font-semibold" style={{ color: textMuted }}>
                  Complete a lesson first to unlock streak challenges.
                </p>
              </div>
            ) : !challengeStarted ? (
              <div className="text-center">
                <p className="text-sm mb-4" style={{ color: dark ? '#94A3B8' : '#777' }}>
                  Answer {CHALLENGE_QUESTION_COUNT} quick questions to {isActiveToday ? 'earn bonus XP' : 'keep your streak going'}.
                </p>
                <GameButton
                  variant={isActiveToday ? 'green' : 'gold'}
                  onClick={startChallenge}
                >
                  {isActiveToday ? 'Start Bonus Challenge' : 'Start Challenge'}
                </GameButton>
              </div>
            ) : challengeComplete ? (
              <ChallengeResults
                correctCount={correctCount}
                totalCount={challengeQuestions.length}
                xpEarned={correctCount * XP_PER_CORRECT}
                isActiveToday={isActiveToday}
                dark={dark}
                onRetry={() => {
                  setStreakUpdated(false);
                  startChallenge();
                }}
              />
            ) : currentQuestion ? (
              <ChallengeQuestion
                question={currentQuestion}
                index={challengeIndex}
                total={challengeQuestions.length}
                selectedOption={selectedOption}
                answered={answered}
                dark={dark}
                onSelect={setSelectedOption}
                onCheck={checkAnswer}
                onContinue={nextQuestion}
              />
            ) : null}
          </div>
        </motion.div>

        {/* ── Stats Grid ── */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <StatCard label="Current" value={currentStreak} color="#FF9600" bg={dark ? 'rgba(120,53,15,0.2)' : '#FFF6E8'} border={dark ? '#92400E' : '#FFE4B8'} />
          <StatCard label="Longest" value={longestStreak} color={dark ? '#E2E8F0' : '#3C3C3C'} bg={dark ? '#1E293B' : '#F7F7F7'} border={dark ? '#334155' : '#ECECEC'} />
          <StatCard label="Active Days" value={totalActiveDays} color="#059669" bg={dark ? 'rgba(5,150,105,0.12)' : '#ECFDF5'} border={dark ? '#065F46' : '#A7F3D0'} />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────

function StatCard({
  label,
  value,
  color,
  bg,
  border,
}: {
  label: string;
  value: number;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <div
      className="rounded-2xl p-3 text-center"
      style={{ background: bg, border: `1.5px solid ${border}` }}
    >
      <p className="text-2xl font-extrabold" style={{ color, lineHeight: 1 }}>
        {value}
      </p>
      <p className="text-[11px] font-bold mt-1" style={{ color: `${color}99` }}>
        {label}
      </p>
    </div>
  );
}

function ChallengeQuestion({
  question,
  index,
  total,
  selectedOption,
  answered,
  dark,
  onSelect,
  onCheck,
  onContinue,
}: {
  question: CourseQuestion;
  index: number;
  total: number;
  selectedOption: number | null;
  answered: boolean;
  dark: boolean;
  onSelect: (i: number) => void;
  onCheck: () => void;
  onContinue: () => void;
}) {
  const isCorrect = answered && selectedOption === question.correctIndex;

  return (
    <div>
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all"
            style={{
              width: i === index ? 24 : 8,
              height: 8,
              background:
                i < index
                  ? '#10B981'
                  : i === index
                    ? '#FF9600'
                    : (dark ? '#334155' : '#E5E5E5'),
              borderRadius: 4,
            }}
          />
        ))}
      </div>

      {/* Question */}
      <p className="text-[15px] font-bold mb-4 leading-snug" style={{ color: dark ? '#F1F5F9' : '#3C3C3C' }}>
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-2.5 mb-4">
        {question.options?.map((option, i) => {
          const isSelected = selectedOption === i;
          const isCorrectOption = i === question.correctIndex;
          let bg = dark ? '#0F172A' : 'white';
          let border = dark ? '#334155' : '#E5E5E5';
          let textColor = dark ? '#E2E8F0' : '#3C3C3C';

          if (answered) {
            if (isCorrectOption) {
              bg = dark ? 'rgba(5,150,105,0.15)' : '#ECFDF5';
              border = '#10B981';
              textColor = dark ? '#34D399' : '#065F46';
            } else if (isSelected && !isCorrectOption) {
              bg = dark ? 'rgba(239,68,68,0.15)' : '#FEF2F2';
              border = '#EF4444';
              textColor = dark ? '#FCA5A5' : '#991B1B';
            }
          } else if (isSelected) {
            bg = dark ? 'rgba(255,150,0,0.12)' : '#FFF7ED';
            border = '#FF9600';
            textColor = dark ? '#FBBF24' : '#9A3412';
          }

          return (
            <motion.button
              key={i}
              className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors"
              style={{
                background: bg,
                border: `2px solid ${border}`,
                color: textColor,
                cursor: answered ? 'default' : 'pointer',
              }}
              onClick={() => !answered && onSelect(i)}
              whileTap={!answered ? { scale: 0.98 } : undefined}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-lg"
                style={{
                  width: 28,
                  height: 28,
                  background: answered && isCorrectOption
                    ? '#10B981'
                    : answered && isSelected && !isCorrectOption
                      ? '#EF4444'
                      : isSelected
                        ? '#FF9600'
                        : (dark ? '#1E293B' : '#F0F0F0'),
                  color: isSelected || (answered && (isCorrectOption || (isSelected && !isCorrectOption)))
                    ? 'white'
                    : (dark ? '#64748B' : '#AFAFAF'),
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {answered && isCorrectOption ? (
                  <Check className="w-3.5 h-3.5" />
                ) : answered && isSelected && !isCorrectOption ? (
                  <X className="w-3.5 h-3.5" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </div>
              <span className="text-sm font-semibold leading-snug flex-1">{option}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {answered && (
          <motion.div
            className="rounded-xl px-4 py-3 mb-4"
            style={{
              background: isCorrect ? (dark ? 'rgba(5,150,105,0.15)' : '#ECFDF5') : (dark ? 'rgba(220,38,38,0.15)' : '#FEF2F2'),
              border: `1.5px solid ${isCorrect ? (dark ? '#065F46' : '#A7F3D0') : (dark ? '#991B1B' : '#FECACA')}`,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <p
              className="text-sm font-bold mb-1"
              style={{ color: isCorrect ? (dark ? '#34D399' : '#065F46') : (dark ? '#FCA5A5' : '#991B1B') }}
            >
              {isCorrect ? 'Correct!' : 'Not quite!'}
            </p>
            <p className="text-xs font-medium" style={{ color: isCorrect ? (dark ? '#6EE7B7' : '#047857') : (dark ? '#F87171' : '#B91C1C') }}>
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action button */}
      {!answered ? (
        <GameButton variant="gold" onClick={onCheck} disabled={selectedOption === null}>
          Check
        </GameButton>
      ) : (
        <GameButton variant={isCorrect ? 'green' : 'indigo'} onClick={onContinue}>
          {index + 1 >= total ? 'See Results' : 'Continue'}
        </GameButton>
      )}
    </div>
  );
}

function ChallengeResults({
  correctCount,
  totalCount,
  xpEarned,
  isActiveToday,
  dark,
  onRetry,
}: {
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  isActiveToday: boolean;
  dark: boolean;
  onRetry: () => void;
}) {
  const perfect = correctCount === totalCount;

  return (
    <motion.div
      className="text-center py-2"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
        style={{
          background: perfect
            ? 'linear-gradient(135deg, #FBBF24, #D97706)'
            : correctCount > 0
              ? 'linear-gradient(135deg, #34D399, #059669)'
              : (dark ? '#334155' : '#F0F0F0'),
        }}
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        {perfect ? (
          <Trophy className="w-8 h-8 text-white" />
        ) : (
          <Zap className="w-8 h-8 text-white" />
        )}
      </motion.div>

      <p className="text-lg font-extrabold" style={{ color: dark ? '#F1F5F9' : '#3C3C3C' }}>
        {perfect ? 'Perfect!' : correctCount > 0 ? 'Nice work!' : 'Keep practicing!'}
      </p>
      <p className="text-sm font-semibold mt-1" style={{ color: dark ? '#94A3B8' : '#AFAFAF' }}>
        {correctCount} of {totalCount} correct
      </p>

      {xpEarned > 0 && (
        <motion.div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mt-3"
          style={{ background: dark ? 'rgba(124,58,237,0.2)' : '#F3E8FF', border: `1.5px solid ${dark ? '#7C3AED' : '#DDD6FE'}` }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span className="text-sm font-bold text-[#7C3AED]">+{xpEarned} XP</span>
        </motion.div>
      )}

      {!isActiveToday && (
        <motion.p
          className="text-xs font-bold text-[#059669] mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Check className="w-3.5 h-3.5 inline mr-1" />
          Streak saved for today!
        </motion.p>
      )}

      <div className="mt-5">
        <GameButton variant="indigo" onClick={onRetry}>
          Try Again
        </GameButton>
      </div>
    </motion.div>
  );
}
