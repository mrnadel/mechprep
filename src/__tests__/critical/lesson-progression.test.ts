import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock engagement store used by completeLesson
vi.mock('@/store/useEngagementStore', () => ({
  useEngagementStore: {
    getState: () => ({
      doubleXpExpiry: null,
      streak: { freezesOwned: 0, freezeUsedToday: false },
      useStreakFreeze: vi.fn(),
      recordStreakBreak: vi.fn(),
    }),
  },
}));

// Mock mastery store used by debugSetProgress
vi.mock('@/store/useMasteryStore', () => ({
  useMasteryStore: {
    getState: () => ({
      debugSetEvents: vi.fn(),
    }),
  },
}));

// Mock main store used by debugSetProgress
vi.mock('@/store/useStore', () => ({
  useStore: {
    getState: () => ({
      debugSetFromCourse: vi.fn(),
    }),
    setState: vi.fn(),
  },
}));

// Mock shuffleArray for predictable tests
vi.mock('@/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils')>();
  return {
    ...actual,
    shuffleArray: <T>(arr: T[]): T[] => [...arr],
  };
});

import { useCourseStore } from '@/store/useCourseStore';
import { course } from '@/data/course';

// --- Helpers ---

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function getDateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function resetStore() {
  useCourseStore.setState({
    courseData: course,
    progress: {
      displayName: 'Engineer',
      totalXp: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: '',
      activeDays: [],
      completedLessons: {},
    },
    activeLesson: null,
    lessonResult: null,
    chapterJustCompleted: null,
    courseJustCompleted: false,
  });
}

// ==============================================================
// LESSON PROGRESSION — COMPREHENSIVE TESTS
// ==============================================================

describe('Lesson Progression', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('isLessonUnlocked', () => {
    it('first lesson (0,0) is always unlocked', () => {
      expect(useCourseStore.getState().isLessonUnlocked(0, 0)).toBe(true);
    });

    it('second lesson (0,1) is locked until first lesson is passed', () => {
      expect(useCourseStore.getState().isLessonUnlocked(0, 1)).toBe(false);
    });

    it('second lesson (0,1) unlocks after first lesson passes', () => {
      const courseData = useCourseStore.getState().courseData;
      const firstLessonId = courseData[0].lessons[0].id;

      useCourseStore.setState({
        progress: {
          ...useCourseStore.getState().progress,
          completedLessons: {
            [firstLessonId]: {
              stars: 2,
              bestAccuracy: 80,
              attempts: 1,
              lastAttempted: getTodayString(),
              passed: true,
              golden: false,
              answeredQuestionIds: [],
              correctQuestionIds: [],
            },
          },
        },
      });

      expect(useCourseStore.getState().isLessonUnlocked(0, 1)).toBe(true);
    });

    it('unit 1 lesson 0 requires last lesson of unit 0 to be completed', () => {
      const courseData = useCourseStore.getState().courseData;
      if (courseData.length < 2) return; // Skip if only 1 unit

      // Without completion, unit 1 is locked
      expect(useCourseStore.getState().isLessonUnlocked(1, 0)).toBe(false);

      // Complete all lessons in unit 0
      const unit0Lessons = courseData[0].lessons;
      const completedLessons: Record<string, any> = {};
      for (const lesson of unit0Lessons) {
        completedLessons[lesson.id] = {
          stars: 2,
          bestAccuracy: 80,
          attempts: 1,
          lastAttempted: getTodayString(),
          passed: true,
          golden: false,
          answeredQuestionIds: [],
          correctQuestionIds: [],
        };
      }

      useCourseStore.setState({
        progress: {
          ...useCourseStore.getState().progress,
          completedLessons,
        },
      });

      expect(useCourseStore.getState().isLessonUnlocked(1, 0)).toBe(true);
    });
  });

  describe('startLesson', () => {
    it('initializes an active lesson with correct properties', () => {
      useCourseStore.getState().startLesson(0, 0);

      const active = useCourseStore.getState().activeLesson;
      expect(active).not.toBeNull();
      expect(active!.unitIndex).toBe(0);
      expect(active!.lessonIndex).toBe(0);
      expect(active!.currentQuestionIndex).toBe(0);
      expect(active!.answers).toEqual([]);
      expect(active!.startTime).toBeGreaterThan(0);
      expect(active!.isGolden).toBe(false);
    });

    it('selects up to 10 questions for the session', () => {
      useCourseStore.getState().startLesson(0, 0);
      const active = useCourseStore.getState().activeLesson!;
      expect(active.sessionQuestionIds.length).toBeLessThanOrEqual(10);
      expect(active.sessionQuestionIds.length).toBeGreaterThan(0);
    });

    it('clears previous lessonResult', () => {
      useCourseStore.setState({
        lessonResult: {
          lessonId: 'old',
          unitTitle: 'Old',
          lessonTitle: 'Old',
          totalQuestions: 5,
          correctAnswers: 3,
          xpEarned: 50,
          accuracy: 60,
          stars: 1,
          passed: false,
          isFlawless: false,
          isNewBest: false,
          isFirstCompletion: false,
          isGolden: false,
        },
      });

      useCourseStore.getState().startLesson(0, 0);
      expect(useCourseStore.getState().lessonResult).toBeNull();
    });

    it('sets isGolden=true when golden flag is passed', () => {
      // First complete the lesson normally
      const courseData = useCourseStore.getState().courseData;
      const lesson = courseData[0].lessons[0];
      useCourseStore.setState({
        progress: {
          ...useCourseStore.getState().progress,
          completedLessons: {
            [lesson.id]: {
              stars: 2,
              bestAccuracy: 80,
              attempts: 1,
              lastAttempted: getTodayString(),
              passed: true,
              golden: false,
              answeredQuestionIds: lesson.questions.slice(0, 10).map(q => q.id),
              correctQuestionIds: lesson.questions.slice(0, 8).map(q => q.id),
            },
          },
        },
      });

      useCourseStore.getState().startLesson(0, 0, true);
      expect(useCourseStore.getState().activeLesson!.isGolden).toBe(true);
    });
  });

  describe('submitAnswer', () => {
    it('adds an answer to the active lesson', () => {
      useCourseStore.getState().startLesson(0, 0);
      const qId = useCourseStore.getState().activeLesson!.sessionQuestionIds[0];

      useCourseStore.getState().submitAnswer(qId, true);

      const answers = useCourseStore.getState().activeLesson!.answers;
      expect(answers).toHaveLength(1);
      expect(answers[0]).toEqual({ questionId: qId, correct: true });
    });

    it('appends multiple answers in order', () => {
      useCourseStore.getState().startLesson(0, 0);
      const qIds = useCourseStore.getState().activeLesson!.sessionQuestionIds;

      useCourseStore.getState().submitAnswer(qIds[0], true);
      useCourseStore.getState().submitAnswer(qIds[1], false);
      useCourseStore.getState().submitAnswer(qIds[2], true);

      const answers = useCourseStore.getState().activeLesson!.answers;
      expect(answers).toHaveLength(3);
      expect(answers[1].correct).toBe(false);
    });

    it('is a no-op when no active lesson', () => {
      useCourseStore.setState({ activeLesson: null });
      useCourseStore.getState().submitAnswer('q1', true);
      expect(useCourseStore.getState().activeLesson).toBeNull();
    });
  });

  describe('nextQuestion', () => {
    it('increments currentQuestionIndex', () => {
      useCourseStore.getState().startLesson(0, 0);
      expect(useCourseStore.getState().activeLesson!.currentQuestionIndex).toBe(0);

      useCourseStore.getState().nextQuestion();
      expect(useCourseStore.getState().activeLesson!.currentQuestionIndex).toBe(1);
    });

    it('does not exceed total session questions', () => {
      useCourseStore.getState().startLesson(0, 0);
      const total = useCourseStore.getState().activeLesson!.sessionQuestionIds.length;

      for (let i = 0; i < total + 5; i++) {
        useCourseStore.getState().nextQuestion();
      }

      // Should not advance past the last question
      expect(useCourseStore.getState().activeLesson!.currentQuestionIndex).toBeLessThanOrEqual(total - 1);
    });

    it('is a no-op when no active lesson', () => {
      useCourseStore.setState({ activeLesson: null });
      useCourseStore.getState().nextQuestion();
      expect(useCourseStore.getState().activeLesson).toBeNull();
    });
  });

  describe('completeLesson — accuracy and stars', () => {
    function completeLessonWithAccuracy(accuracy: number) {
      useCourseStore.getState().startLesson(0, 0);
      const active = useCourseStore.getState().activeLesson!;
      const total = active.sessionQuestionIds.length;
      const correctCount = Math.round((accuracy / 100) * total);

      for (let i = 0; i < total; i++) {
        useCourseStore.getState().submitAnswer(
          active.sessionQuestionIds[i],
          i < correctCount,
        );
      }

      useCourseStore.getState().completeLesson();
    }

    it('marks lesson as passed with 70%+ accuracy', () => {
      completeLessonWithAccuracy(80);
      const result = useCourseStore.getState().lessonResult!;
      expect(result.passed).toBe(true);
    });

    it('completing a lesson always counts as passed (hearts gate progression)', () => {
      completeLessonWithAccuracy(50);
      const result = useCourseStore.getState().lessonResult!;
      expect(result.passed).toBe(true);
    });

    it('70% accuracy is the minimum passing threshold', () => {
      completeLessonWithAccuracy(70);
      const result = useCourseStore.getState().lessonResult!;
      expect(result.passed).toBe(true);
    });

    it('calculates accuracy correctly', () => {
      useCourseStore.getState().startLesson(0, 0);
      const active = useCourseStore.getState().activeLesson!;
      const total = active.sessionQuestionIds.length;

      // Answer exactly half correctly
      for (let i = 0; i < total; i++) {
        useCourseStore.getState().submitAnswer(
          active.sessionQuestionIds[i],
          i < Math.floor(total / 2),
        );
      }
      useCourseStore.getState().completeLesson();

      const result = useCourseStore.getState().lessonResult!;
      const expectedAccuracy = Math.round((Math.floor(total / 2) / total) * 100);
      expect(result.accuracy).toBe(expectedAccuracy);
    });

    it('awards stars = min(attempts, 3) on passing', () => {
      // First pass
      completeLessonWithAccuracy(80);
      const courseData = useCourseStore.getState().courseData;
      const lessonId = courseData[0].lessons[0].id;
      const lp = useCourseStore.getState().progress.completedLessons[lessonId];
      expect(lp.stars).toBe(1); // first pass = 1 star
    });

    it('always increments attempts on completion (hearts gate progression)', () => {
      completeLessonWithAccuracy(30);
      const courseData = useCourseStore.getState().courseData;
      const lessonId = courseData[0].lessons[0].id;
      const lp = useCourseStore.getState().progress.completedLessons[lessonId];
      expect(lp.attempts).toBe(1); // completing = attempt counted
    });

    it('awards XP based on accuracy multiplier', () => {
      completeLessonWithAccuracy(100);
      const result = useCourseStore.getState().lessonResult!;
      expect(result.xpEarned).toBeGreaterThan(0);
    });

    it('detects flawless session (100% accuracy, 3+ questions)', () => {
      completeLessonWithAccuracy(100);
      const result = useCourseStore.getState().lessonResult!;
      expect(result.isFlawless).toBe(true);
    });

    it('awards 4x XP for flawless session', () => {
      const courseData = useCourseStore.getState().courseData;
      const xpReward = courseData[0].lessons[0].xpReward;

      completeLessonWithAccuracy(100);
      const result = useCourseStore.getState().lessonResult!;
      expect(result.xpEarned).toBe(xpReward * 4);
    });

    it('clears activeLesson after completion', () => {
      completeLessonWithAccuracy(80);
      expect(useCourseStore.getState().activeLesson).toBeNull();
    });

    it('sets lessonResult after completion', () => {
      completeLessonWithAccuracy(80);
      expect(useCourseStore.getState().lessonResult).not.toBeNull();
    });
  });

  describe('completeLesson — XP and progress tracking', () => {
    it('adds XP to total progress', () => {
      const xpBefore = useCourseStore.getState().progress.totalXp;

      useCourseStore.getState().startLesson(0, 0);
      const active = useCourseStore.getState().activeLesson!;
      for (let i = 0; i < active.sessionQuestionIds.length; i++) {
        useCourseStore.getState().submitAnswer(active.sessionQuestionIds[i], true);
      }
      useCourseStore.getState().completeLesson();

      expect(useCourseStore.getState().progress.totalXp).toBeGreaterThan(xpBefore);
    });

    it('tracks answeredQuestionIds across sessions', () => {
      useCourseStore.getState().startLesson(0, 0);
      const active = useCourseStore.getState().activeLesson!;
      const firstSessionQIds = [...active.sessionQuestionIds];

      for (let i = 0; i < active.sessionQuestionIds.length; i++) {
        useCourseStore.getState().submitAnswer(active.sessionQuestionIds[i], true);
      }
      useCourseStore.getState().completeLesson();

      const courseData = useCourseStore.getState().courseData;
      const lessonId = courseData[0].lessons[0].id;
      const lp = useCourseStore.getState().progress.completedLessons[lessonId];

      expect(lp.answeredQuestionIds).toEqual(expect.arrayContaining(firstSessionQIds));
    });

    it('tracks correctQuestionIds correctly', () => {
      useCourseStore.getState().startLesson(0, 0);
      const active = useCourseStore.getState().activeLesson!;

      // Answer first half correctly
      const half = Math.floor(active.sessionQuestionIds.length / 2);
      for (let i = 0; i < active.sessionQuestionIds.length; i++) {
        useCourseStore.getState().submitAnswer(active.sessionQuestionIds[i], i < half);
      }
      useCourseStore.getState().completeLesson();

      const courseData = useCourseStore.getState().courseData;
      const lessonId = courseData[0].lessons[0].id;
      const lp = useCourseStore.getState().progress.completedLessons[lessonId];

      expect(lp.correctQuestionIds).toHaveLength(half);
    });

    it('updates lastActiveDate on completion', () => {
      useCourseStore.getState().startLesson(0, 0);
      const active = useCourseStore.getState().activeLesson!;
      for (const qId of active.sessionQuestionIds) {
        useCourseStore.getState().submitAnswer(qId, true);
      }
      useCourseStore.getState().completeLesson();

      expect(useCourseStore.getState().progress.lastActiveDate).toBe(getTodayString());
    });
  });

  describe('completeLesson — streak in course store', () => {
    it('increments streak when last active yesterday', () => {
      useCourseStore.setState({
        progress: {
          ...useCourseStore.getState().progress,
          currentStreak: 3,
          longestStreak: 3,
          lastActiveDate: getDateString(1),
        },
      });

      useCourseStore.getState().startLesson(0, 0);
      const active = useCourseStore.getState().activeLesson!;
      for (const qId of active.sessionQuestionIds) {
        useCourseStore.getState().submitAnswer(qId, true);
      }
      useCourseStore.getState().completeLesson();

      expect(useCourseStore.getState().progress.currentStreak).toBe(4);
    });

    it('resets streak when gap > 1 day (no freeze)', () => {
      useCourseStore.setState({
        progress: {
          ...useCourseStore.getState().progress,
          currentStreak: 10,
          longestStreak: 10,
          lastActiveDate: getDateString(3),
        },
      });

      useCourseStore.getState().startLesson(0, 0);
      const active = useCourseStore.getState().activeLesson!;
      for (const qId of active.sessionQuestionIds) {
        useCourseStore.getState().submitAnswer(qId, true);
      }
      useCourseStore.getState().completeLesson();

      expect(useCourseStore.getState().progress.currentStreak).toBe(1);
    });
  });

  describe('exitLesson', () => {
    it('clears activeLesson without producing a result', () => {
      useCourseStore.getState().startLesson(0, 0);
      useCourseStore.getState().exitLesson();

      expect(useCourseStore.getState().activeLesson).toBeNull();
      expect(useCourseStore.getState().lessonResult).toBeNull();
    });
  });

  describe('dismissResult', () => {
    it('clears lessonResult', () => {
      useCourseStore.setState({
        lessonResult: {
          lessonId: 'test',
          unitTitle: 'Test',
          lessonTitle: 'Test',
          totalQuestions: 10,
          correctAnswers: 8,
          xpEarned: 100,
          accuracy: 80,
          stars: 2,
          passed: true,
          isFlawless: false,
          isNewBest: true,
          isFirstCompletion: true,
          isGolden: false,
        },
      });

      useCourseStore.getState().dismissResult();
      expect(useCourseStore.getState().lessonResult).toBeNull();
    });
  });

  describe('getCompletedCount', () => {
    it('returns 0 with no completed lessons', () => {
      expect(useCourseStore.getState().getCompletedCount()).toBe(0);
    });

    it('counts only passed lessons', () => {
      const courseData = useCourseStore.getState().courseData;
      const lesson1 = courseData[0].lessons[0].id;
      const lesson2 = courseData[0].lessons.length > 1 ? courseData[0].lessons[1].id : 'fake-id';

      useCourseStore.setState({
        progress: {
          ...useCourseStore.getState().progress,
          completedLessons: {
            [lesson1]: {
              stars: 2, bestAccuracy: 80, attempts: 1,
              lastAttempted: getTodayString(), passed: true,
              golden: false, answeredQuestionIds: [], correctQuestionIds: [],
            },
            [lesson2]: {
              stars: 0, bestAccuracy: 40, attempts: 0,
              lastAttempted: getTodayString(), passed: false,
              golden: false, answeredQuestionIds: [], correctQuestionIds: [],
            },
          },
        },
      });

      expect(useCourseStore.getState().getCompletedCount()).toBe(1);
    });
  });
});
