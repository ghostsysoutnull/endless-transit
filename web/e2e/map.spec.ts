import { expect, test, type Locator, type Page } from '@playwright/test';
import { expectTouchable, press, saveText, tapOption, trailOf, watchForErrors } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard, four buildings; its first building Ornate Sanctum, 16 floors, 9 doors per corridor. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';
const BUILDING = `${STREET}.0`;
const LOBBY = `${BUILDING}.0`;
/** Layer −1 is child 16 of the sixteen floors; its first Shard is behind its first Crypt. */
const LAYER = `${BUILDING}.16`;
const SHARD = `${LAYER}.0.0.0`;
const BREACHED = '{"elevator":-1,"breached":true}';

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

async function shoot(page: Page, name: string, at?: Locator): Promise<void> {
  if (at !== undefined) await at.scrollIntoViewIfNeeded();
  else {
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }
  await page.screenshot({ path: test.info().outputPath(`${test.info().project.name}-${name}.png`) });
}

/** The canvas fills its host's width, has a height, and is not blank: the strip it is asked about holds painted pixels. */
async function expectDrawn(host: Locator, where: string, strip: 'top' | 'bottom' = 'bottom'): Promise<void> {
  const canvas = host.locator('canvas');
  await expect(canvas, where).toBeVisible();
  const hostBox = await host.boundingBox();
  const box = await canvas.boundingBox();
  expect(box?.width ?? 0, `${where}: canvas width`).toBeGreaterThan(100);
  expect(
    Math.abs((box?.width ?? 0) - (hostBox?.width ?? 0)),
    `${where}: canvas fills its panel`,
  ).toBeLessThanOrEqual(2);
  expect(box?.height ?? 0, `${where}: canvas height`).toBeGreaterThan(60);
  const painted = await canvas.evaluate((node, band) => {
    const element = node as HTMLCanvasElement;
    const context = element.getContext('2d');
    if (context === null) return -1;
    const rows = 24 * Math.min(window.devicePixelRatio, 2);
    const y = band === 'top' ? 0 : element.height - rows;
    const data = context.getImageData(0, y, element.width, rows).data;
    let count = 0;
    for (let i = 0; i < data.length; i += 4) {
      if ((data[i] ?? 0) + (data[i + 1] ?? 0) + (data[i + 2] ?? 0) > 120) count++;
    }
    return count;
  }, strip);
  expect(painted, `${where}: painted pixels in the ${strip} strip`).toBeGreaterThan(50);
}

function stat(page: Page, label: string) {
  return page.locator('.stat', { hasText: label }).locator('dd');
}

test('on a street the pane beside the list is the drawn map; MAP draws it larger under the narrative with the legend, costs one and no step, and the next step clears it', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  const pane = page.getByTestId('pane-map');
  await expect(pane).toBeVisible();
  await expect(pane.locator('.heading')).toHaveText('[NEURAL_MAP: STREET]');
  await expect(pane.locator('.tl')).toHaveText('SCAN_ORIGIN: Bright Boulevard');
  await expect(pane.locator('.cv')).toHaveAttribute(
    'aria-label',
    'Lattice map of Bright Boulevard: 4 nodes, 0 visited.',
  );
  await expect(pane.locator('.vh li')).toHaveCount(4);
  await expect(pane.locator('.vh li').first()).toHaveText('⌂ Ornate Sanctum, unvisited');
  await expect(page.getByTestId('telemetry')).toHaveCount(0);
  await expectDrawn(pane.locator('.cv'), 'the pane map', 'bottom');
  await expect(page.getByTestId('map')).toHaveCount(0);
  await press(page, /^map$/i, hasTouch);
  const map = page.getByTestId('map');
  await expect(map).toBeVisible();
  await expect(map.locator('.heading')).toHaveText('[NEURAL_LATTICE_PROJECTION]');
  await expect(page.getByTestId('status')).toHaveText(
    'NEURAL_LATTICE_PROJECTION: 4 nodes plotted from Bright Boulevard.',
  );
  await expect(page.getByTestId('coherence')).toHaveText('99%');
  await expect(stat(page, 'Steps')).toHaveText('0');
  await expectDrawn(map.locator('.cv'), 'the MAP panel', 'bottom');
  await expectTouchable(page, 'street with the map');
  await shoot(page, '1-map-street');
  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('map')).toHaveCount(0);
  // Indoors the pane is the telemetry; the street's building is now visited on the map above.
  await expect(page.getByTestId('telemetry')).toBeVisible();
  await expect(page.getByTestId('pane-map')).toHaveCount(0);
  expect(problems).toEqual([]);
});

test('in a building MAP plots the doors of the floor; below 30 Coherence the map sprouts glitch marks and says how many', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, LOBBY, { [LOBBY]: 'corridor' }));
  await page.goto('./?debug');
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
  await press(page, /^map$/i, hasTouch);
  const map = page.getByTestId('map');
  await expect(map.locator('.tl')).toHaveText('SCAN_ORIGIN: Floor 0');
  await expect(map.locator('.vh li')).toHaveCount(9);
  await expect(map.locator('.cv')).toHaveAttribute(
    'aria-label',
    'Lattice map of Floor 0: 9 nodes, 0 visited.',
  );
  await expectDrawn(map.locator('.cv'), 'the floor map', 'top');
  await shoot(page, '2-map-floor', map);
  // The ladder's lowest rung above failure is 29; MAP costs one each: 28 sprouts one mark, 22 four.
  await tapOption(page, 'debug:integrity:29', hasTouch);
  await expect(page.getByTestId('map')).toHaveCount(0);
  await press(page, /^map$/i, hasTouch);
  await expect(page.getByTestId('coherence')).toHaveText('28%');
  await expect(map.locator('.cv')).toHaveAttribute(
    'aria-label',
    'Lattice map of Floor 0: 9 nodes, 0 visited, 1 glitch mark.',
  );
  for (let more = 0; more < 6; more++) await press(page, /^map$/i, hasTouch);
  await expect(page.getByTestId('coherence')).toHaveText('22%');
  await expect(map.locator('.cv')).toHaveAttribute(
    'aria-label',
    'Lattice map of Floor 0: 9 nodes, 0 visited, 4 glitch marks.',
  );
  await expectDrawn(map.locator('.cv'), 'the glitched map', 'bottom');
  await expectTouchable(page, 'glitched map');
  await shoot(page, '3-map-glitched', map);
  expect(problems).toEqual([]);
});

test('below the bedrock every node is ☠ in the void’s frame; TRACE draws the thread from the universe down to the Shard, BREACHED on the building, and lists it for a reader', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(
    page,
    saveText(SEED, SHARD, { [BUILDING]: BREACHED, [LAYER]: 'corridor' }, { visited: trailOf(SHARD) }),
  );
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('SHARD');
  await expect(page.locator('.app')).toHaveAttribute('data-frame', 'abyssal');
  // A room has no map (Guide:92): MAP says so and still costs one.
  await press(page, /^map$/i, hasTouch);
  await expect(page.getByTestId('status')).toHaveText(
    'SCAN_ERROR: Current location does not support spatial projection.',
  );
  await expect(page.getByTestId('map')).toHaveCount(0);
  await press(page, /exit crypt/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('LAYER');
  await press(page, /^map$/i, hasTouch);
  const map = page.getByTestId('map');
  await expect(map.locator('.vh li')).toHaveCount(9);
  await expect(map.locator('.vh li').first()).toHaveText(/^☠ .*, visited$/);
  await expectDrawn(map.locator('.cv'), 'the void map', 'bottom');
  await shoot(page, '4-map-void', map);
  await press(page, /^trace$/i, hasTouch);
  await expect(page.getByTestId('map')).toHaveCount(0);
  const trace = page.getByTestId('trace');
  await expect(trace).toBeVisible();
  await expect(trace.locator('.heading')).toHaveText('[NEURAL_LATTICE_TRACE_INITIATED]');
  // In the corridor the traveller stands on the Layer (the Artery is where its doors are listed): ten levels.
  await expect(trace.locator('.vh li')).toHaveCount(10);
  await expect(trace.locator('.vh li').nth(0)).toHaveText('[00] ∞ UNIVERSE : The Endless Universe');
  await expect(trace.locator('.vh li').nth(8)).toHaveText('[08] ⌂ BUILDING : Ornate Sanctum [BREACHED]');
  await expect(trace.locator('.vh li').nth(9)).toHaveText('>> [09] ▤ LAYER : Layer -0x1');
  await expectDrawn(trace.locator('.cv'), 'the trace', 'top');
  await expectTouchable(page, 'the trace below the bedrock');
  await shoot(page, '5-trace-void', trace);
  expect(problems).toEqual([]);
});

test('TRACE on a street, from the universe down, on both devices; on a phone the dock’s MORE opens, the step folds it, and it opens and closes again', async ({
  page,
  hasTouch,
  isMobile,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  const more = page.getByTestId('more');
  const traceButton = page.getByRole('button', { name: /^trace$/i });
  if (isMobile) {
    // The fold is the phone's (I09): TRACE waits behind MORE, a real disclosure.
    await expect(more).toHaveText('MORE');
    await expect(more).toHaveAttribute('aria-expanded', 'false');
    await expect(traceButton).toHaveCount(0);
  } else {
    await expect(more).toBeHidden();
    await expect(traceButton).toBeVisible();
  }
  await press(page, /^trace$/i, hasTouch);
  // The step folds the dock again.
  if (isMobile) await expect(more).toHaveText('MORE');
  const trace = page.getByTestId('trace');
  await expect(trace.locator('.vh li')).toHaveCount(8);
  await expect(trace.locator('.vh li').nth(4)).toHaveText('[04] ⊕ PLANET : Auraea [SURFACE | ERA: FUTURE]');
  await expect(trace.locator('.vh li').nth(7)).toHaveText('>> [07] ═ STREET : Bright Boulevard');
  await expectDrawn(trace.locator('.cv'), 'the street trace', 'top');
  await expectTouchable(page, 'street with the trace');
  await shoot(page, '6-trace-street', trace);
  if (isMobile) {
    await (hasTouch ? more.tap() : more.click());
    await expect(more).toHaveText('LESS');
    await expect(more).toHaveAttribute('aria-expanded', 'true');
    await expect(traceButton).toBeVisible();
    await (hasTouch ? more.tap() : more.click());
    await expect(more).toHaveText('MORE');
    await expect(traceButton).toHaveCount(0);
  }
  expect(problems).toEqual([]);
});

test('on a desktop, M draws the map', async ({ page, hasTouch }) => {
  test.skip(hasTouch, 'keys are a desktop extra');
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await page.keyboard.press('m');
  await expect(page.getByTestId('map')).toBeVisible();
  expect(problems).toEqual([]);
});

test('on a phone at 360 px the map and the trace fit without sideways scroll, every button a thumb’s size', async ({
  page,
  hasTouch,
}) => {
  test.skip(!hasTouch, 'phone only');
  const problems = watchForErrors(page);
  await page.setViewportSize({ width: 360, height: 640 });
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await press(page, /^map$/i, hasTouch);
  await expectDrawn(page.getByTestId('map').locator('.cv'), 'the map at 360', 'bottom');
  await expectTouchable(page, 'map at 360');
  await shoot(page, '7-map-360', page.getByTestId('map'));
  await press(page, /^trace$/i, hasTouch);
  await expectDrawn(page.getByTestId('trace').locator('.cv'), 'the trace at 360', 'top');
  await expectTouchable(page, 'trace at 360');
  await shoot(page, '8-trace-360', page.getByTestId('trace'));
  expect(problems).toEqual([]);
});
