'use client';

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { TOTAL_TOPICS, type TopicId, type Difficulty, type UserProgress, type SessionRecord, type TopicProgress } from '@/data/types';
import type { CourseQuestion } from '@/data/course/types';
import { seedProgress } from '@/data/seed-progress';
import { levels, getLevelForXp } from '@/data/levels';
import { getLevelReward } from '@/data/level-rewards';
import { achievements as allAchievements } from '@/data/achievements';
import { shuffleArray, getTodayString, getYesterdayString, calculateXP } from '@/lib/utils';
import { PRO_SESSION_TYPES } from '@/lib/pricing';
import { useSubscriptionStore } from '@/hooks/useSubscription';
import { useCourseStore } from '@/store/useCourseStore';
import { useEngagementStore } from '@/store/useEngagementStore';
import { awardStreakMilestones } from '@/lib/streak-rewards';
import { DOUBLE_XP_SHOP_DURATION_MS } from '@/data/engagement-types';
import { DOUBLE_XP_BUFFER_MS, DOUBLE_XP_RECENT_PURCHASE_WINDOW_MS } from '@/lib/game-config';
import { STORAGE_KEYS } from '@/lib/storage-keys';
import { getEventXpMultiplier } from '@/lib/xp-events';
import { selectSmartPracticeQuestions, buildPerformance } from '@/lib/practice-algorithm';

// --- Session Types ---
export type SessionType = 'adaptive' | 'topic-deep-dive' | 'interview-sim' | 'daily-challenge' | 'real-world' | 'weak-areas' | 'smart-practice';

// CourseQuestion enriched with topic metadata for practice sessions
export type PracticeQuestion = CourseQuestion & {
  topic: TopicId;
  subtopic: string;
  difficulty: Difficulty;
};

export interface ActiveSession {
  type: SessionType;
  topicId?: TopicId;
  difficulty?: Difficulty;
  questions: PracticeQuestion[];
  currentIndex: number;
  answers: Record<string, { correct: boolean; confidence?: number; timeSpent: number; xpAwarded: number }>;
  startTime: number;
  isTimed: boolean;
  timeLimit?: number;
  retryCount: number;
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

  // Active Session
  session: ActiveSession | null;
  sessionSummary: SessionSummary | null;

  // UI State
  sidebarOpen: boolean;
  showAchievementToast: string | null;

  // Actions — Session
  startSession: (type: SessionType, options?: { topicId?: TopicId; difficulty?: Difficulty; resolvedQuestions?: PracticeQuestion[]; mistakeQuestionIds?: string[] }) => void;
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
  debugSetXp: (xp: number) => void;

  // Actions — UI
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  dismissAchievementToast: () => void;
}

function getDefaultProgress(): UserProgress {
  return {
    userId: 'user',
    displayName: 'Learner',
    joinedDate: getTodayString(),
    currentLevel: 1,
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    activeDays: [],
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

/** Gather all course questions as PracticeQuestions with topic metadata. */
function gatherCourseQuestions(): PracticeQuestion[] {
  const courseData = useCourseStore.getState().courseData;
  const all: PracticeQuestion[] = [];
  for (let ui = 0; ui < courseData.length; ui++) {
    const unit = courseData[ui];
    // Use topicId if available, otherwise derive from sectionTitle slug
    const topicId = unit.topicId || (unit.sectionTitle
      ? unit.sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') as TopicId
      : null);
    if (!topicId) continue;
    const difficulty: Difficulty = ui < 4 ? 'beginner' : ui < 8 ? 'intermediate' : 'advanced';
    for (const lesson of unit.lessons) {
      for (const q of lesson.questions) {
        all.push({ ...q, topic: topicId, subtopic: lesson.title, difficulty });
      }
    }
  }
  return all;
}

/**
 * Ensure full course question data is loaded into useCourseStore.
 * Returns true if data was already loaded, false if a load was triggered (async).
 */
async function ensureCourseDataLoaded(): Promise<void> {
  const { loadUnitData } = await import('@/data/course/course-meta');
  const store = useCourseStore.getState();
  const needsLoad = store.courseData.some(u => u.lessons.some(l => l.questions.length === 0));
  if (!needsLoad) return;

  const fullUnits = await Promise.all(
    store.courseData.map((_, i) => loadUnitData(i, store.activeProfession))
  );
  useCourseStore.setState({ courseData: fullUnits });
}

function selectQuestionsForSession(type: SessionType, options?: { topicId?: TopicId; difficulty?: Difficulty; resolvedQuestions?: PracticeQuestion[]; mistakeQuestionIds?: string[] }): PracticeQuestion[] {
  if (options?.resolvedQuestions && options.resolvedQuestions.length > 0) {
    return options.resolvedQuestions;
  }

  let pool = gatherCourseQuestions();
  let count = 10;

  switch (type) {
    case 'topic-deep-dive':
      if (options?.topicId) pool = pool.filter(q => q.topic === options.topicId);
      count = 8;
      break;
    case 'interview-sim':
      count = 15;
      break;
    case 'daily-challenge': {
      if (pool.length === 0) return [];
      // Deterministic daily selection: stable order + date-based offset
      const sorted = pool.sort((a, b) => a.id.localeCompare(b.id));
      const dayNum = parseInt(getTodayString().replace(/-/g, '').slice(-4));
      const start = dayNum % sorted.length;
      const daily: PracticeQuestion[] = [];
      for (let i = 0; i < Math.min(5, sorted.length); i++) {
        daily.push(sorted[(start + i * 7) % sorted.length]);
      }
      return daily;
    }
    case 'real-world':
      pool = pool.filter(q => q.topic === 'real-world-mechanisms');
      count = 6;
      break;
    case 'smart-practice': {
      // Mistakes mode: filter pool to specific mistake question IDs
      if (options?.mistakeQuestionIds && options.mistakeQuestionIds.length > 0) {
        const mistakeSet = new Set(options.mistakeQuestionIds);
        const mistakePool = pool.filter(q => mistakeSet.has(q.id));
        if (mistakePool.length > 0) {
          return shuffleArray(mistakePool).slice(0, 10);
        }
      }
      const state = useStore.getState();
      const performance = buildPerformance(state.progress.topicProgress, state.progress.sessionHistory);
      // Use pool (already gathered + flattened course questions) as practiceQuestions.
      // Pass [] for courseData since pool already contains everything.
      const selected = selectSmartPracticeQuestions(pool as any, [], performance, {
        topicId: options?.topicId,
        count: 10,
      });
      if (selected.length > 0) {
        return selected.map(s => s.question as unknown as PracticeQuestion);
      }
      count = 10;
      break;
    }
    case 'weak-areas':
    case 'adaptive':
    default:
      count = 10;
      break;
  }

  if (options?.topicId && type !== 'topic-deep-dive') {
    const filtered = pool.filter(q => q.topic === options.topicId);
    if (filtered.length > 0) pool = filtered;
  }

  if (options?.difficulty) {
    const filtered = pool.filter(q => q.difficulty === options.difficulty);
    if (filtered.length >= count) pool = filtered;
  }

  return shuffleArray(pool).slice(0, Math.min(count, pool.length));
}

interface SessionContext {
  questions: PracticeQuestion[];
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
        // Removed: estimation questions no longer exist (course questions only)
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
        // Removed: spot-the-flaw questions no longer exist (course questions only)
        break;
      case 'ach-scenario-master':
        // Removed: scenario questions no longer exist (course questions only)
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
        unlocked = (progress.topicProgress ?? []).filter(t => t.questionsAttempted >= 1).length >= TOTAL_TOPICS;
        break;
      case 'ach-all-types':
        if (sessionCtx) {
          // Check that user has attempted all 3 course question types (MC, T/F, fill-blank)
          const allAttemptedTypes = new Set(sessionCtx.questions
            .filter(q => sessionCtx.answers[q.id])
            .map(q => q.type));
          unlocked = allAttemptedTypes.size >= 3;
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
        unlocked = (progress.topicProgress ?? []).filter(t => t.questionsAttempted >= 5).length >= TOTAL_TOPICS
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
      session: null,
      sessionSummary: null,
      sidebarOpen: false,
      showAchievementToast: null,

      startSession: (type, options) => {
        // Enforce Pro-only session types (client-side fast check)
        if (PRO_SESSION_TYPES.has(type)) {
          const subStore = useSubscriptionStore.getState();
          const tier = subStore.debugTierOverride && process.env.NODE_ENV === 'development'
            ? subStore.debugTierOverride
            : subStore.tier;
          const isTrialing = subStore.status === 'trialing';
          const isPastDue = subStore.status === 'past_due';
          if (tier !== 'pro' && !isTrialing && !isPastDue) return;
        }

        // If course data is not fully loaded yet, load it first then create session
        // Only check standard lessons — conversation/speed-round/timeline/case-study
        // lessons legitimately have questions=[] even when fully loaded.
        const courseStore = useCourseStore.getState();
        const SPECIAL_TYPES = new Set(['conversation', 'speed-round', 'timeline', 'case-study']);
        const needsLoad = courseStore.courseData.some(u => u.lessons.some(l => !SPECIAL_TYPES.has(l.type ?? '') && l.questions.length === 0));
        if (needsLoad && !options?.resolvedQuestions) {
          // Set a loading flag so UI knows we're working
          set({ session: null });
          ensureCourseDataLoaded().then(() => {
            // Now data is loaded — build session synchronously
            const questions = selectQuestionsForSession(type, options);
            if (questions.length === 0) {
              console.warn('[startSession] No questions found after loading course data for', type);
              set({ session: null, sessionSummary: null });
              return;
            }
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
                retryCount: 0,
              },
              sessionSummary: null,
            });
          }).catch((err) => {
            console.error('[startSession] Failed to load course data:', err);
            set({ session: null, sessionSummary: null });
          });
          return;
        }

        const questions = selectQuestionsForSession(type, options);
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
            retryCount: 0,
          },
          sessionSummary: null,
        });

        // ── Server-side validation (async, aborts session if rejected) ──
        // Fire-and-forget: if the server says no, abort the session
        fetch('/api/session/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionType: type }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && !data.allowed) {
              // Server rejected — abort the session
              const current = get().session;
              if (current?.type === type && current.startTime === get().session?.startTime) {
                set({ session: null, sessionSummary: null });
              }
            }
          })
          .catch(() => {
            // Network error — don't abort (offline-friendly)
          });
      },

      answerQuestion: (questionId, correct, confidence, timeSpent = 0) => {
        const { session, progress } = get();
        if (!session) return;

        const question = session.questions.find(q => q.id === questionId);
        if (!question) return;

        // Check if this question was already answered earlier in the session (recycled retry)
        const alreadyAnswered = session.answers[questionId] !== undefined;

        let xp = alreadyAnswered ? 0 : calculateXP(question, correct, timeSpent, confidence);

        if (!alreadyAnswered) {
          // Apply double XP boost if active (with tamper validation)
          const engState = useEngagementStore.getState();
          const doubleXpExpiry = engState.doubleXpExpiry;
          let shopDoubleXp = false;
          if (doubleXpExpiry) {
            const expiry = new Date(doubleXpExpiry).getTime();
            const now = Date.now();
            // Validate: expiry must be in the future, not exceed max allowed duration,
            // and a recent shop_purchase transaction must exist
            if (!isNaN(expiry) && expiry > now && expiry <= now + DOUBLE_XP_SHOP_DURATION_MS + DOUBLE_XP_BUFFER_MS) {
              const recentCutoff = now - (DOUBLE_XP_SHOP_DURATION_MS + DOUBLE_XP_RECENT_PURCHASE_WINDOW_MS);
              shopDoubleXp = engState.gems.transactions.some(
                (t) => t.source === 'shop_purchase' && t.amount < 0 && new Date(t.timestamp).getTime() > recentCutoff
              );
            }
          }

          // Time-limited XP events (weekend 2x, power hour, league sprint)
          const isPro = useSubscriptionStore.getState().tier === 'pro';
          const eventMultiplier = getEventXpMultiplier(isPro);
          const shopMultiplier = shopDoubleXp ? 2 : 1;
          // Shop boost and event boost stack additively (matches useCourseStore.completeLesson)
          const totalBoostMultiplier = shopMultiplier === 1 && eventMultiplier === 1
            ? 1
            : 1 + (shopMultiplier - 1) + (eventMultiplier - 1);
          xp = Math.round(xp * totalBoostMultiplier);
          // Cap per-question XP to prevent extreme inflation during event stacking
          xp = Math.min(xp, 200);
        }

        set(state => ({
          session: state.session ? {
            ...state.session,
            answers: {
              ...state.session.answers,
              [questionId]: { correct, confidence, timeSpent, xpAwarded: alreadyAnswered ? 0 : xp },
            },
          } : null,
          progress: alreadyAnswered ? state.progress : {
            ...state.progress,
            totalXp: state.progress.totalXp + xp,
            totalQuestionsAttempted: state.progress.totalQuestionsAttempted + 1,
            totalQuestionsCorrect: state.progress.totalQuestionsCorrect + (correct ? 1 : 0),
            currentLevel: updateLevel(state.progress.totalXp + xp),
            topicProgress: updateTopicProgress(state.progress.topicProgress, question.topic, question.subtopic, correct),
            // NOTE: lastActiveDate is intentionally NOT set here — it must stay
            // at the previous value until completeSession runs, so streak logic
            // can detect consecutive-day gaps and increment correctly.
          },
        }));

        if (!alreadyAnswered) {
          // Bridge to course store if this is a course question
          if (questionId.match(/^u\d+-L\d+-Q/)) {
            useCourseStore.getState().creditPracticeAnswer(questionId, correct);
          }

          // Track mistakes globally
          if (!correct) {
            useEngagementStore.getState().addMistake(questionId);
          }
        }

        // Wrong-answer recycling for practice sessions (only on first attempt, and not on last question)
        if (!correct && !alreadyAnswered && session.type === 'smart-practice') {
          set(state => {
            if (!state.session) return {};
            const isLast = state.session.currentIndex >= state.session.questions.length - 1;
            if (isLast) return {};
            const questions = [...state.session.questions];
            const insertOffset = 2 + Math.floor(Math.random() * 3); // 2-4 positions later
            const insertAt = Math.min(state.session.currentIndex + insertOffset, questions.length);
            questions.splice(insertAt, 0, question);
            return {
              session: {
                ...state.session,
                questions,
                retryCount: state.session.retryCount + 1,
              },
            };
          });
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

        // Update streak (with freeze support + cross-store sync)
        const today = getTodayString();
        const lastActive = progress.lastActiveDate;
        const engState = useEngagementStore.getState();
        let newStreak = progress.currentStreak;
        if (lastActive !== today) {
          if (lastActive === getYesterdayString()) {
            newStreak += 1;
          } else if (!lastActive) {
            newStreak = 1;
          } else {
            // Missed day(s) — check for streak freeze
            if (engState.streak.freezesOwned > 0 && newStreak > 0) {
              engState.useStreakFreeze();
              newStreak += 1; // Continue as if no break
            } else {
              if (newStreak > 0) {
                engState.recordStreakBreak(newStreak);
              }
              newStreak = 1; // streak broken
            }
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

        // Track active days for week tracker (keep last 14 days)
        const existingDays = progress.activeDays ?? [];
        const updatedActiveDays = existingDays.includes(today)
          ? existingDays
          : [...existingDays, today].slice(-14);

        // Check and award streak milestones
        if (newStreak > progress.currentStreak) {
          awardStreakMilestones(newStreak);
        }

        const updatedProgress: UserProgress = {
          ...progress,
          currentStreak: newStreak,
          longestStreak: Math.max(progress.longestStreak, newStreak),
          lastActiveDate: today,
          activeDays: updatedActiveDays,
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

        // Clear correctly-answered questions from mistakes list
        const correctIds = Object.entries(session.answers)
          .filter(([, a]) => a.correct)
          .map(([id]) => id);
        if (correctIds.length > 0) {
          useEngagementStore.getState().removeMistakes(correctIds);
        }

        // Cross-store sync: keep course store's streak in lockstep so the
        // header display and freeze/repair systems stay consistent regardless
        // of which mode the user practices in.
        useCourseStore.setState((cs) => {
          const csActiveDays = cs.progress.activeDays ?? [];
          return {
            progress: {
              ...cs.progress,
              currentStreak: newStreak,
              longestStreak: Math.max(cs.progress.longestStreak, newStreak),
              lastActiveDate: today,
              activeDays: csActiveDays.includes(today)
                ? csActiveDays
                : [...csActiveDays, today].slice(-14),
            },
          };
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
          longestStreak: data.streak,
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

      debugSetXp: (xp) => {
        const oldXp = get().progress.totalXp;
        set((state) => ({
          progress: {
            ...state.progress,
            totalXp: xp,
            currentLevel: updateLevel(xp),
          },
        }));
        // Sync to course store so XP popover in CourseHeader reflects the change
        useCourseStore.setState((state) => ({
          progress: { ...state.progress, totalXp: xp },
        }));
        // Trigger level-up celebration if crossing a level boundary upward
        const oldLevel = getLevelForXp(oldXp);
        const newLevel = getLevelForXp(xp);
        if (newLevel.level > oldLevel.level) {
          const reward = getLevelReward(newLevel.level);
          if (reward) {
            useCourseStore.setState({ pendingCelebrations: [{ type: 'level-up', reward }] });
          }
        }
      },

      toggleSidebar: () => {
        set(state => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },

      dismissAchievementToast: () => {
        set({ showAchievementToast: null });
      },
    }),
    {
      name: STORAGE_KEYS.APP_STORE,
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
            activeDays: persisted.progress.activeDays ?? defaults.activeDays,
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
export const useSidebar = () => useStore(useShallow(s => ({
  sidebarOpen: s.sidebarOpen,
  toggleSidebar: s.toggleSidebar,
  setSidebarOpen: s.setSidebarOpen,
})));
