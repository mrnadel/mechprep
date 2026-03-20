'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, AlertTriangle } from 'lucide-react';
import { useCourseStore } from '@/store/useCourseStore';
import { course } from '@/data/course';
import LessonProgressBar from './LessonProgressBar';
import QuestionCard from './QuestionCard';
import type { QuestionCardHandle } from './QuestionCard';
import ResultScreen from './ResultScreen';

export { LessonView };
export default function LessonView() {
  const activeLesson = useCourseStore((s) => s.activeLesson);
  const lessonResult = useCourseStore((s) => s.lessonResult);
  const submitAnswer = useCourseStore((s) => s.submitAnswer);
  const nextQuestion = useCourseStore((s) => s.nextQuestion);
  const completeLesson = useCourseStore((s) => s.completeLesson);
  const exitLesson = useCourseStore((s) => s.exitLesson);

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [xpGain, setXpGain] = useState(0);
  const questionRef = useRef<QuestionCardHandle>(null);

  // Derive lesson & question data
  const lessonData = useMemo(() => {
    if (!activeLesson) return null;
    const unit = course[activeLesson.unitIndex];
    if (!unit) return null;
    const lesson = unit.lessons[activeLesson.lessonIndex];
    if (!lesson) return null;
    return { unit, lesson };
  }, [activeLesson]);

  const currentQuestion = useMemo(() => {
    if (!activeLesson || !lessonData) return null;
    return lessonData.lesson.questions[activeLesson.currentQuestionIndex] ?? null;
  }, [activeLesson, lessonData]);

  const isCurrentAnswered = useMemo(() => {
    if (!activeLesson || !currentQuestion) return false;
    return activeLesson.answers.some((a) => a.questionId === currentQuestion.id);
  }, [activeLesson, currentQuestion]);

  const isLastQuestion = useMemo(() => {
    if (!activeLesson || !lessonData) return false;
    return activeLesson.currentQuestionIndex >= lessonData.lesson.questions.length - 1;
  }, [activeLesson, lessonData]);

  const answeredCount = activeLesson?.answers.length ?? 0;
  const totalQuestions = lessonData?.lesson.questions.length ?? 0;
  const correctCount = activeLesson?.answers.filter(a => a.correct).length ?? 0;

  // Handlers
  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (!currentQuestion) return;
      submitAnswer(currentQuestion.id, correct);
      setLastAnswerCorrect(correct);
      if (correct) {
        setXpGain(prev => prev + 10);
      }
    },
    [currentQuestion, submitAnswer]
  );

  const handleSelectionChange = useCallback((value: boolean) => {
    setHasSelection(value);
  }, []);

  const handleCheck = useCallback(() => {
    questionRef.current?.check();
  }, []);

  const handleContinue = useCallback(() => {
    setLastAnswerCorrect(null);
    if (isLastQuestion) {
      completeLesson();
    } else {
      nextQuestion();
    }
  }, [isLastQuestion, completeLesson, nextQuestion]);

  const handleExitClick = useCallback(() => {
    if (!activeLesson) return;
    if (activeLesson.answers.length === 0) {
      exitLesson();
      return;
    }
    setShowExitConfirm(true);
  }, [activeLesson, exitLesson]);

  const handleConfirmExit = useCallback(() => {
    setShowExitConfirm(false);
    exitLesson();
  }, [exitLesson]);

  const handleCancelExit = useCallback(() => {
    setShowExitConfirm(false);
  }, []);

  // Global keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInInput =
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') &&
        !(target as HTMLInputElement).disabled;

      // Exit confirm modal keyboard handling
      if (showExitConfirm) {
        if (e.key === 'Escape') {
          e.preventDefault();
          handleCancelExit();
        }
        return;
      }

      // Escape to exit lesson
      if (e.key === 'Escape') {
        e.preventDefault();
        handleExitClick();
        return;
      }

      // When typing in a non-disabled input, let the input handle everything
      if (isInInput) return;

      // Enter or Space: check answer or continue
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isCurrentAnswered) {
          handleContinue();
        } else if (hasSelection) {
          handleCheck();
        }
        return;
      }

      // Option selection keys (only when not yet answered)
      if (!isCurrentAnswered) {
        const key = e.key.toLowerCase();
        const qType = questionRef.current?.questionType;

        if (qType === 'true-false') {
          // 1 or T = True, 2 or F = False
          if (key === '1' || key === 't') {
            questionRef.current?.selectBool(true);
          } else if (key === '2' || key === 'f') {
            questionRef.current?.selectBool(false);
          }
        } else {
          // 1-4 or A-D for multiple choice
          if (['1', '2', '3', '4'].includes(key)) {
            questionRef.current?.selectOption(parseInt(key) - 1);
          } else if (['a', 'b', 'c', 'd'].includes(key)) {
            questionRef.current?.selectOption(key.charCodeAt(0) - 97);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    showExitConfirm,
    isCurrentAnswered,
    hasSelection,
    handleCheck,
    handleContinue,
    handleExitClick,
    handleCancelExit,
  ]);

  // Show result screen after lesson completion
  if (lessonResult) {
    return <ResultScreen />;
  }

  // Nothing to render if no active lesson
  if (!activeLesson || !lessonData || !currentQuestion) {
    return null;
  }

  const unitColor = lessonData.unit.color;

  // Bottom button color logic
  const getBottomButtonStyle = () => {
    if (!isCurrentAnswered) {
      return {
        backgroundColor: hasSelection ? unitColor : '#CBD5E1',
        color: hasSelection ? 'white' : '#94A3B8',
      };
    }
    if (lastAnswerCorrect === true) {
      return { backgroundColor: '#10B981', color: 'white' };
    }
    if (lastAnswerCorrect === false) {
      return { backgroundColor: '#EF4444', color: 'white' };
    }
    return { backgroundColor: unitColor, color: 'white' };
  };

  // Background color based on answer state
  const getBgColor = () => {
    if (!isCurrentAnswered) return '#FAFAF8';
    if (lastAnswerCorrect === true) return '#F0FDF4';
    if (lastAnswerCorrect === false) return '#FEF2F2';
    return '#FAFAF8';
  };

  return (
    <AnimatePresence>
      <motion.div
        key="lesson-view"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-50 flex flex-col"
        style={{
          backgroundColor: getBgColor(),
          transition: 'background-color 0.4s ease',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
        }}
      >
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(${unitColor} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* ── Top bar ── */}
        <div className="relative flex items-center gap-3 px-5 pt-4 pb-3">
          {/* Close button */}
          <button
            onClick={handleExitClick}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-white/80 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white transition-all active:scale-90 shadow-sm"
            aria-label="Close lesson"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Segmented progress bar */}
          <LessonProgressBar
            current={answeredCount}
            total={totalQuestions}
            color={unitColor}
          />

          {/* XP counter */}
          <motion.div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm"
            style={{
              backgroundColor: `${unitColor}15`,
              color: unitColor,
              border: `1px solid ${unitColor}25`,
            }}
            key={xpGain}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="w-3.5 h-3.5" />
            {xpGain}
          </motion.div>
        </div>

        {/* Question counter */}
        <div className="px-5 pb-2 flex items-center justify-between">
          <span className="text-sm font-semibold" style={{ color: unitColor }}>
            Question {(activeLesson.currentQuestionIndex ?? 0) + 1} of {totalQuestions}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {correctCount}/{answeredCount} correct
          </span>
        </div>

        {/* ── Scrollable question area ── */}
        <div className="flex-1 overflow-y-auto px-5 pt-2 pb-36">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              <QuestionCard
                ref={questionRef}
                question={currentQuestion}
                onAnswer={handleAnswer}
                onSelectionChange={handleSelectionChange}
                answered={isCurrentAnswered}
                unitColor={unitColor}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom button area ── */}
        <motion.div
          className="sticky bottom-0 px-5 pt-4 pb-5"
          style={{
            paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 20px)',
            background: `linear-gradient(to top, ${getBgColor()} 70%, transparent)`,
          }}
          layout
        >
          {/* Correct/Wrong flash emoji */}
          <AnimatePresence>
            {isCurrentAnswered && lastAnswerCorrect !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-center mb-3"
              >
                <span className="text-2xl">
                  {lastAnswerCorrect ? '🎯' : '💪'}
                </span>
                <p className="text-sm font-bold mt-0.5" style={{ color: lastAnswerCorrect ? '#10B981' : '#EF4444' }}>
                  {lastAnswerCorrect ? 'Nailed it!' : 'Keep going!'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!isCurrentAnswered ? (
            <motion.button
              onClick={handleCheck}
              disabled={!hasSelection}
              className="w-full rounded-2xl py-4.5 px-6 font-extrabold text-lg transition-all duration-200 min-h-[60px] shadow-lg flex items-center justify-center gap-2"
              style={getBottomButtonStyle()}
              whileTap={hasSelection ? { scale: 0.96 } : undefined}
              animate={hasSelection ? { y: [0, -2, 0] } : undefined}
              transition={hasSelection ? { duration: 0.4, repeat: Infinity, repeatDelay: 2 } : undefined}
            >
              CHECK
              {hasSelection && (
                <span className="text-xs opacity-70 font-semibold ml-1">↵</span>
              )}
            </motion.button>
          ) : (
            <motion.button
              onClick={handleContinue}
              className="w-full rounded-2xl py-4.5 px-6 font-extrabold text-lg transition-all duration-200 min-h-[60px] shadow-lg flex items-center justify-center gap-2"
              style={getBottomButtonStyle()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.96 }}
            >
              {isLastQuestion ? '🏁 FINISH' : 'CONTINUE →'}
              <span className="text-xs opacity-70 font-semibold ml-1">↵</span>
            </motion.button>
          )}
        </motion.div>

        {/* ── Exit confirmation modal ── */}
        <AnimatePresence>
          {showExitConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[60] bg-black/40 flex items-end sm:items-center justify-center px-4"
            >
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl mb-0 sm:mb-0"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7 text-red-500" />
                  </div>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-1.5 text-center">
                  Quit lesson?
                </h3>
                <p className="text-sm text-gray-500 mb-6 text-center">
                  Your progress on this lesson will be lost.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleCancelExit}
                    className="flex-1 rounded-2xl py-3.5 px-4 border-2 border-gray-200 text-gray-700 font-bold transition-colors hover:bg-gray-50 active:scale-[0.97] min-h-[50px] flex items-center justify-center gap-1.5"
                  >
                    Keep going
                  </button>
                  <button
                    onClick={handleConfirmExit}
                    className="flex-1 rounded-2xl py-3.5 px-4 bg-red-500 text-white font-bold transition-colors hover:bg-red-600 active:scale-[0.97] min-h-[50px]"
                  >
                    Quit
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
