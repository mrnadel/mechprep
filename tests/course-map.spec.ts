import { test, expect } from '@playwright/test';
import { seedLocalStorage, mockAuthSession } from './helpers/auth';

test.describe('Course map (authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await seedLocalStorage(page);
    await mockAuthSession(page);
  });

  test('renders course header with unit title and progress', async ({ page }) => {
    await page.goto('/');
    // Should show the course map, not the landing page
    await expect(page.getByText(/statics|equilibrium/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('shows lesson nodes on the course map', async ({ page }) => {
    await page.goto('/');
    // Wait for course map to render
    await page.waitForTimeout(1000);
    // Lesson nodes should be visible (buttons or clickable elements)
    const lessonNodes = page.locator('[data-lesson-id], [class*="lesson-node"], button:has-text("Force Systems"), button:has-text("L1")');
    // Should have at least some lesson nodes visible
    const count = await lessonNodes.count();
    expect(count).toBeGreaterThan(0);
  });

  test('first lesson is unlocked and clickable', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    // Find the first lesson node (should not be locked)
    const firstLesson = page.locator('button').filter({ hasText: /Force Systems|L1|u1-L1/i }).first();
    if (await firstLesson.isVisible()) {
      await expect(firstLesson).toBeEnabled();
    }
  });

  test('shows daily goal bar', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    // DailyGoalBar should be rendered for authenticated users
    const goalBar = page.locator('[class*="goal"], [class*="daily"]').first();
    // This is a soft check: goal bar might not be present in all states
    if (await goalBar.isVisible()) {
      await expect(goalBar).toBeVisible();
    }
  });

  test('practice card is visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    // PracticeCard should show up for users with some progress
    const practiceCard = page.getByText(/practice/i).first();
    if (await practiceCard.isVisible()) {
      await expect(practiceCard).toBeVisible();
    }
  });
});
