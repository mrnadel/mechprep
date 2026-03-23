'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { initMixpanel, identifyUser, resetUser, setSuperProperties, analytics } from '@/lib/mixpanel';
import { useStore } from '@/store/useStore';
import { useSubscriptionStore } from '@/hooks/useSubscription';

const CONSENT_KEY = 'mechready-cookie-consent';

export default function MixpanelProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  // Initialize Mixpanel when consent is given
  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
      initMixpanel();
    }

    function handleConsent(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === 'accepted') {
        initMixpanel();
      }
    }

    window.addEventListener('cookie-consent', handleConsent);
    return () => window.removeEventListener('cookie-consent', handleConsent);
  }, []);

  // Identify user and set profile properties (properties are free, not counted as events)
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const progress = useStore.getState().progress;
      identifyUser(session.user.id ?? session.user.email ?? 'unknown', {
        $email: session.user.email,
        $name: session.user.name,
        level: progress.currentLevel,
        total_xp: progress.totalXp,
        streak: progress.currentStreak,
        questions_answered: progress.totalQuestionsAttempted,
      });
    } else if (status === 'unauthenticated') {
      resetUser();
    }
  }, [session, status]);

  // Set super properties so every event includes subscription tier
  const subTier = useSubscriptionStore((s) => s.tier);
  const subFetched = useSubscriptionStore((s) => s.hasFetched);
  useEffect(() => {
    if (subFetched) {
      setSuperProperties({ plan: subTier });
    }
  }, [subTier, subFetched]);

  // Track session abandoned via Zustand subscribe
  // (session completed is tracked in SessionSummary)
  useEffect(() => {
    return useStore.subscribe(
      (state) => state.session,
      (current, previous) => {
        // Session was active and is now null, but no summary = abandoned
        if (!current && previous && !useStore.getState().sessionSummary) {
          const answers = Object.values(previous.answers);
          const correct = answers.filter(a => a.correct).length;
          const duration = Math.round((Date.now() - previous.startTime) / 1000);
          analytics.session({
            status: 'abandoned',
            mode: previous.type,
            questionsAttempted: answers.length,
            questionsCorrect: correct,
            accuracy: answers.length > 0 ? Math.round((correct / answers.length) * 100) : 0,
            xpEarned: answers.reduce((sum, a) => sum + a.xpAwarded, 0),
            durationSeconds: duration,
            topicId: previous.topicId,
          });
        }
      },
    );
  }, []);

  return <>{children}</>;
}
