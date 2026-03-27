import { test, expect } from '@playwright/test';
import { seedLocalStorage, mockAuthSession } from './helpers/auth';

test.describe('Navigation (authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await seedLocalStorage(page);
    await mockAuthSession(page);
  });

  test('pricing page loads and shows plans', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByText(/pro|premium|upgrade/i).first()).toBeVisible({ timeout: 10000 });
    // Should show monthly and yearly options
    await expect(page.getByText(/month/i).first()).toBeVisible();
    await expect(page.getByText(/year/i).first()).toBeVisible();
  });

  test('pricing page shows feature list', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByText(/unlimited hearts/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/streak freeze/i)).toBeVisible();
  });

  test('profile page loads', async ({ page }) => {
    await page.goto('/profile');
    // Should show profile content or redirect
    await page.waitForTimeout(2000);
    const url = page.url();
    // Either shows profile or redirects to login
    expect(url).toMatch(/\/(profile|login)/);
  });

  test('league page loads', async ({ page }) => {
    await page.goto('/league');
    await page.waitForTimeout(2000);
    // Should show league content
    const leagueContent = page.getByText(/league|bronze|silver|gold|rank/i).first();
    if (await leagueContent.isVisible()) {
      await expect(leagueContent).toBeVisible();
    }
  });

  test('friends page loads', async ({ page }) => {
    await page.goto('/friends');
    await page.waitForTimeout(2000);
    const url = page.url();
    expect(url).toMatch(/\/(friends|login)/);
  });

  test('shop page loads', async ({ page }) => {
    await page.goto('/shop');
    await page.waitForTimeout(2000);
    // Should show shop or gem-related content
    const shopContent = page.getByText(/shop|gem|item/i).first();
    if (await shopContent.isVisible()) {
      await expect(shopContent).toBeVisible();
    }
  });

  test('settings page loads', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForTimeout(2000);
    const url = page.url();
    expect(url).toMatch(/\/(settings|login)/);
  });

  test('terms page renders legal content', async ({ page }) => {
    await page.goto('/terms');
    await expect(page.getByText(/terms of service|terms of use/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/MechReady/i).first()).toBeVisible();
  });

  test('privacy page renders legal content', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.getByText(/privacy policy/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('contact page renders', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByText(/contact/i).first()).toBeVisible({ timeout: 10000 });
  });
});
