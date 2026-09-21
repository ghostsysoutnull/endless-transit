import { expect, test, type Page } from '@playwright/test';
import { press, watchForErrors } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world, so names and list lengths are known: the save format is the way in, as for any player. */
const SEED = '7F3A-91C2-0B4D-E6A8';
/** Steamspire: 15 streets. Its first street, Grand Way: 20 buildings, two of them landmarks. */
const LONG_CITY = '0.0.0.0.0.2.0';
const LONG_STREET = '0.0.0.0.0.2.0.0';
const LEVELS = [
  'UNIVERSE',
  'COSMIC FILAMENT',
  'GALACTIC SECTOR',
  'SOLAR SYSTEM',
  'PLANET',
  'COUNTRY',
  'CITY',
  'STREET',
] as const;

/** Plants a save once per test — a reload inside the test must find what the game itself wrote. */
async function plant(page: Page, path: string | null): Promise<void> {
  await page.addInitScript(
    ([slot, text]) => {
      if (window.sessionStorage.getItem('planted') !== null) return;
      window.sessionStorage.setItem('planted', 'yes');
      window.localStorage.setItem(slot, text);
    },
    [SLOT, JSON.stringify({ version: 2, seed: SEED, path })] as const,
  );
}

async function tapOption(page: Page, id: string, hasTouch: boolean): Promise<void> {
  const button = page.locator(`button[data-option="${id}"]`);
  await (hasTouch ? button.tap() : button.click());
}

/** No sideways scroll, and every action on screen is a real button of at least 44 × 44 CSS px. */
async function expectTouchable(page: Page, where: string): Promise<void> {
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

test('walk from the title down to a street and back up to the universe, by tapping', async ({
  page,
  hasTouch,
}, testInfo) => {
  const problems = watchForErrors(page);
  await plant(page, null);
  await page.goto('./');
  await expect(page.getByTestId('world-seed')).toHaveText(SEED);
  await press(page, /enter world/i, hasTouch);

  const shots: Record<string, string> = {
    UNIVERSE: '1-universe',
    PLANET: '2-planet',
    CITY: '3-city',
    STREET: '4-street',
  };
  for (const [depth, kind] of LEVELS.entries()) {
    await expect(page.getByTestId('place-kind')).toHaveText(kind);
    await expect(page.getByTestId('place-name')).toHaveText(/\S/);
    await expect(page.getByTestId('path').getByRole('listitem')).toHaveCount(depth + 1);
    await expectTouchable(page, kind);
    const shot = shots[kind];
    if (shot !== undefined) {
      await page.screenshot({
        path: testInfo.outputPath(`${testInfo.project.name}-${shot}.png`),
        fullPage: true,
      });
    }
    if (kind !== 'STREET') await tapOption(page, 'enter:0', hasTouch);
  }

  await expect(page.getByTestId('place-name')).toHaveText('BRIGHT BOULEVARD');
  await expect(page.getByTestId('path')).toContainText('Rainhaven');
  await expect(page.getByTestId('status')).toHaveText('Entered Bright Boulevard.');

  for (const kind of [...LEVELS].reverse().slice(1)) {
    await press(page, /leave/i, hasTouch);
    await expect(page.getByTestId('place-kind')).toHaveText(kind);
  }
  await expect(page.getByRole('button', { name: /leave/i })).toHaveCount(0);
  expect(problems).toEqual([]);
});

test('reload restores the place; the title screen is one tap away and the place waits behind "continue"', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, null);
  await page.goto('./');
  await press(page, /enter world/i, hasTouch);
  for (let level = 0; level < 4; level++) await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('place-name')).toHaveText('AURAEA');

  await page.reload();
  await expect(page.getByTestId('place-kind')).toHaveText('PLANET');
  await expect(page.getByTestId('place-name')).toHaveText('AURAEA');
  await expect(page.getByTestId('status')).toContainText(/restored/i);

  await press(page, /title screen/i, hasTouch);
  await expect(page.getByTestId('world-seed')).toHaveText(SEED);
  await expect(page.getByRole('button', { name: /re-roll/i })).toBeVisible();
  await press(page, /continue/i, hasTouch);
  await expect(page.getByTestId('place-name')).toHaveText('AURAEA');
  expect(problems).toEqual([]);
});

test('the street is the bottom for now: buildings are listed as sealed lines, never as buttons', async ({
  page,
}, testInfo) => {
  const problems = watchForErrors(page);
  await plant(page, LONG_STREET);
  await page.goto('./');
  await expect(page.getByTestId('place-name')).toHaveText('GRAND WAY');
  await expect(page.locator('[data-sealed]')).toHaveCount(20);
  await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(0);
  await expect(page.getByTestId('sealed-note')).toBeVisible();
  // The way out is on the first screen — nobody scrolls past twenty sealed doors to find it.
  await expect(page.getByRole('button', { name: /leave/i })).toBeInViewport({ ratio: 1 });
  await expect(page.locator('[data-sealed] .landmark')).toHaveCount(2);
  await expect(page.getByRole('button')).toHaveCount(2);
  await expectTouchable(page, 'long street');
  await page.screenshot({ path: testInfo.outputPath(`${testInfo.project.name}-5-long-street.png`) });
  expect(problems).toEqual([]);
});

test('a long list: the last street is reached by scrolling down, leave stays in reach, and the next place starts from the top', async ({
  page,
  hasTouch,
}, testInfo) => {
  const problems = watchForErrors(page);
  await plant(page, LONG_CITY);
  await page.goto('./');
  await expect(page.getByTestId('place-name')).toHaveText('STEAMSPIRE');
  await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(15);
  await expectTouchable(page, 'long city');

  // Measured on the live page, not read off a picture: a full-page capture of a page taller than the
  // screen re-emulates the device for the shot and can lose the coarse pointer while it does.
  const live = await page.evaluate(() => {
    const row = document.querySelector('button[data-option="enter:0"]');
    const hint = row?.querySelector('kbd');
    return {
      coarse: window.matchMedia('(pointer: coarse)').matches,
      rowHeight: row?.getBoundingClientRect().height ?? 0,
      hint: hint == null ? 'missing' : getComputedStyle(hint).display,
    };
  });
  expect(live.coarse).toBe(hasTouch);
  expect(live.rowHeight).toBeGreaterThanOrEqual(hasTouch ? 56 : 48);
  expect(live.hint === 'none').toBe(hasTouch);
  await page.screenshot({ path: testInfo.outputPath(`${testInfo.project.name}-6-long-city-top.png`) });

  const last = page.locator('button[data-option="enter:14"]');
  await last.scrollIntoViewIfNeeded();
  await expect(last).toBeInViewport();
  await page.screenshot({ path: testInfo.outputPath(`${testInfo.project.name}-7-long-city-end.png`) });
  if (hasTouch) {
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await expect(page.getByRole('button', { name: /leave/i })).toBeInViewport();
  }
  await (hasTouch ? last.tap() : last.click());
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.getByTestId('place-name')).toBeInViewport();
  expect(problems).toEqual([]);
});

test('still fits at 360 px wide at every level, the narrowest phone we promise', async ({
  page,
  hasTouch,
}) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await plant(page, null);
  await page.goto('./');
  await press(page, /enter world/i, hasTouch);
  for (const kind of LEVELS) {
    await expect(page.getByTestId('place-kind')).toHaveText(kind);
    await expectTouchable(page, `360px ${kind}`);
    if (kind !== 'STREET') await tapOption(page, 'enter:0', hasTouch);
  }
  expect(await page.evaluate(() => document.documentElement.clientWidth)).toBe(360);
});

test('the planet colours the frame, down to the street', async ({ page }) => {
  await plant(page, '0.0.0.0.0');
  await page.goto('./');
  await expect(page.getByTestId('place-name')).toHaveText('AURAEA');
  await expect(page.locator('.app')).toHaveAttribute('data-frame', 'yellow');
  const frame = await page.locator('.hud').evaluate((el) => getComputedStyle(el).borderTopColor);
  expect(frame).toBe('rgb(230, 195, 92)');
});

test('the keyboard is an extra: digits go down, L goes up, T is the title', async ({ page, hasTouch }) => {
  test.skip(hasTouch, 'a phone has no keyboard — nothing may depend on one');
  await plant(page, null);
  await page.goto('./');
  await page.keyboard.press('e');
  await expect(page.getByTestId('place-kind')).toHaveText('UNIVERSE');
  await page.keyboard.press('1');
  await expect(page.getByTestId('place-name')).toHaveText('ZETA-915-LINK');
  await page.keyboard.press('l');
  await expect(page.getByTestId('place-kind')).toHaveText('UNIVERSE');
  await page.keyboard.press('t');
  await expect(page.getByTestId('world-seed')).toHaveText(SEED);
});
