'use client';

import { useMemo } from 'react';
import { useCourseStore } from '@/store/useCourseStore';
import LessonView from '@/components/lesson/LessonView';
import type { SessionAdapter } from '@/components/lesson/LessonView';

const TEST_THEME = { color: 'var(--color-primary-500)', dark: 'var(--color-primary-700)', bg: 'var(--color-primary-50)' };

export default function PlacementTestView() {
  const test = useCourseStore((s) => s.activePlacementTest);
  const submit = useCourseStore((s) => s.submitPlacementAnswer);
  const next = useCourseStore((s) => s.nextPlacementQuestion);
  const complete = useCourseStore((s) => s.completePlacementTest);
  const exit = useCourseStore((s) => s.exitPlacementTest);

  const adapter: SessionAdapter | null = useMemo(() => {
    if (!test) return null;
    const q = test.questions[test.currentQuestionIndex];
    if (!q) return null;

    return {
      currentQuestion: q,
      answeredCount: test.answers.length,
      totalQuestions: test.questions.length,
      isCurrentAnswered: test.answers.some((a) => a.questionId === q.id),
      isLastQuestion: test.currentQuestionIndex >= test.questions.length - 1,
      unitColor: TEST_THEME.color,
      theme: TEST_THEME,
      isGolden: false,
      submitAnswer: submit,
      nextQuestion: next,
      complete,
      exit,
      hasAnswers: test.answers.length > 0,
      flagContentType: 'lesson-question' as const,
      exitLabel: 'Quit test',
      exitConfirmTitle: 'Quit placement test?',
      exitConfirmMessage:
        'Your test progress will be lost and the unit will remain locked.',
      noHearts: true,
    };
  }, [test, submit, next, complete, exit]);

  if (!adapter) return null;
  return <LessonView adapter={adapter} />;
}
