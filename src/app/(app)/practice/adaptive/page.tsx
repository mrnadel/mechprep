'use client';

import { useSession, useSessionActions } from '@/store/useStore';
import SessionView from '@/components/session/SessionView';
import { DailyLimitBanner } from '@/components/ui/DailyLimitBanner';
import { UpgradeGate } from '@/components/ui/UpgradeGate';
import { FEATURES } from '@/lib/pricing';
import { Zap } from 'lucide-react';

export default function AdaptivePracticePage() {
  const { session, sessionSummary } = useSession();
  const { startSession } = useSessionActions();

  if (session || sessionSummary) {
    return <SessionView />;
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-50 mb-6">
        <Zap className="w-10 h-10 text-primary-500" />
      </div>
      <h1 className="text-2xl font-bold text-surface-900 mb-3">Adaptive Practice</h1>
      <p className="text-surface-500 mb-8 max-w-md mx-auto">
        Questions are selected based on your performance. Weak areas get more attention.
        Difficulty adapts as you improve.
      </p>

      <UpgradeGate feature={FEATURES.ALL_PRACTICE_MODES} reason="Adaptive learning focuses on your weak areas and adjusts difficulty as you improve.">
        <DailyLimitBanner />

        <div className="space-y-3 max-w-sm mx-auto">
          <button onClick={() => startSession('adaptive')} className="btn-primary w-full text-lg py-3">
            Start Practice Session
          </button>
          <p className="text-xs text-surface-400">10 questions · Mixed topics · Adaptive difficulty</p>
        </div>
      </UpgradeGate>
    </div>
  );
}
