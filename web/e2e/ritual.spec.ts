import { expect, test, type Page } from '@playwright/test';
import { expectTouchable, press, saveText, tapOption, trailOf, watchForErrors } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard; its first building Ornate Sanctum, 16 floors, 9 doors per corridor. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';
const BUILDING = `${STREET}.0`;
const LOBBY = `${BUILDING}.0`;
const PEAK = `${BUILDING}.15`;
/** Grand Power Plant: four relics, the apartment's culture the header's (every take resonates). */
const FIRST_ROOM = `${LOBBY}.0.0.0`;
const KEYSTONE = { kind: 'keystone', building: BUILDING };
/** The ritual done: every floor sampled, seven merges in (Guide:263-270) — what the debug PRIME writes. */
const PRIMED = JSON.stringify({ elevator: 15, sampled: Array.from({ length: 16 }, (_, n) => n), merges: 7 });

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

test('scan a corridor: the door table as a panel under the narrative — trace, inscription, material, state, room type, the sensory line — cleared by the next step; at the elevator the strata pulse with this floor marked', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, LOBBY, { [LOBBY]: 'corridor' }));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
  await expect(page.getByTestId('scan')).toHaveCount(0);
  await press(page, /^scan$/i, hasTouch);
  const scan = page.getByTestId('scan');
  await expect(scan).toBeVisible();
  await expect(scan.locator('.heading')).toHaveText('[DATA_SUMMARY]');
  await expect(scan.locator('.srow')).toHaveCount(9);
  await expect(scan.locator('.srow').first()).toContainText('TRACE Ozone');
  await expect(scan.locator('.srow').first()).toContainText('INSCRIPTION _void_sink_');
  await expect(scan.locator('.srow').first()).toContainText('ROOM_TYPE Power Plant');
  await expect(scan.locator('.srow').first().locator('.snote')).toContainText(
    'A sharp smell of ozone escapes the frame',
  );
  await expect(page.getByTestId('coherence')).toHaveText('99%');
  await expect(stat(page, 'PULSE_TRAVERSAL')).toHaveText('0');
  await expectTouchable(page, 'corridor with a scan');
  await shoot(page, '1-scan-corridor');
  await press(page, /back to elevator/i, hasTouch);
  await expect(page.getByTestId('scan')).toHaveCount(0);
  await press(page, /^scan$/i, hasTouch);
  await expect(scan.locator('.heading')).toHaveText('NEURAL_PROXIMITY_REPORT');
  await expect(scan.locator('.tl').first()).toHaveText('BUILDING: Ornate Sanctum');
  await expect(scan.locator('.srow')).toHaveCount(3);
  await expect(scan.locator('.srow.you')).toHaveCount(1);
  await expect(scan.locator('.srow.you')).toContainText('TRANSIT_LOBBY');
  expect(problems).toEqual([]);
});

test('forge the Keystone: prime the building with the debug tool, take two relics, merge them — KEYSTONE_STABILIZED, a 0 Hz fragment without a badge', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }));
  await page.goto('./?debug');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(page.locator('.tag[data-fact="era"]')).toHaveText(/TEMPORAL_MARKER\s*FUTURE/);
  await tapOption(page, 'debug:prime', hasTouch);
  await expect(page.getByTestId('status')).toHaveText(
    'Building primed: every floor sampled, seven merges in.',
  );
  // The first take is step 1 of this room, which the lottery wins (Guide:187): the prize lands after the relic.
  await tapOption(page, 'capture:0', hasTouch);
  await expect(page.getByTestId('status')).toContainText(
    'SPECTRAL_DEVIATION: Extracted Frequency 3493777 Hz.',
  );
  await expect(stat(page, 'TRACE_BUFFER')).toHaveText('02/16');
  await tapOption(page, 'capture:0', hasTouch);
  await expect(stat(page, 'TRACE_BUFFER')).toHaveText('03/16');
  await press(page, /^buffer$/i, hasTouch);
  const rows = page.locator('.frag');
  await expect(rows).toHaveCount(3);
  await expect(rows.nth(1)).toContainText('Hidden Frequency');
  await tapOption(page, 'pick:0', hasTouch);
  await tapOption(page, 'pick:2', hasTouch);
  await expect(page.getByTestId('status')).toHaveText(
    'Critical waveform collapse: KEYSTONE_STABILIZED. The fragments merge into a silent, heavy anchor: Ornate Sanctum Keystone. Coherence +15.',
  );
  await expect(rows).toHaveCount(2);
  await expect(rows.nth(1)).toContainText('0Hz');
  await expect(rows.nth(1)).toContainText('Ornate Sanctum Keystone');
  await expect(rows.nth(1).locator('.badge')).toHaveCount(0);
  await shoot(page, '2-keystone-forged');
  await press(page, /back to reality/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  expect(problems).toEqual([]);
});

test('breach on the Peak and descend: the breach spends the Keystone, the lobby offers the descent, Layer −1 reads INTEGRITY in the void’s frame, the Artery and a Shard below; a reload continues below the bedrock', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(
    page,
    saveText(SEED, PEAK, { [BUILDING]: PRIMED }, { buffer: [KEYSTONE], visited: trailOf(PEAK) }),
  );
  await page.goto('./');
  await expect(page.getByTestId('place-name')).toHaveText('FLOOR 15');
  await expect(stat(page, 'TRACE_BUFFER')).toHaveText('01/16');
  const breach = page.getByRole('button', { name: /breach the bedrock/i });
  await expect(breach).toBeVisible();
  await expect(page.locator('.moves button')).toHaveCount(3);
  await expectTouchable(page, 'the Peak with the breach');
  await shoot(page, '3-breach-offered');
  // In the corridor too (HK-018), then back.
  await press(page, /enter corridor/i, hasTouch);
  await expect(page.getByRole('button', { name: /breach the bedrock/i })).toBeVisible();
  await press(page, /back to elevator/i, hasTouch);
  await press(page, /breach the bedrock/i, hasTouch);
  await expect(page.getByTestId('status')).toContainText('HARMONIC_INVERSION_PROTOCOL_ENGAGED');
  await expect(stat(page, 'TRACE_BUFFER')).toHaveText('00/16');
  await expect(page.getByRole('button', { name: /breach the bedrock/i })).toHaveCount(0);
  await expect(page.locator('.moves button')).toHaveCount(2);

  await press(page, /leave floor/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await expect(page.locator('.diag')).toHaveText('BEDROCK_BREACHED');
  await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(26);
  await expect(page.locator('button[data-option="enter:16"]')).toContainText('Layer -0x1');
  await expect(page.locator('button[data-option="enter:16"]')).toContainText('P: 10%');
  await tapOption(page, 'enter:15', hasTouch);
  await expect(page.getByTestId('place-name')).toHaveText('FLOOR 0');
  const descend = page.getByRole('button', { name: /descend into the substrate/i });
  await expect(descend).toBeVisible();
  await expect(page.getByRole('button', { name: /go down/i })).toHaveCount(0);
  await press(page, /descend into the substrate/i, hasTouch);

  await expect(page.getByTestId('place-kind')).toHaveText('LAYER');
  await expect(page.getByTestId('place-name')).toHaveText('LAYER -0X1');
  await expect(page.locator('.app')).toHaveAttribute('data-frame', 'abyssal');
  await expect(page.locator('.meter .ml')).toHaveText('INTEGRITY');
  await expect(page.locator('.stat', { hasText: 'ABYSSAL_DEPTH' })).toHaveCount(1);
  await expect(page.locator('.stat', { hasText: 'STRATA' }).locator('dd')).toHaveText('01/10');
  await expect(page.locator('.diag')).toHaveText('SYSTEM_STATUS: [ABYSS_SYNC]');
  await expect(page.getByTestId('telemetry')).toContainText('VOID_SYNC: [PRESSURE_HIGH]');
  await expect(page.getByTestId('coherence')).toHaveText('94%'); // 100: the corridor and back, the breach, leave, the lobby, the descent
  await expectTouchable(page, 'Layer -1');
  await shoot(page, '4-layer-hud');
  // Every prompt down here costs two (Guide:137-138).
  await press(page, /^scan$/i, hasTouch);
  await expect(page.getByTestId('coherence')).toHaveText('92%');
  await expect(page.getByTestId('scan').locator('.srow.you')).toContainText('ABYSSAL_SUBSTRATE');

  await page.reload();
  await expect(page.getByTestId('place-name')).toHaveText('LAYER -0X1');
  await expect(page.locator('.app')).toHaveAttribute('data-frame', 'abyssal');
  await expect(page.getByTestId('coherence')).toHaveText('92%');

  await press(page, /enter corridor/i, hasTouch);
  await expect(page.locator('.diag')).toHaveText('TRAFFIC: [PRESSURE_HIGH] | THEME: [ABYSSAL]');
  await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(9);
  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('SHARD');
  await expect(page.locator('.crumb.you .ic')).toHaveText('☠');
  await expect(page.locator('.tag[data-fact="era"]')).toHaveText(/TEMPORAL_MARKER\s*ATOMIC/);
  await expect(page.locator('button.tile')).toHaveCount(1);
  await expect(page.locator('button.tile').first()).toContainText('null reference infused with radar dish');
  await tapOption(page, 'capture:0', hasTouch);
  await expect(page.getByTestId('status')).toContainText('Frequency: 3458 Hz. Harmonic resonance: +10%.');
  await expectTouchable(page, 'a Shard');
  await shoot(page, '5-shard');
  await page.reload();
  await expect(page.getByTestId('place-kind')).toHaveText('SHARD');
  await expect(page.locator('button.tile')).toHaveCount(0);
  // The recap down here is the void's.
  await press(page, /end session/i, hasTouch);
  await expect(page.locator('.rh, h2').first()).toContainText('[VOID_RESONANCE_TERMINATION]');
  await expect(page.getByTestId('closing')).toHaveText('Sleep among the static, Operator.');
  await shoot(page, '6-void-recap');
  expect(problems).toEqual([]);
});

test('on a desktop, S scans, J breaches, D descends', async ({ page, hasTouch }) => {
  test.skip(hasTouch, 'keys are a desktop extra');
  const problems = watchForErrors(page);
  await plant(
    page,
    saveText(SEED, PEAK, { [BUILDING]: PRIMED }, { buffer: [KEYSTONE], visited: trailOf(PEAK) }),
  );
  await page.goto('./');
  await expect(page.getByTestId('place-name')).toHaveText('FLOOR 15');
  await page.keyboard.press('s');
  await expect(page.getByTestId('scan')).toBeVisible();
  await page.keyboard.press('j');
  await expect(page.getByTestId('status')).toContainText('HARMONIC_INVERSION_PROTOCOL_ENGAGED');
  for (let floor = 15; floor > 0; floor--) await page.keyboard.press('d');
  await expect(page.getByTestId('place-name')).toHaveText('FLOOR 0');
  await page.keyboard.press('d');
  await expect(page.getByTestId('place-name')).toHaveText('LAYER -0X1');
  expect(problems).toEqual([]);
});

test('on a phone at 360 px the scan panel and a Shard read without sideways scroll, every button a thumb’s size', async ({
  page,
  hasTouch,
}) => {
  test.skip(!hasTouch, 'phone only');
  const problems = watchForErrors(page);
  await page.setViewportSize({ width: 360, height: 640 });
  await plant(
    page,
    saveText(SEED, `${BUILDING}.16`, {
      [BUILDING]: '{"elevator":-1,"breached":true}',
      [`${BUILDING}.16`]: 'corridor',
    }),
  );
  await page.goto('./');
  await expect(page.getByTestId('place-name')).toHaveText('LAYER -0X1');
  await press(page, /^scan$/i, hasTouch);
  await expect(page.getByTestId('scan').locator('.srow')).toHaveCount(9);
  await expectTouchable(page, 'artery scan at 360');
  await shoot(page, '7-scan-360');
  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('SHARD');
  await expectTouchable(page, 'shard at 360');
  await shoot(page, '8-shard-360');
  expect(problems).toEqual([]);
});
