'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store/useStore';
import { useCourseStore } from '@/store/useCourseStore';
import { useFeedbackStore } from '@/store/useFeedbackStore';
import { useEngagementStore } from '@/store/useEngagementStore';
import { streakMilestones } from '@/data/streak-milestones';
import { shallow } from 'zustand/shallow';

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
        const activeProfession = useCourseStore.getState().activeProfession;
        const [progressRes, courseRes, feedbackRes, contentCourseRes] = await Promise.all([
          fetch('/api/progress'),
          fetch('/api/course-progress'),
          fetch('/api/content-feedback'),
          fetch(`/api/content/course?profession=${encodeURIComponent(activeProfession)}`),
        ]);

        if (cancelled) return;

        if (progressRes.ok) {
          const data = await progressRes.json();
          if (data.progress) {
            // Merge DB progress with local state to avoid overwriting
            // data changed while the fetch was in-flight
            const local = useStore.getState().progress;
            const db = data.progress;
            const restoredStreak = Math.max(db.currentStreak ?? 0, local.currentStreak ?? 0);
            useStore.setState({
              progress: {
                ...db,
                totalXp: Math.max(db.totalXp ?? 0, local.totalXp ?? 0),
                currentStreak: restoredStreak,
                longestStreak: Math.max(db.longestStreak ?? 0, local.longestStreak ?? 0),
                lastActiveDate: (db.lastActiveDate ?? '') > (local.lastActiveDate ?? '')
                  ? db.lastActiveDate : local.lastActiveDate,
                activeDays: local.activeDays, // client-only field
              },
            });

            // Backfill streak milestones so popups don't replay after cache clear.
            // If the engagement store has fewer milestones than the restored streak
            // warrants, mark all lower milestones as already reached.
            const engStreak = useEngagementStore.getState().streak;
            const reached = new Set(engStreak.milestonesReached);
            const milestoneDays = streakMilestones.map((m) => m.days);
            let changed = false;
            for (const days of milestoneDays) {
              if (days <= restoredStreak && !reached.has(days)) {
                reached.add(days);
                changed = true;
              }
            }
            if (changed) {
              useEngagementStore.setState((s) => ({
                streak: { ...s.streak, milestonesReached: [...reached] },
              }));
            }
          }
        }

        if (courseRes.ok) {
          const data = await courseRes.json();
          if (data.progress) {
            // Merge DB progress with local state instead of replacing,
            // so we don't overwrite lessons completed while the fetch was in-flight
            const local = useCourseStore.getState().progress;
            const localProfession = useCourseStore.getState().activeProfession;
            const db = data.progress;
            const mergedLessons = { ...db.completedLessons };
            for (const [id, localLesson] of Object.entries(local.completedLessons)) {
              const dbLesson = mergedLessons[id];
              if (!dbLesson || localLesson.attempts > dbLesson.attempts ||
                  localLesson.bestAccuracy > (dbLesson.bestAccuracy ?? 0)) {
                mergedLessons[id] = localLesson;
              }
            }

            // Merge courseIntros: DB wins for keys not in local
            const mergedIntros = { ...(db.courseIntros ?? {}), ...(local.courseIntros ?? {}) };

            // Restore activeProfession from DB if local is still the default
            // (indicates localStorage was cleared)
            const dbProfession = data.activeProfession;
            const restoredProfession =
              localProfession === 'mechanical-engineering' && dbProfession && dbProfession !== 'mechanical-engineering'
                ? dbProfession
                : localProfession;

            useCourseStore.setState({
              activeProfession: restoredProfession,
              progress: {
                ...db,
                totalXp: Math.max(db.totalXp, local.totalXp),
                currentStreak: Math.max(db.currentStreak, local.currentStreak),
                longestStreak: Math.max(db.longestStreak, local.longestStreak),
                lastActiveDate: db.lastActiveDate > local.lastActiveDate
                  ? db.lastActiveDate : local.lastActiveDate,
                activeDays: local.activeDays, // client-only field, never from DB
                completedLessons: mergedLessons,
                courseIntros: Object.keys(mergedIntros).length > 0 ? mergedIntros : undefined,
              },
            });
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
          // Only apply DB course data if the user is still on the same profession
          // (DB currently only has ME content; other professions use static data)
          if (data.course?.length && useCourseStore.getState().activeProfession === activeProfession) {
            useCourseStore.getState().setCourseData(data.course);
          }
        }

        // Practice questions removed — all questions come from course data now
        // contentQuestionsRes is unused

        // Merge guest trial XP earned before registration
        try {
          const guestData = sessionStorage.getItem('mechready-guest-xp');
          if (guestData) {
            const { xp } = JSON.parse(guestData);
            if (xp > 0) {
              const current = useStore.getState().progress;
              useStore.setState({
                progress: {
                  ...current,
                  totalXp: current.totalXp + xp,
                },
              });
            }
            sessionStorage.removeItem('mechready-guest-xp');
          }
        } catch {}
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
      (state) => ({ progress: state.progress, activeProfession: state.activeProfession }),
      () => {
        clearTimeout(courseTimer);
        courseTimer = setTimeout(async () => {
          const { progress, activeProfession } = useCourseStore.getState();
          try {
            const res = await fetch('/api/course-progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ progress, activeProfession }),
            });
            if (!res.ok) {
              const data = await res.json().catch(() => ({}));
              console.error('course-progress sync failed:', res.status, data);
            }
          } catch (err) {
            console.error('course-progress sync error:', err);
          }
        }, 800);
      },
      { equalityFn: shallow },
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
