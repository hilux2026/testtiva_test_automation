import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Welcome Back, Partner' });
  }

  async goto() {
    await this.page.goto('owner/dashboard');
  }

  async verifyDashboardLoaded() {
    await this.heading.waitFor();
  }
}