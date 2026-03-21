'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store/useStore';
import { useCourseStore } from '@/store/useCourseStore';
import { useFeedbackStore } from '@/store/useFeedbackStore';

export function useDbSync() {
  const { status } = useSession();
  const [isHydrated, setIsHydrated] = useState(false);
  const isAuthenticated = status === 'authenticated';

  // On mount: fetch from DB and hydrate stores
  useEffect(() => {
    if (!isAuthenticated) {
      setIsHydrated(true);
      return;
    }

    let cancelled = false;

    async function hydrate() {
      try {
        const [progressRes, courseRes, feedbackRes, contentCourseRes, contentQuestionsRes] = await Promise.all([
          fetch('/api/progress'),
          fetch('/api/course-progress'),
          fetch('/api/content-feedback'),
          fetch('/api/content/course'),
          fetch('/api/content/questions'),
        ]);

        if (cancelled) return;

        if (progressRes.ok) {
          const data = await progressRes.json();
          if (data.progress) {
            useStore.setState({ progress: data.progress });
          }
        }

        if (courseRes.ok) {
          const data = await courseRes.json();
          if (data.progress) {
            useCourseStore.setState({ progress: data.progress });
          }
        }

        if (feedbackRes.ok) {
          const data = await feedbackRes.json();
          if (data.flags) {
            useFeedbackStore.getState().hydrateFlags(data.flags);
          }
        }

        if (contentCourseRes.ok) {
          const data = await contentCourseRes.json();
          if (data.course?.length) {
            useCourseStore.getState().setCourseData(data.course);
          }
        }

        if (contentQuestionsRes.ok) {
          const data = await contentQuestionsRes.json();
          if (data.questions?.length) {
            useStore.setState({ questions: data.questions });
          }
        }
      } catch (error) {
        console.error('Failed to hydrate from DB:', error);
      } finally {
        if (!cancelled) setIsHydrated(true);
      }
    }

    hydrate();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  // Subscribe to store changes and sync to DB (debounced)
  useEffect(() => {
    if (!isAuthenticated) return;

    let progressTimer: ReturnType<typeof setTimeout>;
    let courseTimer: ReturnType<typeof setTimeout>;

    const unsubProgress = useStore.subscribe(
      (state) => state.progress,
      () => {
        clearTimeout(progressTimer);
        progressTimer = setTimeout(() => {
          const progress = useStore.getState().progress;
          fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ progress }),
          }).catch(console.error);
        }, 800);
      }
    );

    const unsubCourse = useCourseStore.subscribe(
      (state) => state.progress,
      () => {
        clearTimeout(courseTimer);
        courseTimer = setTimeout(() => {
          const progress = useCourseStore.getState().progress;
          fetch('/api/course-progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ progress }),
          }).catch(console.error);
        }, 800);
      }
    );

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(courseTimer);
      unsubProgress();
      unsubCourse();
    };
  }, [isAuthenticated]);

  return { isHydrated };
}
