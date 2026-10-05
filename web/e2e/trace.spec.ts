import { expect, test, type Page } from '@playwright/test';
import { expectTouchable, plant, press, saveText, watchForErrors } from './support/harness.ts';

/** A fixed world: its street is Requiem Slipway, eight levels from the universe. */
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

function levels(page: Page) {
  return page.getByTestId('trace').getByRole('button', { name: /^Level / });
}

test('the switch shows the pole, a level a button; a level tapped opens the column at its band; neither takes a step', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await onTheStreet(page);
  await press(page, /^trace$/i, hasTouch);
  const steps = await page.getByTestId('stat-steps').textContent();
  await expect(page.getByRole('button', { name: /^column$/i })).toHaveAttribute('aria-pressed', 'true');
  await press(page, /^pole$/i, hasTouch);
  await expect(page.getByRole('button', { name: /^pole$/i })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-pole] canvas')).toBeVisible();
  await expect(levels(page)).toHaveCount(8);
  await expect(bands(page)).toHaveCount(0);
  await expect(levels(page).last()).toHaveAccessibleName(/, you are here$/);
  // View controls: they move the view and pick nothing (the picture-tap wall).
  await expect(page.locator('.seg button[data-option], .pole-level[data-option]')).toHaveCount(0);
  await expectTouchable(page, 'the trace pole');
  const planet = levels(page).nth(4);
  await (hasTouch ? planet.tap() : planet.click());
  await expect(page.getByRole('button', { name: /^column$/i })).toHaveAttribute('aria-pressed', 'true');
  await expect(bands(page).nth(4)).toBeInViewport();
  await expect(page.getByTestId('stat-steps')).toHaveText(steps ?? '');
  expect(problems).toEqual([]);
});

test('the pole picked is the pole next time, after a reload too; the rail opens it at the level nearest the finger, the pole scrolling when it is taller than the screen', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  // A room: thirteen levels, taller than the phone's pole, so it scrolls.
  await plant(page, saveText(SEED, `${STREET}.0.0.0.0.0`, { [`${STREET}.0.0`]: 'corridor' }));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await press(page, /^trace$/i, hasTouch);
  await press(page, /^pole$/i, hasTouch);
  await press(page, /^close$/i, hasTouch);
  await page.reload();
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  const rail = page.getByRole('button', { name: /^Trace: every level/ });
  const box = await rail.boundingBox();
  const universe = await page.locator('.rail .crumb').first().boundingBox();
  if (box === null || universe === null) throw new Error('the rail is not on screen');
  const at = { x: universe.x + universe.width / 2 - box.x, y: box.height / 2 };
  await (hasTouch ? rail.tap({ position: at }) : rail.click({ position: at }));
  await expect(page.getByRole('button', { name: /^pole$/i })).toHaveAttribute('aria-pressed', 'true');
  await expect(levels(page).first()).toBeInViewport();
  await expect(levels(page).last()).not.toBeInViewport();
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
