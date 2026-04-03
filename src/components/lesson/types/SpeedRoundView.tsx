'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LessonTypeProps } from '@/data/course/types';
import { useLessonColors } from '@/lib/lessonColors';

export default function SpeedRoundView({
  lesson,
  unitColor,
  theme,
  isDoubleXp,
  onAnswer,
  onProgress,
  onComplete,
}: LessonTypeProps) {
  const c = useLessonColors();
  const questions = lesson.speedQuestions ?? [];
  const timeLimit = lesson.speedTimeLimit ?? 60;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalAnswered = useRef(0);

  // Timer countdown
  useEffect(() => {
    if (isFinished) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isFinished]);

  // Report initial progress
  useEffect(() => {
    onProgress(0, questions.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTap = useCallback(
    (optionIndex: number) => {
      if (feedback || isFinished) return;
      const q = questions[currentIndex];
      if (!q) return;

      const correct = optionIndex === q.correctIndex;
      setSelectedIndex(optionIndex);
      setFeedback(correct ? 'correct' : 'incorrect');

      onAnswer(q.id, correct);
      totalAnswered.current += 1;
      onProgress(totalAnswered.current, questions.length);

      if (correct) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);
        const streakBonus = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
        setScore((prev) => prev + 10 * streakBonus);
      } else {
        setStreak(0);
      }

      // Auto-advance after brief feedback
      setTimeout(() => {
        setFeedback(null);
        setSelectedIndex(null);
        if (currentIndex + 1 >= questions.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsFinished(true);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 600);
    },
    [feedback, isFinished, questions, currentIndex, streak, bestStreak, onAnswer, onProgress],
  );

  // Keyboard support: 1-4 keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (feedback || isFinished) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        e.preventDefault();
        handleTap(num - 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [feedback, isFinished, handleTap]);

  const currentQ = questions[currentIndex];
  const timerPercent = (timeLeft / timeLimit) * 100;
  const timerColor = timerPercent > 30 ? unitColor : timerPercent > 10 ? '#F59E0B' : '#FF4B4B';

  if (isFinished) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            gap: 16,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ fontSize: 56 }}
          >
            {timeLeft === 0 ? '⏰' : '🏁'}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 22, fontWeight: 800, color: c.title, margin: 0 }}
          >
            {timeLeft === 0 ? "Time's Up!" : 'Round Complete!'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              display: 'flex',
              gap: 20,
              marginTop: 8,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 28, fontWeight: 800, color: unitColor, margin: 0 }}>{score}</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: c.subtitle, margin: 0 }}>Score</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 28, fontWeight: 800, color: c.title, margin: 0 }}>
                {totalAnswered.current}/{questions.length}
              </p>
              <p style={{ fontSize: 12, fontWeight: 700, color: c.subtitle, margin: 0 }}>Answered</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 28, fontWeight: 800, color: '#F59E0B', margin: 0 }}>🔥 {bestStreak}</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: c.subtitle, margin: 0 }}>Best Streak</p>
            </div>
          </motion.div>
        </div>
        <div
          style={{
            padding: '12px 20px',
            paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
            borderTop: `2px solid ${c.border}`,
            background: c.cardBg,
          }}
        >
          <button
            onClick={onComplete}
            className="w-full transition-transform active:scale-[0.98]"
            style={{
              padding: '14px 0',
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              background: unitColor,
              color: '#FFFFFF',
              boxShadow: `0 4px 0 ${theme.dark}`,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            See Results
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* Timer bar */}
      <div style={{ padding: '8px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div
            style={{
              flex: 1,
              height: 8,
              borderRadius: 4,
              background: c.border,
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                borderRadius: 4,
                background: timerColor,
              }}
              animate={{ width: `${timerPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: timerColor,
              fontVariantNumeric: 'tabular-nums',
              minWidth: 32,
              textAlign: 'right',
            }}
          >
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Streak indicator */}
      <AnimatePresence>
        {streak >= 3 && (
          <motion.div
            key={`streak-${streak}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 800,
              color: '#F59E0B',
              padding: '4px 0',
            }}
          >
            🔥 {streak} streak!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 20px',
          gap: 24,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: c.subtitle,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              {currentIndex + 1} of {questions.length}
            </p>
            <p
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: c.title,
                lineHeight: 1.4,
                margin: '0 0 24px',
              }}
            >
              {currentQ.question}
            </p>

            {/* Options grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: currentQ.options.length <= 2 ? '1fr' : '1fr 1fr',
                gap: 10,
                maxWidth: 400,
                margin: '0 auto',
              }}
            >
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedIndex === i;
                const isCorrectOption = i === currentQ.correctIndex;
                let bg = c.cardBg;
                let borderColor = c.border;
                let shadow = `0 3px 0 ${c.border}`;
                let textColor = c.title;

                if (feedback && isSelected) {
                  if (feedback === 'correct') {
                    bg = '#D7FFB8';
                    borderColor = '#58CC02';
                    shadow = '0 3px 0 #46A302';
                    textColor = '#58A700';
                  } else {
                    bg = '#FFDFE0';
                    borderColor = '#FF4B4B';
                    shadow = '0 3px 0 #CC2D2D';
                    textColor = '#EA2B2B';
                  }
                }
                if (feedback === 'incorrect' && isCorrectOption) {
                  bg = '#D7FFB8';
                  borderColor = '#58CC02';
                  shadow = '0 3px 0 #46A302';
                  textColor = '#58A700';
                }

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleTap(i)}
                    disabled={!!feedback}
                    className="transition-transform active:scale-[0.96]"
                    animate={
                      feedback === 'incorrect' && isSelected
                        ? { x: [0, -6, 6, -4, 4, 0] }
                        : {}
                    }
                    transition={{ type: 'tween', duration: 0.3 }}
                    style={{
                      padding: '16px 12px',
                      borderRadius: 14,
                      fontSize: 15,
                      fontWeight: 700,
                      background: bg,
                      color: textColor,
                      border: `2px solid ${borderColor}`,
                      boxShadow: shadow,
                      cursor: feedback ? 'default' : 'pointer',
                      lineHeight: 1.3,
                    }}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Score display */}
      <div
        style={{
          padding: '8px 20px 12px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            borderRadius: 12,
            background: theme.bg,
            fontSize: 14,
            fontWeight: 800,
            color: theme.dark,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" fill={theme.dark} />
          </svg>
          {score} pts
        </div>
      </div>
    </div>
  );
}
