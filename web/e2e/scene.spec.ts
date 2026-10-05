import { expect, test, type Page } from '@playwright/test';
import { pointInPicture, press, saveText, tapAt, tapOption, watchForErrors } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: its street is Requiem Slipway, four buildings, the first Censed Altar. */
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

/** A point inside the building the option `id` enters, on the picture; a failed test when it is not drawn there. */
async function pointOf(page: Page, id: string): Promise<{ x: number; y: number }> {
  const point = await pointInPicture(page, id);
  if (point === null) throw new Error(`no building for ${id} in the picture`);
  return point;
}

async function kind(page: Page): Promise<string> {
  return (await page.getByTestId('place-kind').textContent()) ?? '';
}

async function steps(page: Page): Promise<string> {
  return (await page.locator('.stats dd').first().textContent()) ?? '';
}

/** How many device pixels wide the scene's canvas is drawn. */
async function breadth(page: Page): Promise<number> {
  return page
    .getByTestId('scene')
    .locator('canvas')
    .evaluate((el) => (el as HTMLCanvasElement).width);
}

/** The page's clock runs a second on, then stops: animation frames and timers wait for `runFor`, so a tap lands inside a zoom for sure. */
async function holdTime(page: Page): Promise<void> {
  await page.clock.pauseAt((await page.evaluate(() => Date.now())) + 1000);
}

async function still(page: Page): Promise<string> {
  return page
    .getByTestId('scene')
    .locator('canvas')
    .evaluate((el) => (el as HTMLCanvasElement).toDataURL());
}

test('the street is drawn: a named picture with its list as its twin; a building is drawn as its tower', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  const scene = page.getByTestId('scene');
  await expect(scene).toHaveCount(1);
  await expect(scene.getByRole('img', { name: /^Picture of Requiem Slipway/ })).toHaveCount(1);
  await expect(scene.locator('canvas')).toHaveCount(1);
  // No option lives on the picture: the list is the one set of buttons.
  await expect(scene.locator('[data-option]')).toHaveCount(0);
  await expect(page.locator('.rows button[data-option]')).toHaveCount(4);
  await shoot(page, 'street');
  await tapOption(page, 'enter:0', hasTouch);
  expect(await kind(page)).toBe('BUILDING');
  await expect(page.getByTestId('scene').getByRole('img', { name: /^Picture of Censed Altar/ })).toHaveCount(
    1,
  );
  expect(problems).toEqual([]);
});

test('each side lights the other: a row pointed at or focused lights its building, a building pointed at lights its row', async ({
  page,
}) => {
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  const scene = page.getByTestId('scene');
  await expect(scene).toHaveAttribute('data-lit', '');
  await page.locator('button[data-option="enter:2"]').focus();
  await expect(scene).toHaveAttribute('data-lit', 'enter:2');
  await expect(page.locator('.rows [data-lit]')).toHaveCount(1);
  await expect(page.locator('.rows [data-lit]')).toHaveAttribute('data-option', 'enter:2');
  await page.locator('button[data-option="enter:2"]').blur();
  await expect(scene).toHaveAttribute('data-lit', '');
  await pointOf(page, 'enter:3');
  // The sweep left the picture: nothing is lit; pointing at the building again lights its row.
  await expect(page.locator('.rows [data-lit]')).toHaveCount(0);
  const point = await pointOf(page, 'enter:3');
  await page.getByTestId('scene').locator('canvas').dispatchEvent('pointermove', {
    clientX: point.x,
    clientY: point.y,
  });
  await expect(page.locator('.rows [data-lit]')).toHaveAttribute('data-option', 'enter:3');
});

test('a building tapped in the picture is zoomed into, then entered; tapped in the list, entered at once; leaving shows the street again', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  const name = (await page.locator('button[data-option="enter:1"] .lb').textContent()) ?? '';
  const point = await pointOf(page, 'enter:1');
  await tapAt(page, point, hasTouch);
  // The zoom runs first: the street is still on show right after the tap.
  expect(await kind(page)).toBe('STREET');
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  expect(name).toContain(await page.getByTestId('place-name').textContent());
  await press(page, /leave/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expect(page.getByTestId('scene').locator('canvas')).toHaveCount(1);
  await tapOption(page, 'enter:2', hasTouch);
  expect(await kind(page)).toBe('BUILDING');
  expect(problems).toEqual([]);
});

test('a tap in the picture then a tap in the list before the zoom ends: exactly one step, into the list’s building', async ({
  page,
  hasTouch,
}) => {
  await page.clock.install();
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  const before = Number(await steps(page));
  const name = (await page.locator('button[data-option="enter:3"] .lb').textContent()) ?? '';
  const point = await pointOf(page, 'enter:0');
  await holdTime(page);
  await tapAt(page, point, hasTouch);
  await tapOption(page, 'enter:3', hasTouch);
  expect(await kind(page)).toBe('BUILDING');
  // Long past the zoom's end: the dropped pick never rode a floor of the building.
  await page.clock.runFor(800);
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  expect(name).toContain(await page.getByTestId('place-name').textContent());
  expect(Number(await steps(page))).toBe(before + 1);
});

test('reduced motion: a still picture — the same frame after a while and after a reload, torn at low coherence, entered at once', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await plant(page, saveText(SEED, STREET));
  await page.goto('./?debug');
  await expect(page.getByTestId('scene').locator('canvas')).toHaveCount(1);
  const calm = await still(page);
  await page.waitForTimeout(450);
  expect(await still(page)).toBe(calm);
  await tapOption(page, 'debug:integrity:29', hasTouch);
  await expect(page.getByTestId('coherence')).toHaveText('29%');
  const torn = await still(page);
  expect(torn).not.toBe(calm);
  await page.waitForTimeout(450);
  expect(await still(page)).toBe(torn);
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await shoot(page, 'street-reduced-29');
  await page.reload();
  await expect(page.getByTestId('coherence')).toHaveText('29%');
  expect(await still(page)).toBe(torn);
  await tapAt(page, await pointOf(page, 'enter:0'), hasTouch);
  // At once: well within the zoom's 450 ms (a touch's click lands a moment after the touch ends).
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING', { timeout: 250 });
  expect(problems).toEqual([]);
});

test('coherence is felt: at a low value the picture tears and the name flickers', async ({
  page,
  hasTouch,
}) => {
  await plant(page, saveText(SEED, STREET));
  await page.goto('./?debug');
  await tapOption(page, 'debug:integrity:29', hasTouch);
  await expect(page.getByTestId('coherence')).toHaveText('29%');
  await expect
    .poll(() => page.locator('.cap h2').evaluate((el) => getComputedStyle(el).animationName))
    .toBe('tear');
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await shoot(page, 'street-29');
});

test('the first screen of a drawn street: the name with its facts, then the picture, then the list, then the description; the row of buttons at the screen’s foot, there still when the page is scrolled', async ({
  page,
}) => {
  await plant(page, saveText(SEED, STREET));
  const sizes = [
    { width: 360, height: 640 },
    { width: 412, height: 915 },
  ];
  for (const size of sizes) {
    await page.setViewportSize(size);
    await page.goto('./');
    const box = async (selector: string) => {
      const found = await page.locator(selector).first().boundingBox();
      if (found === null) throw new Error(`${selector} is not on the page`);
      return found;
    };
    const name = await box('.cap h2');
    const scene = await box('[data-testid="scene"]');
    const row = await box('.rows button[data-option]');
    const tags = await box('.cap .tags');
    const words = await box('.cap .desc');
    console.log(
      `[scene] ${test.info().project.name} ${String(size.width)}x${String(size.height)}: picture ${String(Math.round(scene.width))}x${String(Math.round(scene.height))} at y=${String(Math.round(scene.y))}, first row bottom=${String(Math.round(row.y + row.height))}`,
    );
    expect(name.y + name.height).toBeLessThanOrEqual(tags.y);
    expect(tags.y + tags.height).toBeLessThanOrEqual(scene.y);
    expect(scene.y + scene.height).toBeLessThanOrEqual(row.y);
    expect(row.y + row.height).toBeLessThanOrEqual(words.y);
    await expect(page.locator('.rows button[data-option]').first()).toBeInViewport({ ratio: 1 });
    // The row of buttons is fixed to the bottom edge of the screen: clear of the first row, and never scrolled away.
    const keys = await box('.keybar .keys');
    expect(row.y + row.height).toBeLessThanOrEqual(keys.y);
    expect(size.height - (keys.y + keys.height)).toBeLessThan(40);
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    expect((await box('.keybar .keys')).y).toBe(keys.y);
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await shoot(page, `street-first-screen-${String(size.width)}x${String(size.height)}`);
  }
});

test('one scene at a time: a new picture replaces the canvas, never adds one beside it', async ({
  page,
  hasTouch,
}) => {
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await expect(page.locator('canvas[role="img"]')).toHaveCount(1);
  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await expect(page.getByTestId('scene').locator('canvas')).toHaveCount(1);
  await expect(page.locator('canvas[role="img"]')).toHaveCount(1);
});

test('the picture refits its host when the screen changes size', async ({ page }) => {
  await plant(page, saveText(SEED, STREET));
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto('./');
  const canvas = page.getByTestId('scene').locator('canvas');
  const narrow = await breadth(page);
  await page.setViewportSize({ width: 412, height: 915 });
  await expect.poll(() => breadth(page)).toBeGreaterThan(narrow);
  // The canvas fills its host's content box, borders aside.
  const inside = await page.getByTestId('scene').evaluate((el) => el.clientWidth);
  const drawn = await canvas.boundingBox();
  expect(drawn?.width).toBeCloseTo(inside, 0);
});

test('coming back out of a building, the street zooms out of it: a tap while it zooms is ignored', async ({
  page,
  hasTouch,
}) => {
  await page.clock.install();
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  const point = await pointOf(page, 'enter:1');
  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await holdTime(page);
  await press(page, /leave/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await tapAt(page, point, hasTouch);
  // Long past a zoom in's end: the tap landed while the street was zooming out, so nothing was entered.
  await page.clock.runFor(900);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await page.clock.resume();
  await tapAt(page, point, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
});
