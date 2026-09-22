import { expect, test } from '@playwright/test';
import { press } from './support/harness.ts';

/** The live region the shell owns: `[role=status]` — there is exactly one, whatever the screen. */
const LIVE = '[role="status"]';

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
