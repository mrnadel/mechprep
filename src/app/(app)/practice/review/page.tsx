'use client';

import { useState, useMemo, useCallback } from 'react';
import { useCourseStore } from '@/store/useCourseStore';
import { useMasteryStore } from '@/store/useMasteryStore';
import { getDecayedQuestions } from '@/lib/review-engine';
import LessonView from '@/components/lesson/LessonView';
import type { SessionAdapter } from '@/components/lesson/LessonView';
import type { CourseQuestion } from '@/data/course/types';
import { RefreshCw, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Mascot } from '@/components/ui/Mascot';
import { shuffleArray } from '@/lib/utils';

const REVIEW_SESSION_SIZE = 10;
const REVIEW_THEME = { color: '#6366f1', dark: '#4338ca', bg: '#eef2ff' };

export default function ReviewPage() {
  const courseData = useCourseStore((s) => s.courseData);
  const events = useMasteryStore((s) => s.events);
  const addMasteryEvent = useMasteryStore((s) => s.addEvent);

  const [active, setActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean }[]>([]);
  const [done, setDone] = useState(false);

  // Find all decayed questions and resolve them to CourseQuestion objects
  const reviewQuestions = useMemo(() => {
    const candidates = getDecayedQuestions(events, courseData);
    const questionMap = new Map<string, { question: CourseQuestion; topicId: string }>();

    for (const unit of courseData) {
      if (!unit?.lessons) continue;
      for (const lesson of unit.lessons) {
        if (!lesson?.questions) continue;
        for (const q of lesson.questions) {
          if (q.type !== 'teaching') {
            questionMap.set(q.id, { question: q, topicId: unit.topicId ?? '' });
          }
        }
      }
    }

    return candidates
      .map((c) => {
        const entry = questionMap.get(c.questionId);
        if (!entry) return null;
        return { ...c, ...entry };
      })
      .filter(Boolean) as (typeof candidates[number] & { question: CourseQuestion; topicId: string })[];
  }, [events, courseData]);

  const sessionQuestions = useMemo(
    () => shuffleArray(reviewQuestions.slice(0, REVIEW_SESSION_SIZE)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active],
  );

  const currentQ = sessionQuestions[currentIndex] ?? null;

  const handleSubmit = useCallback(
    (qId: string, correct: boolean) => {
      setAnswers((prev) => [...prev, { questionId: qId, correct }]);
      if (currentQ) {
        addMasteryEvent({
          questionId: qId,
          topicId: currentQ.topicId as never,
          difficulty: 'intermediate',
          correct,
          source: 'course',
        });
      }
    },
    [currentQ, addMasteryEvent],
  );

  const handleNext = useCallback(() => {
    if (currentIndex >= sessionQuestions.length - 1) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, sessionQuestions.length]);

  const handleExit = useCallback(() => {
    setActive(false);
    setCurrentIndex(0);
    setAnswers([]);
    setDone(false);
  }, []);

  // Build adapter for LessonView
  const adapter: SessionAdapter | null = useMemo(() => {
    if (!active || !currentQ || done) return null;
    return {
      currentQuestion: currentQ.question,
      answeredCount: answers.length,
      totalQuestions: sessionQuestions.length,
      isCurrentAnswered: answers.length > currentIndex,
      isLastQuestion: currentIndex >= sessionQuestions.length - 1,
      unitColor: '#6366f1',
      theme: REVIEW_THEME,
      isGolden: false,
      submitAnswer: handleSubmit,
      nextQuestion: handleNext,
      complete: () => setDone(true),
      exit: handleExit,
      hasAnswers: answers.length > 0,
      flagContentType: 'lesson-question',
      exitLabel: 'End Review',
      exitConfirmTitle: 'End review session?',
      exitConfirmMessage: 'Your progress on reviewed questions has been saved.',
      noHearts: true,
    };
  }, [active, currentQ, done, answers, currentIndex, sessionQuestions, handleSubmit, handleNext, handleExit]);

  // Active review session
  if (active && adapter && !done) {
    return <LessonView adapter={adapter} />;
  }

  // Done screen
  if (done) {
    const correctCount = answers.filter((a) => a.correct).length;
    const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <Mascot pose="celebrating" size={100} className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2">Review Complete!</h2>
        <p className="text-surface-500 mb-6">
          You got {correctCount} of {answers.length} right ({accuracy}% accuracy).
          {accuracy >= 80 ? ' Great recall!' : accuracy >= 50 ? ' Keep reviewing!' : ' These topics need more practice.'}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={handleExit} className="btn-secondary">
            Back to Review
          </button>
          <Link href="/" className="btn-primary">
            Home
          </Link>
        </div>
      </div>
    );
  }

  // Landing: show what needs review
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0 py-6 sm:py-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 mb-4 sm:mb-6">
          <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-surface-100 mb-3">Spaced Review</h1>
        <p className="text-surface-500 max-w-md mx-auto">
          Questions you learned before but might be forgetting. Review strengthens long-term memory.
        </p>
      </div>

      {reviewQuestions.length > 0 ? (
        <>
          <div className="card p-4 sm:p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <RefreshCw className="w-5 h-5 text-indigo-500" />
              <span className="font-semibold text-surface-900 dark:text-surface-100">
                {reviewQuestions.length} question{reviewQuestions.length !== 1 ? 's' : ''} need review
              </span>
            </div>
            <p className="text-sm text-surface-500">
              These are questions you previously answered correctly, but your mastery has faded over time.
              A quick review session will refresh your memory.
            </p>
          </div>

          <button
            onClick={() => { setActive(true); setCurrentIndex(0); setAnswers([]); setDone(false); }}
            className="btn-primary w-full text-lg py-3"
            style={{ background: '#6366f1' }}
          >
            Start Review ({Math.min(reviewQuestions.length, REVIEW_SESSION_SIZE)} questions)
            <ArrowRight className="w-4 h-4 ml-2 inline" />
          </button>
        </>
      ) : (
        <div className="card p-8 text-center">
          <Mascot pose="celebrating" size={80} className="mx-auto mb-4" />
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-surface-900 dark:text-surface-100">All caught up!</span>
          </div>
          <p className="text-surface-500 mb-4">
            Nothing needs review right now. Keep learning and come back later!
          </p>
          <Link href="/" className="btn-primary">
            Back to Course
          </Link>
        </div>
      )}
    </div>
  );
}
