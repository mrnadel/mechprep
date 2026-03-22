'use client';

import { useSession, useSessionActions, useProgress } from '@/store/useStore';
import SessionView from '@/components/session/SessionView';
import { DailyLimitBanner } from '@/components/ui/DailyLimitBanner';
import { Calendar, Star, Flame } from 'lucide-react';
import { dailyChallenges } from '@/data/daily-challenges';

export default function DailyChallengePage() {
  const { session, sessionSummary } = useSession();
  const { startSession } = useSessionActions();
  const progress = useProgress();

  if (session || sessionSummary) {
    return <SessionView />;
  }

  const today = new Date().getDay();
  const challenge = dailyChallenges.find(c => c.dayOfWeek === today) || dailyChallenges[0];

  return (
    <div className="max-w-2xl mx-auto text-center px-4 sm:px-0 py-8 sm:py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 mb-4 sm:mb-6">
        <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-surface-900 mb-1">Daily Challenge</h1>
      <p className="text-base sm:text-lg font-semibold text-amber-600 mb-3">{challenge.theme}</p>
      <p className="text-surface-500 mb-6 sm:mb-8 max-w-md mx-auto">
        {challenge.description}
      </p>

      <div className="card p-6 mb-8 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="font-semibold text-surface-800">Today&apos;s Challenge</span>
          </div>
          <span className="text-xs text-surface-400">{challenge.dayName}</span>
        </div>
        <div className="text-sm text-surface-600 space-y-2">
          <p>5 curated questions on today&apos;s theme</p>
          <p>Bonus XP for completing the challenge</p>
        </div>
        <div className="mt-4 pt-4 border-t border-surface-200 flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-amber-600">
            <Star className="w-4 h-4" /> Bonus XP
          </span>
          <span className="flex items-center gap-1 text-orange-600">
            <Flame className="w-4 h-4" /> Streak builder
          </span>
        </div>
      </div>

      <DailyLimitBanner />

      <button
        onClick={() => startSession('daily-challenge', { questionIds: challenge.questionIds })}
        className="btn-primary text-lg py-3 px-8 bg-amber-500 hover:bg-amber-600"
      >
        Start Today&apos;s Challenge
      </button>
      <p className="text-xs text-surface-400 mt-3">
        {progress.dailyChallengesCompleted} challenges completed so far
      </p>
    </div>
  );
}
