import { expect, test, type Page } from '@playwright/test';
import { plant, press, saveText, tapOption, watchForErrors } from './support/harness.ts';

/** A fixed world: its street is Bright Boulevard; its first building is entered from the street's list. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';

/** Inside the fixed world's first building: the tower is drawn, its floors are the pad. */
async function building(page: Page, hasTouch: boolean): Promise<void> {
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await expect(page.getByTestId('scene').locator('canvas')).toHaveCount(1);
}

test('the tower’s gauge is a slider: its arrow keys move the car from floor to floor', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await building(page, hasTouch);
  const slider = page.getByTestId('scene').getByRole('slider');
  await expect(slider).toBeVisible();
  const before = await slider.getAttribute('aria-valuenow');
  await slider.focus();
  await page.keyboard.press('ArrowUp');
  await expect(slider).not.toHaveAttribute('aria-valuenow', before ?? '');
  expect(problems).toEqual([]);
});

test('the gauge is a slider named by the list, its value a floor: a finger on its track moves the car there, a drag along it moves it on', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await building(page, hasTouch);
  const slider = page.getByTestId('scene').getByRole('slider', { name: 'Ride to a floor' });
  await expect(slider).toHaveAttribute('aria-valuetext', /^Floor \d+$/);
  const box = await slider.boundingBox();
  if (box === null) throw new Error('the slider has no box');
  const x = box.x + box.width / 2;
  const start = await slider.getAttribute('aria-valuenow');
  await page.mouse.move(x, box.y + 2);
  await page.mouse.down();
  // The tap at the top of the track lands on the top floor, the slider's last place.
  const top = (await slider.getAttribute('aria-valuemax')) ?? '';
  expect(start).not.toBe(top);
  await expect(slider).toHaveAttribute('aria-valuenow', top);
  await page.mouse.move(x, box.y + box.height - 2, { steps: 12 });
  await page.mouse.up();
  await expect(slider).not.toHaveAttribute('aria-valuenow', top);
  expect(problems).toEqual([]);
});

test('the slider is hidden where the picture has nothing to slide to: on the street and at a floor’s elevator', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  const slider = page.getByTestId('scene').getByRole('slider');
  await expect(slider).toBeHidden();
  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await expect(slider).toBeVisible();
  await press(page, /^Ride to Floor 7,/, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
  await expect(slider).toBeHidden();
  expect(problems).toEqual([]);
});

test('a floor tapped on the pad: the car rides there first, then the floor is entered', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await building(page, hasTouch);
  await press(page, /^Ride to Floor 7,/, hasTouch);
  // The ride runs first: the building is still on show right after the tap.
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
  await expect(page.getByTestId('place-name')).toHaveText('Floor 7');
  expect(problems).toEqual([]);
});

test('a drag on the tower moves the car: another floor lights as it passes', async ({ page, hasTouch }) => {
  const problems = watchForErrors(page);
  await building(page, hasTouch);
  const scene = page.getByTestId('scene');
  await scene.scrollIntoViewIfNeeded();
  const box = await scene.locator('canvas').boundingBox();
  if (box === null) throw new Error('the tower has no canvas');
  const x = box.x + box.width * 0.45;
  await page.mouse.move(x, box.y + box.height * 0.3);
  await page.mouse.down();
  const first = await scene.getAttribute('data-lit');
  await page.mouse.move(x, box.y + box.height * 0.8, { steps: 12 });
  await page.mouse.up();
  await expect(scene).not.toHaveAttribute('data-lit', first ?? '');
  expect(problems).toEqual([]);
});
