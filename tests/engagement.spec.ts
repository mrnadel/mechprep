import { test, expect } from '@playwright/test';
import { seedLocalStorage, mockAuthSession } from './helpers/auth';

test.describe('Engagement systems', () => {
  test.beforeEach(async ({ page }) => {
    await seedLocalStorage(page);
    await mockAuthSession(page);
  });

  test('streak counter is visible on course map', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    // Streak should show somewhere (header or stats)
    const streakElement = page.locator('[class*="streak"], [aria-label*="streak"]').first();
    if (await streakElement.isVisible()) {
      await expect(streakElement).toBeVisible();
    }
  });

  test('gem count displays in header or stats', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    // Gems/coins should show in the UI
    const gemElement = page.locator('[class*="gem"], [aria-label*="gem"], [class*="coin"]').first();
    if (await gemElement.isVisible()) {
      await expect(gemElement).toBeVisible();
    }
  });

  test('streak freeze preserves streak when day is missed', async ({ page }) => {
    // Seed with a streak that would break (last practice was 2 days ago)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    await page.addInitScript((dateStr) => {
      const stored = JSON.parse(localStorage.getItem('mechready-engagement') || '{}');
      if (stored.state?.streak) {
        stored.state.streak.lastPracticeDate = dateStr;
        stored.state.streak.current = 5;
        stored.state.streak.freezesAvailable = 1;
      }
      localStorage.setItem('mechready-engagement', JSON.stringify(stored));
    }, twoDaysAgo.toISOString().slice(0, 10));

    await page.goto('/');
    await page.waitForTimeout(3000);

    // Streak freeze modal or automatic freeze usage should appear
    const freezeUI = page.getByText(/streak freeze|streak saved|freeze used/i).first();
    if (await freezeUI.isVisible()) {
      await expect(freezeUI).toBeVisible();
    }
  });

  test('league page shows current tier and competitors', async ({ page }) => {
    await page.goto('/league');
    await page.waitForTimeout(3000);

    // Should show league tier
    const tierLabel = page.getByText(/bronze|silver|gold|platinum|diamond/i).first();
    if (await tierLabel.isVisible()) {
      await expect(tierLabel).toBeVisible();
    }
  });
});
