import { expect, test, type Page } from '@playwright/test';
import { press, saveText, tapOption } from './support/harness.ts';

/** The live region the shell owns: `[role=status]` — there is exactly one, whatever the screen. */
const LIVE = '[role="status"]';
const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard; its first building Ornate Sanctum. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';

/** Plants a save once per test — a reload inside the test must find what the game itself wrote. */
async function plant(page: Page, text: string): Promise<void> {
  await page.addInitScript(
    ([slot, value]) => {
      if (window.sessionStorage.getItem('planted') !== null) return;
      window.sessionStorage.setItem('planted', 'yes');
      window.localStorage.setItem(slot, value);
    },
    [SLOT, text] as const,
  );
}

/** Counts every change of the live region's text from now on: what a screen reader would be told. */
async function countAnnouncements(page: Page): Promise<void> {
  await page.locator(LIVE).evaluate((el) => {
    const counter = window as Window & { announced?: number };
    counter.announced = 0;
    new MutationObserver((records) => {
      counter.announced = (counter.announced ?? 0) + records.length;
    }).observe(el, { childList: true, characterData: true, subtree: true });
  });
}

async function announced(page: Page): Promise<number> {
  return page.evaluate(() => (window as Window & { announced?: number }).announced ?? -1);
}

test('one live region, mounted once: title → world → back changes its text, never the node', async ({
  page,
  hasTouch,
}) => {
  await page.goto('./');
  await expect(page.locator(LIVE)).toHaveCount(1);
  await page.locator(LIVE).evaluate((el) => {
    (el as HTMLElement).dataset.born = 'first-paint';
  });
  await press(page, /new world/i, hasTouch);
  await expect(page.locator(LIVE)).toContainText('drawn');
  await press(page, /enter world/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  // The switch of screens is where a new node would slip in — and a new node with text is not announced.
  await expect(page.locator(LIVE)).toHaveCount(1);
  await expect(page.locator(LIVE)).toHaveText(/^Entered .+\.$/);
  await expect(page.locator(LIVE)).toHaveAttribute('data-born', 'first-paint');
  await expect(page.locator(LIVE)).toHaveAttribute('aria-live', 'polite');
  await press(page, /title screen/i, hasTouch);
  await expect(page.getByTestId('world-seed')).toBeVisible();
  await expect(page.locator(LIVE)).toHaveCount(1);
  await expect(page.locator(LIVE)).toHaveAttribute('data-born', 'first-paint');
});

test('the path says what kind of place each crumb is, to a screen reader, without a hover', async ({
  page,
  hasTouch,
}) => {
  await page.goto('./');
  await press(page, /new world/i, hasTouch);
  await press(page, /enter world/i, hasTouch);
  // A new world starts on a street: eight crumbs, the universe first.
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  const crumbs = page.getByTestId('path').getByRole('listitem');
  await expect(crumbs).toHaveCount(8);
  await expect(crumbs.nth(0)).toHaveText(/^\s*Universe/i);
  await expect(crumbs.nth(1)).toHaveText(/^\s*Cosmic filament/i);
  await expect(crumbs.nth(2)).toHaveText(/^\s*(Galactic sector|Null reach)/i);
  await expect(crumbs.nth(7)).toHaveText(/^\s*Street/i);
  expect(await page.locator('[title]').count()).toBe(0);
});

test('at death the live region says the failure headline, once; REBUILD is announced once too', async ({
  page,
  hasTouch,
}) => {
  await plant(page, saveText(SEED, STREET, {}, { coherence: 1, steps: 7 }));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expect(page.locator(LIVE)).toHaveText(/^Restored world /);
  await countAnnouncements(page);
  // The tap that takes the last point: the engine has no message, the screen's headline is the news.
  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('failure')).toHaveText('!!! CRITICAL_COHERENCE_FAILURE !!!');
  await expect(page.locator(LIVE)).toHaveText('!!! CRITICAL_COHERENCE_FAILURE !!!');
  await expect(page.locator(LIVE)).toHaveCount(1);
  expect(await announced(page)).toBe(1);
  await press(page, /rebuild/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expect(page.locator(LIVE)).toHaveText(/rebuilt/i);
  expect(await announced(page)).toBe(2);
});

test('when the recap opens the live region says the heading of the ending, once', async ({
  page,
  hasTouch,
}) => {
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await countAnnouncements(page);
  await press(page, /end session/i, hasTouch);
  await expect(page.getByTestId('recap-heading')).toHaveText('[LINK_TERMINATION_PROTOCOL]');
  await expect(page.locator(LIVE)).toHaveText('[LINK_TERMINATION_PROTOCOL]');
  await expect(page.locator(LIVE)).toHaveCount(1);
  expect(await announced(page)).toBe(1);
  await press(page, /resume/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  expect(await announced(page)).toBe(2);
});
