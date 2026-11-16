import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export default async function globalSetup() {
  const browser = await chromium.launch();

  const storageDir = path.join(process.cwd(), 'storage');
  const storageFile = path.join(storageDir, 'loginState.json');

  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  // Step 1: Check existing session
  if (fs.existsSync(storageFile)) {
    console.log('Checking existing session...');

    const context = await browser.newContext({
      storageState: storageFile,
    });
    const page = await context.newPage();

    await page.goto(`${process.env.BASE_URL!}owner/dashboard`);

    // Step 2: Verify session
    const isLoggedIn = await page
      .locator('text=Welcome Back, Partner')
      .isVisible()
      .catch(() => false);

    if (isLoggedIn) {
      console.log('Session is still valid, skipping login');
      await browser.close();
      return;
    }

    console.log('Session expired, performing login...');
  }

  //Step 3: Perform login
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.BASE_URL!);

  // await page.getByRole('link', { name: 'Student Login' }).click();

  await page.getByPlaceholder('Enter Email ID').fill(process.env.LOGIN_EMAIL!);
  await page.getByPlaceholder('Enter Password').fill(process.env.LOGIN_PASS!);

  await page.getByRole('button', { name: 'Sign In' }).click();

  await Promise.race([
    page.locator('text=Logged in elsewhere').waitFor(),
    page.locator('text=Welcome Back, Partner').waitFor(),
  ]);

  if (await page.locator('text=Logged in elsewhere').isVisible()) {
    console.log('Handling session conflict');

    await page.getByPlaceholder('Enter your password').fill(process.env.LOGIN_PASS!);
    await page.getByRole('button', { name: /Sign out other device/i }).click();

    await page.locator('text=Welcome Back, Partner').waitFor();
  }

  await page.waitForLoadState('networkidle');

  await context.storageState({ path: storageFile });

  console.log('New session stored');

  await browser.close();
}