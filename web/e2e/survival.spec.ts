import { expect, test, type Page } from '@playwright/test';
import { expectTouchable, press, saveText, tapOption, trailOf, watchForErrors } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard; its first building Ornate Sanctum, 16 floors, 9 doors per corridor. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';
const CITY = '0.0.0.0.0.0.0';
const COUNTRY = '0.0.0.0.0.0';
const BUILDING = `${STREET}.0`;
const LOBBY = `${BUILDING}.0`;
const FIRST_ROOM = `${LOBBY}.0.0.0`;
/** The static a corrupted line is made of (Glitch.ts). */
const STATIC = /[█▓▒░/\\%!$#*]/;

/** Plants a save once per test — a reload inside the test must find what the game itself wrote. */
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

/** A viewport shot from the top of the page — the HUD is what these screens are about. */
async function shoot(page: Page, name: string, fromTop = true): Promise<void> {
  if (fromTop) {
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }
  await page.screenshot({ path: test.info().outputPath(`${test.info().project.name}-${name}.png`) });
}

async function expectMeter(page: Page, coherence: number, band: string, steps: number): Promise<void> {
  await expect(page.getByTestId('coherence')).toHaveText(`${String(coherence)}%`);
  await expect(page.getByTestId('meter')).toHaveAttribute('data-band', band);
  await expect(page.getByRole('meter', { name: 'COHERENCE' })).toHaveAttribute(
    'aria-valuenow',
    String(coherence),
  );
  await expect(page.locator('.stat', { hasText: 'PULSE_TRAVERSAL' }).locator('dd')).toHaveText(String(steps));
}

test('the HUD shows Coherence and the step count: a move costs one and counts one, the title screen costs one and counts none', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expectMeter(page, 100, 'stable', 0);
  await expect(page.locator('.cohbar i')).toHaveAttribute('style', /width:\s*100%/);
  await tapOption(page, 'enter:0', hasTouch);
  await expectMeter(page, 99, 'stable', 1);
  await expect(page.locator('.cohbar i')).toHaveAttribute('style', /width:\s*99%/);
  await press(page, /title screen/i, hasTouch);
  await press(page, /continue/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await expectMeter(page, 98, 'stable', 1);
  await expectTouchable(page, 'building with the meter');
  await shoot(page, '1-hud-stable');
  expect(problems).toEqual([]);
});

test('debug mode: the bar changes with the thresholds — yellow from 69, static in the description under 40, red from 29 (Guide:151-156)', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }));
  await page.goto('./?debug');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  const debug = page.getByTestId('debug');
  // The strip is folded behind one DEBUG button (I09), below the dock and out of the tab order.
  const toggle = page.getByTestId('debug-toggle');
  await expect(debug.getByRole('button')).toHaveCount(1);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toHaveAttribute('tabindex', '-1');
  expect((await debug.boundingBox())?.y ?? 0).toBeGreaterThanOrEqual(
    (await page.locator('.dock').boundingBox())?.y ?? 0,
  );
  await (hasTouch ? toggle.tap() : toggle.click());
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(debug.getByRole('button')).toHaveCount(11); // DEBUG, the INTEGRITY ladder, PRIME and KEYSTONE (I07)
  await expect(page.locator('button[data-option^="debug:"]:not([tabindex="-1"])')).toHaveCount(0);
  const clean = await page.locator('.desc').innerText();
  expect(clean).not.toMatch(STATIC);

  await tapOption(page, 'debug:integrity:70', hasTouch);
  await expectMeter(page, 70, 'stable', 0);
  await tapOption(page, 'debug:integrity:69', hasTouch);
  await expectMeter(page, 69, 'degraded', 0);
  expect(await page.locator('.desc').innerText()).toBe(clean);
  await shoot(page, '2a-hud-degraded');

  await tapOption(page, 'debug:integrity:40', hasTouch);
  expect(await page.locator('.desc').innerText()).toBe(clean);
  await tapOption(page, 'debug:integrity:39', hasTouch);
  await expectMeter(page, 39, 'degraded', 0);
  const corrupt = await page.locator('.desc').innerText();
  expect(corrupt).toMatch(STATIC);
  expect(corrupt).not.toBe(clean);
  await shoot(page, '2b-hud-corrupting');

  await tapOption(page, 'debug:integrity:30', hasTouch);
  await expectMeter(page, 30, 'degraded', 0);
  await tapOption(page, 'debug:integrity:29', hasTouch);
  await expectMeter(page, 29, 'critical', 0);
  expect(await page.locator('.desc').innerText()).toBe(corrupt);
  await expectTouchable(page, 'room in debug mode');
  await shoot(page, '2c-hud-critical');
  expect(problems).toEqual([]);
});

test('debug mode is only on with ?debug: the plain page has no debug strip', async ({ page }) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expect(page.getByTestId('debug')).toHaveCount(0);
  await expect(page.locator('button[data-option^="debug:"]')).toHaveCount(0);
  expect(problems).toEqual([]);
});

test('play until death and continue: the failure screen, REBUILD, the same seed on the starting street with 100 — steps and visited places kept', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }, { coherence: 3, steps: 7 }));
  await page.goto('./?debug');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expectMeter(page, 3, 'critical', 7);
  await tapOption(page, 'debug:integrity:1', hasTouch);
  await expectMeter(page, 1, 'critical', 7);

  await press(page, /go forward/i, hasTouch);
  await expect(page.getByTestId('failure')).toHaveText('!!! CRITICAL_COHERENCE_FAILURE !!!');
  await expect(page.getByTestId('rebooting')).toHaveText('REBOOTING...');
  await expect(page.locator('.app')).toHaveAttribute('data-frame', 'dead');
  await expect(page.getByRole('button')).toHaveCount(1);
  await expect(page.getByRole('button', { name: /rebuild/i })).toBeInViewport({ ratio: 1 });
  await expectTouchable(page, 'link failure');
  await shoot(page, '3a-death');

  // A reload finds the link still down.
  await page.reload();
  await expect(page.getByTestId('failure')).toBeVisible();

  await press(page, /rebuild/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expect(page.getByTestId('place-name')).toHaveText('BRIGHT BOULEVARD');
  await expect(page.locator('.stat', { hasText: 'SEED' }).locator('dd')).toHaveText(SEED);
  await expectMeter(page, 100, 'stable', 7);
  await expect(page.getByTestId('status')).toHaveText(/rebuilt/i);
  // The building was visited before the failure: its row keeps the [V]; the world's own state is undone.
  const rows = page.locator('button[data-option^="enter:"]');
  await expect(rows).toHaveCount(4);
  await expect(rows.first().locator('.seen-mark')).toHaveText('[V]');
  await expect(rows.nth(1).locator('.seen-mark')).toHaveCount(0);
  await shoot(page, '3b-reborn-street');
  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.locator('.row.you')).toHaveCount(1);
  await expect(page.locator('.row.you .ord')).toHaveText('00');
  await expect(page.locator('.row.seen')).toHaveCount(1);
  await expect(page.locator('.row.seen .ord')).toHaveText('00');
  expect(problems).toEqual([]);
});

test('close the tab and reopen: a new page with the same storage continues with the same Coherence, steps, place and visited marks', async ({
  page,
  hasTouch,
  browser,
  context,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await tapOption(page, 'enter:0', hasTouch);
  await tapOption(page, 'enter:15', hasTouch);
  await press(page, /go up/i, hasTouch);
  await expect(page.getByTestId('place-name')).toHaveText('FLOOR 1');
  await expectMeter(page, 97, 'stable', 3);
  expect(problems).toEqual([]);

  const storageState = await context.storageState();
  await page.close();
  // The same device, the same storage, a new context: the tab closed and opened again.
  const { viewport, hasTouch: touch, isMobile, deviceScaleFactor, userAgent } = test.info().project.use;
  const reopened = await browser.newContext({
    ...(viewport == null ? {} : { viewport }),
    ...(touch === undefined ? {} : { hasTouch: touch }),
    ...(isMobile === undefined ? {} : { isMobile }),
    ...(deviceScaleFactor === undefined ? {} : { deviceScaleFactor }),
    ...(userAgent === undefined ? {} : { userAgent }),
    baseURL: test.info().project.use.baseURL ?? '',
    storageState,
  });
  const again = await reopened.newPage();
  const moreProblems = watchForErrors(again);
  await again.goto('./');
  await expect(again.getByTestId('place-name')).toHaveText('FLOOR 1');
  await expectMeter(again, 97, 'stable', 3);
  await press(again, /leave floor/i, hasTouch);
  await expectMeter(again, 96, 'stable', 4);
  const floors = again.locator('button[data-option^="enter:"]');
  await expect(floors).toHaveCount(16);
  // Visited: the lobby and floor 1; the elevator stands at floor 1.
  await expect(again.locator('.row.seen')).toHaveCount(2);
  await expect(again.locator('.row.you .ord')).toHaveText('01');
  await expect(floors.nth(14).locator('.seen-mark')).toHaveText('[V]');
  await expect(floors.nth(15).locator('.seen-mark')).toHaveText('[V]');
  await expect(floors.nth(13).locator('.seen-mark')).toHaveCount(0);
  await again.locator('.row.you').scrollIntoViewIfNeeded();
  await shoot(again, '4-visited-marks', false);
  expect(moreProblems).toEqual([]);
  await reopened.close();
});

test('the recap: END SESSION opens the short ending under twenty places; RESUME returns; END SESSION again goes to the title, and CONTINUE comes back', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await press(page, /end session/i, hasTouch);
  await expect(page.getByTestId('recap-heading')).toHaveText('[LINK_TERMINATION_PROTOCOL]');
  await expect(page.getByTestId('shutdown').getByRole('listitem')).toHaveCount(4);
  await expect(page.getByTestId('figures')).toHaveCount(0);
  await expect(page.getByTestId('closing')).toHaveText('Neural link severed. Waveform stabilized.');
  await expect(page.getByRole('button')).toHaveCount(2);
  await expectTouchable(page, 'recap, short ending');
  await shoot(page, '5a-recap-severed');

  await press(page, /resume/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expectMeter(page, 99, 'stable', 0);

  await press(page, /end session/i, hasTouch);
  await expect(page.getByTestId('recap-heading')).toBeVisible();
  await press(page, /end session/i, hasTouch);
  await expect(page.getByTestId('world-seed')).toHaveText(SEED);
  await expect(page.getByRole('button', { name: /continue/i })).toBeVisible();
  await press(page, /continue/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expectMeter(page, 98, 'stable', 0);
  expect(problems).toEqual([]);
});

test('the recap: twenty places visited is the full ending with its figures', async ({ page, hasTouch }) => {
  const problems = watchForErrors(page);
  // The street's trail is eight places; four buildings, seven more streets and the country's second city make twenty.
  const visited = [
    ...trailOf(STREET),
    ...[0, 1, 2, 3].map((n) => `${STREET}.${String(n)}`),
    ...[1, 2, 3, 4, 5, 6, 7].map((n) => `${CITY}.${String(n)}`),
    `${COUNTRY}.1`,
  ];
  expect(visited).toHaveLength(20);
  await plant(page, saveText(SEED, STREET, {}, { steps: 41, visited }));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expect(page.locator('.row.seen')).toHaveCount(4);
  await press(page, /end session/i, hasTouch);
  await expect(page.getByTestId('recap-heading')).toHaveText('[SESSION_RECAP_INITIALIZED]');
  const figures = page.getByTestId('figures');
  await expect(figures.locator('dt')).toHaveText([
    'FINAL_LOCUS',
    'PULSE_TRAVERSAL',
    'CELLS_MAPPED',
    'BUFFER_DENSITY',
    'RESONANT_TRACES',
  ]);
  await expect(figures.locator('dd')).toHaveText([
    STREET,
    '41 steps',
    '20 footprints',
    '0 spectral fragments',
    '0 resonant',
  ]);
  await expect(page.getByTestId('shutdown')).toHaveCount(0);
  await expect(page.getByTestId('closing')).toHaveText(
    'Expedition successful. Trace synchronized to substrate.',
  );
  await expectTouchable(page, 'recap, full ending');
  await shoot(page, '5b-recap-expedition');
  expect(problems).toEqual([]);
});

test('on a desktop, Q opens the recap and Q again ends the session; B resumes', async ({
  page,
  hasTouch,
}) => {
  test.skip(hasTouch, 'keys are a desktop extra');
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  await page.keyboard.press('q');
  await expect(page.getByTestId('recap-heading')).toBeVisible();
  await page.keyboard.press('b');
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await page.keyboard.press('q');
  await expect(page.getByTestId('recap-heading')).toBeVisible();
  await page.keyboard.press('q');
  await expect(page.getByTestId('world-seed')).toHaveText(SEED);
  expect(problems).toEqual([]);
});

test('on a 360 px phone nothing scrolls sideways: the meter, the failure screen and the recap', async ({
  page,
  hasTouch,
}) => {
  test.skip(!hasTouch, 'the narrow phone only');
  await page.setViewportSize({ width: 360, height: 640 });
  const problems = watchForErrors(page);
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }, { coherence: 1, steps: 3 }));
  await page.goto('./?debug');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(page.getByRole('meter', { name: 'COHERENCE' })).toBeInViewport({ ratio: 1 });
  await expectTouchable(page, '360 room with the meter');
  await shoot(page, '6a-360-room');
  await press(page, /go forward/i, hasTouch);
  await expect(page.getByTestId('failure')).toBeVisible();
  await expectTouchable(page, '360 failure');
  await shoot(page, '6b-360-death');
  await press(page, /rebuild/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await press(page, /end session/i, hasTouch);
  await expect(page.getByTestId('recap-heading')).toBeVisible();
  await expectTouchable(page, '360 recap');
  await shoot(page, '6c-360-recap');
  expect(problems).toEqual([]);
});

test('the meter animates between values unless motion is reduced', async ({ page }) => {
  await plant(page, saveText(SEED, STREET));
  await page.goto('./');
  const fill = page.locator('.cohbar i');
  await expect(fill).toBeVisible();
  expect(await fill.evaluate((el) => getComputedStyle(el).transitionDuration)).toBe('0.3s');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await fill.evaluate((el) => getComputedStyle(el).transitionDuration)).toBe('0s');
});
