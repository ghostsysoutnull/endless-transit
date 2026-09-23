import { expect, test, type Page } from '@playwright/test';
import { press, saveText, tapOption } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard; its first building Ornate Sanctum, 16 floors, 9 doors per corridor. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';
const LOBBY = `${STREET}.0.0`;
const FIRST_ROOM = `${LOBBY}.0.0.0`;
const RELIC = { kind: 'relic', from: FIRST_ROOM, key: 'with|reliquary box|plasma coil' };

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

/** The heading levels of the page in document order. */
async function headings(page: Page): Promise<number[]> {
  return page.evaluate(() =>
    [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')]
      .filter((el) => (el as HTMLElement).offsetParent !== null)
      .map((el) => Number(el.tagName.slice(1))),
  );
}

/** One h1 first, and no level skipped on the way down. */
function expectSane(levels: number[], where: string): void {
  expect(levels[0], `${where}: the first heading is the h1`).toBe(1);
  expect(
    levels.filter((level) => level === 1),
    `${where}: one h1`,
  ).toHaveLength(1);
  for (let at = 1; at < levels.length; at++) {
    const previous = levels[at - 1] ?? 1;
    expect(levels[at], `${where}: heading ${String(at)} skips a level`).toBeLessThanOrEqual(previous + 1);
  }
}

/** Every button has a name a reader can say; every drawn picture has its summary. */
async function expectNamed(page: Page, where: string): Promise<void> {
  for (const button of await page.getByRole('button').all()) {
    const name = ((await button.getAttribute('aria-label')) ?? (await button.innerText())).trim();
    expect(name, `${where}: a button without a name`).not.toBe('');
  }
  for (const picture of await page.locator('[role="img"]').all()) {
    expect(
      ((await picture.getAttribute('aria-label')) ?? '').trim(),
      `${where}: a picture without a name`,
    ).not.toBe('');
  }
}

test('the page: lang, a dark colour scheme, the viewport meta with the safe area, the dock padded for a home bar, one live region', async ({
  page,
}) => {
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toContain('dark');
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /viewport-fit=cover/);
  await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute('content', 'dark');
  await expect(page.locator('[role="status"]')).toHaveCount(1);
  // The dock's bottom padding names the safe area; the stylesheet is the one place it can be read from.
  const dockRule = await page.evaluate(() =>
    [...document.styleSheets]
      .flatMap((sheet) => [...sheet.cssRules])
      .filter((rule): rule is CSSStyleRule => rule instanceof CSSStyleRule && rule.selectorText === '.dock')
      .map((rule) => rule.cssText)
      .join(' '),
  );
  expect(dockRule).toContain('safe-area-inset-bottom');
});

test('headings are in order on every screen: the title, a street with the map and the trace, a room with a scan, the buffer, the help, the recap, the link failure', async ({
  page,
  hasTouch,
}) => {
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }, { buffer: [RELIC, RELIC] }));
  await page.goto('./?debug');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await press(page, /^scan$/i, hasTouch);
  await expect(page.getByTestId('scan')).toBeVisible();
  expectSane(await headings(page), 'room with a scan');
  await expectNamed(page, 'room with a scan');
  await press(page, /^buffer$/i, hasTouch);
  await expect(page.getByTestId('buffer-heading')).toBeVisible();
  expectSane(await headings(page), 'buffer');
  await expectNamed(page, 'buffer');
  await press(page, /back to reality/i, hasTouch);
  await press(page, /^help$/i, hasTouch);
  await expect(page.getByTestId('help-heading')).toBeVisible();
  expectSane(await headings(page), 'help');
  await expectNamed(page, 'help');
  await press(page, /back to the world/i, hasTouch);
  await press(page, /end session/i, hasTouch);
  await expect(page.getByTestId('recap-heading')).toBeVisible();
  expectSane(await headings(page), 'recap');
  await expectNamed(page, 'recap');
  await press(page, /^resume$/i, hasTouch);
  await press(page, /title screen/i, hasTouch);
  await expect(page.getByTestId('world-seed')).toBeVisible();
  expectSane(await headings(page), 'title');
  await expectNamed(page, 'title');
  await press(page, /continue/i, hasTouch);
  for (const level of ['exit apartment', 'leave floor', 'leave building'])
    await press(page, new RegExp(level, 'i'), hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await press(page, /^map$/i, hasTouch);
  await expect(page.getByTestId('map')).toBeVisible();
  expectSane(await headings(page), 'street with the map');
  await expectNamed(page, 'street with the map');
  await press(page, /^trace$/i, hasTouch);
  await expect(page.getByTestId('trace')).toBeVisible();
  expectSane(await headings(page), 'street with the trace');
  await tapOption(page, 'debug:integrity:1', hasTouch);
  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('failure')).toBeVisible();
  expectSane(await headings(page), 'link failure');
  await expectNamed(page, 'link failure');
});

test('on a desktop the focus is visible on every kind of control the Tab key reaches: rows, moves, tiles, the dock', async ({
  page,
  hasTouch,
}) => {
  test.skip(hasTouch, 'a phone has no Tab key');
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  const seen = new Set<string>();
  for (let tab = 0; tab < 24; tab++) {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      if (!(el instanceof HTMLElement) || el === document.body) return null;
      const style = getComputedStyle(el);
      return {
        kind: el.className.split(' ')[0] ?? el.tagName,
        outline: style.outlineStyle,
        width: parseFloat(style.outlineWidth),
      };
    });
    if (focused === null) break;
    seen.add(focused.kind);
    expect(focused.outline, `${focused.kind}: outline style`).not.toBe('none');
    expect(focused.width, `${focused.kind}: outline width`).toBeGreaterThan(0);
  }
  expect([...seen]).toEqual(expect.arrayContaining(['pb', 'tile']));
});

test('reduced motion: no animation runs — the sigil, the meter, the canvas pulse, the spotlight scroll', async ({
  page,
  hasTouch,
}) => {
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await expect(page.getByTestId('pane-map')).toBeVisible();
  const frame = async (): Promise<string> =>
    page
      .getByTestId('pane-map')
      .locator('canvas')
      .evaluate((el) => (el as HTMLCanvasElement).toDataURL());
  // With motion allowed the pulse is drawn: two frames apart differ.
  const lively = await frame();
  await page.waitForTimeout(450);
  expect(await frame()).not.toBe(lively);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.getByTestId('pane-map')).toBeVisible();
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  expect(await page.locator('.cohbar i').evaluate((el) => getComputedStyle(el).transitionDuration)).toBe(
    '0s',
  );
  const still = await frame();
  await page.waitForTimeout(450);
  expect(await frame()).toBe(still);
  // The spotlight lands at once: the scroll position right after the tap is the one it keeps.
  await press(page, /^map$/i, hasTouch);
  const at = await page.evaluate(() => window.scrollY);
  await page.waitForTimeout(400);
  expect(await page.evaluate(() => window.scrollY)).toBe(at);
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  await press(page, /title screen/i, hasTouch);
  await expect(page.locator('.sigil')).toBeVisible();
  expect(await page.locator('.sigil').evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
});
