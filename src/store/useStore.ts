'use client';

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { Question, TopicId, Difficulty, UserProgress, SessionRecord, TopicProgress } from '@/data/types';
import { seedProgress } from '@/data/seed-progress';
import { levels } from '@/data/levels';
import { achievements as allAchievements } from '@/data/achievements';
import { allQuestions } from '@/data/questions';
import { shuffleArray, getTodayString, calculateXP } from '@/lib/utils';
import { PRO_SESSION_TYPES } from '@/lib/pricing';
import { useSubscriptionStore } from '@/hooks/useSubscription';
import { useCourseStore } from '@/store/useCourseStore';

// --- Session Types ---
export type SessionType = 'adaptive' | 'topic-deep-dive' | 'interview-sim' | 'daily-challenge' | 'real-world' | 'weak-areas' | 'smart-practice';

interface ActiveSession {
  type: SessionType;
  topicId?: TopicId;
  difficulty?: Difficulty;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, { correct: boolean; confidence?: number; timeSpent: number; xpAwarded: number }>;
  startTime: number;
  isTimed: boolean;
  timeLimit?: number;
}

export interface SessionSummary {
  type: SessionType;
  questionsAttempted: number;
  questionsCorrect: number;
  xpEarned: number;
  topicsCovered: TopicId[];
  duration: number;
  accuracy: number;
  newAchievements: string[];
  newLevel: boolean;
}

// --- Store Interface ---
interface AppState {
  // User Progress
  progress: UserProgress;

  // Content (loaded from DB, with static fallback)
  questions: Question[];

  // Active Session
  session: ActiveSession | null;
  sessionSummary: SessionSummary | null;

  // UI State
  showAchievementToast: string | null;

  // Actions — Content
  setQuestions: (questions: Question[]) => void;

  // Actions — Session
  startSession: (type: SessionType, options?: { topicId?: TopicId; difficulty?: Difficulty; questionIds?: string[] }) => void;
  answerQuestion: (questionId: string, correct: boolean, confidence?: number, timeSpent?: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  completeSession: () => void;
  abandonSession: () => void;

  // Actions — Progress
  resetProgress: () => void;
  loadSeedData: () => void;
  debugSetFromCourse: (data: {
    topicProgress: TopicProgress[];
    totalQuestions: number;
    totalCorrect: number;
    totalXp: number;
    streak: number;
  }) => void;

  // Actions — UI
  dismissAchievementToast: () => void;
}

function getDefaultProgress(): UserProgress {
  return {
    userId: 'user',
    displayName: 'Engineer',
    joinedDate: getTodayString(),
    currentLevel: 1,
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    achievementsUnlocked: [],
    topicProgress: [],
    sessionHistory: [],
    dailyChallengesCompleted: 0,
    totalQuestionsAttempted: 0,
    totalQuestionsCorrect: 0,
    bookmarkedQuestions: [],
    weakAreas: [],
    strongAreas: [],
  };
}

function selectQuestionsForSession(type: SessionType, allQs: Question[], options?: { topicId?: TopicId; difficulty?: Difficulty; questionIds?: string[] }): Question[] {
  let pool: Question[] = [];
  let count = 10;

  if (options?.questionIds) {
    return options.questionIds.map(id => allQs.find(q => q.id === id)!).filter(Boolean);
  }

  switch (type) {
    case 'topic-deep-dive':
      if (options?.topicId) {
        pool = allQs.filter(q => q.topic === options.topicId);
      }
      count = 8;
      break;
    case 'interview-sim':
      pool = [...allQs];
      count = 15;
      break;
    case 'daily-challenge':
      pool = [...allQs];
      count = 5;
      break;
    case 'real-world':
      pool = allQs.filter(q => q.topic === 'real-world-mechanisms');
      count = 6;
      break;
    case 'smart-practice':
      pool = [...allQs];
      count = 10;
      break;
    case 'weak-areas':
    case 'adaptive':
    default:
      pool = [...allQs];
      count = 10;
      break;
  }

  if (options?.difficulty) {
    const filtered = pool.filter(q => q.difficulty === options.difficulty);
    if (filtered.length >= count) pool = filtered;
  }

  return shuffleArray(pool).slice(0, Math.min(count, pool.length));
}

interface SessionContext {
  questions: Question[];
  answers: Record<string, { correct: boolean; confidence?: number; timeSpent: number; xpAwarded: number }>;
}

function checkNewAchievements(progress: UserProgress, sessionCtx?: SessionContext): string[] {
  const newlyUnlocked: string[] = [];

  for (const achievement of allAchievements) {
    if (progress.achievementsUnlocked.includes(achievement.id)) continue;

    let unlocked = false;
    switch (achievement.id) {
      // ── Knowledge ──
      case 'ach-first-correct':
        unlocked = progress.totalQuestionsCorrect >= 1;
        break;
      case 'ach-ten-correct':
        unlocked = progress.totalQuestionsCorrect >= 10;
        break;
      case 'ach-fifty-correct':
        unlocked = progress.totalQuestionsCorrect >= 50;
        break;
      case 'ach-hundred-correct':
        unlocked = progress.totalQuestionsCorrect >= 100;
        break;
      case 'ach-perfect-session':
        if (sessionCtx) {
          const vals = Object.values(sessionCtx.answers);
          unlocked = vals.length >= 5 && vals.every(a => a.correct);
        }
        break;
      case 'ach-all-advanced':
        if (sessionCtx) {
          const advancedCorrect = sessionCtx.questions.filter(q =>
            q.difficulty === 'advanced' && sessionCtx.answers[q.id]?.correct
          ).length;
          // Cumulative isn't tracked separately, so check session has 10+ advanced correct
          // This is generous: counts within a single session
          unlocked = advancedCorrect >= 10;
        }
        break;
      case 'ach-estimation-ace':
        if (sessionCtx) {
          const estimationCorrect = sessionCtx.questions.filter(q =>
            q.type === 'estimation' && sessionCtx.answers[q.id]?.correct
          ).length;
          unlocked = estimationCorrect >= 3;
        }
        break;

      // ── Consistency ──
      case 'ach-streak-3':
        unlocked = progress.currentStreak >= 3;
        break;
      case 'ach-streak-7':
        unlocked = progress.currentStreak >= 7;
        break;
      case 'ach-streak-14':
        unlocked = progress.longestStreak >= 14;
        break;
      case 'ach-streak-30':
        unlocked = progress.longestStreak >= 30;
        break;
      case 'ach-daily-challenge-5':
        unlocked = progress.dailyChallengesCompleted >= 5;
        break;
      case 'ach-weekend-warrior': {
        // Check if session history has both Saturday and Sunday in the same week
        const history = progress.sessionHistory ?? [];
        for (const record of history) {
          const d = new Date(record.date + 'T12:00:00');
          const day = d.getDay();
          if (day === 0 || day === 6) {
            // Find the other weekend day in the same week
            const otherDay = day === 0 ? 6 : 0; // if Sunday, look for Saturday; vice versa
            const satDate = new Date(d);
            satDate.setDate(d.getDate() + (otherDay - day));
            const satStr = satDate.toISOString().split('T')[0];
            if (history.some(r => r.date === satStr)) {
              unlocked = true;
              break;
            }
          }
        }
        break;
      }

      // ── Challenge ──
      case 'ach-speed-round':
        if (sessionCtx) {
          const mcQuestions = sessionCtx.questions.filter(q => q.type === 'multiple-choice');
          const mcCorrect = mcQuestions.filter(q => sessionCtx.answers[q.id]?.correct);
          if (mcCorrect.length >= 5) {
            const totalTime = mcCorrect.slice(0, 5).reduce((sum, q) => sum + (sessionCtx.answers[q.id]?.timeSpent ?? 0), 0);
            unlocked = totalTime > 0 && totalTime <= 120;
          }
        }
        break;
      case 'ach-confidence-calibrated':
        if (sessionCtx) {
          const highConfCorrect = sessionCtx.questions.filter(q => {
            const a = sessionCtx.answers[q.id];
            return a && a.confidence !== undefined && a.confidence >= 3 && a.correct;
          });
          unlocked = highConfCorrect.length >= 5;
        }
        break;
      case 'ach-flaw-finder':
        if (sessionCtx) {
          const flawCorrect = sessionCtx.questions.filter(q =>
            q.type === 'spot-the-flaw' && sessionCtx.answers[q.id]?.correct
          ).length;
          unlocked = flawCorrect >= 3;
        }
        break;
      case 'ach-scenario-master':
        if (sessionCtx) {
          const scenarioCorrect = sessionCtx.questions.filter(q =>
            q.type === 'scenario' && sessionCtx.answers[q.id]?.correct
          ).length;
          unlocked = scenarioCorrect >= 5;
        }
        break;
      case 'ach-hard-streak':
        if (sessionCtx) {
          // Check for 5 consecutive advanced correct answers in session order
          let consecutive = 0;
          for (const q of sessionCtx.questions) {
            const a = sessionCtx.answers[q.id];
            if (q.difficulty === 'advanced' && a?.correct) {
              consecutive++;
              if (consecutive >= 5) { unlocked = true; break; }
            } else if (q.difficulty === 'advanced') {
              consecutive = 0; // only reset on advanced wrong, not on non-advanced
            }
          }
        }
        break;

      // ── Exploration ──
      case 'ach-first-topic':
        unlocked = progress.totalQuestionsAttempted >= 1;
        break;
      case 'ach-five-topics':
        unlocked = (progress.topicProgress ?? []).filter(t => t.questionsAttempted >= 1).length >= 5;
        break;
      case 'ach-all-topics':
        unlocked = (progress.topicProgress ?? []).filter(t => t.questionsAttempted >= 1).length >= 11;
        break;
      case 'ach-all-types':
        if (sessionCtx) {
          // Collect all question types the user has ever attempted across topic progress
          // Since we don't track types in progress, check session questions + use the fact that
          // with enough exploration, the user encounters all types
          const allAttemptedTypes = new Set(sessionCtx.questions
            .filter(q => sessionCtx.answers[q.id])
            .map(q => q.type));
          // We need 13 types total, but a single session likely won't have all.
          // Fall through to check all questions the user could have seen.
          unlocked = allAttemptedTypes.size >= 13;
        }
        break;
      case 'ach-bookworm':
        unlocked = (progress.bookmarkedQuestions ?? []).length >= 10;
        break;

      // ── Mastery ──
      case 'ach-topic-master':
        unlocked = (progress.topicProgress ?? []).some(t => t.questionsAttempted >= 10 && (t.questionsCorrect / t.questionsAttempted) >= 0.8);
        break;
      case 'ach-multi-master':
        unlocked = (progress.topicProgress ?? []).filter(t => t.questionsAttempted >= 10 && (t.questionsCorrect / t.questionsAttempted) >= 0.8).length >= 5;
        break;
      case 'ach-weakness-conquered': {
        // Check if any topic went from <50% to >75%
        // Since we track current accuracy, we check if any topic is now >75%
        // and was previously in weakAreas (which means it was <60%)
        const prevWeak = progress.weakAreas ?? [];
        const currentStrong = (progress.topicProgress ?? []).filter(
          t => t.questionsAttempted >= 10 && (t.questionsCorrect / t.questionsAttempted) > 0.75
        ).map(t => t.topicId);
        unlocked = prevWeak.some(w => currentStrong.includes(w as typeof currentStrong[number]));
        break;
      }
      case 'ach-interview-ready':
        unlocked = (progress.topicProgress ?? []).filter(t => t.questionsAttempted >= 5).length >= 11
          && (progress.topicProgress ?? []).filter(t => t.questionsAttempted >= 5).every(t => (t.questionsCorrect / t.questionsAttempted) >= 0.7);
        break;

      // ── Hidden ──
      case 'ach-night-owl': {
        const hour = new Date().getHours();
        unlocked = hour >= 0 && hour < 5;
        break;
      }
      case 'ach-early-bird': {
        const h = new Date().getHours();
        unlocked = h >= 5 && h < 6;
        break;
      }
      case 'ach-wrong-five':
        if (sessionCtx) {
          const vals = Object.entries(sessionCtx.answers);
          if (vals.length >= 10) {
            // Check for 5 consecutive wrong in session order
            let wrongStreak = 0;
            let had5Wrong = false;
            for (const q of sessionCtx.questions) {
              const a = sessionCtx.answers[q.id];
              if (a && !a.correct) {
                wrongStreak++;
                if (wrongStreak >= 5) had5Wrong = true;
              } else {
                wrongStreak = 0;
              }
            }
            unlocked = had5Wrong;
          }
        }
        break;
      default:
        break;
    }

    if (unlocked) {
      newlyUnlocked.push(achievement.id);
    }
  }

  return newlyUnlocked;
}

function updateLevel(totalXp: number): number {
  let lvl = 1;
  for (const l of levels) {
    if (totalXp >= l.xpRequired) lvl = l.level;
    else break;
  }
  return lvl;
}

function updateTopicProgress(existing: TopicProgress[], questionTopicId: TopicId, subtopic: string, correct: boolean): TopicProgress[] {
  const updated = [...existing];
  const idx = updated.findIndex(t => t.topicId === questionTopicId);

  if (idx >= 0) {
    const tp = { ...updated[idx] };
    tp.questionsAttempted += 1;
    if (correct) tp.questionsCorrect += 1;
    tp.lastAttempted = getTodayString();
    const breakdown = { ...tp.subtopicBreakdown };
    if (!breakdown[subtopic]) breakdown[subtopic] = { attempted: 0, correct: 0 };
    breakdown[subtopic] = {
      attempted: breakdown[subtopic].attempted + 1,
      correct: breakdown[subtopic].correct + (correct ? 1 : 0),
    };
    tp.subtopicBreakdown = breakdown;
    updated[idx] = tp;
  } else {
    updated.push({
      topicId: questionTopicId,
      questionsAttempted: 1,
      questionsCorrect: correct ? 1 : 0,
      averageConfidence: 0,
      lastAttempted: getTodayString(),
      subtopicBreakdown: {
        [subtopic]: { attempted: 1, correct: correct ? 1 : 0 },
      },
    });
  }

  return updated;
}

export const useStore = create<AppState>()(
  subscribeWithSelector(
  persist(
    (set, get) => ({
      progress: seedProgress,
      questions: allQuestions as Question[],
      session: null,
      sessionSummary: null,
      showAchievementToast: null,

      setQuestions: (questions: Question[]) => set({ questions }),

      startSession: (type, options) => {
        // Enforce Pro-only session types
        if (PRO_SESSION_TYPES.has(type)) {
          const subStore = useSubscriptionStore.getState();
          const tier = subStore.debugTierOverride && process.env.NODE_ENV === 'development'
            ? subStore.debugTierOverride
            : subStore.tier;
          const isTrialing = subStore.status === 'trialing';
          const isPastDue = subStore.status === 'past_due';
          if (tier !== 'pro' && !isTrialing && !isPastDue) return;
        }

        const questions = selectQuestionsForSession(type, get().questions, options);
        if (questions.length === 0) return;

        set({
          session: {
            type,
            topicId: options?.topicId,
            difficulty: options?.difficulty,
            questions,
            currentIndex: 0,
            answers: {},
            startTime: Date.now(),
            isTimed: type === 'interview-sim',
            timeLimit: type === 'interview-sim' ? 30 * 60 : undefined,
          },
          sessionSummary: null,
        });
      },

      answerQuestion: (questionId, correct, confidence, timeSpent = 0) => {
        const { session, progress } = get();
        if (!session) return;

        const question = session.questions.find(q => q.id === questionId);
        if (!question) return;

        const xp = calculateXP(question, correct, timeSpent, confidence);

        set(state => ({
          session: state.session ? {
            ...state.session,
            answers: {
              ...state.session.answers,
              [questionId]: { correct, confidence, timeSpent, xpAwarded: xp },
            },
          } : null,
          progress: {
            ...state.progress,
            totalXp: state.progress.totalXp + xp,
            totalQuestionsAttempted: state.progress.totalQuestionsAttempted + 1,
            totalQuestionsCorrect: state.progress.totalQuestionsCorrect + (correct ? 1 : 0),
            currentLevel: updateLevel(state.progress.totalXp + xp),
            topicProgress: updateTopicProgress(state.progress.topicProgress, question.topic, question.subtopic, correct),
            lastActiveDate: getTodayString(),
          },
        }));

        // Bridge to course store if this is a course question
        if (questionId.match(/^u\d+-L\d+-Q/)) {
          useCourseStore.getState().creditPracticeAnswer(questionId, correct);
        }
      },

      nextQuestion: () => {
        set(state => {
          if (!state.session) return state;
          const nextIdx = Math.min(state.session.currentIndex + 1, state.session.questions.length - 1);
          return { session: { ...state.session, currentIndex: nextIdx } };
        });
      },

      prevQuestion: () => {
        set(state => {
          if (!state.session) return state;
          const prevIdx = Math.max(state.session.currentIndex - 1, 0);
          return { session: { ...state.session, currentIndex: prevIdx } };
        });
      },

      completeSession: () => {
        const { session, progress } = get();
        if (!session) return;

        const answers = Object.values(session.answers);
        const correct = answers.filter(a => a.correct).length;
        const attempted = answers.length;
        const duration = Math.round((Date.now() - session.startTime) / 1000);
        const topicsCovered = [...new Set(session.questions.map(q => q.topic))];
        const xpEarned = answers.reduce((sum, a) => sum + a.xpAwarded, 0);

        // Update streak
        const today = getTodayString();
        const lastActive = progress.lastActiveDate;
        let newStreak = progress.currentStreak;
        if (lastActive !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          if (lastActive === yesterdayStr) {
            newStreak += 1;
          } else if (!lastActive) {
            newStreak = 1;
          } else {
            newStreak = 1; // streak broken
          }
        }

        const sessionRecord: SessionRecord = {
          id: `session-${Date.now()}`,
          date: today,
          durationMinutes: Math.round(duration / 60),
          questionsAttempted: attempted,
          questionsCorrect: correct,
          topicsCovered,
          xpEarned,
        };

        const updatedProgress: UserProgress = {
          ...progress,
          currentStreak: newStreak,
          longestStreak: Math.max(progress.longestStreak, newStreak),
          lastActiveDate: today,
          sessionHistory: [sessionRecord, ...progress.sessionHistory].slice(0, 50),
          dailyChallengesCompleted: session.type === 'daily-challenge'
            ? progress.dailyChallengesCompleted + 1
            : progress.dailyChallengesCompleted,
        };

        // Check for new achievements (pass session context for session-specific checks)
        const sessionCtx: SessionContext = { questions: session.questions, answers: session.answers };
        const newAchievements = checkNewAchievements(updatedProgress, sessionCtx);
        updatedProgress.achievementsUnlocked = [...updatedProgress.achievementsUnlocked, ...newAchievements];

        // Award achievement XP
        const achievementXp = newAchievements.reduce((sum, id) => {
          const achievement = allAchievements.find(a => a.id === id);
          return sum + (achievement?.xpReward ?? 0);
        }, 0);
        if (achievementXp > 0) {
          updatedProgress.totalXp += achievementXp;
          updatedProgress.currentLevel = updateLevel(updatedProgress.totalXp);
        }

        // Calculate weak/strong areas
        const topicAccuracies = updatedProgress.topicProgress
          .filter(t => t.questionsAttempted >= 5)
          .map(t => ({ id: t.topicId, accuracy: t.questionsCorrect / t.questionsAttempted }));
        updatedProgress.weakAreas = topicAccuracies.filter(t => t.accuracy < 0.6).map(t => t.id);
        updatedProgress.strongAreas = topicAccuracies.filter(t => t.accuracy >= 0.8).map(t => t.id);

        const previousLevel = progress.currentLevel;

        const summary: SessionSummary = {
          type: session.type,
          questionsAttempted: attempted,
          questionsCorrect: correct,
          xpEarned,
          topicsCovered,
          duration,
          accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
          newAchievements,
          newLevel: updatedProgress.currentLevel > previousLevel,
        };

        set({
          progress: updatedProgress,
          session: null,
          sessionSummary: summary,
          showAchievementToast: newAchievements.length > 0 ? newAchievements[0] : null,
        });
      },

      abandonSession: () => {
        set({ session: null, sessionSummary: null });
      },

      resetProgress: () => {
        set({ progress: getDefaultProgress(), session: null, sessionSummary: null });
      },

      loadSeedData: () => {
        set({ progress: seedProgress });
      },

      debugSetFromCourse: (data) => {
        const progress = get().progress;
        const newProgress: UserProgress = {
          ...progress,
          topicProgress: data.topicProgress,
          totalQuestionsAttempted: data.totalQuestions,
          totalQuestionsCorrect: data.totalCorrect,
          totalXp: data.totalXp,
          currentLevel: updateLevel(data.totalXp),
          currentStreak: data.streak,
          longestStreak: Math.max(progress.longestStreak, data.streak),
          lastActiveDate: data.totalQuestions > 0 ? getTodayString() : '',
          weakAreas: [],
          strongAreas: data.topicProgress
            .filter(t => t.questionsAttempted >= 5 && (t.questionsCorrect / t.questionsAttempted) >= 0.8)
            .map(t => t.topicId),
        };

        // Check achievements
        const newAchievements = checkNewAchievements(newProgress);
        newProgress.achievementsUnlocked = [...new Set([...progress.achievementsUnlocked, ...newAchievements])];

        // Award achievement XP
        const achievementXp = newAchievements.reduce((sum, id) => {
          const achievement = allAchievements.find(a => a.id === id);
          return sum + (achievement?.xpReward ?? 0);
        }, 0);
        if (achievementXp > 0) {
          newProgress.totalXp += achievementXp;
          newProgress.currentLevel = updateLevel(newProgress.totalXp);
        }

        set({ progress: newProgress });
      },

      dismissAchievementToast: () => {
        set({ showAchievementToast: null });
      },
    }),
    {
      name: 'mechready-storage',
      version: 1,
      partialize: (state) => ({ progress: state.progress }),
      migrate: (persistedState: unknown) => {
        // Migrate from version 0 (no version) to version 1
        const state = persistedState as Partial<AppState> | undefined;
        return state ?? {};
      },
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<AppState> | undefined;
        if (!persisted?.progress) return currentState;
        // Deep merge persisted progress with defaults to fill any missing fields
        const defaults = getDefaultProgress();
        return {
          ...currentState,
          progress: {
            ...defaults,
            ...persisted.progress,
            topicProgress: persisted.progress.topicProgress ?? defaults.topicProgress,
            sessionHistory: persisted.progress.sessionHistory ?? defaults.sessionHistory,
            achievementsUnlocked: persisted.progress.achievementsUnlocked ?? defaults.achievementsUnlocked,
            bookmarkedQuestions: persisted.progress.bookmarkedQuestions ?? defaults.bookmarkedQuestions,
            weakAreas: persisted.progress.weakAreas ?? defaults.weakAreas,
            strongAreas: persisted.progress.strongAreas ?? defaults.strongAreas,
            displayName: persisted.progress.displayName ?? defaults.displayName,
          },
        };
      },
    }
  ))
);

// --- Selectors for performance ---
export const useProgress = () => useStore(s => s.progress);
export const useSession = () => useStore(useShallow(s => ({ session: s.session, sessionSummary: s.sessionSummary })));
export const useSessionActions = () => useStore(useShallow(s => ({
  startSession: s.startSession,
  answerQuestion: s.answerQuestion,
  nextQuestion: s.nextQuestion,
  prevQuestion: s.prevQuestion,
  completeSession: s.completeSession,
  abandonSession: s.abandonSession,
})));
