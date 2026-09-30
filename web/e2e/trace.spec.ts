import { expect, test, type Page } from '@playwright/test';
import { expectTouchable, plant, press, saveText, watchForErrors } from './support/harness.ts';

/** A fixed world: its street is Bright Boulevard, eight levels from the universe. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';

async function onTheStreet(page: Page): Promise<void> {
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
}

function bands(page: Page) {
  return page.getByTestId('trace').getByRole('button', { name: /^Depth / });
}

test('the rail is one button a thumb wide: it opens the trace column at the level nearest the finger', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await onTheStreet(page);
  const rail = page.getByRole('button', { name: /^Trace: every level/ });
  const box = await rail.boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  const universe = await page.locator('.rail .crumb').first().boundingBox();
  if (box === null || universe === null) throw new Error('the rail is not on screen');
  const at = { x: universe.x + universe.width / 2 - box.x, y: box.height / 2 };
  await (hasTouch ? rail.tap({ position: at }) : rail.click({ position: at }));
  await expect(bands(page)).toHaveCount(8);
  await expect(bands(page).first()).toBeInViewport();
  await expect(bands(page).last()).not.toBeInViewport();
  await expectTouchable(page, 'the trace column');
  expect(problems).toEqual([]);
});

test('a band tapped opens larger in place, and closes again; ✕, Esc and a swipe down the header each close the column', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await onTheStreet(page);
  await press(page, /^trace$/i, hasTouch);
  const planet = bands(page).nth(4);
  const small = (await planet.boundingBox())?.height ?? 0;
  await (hasTouch ? planet.tap() : planet.click());
  await expect(planet).toHaveAttribute('aria-expanded', 'true');
  await expect.poll(async () => (await planet.boundingBox())?.height ?? 0).toBeGreaterThan(small + 100);
  await (hasTouch ? planet.tap() : planet.click());
  await expect(planet).toHaveAttribute('aria-expanded', 'false');
  await press(page, /^close$/i, hasTouch);
  await expect(page.getByTestId('trace')).toHaveCount(0);
  await press(page, /^trace$/i, hasTouch);
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('trace')).toHaveCount(0);
  await press(page, /^trace$/i, hasTouch);
  const header = (await page.locator('.col-head').boundingBox()) ?? { x: 0, y: 0, width: 0, height: 0 };
  await page.mouse.move(header.x + 40, header.y + header.height / 2);
  await page.mouse.down();
  await page.mouse.move(header.x + 40, header.y + header.height / 2 + 120, { steps: 6 });
  await page.mouse.up();
  await expect(page.getByTestId('trace')).toHaveCount(0);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  expect(problems).toEqual([]);
});

test('Dive plays the levels full screen and lands back in the column on your band; Skip lands at once', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await onTheStreet(page);
  await press(page, /^trace$/i, hasTouch);
  await press(page, /^dive$/i, hasTouch);
  await expect(page.getByRole('button', { name: /^skip$/i })).toBeVisible();
  await expect(page.locator('[data-dive] canvas')).toBeVisible();
  await expect(page.getByRole('button', { name: /^skip$/i })).toHaveCount(0, { timeout: 15_000 });
  await expect(bands(page).last()).toBeInViewport();
  await press(page, /^dive$/i, hasTouch);
  await press(page, /^skip$/i, hasTouch);
  await expect(page.locator('[data-dive]')).toHaveCount(0);
  await expect(bands(page).last()).toBeInViewport();
  expect(problems).toEqual([]);
});

test('reduced motion: no dive — Dive shows your band at once', async ({ page, hasTouch }) => {
  const problems = watchForErrors(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await onTheStreet(page);
  await press(page, /^trace$/i, hasTouch);
  await press(page, /^dive$/i, hasTouch);
  await expect(page.getByRole('button', { name: /^skip$/i })).toHaveCount(0);
  await expect(bands(page).last()).toBeInViewport();
  expect(problems).toEqual([]);
});
