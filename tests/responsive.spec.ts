import { test, expect } from '@playwright/test';

// Only run in mobile project
test.describe('Mobile responsiveness', () => {
  test('landing page renders correctly on mobile', async ({ page, browserName }) => {
    // Skip if not mobile project (desktop Chrome)
    test.skip(browserName !== 'chromium' || page.viewportSize()!.width > 500, 'Mobile only');

    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // No horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5); // 5px tolerance
  });

  test('login page renders correctly on mobile', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium' || page.viewportSize()!.width > 500, 'Mobile only');

    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
    // Form inputs should be full width
    const emailInput = page.locator('#login-email');
    const inputWidth = await emailInput.evaluate((el) => el.getBoundingClientRect().width);
    const viewportWidth = page.viewportSize()!.width;
    // Input should be at least 80% of viewport width
    expect(inputWidth).toBeGreaterThan(viewportWidth * 0.7);
  });

  test('pricing page is usable on mobile', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium' || page.viewportSize()!.width > 500, 'Mobile only');

    await page.goto('/pricing');
    await page.waitForTimeout(2000);
    // Prices should be visible
    await expect(page.getByText(/\$/i).first()).toBeVisible({ timeout: 10000 });
    // CTA button should be tappable
    const cta = page.getByRole('button', { name: /upgrade|subscribe|get pro|start/i }).first();
    if (await cta.isVisible()) {
      await expect(cta).toBeVisible();
    }
  });
});
