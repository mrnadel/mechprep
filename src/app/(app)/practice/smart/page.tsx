'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession, useSessionActions, useProgress } from '@/store/useStore';
import { useStore } from '@/store/useStore';
import { useCourseStore } from '@/store/useCourseStore';
import SessionView from '@/components/session/SessionView';
import {
  selectSmartPracticeQuestions,
  buildPerformance,
} from '@/lib/practice-algorithm';
import type { TopicId } from '@/data/types';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SmartPracticePage() {
  const { session, sessionSummary } = useSession();
  const { startSession, abandonSession } = useSessionActions();
  const progress = useProgress();
  const searchParams = useSearchParams();
  const started = useRef(false);
  const [noQuestions, setNoQuestions] = useState(false);

  const topicFilter = searchParams.get('topic') as TopicId | null;

  // Auto-start session on mount
  useEffect(() => {
    if (started.current || session || sessionSummary) return;
    started.current = true;

    const questions = useStore.getState().questions;
    const courseData = useCourseStore.getState().courseData;
    const perf = buildPerformance(
      progress.topicProgress,
      progress.sessionHistory,
    );

    const selected = selectSmartPracticeQuestions(
      questions,
      courseData,
      perf,
      { topicId: topicFilter ?? undefined },
    );

    if (selected.length === 0) {
      setNoQuestions(true);
      return;
    }

    startSession('smart-practice', {
      topicId: topicFilter ?? undefined,
      questionIds: selected.map(s => s.question.id),
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (session || sessionSummary) {
    return <SessionView />;
  }

  if (noQuestions) {
    return (
      <div className="max-w-2xl mx-auto text-center px-4 py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-100 mb-4">
          <span style={{ fontSize: 32, opacity: 0.4 }}>🧠</span>
        </div>
        <h1 className="text-xl font-bold text-surface-900 mb-2">No Questions Available</h1>
        <p className="text-surface-500 mb-6">
          {topicFilter
            ? 'No practice questions found for this topic. Try a different one!'
            : 'No practice questions available right now. Complete some lessons first!'}
        </p>
        <Link
          href={topicFilter ? '/skills' : '/'}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center px-4 py-12">
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
        style={{ background: '#EDEAFF' }}
      >
        <span style={{ fontSize: 32 }}>🧠</span>
      </div>
      <h1 className="text-xl font-bold text-surface-900 mb-2">Smart Practice</h1>
      <p className="text-surface-500 mb-6">
        {topicFilter
          ? `Preparing questions for ${topicFilter.replace(/-/g, ' ')}...`
          : 'Analyzing your weak areas and preparing questions...'}
      </p>
      <Link
        href={topicFilter ? '/skills' : '/'}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-surface-400 hover:text-surface-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Go back
      </Link>
    </div>
  );
}
