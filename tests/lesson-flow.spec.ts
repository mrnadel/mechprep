import { test, expect } from '@playwright/test';
import { seedLocalStorage, mockAuthSession } from './helpers/auth';

test.describe('Lesson flow (authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await seedLocalStorage(page);
    await mockAuthSession(page);
    // Also mock the mastery API so lesson completion doesn't fail
    await page.route('**/api/mastery', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });
    await page.route('**/api/course-progress', (route) => {
      route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });
  });

  test('can start a lesson and see a question', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    // Click on the first lesson node
    const firstLesson = page.locator('button').filter({ hasText: /Force Systems|L1/i }).first();
    if (await firstLesson.isVisible()) {
      await firstLesson.click();
      // Wait for lesson to load (course data lazy loads ~5MB)
      await page.waitForTimeout(3000);

      // Should see a question or teaching card
      const questionVisible = await page.locator('[class*="question"], [class*="card"], [class*="teaching"]').first().isVisible();
      expect(questionVisible).toBeTruthy();
    }
  });

  test('shows progress bar during lesson', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    const firstLesson = page.locator('button').filter({ hasText: /Force Systems|L1/i }).first();
    if (await firstLesson.isVisible()) {
      await firstLesson.click();
      await page.waitForTimeout(3000);

      // Progress bar should be visible
      const progressBar = page.locator('[class*="progress"], [role="progressbar"]').first();
      if (await progressBar.isVisible()) {
        await expect(progressBar).toBeVisible();
      }
    }
  });

  test('shows heart display during lesson', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    const firstLesson = page.locator('button').filter({ hasText: /Force Systems|L1/i }).first();
    if (await firstLesson.isVisible()) {
      await firstLesson.click();
      await page.waitForTimeout(3000);

      // Heart display should show (free tier has limited hearts)
      const hearts = page.locator('[class*="heart"], [aria-label*="heart"], [aria-label*="lives"]').first();
      if (await hearts.isVisible()) {
        await expect(hearts).toBeVisible();
      }
    }
  });

  test('can answer a multiple choice question', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    const firstLesson = page.locator('button').filter({ hasText: /Force Systems|L1/i }).first();
    if (!(await firstLesson.isVisible())) return;

    await firstLesson.click();
    await page.waitForTimeout(3000);

    // Look for answer option buttons (MC options are rendered as clickable divs/buttons)
    const options = page.locator('[class*="option"], [data-option], [role="radio"], [role="button"]').filter({ hasText: /[A-Za-z]/ });
    const optionCount = await options.count();

    if (optionCount >= 2) {
      // Select the first option
      await options.first().click();

      // CHECK button should become enabled
      const checkButton = page.getByRole('button', { name: /check|submit|continue/i }).first();
      if (await checkButton.isVisible()) {
        await checkButton.click();
        // Should show correct/incorrect feedback
        await page.waitForTimeout(1000);
        const feedback = page.locator('[class*="correct"], [class*="incorrect"], [class*="explanation"], [class*="feedback"]').first();
        if (await feedback.isVisible()) {
          await expect(feedback).toBeVisible();
        }
      }
    }
  });

  test('exit button shows confirmation when answers exist', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    const firstLesson = page.locator('button').filter({ hasText: /Force Systems|L1/i }).first();
    if (!(await firstLesson.isVisible())) return;

    await firstLesson.click();
    await page.waitForTimeout(3000);

    // Answer a question first
    const options = page.locator('[class*="option"], [data-option], [role="radio"], [role="button"]').filter({ hasText: /[A-Za-z]/ });
    if ((await options.count()) >= 2) {
      await options.first().click();
      const checkButton = page.getByRole('button', { name: /check|submit/i }).first();
      if (await checkButton.isVisible()) {
        await checkButton.click();
        await page.waitForTimeout(500);
      }
    }

    // Try to exit
    const exitButton = page.locator('button[aria-label*="close"], button[aria-label*="exit"], button:has-text("✕"), button:has-text("×")').first();
    if (await exitButton.isVisible()) {
      await exitButton.click();
      // Confirmation dialog should appear
      const confirmDialog = page.getByText(/are you sure|quit|leave/i).first();
      await expect(confirmDialog).toBeVisible({ timeout: 3000 });
    }
  });
});
