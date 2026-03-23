'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { CourseHeader } from '@/components/course/CourseHeader';
import { CourseMap } from '@/components/course/CourseMap';
import { LessonView } from '@/components/lesson/LessonView';
import { ResultScreen } from '@/components/lesson/ResultScreen';
import { LandingPage } from '@/components/landing/LandingPage';
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
import { PracticeCard } from '@/components/course/PracticeCard';
import { analytics } from '@/lib/mixpanel';

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
      analytics.milestone({ type: 'streak', name: `${unclaimedMilestone.days}_day_streak`, value: unclaimedMilestone.days });
      addGems(unclaimedMilestone.gems, `streak_milestone_${unclaimedMilestone.days}`);

      // Grant milestone frame + title to inventory
      const streakFrameMap: Record<number, string> = {
        30: 'reward-frame-streak-iron',
        60: 'reward-frame-streak-diamond',
        100: 'reward-frame-streak-centurion',
      };
      const streakTitleMap: Record<number, string> = {
        14: 'reward-title-consistent',
        30: 'reward-title-iron-will',
        60: 'reward-title-diamond-mind',
        100: 'reward-title-centurion',
      };
      useEngagementStore.setState((s) => {
        const frames = [...s.gems.inventory.activeFrames];
        const titles = [...s.gems.inventory.activeTitles];
        const frameId = streakFrameMap[unclaimedMilestone.days];
        const titleId = streakTitleMap[unclaimedMilestone.days];
        if (frameId && !frames.includes(frameId)) frames.push(frameId);
        if (titleId && !titles.includes(titleId)) titles.push(titleId);
        return {
          streak: {
            ...s.streak,
            milestonesReached: [...s.streak.milestonesReached, unclaimedMilestone.days],
          },
          gems: {
            ...s.gems,
            inventory: { ...s.gems.inventory, activeFrames: frames, activeTitles: titles },
          },
        };
      });
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

      {/* Smart Practice card */}
      <PracticeCard />

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
