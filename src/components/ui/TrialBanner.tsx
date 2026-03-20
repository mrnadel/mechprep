'use client';

import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface TrialBannerProps {
  daysRemaining: number;
}

export function TrialBanner({ daysRemaining }: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || daysRemaining <= 0) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <p className="text-xs font-medium text-amber-800 truncate">
            {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} left in your Pro trial
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <Link
            href="/pricing"
            className="text-xs font-semibold text-amber-700 bg-amber-200 hover:bg-amber-300 px-2.5 py-1 rounded-full transition-colors"
          >
            Upgrade Now
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-0.5 text-amber-400 hover:text-amber-600 transition-colors"
            aria-label="Dismiss trial banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
