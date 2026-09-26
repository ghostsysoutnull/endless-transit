import { expect, test, type Page } from '@playwright/test';
import { expectTouchable, press, saveText, tapOption, watchForErrors } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: Bright Boulevard; Ornate Sanctum, 16 floors, 9 doors; the first door opens on Grand Power Plant. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';
const LOBBY = `${STREET}.0.0`;
const FIRST_ROOM = `${LOBBY}.0.0.0`;

async function plant(page: Page, path: string | null, states: Record<string, string> = {}): Promise<void> {
  await page.addInitScript(
    ([slot, text]) => {
      if (window.sessionStorage.getItem('planted') !== null) return;
      window.sessionStorage.setItem('planted', 'yes');
      window.localStorage.setItem(slot, text);
    },
    [SLOT, saveText(SEED, path, states)] as const,
  );
}

async function shoot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: test.info().outputPath(`${test.info().project.name}-${name}.png`) });
}

/** Whether `inner` sits to the right of `outer` — in the desktop grid's second column. */
async function rightOf(page: Page, inner: string, outer: string): Promise<boolean> {
  const a = await page.locator(inner).boundingBox();
  const b = await page.locator(outer).boundingBox();
  return a !== null && b !== null && a.x >= b.x + b.width;
}

test('a room reads like the old game: its interpretation, furniture, the object count, the RESONANCE line, and its objects as tiles', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, FIRST_ROOM, { [LOBBY]: 'corridor' });
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(page.getByTestId('place-name')).toHaveText('Grand Power Plant');
  await expect(page.locator('.desc p').nth(0)).toHaveText(
    'You are in gantry-braced architecture that vibrates with every pulse. The walls are blue silk damask with gold thread.',
  );
  await expect(page.locator('.desc p').nth(1)).toHaveText(
    'The space is illuminated by a soft holographic haze with no visible source.',
  );
  await expect(page.locator('.tag')).toHaveCount(6); // TEMPORAL_MARKER (I07), TYPE, OXY, TEMP, SIGNAL, RESONANCE
  await expect(page.locator('.tag[data-fact="stable"]')).toHaveText(/RESONANCE\s+\[STABLE\]/);
  await expect(page.locator('.prow').nth(0)).toHaveText(
    /FURNITURE\s*half-dismantled stained glass shard, scorched funeral mask/,
  );
  await expect(page.locator('.prow').nth(1)).toHaveText(/OBJECTS_DETECTED\s*4/);
  const tiles = page.locator('.tile');
  await expect(tiles).toHaveCount(4);
  await expect(tiles.first()).toContainText('plasma coil with reliquary box');
  await expect(tiles.first()).toHaveAttribute('data-relic', 'with|reliquary box|plasma coil');
  // Every tile is a take (I06): a real button carrying the option.
  await expect(page.locator('button.tile[data-option="capture:0"]')).toHaveCount(1);
  await expect(page.getByTestId('telemetry')).toContainText('[SYSTEM_TELEMETRY]');
  await expect(page.getByTestId('telemetry')).toContainText('> Trace: 0.0.0.0.0.0.0.0.0.0.0.0.0');
  // Each pane of the aside is a region with its own name (an aside called "Telemetry" that opens with IN THIS ROOM misleads).
  await expect(page.getByRole('region', { name: 'In this room' })).toHaveCount(1);
  await expect(page.getByRole('region', { name: 'System telemetry' })).toHaveCount(1);
  await expect(page.locator('.travel')).toHaveCount(0);
  await expectTouchable(page, 'room');
  await shoot(page, '5-room-rich');
  await page.getByTestId('objects').scrollIntoViewIfNeeded();
  await shoot(page, '5a-room-objects');

  // The next room: its own furniture and objects, the way out gone.
  await press(page, /go forward/i, hasTouch);
  await expect(page.getByTestId('place-name')).toHaveText('Baroque Maintenance Bay');
  await expect(page.locator('.prow').nth(0)).toContainText('bolted-down velvet kneeling-rug');
  await expect(tiles.first()).toContainText('velvet kneeling-rug fused to optic implant');
  expect(problems).toEqual([]);
});

test('a door tells its full appearance under its name on the corridor list; one door in the lobby is inscribed and says how', async ({
  page,
}) => {
  const problems = watchForErrors(page);
  await plant(page, LOBBY, { [LOBBY]: 'corridor' });
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
  const doors = page.locator('button[data-option^="enter:"]');
  await expect(doors).toHaveCount(9);
  await expect(doors.first().locator('.rd[data-fact="narrative"]')).toContainText(
    "A massive brutalist slab of pitted concrete. The surface is heavily scarred by micro-impacts and substrate decay. The word 'void_sink' is scrawled across the surface in jagged, desperate lines.",
  );
  await expect(doors.first().locator('.rd[data-fact="narrative"] .vh')).toHaveText('APPEARANCE');
  await expect(doors.nth(1).locator('.rd[data-fact="narrative"]')).toContainText(
    'A timber gate under many coats of black lacquer.',
  );
  await expectTouchable(page, 'corridor');
  await shoot(page, '6-corridor-doors');
  expect(problems).toEqual([]);
});

test('on a desktop the right column is filled on the elevator and in a room: the telemetry pane, and the room’s objects; the map outdoors', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'the two-column layout is the desktop’s');
  const problems = watchForErrors(page);
  await plant(page, LOBBY);
  await page.goto('./');
  await expect(page.getByTestId('place-name')).toHaveText('Floor 0');
  await expect(page.getByTestId('telemetry')).toBeVisible();
  await expect(page.getByTestId('telemetry')).toBeInViewport({ ratio: 1 });
  expect(await rightOf(page, '.aside', '.cap')).toBe(true);
  await expect(page.locator('.travel')).toHaveCount(0);
  await shoot(page, '7-elevator-column');

  await press(page, /enter corridor/i, false);
  await tapOption(page, 'enter:0', false);
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(page.getByTestId('objects')).toBeInViewport({ ratio: 1 });
  expect(await rightOf(page, '.aside', '.cap')).toBe(true);
  expect(await rightOf(page, '.aside', '.moves')).toBe(true);

  // Exit the apartment (onto the floor), leave the floor, leave the building: the street.
  for (let level = 0; level < 3; level++) await press(page, /leave|exit/i, false);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expect(page.getByTestId('telemetry')).toHaveCount(0);
  await expect(page.getByTestId('objects')).toHaveCount(0);
  // Outdoors the pane is the drawn map (I08; Guide:339), still to the right of the narrative.
  await expect(page.getByTestId('pane-map')).toBeVisible();
  expect(await rightOf(page, '.aside', '.cap')).toBe(true);
  expect(problems).toEqual([]);
});

test('on a phone the objects sit under the moves, before the way out, and every tile reads at 360 px', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'the one-column layout is the phone’s');
  const problems = watchForErrors(page);
  await page.setViewportSize({ width: 360, height: 640 });
  await plant(page, FIRST_ROOM, { [LOBBY]: 'corridor' });
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  const moves = await page.locator('.moves').boundingBox();
  const objects = await page.getByTestId('objects').boundingBox();
  expect(objects?.y ?? 0).toBeGreaterThan((moves?.y ?? 0) + (moves?.height ?? 0));
  for (const tile of await page.locator('.tile').all()) {
    const box = await tile.boundingBox();
    expect(box?.width ?? 0).toBeLessThanOrEqual(360 - 32);
    expect(await tile.evaluate((node) => parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThanOrEqual(
      14,
    );
  }
  await expectTouchable(page, '360px room');
  await page.getByTestId('objects').scrollIntoViewIfNeeded();
  await shoot(page, '8-room-360-objects');
  expect(await page.evaluate(() => document.documentElement.clientWidth)).toBe(360);
  expect(problems).toEqual([]);
});

test('the elevator screen at the street’s first building: TECH_ERA, RESONANCE, STABILITY and ATMOS_SHIFT, the dealt sentence, the telemetry', async ({
  page,
}) => {
  const problems = watchForErrors(page);
  await plant(page, STREET);
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  // The street's own chips read in plain words since U01b (Decision 16); the floor keeps its own below.
  await expect(page.locator('.tag[data-fact="era"]')).toHaveText(/Era\s+Future/);
  await expect(page.locator('.tag[data-fact="culture"]')).toHaveText(/Culture\s+Baroque/);
  await tapOption(page, 'enter:0', false);
  await tapOption(page, 'enter:15', false);
  await expect(page.getByTestId('place-name')).toHaveText('Floor 0');
  await expect(page.locator('.tag')).toHaveCount(4);
  await expect(page.locator('.desc p').nth(0)).toHaveText(
    'Floor 0. BAROQUE geometry presses in from every wall; the elevator sighs shut behind you.',
  );
  await expect(page.getByTestId('telemetry').locator('.bars span')).toHaveCount(5);
  expect(problems).toEqual([]);
});
