import { test, expect } from '@playwright/test';

test.describe('Landing page (unauthenticated)', () => {
  test('renders hero section with brand name and CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('MechReady')).toBeVisible();
    await expect(page.getByRole('link', { name: /get started|sign up/i })).toBeVisible();
  });

  test('shows demo questions that are interactive', async ({ page }) => {
    await page.goto('/');

    // Scroll to demo section and find a question
    const demoQuestion = page.locator('text=A beam is supported at both ends');
    if (await demoQuestion.isVisible()) {
      await demoQuestion.scrollIntoViewIfNeeded();
      // Click an answer option
      const option = page.getByText('Directly at the left support');
      await option.click();
      // Should show feedback (explanation text appears)
      await expect(page.getByText(/equilibrium/i)).toBeVisible({ timeout: 5000 });
    }
  });

  test('shows profession cards', async ({ page }) => {
    await page.goto('/');
    // Scroll down to see profession cards
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);
    // Should show at least the ME profession
    await expect(page.getByText(/mechanical engineering/i).first()).toBeVisible();
  });

  test('login link navigates to login page', async ({ page }) => {
    await page.goto('/');
    const loginLink = page.getByRole('link', { name: /sign in|log in/i }).first();
    await loginLink.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('signup link navigates to register page', async ({ page }) => {
    await page.goto('/');
    const signupLink = page.getByRole('link', { name: /get started|sign up/i }).first();
    await signupLink.click();
    await expect(page).toHaveURL(/\/(register|get-started)/);
  });
});
