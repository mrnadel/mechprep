'use client';

import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { CourseHeader } from '@/components/course/CourseHeader';
import { CourseMap } from '@/components/course/CourseMap';
import { ActiveEventBanner } from '@/components/ui/ActiveEventBanner';
import { useCourseStore } from '@/store/useCourseStore';
import { useStore } from '@/store/useStore';
import { useEngagementStore, grantTitle, grantFrame } from '@/store/useEngagementStore';
import { streakMilestones } from '@/data/streak-milestones';
import { useFeatureFlag } from '@/hooks/useFeatureFlags';
import { analytics } from '@/lib/mixpanel';
import { STORAGE_KEYS } from '@/lib/storage-keys';

// Lazy-load heavy components that are conditionally rendered
const LandingPage = lazy(() => import('@/components/landing/LandingPage').then(m => ({ default: m.LandingPage })));
const LessonView = lazy(() => import('@/components/lesson/LessonView'));
const ResultScreen = lazy(() => import('@/components/lesson/ResultScreen'));
const WelcomeBack = lazy(() => import('@/components/engagement/WelcomeBack').then(m => ({ default: m.WelcomeBack })));
const LeaguePromotion = lazy(() => import('@/components/engagement/LeaguePromotion').then(m => ({ default: m.LeaguePromotion })));
const LeagueWinner = lazy(() => import('@/components/engagement/LeagueWinner').then(m => ({ default: m.LeagueWinner })));
const StreakFreeze = lazy(() => import('@/components/engagement/StreakFreeze').then(m => ({ default: m.StreakFreeze })));
const StreakContinued = lazy(() => import('@/components/engagement/StreakContinued').then(m => ({ default: m.StreakContinued })));
const StreakMilestone = lazy(() => import('@/components/engagement/StreakMilestone').then(m => ({ default: m.StreakMilestone })));
const LevelUpCelebration = lazy(() => import('@/components/engagement/LevelUpCelebration').then(m => ({ default: m.LevelUpCelebration })));
const BlueprintCelebration = lazy(() => import('@/components/engagement/BlueprintCelebration').then(m => ({ default: m.BlueprintCelebration })));
const CourseCompleteCelebration = lazy(() => import('@/components/engagement/CourseCompleteCelebration').then(m => ({ default: m.CourseCompleteCelebration })));
const PlacementTestView = lazy(() => import('@/components/course/PlacementTestView'));
const PlacementTestResult = lazy(() => import('@/components/course/PlacementTestResult'));
const CourseIntroFlow = lazy(() => import('@/components/course/CourseIntroFlow').then(m => ({ default: m.CourseIntroFlow })));
const OnboardingPlacementTest = lazy(() => import('@/components/course/OnboardingPlacementTest').then(m => ({ default: m.OnboardingPlacementTest })));

export default function HomePage() {
  const { status } = useSession();
  const activeLesson = useCourseStore((s) => s.activeLesson);
  const lessonResult = useCourseStore((s) => s.lessonResult);
  const activePlacementTest = useCourseStore((s) => s.activePlacementTest);
  const placementTestResult = useCourseStore((s) => s.placementTestResult);
  const chapterJustCompleted = useCourseStore((s) => s.chapterJustCompleted);
  const dismissChapterCompletion = useCourseStore((s) => s.dismissChapterCompletion);
  const courseJustCompleted = useCourseStore((s) => s.courseJustCompleted);
  const dismissCourseCompletion = useCourseStore((s) => s.dismissCourseCompletion);
  const pendingCelebrations = useCourseStore((s) => s.pendingCelebrations);
  const dismissNextCelebration = useCourseStore((s) => s.dismissNextCelebration);
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const completeCourseIntro = useCourseStore((s) => s.completeCourseIntro);
  const courseIntros = useCourseStore((s) => s.progress.courseIntros);
  const startLesson = useCourseStore((s) => s.startLesson);
  const currentStreak = useStore((s) => s.progress.currentStreak);
  const milestonesReached = useEngagementStore((s) => s.streak.milestonesReached);
  const addGems = useEngagementStore((s) => s.addGems);

  // Feature flags
  const flagLeagues = useFeatureFlag('engagement.leagues');
  const flagStreaks = useFeatureFlag('engagement.streaks');
  const flagCelebrations = useFeatureFlag('engagement.celebrations');
  const flagComeback = useFeatureFlag('engagement.comeback_flow');
  const flagIntroFlow = useFeatureFlag('course.intro_flow');
  const flagPlacementTest = useFeatureFlag('course.placement_test');

  const setActiveProfession = useCourseStore((s) => s.setActiveProfession);

  // Apply pending placement from get-started flow (Google sign-in redirect)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEYS.PLACEMENT);
      if (!raw) return;
      sessionStorage.removeItem(STORAGE_KEYS.PLACEMENT);
      const { professionId, unitIndex } = JSON.parse(raw);
      if (professionId) setActiveProfession(professionId);
      if (unitIndex > 0) {
        useCourseStore.setState((s) => {
          const prev = s.progress;
          const prevIntro = prev.courseIntros?.[professionId];
          return {
            progress: {
              ...prev,
              placementUnitIndex: unitIndex,
              courseIntros: prevIntro ? {
                ...prev.courseIntros,
                [professionId]: { ...prevIntro, placementUnitIndex: unitIndex },
              } : prev.courseIntros,
            },
          };
        });
      }
    } catch {}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Course intro flow: show when user hasn't completed intro for current profession
  // Check progress for the ACTIVE course only — so switching to a new course triggers the intro
  const completedLessons = useCourseStore((s) => s.progress.completedLessons);
  const courseData = useCourseStore((s) => s.courseData);
  const hasProgressInCurrentCourse = useMemo(() => {
    for (const unit of courseData) {
      for (const lesson of unit.lessons) {
        if (completedLessons[lesson.id]) return true;
      }
    }
    return false;
  }, [courseData, completedLessons]);
  const introData = courseIntros?.[activeProfession];
  const hasIntro = !!introData;
  const [introDismissed, setIntroDismissed] = useState(false);

  // Inline placement test after course intro (same test as onboarding)
  const [introPlacementConfig, setIntroPlacementConfig] = useState<{ startFraction: number } | null>(null);

  // Reset dismiss + placement config when switching to a different profession
  useEffect(() => { setIntroDismissed(false); setIntroPlacementConfig(null); }, [activeProfession]);

  // No progress in current course → show intro (first time) or placement test (returning)
  const showCourseIntro = flagIntroFlow && !introDismissed && !hasProgressInCurrentCourse && !hasIntro;

  // If intro was already done but user never completed a lesson, jump straight to placement test
  // (skip if user already completed placement for this course)
  useEffect(() => {
    if (!flagIntroFlow || introDismissed || hasProgressInCurrentCourse || !hasIntro || introPlacementConfig) return;
    if (introData?.placementDone) return;
    // Use stored experience level to determine start fraction
    const fractionMap: Record<number, number> = { 0: 0, 1: 0, 2: 0.3, 3: 0.6 };
    const startFraction = fractionMap[introData?.experienceLevel ?? 0] ?? 0;
    setIntroPlacementConfig({ startFraction });
  }, [flagIntroFlow, introDismissed, hasProgressInCurrentCourse, hasIntro, introPlacementConfig, introData]);

  // Detect streak milestone to show
  const [shownMilestone, setShownMilestone] = useState<number | null>(null);

  const unclaimedMilestone = useMemo(() => {
    for (let i = streakMilestones.length - 1; i >= 0; i--) {
      const m = streakMilestones[i];
      if (currentStreak >= m.days && !milestonesReached.includes(m.days)) {
        return m;
      }
    }
    return null;
  }, [currentStreak, milestonesReached]);

  useEffect(() => {
    if (unclaimedMilestone && shownMilestone !== unclaimedMilestone.days) {
      setShownMilestone(unclaimedMilestone.days);
    }
  }, [unclaimedMilestone, shownMilestone]);

  const handleMilestoneClose = () => {
    if (unclaimedMilestone) {
      analytics.milestone({ type: 'streak', name: `${unclaimedMilestone.days}_day_streak`, value: unclaimedMilestone.days });
      addGems(unclaimedMilestone.gems, `streak_milestone_${unclaimedMilestone.days}`);

      // Grant milestone frame + title to inventory
      if (unclaimedMilestone.frameId) grantFrame(unclaimedMilestone.frameId);
      if (unclaimedMilestone.titleId) grantTitle(unclaimedMilestone.titleId);
      useEngagementStore.setState((s) => ({
        streak: {
          ...s.streak,
          milestonesReached: [...s.streak.milestonesReached, unclaimedMilestone.days],
        },
      }));
    }
    setShownMilestone(null);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-surface-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <Suspense fallback={null}>
        <LandingPage />
      </Suspense>
    );
  }

  // Lesson flow covers: active lesson → result screen → celebrations → chapter/course completion.
  // An opaque backdrop stays mounted through ALL phases so the home page never flashes between screens.
  const lessonFlowActive = !!(
    activeLesson ||
    lessonResult ||
    (flagCelebrations && (
      pendingCelebrations.length > 0 ||
      chapterJustCompleted ||
      courseJustCompleted
    ))
  );

  return (
    <>
      {/* Course intro flow for new professions */}
      {showCourseIntro && !introPlacementConfig && (
        <Suspense fallback={null}>
          <CourseIntroFlow
            onComplete={(data) => {
              completeCourseIntro(activeProfession, data);

              if (data.placementChoice === 'test' || data.placementChoice === 'advanced') {
                // Map experience level → start fraction (same as onboarding)
                const fractionMap: Record<number, number> = { 1: 0, 2: 0.3, 3: 0.6 };
                const startFraction = fractionMap[data.experienceLevel] ?? 0;
                setIntroPlacementConfig({ startFraction });
              } else {
                startLesson(0, 0);
              }
            }}
            onDismiss={() => setIntroDismissed(true)}
          />
        </Suspense>
      )}

      {/* Inline placement test after course intro (same test as onboarding) */}
      {introPlacementConfig && (
        <Suspense fallback={null}>
          <div className="fixed inset-0 z-[60] bg-[#FAFAFA] dark:bg-surface-950">
            <OnboardingPlacementTest
              professionId={activeProfession}
              startFraction={introPlacementConfig.startFraction}
              onComplete={(unitIndex) => {
                setIntroPlacementConfig(null);
                setIntroDismissed(true);
                useCourseStore.setState((s) => {
                  const prev = s.progress;
                  const prevIntro = prev.courseIntros?.[activeProfession];
                  return {
                    progress: {
                      ...prev,
                      ...(unitIndex > 0 ? { placementUnitIndex: unitIndex } : {}),
                      courseIntros: {
                        ...prev.courseIntros,
                        ...(prevIntro ? { [activeProfession]: { ...prevIntro, placementDone: true, placementUnitIndex: unitIndex } } : {}),
                      },
                    },
                  };
                });
              }}
              onExit={() => {
                setIntroPlacementConfig(null);
                setIntroDismissed(true);
              }}
            />
          </div>
        </Suspense>
      )}

      {/* Overlays - lazy loaded, gated by feature flags */}
      <Suspense fallback={null}>
        {flagComeback && <WelcomeBack />}
        {flagLeagues && <LeagueWinner />}
        {flagLeagues && <LeaguePromotion />}
        {flagStreaks && <StreakFreeze />}
        {flagStreaks && unclaimedMilestone && shownMilestone === unclaimedMilestone.days && (
          <StreakMilestone milestone={unclaimedMilestone} onClose={handleMilestoneClose} />
        )}
      </Suspense>

      {/* Header */}
      <CourseHeader />

      {/* Active XP events (weekend double XP, power hour, league sprint) */}
      <div className="px-4 max-w-lg mx-auto">
        <ActiveEventBanner />
      </div>

      {/* Course map */}
      <CourseMap />

      {/* Opaque backdrop stays mounted during entire lesson flow so home page never flashes */}
      {lessonFlowActive && (
        <div className="fixed inset-0 z-50 bg-[#FAFAFA] dark:bg-surface-950" aria-hidden="true" />
      )}

      <Suspense fallback={null}>
        {activeLesson && <LessonView />}
        {flagPlacementTest && activePlacementTest && <PlacementTestView />}
        {flagPlacementTest && placementTestResult && <PlacementTestResult />}
        {lessonResult && <ResultScreen />}
        {flagCelebrations && !lessonResult && pendingCelebrations.length > 0 && pendingCelebrations[0].type === 'streak-continued' && (
          <StreakContinued
            streak={pendingCelebrations[0].streak}
            onClose={dismissNextCelebration}
          />
        )}
        {flagCelebrations && !lessonResult && pendingCelebrations.length > 0 && pendingCelebrations[0].type === 'level-up' && (
          <LevelUpCelebration
            reward={pendingCelebrations[0].reward}
            onClose={dismissNextCelebration}
          />
        )}
        {flagCelebrations && !lessonResult && pendingCelebrations.length === 0 && chapterJustCompleted && (
          <BlueprintCelebration
            unitIndex={chapterJustCompleted.unitIndex}
            isGolden={chapterJustCompleted.isGolden}
            onDismiss={dismissChapterCompletion}
          />
        )}
        {flagCelebrations && !lessonResult && pendingCelebrations.length === 0 && !chapterJustCompleted && courseJustCompleted && (
          <CourseCompleteCelebration onDismiss={dismissCourseCompletion} />
        )}
      </Suspense>
    </>
  );
}
