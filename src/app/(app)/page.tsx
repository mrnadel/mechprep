'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { CourseHeader } from '@/components/course/CourseHeader';
import { CourseMap } from '@/components/course/CourseMap';
import { LessonView } from '@/components/lesson/LessonView';
import { ResultScreen } from '@/components/lesson/ResultScreen';
import { LandingPage } from '@/components/landing/LandingPage';
import { EngagementBar } from '@/components/engagement/EngagementBar';
import { WelcomeBack } from '@/components/engagement/WelcomeBack';
import { LeaguePromotion } from '@/components/engagement/LeaguePromotion';
import { StreakFreeze } from '@/components/engagement/StreakFreeze';
import { StreakMilestone } from '@/components/engagement/StreakMilestone';
import { BlueprintCelebration } from '@/components/engagement/BlueprintCelebration';
import { CourseCompleteCelebration } from '@/components/engagement/CourseCompleteCelebration';
import { useCourseStore } from '@/store/useCourseStore';
import { useStore } from '@/store/useStore';
import { useEngagementStore } from '@/store/useEngagementStore';
import { streakMilestones } from '@/data/streak-milestones';

export default function HomePage() {
  const { status } = useSession();
  const { activeLesson, lessonResult, chapterJustCompleted, dismissChapterCompletion, courseJustCompleted, dismissCourseCompletion } = useCourseStore();
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
      addGems(unclaimedMilestone.gems, `streak_milestone_${unclaimedMilestone.days}`);
      useEngagementStore.setState((s) => ({
        streak: {
          ...s.streak,
          milestonesReached: [...s.streak.milestonesReached, unclaimedMilestone.days],
        },
      }));
    }
    setShownMilestone(null);
  };

  if (status === 'loading') return null;

  if (status === 'unauthenticated') {
    return <LandingPage />;
  }

  return (
    <>
      {/* Overlays */}
      <WelcomeBack />
      <LeaguePromotion />
      <StreakFreeze />
      {unclaimedMilestone && shownMilestone === unclaimedMilestone.days && (
        <StreakMilestone milestone={unclaimedMilestone} onClose={handleMilestoneClose} />
      )}

      {/* Header */}
      <CourseHeader />

      {/* Quick-nav buttons: Quests · League · Skills */}
      <EngagementBar />

      {/* Course map */}
      <CourseMap />

      {activeLesson && <LessonView />}
      {lessonResult && <ResultScreen />}
      {!lessonResult && chapterJustCompleted && (
        <BlueprintCelebration
          unitIndex={chapterJustCompleted.unitIndex}
          isGolden={chapterJustCompleted.isGolden}
          onDismiss={dismissChapterCompletion}
        />
      )}
      {!lessonResult && !chapterJustCompleted && courseJustCompleted && (
        <CourseCompleteCelebration onDismiss={dismissCourseCompletion} />
      )}
    </>
  );
}
