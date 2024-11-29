import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Flatland Matrix/);
});

test('redirects to sign-in if user not logged in and tries to navigate to /dashboard', async ({
  page,
}) => {
  await page.goto('/dashboard');

  await expect(page).toHaveURL('/sign-in');
  await expect(page).toHaveTitle(/Sign In/);
});
