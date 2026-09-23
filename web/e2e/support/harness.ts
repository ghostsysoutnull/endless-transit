import { expect, type Page } from '@playwright/test';

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

export async function tapOption(page: Page, id: string, hasTouch: boolean): Promise<void> {
  const button = page.locator(`button[data-option="${id}"]`);
  await (hasTouch ? button.tap() : button.click());
}

/** No sideways scroll, and every action on screen is a real button of at least 44 × 44 CSS px. */
export async function expectTouchable(page: Page, where: string): Promise<void> {
  const overflow = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(overflow.content, `${where}: horizontal overflow`).toBeLessThanOrEqual(overflow.viewport);
  const buttons = await page.getByRole('button').all();
  expect(buttons.length, `${where}: buttons`).toBeGreaterThan(0);
  for (const button of buttons) {
    const box = await button.boundingBox();
    expect(box?.width ?? 0, `${where}: button width`).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0, `${where}: button height`).toBeGreaterThanOrEqual(44);
  }
  expect(
    await page.locator('[data-option]:not(button)').count(),
    `${where}: options that are not buttons`,
  ).toBe(0);
}

/** Every address from the universe down to `path`: what a traveller who stands there has walked at the least. */
export function trailOf(path: string | null): string[] {
  if (path === null) return [];
  const steps = path.split('.');
  return steps.map((_, depth) => steps.slice(0, depth + 1).join('.'));
}

/** A v5 save as the game writes one: a fresh traveller who has walked the trail, unless a field is set on purpose. */
export function saveText(
  seed: string,
  path: string | null,
  states: Record<string, string> = {},
  traveller: {
    coherence?: number;
    steps?: number;
    visited?: readonly string[];
    buffer?: readonly unknown[];
    resonant?: number;
  } = {},
): string {
  return JSON.stringify({
    version: 5,
    seed,
    path,
    states,
    coherence: traveller.coherence ?? 100,
    steps: traveller.steps ?? 0,
    visited: traveller.visited ?? trailOf(path),
    buffer: traveller.buffer ?? [],
    resonant: traveller.resonant ?? 0,
  });
}
