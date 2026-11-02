import { test, expect } from '@playwright/test';

test.describe('C360 sign-in and login validation', () => {
  test('Clear Login resets entered credentials and validation feedback', async ({ page }) => {
    // 1. Open the sign-in page in a fresh unauthenticated browser session and enter non-sensitive test credentials.
    await page.goto('https://uat1.kb.mipc.css.cgipdc.cginet/coll/home');

    const userId = page.locator('#username');
    const password = page.getByRole('textbox', { name: 'Password' });
    await userId.fill('login-validation-test-user');
    await password.fill('NotARealPassword-Invalid-2026');

    // 2. Select Sign In to trigger invalid-credential feedback, then select Clear Login.
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
    await page.getByRole('button', { name: 'Clear Login' }).click();

    await expect(page).toHaveTitle('Sign in to C360');
    await expect(userId).toBeEmpty();
    await expect(password).toBeEmpty();
    await expect(page.getByText('Invalid username or password.')).toBeHidden();
    await expect(userId).not.toHaveAttribute('aria-invalid', 'true');
    await expect(password).not.toHaveAttribute('aria-invalid', 'true');
  });
});
