import { expect, test, type Page } from '@playwright/test';
import { expectTouchable, press, saveText, tapOption, watchForErrors } from './support/harness.ts';

/**
 * The full playthrough (I10): one session from the title to the void and back, as a player would tap it,
 * on both profiles against the production build. Run alone with `npx playwright test --grep @playthrough`.
 */
const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard; its first building Ornate Sanctum, 16 floors, 9 doors per corridor. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const PEAK = 15;

async function shoot(page: Page, name: string): Promise<void> {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await page.screenshot({ path: test.info().outputPath(`${test.info().project.name}-${name}.png`) });
}

function stat(page: Page, label: string) {
  return page.locator('.stat', { hasText: label }).locator('dd');
}

async function bufferSize(page: Page): Promise<number> {
  return Number((await stat(page, 'TRACE_BUFFER').innerText()).split('/')[0]);
}

test(
  'the whole game from the title: new world, street, building, elevator, corridor, door, room, take, merge, scan, map, the ritual under ?debug, the breach, the descent, a Layer, the recap, the title, and a reload that continues',
  { tag: '@playthrough' },
  async ({ page, hasTouch }) => {
    const problems = watchForErrors(page);

    // The title: NEW WORLD draws a seed and a name from the browser's entropy.
    await page.goto('./?debug');
    await expect(page.getByRole('heading', { name: 'ENDLESS TRANSIT' })).toBeVisible();
    await press(page, /new world/i, hasTouch);
    await expect(page.getByTestId('world-seed')).toHaveText(/^[0-9A-F]{4}(-[0-9A-F]{4}){3}$/);
    await expect(page.getByTestId('status')).toContainText('drawn');
    await shoot(page, '1-title-world');
    // A drawn world is a save with a seed and no place; the rest of the walk needs a known one, so the seed
    // is swapped for the fixed world exactly as the game stores it, and the title picks it up on reload.
    await page.evaluate(
      ([slot, text]) => {
        window.localStorage.setItem(slot, text);
      },
      [SLOT, saveText(SEED, null)] as const,
    );
    await page.reload();
    await expect(page.getByTestId('world-seed')).toHaveText(SEED);
    await press(page, /enter world/i, hasTouch);

    // The street, the building, the elevator up and down, the corridor, a door.
    await expect(page.getByTestId('place-kind')).toHaveText('STREET');
    await expect(page.getByTestId('place-name')).toHaveText('BRIGHT BOULEVARD');
    await expect(page.getByTestId('coherence')).toHaveText('100%');
    await expectTouchable(page, 'street');
    await tapOption(page, 'enter:0', hasTouch);
    await expect(page.getByTestId('place-name')).toHaveText('ORNATE SANCTUM');
    await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(16);
    await tapOption(page, `enter:${String(PEAK)}`, hasTouch); // the lobby is listed last
    await expect(page.getByTestId('place-name')).toHaveText('FLOOR 0');
    await press(page, /go up/i, hasTouch);
    await expect(page.getByTestId('place-name')).toHaveText('FLOOR 1');
    await press(page, /go down/i, hasTouch);
    await expect(page.getByTestId('place-name')).toHaveText('FLOOR 0');
    await press(page, /enter corridor/i, hasTouch);
    await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(9);
    await expectTouchable(page, 'corridor');
    await shoot(page, '2-corridor');
    await tapOption(page, 'enter:0', hasTouch);
    await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
    await expect(page.getByTestId('place-name')).toHaveText('GRAND POWER PLANT');
    await expect(page.locator('button.tile')).toHaveCount(4);
    await expect(page.getByTestId('coherence')).toHaveText('94%');
    await expect(stat(page, 'PULSE_TRAVERSAL')).toHaveText('6');

    // Two takes, then the buffer: a merge gives fifteen back.
    await tapOption(page, 'capture:0', hasTouch);
    await expect(page.getByTestId('status')).toContainText(/^Captured .* Frequency: \d+ Hz\./);
    await tapOption(page, 'capture:0', hasTouch);
    await expect(page.locator('button.tile')).toHaveCount(2);
    expect(await bufferSize(page)).toBeGreaterThanOrEqual(2);
    await expect(page.getByTestId('coherence')).toHaveText('92%');
    await expectTouchable(page, 'room after two takes');
    await press(page, /^buffer$/i, hasTouch);
    await expect(page.getByTestId('buffer-heading')).toBeVisible();
    const held = await page.locator('.frag').count();
    await tapOption(page, 'pick:0', hasTouch);
    await tapOption(page, 'pick:1', hasTouch);
    await expect(page.getByTestId('status')).toContainText(
      /^Synthesis complete: .* Hybrid \(\d+ Hz\)\. Coherence \+15\.$/,
    );
    await expect(page.locator('.frag')).toHaveCount(held - 1);
    await expectTouchable(page, 'buffer after the merge');
    await shoot(page, '3-buffer-merged');
    await press(page, /back to reality/i, hasTouch);
    await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
    await expect(page.getByTestId('coherence')).toHaveText('100%'); // 92, the buffer's one, fifteen back, capped

    // SCAN in the room reads the apartment; MAP in the corridor plots the doors. Each costs one and no step.
    await press(page, /^scan$/i, hasTouch);
    await expect(page.getByTestId('scan')).toBeVisible();
    await expect(page.getByTestId('coherence')).toHaveText('99%');
    await press(page, /exit apartment/i, hasTouch);
    await expect(page.getByTestId('scan')).toHaveCount(0);
    await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(9);
    await press(page, /^map$/i, hasTouch);
    await expect(page.getByTestId('map')).toBeVisible();
    await expect(page.getByTestId('status')).toHaveText(/^NEURAL_LATTICE_PROJECTION: 9 nodes plotted from /);
    await expect(page.getByTestId('coherence')).toHaveText('97%');
    await expect(stat(page, 'PULSE_TRAVERSAL')).toHaveText('9');
    await expectTouchable(page, 'corridor with the map');
    await shoot(page, '4-map-corridor');

    // The ritual under ?debug: PRIME stands in for a floor-by-floor run; the next merge inside forges the Keystone.
    await tapOption(page, 'enter:0', hasTouch);
    await expect(page.getByTestId('place-name')).toHaveText('GRAND POWER PLANT');
    await tapOption(page, 'debug:prime', hasTouch);
    await expect(page.getByTestId('status')).toHaveText(
      'Building primed: every floor sampled, seven merges in.',
    );
    await tapOption(page, 'capture:0', hasTouch);
    await press(page, /^buffer$/i, hasTouch);
    await tapOption(page, 'pick:0', hasTouch);
    await tapOption(page, 'pick:1', hasTouch);
    await expect(page.getByTestId('status')).toContainText('KEYSTONE_STABILIZED');
    await expect(page.locator('.frag', { hasText: 'Ornate Sanctum Keystone' })).toHaveCount(1);
    await press(page, /back to reality/i, hasTouch);
    await expect(page.getByTestId('coherence')).toHaveText('100%');

    // To the Peak: the breach spends the Keystone; floor 0 then descends.
    await press(page, /exit apartment/i, hasTouch);
    await press(page, /back to elevator/i, hasTouch);
    for (let floor = 1; floor <= PEAK; floor++) {
      await press(page, /go up/i, hasTouch);
      await expect(page.getByTestId('place-name')).toHaveText(`FLOOR ${String(floor)}`);
    }
    await expect(page.getByTestId('coherence')).toHaveText('83%');
    await press(page, /breach the bedrock/i, hasTouch);
    await expect(page.getByTestId('status')).toContainText('HARMONIC_INVERSION_PROTOCOL_ENGAGED');
    await expect(page.locator('.frag', { hasText: 'Keystone' })).toHaveCount(0);
    await press(page, /leave floor/i, hasTouch);
    await expect(page.locator('.diag')).toHaveText('BEDROCK_BREACHED');
    await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(26);
    await tapOption(page, `enter:${String(PEAK)}`, hasTouch);
    await expect(page.getByTestId('place-name')).toHaveText('FLOOR 0');
    await press(page, /descend into the substrate/i, hasTouch);
    await expect(page.getByTestId('place-kind')).toHaveText('LAYER');
    await expect(page.getByTestId('place-name')).toHaveText('LAYER -0X1');
    await expect(page.locator('.app')).toHaveAttribute('data-frame', 'abyssal');
    await expect(page.locator('.meter .ml')).toHaveText('INTEGRITY');
    await expect(page.getByTestId('coherence')).toHaveText('79%');
    await expectTouchable(page, 'Layer -1');
    await shoot(page, '5-layer');

    // The recap below the bedrock is the void's; ending it goes to the title, and the world waits behind CONTINUE.
    await press(page, /end session/i, hasTouch);
    await expect(page.getByTestId('recap-heading')).toHaveText('[VOID_RESONANCE_TERMINATION]');
    await expect(page.getByTestId('closing')).toHaveText('Sleep among the static, Operator.');
    await press(page, /end session/i, hasTouch);
    await expect(page.getByTestId('world-seed')).toHaveText(SEED);
    await expect(page.getByRole('button', { name: /continue/i })).toBeVisible();

    // CONTINUE, then a reload: the same Layer, the same Integrity (a reload never stops at the title once a place is saved).
    await press(page, /continue/i, hasTouch);
    await expect(page.getByTestId('place-name')).toHaveText('LAYER -0X1');
    await expect(page.getByTestId('coherence')).toHaveText('77%'); // the recap cost two, below the bedrock
    await page.reload();
    await expect(page.getByTestId('status')).toHaveText(`Restored world ${SEED} at Layer -0x1.`);
    await expect(page.getByTestId('place-name')).toHaveText('LAYER -0X1');
    await expect(page.locator('.app')).toHaveAttribute('data-frame', 'abyssal');
    await expect(page.getByTestId('coherence')).toHaveText('77%');
    expect(problems).toEqual([]);
  },
);
