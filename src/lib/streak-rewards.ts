import { streakMilestones } from '@/data/streak-milestones';
import { useEngagementStore, grantTitle, grantFrame } from '@/store/useEngagementStore';

/** Check if the new streak crosses any milestone threshold and award rewards. */
export function awardStreakMilestones(newStreak: number): void {
  const engState = useEngagementStore.getState();

  for (const milestone of streakMilestones) {
    if (newStreak >= milestone.days && !engState.streak.milestonesReached.includes(milestone.days)) {
      // Mark milestone reached
      useEngagementStore.setState((s) => ({
        streak: {
          ...s.streak,
          milestonesReached: [...s.streak.milestonesReached, milestone.days],
        },
      }));
      // Award gems
      engState.addGems(milestone.gems, `streak_milestone_${milestone.days}`);
      // Award title
      if (milestone.hasTitle && milestone.titleId) {
        grantTitle(milestone.titleId);
      }
      // Award frame
      if (milestone.hasFrame && milestone.frameId) {
        grantFrame(milestone.frameId);
      }
    }
  }
}
