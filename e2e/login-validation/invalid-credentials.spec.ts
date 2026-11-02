import { test, expect } from '@playwright/test';

test.describe('C360 sign-in and login validation', () => {
  test('Invalid credentials do not authenticate and show safe feedback', async ({ page }) => {
    // 1. Open the sign-in page in a fresh unauthenticated browser session.
    await page.goto('https://uat1.kb.mipc.css.cgipdc.cginet/coll/home');

    const userId = page.locator('#username');
    const password = page.getByRole('textbox', { name: 'Password' });

    // 2. Enter deliberately invalid credentials and select Sign In.
    await userId.fill('login-validation-test-user');
    await password.fill('NotARealPassword-Invalid-2026');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveTitle('Sign in to C360');
    await expect(page).toHaveURL(/\/auth\/realms\/C360\/login-actions\/authenticate/);
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
    await expect(userId).toHaveValue('login-validation-test-user');
    await expect(password).toBeEmpty();
    await expect(password).toHaveAttribute('type', 'password');
  });
});
