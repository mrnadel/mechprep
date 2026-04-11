'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store/useStore';
import { useCourseStore } from '@/store/useCourseStore';
import { useFeedbackStore } from '@/store/useFeedbackStore';
import { useEngagementStore } from '@/store/useEngagementStore';
import { useHeartsStore } from '@/store/useHeartsStore';
import { streakMilestones } from '@/data/streak-milestones';
import { PROFESSION_ID } from '@/data/professions';
import { STORAGE_KEYS } from '@/lib/storage-keys';
import { shallow } from 'zustand/shallow';
import { useToastStore } from '@/components/ui/ToastNotification';

/** Track gem transactions that have already been synced to avoid double-inserting. */
let lastSyncedGemTxCount = 0;

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
    let hydrateTimeout: ReturnType<typeof setTimeout>;

    async function hydrate() {
      try {
        const activeProfession = useCourseStore.getState().activeProfession;

        // Add a timeout so hydration doesn't hang forever on slow/dead network
        const controller = new AbortController();
        hydrateTimeout = setTimeout(() => controller.abort(), 15000);

        const fetchOpts = { signal: controller.signal };
        const [progressRes, courseRes, feedbackRes, contentCourseRes, engagementRes, streakRes] = await Promise.all([
          fetch('/api/progress', fetchOpts),
          fetch('/api/course-progress', fetchOpts),
          fetch('/api/content-feedback', fetchOpts),
          fetch(`/api/content/course?profession=${encodeURIComponent(activeProfession)}`, fetchOpts),
          fetch('/api/engagement', fetchOpts),
          fetch('/api/streak', fetchOpts),
        ]);
        clearTimeout(hydrateTimeout);

        if (cancelled) return;

        if (progressRes.ok) {
          const data = await progressRes.json();
          if (data.progress) {
            // Merge DB progress with local state to avoid overwriting
            // data changed while the fetch was in-flight
            const local = useStore.getState().progress;
            const db = data.progress;
            const restoredStreak = db.currentStreak ?? local.currentStreak ?? 0;
            useStore.setState({
              progress: {
                ...db,
                totalXp: Math.max(db.totalXp ?? 0, local.totalXp ?? 0),
                currentStreak: restoredStreak,
                longestStreak: Math.max(db.longestStreak ?? 0, local.longestStreak ?? 0),
                lastActiveDate: (db.lastActiveDate ?? '') > (local.lastActiveDate ?? '')
                  ? db.lastActiveDate : local.lastActiveDate,
                activeDays: [...new Set([...(db.activeDays ?? []), ...(local.activeDays ?? [])])].sort().slice(-14),
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
              if (!dbLesson) {
                // Local has a lesson DB doesn't — keep it
                mergedLessons[id] = localLesson;
              } else {
                // Both have this lesson — use timestamp to pick the freshest,
                // then take the best accuracy/attempts from either side
                const localTime = localLesson.lastAttempted ?? '';
                const dbTime = dbLesson.lastAttempted ?? '';
                const base = localTime >= dbTime ? localLesson : dbLesson;
                mergedLessons[id] = {
                  ...base,
                  bestAccuracy: Math.max(localLesson.bestAccuracy ?? 0, dbLesson.bestAccuracy ?? 0),
                  attempts: Math.max(localLesson.attempts ?? 0, dbLesson.attempts ?? 0),
                  stars: Math.max(localLesson.stars ?? 0, dbLesson.stars ?? 0),
                };
              }
            }

            // Merge courseIntros: DB wins for keys not in local
            const mergedIntros = { ...(db.courseIntros ?? {}), ...(local.courseIntros ?? {}) };

            // Merge viewedStoryUnlocks: union of DB + local (de-duped)
            const mergedStoryUnlocks = [...new Set([
              ...(db.viewedStoryUnlocks ?? []),
              ...(local.viewedStoryUnlocks ?? []),
            ])];

            // Restore activeProfession from DB if local is still the default
            // (indicates localStorage was cleared)
            const dbProfession = data.activeProfession;
            const restoredProfession =
              localProfession === PROFESSION_ID.MECHANICAL_ENGINEERING && dbProfession && dbProfession !== PROFESSION_ID.MECHANICAL_ENGINEERING
                ? dbProfession
                : localProfession;

            useCourseStore.setState({
              activeProfession: restoredProfession,
              progress: {
                ...db,
                totalXp: Math.max(db.totalXp, local.totalXp),
                currentStreak: db.currentStreak ?? local.currentStreak ?? 0,
                longestStreak: Math.max(db.longestStreak, local.longestStreak),
                lastActiveDate: db.lastActiveDate > local.lastActiveDate
                  ? db.lastActiveDate : local.lastActiveDate,
                activeDays: [...new Set([...(db.activeDays ?? []), ...(local.activeDays ?? [])])].sort().slice(-14),
                placementUnitIndex: Math.max(db.placementUnitIndex ?? 0, local.placementUnitIndex ?? 0) || undefined,
                completedLessons: mergedLessons,
                courseIntros: Object.keys(mergedIntros).length > 0 ? mergedIntros : undefined,
                viewedStoryUnlocks: mergedStoryUnlocks.length > 0 ? mergedStoryUnlocks : undefined,
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
          if (data.course?.length && useCourseStore.getState().activeProfession === activeProfession) {
            useCourseStore.getState().setCourseData(data.course);
          }
        }

        // Hydrate engagement store from DB (server-authoritative for economy)
        if (engagementRes.ok) {
          const eng = await engagementRes.json();
          const localEng = useEngagementStore.getState();

          // DB wins for economy fields (balance is computed from ledger server-side, always trust it)
          useEngagementStore.setState((s) => ({
            gems: {
              ...s.gems,
              balance: eng.gems.balance ?? s.gems.balance,
              totalEarned: eng.gems.totalEarned ?? s.gems.totalEarned,
              inventory: {
                activeTitles: [...new Set([
                  ...(eng.gems.inventory?.activeTitles ?? []),
                  ...s.gems.inventory.activeTitles,
                ])],
                activeFrames: [...new Set([
                  ...(eng.gems.inventory?.activeFrames ?? []),
                  ...s.gems.inventory.activeFrames,
                ])],
              },
              selectedTitle: eng.gems.selectedTitle ?? s.gems.selectedTitle,
              selectedFrame: eng.gems.selectedFrame ?? s.gems.selectedFrame,
            },
            streak: {
              ...s.streak,
              freezesOwned: eng.streak.freezesOwned ?? s.streak.freezesOwned,
              milestonesReached: [...new Set([
                ...(eng.streak.milestonesReached ?? []),
                ...s.streak.milestonesReached,
              ])],
            },
            doubleXpExpiry: eng.doubleXpExpiry ?? s.doubleXpExpiry,
          }));

          // Hydrate hearts — server value is authoritative (clamped + recharge-validated)
          const dbHearts = eng.hearts;
          if (dbHearts) {
            useHeartsStore.setState({
              current: dbHearts.current ?? 5,
              lastRechargeAt: dbHearts.lastRechargeAt ?? Date.now(),
            });
          }

          // Hydrate quests from DB if they match the current date
          // (local quests for today/this week take priority since they may have newer progress)
          if (eng.quests) {
            const localDaily = localEng.dailyQuestDate;
            const localWeekly = localEng.weeklyQuestDate;

            if (eng.quests.daily && eng.quests.daily.questDate === localDaily) {
              // Same day: merge quest progress (take the higher progress values)
              const dbQuests = eng.quests.daily.quests as typeof localEng.dailyQuests;
              if (Array.isArray(dbQuests) && dbQuests.length > 0) {
                useEngagementStore.setState((s) => {
                  // If local has no quests for today, use DB
                  if (s.dailyQuests.length === 0) {
                    return {
                      dailyQuests: dbQuests,
                      dailyChestClaimed: eng.quests.daily.chestClaimed ?? false,
                    };
                  }
                  // Otherwise merge: take higher progress per quest
                  const merged = s.dailyQuests.map((lq) => {
                    const dbq = dbQuests.find((dq: { definitionId?: string }) => dq.definitionId === lq.definitionId);
                    if (!dbq) return lq;
                    return {
                      ...lq,
                      progress: Math.max(lq.progress, dbq.progress ?? 0),
                      completed: lq.completed || dbq.completed,
                      claimed: lq.claimed || dbq.claimed,
                    };
                  });
                  return {
                    dailyQuests: merged,
                    dailyChestClaimed: s.dailyChestClaimed || eng.quests.daily.chestClaimed,
                  };
                });
              }
            }

            if (eng.quests.weekly && eng.quests.weekly.questDate === localWeekly) {
              const dbQuests = eng.quests.weekly.quests as typeof localEng.weeklyQuests;
              if (Array.isArray(dbQuests) && dbQuests.length > 0) {
                useEngagementStore.setState((s) => {
                  if (s.weeklyQuests.length === 0) {
                    return {
                      weeklyQuests: dbQuests,
                      weeklyChestClaimed: eng.quests.weekly.chestClaimed ?? false,
                    };
                  }
                  const merged = s.weeklyQuests.map((lq) => {
                    const dbq = dbQuests.find((dq: { definitionId?: string }) => dq.definitionId === lq.definitionId);
                    if (!dbq) return lq;
                    return {
                      ...lq,
                      progress: Math.max(lq.progress, dbq.progress ?? 0),
                      completed: lq.completed || dbq.completed,
                      claimed: lq.claimed || dbq.claimed,
                    };
                  });
                  return {
                    weeklyQuests: merged,
                    weeklyChestClaimed: s.weeklyChestClaimed || eng.quests.weekly.chestClaimed,
                  };
                });
              }
            }
          }

          // Hydrate daily reward calendar from DB (Gap 10)
          if (eng.dailyRewardCalendar) {
            const dbCal = eng.dailyRewardCalendar as {
              currentDay: number;
              lastClaimDate: string | null;
              todayClaimed: boolean;
              cycleStartDate: string | null;
              cyclesCompleted: number;
            };
            const localCal = localEng.dailyRewardCalendar;
            // Use the fresher state (more recent claim date wins)
            const useDb = (dbCal.lastClaimDate ?? '') > (localCal.lastClaimDate ?? '');
            if (useDb) {
              useEngagementStore.setState({ dailyRewardCalendar: dbCal });
            }
          }

          // Initialize the synced tx count so we don't re-send existing transactions
          lastSyncedGemTxCount = useEngagementStore.getState().gems.transactions.length;
        }

        // Hydrate streak from server — server is authoritative
        if (streakRes.ok) {
          const streakData = await streakRes.json();
          const serverStreak = streakData.currentStreak ?? 0;
          const serverLongestStreak = streakData.longestStreak ?? 0;
          const serverActiveDays: string[] = streakData.activeDays ?? [];
          const serverLastActive: string = streakData.lastActiveDate ?? '';

          useStore.setState((s) => ({
            progress: {
              ...s.progress,
              currentStreak: serverStreak,
              longestStreak: Math.max(serverLongestStreak, s.progress.longestStreak),
              activeDays: serverActiveDays.length > 0 ? serverActiveDays : s.progress.activeDays,
              lastActiveDate: serverLastActive > (s.progress.lastActiveDate ?? '')
                ? serverLastActive : s.progress.lastActiveDate,
            },
          }));

          useCourseStore.setState((s) => ({
            progress: {
              ...s.progress,
              currentStreak: serverStreak,
              longestStreak: Math.max(serverLongestStreak, s.progress.longestStreak),
              activeDays: serverActiveDays.length > 0 ? serverActiveDays : s.progress.activeDays,
              lastActiveDate: serverLastActive > (s.progress.lastActiveDate ?? '')
                ? serverLastActive : s.progress.lastActiveDate,
            },
          }));
        }

        // Merge guest trial XP earned before registration
        try {
          const guestData = sessionStorage.getItem(STORAGE_KEYS.GUEST_XP);
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
              useToastStore.getState().push({
                icon: '\u2728',
                title: `+${xp} XP added`,
                subtitle: 'Your guest progress was saved to your account!',
              });
            }
            sessionStorage.removeItem(STORAGE_KEYS.GUEST_XP);
          }
        } catch {}
      } catch (error) {
        console.error('Failed to hydrate from DB:', error);
        // Notify user that sync failed so they know they're seeing cached data
        if (!cancelled) {
          const isTimeout = error instanceof DOMException && error.name === 'AbortError';
          useToastStore.getState().push({
            icon: '\u26A0\uFE0F',
            title: isTimeout ? 'Sync timed out' : 'Could not sync progress',
            subtitle: 'Using cached data. Your progress will sync when connection improves.',
            duration: 5000,
          });
        }
      } finally {
        if (!cancelled) setIsHydrated(true);
      }
    }

    hydrate();

    return () => {
      cancelled = true;
      clearTimeout(hydrateTimeout);
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

    // Shared sync function for engagement + hearts
    let engagementTimer: ReturnType<typeof setTimeout>;

    function syncEngagement(includeQuests: boolean) {
      clearTimeout(engagementTimer);
      engagementTimer = setTimeout(() => {
        const eng = useEngagementStore.getState();
        const hearts = useHeartsStore.getState();

        // Extract only new gem transactions since last sync
        const allTx = eng.gems.transactions;
        const newTxCount = allTx.length - lastSyncedGemTxCount;
        const newGemTransactions = newTxCount > 0
          ? allTx.slice(0, newTxCount).map((t) => ({ amount: t.amount, source: t.source }))
          : undefined;
        lastSyncedGemTxCount = allTx.length;

        const payload: Record<string, unknown> = {
          gems: {
            balance: eng.gems.balance,
            totalEarned: eng.gems.totalEarned,
            inventory: eng.gems.inventory,
            selectedTitle: eng.gems.selectedTitle,
            selectedFrame: eng.gems.selectedFrame,
          },
          streak: {
            freezesOwned: eng.streak.freezesOwned,
            milestonesReached: eng.streak.milestonesReached,
          },
          hearts: {
            current: hearts.current,
            lastRechargeAt: hearts.lastRechargeAt,
          },
          doubleXpExpiry: eng.doubleXpExpiry,
          newGemTransactions,
          // Daily reward calendar sync (Gap 10)
          dailyRewardCalendar: {
            day: eng.dailyRewardCalendar.currentDay,
            lastClaimDate: eng.dailyRewardCalendar.lastClaimDate,
            weekStartDate: eng.dailyRewardCalendar.cycleStartDate ?? '',
            claimedDays: eng.dailyRewardCalendar.todayClaimed
              ? Array.from({ length: eng.dailyRewardCalendar.currentDay }, (_, i) => i + 1)
              : Array.from({ length: eng.dailyRewardCalendar.currentDay - 1 }, (_, i) => i + 1),
          },
        };

        if (includeQuests) {
          payload.quests = {
            dailyQuests: eng.dailyQuests,
            weeklyQuests: eng.weeklyQuests,
            dailyQuestDate: eng.dailyQuestDate,
            weeklyQuestDate: eng.weeklyQuestDate,
            dailyChestClaimed: eng.dailyChestClaimed,
            weeklyChestClaimed: eng.weeklyChestClaimed,
          };
        }

        fetch('/api/engagement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(console.error);
      }, 1500);
    }

    // Engagement store sync (debounced, includes quests)
    const unsubEngagement = useEngagementStore.subscribe(
      (state) => ({
        gems: state.gems,
        streak: state.streak,
        doubleXpExpiry: state.doubleXpExpiry,
        dailyQuests: state.dailyQuests,
        weeklyQuests: state.weeklyQuests,
        dailyQuestDate: state.dailyQuestDate,
        weeklyQuestDate: state.weeklyQuestDate,
        dailyChestClaimed: state.dailyChestClaimed,
        weeklyChestClaimed: state.weeklyChestClaimed,
        dailyRewardCalendar: state.dailyRewardCalendar,
      }),
      () => syncEngagement(true),
      { equalityFn: shallow },
    );

    // Also sync when hearts change independently (e.g. heart loss during lesson)
    let prevHearts = { current: useHeartsStore.getState().current, lastRechargeAt: useHeartsStore.getState().lastRechargeAt };
    const unsubHearts = useHeartsStore.subscribe((state) => {
      const next = { current: state.current, lastRechargeAt: state.lastRechargeAt };
      if (next.current !== prevHearts.current || next.lastRechargeAt !== prevHearts.lastRechargeAt) {
        prevHearts = next;
        syncEngagement(false);
      }
    });

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(courseTimer);
      clearTimeout(engagementTimer);
      unsubProgress();
      unsubCourse();
      unsubEngagement();
      unsubHearts();
    };
  }, [isAuthenticated]);

  return { isHydrated };
}
