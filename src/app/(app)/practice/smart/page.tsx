'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useStore, useSession, useSessionActions } from '@/store/useStore';
import SessionView from '@/components/session/SessionView';
import type { TopicId } from '@/data/types';

export default function SmartPracticePage() {
  return (
    <Suspense>
      <SmartPracticeInner />
    </Suspense>
  );
}

function SmartPracticeInner() {
  const { session, sessionSummary } = useSession();
  const { startSession } = useSessionActions();
  const searchParams = useSearchParams();
  const router = useRouter();
  const started = useRef(false);

  const topicFilter = searchParams.get('topic') as TopicId | null;

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Already have an active session or summary — just show it
    if (session || sessionSummary) return;

    startSession('smart-practice', {
      topicId: topicFilter ?? undefined,
    });

    // Check if session was actually created (startSession is sync — store updates immediately)
    const storeSession = useStore.getState().session;
    if (!storeSession) {
      // No questions available or session failed to start — go home
      router.replace('/');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fallback: if we've started but still have no session after mount, redirect
  useEffect(() => {
    if (started.current && !session && !sessionSummary) {
      const timer = setTimeout(() => {
        if (!useStore.getState().session && !useStore.getState().sessionSummary) {
          router.replace('/');
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [session, sessionSummary, router]);

  if (session || sessionSummary) {
    return <SessionView />;
  }

  return null;
}
