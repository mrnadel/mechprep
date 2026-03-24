'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { useEngagementStore } from '@/store/useEngagementStore';
import { useToastStore } from '@/components/ui/ToastNotification';
import { achievements } from '@/data/achievements';

/**
 * Subscribes to Zustand store changes and fires toast notifications
 * for achievements, gem changes, and streak milestones.
 * Mount once in the app layout.
 */
export function StoreToastBridge() {
  const push = useToastStore((s) => s.push);
  const mountedRef = useRef(false);

  // Track previous values to detect changes (not initial hydration)
  const prevAchievementsRef = useRef<string[]>([]);
  const prevGemsRef = useRef<number>(0);
  const prevStreakRef = useRef<number>(0);

  // Initialize refs on mount with current values (so first render doesn't trigger)
  useEffect(() => {
    const storeState = useStore.getState();
    const engState = useEngagementStore.getState();
    prevAchievementsRef.current = [...storeState.progress.achievementsUnlocked];
    prevGemsRef.current = engState.gems.balance;
    prevStreakRef.current = storeState.progress.currentStreak;
    // Small delay so hydration completes before we start listening
    const timer = setTimeout(() => {
      mountedRef.current = true;
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Subscribe to achievement unlocks
  useEffect(() => {
    const unsub = useStore.subscribe(
      (state) => state.progress.achievementsUnlocked,
      (unlocked) => {
        if (!mountedRef.current) {
          prevAchievementsRef.current = [...unlocked];
          return;
        }
        const prev = prevAchievementsRef.current;
        const newIds = unlocked.filter((id) => !prev.includes(id));
        prevAchievementsRef.current = [...unlocked];

        for (const id of newIds) {
          const ach = achievements.find((a) => a.id === id);
          if (ach) {
            push({
              icon: ach.icon,
              title: ach.name,
              subtitle: `+${ach.xpReward} XP`,
              color: '#B45309',
              duration: 4000,
            });
          }
        }
      },
    );
    return unsub;
  }, [push]);

  // Subscribe to gem balance changes
  useEffect(() => {
    const unsub = useEngagementStore.subscribe(
      (state) => state.gems.balance,
      (balance) => {
        if (!mountedRef.current) {
          prevGemsRef.current = balance;
          return;
        }
        const prev = prevGemsRef.current;
        const diff = balance - prev;
        prevGemsRef.current = balance;

        if (diff === 0) return;

        // Only toast for gem gains (purchases are obvious from the shop UI)
        if (diff > 0) {
          push({
            icon: '💎',
            title: `+${diff} Gems`,
            subtitle: 'Added to your balance',
            color: '#7C3AED',
            duration: 2500,
          });
        }
      },
    );
    return unsub;
  }, [push]);

  // Subscribe to streak changes
  useEffect(() => {
    const unsub = useStore.subscribe(
      (state) => state.progress.currentStreak,
      (streak) => {
        if (!mountedRef.current) {
          prevStreakRef.current = streak;
          return;
        }
        const prev = prevStreakRef.current;
        prevStreakRef.current = streak;

        if (streak <= prev || streak <= 1) return;

        // Toast on streak milestones (3, 7, 14, 30, 50, 100)
        const milestones = [3, 7, 14, 30, 50, 100];
        if (milestones.includes(streak)) {
          push({
            icon: '🔥',
            title: `${streak}-Day Streak!`,
            subtitle: 'Keep the momentum going!',
            color: '#D97706',
            duration: 4000,
          });
        }
      },
    );
    return unsub;
  }, [push]);

  // Subscribe to streak freeze usage
  const prevFreezeUsedRef = useRef(false);
  useEffect(() => {
    const engState = useEngagementStore.getState();
    prevFreezeUsedRef.current = engState.streak.freezeUsedToday;

    const unsub = useEngagementStore.subscribe(
      (state) => state.streak.freezeUsedToday,
      (freezeUsed) => {
        if (!mountedRef.current) {
          prevFreezeUsedRef.current = freezeUsed;
          return;
        }
        const wasUsed = prevFreezeUsedRef.current;
        prevFreezeUsedRef.current = freezeUsed;

        // Toast when freeze transitions from false → true
        if (freezeUsed && !wasUsed) {
          push({
            icon: '🧊',
            title: 'Streak Freeze Used!',
            subtitle: 'Your streak was saved for today',
            color: '#0EA5E9',
            duration: 4500,
          });
        }
      },
    );
    return unsub;
  }, [push]);

  return null; // Render nothing — this is a side-effect component
}
