import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Unit, LessonProgress } from '@/data/course/types';

// Mock external store dependencies before importing useCourseStore
vi.mock('@/store/useMasteryStore', () => ({
  useMasteryStore: {
    getState: () => ({ debugSetEvents: vi.fn() }),
  },
}));

vi.mock('@/store/useStore', () => ({
  useStore: {
    getState: () => ({ debugSetFromCourse: vi.fn() }),
    setState: vi.fn(),
  },
}));

vi.mock('@/store/useEngagementStore', () => ({
  useEngagementStore: {
    getState: () => ({
      debugSetFromCourse: vi.fn(),
      streak: { freezesOwned: 0, freezeUsedToday: false },
      useStreakFreeze: vi.fn(),
      recordStreakBreak: vi.fn(),
      updateLeagueXp: vi.fn(),
      updateQuestProgress: vi.fn(),
    }),
  },
}));

// Mock shuffleArray to return identity (predictable order)
vi.mock('@/lib/utils', () => ({
  shuffleArray: <T>(arr: T[]): T[] => [...arr],
}));

import { useCourseStore } from '@/store/useCourseStore';

// -- Test fixtures --

function makeFakeQuestion(id: string) {
  return {
    id,
    type: 'multiple-choice' as const,
    question: `Question ${id}`,
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 0,
    explanation: 'Explanation',
  };
}

function makeFakeLesson(id: string, questionCount = 15, xpReward = 10) {
  return {
    id,
    title: `Lesson ${id}`,
    description: 'desc',
    icon: 'icon',
    xpReward,
    questions: Array.from({ length: questionCount }, (_, i) =>
      makeFakeQuestion(`${id}-q${i}`)
    ),
  };
}

function makeFakeUnit(id: string, lessonCount = 2, questionsPerLesson = 15): Unit {
  return {
    id,
    title: `Unit ${id}`,
    description: 'desc',
    color: '#000',
    icon: 'icon',
    lessons: Array.from({ length: lessonCount }, (_, i) =>
      makeFakeLesson(`${id}-L${i}`, questionsPerLesson)
    ),
  } as Unit;
}

function getDefaultProgress() {
  return {
    displayName: 'Engineer',
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    completedLessons: {},
  };
}

function resetStore(courseData?: Unit[]) {
  const data = courseData ?? [makeFakeUnit('u0', 2, 15), makeFakeUnit('u1', 2, 15)];
  useCourseStore.setState({
    progress: getDefaultProgress(),
    courseData: data,
    activeLesson: null,
    lessonResult: null,
    chapterJustCompleted: null,
    courseJustCompleted: false,
  });
}

describe('useCourseStore', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('initial state', () => {
    it('has default progress with no completed lessons', () => {
      const state = useCourseStore.getState();
      expect(state.progress.totalXp).toBe(0);
      expect(state.progress.completedLessons).toEqual({});
      expect(state.activeLesson).toBeNull();
      expect(state.lessonResult).toBeNull();
    });
  });

  describe('startLesson', () => {
    it('sets up activeLesson with correct initial values', () => {
      useCourseStore.getState().startLesson(0, 0);

      const state = useCourseStore.getState();
      expect(state.activeLesson).not.toBeNull();
      expect(state.activeLesson!.unitIndex).toBe(0);
      expect(state.activeLesson!.lessonIndex).toBe(0);
      expect(state.activeLesson!.currentQuestionIndex).toBe(0);
      expect(state.activeLesson!.answers).toEqual([]);
      expect(state.activeLesson!.isGolden).toBe(false);
    });

    it('caps session to 10 questions on first attempt', () => {
      useCourseStore.getState().startLesson(0, 0);

      const state = useCourseStore.getState();
      expect(state.activeLesson!.sessionQuestionIds.length).toBeLessThanOrEqual(10);
    });

    it('clears any previous lessonResult', () => {
      useCourseStore.setState({
        lessonResult: {
          lessonId: 'old', unitTitle: '', lessonTitle: '', totalQuestions: 0,
          correctAnswers: 0, xpEarned: 0, accuracy: 0, stars: 0,
          passed: false, isFlawless: false, isNewBest: false, isFirstCompletion: false, isGolden: false,
        },
      });
      useCourseStore.getState().startLesson(0, 0);

      expect(useCourseStore.getState().lessonResult).toBeNull();
    });

    it('golden session marks isGolden true', () => {
      useCourseStore.getState().startLesson(0, 0, true);

      const state = useCourseStore.getState();
      expect(state.activeLesson!.isGolden).toBe(true);
    });

    it('retry session focuses on incorrect questions', () => {
      const courseData = useCourseStore.getState().courseData;
      const lessonId = courseData[0].lessons[0].id;
      const allQIds = courseData[0].lessons[0].questions.map(q => q.id);

      // Simulate a completed lesson where first 5 questions were correct
      useCourseStore.setState({
        progress: {
          ...getDefaultProgress(),
          completedLessons: {
            [lessonId]: {
              stars: 1,
              bestAccuracy: 50,
              attempts: 1,
              lastAttempted: '2026-01-01',
              passed: true,
              golden: false,
              answeredQuestionIds: allQIds.slice(0, 10),
              correctQuestionIds: allQIds.slice(0, 5),
            },
          },
        },
      });

      useCourseStore.getState().startLesson(0, 0);

      const session = useCourseStore.getState().activeLesson!;
      // With 10 incorrect questions available (ids 5-14), those should be preferred
      // Since shuffleArray is mocked to identity, we get the first 10 of the incorrect pool
      const correctSet = new Set(allQIds.slice(0, 5));
      const sessionQs = session.sessionQuestionIds;
      // The session should primarily contain incorrect questions
      const incorrectInSession = sessionQs.filter(id => !correctSet.has(id));
      expect(incorrectInSession.length).toBeGreaterThanOrEqual(5);
    });

    it('golden session prefers unseen questions', () => {
      const courseData = useCourseStore.getState().courseData;
      const lessonId = courseData[0].lessons[0].id;
      const allQIds = courseData[0].lessons[0].questions.map(q => q.id);

      useCourseStore.setState({
        progress: {
          ...getDefaultProgress(),
          completedLessons: {
            [lessonId]: {
              stars: 3,
              bestAccuracy: 90,
              attempts: 3,
              lastAttempted: '2026-01-01',
              passed: true,
              golden: false,
              answeredQuestionIds: allQIds.slice(0, 10),
              correctQuestionIds: allQIds.slice(0, 10),
            },
          },
        },
      });

      useCourseStore.getState().startLesson(0, 0, true);

      const session = useCourseStore.getState().activeLesson!;
      const seenSet = new Set(allQIds.slice(0, 10));
      const unseenInSession = session.sessionQuestionIds.filter(id => !seenSet.has(id));
      // With 5 unseen questions available (ids 10-14), they should be in the session
      expect(unseenInSession.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('submitAnswer', () => {
    it('accumulates answers in activeLesson', () => {
      useCourseStore.getState().startLesson(0, 0);
      const qId = useCourseStore.getState().activeLesson!.sessionQuestionIds[0];

      useCourseStore.getState().submitAnswer(qId, true);

      const answers = useCourseStore.getState().activeLesson!.answers;
      expect(answers).toHaveLength(1);
      expect(answers[0]).toEqual({ questionId: qId, correct: true });
    });

    it('is a no-op when no active lesson', () => {
      useCourseStore.setState({ activeLesson: null });
      useCourseStore.getState().submitAnswer('q-1', true);
      // No error thrown, state unchanged
      expect(useCourseStore.getState().activeLesson).toBeNull();
    });

    it('appends multiple answers', () => {
      useCourseStore.getState().startLesson(0, 0);
      const ids = useCourseStore.getState().activeLesson!.sessionQuestionIds;

      useCourseStore.getState().submitAnswer(ids[0], true);
      useCourseStore.getState().submitAnswer(ids[1], false);
      useCourseStore.getState().submitAnswer(ids[2], true);

      expect(useCourseStore.getState().activeLesson!.answers).toHaveLength(3);
    });
  });

  describe('nextQuestion', () => {
    it('increments currentQuestionIndex', () => {
      useCourseStore.getState().startLesson(0, 0);
      expect(useCourseStore.getState().activeLesson!.currentQuestionIndex).toBe(0);

      useCourseStore.getState().nextQuestion();
      expect(useCourseStore.getState().activeLesson!.currentQuestionIndex).toBe(1);
    });

    it('does not exceed session question count', () => {
      useCourseStore.getState().startLesson(0, 0);
      const count = useCourseStore.getState().activeLesson!.sessionQuestionIds.length;

      // Try to go past the end
      for (let i = 0; i < count + 5; i++) {
        useCourseStore.getState().nextQuestion();
      }

      // Should stop at count - 1 (last valid index means no increment happens)
      expect(useCourseStore.getState().activeLesson!.currentQuestionIndex).toBe(count - 1);
    });

    it('is a no-op when no active lesson', () => {
      useCourseStore.setState({ activeLesson: null });
      useCourseStore.getState().nextQuestion();
      expect(useCourseStore.getState().activeLesson).toBeNull();
    });
  });

  describe('completeLesson', () => {
    function completeWithAccuracy(correctCount: number, totalCount: number, golden = false) {
      useCourseStore.getState().startLesson(0, 0, golden);
      const ids = useCourseStore.getState().activeLesson!.sessionQuestionIds;

      for (let i = 0; i < Math.min(totalCount, ids.length); i++) {
        useCourseStore.getState().submitAnswer(ids[i], i < correctCount);
      }
      useCourseStore.getState().completeLesson();
    }

    it('produces a lessonResult and clears activeLesson', () => {
      completeWithAccuracy(8, 10);

      const state = useCourseStore.getState();
      expect(state.activeLesson).toBeNull();
      expect(state.lessonResult).not.toBeNull();
      expect(state.lessonResult!.accuracy).toBe(80);
      expect(state.lessonResult!.correctAnswers).toBe(8);
      expect(state.lessonResult!.totalQuestions).toBe(10);
    });

    it('calculates stars = attempt count (capped at 3) for non-golden', () => {
      completeWithAccuracy(10, 10); // first attempt
      expect(useCourseStore.getState().lessonResult!.stars).toBe(1);

      // Second attempt
      useCourseStore.getState().dismissResult();
      completeWithAccuracy(10, 10);
      expect(useCourseStore.getState().lessonResult!.stars).toBe(2);

      // Third attempt
      useCourseStore.getState().dismissResult();
      completeWithAccuracy(10, 10);
      expect(useCourseStore.getState().lessonResult!.stars).toBe(3);

      // Fourth attempt still capped at 3
      useCourseStore.getState().dismissResult();
      completeWithAccuracy(10, 10);
      expect(useCourseStore.getState().lessonResult!.stars).toBe(3);
    });

    it('golden sessions always yield 3 stars', () => {
      completeWithAccuracy(5, 10, true);
      expect(useCourseStore.getState().lessonResult!.stars).toBe(3);
      expect(useCourseStore.getState().lessonResult!.isGolden).toBe(true);
    });

    it('computes XP based on accuracy multiplier', () => {
      const xpReward = useCourseStore.getState().courseData[0].lessons[0].xpReward;

      // 100% accuracy -> flawless multiplier 4
      completeWithAccuracy(10, 10);
      expect(useCourseStore.getState().lessonResult!.xpEarned).toBe(xpReward * 4);
    });

    it('computes XP for 70-89% accuracy (multiplier 2)', () => {
      const xpReward = useCourseStore.getState().courseData[0].lessons[0].xpReward;

      completeWithAccuracy(8, 10);
      expect(useCourseStore.getState().lessonResult!.xpEarned).toBe(xpReward * 2);
    });

    it('computes XP for <70% accuracy (multiplier 1)', () => {
      const xpReward = useCourseStore.getState().courseData[0].lessons[0].xpReward;

      completeWithAccuracy(5, 10);
      expect(useCourseStore.getState().lessonResult!.xpEarned).toBe(xpReward * 1);
    });

    it('adds XP to progress.totalXp', () => {
      completeWithAccuracy(10, 10);
      const xpEarned = useCourseStore.getState().lessonResult!.xpEarned;
      expect(useCourseStore.getState().progress.totalXp).toBe(xpEarned);
    });

    it('marks first completion correctly', () => {
      completeWithAccuracy(10, 10);
      expect(useCourseStore.getState().lessonResult!.isFirstCompletion).toBe(true);
      expect(useCourseStore.getState().lessonResult!.isNewBest).toBe(true);

      useCourseStore.getState().dismissResult();
      completeWithAccuracy(5, 10);
      expect(useCourseStore.getState().lessonResult!.isFirstCompletion).toBe(false);
    });

    it('tracks best accuracy across attempts', () => {
      // First attempt: 100%
      completeWithAccuracy(10, 10);
      useCourseStore.getState().dismissResult();

      // Second attempt: 50% -- should not be new best
      completeWithAccuracy(5, 10);
      const result = useCourseStore.getState().lessonResult!;
      expect(result.isNewBest).toBe(false);

      const lessonId = useCourseStore.getState().courseData[0].lessons[0].id;
      expect(useCourseStore.getState().progress.completedLessons[lessonId].bestAccuracy).toBe(100);
    });

    it('merges answered and correct question IDs across attempts', () => {
      const courseData = useCourseStore.getState().courseData;
      const lessonId = courseData[0].lessons[0].id;

      // First attempt
      completeWithAccuracy(5, 10);
      const firstProgress = useCourseStore.getState().progress.completedLessons[lessonId];
      const firstAnswered = firstProgress.answeredQuestionIds.length;

      useCourseStore.getState().dismissResult();

      // Second attempt -- should merge IDs
      completeWithAccuracy(8, 10);
      const secondProgress = useCourseStore.getState().progress.completedLessons[lessonId];
      // With shuffleArray mocked to identity, both attempts use the same 10 questions
      // so mergedAnswered should be 10 (same questions)
      expect(secondProgress.answeredQuestionIds.length).toBeGreaterThanOrEqual(firstAnswered);
    });

    it('starts streak at 1 when no previous activity', () => {
      completeWithAccuracy(10, 10);
      expect(useCourseStore.getState().progress.currentStreak).toBe(1);
      expect(useCourseStore.getState().progress.longestStreak).toBe(1);
    });

    it('increments streak when last active was yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      useCourseStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 5,
          longestStreak: 5,
          lastActiveDate: yesterdayStr,
        },
      });

      completeWithAccuracy(10, 10);
      expect(useCourseStore.getState().progress.currentStreak).toBe(6);
      expect(useCourseStore.getState().progress.longestStreak).toBe(6);
    });

    it('keeps streak unchanged if already active today', () => {
      const today = new Date().toISOString().split('T')[0];

      useCourseStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 5,
          longestStreak: 10,
          lastActiveDate: today,
        },
      });

      completeWithAccuracy(10, 10);
      expect(useCourseStore.getState().progress.currentStreak).toBe(5);
    });

    it('resets streak to 1 if last active was more than 1 day ago', () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 3);
      const twoDaysAgoStr = twoDaysAgo.toISOString().split('T')[0];

      useCourseStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 10,
          longestStreak: 10,
          lastActiveDate: twoDaysAgoStr,
        },
      });

      completeWithAccuracy(10, 10);
      expect(useCourseStore.getState().progress.currentStreak).toBe(1);
      // longestStreak should remain 10
      expect(useCourseStore.getState().progress.longestStreak).toBe(10);
    });

    it('is a no-op when no active lesson', () => {
      useCourseStore.setState({ activeLesson: null });
      useCourseStore.getState().completeLesson();
      expect(useCourseStore.getState().lessonResult).toBeNull();
    });

    it('detects chapter completion when all lessons in unit are done', () => {
      const units = [makeFakeUnit('u0', 2, 15)];
      resetStore(units);

      // Complete lesson 0
      useCourseStore.getState().startLesson(0, 0);
      const ids0 = useCourseStore.getState().activeLesson!.sessionQuestionIds;
      ids0.forEach(id => useCourseStore.getState().submitAnswer(id, true));
      useCourseStore.getState().completeLesson();
      useCourseStore.getState().dismissResult();

      // Complete lesson 1 -- should trigger chapter completion
      useCourseStore.getState().startLesson(0, 1);
      const ids1 = useCourseStore.getState().activeLesson!.sessionQuestionIds;
      ids1.forEach(id => useCourseStore.getState().submitAnswer(id, true));
      useCourseStore.getState().completeLesson();

      expect(useCourseStore.getState().chapterJustCompleted).not.toBeNull();
      expect(useCourseStore.getState().chapterJustCompleted!.unitIndex).toBe(0);
    });

    it('detects course completion when all lessons across all units done', () => {
      // Small course: 1 unit, 1 lesson
      const units = [makeFakeUnit('u0', 1, 15)];
      resetStore(units);

      useCourseStore.getState().startLesson(0, 0);
      const ids = useCourseStore.getState().activeLesson!.sessionQuestionIds;
      ids.forEach(id => useCourseStore.getState().submitAnswer(id, true));
      useCourseStore.getState().completeLesson();

      expect(useCourseStore.getState().courseJustCompleted).toBe(true);
    });
  });

  describe('exitLesson', () => {
    it('clears activeLesson without saving progress', () => {
      useCourseStore.getState().startLesson(0, 0);
      const qId = useCourseStore.getState().activeLesson!.sessionQuestionIds[0];
      useCourseStore.getState().submitAnswer(qId, true);

      useCourseStore.getState().exitLesson();

      const state = useCourseStore.getState();
      expect(state.activeLesson).toBeNull();
      expect(state.progress.totalXp).toBe(0);
      expect(state.progress.completedLessons).toEqual({});
    });
  });

  describe('isLessonUnlocked', () => {
    it('first lesson (0,0) is always unlocked', () => {
      expect(useCourseStore.getState().isLessonUnlocked(0, 0)).toBe(true);
    });

    it('second lesson is locked when first is not completed', () => {
      expect(useCourseStore.getState().isLessonUnlocked(0, 1)).toBe(false);
    });

    it('second lesson unlocks when first is completed', () => {
      const firstLessonId = useCourseStore.getState().courseData[0].lessons[0].id;
      useCourseStore.setState({
        progress: {
          ...getDefaultProgress(),
          completedLessons: {
            [firstLessonId]: {
              stars: 1, bestAccuracy: 80, attempts: 1,
              lastAttempted: '2026-01-01', passed: true, golden: false,
              answeredQuestionIds: [], correctQuestionIds: [],
            },
          },
        },
      });

      expect(useCourseStore.getState().isLessonUnlocked(0, 1)).toBe(true);
    });

    it('first lesson of unit 1 requires last lesson of unit 0 completed', () => {
      expect(useCourseStore.getState().isLessonUnlocked(1, 0)).toBe(false);

      const lastLessonId = useCourseStore.getState().courseData[0].lessons[1].id;
      useCourseStore.setState({
        progress: {
          ...getDefaultProgress(),
          completedLessons: {
            [lastLessonId]: {
              stars: 1, bestAccuracy: 80, attempts: 1,
              lastAttempted: '2026-01-01', passed: true, golden: false,
              answeredQuestionIds: [], correctQuestionIds: [],
            },
          },
        },
      });

      expect(useCourseStore.getState().isLessonUnlocked(1, 0)).toBe(true);
    });
  });

  describe('dismiss actions', () => {
    it('dismissResult clears lessonResult', () => {
      useCourseStore.getState().startLesson(0, 0);
      const ids = useCourseStore.getState().activeLesson!.sessionQuestionIds;
      ids.forEach(id => useCourseStore.getState().submitAnswer(id, true));
      useCourseStore.getState().completeLesson();
      expect(useCourseStore.getState().lessonResult).not.toBeNull();

      useCourseStore.getState().dismissResult();
      expect(useCourseStore.getState().lessonResult).toBeNull();
    });

    it('dismissChapterCompletion clears chapterJustCompleted', () => {
      useCourseStore.setState({ chapterJustCompleted: { unitIndex: 0, isGolden: false } });
      useCourseStore.getState().dismissChapterCompletion();
      expect(useCourseStore.getState().chapterJustCompleted).toBeNull();
    });

    it('dismissCourseCompletion clears courseJustCompleted', () => {
      useCourseStore.setState({ courseJustCompleted: true });
      useCourseStore.getState().dismissCourseCompletion();
      expect(useCourseStore.getState().courseJustCompleted).toBe(false);
    });
  });

  describe('getCompletedCount / getTotalXp', () => {
    it('returns correct completed count', () => {
      expect(useCourseStore.getState().getCompletedCount()).toBe(0);

      useCourseStore.getState().startLesson(0, 0);
      const ids = useCourseStore.getState().activeLesson!.sessionQuestionIds;
      ids.forEach(id => useCourseStore.getState().submitAnswer(id, true));
      useCourseStore.getState().completeLesson();

      expect(useCourseStore.getState().getCompletedCount()).toBe(1);
    });

    it('returns correct total XP', () => {
      expect(useCourseStore.getState().getTotalXp()).toBe(0);

      useCourseStore.getState().startLesson(0, 0);
      const ids = useCourseStore.getState().activeLesson!.sessionQuestionIds;
      ids.forEach(id => useCourseStore.getState().submitAnswer(id, true));
      useCourseStore.getState().completeLesson();

      expect(useCourseStore.getState().getTotalXp()).toBeGreaterThan(0);
    });
  });
});
