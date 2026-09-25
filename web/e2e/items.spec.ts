import { expect, test, type Page } from '@playwright/test';
import { expectTouchable, press, saveText, tapOption, watchForErrors } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard; its first building Ornate Sanctum, 16 floors, 9 doors per corridor. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';
const LOBBY = `${STREET}.0.0`;
/** Grand Power Plant: four relics, the apartment's culture the header's (every take resonates). */
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

async function shoot(page: Page, name: string): Promise<void> {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await page.screenshot({ path: test.info().outputPath(`${test.info().project.name}-${name}.png`) });
}

function stat(page: Page, label: string) {
  return page.locator('.stat', { hasText: label }).locator('dd');
}

test('take an object: every tile is a button; the status names the frequency; the buffer count and the object count move; the object is gone', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(stat(page, 'Buffer')).toHaveText('0/16');
  await expect(page.locator('button.tile')).toHaveCount(4);
  await expect(page.getByTestId('buffer-full')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Take plasma coil with reliquary box' })).toHaveAttribute(
    'data-relic',
    'with|reliquary box|plasma coil',
  );
  await expectTouchable(page, 'room with takes');
  await shoot(page, '1-room-takes');
  await page.getByTestId('objects').scrollIntoViewIfNeeded();
  await page.screenshot({
    path: test.info().outputPath(`${test.info().project.name}-1a-room-take-tiles.png`),
  });

  // Step 1 of this room wins the free lottery (Guide:187; Void.test pins the roll): the prize lands after the relic.
  await tapOption(page, 'capture:0', hasTouch);
  await expect(page.getByTestId('status')).toHaveText(
    'Captured plasma coil with reliquary box. Frequency: 3194 Hz. Harmonic resonance: +10%. SPECTRAL_DEVIATION: Extracted Frequency 3493777 Hz.',
  );
  await expect(stat(page, 'Buffer')).toHaveText('2/16');
  await expect(stat(page, 'Steps')).toHaveText('1');
  await expect(page.getByTestId('coherence')).toHaveText('99%');
  await expect(page.locator('button.tile')).toHaveCount(3);
  await expect(page.locator('.prow').nth(1)).toHaveText(/OBJECTS_DETECTED\s*3/);
  await expect(page.locator('button.tile').first()).toHaveText(/brass censer fused to laser cutter/);
  expect(problems).toEqual([]);
});

test('the buffer: open it, merge two into a hybrid (+15), drop the hybrid in the next room, reload — everything kept; take it back at the same frequency', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }));
  await page.goto('./?debug');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await tapOption(page, 'capture:0', hasTouch); // step 1 wins the lottery too: [3194, the prize]
  await tapOption(page, 'capture:0', hasTouch);
  await tapOption(page, 'debug:integrity:40', hasTouch);
  await expect(stat(page, 'Buffer')).toHaveText('3/16');

  await press(page, /^buffer$/i, hasTouch);
  await expect(page.getByTestId('buffer-heading')).toHaveText('[QUANTUM_TRACE_BUFFER_SYNC...]');
  await expect(page.getByTestId('buffer-count')).toHaveText('03/16 FRAGMENTS');
  await expect(page.getByTestId('resonant-traces')).toHaveText('2');
  const rows = page.locator('.frag');
  await expect(rows).toHaveCount(3);
  await expect(rows.nth(0)).toContainText('3194Hz');
  await expect(rows.nth(0)).toContainText('[STABLE]');
  await expect(rows.nth(0)).toContainText('plasma coil with reliquary box');
  await expect(rows.nth(0).locator('.badge')).toHaveText('[RESONANT]');
  await expect(rows.nth(1)).toContainText('3493777Hz');
  await expect(rows.nth(1)).toContainText('Hidden Frequency');
  await expect(rows.nth(1).locator('.badge')).toHaveCount(0);
  await expect(rows.nth(2)).toContainText('3577Hz');
  await expect(rows.nth(2)).toContainText('[SHIFTING]');
  await expect(page.getByRole('button', { name: /back to reality/i })).toBeInViewport({ ratio: 1 });
  await expectTouchable(page, 'buffer with two fragments');
  await shoot(page, '2-buffer');

  await tapOption(page, 'pick:0', hasTouch);
  await expect(rows.nth(0)).toHaveClass(/selected/);
  await expect(rows.nth(0).locator('button[data-option="pick:0"]')).toHaveText(/UNSELECT/);
  await expect(rows.nth(2).locator('button[data-option="pick:2"]')).toHaveText(/MERGE/);
  await shoot(page, '2a-buffer-selected');
  await tapOption(page, 'pick:2', hasTouch);
  await expect(page.getByTestId('status')).toHaveText(
    'Synthesis complete: plasma-brass Hybrid (6771 Hz). Coherence +15.',
  );
  await expect(rows).toHaveCount(2);
  await expect(rows.nth(1)).toContainText('6771Hz');
  await expect(rows.nth(1)).toContainText('plasma-brass Hybrid');
  await expect(page.getByTestId('buffer-count')).toHaveText('02/16 FRAGMENTS');
  await shoot(page, '2b-buffer-merged');

  await press(page, /back to reality/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(page.getByTestId('coherence')).toHaveText('54%'); // 40, the buffer's own cost, fifteen back
  await expect(stat(page, 'Buffer')).toHaveText('2/16');

  await press(page, /go forward/i, hasTouch);
  await expect(page.getByTestId('place-name')).toHaveText('Baroque Maintenance Bay');
  await expect(page.locator('button.tile')).toHaveCount(4);
  await press(page, /^buffer$/i, hasTouch);
  await tapOption(page, 'drop:1', hasTouch);
  await expect(page.getByTestId('status')).toHaveText('Dropped plasma-brass Hybrid here.');
  await expect(page.getByTestId('buffer-empty')).toHaveCount(0); // the prize stays
  await expect(page.getByTestId('buffer-count')).toHaveText('01/16 FRAGMENTS');
  await press(page, /back to reality/i, hasTouch);
  await expect(page.locator('button.tile')).toHaveCount(5);
  await expect(page.locator('button.tile').last()).toHaveText(/plasma-brass Hybrid/);

  // A reload finds the hybrid on the floor, the prize alone in the buffer, the coherence and the tally kept.
  await page.reload();
  await expect(page.getByTestId('place-name')).toHaveText('Baroque Maintenance Bay');
  await expect(page.locator('button.tile')).toHaveCount(5);
  await expect(page.locator('button.tile').last()).toHaveText(/plasma-brass Hybrid/);
  await expect(stat(page, 'Buffer')).toHaveText('1/16');
  await expect(page.getByTestId('coherence')).toHaveText('52%'); // 54, go forward, the buffer
  await expect(page.getByTestId('telemetry')).toContainText('> Resonant traces: 2');
  await shoot(page, '3-room-dropped');

  await tapOption(page, 'capture:4', hasTouch);
  await expect(page.getByTestId('status')).toHaveText('Captured plasma-brass Hybrid. Frequency: 6771 Hz.');
  await expect(page.getByTestId('telemetry')).toContainText('> Resonant traces: 2');
  // The first room has two relics left; a reload there too.
  await press(page, /go back/i, hasTouch);
  await expect(page.locator('button.tile')).toHaveCount(2);
  await page.reload();
  await expect(page.locator('button.tile')).toHaveCount(2);
  await expect(stat(page, 'Buffer')).toHaveText('2/16');
  expect(problems).toEqual([]);
});

test('a full buffer: the tiles are not buttons, the pane says why, and a merge opens one slot', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(
    page,
    saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }, { buffer: Array.from({ length: 16 }, () => RELIC) }),
  );
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(stat(page, 'Buffer')).toHaveText('16/16');
  await expect(page.getByTestId('buffer-full')).toHaveText(
    'BUFFER FULL — merge or drop a fragment to take more.',
  );
  await expect(page.locator('.tile')).toHaveCount(4);
  await expect(page.locator('button.tile')).toHaveCount(0);
  await expect(page.locator('button[data-option^="capture:"]')).toHaveCount(0);
  await expectTouchable(page, 'room with a full buffer');
  await shoot(page, '4-room-full');
  await press(page, /^buffer$/i, hasTouch);
  await expect(page.locator('.frag')).toHaveCount(16);
  await expectTouchable(page, 'full buffer');
  await tapOption(page, 'pick:0', hasTouch);
  await tapOption(page, 'pick:15', hasTouch);
  await expect(page.locator('.frag')).toHaveCount(15);
  await press(page, /back to reality/i, hasTouch);
  await expect(stat(page, 'Buffer')).toHaveText('15/16');
  await expect(page.getByTestId('buffer-full')).toHaveCount(0);
  await expect(page.locator('button.tile')).toHaveCount(4);
  expect(problems).toEqual([]);
});

test('the recap lists the buffer and the tally', async ({ page, hasTouch }) => {
  const problems = watchForErrors(page);
  const visited = [
    ...['0', '0.0', '0.0.0', '0.0.0.0', '0.0.0.0.0', '0.0.0.0.0.0', '0.0.0.0.0.0.0', STREET],
    ...[0, 1, 2, 3].map((n) => `${STREET}.${String(n)}`),
    ...[1, 2, 3, 4, 5, 6, 7].map((n) => `0.0.0.0.0.0.0.${String(n)}`),
    '0.0.0.0.0.0.1',
  ];
  await plant(page, saveText(SEED, STREET, {}, { steps: 41, visited, buffer: [RELIC, RELIC], resonant: 3 }));
  await page.goto('./');
  await press(page, /end session/i, hasTouch);
  const figures = page.getByTestId('figures');
  await expect(figures.locator('dt')).toHaveText([
    'FINAL_LOCUS',
    'PULSE_TRAVERSAL',
    'CELLS_MAPPED',
    'BUFFER_DENSITY',
    'RESONANT_TRACES',
  ]);
  await expect(figures.locator('dd').nth(3)).toHaveText('2 spectral fragments');
  await expect(figures.locator('dd').nth(4)).toHaveText('3 resonant');
  expect(problems).toEqual([]);
});

test('on a desktop, 1 takes, I opens the buffer, 1 and 3 merge, B goes back', async ({ page, hasTouch }) => {
  test.skip(hasTouch, 'keys are a desktop extra');
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await page.keyboard.press('1'); // step 1 wins the lottery: two fragments
  await expect(stat(page, 'Buffer')).toHaveText('2/16');
  await page.keyboard.press('1');
  await expect(stat(page, 'Buffer')).toHaveText('3/16');
  await page.keyboard.press('i');
  await expect(page.getByTestId('buffer-heading')).toBeVisible();
  await page.keyboard.press('1');
  await page.keyboard.press('3');
  await expect(page.locator('.frag')).toHaveCount(2);
  await page.keyboard.press('b');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(stat(page, 'Buffer')).toHaveText('2/16');
  expect(problems).toEqual([]);
});

test('on a phone the buffer screen reads at 360 px: no sideways scroll, every button a thumb’s size, the way back on screen', async ({
  page,
  hasTouch,
}) => {
  test.skip(!hasTouch, 'phone only');
  const problems = watchForErrors(page);
  await page.setViewportSize({ width: 360, height: 640 });
  await plant(
    page,
    saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }, { buffer: Array.from({ length: 5 }, () => RELIC) }),
  );
  await page.goto('./');
  await expectTouchable(page, 'room at 360');
  await press(page, /^buffer$/i, hasTouch);
  await expect(page.locator('.frag')).toHaveCount(5);
  await expect(page.getByRole('button', { name: /back to reality/i })).toBeInViewport({ ratio: 1 });
  await expectTouchable(page, 'buffer at 360');
  await shoot(page, '5-buffer-360');
  expect(problems).toEqual([]);
});
