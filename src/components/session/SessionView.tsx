'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession, useSessionActions } from '@/store/useStore';
import { useBackHandler } from '@/hooks/useBackHandler';
import QuestionCard from '../lesson/QuestionCard';
import type { QuestionCardHandle } from '../lesson/QuestionCard';
import SessionSummary from './SessionSummary';
import { useMasteryStore } from '@/store/useMasteryStore';
import LessonProgressBar from '../lesson/LessonProgressBar';
import FlagButton from '@/components/feedback/FlagButton';

const PRACTICE_THEME = {
  color: '#6366F1',
  dark: '#4338CA',
  bg: '#EEF2FF',
};

export default function SessionView() {
  const { session, sessionSummary } = useSession();
  const { answerQuestion, nextQuestion, completeSession, abandonSession } = useSessionActions();
  const addMasteryEvent = useMasteryStore((s) => s.addEvent);
  const router = useRouter();

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [xpGain, setXpGain] = useState(0);
  const [hasSelection, setHasSelection] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const questionRef = useRef<QuestionCardHandle>(null);

  const handleExit = useCallback(() => {
    abandonSession();
    router.push('/');
  }, [abandonSession, router]);

  const handleExitClick = useCallback(() => {
    if (!session) return;
    if (Object.keys(session.answers).length === 0) {
      handleExit();
      return;
    }
    setShowExitConfirm(true);
  }, [session, handleExit]);

  useBackHandler(!!session && !sessionSummary, handleExitClick);

  // Sync mastery events to server when session completes
  const syncMastery = useMasteryStore((s) => s.syncToServer);
  useEffect(() => {
    if (sessionSummary) syncMastery();
  }, [sessionSummary, syncMastery]);

  // Derive current state
  const currentQuestion = session ? session.questions[session.currentIndex] : null;
  const answeredCount = session ? Object.keys(session.answers).length : 0;
  const totalQuestions = session ? session.questions.length : 0;
  const isLastQuestion = session ? session.currentIndex >= totalQuestions - 1 : false;
  const isCurrentAnswered = useMemo(() => {
    if (!session || !currentQuestion) return false;
    return currentQuestion.id in session.answers;
  }, [session, currentQuestion]);

  const getCorrectAnswerDisplay = useCallback((): string => {
    if (!currentQuestion) return '';
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return currentQuestion.options?.[currentQuestion.correctIndex ?? 0] ?? '';
      case 'true-false':
        return currentQuestion.correctAnswer ? 'True' : 'False';
      case 'fill-blank':
        return currentQuestion.blanks?.join(', ') ?? '';
      default:
        return '';
    }
  }, [currentQuestion]);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (!currentQuestion) return;
      answerQuestion(currentQuestion.id, correct);
      setLastAnswerCorrect(correct);
      if (correct) setXpGain((prev) => prev + 10);
      addMasteryEvent({
        questionId: currentQuestion.id,
        topicId: currentQuestion.topic,
        subtopic: currentQuestion.subtopic,
        difficulty: currentQuestion.difficulty,
        correct,
        source: 'practice',
      });
    },
    [currentQuestion, answerQuestion, addMasteryEvent]
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
      completeSession();
    } else {
      nextQuestion();
    }
  }, [isLastQuestion, completeSession, nextQuestion]);

  // Hotkey hint
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
      if (showExitConfirm) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setShowExitConfirm(false);
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        handleExitClick();
        return;
      }

      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

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
        } else if (['a', 'b', 'c', 'd', 'e'].includes(key)) {
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
  }, [showExitConfirm, isCurrentAnswered, hasSelection, handleCheck, handleContinue, handleExitClick]);

  if (sessionSummary) {
    return <SessionSummary summary={sessionSummary} />;
  }

  if (!session || !currentQuestion) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="session-view"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          backgroundColor: '#FAFAFA',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <div className="w-full h-full max-w-3xl flex flex-col bg-[#FAFAFA] lg:shadow-lg lg:border-x lg:border-gray-200">
          {/* Top bar — matches LessonView */}
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
              aria-label="Close practice"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="#AFAFAF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>

            <LessonProgressBar
              current={answeredCount}
              total={totalQuestions}
              color={PRACTICE_THEME.color}
            />

            {/* Debug: skip to end */}
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={completeSession}
                title="Debug: skip session"
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
            )}

            <motion.div
              className="flex-shrink-0 flex items-center"
              style={{
                gap: 4,
                padding: '4px 10px',
                borderRadius: 10,
                background: PRACTICE_THEME.bg,
                color: PRACTICE_THEME.dark,
                fontWeight: 800,
                fontSize: 13,
              }}
              key={xpGain}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.25 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" fill={PRACTICE_THEME.dark} />
              </svg>
              +{xpGain} XP
            </motion.div>
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
                    unitColor={PRACTICE_THEME.color}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom bar — Check or Feedback+Continue (matches LessonView) */}
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
                  background: hasSelection ? PRACTICE_THEME.color : '#E5E5E5',
                  color: hasSelection ? '#FFFFFF' : '#AFAFAF',
                  boxShadow: hasSelection
                    ? `0 4px 0 ${PRACTICE_THEME.dark}`
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
              <div style={{ marginBottom: 12 }}>
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
                <FlagButton contentType="question" contentId={currentQuestion.id} hasGraphic={!!currentQuestion.diagram} />
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
        </div>

        {/* Exit confirmation modal — matches LessonView */}
        <AnimatePresence>
          {showExitConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
              onClick={() => setShowExitConfirm(false)}
            >
              <div className="absolute inset-0 bg-black/40" />
              <motion.div
                className="relative w-full sm:w-auto bg-white"
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
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: '#3C3C3C',
                    marginBottom: 4,
                  }}
                >
                  Quit practice?
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#AFAFAF',
                    marginBottom: 20,
                  }}
                >
                  Your progress on this session will be lost.
                </p>
                <div className="flex" style={{ gap: 12 }}>
                  <button
                    onClick={() => setShowExitConfirm(false)}
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
                    onClick={() => {
                      setShowExitConfirm(false);
                      handleExit();
                    }}
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
