import type { Page } from '@playwright/test';

/** Collects everything the page complains about; a test ends by asserting it stayed empty. */
export function watchForErrors(page: Page): string[] {
  const problems: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') problems.push(message.text());
  });
  page.on('pageerror', (error) => problems.push(error.message));
  page.on('requestfailed', (request) => problems.push(`request failed: ${request.url()}`));
  page.on('response', (response) => {
    if (response.status() >= 400) problems.push(`${String(response.status())} ${response.url()}`);
  });
  return problems;
}

/** Tap on a touch device, click on a desktop — what a player's hand would do. */
export async function press(page: Page, name: RegExp, hasTouch: boolean): Promise<void> {
  const button = page.getByRole('button', { name });
  await (hasTouch ? button.tap() : button.click());
}
