import { expect, test } from '@playwright/test';
import { press, watchForErrors } from './support/harness.ts';

const SEED_FORM = /^[0-9A-F]{4}(-[0-9A-F]{4}){3}$/;

test('loads under the base path, with no console errors and no failed request', async ({ page, baseURL }) => {
  const problems = watchForErrors(page);
  const requested: string[] = [];
  page.on('request', (request) => requested.push(request.url()));
  await page.goto('./');
  // The base comes from the config (ET_BASE moves it) — never a literal here.
  expect(baseURL).toBeDefined();
  expect(page.url()).toBe(baseURL);
  expect(requested.length).toBeGreaterThan(1);
  for (const url of requested) expect(url.startsWith(baseURL ?? '?'), url).toBe(true);
  await expect(page.getByRole('heading', { name: 'ENDLESS TRANSIT' })).toBeVisible();
  await expect(page.getByTestId('prompt')).toBeVisible();
  await expect(page.getByRole('button')).toHaveCount(1);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('14px "IBM Plex Mono"'))).toBe(true);
  expect(problems).toEqual([]);
});

test('new world shows a seed and a name; re-roll changes them; reload restores the last one', async ({
  page,
  hasTouch,
}, testInfo) => {
  const problems = watchForErrors(page);
  await page.goto('./');
  await page.screenshot({
    path: testInfo.outputPath(`${testInfo.project.name}-1-title.png`),
    fullPage: true,
  });

  await press(page, /new world/i, hasTouch);
  const seed = page.getByTestId('world-seed');
  const name = page.getByTestId('world-name');
  await expect(seed).toHaveText(SEED_FORM);
  await expect(name).toHaveText(/^\S+( \S+)+$/);
  await expect(page.getByTestId('status')).toContainText('drawn');
  const firstSeed = await seed.innerText();

  await press(page, /re-roll/i, hasTouch);
  await expect(seed).not.toHaveText(firstSeed);
  await expect(seed).toHaveText(SEED_FORM);
  const lastSeed = await seed.innerText();
  const lastName = await name.innerText();
  await page.screenshot({
    path: testInfo.outputPath(`${testInfo.project.name}-2-world.png`),
    fullPage: true,
  });

  await page.reload();
  await expect(seed).toHaveText(lastSeed);
  await expect(name).toHaveText(lastName);
  await expect(page.getByTestId('status')).toContainText(/restored/i);
  await expect(page.getByRole('button', { name: /re-roll/i })).toBeVisible();
  expect(problems).toEqual([]);
});

test('the same seed always carries the same name (the engine is deterministic in the browser too)', async ({
  page,
  hasTouch,
}) => {
  await page.goto('./');
  await press(page, /new world/i, hasTouch);
  const seed = await page.getByTestId('world-seed').innerText();
  const name = await page.getByTestId('world-name').innerText();
  await page.reload();
  await expect(page.getByTestId('world-seed')).toHaveText(seed);
  await expect(page.getByTestId('world-name')).toHaveText(name);
});

test('no horizontal overflow, and every action is a button at least 44 × 44 CSS px', async ({
  page,
  hasTouch,
}) => {
  await page.goto('./');
  for (const step of ['title', 'world'] as const) {
    if (step === 'world') await press(page, /new world/i, hasTouch);
    const overflow = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    }));
    expect(overflow.content, `${step}: horizontal overflow`).toBeLessThanOrEqual(overflow.viewport);

    const buttons = page.getByRole('button');
    expect(await buttons.count()).toBeGreaterThan(0);
    for (const button of await buttons.all()) {
      const box = await button.boundingBox();
      expect(box?.width ?? 0, `${step}: button width`).toBeGreaterThanOrEqual(44);
      expect(box?.height ?? 0, `${step}: button height`).toBeGreaterThanOrEqual(44);
    }
    expect(await page.locator('[data-option]:not(button)').count()).toBe(0);
  }
});

test('still fits at 360 px wide, the narrowest phone we promise', async ({ page, hasTouch }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto('./');
  await press(page, /new world/i, hasTouch);
  const overflow = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(overflow.content).toBeLessThanOrEqual(overflow.viewport);
  expect(overflow.viewport).toBe(360);
  await expect(page.getByTestId('world-seed')).toBeVisible();
});

test('reduced motion is respected: the sigil stops pulsing', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const animation = await page.locator('.sigil').evaluate((el) => getComputedStyle(el).animationName);
  expect(animation).toBe('none');
});

test('the keyboard is an extra: N draws a world, R re-rolls', async ({ page, hasTouch }) => {
  test.skip(hasTouch, 'a phone has no keyboard — nothing may depend on one');
  await page.goto('./');
  await page.keyboard.press('n');
  const seed = page.getByTestId('world-seed');
  await expect(seed).toHaveText(SEED_FORM);
  const first = await seed.innerText();
  await page.keyboard.press('r');
  await expect(seed).not.toHaveText(first);
});

test('a build stamp is visible, so a tester can tell which build a phone is showing', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByTestId('build')).toBeVisible();
  await expect(page.getByTestId('build')).toHaveText(/^build \S+$/);
});
