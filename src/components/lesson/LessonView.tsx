'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { getUnitTheme } from '@/lib/unitThemes';
import { useBackHandler } from '@/hooks/useBackHandler';
import LessonProgressBar from './LessonProgressBar';
import QuestionCard from './QuestionCard';
import type { QuestionCardHandle } from './QuestionCard';
import ResultScreen from './ResultScreen';
import FlagButton from '@/components/feedback/FlagButton';
import { useMasteryStore } from '@/store/useMasteryStore';
import EngineeringCalculator from '@/components/calculator/EngineeringCalculator';

export { LessonView };
export default function LessonView() {
  const activeLesson = useCourseStore((s) => s.activeLesson);
  const lessonResult = useCourseStore((s) => s.lessonResult);
  const submitAnswer = useCourseStore((s) => s.submitAnswer);
  const nextQuestion = useCourseStore((s) => s.nextQuestion);
  const completeLesson = useCourseStore((s) => s.completeLesson);
  const exitLesson = useCourseStore((s) => s.exitLesson);

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showDebugMenu, setShowDebugMenu] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [xpGain, setXpGain] = useState(0);
  const questionRef = useRef<QuestionCardHandle>(null);
  const addMasteryEvent = useMasteryStore((s) => s.addEvent);
  const syncMastery = useMasteryStore((s) => s.syncToServer);
  useEffect(() => {
    if (lessonResult) {
      syncMastery();
    }
  }, [lessonResult, syncMastery]);

  const courseData = useCourseStore((s) => s.courseData);

  const lessonData = useMemo(() => {
    if (!activeLesson) return null;
    const unit = courseData[activeLesson.unitIndex];
    if (!unit) return null;
    const lesson = unit.lessons[activeLesson.lessonIndex];
    if (!lesson) return null;
    return { unit, lesson };
  }, [activeLesson, courseData]);

  const theme = useMemo(() => {
    if (!activeLesson) return getUnitTheme(0);
    return getUnitTheme(activeLesson.unitIndex);
  }, [activeLesson]);

  const sessionQuestions = useMemo(() => {
    if (!activeLesson || !lessonData) return [];
    const questionMap = new Map(lessonData.lesson.questions.map((q) => [q.id, q]));
    return activeLesson.sessionQuestionIds
      .map((id) => questionMap.get(id))
      .filter(Boolean) as typeof lessonData.lesson.questions;
  }, [activeLesson, lessonData]);

  const currentQuestion = useMemo(() => {
    if (!activeLesson) return null;
    return sessionQuestions[activeLesson.currentQuestionIndex] ?? null;
  }, [activeLesson, sessionQuestions]);

  const isCurrentAnswered = useMemo(() => {
    if (!activeLesson || !currentQuestion) return false;
    return activeLesson.answers.some((a) => a.questionId === currentQuestion.id);
  }, [activeLesson, currentQuestion]);

  const isLastQuestion = useMemo(() => {
    if (!activeLesson) return false;
    return activeLesson.currentQuestionIndex >= sessionQuestions.length - 1;
  }, [activeLesson, sessionQuestions]);

  const answeredCount = activeLesson?.answers.length ?? 0;
  const totalQuestions = sessionQuestions.length;

  const getCorrectAnswerDisplay = useCallback((): string => {
    if (!currentQuestion) return '';
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return currentQuestion.options?.[currentQuestion.correctIndex ?? 0] ?? '';
      case 'true-false':
        return currentQuestion.correctAnswer ? 'True' : 'False';
      case 'fill-blank':
        return currentQuestion.blanks?.join(', ') ?? currentQuestion.acceptedAnswers?.[0] ?? '';
      default:
        return '';
    }
  }, [currentQuestion]);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (!currentQuestion) return;
      submitAnswer(currentQuestion.id, correct);
      setLastAnswerCorrect(correct);
      if (correct) {
        setXpGain(prev => prev + 10);
      }
      // Log mastery event if the unit has a topicId
      const topicId = lessonData?.unit.topicId;
      if (topicId) {
        addMasteryEvent({
          questionId: currentQuestion.id,
          topicId,
          difficulty: 'intermediate',
          correct,
          source: 'course',
        });
      }
    },
    [currentQuestion, submitAnswer, lessonData, addMasteryEvent]
  );

  const handleSelectionChange = useCallback((value: boolean) => {
    setHasSelection(value);
  }, []);

  const handleCheck = useCallback(() => {
    questionRef.current?.check();
  }, []);

  const handleContinue = useCallback(() => {
    setLastAnswerCorrect(null);
    setHasSelection(false);
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

  // Mobile back button triggers same exit flow (with confirmation if answers exist)
  useBackHandler(!!activeLesson && !lessonResult, handleExitClick);

  const handleConfirmExit = useCallback(() => {
    setShowExitConfirm(false);
    exitLesson();
  }, [exitLesson]);

  const handleCancelExit = useCallback(() => {
    setShowExitConfirm(false);
  }, []);

  // Hotkey hint — only show on devices with a physical keyboard (non-touch)
  const [showHotkeyHint, setShowHotkeyHint] = useState(false);
  useEffect(() => {
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (hasPointer) setShowHotkeyHint(true);
  }, []);
  useEffect(() => {
    if (showHotkeyHint) {
      const timer = setTimeout(() => setShowHotkeyHint(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showHotkeyHint]);

  // Global keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If calculator has focus, let it handle its own keys
      const activeEl = document.activeElement;
      if (activeEl && activeEl.closest('[aria-label="Engineering calculator"]')) {
        return;
      }

      const target = e.target as HTMLElement;
      const isInInput =
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') &&
        !(target as HTMLInputElement).disabled;

      if (showExitConfirm) {
        if (e.key === 'Escape') {
          e.preventDefault();
          handleCancelExit();
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        handleExitClick();
        return;
      }

      // Backtick toggles calculator
      if (e.key === '`') {
        e.preventDefault();
        setIsCalcOpen(c => !c);
        return;
      }

      if (isInInput) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isCurrentAnswered) {
          handleContinue();
        } else if (hasSelection) {
          handleCheck();
        }
        return;
      }

      if (!isCurrentAnswered) {
        const key = e.key.toLowerCase();
        const qType = questionRef.current?.questionType;

        if (/^[1-9]$/.test(key)) {
          const idx = parseInt(key) - 1;
          if (qType === 'fill-blank') {
            questionRef.current?.selectWord(idx);
          } else if (qType === 'true-false') {
            if (idx === 0) questionRef.current?.selectBool(true);
            else if (idx === 1) questionRef.current?.selectBool(false);
          } else {
            questionRef.current?.selectOption(idx);
          }
        } else if (['a', 'b', 'c', 'd'].includes(key)) {
          questionRef.current?.selectOption(key.charCodeAt(0) - 97);
        } else if (key === 't') {
          questionRef.current?.selectBool(true);
        } else if (key === 'f') {
          questionRef.current?.selectBool(false);
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
    isCalcOpen,
  ]);

  if (lessonResult) return <ResultScreen />;

  if (!activeLesson || !lessonData || !currentQuestion) return null;

  const unitColor = theme.color;

  return (
    <AnimatePresence>
      <motion.div
        key="lesson-view"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="main"
        aria-label="Lesson view"
        style={{
          backgroundColor: '#FAFAFA',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <div className="w-full h-full max-w-3xl flex flex-col bg-[#FAFAFA] lg:shadow-lg lg:border-x lg:border-gray-200">
        {/* Top bar */}
        <div
          className="flex items-center"
          style={{
            padding: '10px 16px',
            gap: 12,
            borderBottom: '2px solid #E5E5E5',
            background: 'white',
          }}
        >
          <button
            onClick={handleExitClick}
            className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90"
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: '#F5F5F5',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Close lesson"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="#AFAFAF" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>

          {activeLesson.isGolden && (
            <div
              className="flex-shrink-0 flex items-center golden-badge-shimmer"
              style={{
                gap: 4,
                padding: '4px 10px',
                borderRadius: 10,
                color: '#8B6914',
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: 0.3,
                textTransform: 'uppercase',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="badgeCrownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD54F" />
                    <stop offset="50%" stopColor="#FFA000" />
                    <stop offset="100%" stopColor="#FF8F00" />
                  </linearGradient>
                </defs>
                <path d="M5 16h14l-2-8-3.5 4L12 6l-1.5 6L7 8l-2 8z" fill="url(#badgeCrownGrad)" />
                <path d="M5 16h14v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2z" fill="url(#badgeCrownGrad)" />
              </svg>
              Golden
            </div>
          )}

          <LessonProgressBar
            current={answeredCount}
            total={totalQuestions}
            color={activeLesson.isGolden ? '#FFB800' : unitColor}
          />

          {/* Debug: skip to end */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowDebugMenu((v) => !v)}
                title="Debug: skip lesson"
                className="flex-shrink-0 transition-transform active:scale-90"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: '#FEE2E2',
                  border: '1px solid #FECACA',
                  cursor: 'pointer',
                  fontSize: 12,
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ⏭
              </button>
              {showDebugMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: 34,
                    right: 0,
                    background: '#FFFFFF',
                    borderRadius: 12,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    border: '1px solid #E5E7EB',
                    padding: 4,
                    zIndex: 100,
                    minWidth: 150,
                  }}
                >
                  {[
                    { label: '✅ Pass (90%)', correct: 9 },
                    { label: '⚠️ Pass (70%)', correct: 7 },
                    { label: '❌ Fail (40%)', correct: 4 },
                    { label: '💎 Flawless', correct: 10 },
                  ].map(({ label, correct }) => (
                    <button
                      key={label}
                      onClick={() => {
                        if (!activeLesson) return;
                        const ids = activeLesson.sessionQuestionIds;
                        const total = ids.length;
                        const correctCount = Math.min(correct, total);
                        // Fill remaining answers to hit target
                        const alreadyAnswered = activeLesson.answers.length;
                        for (let i = alreadyAnswered; i < total; i++) {
                          submitAnswer(ids[i], i < correctCount);
                        }
                        setShowDebugMenu(false);
                        setTimeout(completeLesson, 10);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px 12px',
                        fontSize: 13,
                        fontWeight: 600,
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: 8,
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <motion.div
            className="flex-shrink-0 flex items-center"
            style={{
              gap: 4,
              padding: '4px 10px',
              borderRadius: 10,
              background: theme.bg,
              color: theme.dark,
              fontWeight: 800,
              fontSize: 13,
            }}
            key={xpGain}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.25 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" fill={theme.dark} />
            </svg>
            <span aria-live="polite">+{xpGain} XP</span>
          </motion.div>

          {/* Calculator toggle */}
          <button
            onClick={() => setIsCalcOpen(c => !c)}
            className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90"
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: isCalcOpen ? theme.bg : '#F5F5F5',
              border: isCalcOpen ? `1.5px solid ${unitColor}` : '1.5px solid transparent',
              cursor: 'pointer',
            }}
            aria-label={isCalcOpen ? 'Close calculator' : 'Open calculator'}
            title="Calculator (`)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="2" width="16" height="20" rx="2" stroke={isCalcOpen ? unitColor : '#AFAFAF'} strokeWidth="2" />
              <rect x="7" y="5" width="10" height="4" rx="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
              <circle cx="8.5" cy="13" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
              <circle cx="12" cy="13" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
              <circle cx="15.5" cy="13" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
              <circle cx="8.5" cy="17" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
              <circle cx="12" cy="17" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
              <circle cx="15.5" cy="17" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
            </svg>
          </button>
        </div>

        {/* Question area */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: '16px 20px 20px' }}
        >
          <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence>
              {showHotkeyHint && !isCurrentAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#CFCFCF',
                    textAlign: 'center',
                    marginBottom: 10,
                    letterSpacing: 0.3,
                    flexShrink: 0,
                  }}
                >
                  {currentQuestion?.type === 'multiple-choice' && 'A\u2013D select \u00b7 '}
                  {currentQuestion?.type === 'true-false' && '1/2 or T/F select \u00b7 '}
                  {currentQuestion?.type === 'fill-blank' && '1\u20139 select word \u00b7 '}
                  Enter check \u00b7 Esc exit
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
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
        </div>

        {/* Bottom bar */}
        {!isCurrentAnswered ? (
          <div
            style={{
              padding: '12px 20px',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
              borderTop: '2px solid #E5E5E5',
              background: 'white',
            }}
          >
            <button
              onClick={handleCheck}
              disabled={!hasSelection}
              className="w-full transition-transform active:scale-[0.98]"
              style={{
                padding: '14px 0',
                borderRadius: 16,
                fontSize: 15,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                background: hasSelection ? unitColor : '#E5E5E5',
                color: hasSelection ? '#FFFFFF' : '#AFAFAF',
                boxShadow: hasSelection
                  ? `0 4px 0 ${theme.dark}`
                  : '0 4px 0 #CCCCCC',
                border: 'none',
                cursor: hasSelection ? 'pointer' : 'default',
              }}
            >
              Check
            </button>
          </div>
        ) : (
          <motion.div
            key="feedback"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              padding: '14px 20px',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
              background: lastAnswerCorrect ? '#D7FFB8' : '#FFDFE0',
              borderTop: `2px solid ${lastAnswerCorrect ? '#58CC02' : '#FF4B4B'}`,
            }}
          >
            <div style={{ marginBottom: 12 }} role="status" aria-live="assertive">
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: lastAnswerCorrect ? '#58A700' : '#EA2B2B',
                  margin: 0,
                }}
              >
                {lastAnswerCorrect ? 'Correct!' : 'Incorrect'}
              </p>
              {!lastAnswerCorrect && (
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#EA2B2B',
                    margin: '2px 0 0',
                  }}
                >
                  Answer: {getCorrectAnswerDisplay()}
                </p>
              )}
              {currentQuestion.explanation && (
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: lastAnswerCorrect ? '#58A700' : '#EA2B2B',
                    opacity: 0.75,
                    margin: '4px 0 0',
                    lineHeight: 1.4,
                  }}
                >
                  {currentQuestion.explanation}
                </p>
              )}
              <FlagButton contentType="lesson-question" contentId={currentQuestion.id} hasGraphic={!!currentQuestion.diagram} />
            </div>

            <button
              onClick={handleContinue}
              className="w-full transition-transform active:scale-[0.98]"
              style={{
                padding: '14px 0',
                borderRadius: 16,
                fontSize: 15,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                background: lastAnswerCorrect ? '#58CC02' : '#FF4B4B',
                color: '#FFFFFF',
                boxShadow: lastAnswerCorrect
                  ? '0 4px 0 #46A302'
                  : '0 4px 0 #CC2D2D',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isLastQuestion ? 'Finish' : 'Continue'}
            </button>
          </motion.div>
        )}

        </div>{/* end centered wrapper */}

        {/* Calculator panel */}
        <AnimatePresence>
          {isCalcOpen && (
            <EngineeringCalculator
              isOpen={isCalcOpen}
              onClose={() => setIsCalcOpen(false)}
              accentColor={unitColor}
              accentDark={theme.dark}
            />
          )}
        </AnimatePresence>

        {/* Exit confirmation modal */}
        <AnimatePresence>
          {showExitConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
              onClick={handleCancelExit}
            >
              <div className="absolute inset-0 bg-black/40" />
              <motion.div
                className="relative w-full sm:w-auto bg-white"
                role="dialog"
                aria-modal="true"
                aria-labelledby="exit-confirm-title"
                style={{
                  maxWidth: 480,
                  borderRadius: 24,
                  padding: '20px 20px 32px',
                }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <p
                  id="exit-confirm-title"
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: '#3C3C3C',
                    marginBottom: 4,
                  }}
                >
                  Quit lesson?
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#AFAFAF',
                    marginBottom: 20,
                  }}
                >
                  Your progress on this lesson will be lost.
                </p>
                <div className="flex" style={{ gap: 12 }}>
                  <button
                    onClick={handleCancelExit}
                    className="flex-1 transition-transform active:scale-[0.98]"
                    style={{
                      padding: '14px 0',
                      borderRadius: 16,
                      fontSize: 14,
                      fontWeight: 800,
                      color: '#AFAFAF',
                      background: '#F5F5F5',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Keep going
                  </button>
                  <button
                    onClick={handleConfirmExit}
                    className="flex-1 transition-transform active:scale-[0.98]"
                    style={{
                      padding: '14px 0',
                      borderRadius: 16,
                      fontSize: 14,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      background: '#FF4B4B',
                      boxShadow: '0 4px 0 #CC2D2D',
                      border: 'none',
                      cursor: 'pointer',
                    }}
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
