import { test, expect } from '@playwright/test';

test.describe('C360 sign-in and login validation', () => {
  test('Valid UAT credentials sign in successfully', async ({ page }) => {
    const userIdValue = process.env.C360_UAT_USER_ID;
    const passwordValue = process.env.C360_UAT_PASSWORD;
    if (!userIdValue || !passwordValue) {
      test.skip(true, 'Set approved UAT credentials in C360_UAT_USER_ID and C360_UAT_PASSWORD.');
      return;
    }

    // 1. Open a fresh unauthenticated session and enter approved active UAT credentials.
    await page.goto('https://uat1.kb.mipc.css.cgipdc.cginet/coll/home');

    const userId = page.locator('#username');
    const password = page.getByRole('textbox', { name: 'Password' });
    await expect(password).toHaveAttribute('type', 'password');
    await expect(page.getByText('Invalid username or password.')).toHaveCount(0);
    await userId.fill(userIdValue);
    await password.fill(passwordValue);

    // 2. Select Sign In and verify the authenticated destination.
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/\/coll\/home(?:$|[?#])/);
    await expect(page).toHaveTitle('CACS Collection UI');
    await expect(page.getByText('Invalid username or password.')).toHaveCount(0);
  });
});
