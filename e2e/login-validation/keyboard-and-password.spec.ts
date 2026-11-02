import { test, expect } from '@playwright/test';

test.describe('C360 sign-in and login validation', () => {
  test('Login fields support keyboard use and mask password entry', async ({ page }) => {
    // 1. Open the sign-in page and verify the credential controls are available.
    await page.goto('https://uat1.kb.mipc.css.cgipdc.cginet/coll/home');

    const userId = page.locator('#username');
    const password = page.getByRole('textbox', { name: 'Password' });
    await expect(userId).toBeVisible();
    await expect(password).toBeVisible();

    // 2. Use keyboard focus to move from User ID to Password and enter invalid test credentials.
    await userId.fill('login-validation-test-user');
    await page.keyboard.press('Tab');
    await expect(password).toBeFocused();
    await password.fill('NotARealPassword-Invalid-2026');
    await expect(password).toHaveAttribute('type', 'password');

    // 3. Press Enter in Password to submit the form once.
    await page.keyboard.press('Enter');

    await expect(page).toHaveTitle('Sign in to C360');
    await expect(page).toHaveURL(/\/auth\/realms\/C360\/login-actions\/authenticate/);
    await expect(page.getByText('Invalid username or password.')).toBeVisible();
    await expect(password).toBeEmpty();
  });
});
