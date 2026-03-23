'use client';

import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useSubscription } from '@/hooks/useSubscription';
import { LIMITS } from '@/lib/pricing';

interface DailyLimitBannerProps {
  questionsUsedToday?: number;
}

export function DailyLimitBanner({ questionsUsedToday = 0 }: DailyLimitBannerProps) {
  const { isProUser, isLoading, hasFetched } = useSubscription();

  if (isLoading || !hasFetched || isProUser) return null;

  const limit = LIMITS.free.dailyQuestions;
  const remaining = Math.max(0, limit - questionsUsedToday);
  const pct = Math.min(100, (questionsUsedToday / limit) * 100);

  return (
    <div className="max-w-md mx-auto mb-6">
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-amber-700">
            Daily practice limit
          </span>
          <span className="text-xs font-semibold text-amber-800">
            {remaining} of {limit} remaining
          </span>
        </div>
        <div
          className="h-1.5 bg-amber-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={questionsUsedToday}
          aria-valuemin={0}
          aria-valuemax={limit}
          aria-label={`${questionsUsedToday} of ${limit} daily questions used`}
        >
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        {remaining === 0 && (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-amber-600">
              Daily limit reached. Resets at midnight.
            </span>
            <Link
              href="/pricing"
              className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              <Sparkles className="w-3 h-3" />
              Go unlimited
            </Link>
          </div>
        )}
        {remaining > 0 && remaining <= 2 && (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-amber-600">
              Running low on questions today
            </span>
            <Link
              href="/pricing"
              className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              <Sparkles className="w-3 h-3" />
              Go unlimited
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
