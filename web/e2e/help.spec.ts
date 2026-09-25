import { expect, test, type Page } from '@playwright/test';
import { expectTouchable, press, saveText, watchForErrors } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard. */
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

async function shoot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: test.info().outputPath(`${test.info().project.name}-${name}.png`) });
}

function stat(page: Page, label: string) {
  return page.locator('.stat', { hasText: label }).locator('dd');
}

test('HELP opens the manual — every button explained, the survival rules — costs one and no step; BACK returns to the same place; the fold is closed again', async ({
  page,
  hasTouch,
  isMobile,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await press(page, /^help$/i, hasTouch);
  await expect(page.getByTestId('help-heading')).toHaveText('[OPERATOR_MANUAL]');
  await expect(page.locator('[role="status"]')).toHaveText('[OPERATOR_MANUAL]');
  await expect(page.getByTestId('help-section')).toHaveCount(2);
  await expect(page.getByTestId('help-section').nth(1).locator('dt')).toHaveText([
    'SCAN',
    'MAP',
    'BUFFER',
    'TRACE',
    'HELP',
    'TITLE SCREEN',
    'END SESSION',
    'MORE',
  ]);
  await expect(page.getByTestId('help-survival').locator('li')).toHaveCount(5);
  // The way back is the one button, on the screen from the top.
  await expect(page.getByRole('button')).toHaveCount(1);
  await expect(page.getByRole('button', { name: /back to the world/i })).toBeInViewport({ ratio: 1 });
  await expectTouchable(page, 'help');
  await shoot(page, '1-help');
  await press(page, /back to the world/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expect(page.getByTestId('place-name')).toHaveText('Bright Boulevard');
  // One prompt: the help; the way back is free; no step.
  await expect(page.getByTestId('coherence')).toHaveText('99%');
  await expect(stat(page, 'Steps')).toHaveText('0');
  if (isMobile) {
    await expect(page.getByTestId('more')).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('button', { name: /^help$/i })).toHaveCount(0);
  }
  expect(problems).toEqual([]);
});

test('on a desktop, H opens the manual and B goes back', async ({ page, hasTouch }) => {
  test.skip(hasTouch, 'keys are a desktop extra');
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await page.keyboard.press('h');
  await expect(page.getByTestId('help-heading')).toBeVisible();
  await page.keyboard.press('b');
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
});

test('on a phone at 360 px the manual reads without sideways scroll, the way back a thumb’s size', async ({
  page,
  hasTouch,
}) => {
  test.skip(!hasTouch, 'phone only');
  await page.setViewportSize({ width: 360, height: 640 });
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await press(page, /^help$/i, hasTouch);
  await expect(page.getByTestId('help-heading')).toBeVisible();
  await expectTouchable(page, 'help at 360');
  await shoot(page, '2-help-360');
  expect(await page.evaluate(() => document.documentElement.clientWidth)).toBe(360);
});
