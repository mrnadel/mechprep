import { type Page } from '@playwright/test';

/**
 * Seed localStorage with Zustand store defaults so the app behaves
 * as if a user has already authenticated + completed onboarding.
 *
 * This bypasses NextAuth (which needs a real DB) and lets us test
 * client-side flows that depend on store state.
 */
export async function seedLocalStorage(page: Page, overrides: Record<string, unknown> = {}) {
  await page.addInitScript((data) => {
    // Course store: set active profession + mark intro done
    const courseStore = {
      state: {
        activeProfession: 'mechanical-engineering',
        progress: {
          completedLessons: {},
          unitProgress: {},
          courseIntros: { 'mechanical-engineering': true },
          currentUnit: 0,
        },
        activeLesson: null,
        lessonResult: null,
        courseData: null,
        activePlacementTest: null,
        placementTestResult: null,
        chapterJustCompleted: null,
        courseJustCompleted: false,
        pendingCelebrations: [],
      },
      version: 0,
    };

    // Engagement store: basic defaults
    const engagementStore = {
      state: {
        streak: {
          current: 1,
          longest: 1,
          lastPracticeDate: new Date().toISOString().slice(0, 10),
          freezesAvailable: 1,
          freezesUsedThisWeek: 0,
          milestonesReached: [],
        },
        xp: { total: 0, todayXp: 0, todayDate: new Date().toISOString().slice(0, 10) },
        league: { tier: 'bronze', weekXp: 0, weekStart: '', competitors: [], justPromoted: false, justDemoted: false, justWon: false },
        quests: { daily: [], weekly: [], lastDailyRefresh: '', lastWeeklyRefresh: '' },
        gems: 50,
        achievements: [],
        titles: ['Beginner'],
        frames: ['default'],
        activeTitle: 'Beginner',
        activeFrame: 'default',
        level: 1,
        pendingLevelUp: null,
        doubleXp: null,
        welcomeBackShown: null,
      },
      version: 0,
    };

    localStorage.setItem('mechready-course-store', JSON.stringify(courseStore));
    localStorage.setItem('mechready-engagement', JSON.stringify(engagementStore));

    // Apply any overrides
    for (const [key, value] of Object.entries(data)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, overrides);
}

/**
 * Mock NextAuth session by intercepting the session API call.
 * This avoids needing a real database for E2E tests.
 */
export async function mockAuthSession(page: Page, user = {
  name: 'Test User',
  email: 'test@example.com',
  image: null,
}) {
  await page.route('**/api/auth/session', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user,
        expires: new Date(Date.now() + 86400_000).toISOString(),
      }),
    });
  });
}
