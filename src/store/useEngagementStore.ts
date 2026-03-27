'use client';

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type {
  EngagementState,
  GemsState,
  GemTransaction,
  LeagueState,
  StreakEnhancements,
  ComebackState,
  Quest,
  QuestTrackingKey,
  NudgeType,
} from '@/data/engagement-types';
import {
  MAX_STREAK_FREEZES,
  MAX_GEM_TRANSACTIONS_CLIENT,
  DOUBLE_XP_SHOP_DURATION_MS,
  COMEBACK_THRESHOLD_DAYS,
} from '@/data/engagement-types';
import { shopItems } from '@/data/gem-shop';
import { dailyChestReward, weeklyChestReward } from '@/data/quests';
import { LEAGUE_GEM_REWARD_PROMOTION } from '@/data/league';
import {
  selectDailyQuests,
  selectWeeklyQuests,
  createQuests,
  getTodayDate,
  getCurrentWeekMonday,
  DAILY_QUEST_COUNT,
  WEEKLY_QUEST_COUNT,
} from '@/lib/quest-engine';
import {
  simulateCompetitorXp,
  getUserRank,
  getWeekResult,
} from '@/lib/league-simulator';
import { drawCompetitorsFromPool } from '@/lib/fake-user-generator';
import { useStore } from '@/store/useStore';

// --------------- Default State Factories ---------------

function getDefaultGems(): GemsState {
  return {
    balance: 0,
    totalEarned: 0,
    transactions: [],
    inventory: {
      activeTitles: [],
      activeFrames: [],
    },
    selectedTitle: null,
    selectedFrame: null,
  };
}

function getDefaultLeague(): LeagueState {
  const monday = getCurrentWeekMonday();
  return {
    currentTier: 1,
    weeklyXp: 0,
    weekStartDate: monday,
    competitors: drawCompetitorsFromPool(monday, 1),
    lastWeekResult: null,
    resultSeen: true,
  };
}

function getDefaultStreak(): StreakEnhancements {
  return {
    freezesOwned: 0,
    freezeUsedToday: false,
    lastStreakBreakDate: null,
    lastStreakValueBeforeBreak: 0,
    repairAvailable: false,
    milestonesReached: [],
  };
}

function getDefaultComeback(): ComebackState {
  return {
    isInComebackFlow: false,
    comebackQuestsCompleted: 0,
    daysAway: 0,
  };
}

function getDefaultState(): EngagementState {
  return {
    gems: getDefaultGems(),
    dailyQuests: [],
    weeklyQuests: [],
    dailyQuestDate: null,
    weeklyQuestDate: null,
    dailyChestClaimed: false,
    weeklyChestClaimed: false,
    lastDailyQuestIds: [],
    lastWeeklyQuestIds: [],
    league: getDefaultLeague(),
    streak: getDefaultStreak(),
    comeback: getDefaultComeback(),
    dismissedNudges: [],
    doubleXpExpiry: null,
  };
}

// --------------- Inventory Helpers ---------------

/** Grant a title or frame to the inventory if not already owned. Returns updated GemsState. */
export function grantInventoryItem(
  gems: GemsState,
  type: 'title' | 'frame',
  itemId: string,
): GemsState {
  const key = type === 'title' ? 'activeTitles' : 'activeFrames';
  if (gems.inventory[key].includes(itemId)) return gems;
  return {
    ...gems,
    inventory: {
      ...gems.inventory,
      [key]: [...gems.inventory[key], itemId],
    },
  };
}

/** Grant a title to the engagement store (call from outside the store). */
export function grantTitle(titleId: string): void {
  useEngagementStore.setState((s) => {
    const updated = grantInventoryItem(s.gems, 'title', titleId);
    return updated === s.gems ? {} : { gems: updated };
  });
}

/** Grant a frame to the engagement store (call from outside the store). */
export function grantFrame(frameId: string): void {
  useEngagementStore.setState((s) => {
    const updated = grantInventoryItem(s.gems, 'frame', frameId);
    return updated === s.gems ? {} : { gems: updated };
  });
}

// --------------- Store Actions Interface ---------------

interface EngagementActions {
  initDailyQuests: () => void;
  initWeeklyQuests: () => void;
  updateQuestProgress: (key: QuestTrackingKey, value?: number, filter?: Record<string, unknown>) => void;
  claimQuestReward: (questId: string) => void;
  claimChest: (type: 'daily' | 'weekly') => void;
  purchaseItem: (itemId: string) => boolean;
  useStreakFreeze: () => void;
  repairStreak: () => boolean;
  recordStreakBreak: (previousStreakValue: number) => void;
  simulateLeagueWeek: () => void;
  updateLeagueXp: (xp: number) => void;
  checkComebackFlow: () => void;
  dismissNudge: (type: NudgeType) => void;
  activateDoubleXp: (duration: number) => void;
  addGems: (amount: number, source: string) => void;
  completeComebackQuest: () => void;
  equipTitle: (itemId: string | null) => void;
  equipFrame: (itemId: string | null) => void;
  debugSetFromCourse: (data: { gems: number; leagueXp: number }) => void;
  debugSetLeagueTier: (tier: number) => void;
}

type EngagementStore = EngagementState & EngagementActions;

// --------------- Helper: create a gem transaction ---------------

function createGemTransaction(amount: number, source: string): GemTransaction {
  return {
    id: `gem-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    amount,
    source,
    timestamp: new Date().toISOString(),
  };
}

// --------------- Helper: update quests in an array ---------------

function progressQuests(
  quests: Quest[],
  key: QuestTrackingKey,
  value: number,
  filter?: Record<string, unknown>,
): Quest[] {
  // Special mode: { _absolute: true } sets progress to `value` instead of adding
  const isAbsolute = filter && '_absolute' in filter;
  const cleanFilter = (() => {
    if (!filter) return undefined;
    const { _absolute, ...rest } = filter as Record<string, unknown>;
    return Object.keys(rest).length > 0 ? rest : undefined;
  })();

  return quests.map((quest) => {
    if (quest.trackingKey !== key) return quest;
    if (quest.completed) return quest;

    // Filter matching:
    // - If the caller provides a filter AND the quest has a filter, the caller's
    //   filter keys must match the quest's filter values (strict match).
    // - If the caller provides a filter but the quest has none, the quest still
    //   progresses (the filter is extra context, not a restriction).
    // - If the caller does NOT provide a filter but the quest has one, the quest
    //   still progresses (backwards-compat for soft filters like currentUnit).
    if (cleanFilter && quest.filter) {
      const filterMatches = Object.keys(cleanFilter).every(
        (k) => quest.filter && quest.filter[k] === cleanFilter[k],
      );
      if (!filterMatches) return quest;
    }

    const newProgress = isAbsolute
      ? Math.min(value, quest.target)
      : Math.min(quest.progress + value, quest.target);
    const completed = newProgress >= quest.target;
    return { ...quest, progress: newProgress, completed };
  });
}

// --------------- The Store ---------------

export const useEngagementStore = create<EngagementStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // --- Default state ---
        ...getDefaultState(),

        // === Action 1: initDailyQuests ===
        initDailyQuests: () => {
          const today = getTodayDate();
          const { dailyQuestDate, dailyQuests, lastDailyQuestIds, streak } = get();
          if (dailyQuestDate === today) return; // same day, no-op

          const previousIds = dailyQuests.map((q) => q.definitionId);
          const newDefs = selectDailyQuests(previousIds.length > 0 ? previousIds : lastDailyQuestIds);
          const newQuests = createQuests(newDefs, 'daily');

          set({
            dailyQuests: newQuests,
            dailyQuestDate: today,
            dailyChestClaimed: false,
            lastDailyQuestIds: previousIds.length > 0 ? previousIds : lastDailyQuestIds,
            // Reset the freeze-used-today flag on new day
            streak: {
              ...streak,
              freezeUsedToday: false,
            },
          });
        },

        // === Action 2: initWeeklyQuests ===
        initWeeklyQuests: () => {
          const monday = getCurrentWeekMonday();
          const { weeklyQuestDate, weeklyQuests, lastWeeklyQuestIds } = get();
          if (weeklyQuestDate === monday) return; // same week, no-op

          const previousIds = weeklyQuests.map((q) => q.definitionId);
          const newDefs = selectWeeklyQuests(previousIds.length > 0 ? previousIds : lastWeeklyQuestIds);
          const newQuests = createQuests(newDefs, 'weekly');

          set({
            weeklyQuests: newQuests,
            weeklyQuestDate: monday,
            weeklyChestClaimed: false,
            lastWeeklyQuestIds: previousIds.length > 0 ? previousIds : lastWeeklyQuestIds,
          });
        },

        // === Action 3: updateQuestProgress ===
        updateQuestProgress: (key, value = 1, filter) => {
          set((state) => ({
            dailyQuests: progressQuests(state.dailyQuests, key, value, filter),
            weeklyQuests: progressQuests(state.weeklyQuests, key, value, filter),
          }));
        },

        // === Action 4: claimQuestReward ===
        claimQuestReward: (questId) => {
          const state = get();

          // Find quest in daily or weekly
          const allQuests = [...state.dailyQuests, ...state.weeklyQuests];
          const quest = allQuests.find((q) => q.definitionId === questId);
          if (!quest || !quest.completed || quest.claimed) return;

          // Mark claimed
          const markClaimed = (quests: Quest[]) =>
            quests.map((q) =>
              q.definitionId === questId ? { ...q, claimed: true } : q,
            );

          set({
            dailyQuests: markClaimed(state.dailyQuests),
            weeklyQuests: markClaimed(state.weeklyQuests),
          });

          // Award gems
          get().addGems(quest.reward.gems, 'quest_reward');
        },

        // === Action 5: claimChest ===
        claimChest: (type) => {
          const state = get();
          const quests = type === 'daily' ? state.dailyQuests : state.weeklyQuests;
          const alreadyClaimed = type === 'daily' ? state.dailyChestClaimed : state.weeklyChestClaimed;

          if (alreadyClaimed) return;

          // Check all quests are completed
          const expectedCount = type === 'daily' ? DAILY_QUEST_COUNT : WEEKLY_QUEST_COUNT;
          const allCompleted = quests.length >= expectedCount && quests.every((q) => q.completed);
          if (!allCompleted) return;

          const reward = type === 'daily' ? dailyChestReward : weeklyChestReward;

          if (type === 'daily') {
            set({ dailyChestClaimed: true });
          } else {
            set({ weeklyChestClaimed: true });
          }

          get().addGems(reward.gems, `${type}_chest`);
        },

        // === Action 6: purchaseItem ===
        purchaseItem: (itemId) => {
          const state = get();
          const item = shopItems.find((i) => i.id === itemId);
          if (!item) return false;
          if (state.gems.balance < item.cost) return false;

          switch (item.type) {
            case 'streak_freeze': {
              if (state.streak.freezesOwned >= MAX_STREAK_FREEZES) return false;
              // Deduct gems first
              set((s) => ({
                gems: {
                  ...s.gems,
                  balance: s.gems.balance - item.cost,
                  transactions: [
                    createGemTransaction(-item.cost, 'shop_purchase'),
                    ...s.gems.transactions,
                  ].slice(0, MAX_GEM_TRANSACTIONS_CLIENT),
                },
                streak: {
                  ...s.streak,
                  freezesOwned: s.streak.freezesOwned + 1,
                },
              }));
              return true;
            }
            case 'streak_repair': {
              // repairStreak handles its own gem deduction and validation
              return get().repairStreak();
            }
            case 'double_xp': {
              set((s) => ({
                gems: {
                  ...s.gems,
                  balance: s.gems.balance - item.cost,
                  transactions: [
                    createGemTransaction(-item.cost, 'shop_purchase'),
                    ...s.gems.transactions,
                  ].slice(0, MAX_GEM_TRANSACTIONS_CLIENT),
                },
                doubleXpExpiry: new Date(Date.now() + DOUBLE_XP_SHOP_DURATION_MS).toISOString(),
              }));
              return true;
            }
            case 'title':
            case 'frame': {
              const invKey = item.type === 'title' ? 'activeTitles' : 'activeFrames';
              const equipKey = item.type === 'title' ? 'selectedTitle' : 'selectedFrame';
              if (state.gems.inventory[invKey].includes(itemId)) return false;
              set((s) => ({
                gems: {
                  ...grantInventoryItem(s.gems, item.type as 'title' | 'frame', itemId),
                  balance: s.gems.balance - item.cost,
                  transactions: [
                    createGemTransaction(-item.cost, 'shop_purchase'),
                    ...s.gems.transactions,
                  ].slice(0, MAX_GEM_TRANSACTIONS_CLIENT),
                  [equipKey]: itemId, // auto-equip on purchase
                },
              }));
              return true;
            }
            default:
              return false;
          }
        },

        // === Action 7: useStreakFreeze ===
        useStreakFreeze: () => {
          set((state) => ({
            streak: {
              ...state.streak,
              freezesOwned: Math.max(0, state.streak.freezesOwned - 1),
              freezeUsedToday: true,
            },
          }));
        },

        // === Action 8: repairStreak ===
        repairStreak: () => {
          const state = get();
          if (!state.streak.repairAvailable) return false;

          // Check repair window: lastStreakBreakDate must be within 3 days
          const breakDate = state.streak.lastStreakBreakDate;
          if (!breakDate) return false;

          const today = new Date();
          const breakD = new Date(breakDate + 'T12:00:00');
          const daysSinceBreak = Math.floor((today.getTime() - breakD.getTime()) / (1000 * 60 * 60 * 24));
          if (daysSinceBreak > 3) return false;

          // Check gem balance
          const repairCost = 50;
          if (state.gems.balance < repairCost) return false;

          // Deduct gems, mark repair used, and restore streak
          const previousStreak = state.streak.lastStreakValueBeforeBreak;
          set((s) => ({
            gems: {
              ...s.gems,
              balance: s.gems.balance - repairCost,
              transactions: [
                createGemTransaction(-repairCost, 'streak_repair'),
                ...s.gems.transactions,
              ].slice(0, MAX_GEM_TRANSACTIONS_CLIENT),
            },
            streak: {
              ...s.streak,
              repairAvailable: false,
            },
          }));

          // Restore the streak in both progress stores (practice + course)
          if (previousStreak > 0) {
            // Set lastActiveDate to yesterday so next session continues the streak
            const yesterdayD = new Date();
            yesterdayD.setDate(yesterdayD.getDate() - 1);
            const yesterdayStr = `${yesterdayD.getFullYear()}-${String(yesterdayD.getMonth() + 1).padStart(2, '0')}-${String(yesterdayD.getDate()).padStart(2, '0')}`;

            useStore.setState((s) => ({
              progress: {
                ...s.progress,
                currentStreak: previousStreak,
                longestStreak: Math.max(
                  s.progress.longestStreak || 0,
                  previousStreak,
                ),
                lastActiveDate: yesterdayStr,
              },
            }));

            // Also restore the course store's streak so the header display
            // and future completeLesson calls see the repaired value.
            // Use dynamic import to avoid circular dependency at module load time
            // (useCourseStore imports useEngagementStore).
            import('@/store/useCourseStore').then(({ useCourseStore }) => {
              useCourseStore.setState((cs) => ({
                progress: {
                  ...cs.progress,
                  currentStreak: previousStreak,
                  longestStreak: Math.max(
                    cs.progress.longestStreak || 0,
                    previousStreak,
                  ),
                  lastActiveDate: yesterdayStr,
                },
              }));
            });
          }

          return true;
        },

        // === Action 9: recordStreakBreak ===
        recordStreakBreak: (previousStreakValue) => {
          const today = getTodayDate();
          set((state) => ({
            streak: {
              ...state.streak,
              lastStreakBreakDate: today,
              lastStreakValueBeforeBreak: previousStreakValue,
              repairAvailable: true,
            },
          }));
        },

        // === Action 10: simulateLeagueWeek ===
        simulateLeagueWeek: () => {
          const state = get();
          const monday = getCurrentWeekMonday();

          if (state.league.weekStartDate !== monday) {
            // New week - calculate results from old week
            const simulatedCompetitors = simulateCompetitorXp(
              state.league.competitors,
              state.league.weekStartDate,
            );
            const rank = getUserRank(state.league.weeklyXp, simulatedCompetitors);
            const result = getWeekResult(rank, state.league.currentTier);

            // Only show league results if user actually participated (earned XP)
            const lastWeekResult = state.league.weeklyXp > 0 ? {
              rank,
              promoted: result.promoted,
              demoted: result.demoted,
              tier: state.league.currentTier,
            } : null;

            // Generate new competitors for new week
            const newCompetitors = drawCompetitorsFromPool(monday, result.newTier);

            set({
              league: {
                currentTier: result.newTier,
                weeklyXp: 0,
                weekStartDate: monday,
                competitors: newCompetitors,
                lastWeekResult,
                resultSeen: lastWeekResult === null ? true : false,
              },
            });

            // Award promotion gems + league frame (only if user participated)
            if (result.promoted && lastWeekResult !== null) {
              get().addGems(LEAGUE_GEM_REWARD_PROMOTION, 'league_promotion');

              // Grant league frame for the new tier
              const leagueFrameMap: Record<number, string> = {
                2: 'reward-frame-league-silver',
                3: 'reward-frame-league-gold',
                4: 'reward-frame-league-platinum',
                5: 'reward-frame-league-masters',
              };
              const frameId = leagueFrameMap[result.newTier];
              if (frameId) {
                set((s) => {
                  const frames = s.gems.inventory.activeFrames;
                  if (frames.includes(frameId)) return {};
                  return {
                    gems: {
                      ...s.gems,
                      inventory: {
                        ...s.gems.inventory,
                        activeFrames: [...frames, frameId],
                      },
                    },
                  };
                });
              }
            }
          } else {
            // Same week - re-simulate competitor XP
            const updated = simulateCompetitorXp(
              state.league.competitors,
              state.league.weekStartDate,
            );
            set((s) => ({
              league: {
                ...s.league,
                competitors: updated,
              },
            }));
          }
        },

        // === Action 11: updateLeagueXp ===
        updateLeagueXp: (xp) => {
          set((state) => {
            const updated = simulateCompetitorXp(
              state.league.competitors,
              state.league.weekStartDate,
            );
            return {
              league: {
                ...state.league,
                weeklyXp: state.league.weeklyXp + xp,
                competitors: updated,
              },
            };
          });
        },

        // === Action 12: checkComebackFlow ===
        checkComebackFlow: () => {
          const state = get();
          if (state.comeback.isInComebackFlow) return; // already in comeback flow

          const progress = useStore.getState().progress;
          const lastActiveDate = progress.lastActiveDate;
          if (!lastActiveDate) return;
          // Don't show comeback for users who never really practiced
          if (progress.totalXp === 0) return;

          const lastActive = new Date(lastActiveDate + 'T00:00:00Z');
          const today = new Date(getTodayDate() + 'T00:00:00Z');
          const daysDiff = Math.floor(
            (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24),
          );

          if (daysDiff >= COMEBACK_THRESHOLD_DAYS) {
            set({
              comeback: {
                isInComebackFlow: true,
                comebackQuestsCompleted: 0,
                daysAway: daysDiff,
              },
            });
          }
        },

        // === Action 13: dismissNudge ===
        dismissNudge: (type) => {
          set((state) => ({
            dismissedNudges: state.dismissedNudges.includes(type)
              ? state.dismissedNudges
              : [...state.dismissedNudges, type],
          }));
        },

        // === Action 14: activateDoubleXp ===
        activateDoubleXp: (duration) => {
          set({
            doubleXpExpiry: new Date(Date.now() + duration).toISOString(),
          });
        },

        // === Action 15: addGems ===
        addGems: (amount, source) => {
          set((state) => {
            // Prevent balance from going negative
            const newBalance = Math.max(0, state.gems.balance + amount);
            const transaction = createGemTransaction(amount, source);
            const updatedTransactions = [transaction, ...state.gems.transactions].slice(
              0,
              MAX_GEM_TRANSACTIONS_CLIENT,
            );

            return {
              gems: {
                ...state.gems,
                balance: newBalance,
                // Only count positive amounts toward lifetime earned total
                totalEarned: state.gems.totalEarned + Math.max(0, amount),
                transactions: updatedTransactions,
              },
            };
          });
        },

        // === Action 16: completeComebackQuest ===
        completeComebackQuest: () => {
          set((state) => {
            const newCount = state.comeback.comebackQuestsCompleted + 1;
            const allDone = newCount >= 3;
            return {
              comeback: {
                ...state.comeback,
                comebackQuestsCompleted: newCount,
                isInComebackFlow: allDone ? false : state.comeback.isInComebackFlow,
              },
            };
          });
        },

        // === Action 17: equipTitle ===
        equipTitle: (itemId) => {
          set((state) => ({
            gems: {
              ...state.gems,
              selectedTitle: itemId && state.gems.inventory.activeTitles.includes(itemId) ? itemId : null,
            },
          }));
        },

        // === Action 18: equipFrame ===
        equipFrame: (itemId) => {
          set((state) => ({
            gems: {
              ...state.gems,
              selectedFrame: itemId && state.gems.inventory.activeFrames.includes(itemId) ? itemId : null,
            },
          }));
        },

        // === Action 19: debugSetFromCourse ===
        debugSetFromCourse: (data) => {
          set((state) => ({
            gems: {
              ...state.gems,
              balance: data.gems,
              totalEarned: data.gems,
            },
            league: {
              ...state.league,
              weeklyXp: data.leagueXp,
            },
          }));
        },

        // === Action 18: debugSetLeagueTier ===
        debugSetLeagueTier: (tier) => {
          const clamped = Math.max(1, Math.min(tier, 5)) as 1 | 2 | 3 | 4 | 5;
          set((state) => ({
            league: {
              ...state.league,
              currentTier: clamped,
              competitors: drawCompetitorsFromPool(state.league.weekStartDate, clamped),
            },
          }));
        },
      }),
      {
        name: 'mechready-engagement',
        version: 1,
        partialize: (state) => {
          // Persist all state fields, excluding action functions
          const {
            initDailyQuests: _1,
            initWeeklyQuests: _2,
            updateQuestProgress: _3,
            claimQuestReward: _4,
            claimChest: _5,
            purchaseItem: _6,
            useStreakFreeze: _7,
            repairStreak: _8,
            recordStreakBreak: _9,
            simulateLeagueWeek: _10,
            updateLeagueXp: _11,
            checkComebackFlow: _12,
            dismissNudge: _13,
            activateDoubleXp: _14,
            addGems: _15,
            completeComebackQuest: _16,
            equipTitle: _17,
            equipFrame: _18,
            debugSetFromCourse: _19,
            debugSetLeagueTier: _20,
            ...stateOnly
          } = state;
          return stateOnly;
        },
        merge: (persistedState, currentState) => {
          const persisted = persistedState as Partial<EngagementState> | undefined;
          if (!persisted) return currentState;

          const defaults = getDefaultState();
          return {
            ...currentState,
            gems: persisted.gems
              ? {
                  ...defaults.gems,
                  ...persisted.gems,
                  inventory: {
                    activeTitles: persisted.gems.inventory?.activeTitles ?? defaults.gems.inventory.activeTitles,
                    activeFrames: persisted.gems.inventory?.activeFrames ?? defaults.gems.inventory.activeFrames,
                  },
                }
              : defaults.gems,
            dailyQuests: persisted.dailyQuests ?? defaults.dailyQuests,
            weeklyQuests: persisted.weeklyQuests ?? defaults.weeklyQuests,
            dailyQuestDate: persisted.dailyQuestDate ?? defaults.dailyQuestDate,
            weeklyQuestDate: persisted.weeklyQuestDate ?? defaults.weeklyQuestDate,
            dailyChestClaimed: persisted.dailyChestClaimed ?? defaults.dailyChestClaimed,
            weeklyChestClaimed: persisted.weeklyChestClaimed ?? defaults.weeklyChestClaimed,
            lastDailyQuestIds: persisted.lastDailyQuestIds ?? defaults.lastDailyQuestIds,
            lastWeeklyQuestIds: persisted.lastWeeklyQuestIds ?? defaults.lastWeeklyQuestIds,
            league: persisted.league
              ? {
                  ...defaults.league,
                  ...persisted.league,
                  competitors: persisted.league.competitors ?? defaults.league.competitors,
                }
              : defaults.league,
            streak: persisted.streak
              ? {
                  ...defaults.streak,
                  ...persisted.streak,
                  milestonesReached: persisted.streak.milestonesReached ?? defaults.streak.milestonesReached,
                }
              : defaults.streak,
            comeback: persisted.comeback
              ? { ...defaults.comeback, ...persisted.comeback }
              : defaults.comeback,
            dismissedNudges: persisted.dismissedNudges ?? defaults.dismissedNudges,
            doubleXpExpiry: persisted.doubleXpExpiry ?? defaults.doubleXpExpiry,
          };
        },
      },
    ),
  ),
);

// --------------- Selector Hooks ---------------

export const useGems = () => useEngagementStore((s) => s.gems);
export const useDailyQuests = () => useEngagementStore((s) => s.dailyQuests);
export const useWeeklyQuests = () => useEngagementStore((s) => s.weeklyQuests);
export const useLeague = () => useEngagementStore((s) => s.league);
export const useStreakEnhancements = () => useEngagementStore((s) => s.streak);
export const useComeback = () => useEngagementStore((s) => s.comeback);
/** Returns whether double XP is currently active (validated against purchase history). */
export const useDoubleXpActive = () =>
  useEngagementStore((s) => {
    if (!s.doubleXpExpiry) return false;
    const expiry = new Date(s.doubleXpExpiry).getTime();
    if (isNaN(expiry) || expiry <= Date.now()) return false;
    // Anti-tamper: expiry must not exceed max duration from now
    // (max possible = DOUBLE_XP_SHOP_DURATION_MS + small buffer for timing)
    const maxAllowed = Date.now() + DOUBLE_XP_SHOP_DURATION_MS + 5000;
    if (expiry > maxAllowed) return false;
    // Must have a recent shop_purchase transaction (within last 35 min)
    const recentCutoff = Date.now() - (DOUBLE_XP_SHOP_DURATION_MS + 5 * 60 * 1000);
    const hasRecentPurchase = s.gems.transactions.some(
      (t) => t.source === 'shop_purchase' && t.amount < 0 && new Date(t.timestamp).getTime() > recentCutoff
    );
    return hasRecentPurchase;
  });

export const useEngagementActions = () =>
  useEngagementStore(
    useShallow((s) => ({
      initDailyQuests: s.initDailyQuests,
      initWeeklyQuests: s.initWeeklyQuests,
      updateQuestProgress: s.updateQuestProgress,
      claimQuestReward: s.claimQuestReward,
      claimChest: s.claimChest,
      purchaseItem: s.purchaseItem,
      useStreakFreeze: s.useStreakFreeze,
      repairStreak: s.repairStreak,
      recordStreakBreak: s.recordStreakBreak,
      simulateLeagueWeek: s.simulateLeagueWeek,
      updateLeagueXp: s.updateLeagueXp,
      checkComebackFlow: s.checkComebackFlow,
      dismissNudge: s.dismissNudge,
      activateDoubleXp: s.activateDoubleXp,
      addGems: s.addGems,
      completeComebackQuest: s.completeComebackQuest,
      equipTitle: s.equipTitle,
      equipFrame: s.equipFrame,
    })),
  );
