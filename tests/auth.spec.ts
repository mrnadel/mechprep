import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test('renders login form with email, password, and Google button', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
    await expect(page.locator('#login-email')).toBeVisible();
    await expect(page.locator('#login-password')).toBeVisible();
    await expect(page.getByRole('button', { name: /log in/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible();
  });

  test('shows validation on empty submit', async ({ page }) => {
    await page.goto('/login');
    const emailInput = page.locator('#login-email');
    // HTML5 required validation: try submitting empty
    await page.getByRole('button', { name: /log in/i }).click();
    // Browser should block submission (required field)
    await expect(emailInput).toBeVisible();
    // Should still be on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.locator('#login-email').fill('bad@example.com');
    await page.locator('#login-password').fill('wrongpassword');
    await page.getByRole('button', { name: /log in/i }).click();
    // Should show error alert
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
  });

  test('has link to register page', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: /sign up/i }).click();
    await expect(page).toHaveURL(/\/register/);
  });
});

test.describe('Register page', () => {
  test('renders registration form with name, email, password', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible();
    await expect(page.locator('#register-name')).toBeVisible();
    await expect(page.locator('#register-email')).toBeVisible();
    await expect(page.locator('#register-password')).toBeVisible();
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible();
  });

  test('shows password strength indicator', async ({ page }) => {
    await page.goto('/register');
    const passwordInput = page.locator('#register-password');

    // No indicator when empty
    await expect(page.getByText('8+ chars')).not.toBeVisible();

    // Type a weak password
    await passwordInput.fill('abc');
    await expect(page.getByText('8+ chars')).toBeVisible();

    // Type a strong password
    await passwordInput.fill('MyStr0ng!Pass');
    // All checks should be met (marked with checkmark)
    await expect(page.getByText(/8\+ chars/)).toBeVisible();
    await expect(page.getByText(/Uppercase/)).toBeVisible();
    await expect(page.getByText(/Number/)).toBeVisible();
    await expect(page.getByText(/Special char/)).toBeVisible();
  });

  test('submit button is disabled until password meets minimum length', async ({ page }) => {
    await page.goto('/register');
    await page.locator('#register-name').fill('Test User');
    await page.locator('#register-email').fill('test@example.com');
    await page.locator('#register-password').fill('short');

    const submitButton = page.getByRole('button', { name: /create account/i });
    await expect(submitButton).toBeDisabled();

    await page.locator('#register-password').fill('LongEnough1!');
    await expect(submitButton).toBeEnabled();
  });

  test('has link to login page', async ({ page }) => {
    await page.goto('/register');
    await page.getByRole('link', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/login/);
  });
});
