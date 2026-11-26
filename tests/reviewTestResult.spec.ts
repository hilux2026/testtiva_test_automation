import { test } from '@playwright/test';
import { ReviewTestResultPage } from '../pages/reviewTestResult.page';

const REVIEW_TOKENS = ['6Pwlbq'];

test.describe('Review test result page', () => {
  for (const token of REVIEW_TOKENS) {
    test(`check review token ${token}`, async ({ page }, testInfo) => {
      const reviewPage = new ReviewTestResultPage(page);

      await reviewPage.goto(token);

      const problems: string[] = [];

      // 1. HTTP status
      const status = reviewPage.statusCode;
      if (status === undefined || status >= 400) {
        problems.push(`HTTP ${status ?? 'no response'}`);
      }

      // 2. Laravel / PHP error page text (TypeError, Exception trace, etc.)
      const signatures = await reviewPage.getErrorSignaturesFound();
      if (signatures.length > 0) {
        problems.push(`Error page detected: ${signatures.join(', ')}`);
      }

      // 3. Error page visible on screen
      if (await reviewPage.hasLaravelErrorPage()) {
        problems.push('Laravel error page is visible');
      }

      // 4. 5xx on sub-requests
      if (reviewPage.failedRequests.length > 0) {
        problems.push(`5xx requests: ${reviewPage.failedRequests.join(' | ')}`);
      }

      // 5. JavaScript errors
      if (reviewPage.jsErrors.length > 0) {
        problems.push(`JS errors: ${reviewPage.jsErrors.join(' | ')}`);
      }

      const working = problems.length === 0;
      const result = working ? 'WORKING' : 'NOT WORKING';

      // Always attach a screenshot
      await testInfo.attach('page-screenshot', {
        body: await reviewPage.screenshot(),
        contentType: 'image/png',
      });

      // Show the result in the HTML report
      testInfo.annotations.push({
        type: result,
        description: working ? token : `${token} -> ${problems.join('; ')}`,
      });

      // Show the result in the terminal
      console.log(`\n[${result}] token=${token}`);
      console.log(`  final URL: ${page.url()}`);
      problems.forEach((p) => console.log(`  - ${p}`));
    });
  }
});