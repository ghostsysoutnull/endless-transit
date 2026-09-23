import { expect, test, type Page } from '@playwright/test';
import { expectTouchable, press, saveText, tapOption, watchForErrors } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard; its first building Ornate Sanctum, 16 floors, 9 doors per corridor. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';
const BUILDING = `${STREET}.0`;
const LOBBY = `${BUILDING}.0`;
const FIRST_ROOM = `${LOBBY}.0.0.0`;
/** The narrowest phone we promise (Decision 1). */
const NARROW = { width: 360, height: 640 };

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

/** The next load plants the save again — a screen that changed it (a reboot) is replayed from the same start. */
async function replant(page: Page): Promise<void> {
  await page.evaluate(() => {
    window.sessionStorage.removeItem('planted');
  });
}

/** The sizes a phone is judged at: the device's own, and the narrowest we promise; a desktop at its own. */
function sizes(page: Page, hasTouch: boolean): readonly { width: number; height: number }[] {
  const own = page.viewportSize() ?? NARROW;
  return hasTouch ? [own, NARROW] : [own];
}

async function shoot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: test.info().outputPath(`${test.info().project.name}-${name}.png`) });
}

/**
 * The first-screen rule (I09): with the page at its top, an action of the place — a move, a listed place,
 * a take, a pick — is wholly inside the viewport and above the sticky dock; the dock's way out does not
 * count, it is always there. A screen with no such action (the link failure) shows its one button instead.
 * The measurement is printed so a note can record it.
 */
async function expectAnActionOnTheFirstScreen(page: Page, where: string): Promise<void> {
  expect(await page.evaluate(() => window.scrollY), `${where}: the page is at its top`).toBe(0);
  const outside = page.locator('button[data-option]:not(.dock button):not(.debug button)');
  const first = (await outside.count()) > 0 ? outside.first() : page.locator('button[data-option]').first();
  const box = await first.boundingBox();
  const viewport = page.viewportSize() ?? NARROW;
  const label = (await first.textContent())?.trim().replace(/\s+/g, ' ') ?? '';
  const bottom = (box?.y ?? 0) + (box?.height ?? 0);
  // The dock covers the bottom of a phone's screen: an action under it is not on the screen.
  const dock = page.locator('.dock');
  const dockTop =
    (await dock.count()) > 0 && (await dock.evaluate((el) => getComputedStyle(el).position)) === 'sticky'
      ? ((await dock.boundingBox())?.y ?? viewport.height)
      : viewport.height;
  console.log(
    `[fold] ${test.info().project.name} ${where} ${String(viewport.width)}x${String(viewport.height)}: first action "${label}" at y=${String(Math.round(box?.y ?? -1))}, bottom=${String(Math.round(bottom))}, dock from y=${String(Math.round(dockTop))}`,
  );
  await expect(first, `${where}: an action within the first screen`).toBeInViewport({ ratio: 1 });
  expect(bottom, `${where}: the action is above the dock`).toBeLessThanOrEqual(dockTop + 1);
}

/** Waits for a smooth scroll to end: the same scroll position twice, a frame apart. */
async function settled(page: Page): Promise<void> {
  await expect
    .poll(
      () =>
        page.evaluate(
          () =>
            new Promise<boolean>((resolve) => {
              const before = window.scrollY;
              setTimeout(() => {
                resolve(window.scrollY === before);
              }, 120);
            }),
        ),
      { timeout: 5_000 },
    )
    .toBe(true);
}

/** A panel the player asked for is brought into view and holds the focus (the shell's spotlight rule, I09). */
async function expectSpotlit(page: Page, testId: string): Promise<void> {
  const panel = page.getByTestId(testId);
  await settled(page);
  await expect(panel, `${testId}: in view after the tap`).toBeInViewport();
  const box = await panel.boundingBox();
  const viewport = page.viewportSize() ?? NARROW;
  expect(box?.y ?? -1, `${testId}: its top is inside the viewport`).toBeGreaterThanOrEqual(0);
  expect(box?.y ?? viewport.height, `${testId}: its top is inside the viewport`).toBeLessThan(
    viewport.height,
  );
  expect(await page.evaluate(() => document.activeElement?.getAttribute('data-testid') ?? '')).toBe(testId);
  if ((page.viewportSize() ?? NARROW).width === NARROW.width) await shoot(page, `2-${testId}-spotlit-360`);
}

/** Every world screen kind a player meets, with the way to reach it from a planted save. */
const KINDS: readonly {
  readonly kind: string;
  readonly save: string;
  readonly reach?: (page: Page, hasTouch: boolean) => Promise<void>;
  /** The panel the reach opens, if one. */
  readonly panel?: string;
  readonly expectKind: string;
}[] = [
  { kind: 'street', save: saveText(SEED, STREET), expectKind: 'STREET' },
  { kind: 'building', save: saveText(SEED, BUILDING), expectKind: 'BUILDING' },
  { kind: 'elevator', save: saveText(SEED, LOBBY), expectKind: 'FLOOR' },
  { kind: 'corridor', save: saveText(SEED, LOBBY, { [LOBBY]: 'corridor' }), expectKind: 'FLOOR' },
  { kind: 'room', save: saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }), expectKind: 'ROOM' },
  {
    kind: 'scan',
    save: saveText(SEED, LOBBY, { [LOBBY]: 'corridor' }),
    reach: (page, hasTouch) => press(page, /^scan$/i, hasTouch),
    panel: 'scan',
    expectKind: 'FLOOR',
  },
  {
    kind: 'map',
    save: saveText(SEED, STREET),
    reach: (page, hasTouch) => press(page, /^map$/i, hasTouch),
    panel: 'map',
    expectKind: 'STREET',
  },
  {
    kind: 'trace',
    save: saveText(SEED, STREET),
    reach: (page, hasTouch) => press(page, /^trace$/i, hasTouch),
    panel: 'trace',
    expectKind: 'STREET',
  },
];

for (const each of KINDS) {
  test(`first screen: a ${each.kind} shows an action without scrolling, at the device size and at 360 × 640`, async ({
    page,
    hasTouch,
  }) => {
    const problems = watchForErrors(page);
    await plant(page, each.save);
    for (const size of sizes(page, hasTouch)) {
      await page.setViewportSize(size);
      await page.goto('./');
      await expect(page.getByTestId('place-kind')).toHaveText(each.expectKind);
      if (each.reach !== undefined) await each.reach(page, hasTouch);
      if (each.panel !== undefined) await expectSpotlit(page, each.panel);
      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });
      await expectAnActionOnTheFirstScreen(page, each.kind);
      await expectTouchable(page, each.kind);
      if (size.width === NARROW.width) await shoot(page, `1-${each.kind}-360`);
      await replant(page);
    }
    expect(problems).toEqual([]);
  });
}

test('first screen: the buffer, the link failure and the recap show their action without scrolling', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  const relic = { kind: 'relic', from: FIRST_ROOM, key: 'with|reliquary box|plasma coil' };
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }, { buffer: [relic, relic] }));
  for (const size of sizes(page, hasTouch)) {
    await page.setViewportSize(size);
    await page.goto('./?debug');
    await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
    await press(page, /^buffer$/i, hasTouch);
    await expect(page.getByTestId('buffer-heading')).toBeVisible();
    await expectAnActionOnTheFirstScreen(page, 'buffer');
    await press(page, /back to reality/i, hasTouch);
    await press(page, /end session/i, hasTouch);
    await expect(page.getByTestId('recap-heading')).toBeVisible();
    await expectAnActionOnTheFirstScreen(page, 'recap');
    await press(page, /^resume$/i, hasTouch);
    await tapOption(page, 'debug:integrity:1', hasTouch);
    await press(page, /go forward/i, hasTouch);
    await expect(page.getByTestId('failure')).toBeVisible();
    await expectAnActionOnTheFirstScreen(page, 'death');
    await press(page, /rebuild/i, hasTouch);
    await expect(page.getByTestId('place-kind')).toHaveText('STREET');
    await replant(page);
  }
  expect(problems).toEqual([]);
});
