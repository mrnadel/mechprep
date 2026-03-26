'use client';

import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { CourseHeader } from '@/components/course/CourseHeader';
import { CourseMap } from '@/components/course/CourseMap';
import { useCourseStore } from '@/store/useCourseStore';
import { useStore } from '@/store/useStore';
import { useEngagementStore, grantTitle, grantFrame } from '@/store/useEngagementStore';
import { streakMilestones } from '@/data/streak-milestones';
import { PracticeCard } from '@/components/course/PracticeCard';
import { analytics } from '@/lib/mixpanel';

// Lazy-load heavy components that are conditionally rendered
const LandingPage = lazy(() => import('@/components/landing/LandingPage').then(m => ({ default: m.LandingPage })));
const LessonView = lazy(() => import('@/components/lesson/LessonView'));
const ResultScreen = lazy(() => import('@/components/lesson/ResultScreen'));
const WelcomeBack = lazy(() => import('@/components/engagement/WelcomeBack').then(m => ({ default: m.WelcomeBack })));
const LeaguePromotion = lazy(() => import('@/components/engagement/LeaguePromotion').then(m => ({ default: m.LeaguePromotion })));
const StreakFreeze = lazy(() => import('@/components/engagement/StreakFreeze').then(m => ({ default: m.StreakFreeze })));
const StreakMilestone = lazy(() => import('@/components/engagement/StreakMilestone').then(m => ({ default: m.StreakMilestone })));
const LevelUpCelebration = lazy(() => import('@/components/engagement/LevelUpCelebration').then(m => ({ default: m.LevelUpCelebration })));
const BlueprintCelebration = lazy(() => import('@/components/engagement/BlueprintCelebration').then(m => ({ default: m.BlueprintCelebration })));
const CourseCompleteCelebration = lazy(() => import('@/components/engagement/CourseCompleteCelebration').then(m => ({ default: m.CourseCompleteCelebration })));
const PlacementTestView = lazy(() => import('@/components/course/PlacementTestView'));
const PlacementTestResult = lazy(() => import('@/components/course/PlacementTestResult'));

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
  const currentStreak = useStore((s) => s.progress.currentStreak);
  const milestonesReached = useEngagementStore((s) => s.streak.milestonesReached);
  const addGems = useEngagementStore((s) => s.addGems);

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
    return null;
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
      {/* Overlays - lazy loaded since they're conditional modals */}
      <Suspense fallback={null}>
        <WelcomeBack />
        <LeaguePromotion />
        <StreakFreeze />
        {unclaimedMilestone && shownMilestone === unclaimedMilestone.days && (
          <StreakMilestone milestone={unclaimedMilestone} onClose={handleMilestoneClose} />
        )}
      </Suspense>

      {/* Header */}
      <CourseHeader />

      {/* Smart Practice card */}
      <PracticeCard />

      {/* Course map */}
      <CourseMap />

      <Suspense fallback={null}>
        {(activeLesson || lessonResult) && <LessonView />}
        {activePlacementTest && <PlacementTestView />}
        {placementTestResult && <PlacementTestResult />}
        {lessonResult && <ResultScreen />}
        {!lessonResult && pendingCelebrations.length > 0 && pendingCelebrations[0].type === 'level-up' && (
          <LevelUpCelebration
            reward={pendingCelebrations[0].reward}
            onClose={dismissNextCelebration}
          />
        )}
        {!lessonResult && pendingCelebrations.length === 0 && chapterJustCompleted && (
          <BlueprintCelebration
            unitIndex={chapterJustCompleted.unitIndex}
            isGolden={chapterJustCompleted.isGolden}
            onDismiss={dismissChapterCompletion}
          />
        )}
        {!lessonResult && pendingCelebrations.length === 0 && !chapterJustCompleted && courseJustCompleted && (
          <CourseCompleteCelebration onDismiss={dismissCourseCompletion} />
        )}
      </Suspense>
    </>
  );
}
