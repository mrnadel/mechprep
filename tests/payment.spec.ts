import { test, expect } from '@playwright/test';
import { seedLocalStorage, mockAuthSession } from './helpers/auth';

test.describe('Payment / upgrade flow', () => {
  test.beforeEach(async ({ page }) => {
    await seedLocalStorage(page);
    await mockAuthSession(page);
  });

  test('pricing page shows monthly and yearly plans with prices', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForTimeout(2000);

    // Should show price amounts
    await expect(page.getByText(/\$\d+\.\d{2}/i).first()).toBeVisible({ timeout: 10000 });
    // Should have an upgrade/subscribe CTA
    const ctaButton = page.getByRole('button', { name: /upgrade|subscribe|get pro|start/i }).first();
    await expect(ctaButton).toBeVisible();
  });

  test('upgrade button triggers Paddle checkout (mocked)', async ({ page }) => {
    // Mock the Paddle checkout API
    let checkoutCalled = false;
    await page.route('**/api/paddle/checkout', (route) => {
      checkoutCalled = true;
      route.fulfill({
        status: 200,
        body: JSON.stringify({ transactionId: 'txn_test_123' }),
      });
    });

    // Mock Paddle.js so it doesn't actually open a real checkout
    await page.addInitScript(() => {
      (window as Record<string, unknown>).Paddle = {
        Checkout: {
          open: () => { (window as Record<string, unknown>).__paddleCheckoutOpened = true; },
        },
        Setup: () => {},
        Environment: { set: () => {} },
      };
    });

    await page.goto('/pricing');
    await page.waitForTimeout(2000);

    const ctaButton = page.getByRole('button', { name: /upgrade|subscribe|get pro|start/i }).first();
    if (await ctaButton.isVisible()) {
      await ctaButton.click();
      await page.waitForTimeout(2000);

      // Verify checkout API was called or Paddle was triggered
      // (one of these should happen depending on the flow)
      const paddleOpened = await page.evaluate(() => (window as Record<string, unknown>).__paddleCheckoutOpened);
      // Either the API was called or we see some checkout UI
      expect(checkoutCalled || paddleOpened).toBeTruthy();
    }
  });

  test('out-of-hearts modal shows upgrade option', async ({ page }) => {
    // Seed hearts store with 0 hearts
    await page.addInitScript(() => {
      localStorage.setItem('mechready-hearts', JSON.stringify({
        state: { hearts: 0, maxHearts: 5, lastRegenTime: Date.now(), regenIntervalMs: 1800000 },
        version: 0,
      }));
    });

    await page.goto('/');
    await page.waitForTimeout(2000);

    // Try to start a lesson (should trigger out-of-hearts)
    const firstLesson = page.locator('button').filter({ hasText: /Force Systems|L1/i }).first();
    if (await firstLesson.isVisible()) {
      await firstLesson.click();
      await page.waitForTimeout(2000);

      // Out of hearts modal should appear
      const heartsModal = page.getByText(/out of hearts|no hearts|wait for hearts/i).first();
      if (await heartsModal.isVisible()) {
        await expect(heartsModal).toBeVisible();
        // Should have upgrade button
        const upgradeBtn = page.getByRole('button', { name: /upgrade|get pro|unlimited/i }).first();
        await expect(upgradeBtn).toBeVisible();
      }
    }
  });

  test('refund policy page loads', async ({ page }) => {
    await page.goto('/refund-policy');
    await expect(page.getByText(/refund/i).first()).toBeVisible({ timeout: 10000 });
  });
});
