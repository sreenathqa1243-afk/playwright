import { test, expect } from '@playwright/test';

test.describe('C360 sign-in and login validation', () => {
  test('Submitting a user ID without a password is rejected', async ({ page }) => {
    // 1. Open the sign-in page in a fresh unauthenticated browser session and verify both credential fields are empty.
    await page.goto('https://uat1.kb.mipc.css.cgipdc.cginet/coll/home');

    const userId = page.locator('#username');
    const password = page.getByRole('textbox', { name: 'Password' });
    await expect(userId).toBeEmpty();
    await expect(password).toBeEmpty();

    // 2. Enter the deliberately invalid, non-sensitive user ID, leave Password empty, and select Sign In.
    await userId.fill('login-validation-test-user');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveTitle('Sign in to C360');
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
    await expect(userId).toHaveAttribute('aria-invalid', 'true');
    await expect(password).toHaveAttribute('aria-invalid', 'true');
  });
});
