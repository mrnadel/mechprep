'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, useSessionActions } from '@/store/useStore';
import { useBackHandler } from '@/hooks/useBackHandler';
import QuestionCard from '../question/QuestionCard';
import SessionSummary from './SessionSummary';
import { useMasteryStore } from '@/store/useMasteryStore';
import LessonProgressBar from '../lesson/LessonProgressBar';

const PRACTICE_THEME = {
  color: '#7B68EE',
  dark: '#5C49CE',
  bg: '#EDEAFF',
};

export default function SessionView() {
  const { session, sessionSummary } = useSession();
  const { answerQuestion, nextQuestion, completeSession, abandonSession } = useSessionActions();
  const addMasteryEvent = useMasteryStore((s) => s.addEvent);

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [xpGain, setXpGain] = useState(0);

  const handleExitClick = useCallback(() => {
    if (!session) return;
    if (Object.keys(session.answers).length === 0) {
      abandonSession();
      return;
    }
    setShowExitConfirm(true);
  }, [session, abandonSession]);

  // Mobile back button
  useBackHandler(!!session && !sessionSummary, handleExitClick);

  const [elapsed, setElapsed] = useState(0);
  const startTime = session?.startTime;

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setElapsed(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Auto-complete on timeout
  const timeLimit = session?.timeLimit;
  const isTimedOut = timeLimit != null && elapsed >= timeLimit;
  useEffect(() => {
    if (isTimedOut) completeSession();
  }, [isTimedOut, completeSession]);

  // Sync mastery events to server when session completes
  const syncMastery = useMasteryStore((s) => s.syncToServer);
  useEffect(() => {
    if (sessionSummary) syncMastery();
  }, [sessionSummary, syncMastery]);

  if (sessionSummary) {
    return <SessionSummary summary={sessionSummary} />;
  }

  if (!session) return null;

  const currentQuestion = session.questions[session.currentIndex];
  const answeredCount = Object.keys(session.answers).length;
  const totalQuestions = session.questions.length;
  const isLastQuestion = session.currentIndex >= totalQuestions - 1;

  const handleAnswer = (correct: boolean, confidence?: number, timeSpent?: number) => {
    answerQuestion(currentQuestion.id, correct, confidence, timeSpent);
    if (correct) setXpGain((prev) => prev + 10);
    addMasteryEvent({
      questionId: currentQuestion.id,
      topicId: currentQuestion.topic,
      subtopic: currentQuestion.subtopic,
      difficulty: currentQuestion.difficulty,
      correct,
      source: 'practice',
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      completeSession();
    } else {
      nextQuestion();
    }
  };

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
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                <QuestionCard
                  question={currentQuestion}
                  questionNumber={session.currentIndex + 1}
                  totalQuestions={totalQuestions}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                />
              </motion.div>
            </AnimatePresence>
          </div>
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
                      abandonSession();
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
