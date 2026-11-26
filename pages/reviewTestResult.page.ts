import { Page, Locator, Response } from '@playwright/test';

const ERROR_SIGNATURES: RegExp[] = [
  /Exception trace/i,
  /\bTypeError\b/,
  /\bErrorException\b/,
  /\bParseError\b/,
  /\bArgumentCountError\b/,
  /Undefined (variable|array key|property|index)/i,
  /Call to (a member function|undefined)/i,
  /Attempt to read property/i,
  /must be of type/i,
  /Whoops!/i,
  /Server Error/i,
  /Illuminate\\/,
  /SQLSTATE\[/i,
  /View \[.*\] not found/i,
  /\bUNHANDLED\b/,
];

export class ReviewTestResultPage {
  readonly page: Page;
  readonly questionBoxes: Locator;
  readonly unattemptedLabels: Locator;
  readonly laravelErrorTitle: Locator;

  readonly jsErrors: string[] = [];
  readonly failedRequests: string[] = [];
  private lastResponse: Response | null = null;

  constructor(page: Page) {
    this.page = page;

    // Replace .rv-question-box with a selector that exists on a healthy review page
    this.questionBoxes = page.locator('.rv-question-box');
    this.unattemptedLabels = page.locator('.rv-unattempted');
    this.laravelErrorTitle = page.getByText('Exception trace');

    page.on('pageerror', (err) => this.jsErrors.push(err.message));
    page.on('response', (res) => {
      if (res.status() >= 500) this.failedRequests.push(`${res.status()} ${res.url()}`);
    });
  }

  async goto(token: string) {
    this.lastResponse = await this.page.goto(`/student/review-test-result/${token}`, {
      waitUntil: 'networkidle',
    });
  }

  get statusCode(): number | undefined {
    return this.lastResponse?.status();
  }

  async getBodyText(): Promise<string> {
    return this.page.locator('body').innerText();
  }

  /** Error patterns found on the page. Empty array = healthy page. */
  async getErrorSignaturesFound(): Promise<string[]> {
    const text = await this.getBodyText();
    return ERROR_SIGNATURES.filter((re) => re.test(text)).map(String);
  }

  async getErrorSnippet(length = 400): Promise<string> {
    return (await this.getBodyText()).slice(0, length);
  }

  async hasLaravelErrorPage(): Promise<boolean> {
    return this.laravelErrorTitle.isVisible();
  }

  screenshot() {
    return this.page.screenshot({ fullPage: true });
  }
}