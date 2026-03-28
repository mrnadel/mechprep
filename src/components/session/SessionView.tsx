'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useStore, useSession, useSessionActions } from '@/store/useStore';
import SessionSummary from './SessionSummary';
import { useMasteryStore } from '@/store/useMasteryStore';
import { LessonView } from '@/components/lesson/LessonView';
import type { SessionAdapter } from '@/components/lesson/LessonView';

const PRACTICE_THEME = {
  color: '#3B82F6',
  dark: '#1D4ED8',
  bg: '#EFF6FF',
};

export default function SessionView() {
  const { session, sessionSummary } = useSession();
  const { answerQuestion, nextQuestion, completeSession, abandonSession } = useSessionActions();
  const addMasteryEvent = useMasteryStore((s) => s.addEvent);
  const syncMastery = useMasteryStore((s) => s.syncToServer);
  const router = useRouter();

  // Sync mastery events when session completes
  useEffect(() => {
    if (sessionSummary) syncMastery();
  }, [sessionSummary, syncMastery]);

  const handleExit = useCallback(() => {
    abandonSession();
    router.replace('/');
  }, [abandonSession, router]);

  const handleSubmitAnswer = useCallback(
    (questionId: string, correct: boolean) => {
      answerQuestion(questionId, correct);
      // Read latest session from store for question metadata
      const s = useStore.getState().session;
      const q = s?.questions.find((q) => q.id === questionId);
      if (q?.topic) {
        addMasteryEvent({
          questionId,
          topicId: q.topic,
          subtopic: q.subtopic,
          difficulty: q.difficulty,
          correct,
          source: 'practice',
        });
      }
    },
    [answerQuestion, addMasteryEvent]
  );

  if (sessionSummary) {
    return <SessionSummary summary={sessionSummary} />;
  }

  if (!session) return null;

  const currentQuestion = session.questions[session.currentIndex];
  if (!currentQuestion) return null;

  const adapter: SessionAdapter = {
    currentQuestion,
    answeredCount: Object.keys(session.answers).length,
    totalQuestions: session.questions.length,
    isCurrentAnswered: currentQuestion.id in session.answers,
    isLastQuestion: session.currentIndex >= session.questions.length - 1,
    unitColor: PRACTICE_THEME.color,
    theme: PRACTICE_THEME,
    isGolden: false,
    submitAnswer: handleSubmitAnswer,
    nextQuestion,
    complete: completeSession,
    exit: handleExit,
    hasAnswers: Object.keys(session.answers).length > 0,
    flagContentType: 'question',
    exitLabel: 'Close practice',
    exitConfirmTitle: 'Quit practice?',
    exitConfirmMessage: 'Your progress on this session will be lost.',
  };

  return <LessonView adapter={adapter} />;
}
