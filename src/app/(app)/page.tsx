'use client';

import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { CourseHeader } from '@/components/course/CourseHeader';
import { CourseMap } from '@/components/course/CourseMap';
import { useCourseStore } from '@/store/useCourseStore';
import { useStore } from '@/store/useStore';
import { useEngagementStore, grantTitle, grantFrame } from '@/store/useEngagementStore';
import { streakMilestones } from '@/data/streak-milestones';
import { DailyGoalBar } from '@/components/course/DailyGoalBar';
import { useFeatureFlag } from '@/hooks/useFeatureFlags';
import { analytics } from '@/lib/mixpanel';

// Lazy-load heavy components that are conditionally rendered
const LandingPage = lazy(() => import('@/components/landing/LandingPage').then(m => ({ default: m.LandingPage })));
const LessonView = lazy(() => import('@/components/lesson/LessonView'));
const ResultScreen = lazy(() => import('@/components/lesson/ResultScreen'));
const WelcomeBack = lazy(() => import('@/components/engagement/WelcomeBack').then(m => ({ default: m.WelcomeBack })));
const LeaguePromotion = lazy(() => import('@/components/engagement/LeaguePromotion').then(m => ({ default: m.LeaguePromotion })));
const LeagueWinner = lazy(() => import('@/components/engagement/LeagueWinner').then(m => ({ default: m.LeagueWinner })));
const StreakFreeze = lazy(() => import('@/components/engagement/StreakFreeze').then(m => ({ default: m.StreakFreeze })));
const StreakMilestone = lazy(() => import('@/components/engagement/StreakMilestone').then(m => ({ default: m.StreakMilestone })));
const LevelUpCelebration = lazy(() => import('@/components/engagement/LevelUpCelebration').then(m => ({ default: m.LevelUpCelebration })));
const BlueprintCelebration = lazy(() => import('@/components/engagement/BlueprintCelebration').then(m => ({ default: m.BlueprintCelebration })));
const CourseCompleteCelebration = lazy(() => import('@/components/engagement/CourseCompleteCelebration').then(m => ({ default: m.CourseCompleteCelebration })));
const PlacementTestView = lazy(() => import('@/components/course/PlacementTestView'));
const PlacementTestResult = lazy(() => import('@/components/course/PlacementTestResult'));
const CourseIntroFlow = lazy(() => import('@/components/course/CourseIntroFlow').then(m => ({ default: m.CourseIntroFlow })));

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
  const startPlacementTest = useCourseStore((s) => s.startPlacementTest);
  const courseData = useCourseStore((s) => s.courseData);
  const currentStreak = useStore((s) => s.progress.currentStreak);
  const milestonesReached = useEngagementStore((s) => s.streak.milestonesReached);
  const addGems = useEngagementStore((s) => s.addGems);

  // Feature flags
  const flagLeagues = useFeatureFlag('engagement.leagues');
  const flagStreaks = useFeatureFlag('engagement.streaks');
  const flagCelebrations = useFeatureFlag('engagement.celebrations');
  const flagComeback = useFeatureFlag('engagement.comeback_flow');
  const flagDailyGoal = useFeatureFlag('ui.daily_goal_bar');
  const flagIntroFlow = useFeatureFlag('course.intro_flow');
  const flagPlacementTest = useFeatureFlag('course.placement_test');

  const setActiveProfession = useCourseStore((s) => s.setActiveProfession);

  // Apply pending placement from get-started flow (Google sign-in redirect)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('octokeen-placement');
      if (!raw) return;
      sessionStorage.removeItem('octokeen-placement');
      const { professionId, unitIndex } = JSON.parse(raw);
      if (professionId) setActiveProfession(professionId);
      if (unitIndex > 0) {
        useCourseStore.setState((s) => ({
          progress: { ...s.progress, placementUnitIndex: unitIndex },
        }));
      }
    } catch {}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Course intro flow: show when user hasn't completed intro for current profession
  // Skip for existing users who already have lesson progress (pre-feature migration)
  const completedLessons = useCourseStore((s) => s.progress.completedLessons);
  const hasExistingProgress = Object.keys(completedLessons).length > 0;
  const hasIntro = !!courseIntros?.[activeProfession];
  const [introDismissed, setIntroDismissed] = useState(false);
  const showCourseIntro = flagIntroFlow && !introDismissed && !hasExistingProgress && !hasIntro;

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

  return (
    <>
      {/* Course intro flow for new professions */}
      {showCourseIntro && (
        <Suspense fallback={null}>
          <CourseIntroFlow
            onComplete={(data) => {
              completeCourseIntro(activeProfession, data);

              if (data.placementChoice === 'test' || data.placementChoice === 'advanced') {
                // Find the highest unit that actually has content (questions) to test with
                const ratio = data.placementChoice === 'advanced' ? 0.6 : 0.5;
                const idealTarget = Math.min(
                  Math.max(1, Math.floor(courseData.length * ratio)),
                  courseData.length - 1,
                );
                // Walk backwards to find a unit that has lessons with questions
                let target = idealTarget;
                while (target > 0) {
                  const unit = courseData[target - 1]; // test questions come from units BEFORE target
                  if (unit?.lessons.some(l => l.questions.length > 0)) break;
                  target--;
                }
                if (target > 0) {
                  startPlacementTest(target);
                } else {
                  // No testable content, just start from scratch
                  startLesson(0, 0);
                }
              } else {
                startLesson(0, 0);
              }
            }}
            onDismiss={() => setIntroDismissed(true)}
          />
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

      {/* Daily goal progress */}
      {flagDailyGoal && <DailyGoalBar />}

      {/* Course map */}
      <CourseMap />

      <Suspense fallback={null}>
        {activeLesson && <LessonView />}
        {flagPlacementTest && activePlacementTest && <PlacementTestView />}
        {flagPlacementTest && placementTestResult && <PlacementTestResult />}
        {lessonResult && <ResultScreen />}
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
