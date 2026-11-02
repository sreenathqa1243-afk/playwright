import { test, expect } from '@playwright/test';

test.describe('C360 sign-in and login validation', () => {
  test('SSO option starts the configured identity-provider flow', async ({ page }) => {
    // 1. Open the sign-in page in a fresh unauthenticated browser session and verify the SSO option.
    await page.goto('https://uat1.kb.mipc.css.cgipdc.cginet/coll/home');
    await expect(page.getByRole('link', { name: 'uat-cacsx-sso' })).toBeVisible();

    // 2. Select uat-cacsx-sso to start the configured identity-provider flow.
    await page.getByRole('link', { name: 'uat-cacsx-sso' }).click();

    await expect(page).toHaveURL(/loginpreview\.keybank\.com\/app\/keybanktest_creditstudiocacsxcsx_1\/.*\/sso\/saml/);
    await expect(page).toHaveTitle('keybanktest - Sign In');
    await expect(page.getByText('Invalid username or password.')).toHaveCount(0);
  });
});
