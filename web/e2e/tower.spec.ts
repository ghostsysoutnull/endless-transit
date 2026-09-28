import { expect, test, type Page } from '@playwright/test';
import { saveText, tapOption, watchForErrors } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard; its first building is entered from the street's list. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';

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

test('a floor tapped on the pad: the car rides there first, then the floor is entered', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await building(page, hasTouch);
  const number = (await page.locator('button[data-option="enter:5"] .num').textContent()) ?? '';
  await tapOption(page, 'enter:5', hasTouch);
  // The ride runs first: the building is still on show right after the tap.
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
  await expect(page.getByTestId('place-name')).toHaveText(`Floor ${number}`);
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
