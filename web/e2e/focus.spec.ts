import { expect, test } from '@playwright/test';
import { press } from './support/harness.ts';

/** What holds the focus right now, as `TAG[data-option]`. */
const FOCUSED = `(() => {
  const el = document.activeElement;
  return el === null ? 'none' : el.tagName + '[' + (el.getAttribute('data-option') ?? '') + ']';
})()`;

test('keyboard: Tab → Enter on NEW WORLD leaves the focus on an option button, not on the body', async ({
  page,
  hasTouch,
}) => {
  test.skip(hasTouch, 'a phone has no Tab key — the touch case is the next test');
  await page.goto('./');
  await page.keyboard.press('Tab');
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[new-world]');
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('world-seed')).toBeVisible();
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[reroll]');

  // A button that stays on screen keeps the focus it had: Enter again re-rolls.
  const first = await page.getByTestId('world-seed').innerText();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('world-seed')).not.toHaveText(first);
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[reroll]');
});

test('pointer or touch: when the pressed button leaves the screen, the focus moves to the first option', async ({
  page,
  hasTouch,
}) => {
  await page.goto('./');
  await page.getByRole('button', { name: /new world/i }).focus();
  await press(page, /new world/i, hasTouch);
  await expect(page.getByTestId('world-seed')).toBeVisible();
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[reroll]');
});

test('a key pressed with nothing focused does not grab the focus', async ({ page, hasTouch }) => {
  test.skip(hasTouch, 'a phone has no keyboard');
  await page.goto('./');
  await page.keyboard.press('n');
  await expect(page.getByTestId('world-seed')).toBeVisible();
  expect(await page.evaluate(FOCUSED)).toBe('BODY[]');
});
