'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { useEngagementStore } from '@/store/useEngagementStore';
import { initFakeUserPool, progressFakeUsers } from '@/lib/fake-user-generator';

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export function useEngagementInit() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const progress = useStore.getState().progress;
    const engagement = useEngagementStore.getState();
    const today = new Date().toISOString().split('T')[0];

    // Skip streak/comeback detection on fresh installs — dailyQuestDate is null
    // when the engagement system has never been initialized (e.g. after clearing storage).
    // Without this guard, seed progress dates trigger false streak-break/comeback popups.
    const hasEngagementHistory = engagement.dailyQuestDate !== null;

    // Streak freeze / break detection
    if (hasEngagementHistory && progress.lastActiveDate && progress.lastActiveDate !== today) {
      const lastActive = new Date(progress.lastActiveDate);
      const todayDate = new Date(today);
      const daysDiff = Math.floor(
        (todayDate.getTime() - lastActive.getTime()) / (24 * 60 * 60 * 1000),
      );

      if (daysDiff === 2 && engagement.streak.freezesOwned > 0) {
        // Missed exactly 1 day (daysDiff=2 means last active 2 days ago) — consume freeze, preserve streak
        useEngagementStore.getState().useStreakFreeze();
        useStore.setState((state) => ({
          progress: { ...state.progress, lastActiveDate: getYesterday() },
        }));
      } else if (daysDiff >= 3 && engagement.streak.freezesOwned > 0) {
        // Multi-day gap — freeze can't bridge it, record break
        useEngagementStore.getState().recordStreakBreak(progress.currentStreak);
      } else if (
        daysDiff >= 2 &&
        engagement.streak.freezesOwned === 0 &&
        progress.currentStreak > 0
      ) {
        // No freeze and missed 1+ days — record break for repair offer
        useEngagementStore.getState().recordStreakBreak(progress.currentStreak);
      }
    }

    // Grant Bronze league frame if not already owned (everyone starts in Bronze)
    if (!engagement.gems.inventory.activeFrames.includes('reward-frame-league-bronze')) {
      useEngagementStore.setState((s) => ({
        gems: {
          ...s.gems,
          inventory: {
            ...s.gems.inventory,
            activeFrames: [...s.gems.inventory.activeFrames, 'reward-frame-league-bronze'],
          },
        },
      }));
    }

    // Initialize all engagement systems
    // Initialize fake user pool (must happen before league simulation)
    initFakeUserPool();
    progressFakeUsers();
    useEngagementStore.getState().initDailyQuests();
    useEngagementStore.getState().initWeeklyQuests();
    useEngagementStore.getState().simulateLeagueWeek();
    if (hasEngagementHistory) {
      useEngagementStore.getState().checkComebackFlow();
    }
  }, []);
}
