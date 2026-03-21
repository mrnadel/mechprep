'use client';

import { useState, useEffect } from 'react';
import { useSession, useSessionActions } from '@/store/useStore';
import { useBackHandler } from '@/hooks/useBackHandler';
import QuestionCard from '../question/QuestionCard';
import SessionSummary from './SessionSummary';
import { X, Clock, Zap } from 'lucide-react';
import { cn, formatDuration } from '@/lib/utils';
import { useMasteryStore } from '@/store/useMasteryStore';

export default function SessionView() {
  const { session, sessionSummary } = useSession();
  const { answerQuestion, nextQuestion, completeSession, abandonSession } = useSessionActions();
  const addMasteryEvent = useMasteryStore((s) => s.addEvent);

  // Mobile back button abandons session
  useBackHandler(!!session && !sessionSummary, abandonSession);

  const [elapsed, setElapsed] = useState(0);
  const startTime = session?.startTime;

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setElapsed(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Auto-complete on timeout (in useEffect to avoid state update during render)
  const timeLimit = session?.timeLimit;
  const isTimedOut = timeLimit != null && elapsed >= timeLimit;
  useEffect(() => {
    if (isTimedOut) {
      completeSession();
    }
  }, [isTimedOut, completeSession]);

  // Show summary
  if (sessionSummary) {
    return <SessionSummary summary={sessionSummary} />;
  }

  if (!session) return null;

  const currentQuestion = session.questions[session.currentIndex];
  const answeredCount = Object.keys(session.answers).length;
  const progress = ((session.currentIndex + 1) / session.questions.length) * 100;
  const timeRemaining = session.timeLimit ? session.timeLimit - elapsed : null;

  const handleAnswer = (correct: boolean, confidence?: number, timeSpent?: number) => {
    answerQuestion(currentQuestion.id, correct, confidence, timeSpent);
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
    if (session.currentIndex >= session.questions.length - 1) {
      completeSession();
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Session Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={abandonSession}
            aria-label="Abandon session"
            className="p-2 rounded-lg hover:bg-surface-100 transition-colors text-surface-400 hover:text-surface-600"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Timer */}
          {session.isTimed && timeRemaining !== null && (
            <div className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-mono font-medium',
              timeRemaining < 60 ? 'bg-red-100 text-red-700' :
              timeRemaining < 300 ? 'bg-amber-100 text-amber-700' :
              'bg-surface-100 text-surface-600'
            )}>
              <Clock className="w-4 h-4" />
              {formatDuration(timeRemaining)}
            </div>
          )}

          {!session.isTimed && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 text-surface-500 text-sm font-mono">
              <Clock className="w-4 h-4" />
              {formatDuration(elapsed)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-surface-500">
            {answeredCount} answered
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium">
            <Zap className="w-4 h-4" />
            {session.currentIndex + 1}/{session.questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar mb-8" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label={`Question ${session.currentIndex + 1} of ${session.questions.length}`}>
        <div
          className="progress-bar-fill bg-primary-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      {currentQuestion && (
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          questionNumber={session.currentIndex + 1}
          totalQuestions={session.questions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
