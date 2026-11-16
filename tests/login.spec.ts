import { test } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';

test('Dashboard Load', {tag:'@login'}, async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.verifyDashboardLoaded();
});

test.skip('View login automation', {tag:'@login'}, async ({page }) => {
  
  await page.goto(process.env.BASE_URL!);

  await page.getByRole('link', { name: 'Student Login' }).click();

  await page.getByPlaceholder('Enter Email ID').fill(process.env.LOGIN_EMAIL!);
  await page.getByPlaceholder('Enter Password').fill(process.env.LOGIN_PASS!);

  await page.getByRole('button', { name: 'Sign In' }).click();

  await Promise.race([
    page.locator('text=Logged in elsewhere').waitFor(),
    page.locator('text=Partners Admin Dashboard').waitFor(),
  ]);

  if (await page.locator('text=Logged in elsewhere').isVisible()) {
    console.log('Handling session conflict');

    await page.getByPlaceholder('Enter your password').fill(process.env.LOGIN_PASS!);
    await page.getByRole('button', { name: /Sign out other device/i }).click();

    await page.locator('text=Partners Admin Dashboard').waitFor();
  }

  console.log('New session stored');
})