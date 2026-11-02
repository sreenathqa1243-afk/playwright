import { test, expect } from '@playwright/test';

test.describe('C360 sign-in and login validation', () => {
  test('Submitting blank credentials displays validation feedback', async ({ page }) => {
    // 1. Open the C360 UAT home URL in a fresh unauthenticated browser session.
    await page.goto('https://uat1.kb.mipc.css.cgipdc.cginet/coll/home');

    const userId = page.locator('#username');
    const password = page.getByLabel('Password');
    await expect(page).toHaveTitle('Sign in to C360');
    await expect(userId).toBeVisible();
    await expect(password).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear Login' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'uat-cacsx-sso' })).toBeVisible();

    // 2. Leave both credential fields empty and select Sign In.
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL(/\/auth\/realms\/C360\/login-actions\/authenticate/);
    await expect(userId).toHaveAttribute('aria-invalid', 'true');
    await expect(password).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
  });
});
