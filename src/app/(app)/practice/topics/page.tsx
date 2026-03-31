'use client';

import { useState, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession, useSessionActions, useProgress } from '@/store/useStore';
import { topics } from '@/data/topics';
import SessionView from '@/components/session/SessionView';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { cn, getDifficultyColor, getDifficultyLabel } from '@/lib/utils';
import { useIsDark } from '@/store/useThemeStore';
import type { Difficulty, TopicId } from '@/data/types';

function TopicDeepDiveContent() {
  const searchParams = useSearchParams();
  const preselectedTopic = searchParams.get('topic');
  const [selectedTopic, setSelectedTopic] = useState<TopicId | null>(preselectedTopic as TopicId | null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | undefined>(undefined);
  const { session, sessionSummary } = useSession();
  const { startSession } = useSessionActions();
  const progress = useProgress();
  const startPanelRef = useRef<HTMLDivElement>(null);
  const isDark = useIsDark();

  const handleTopicSelect = useCallback((topicId: TopicId) => {
    setSelectedTopic(topicId);
    // Auto-scroll to the start panel after React renders it
    setTimeout(() => {
      startPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }, []);

  if (session || sessionSummary) {
    return <SessionView />;
  }

  const handleStart = () => {
    if (!selectedTopic) return;
    startSession('topic-deep-dive', { topicId: selectedTopic, difficulty: selectedDifficulty });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <PageHeader title="Topic Deep Dive" subtitle="Choose a topic and difficulty, then go deep" />

      <div className="px-4 sm:px-5 pt-4 pb-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {topics.map((topic) => {
            const tp = progress.topicProgress.find(t => t.topicId === topic.id);
            const attempted = tp?.questionsAttempted ?? 0;
            const correct = tp?.questionsCorrect ?? 0;
            const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
            const isSelected = selectedTopic === topic.id;

            return (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic.id as TopicId)}
                className={cn(
                  'relative bg-white dark:bg-surface-900 rounded-2xl text-left transition-all duration-200 overflow-hidden group',
                  isSelected
                    ? 'ring-2 ring-offset-1 dark:ring-offset-surface-950 shadow-md'
                    : 'border border-gray-100 dark:border-surface-700 hover:border-gray-200 dark:hover:border-surface-600 hover:shadow-sm'
                )}
                style={isSelected ? { '--tw-ring-color': topic.color } as React.CSSProperties : undefined}
              >
                {/* Colored top accent */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: isSelected ? topic.color : (isDark ? '#334155' : '#E5E7EB') }}
                />

                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${topic.color}15` }}
                    >
                      {topic.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900 dark:text-surface-50 truncate">{topic.name}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: topic.color }} />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 dark:text-surface-500 mt-0.5 line-clamp-2">{topic.description}</p>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-400 dark:text-surface-500">
                      {attempted > 0 ? `${accuracy}% accuracy · ${attempted} Qs` : 'Not started'}
                    </span>
                    <span className={cn(
                      'text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full',
                      topic.interviewRelevance === 'critical' ? (isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-500') :
                      topic.interviewRelevance === 'high' ? (isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-500') :
                      (isDark ? 'bg-surface-800 text-surface-500' : 'bg-gray-50 text-gray-400')
                    )}>
                      {topic.interviewRelevance}
                    </span>
                  </div>

                  {/* Accuracy bar */}
                  {attempted > 0 && (
                    <div className="mt-3 h-1.5 bg-gray-100 dark:bg-surface-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${accuracy}%`,
                          background: accuracy >= 80 ? '#10B981' : accuracy >= 60 ? '#F59E0B' : '#EF4444',
                        }}
                      />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selectedTopic && (
          <div ref={startPanelRef} className="bg-white dark:bg-surface-900 rounded-2xl border border-gray-100 dark:border-surface-700 p-4 sm:p-6 mb-6 animate-slide-up">
            <h3 className="font-bold text-gray-900 dark:text-surface-50 mb-4">Select Difficulty (optional)</h3>
            <div className="flex gap-3 flex-wrap mb-6">
              <button
                onClick={() => setSelectedDifficulty(undefined)}
                className={cn(
                  'px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-colors',
                  !selectedDifficulty
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'border-gray-200 dark:border-surface-600 text-gray-400 dark:text-surface-400 hover:border-gray-300 dark:hover:border-surface-500'
                )}
              >
                All Levels
              </button>
              {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={cn(
                    'px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-colors',
                    selectedDifficulty === d
                      ? cn('border-current', getDifficultyColor(d))
                      : 'border-gray-200 dark:border-surface-600 text-gray-400 dark:text-surface-400 hover:border-gray-300 dark:hover:border-surface-500'
                  )}
                >
                  {getDifficultyLabel(d)}
                </button>
              ))}
            </div>

            <button onClick={handleStart} className="btn-primary w-full sm:w-auto">
              Start Deep Dive <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TopicDeepDivePage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-surface-500">Loading topics...</div>}>
      <TopicDeepDiveContent />
    </Suspense>
  );
}
