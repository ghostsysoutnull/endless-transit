import { expect, type Locator, type Page } from '@playwright/test';

/** Where the game keeps its save (`LocalStorageSaveStore`): a test plants one here before the page loads. */
const SAVE_SLOT = 'endless-transit.save';

/** The page opens on this save — planted once, so a reload inside the test keeps what the game wrote since. */
export async function plant(page: Page, text: string): Promise<void> {
  await page.addInitScript(
    ([slot, value]) => {
      if (window.sessionStorage.getItem('planted') !== null) return;
      window.sessionStorage.setItem('planted', 'yes');
      window.localStorage.setItem(slot, value);
    },
    [SAVE_SLOT, text] as const,
  );
}

/** Collects everything the page complains about; a test ends by asserting it stayed empty. */
export function watchForErrors(page: Page): string[] {
  const problems: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') problems.push(message.text());
  });
  page.on('pageerror', (error) => problems.push(error.message));
  page.on('requestfailed', (request) => problems.push(`request failed: ${request.url()}`));
  page.on('response', (response) => {
    if (response.status() >= 400) problems.push(`${String(response.status())} ${response.url()}`);
  });
  return problems;
}

/**
 * The dock folds on a phone (I08, I09), the debug strip folds everywhere (I09) and a room's card has two faces
 * (U03e): a button that is not shown may be behind MORE or DEBUG or on the card's other face, as it is for a player —
 * open the fold it is in, or turn the card, as a player would.
 */
async function unfold(
  page: Page,
  button: Locator,
  hasTouch: boolean,
  there: () => Promise<boolean> = async () => (await button.count()) > 0,
): Promise<void> {
  if ((await button.count()) > 0 && (await button.first().isVisible())) return;
  for (const fold of ['more', 'keys-more', 'debug-toggle']) {
    const toggle = page.getByTestId(fold);
    if ((await toggle.count()) === 0 || !(await toggle.isVisible())) continue;
    if ((await toggle.getAttribute('aria-expanded')) === 'true') continue;
    await (hasTouch ? toggle.tap() : toggle.click());
    if ((await button.count()) > 0 && (await button.first().isVisible())) return;
    // The keys' sheet lies over what is above them: left open, it would take the taps meant for what lies under it.
    if (fold === 'keys-more') await (hasTouch ? toggle.tap() : toggle.click());
  }
  // A room is a card (U03e): a button that is there but not on the face shown is on the other — turn the card by its
  // corner, as a player would. One that is not there at all (the screen is on its way) is left for the tap to wait for.
  if (!(await there()) || (await page.getByTestId('card-to-words').count()) === 0) return;
  await turnCard(page, hasTouch);
  await expect(button.first()).toBeVisible();
}

/** Turns a room's card to its other face by its folded corner and waits for the turn to end; nothing where no card shows. */
export async function turnCard(page: Page, hasTouch: boolean): Promise<void> {
  for (const [corner, other] of [
    ['card-to-words', 'card-to-room'],
    ['card-to-room', 'card-to-words'],
  ] as const) {
    const ear = page.getByTestId(corner);
    if ((await ear.count()) === 0 || !(await ear.isVisible())) continue;
    // The corner is a triangle in its box's lower right half on both faces: the finger lands on it, not on the box's middle.
    const position = { x: 44, y: 44 };
    await (hasTouch ? ear.tap({ position }) : ear.click({ position }));
    await expect(page.getByTestId(other)).toBeVisible();
    await expect(ear).toBeHidden();
    return;
  }
}

/** Tap on a touch device, click on a desktop — what a player's hand would do. */
export async function press(page: Page, name: RegExp, hasTouch: boolean): Promise<void> {
  const button = page.getByRole('button', { name });
  // A button on a hidden face has no accessible name to be found by: its label or its words are read instead.
  const there = (): Promise<boolean> =>
    page.locator('button').evaluateAll(
      (buttons, [source, flags]) =>
        buttons.some((each) => {
          const said = each.cloneNode(true) as Element;
          for (const unsaid of said.querySelectorAll('[aria-hidden="true"]')) unsaid.remove();
          return new RegExp(source, flags).test(each.getAttribute('aria-label') ?? said.textContent.trim());
        }),
      [name.source, name.flags] as const,
    );
  await unfold(page, button, hasTouch, there);
  await (hasTouch ? button.tap() : button.click());
}

export async function tapOption(page: Page, id: string, hasTouch: boolean): Promise<void> {
  const button = page.locator(`button[data-option="${id}"]`);
  // A place with no button of its own — a floor: the tower is its building's list — is tapped in the picture.
  if ((await button.count()) === 0 && (await page.getByTestId('scene').getByRole('slider').isVisible())) {
    await tapInPicture(page, id, hasTouch);
    return;
  }
  await unfold(page, button, hasTouch);
  await (hasTouch ? button.tap() : button.click());
}

/**
 * A point inside the place the option `id` enters, on the picture, in page coordinates — found by sweeping the
 * picture with the pointer as a player would and reading which place the scene says is lit; nothing when the place
 * is not in the picture's window.
 */
export async function pointInPicture(page: Page, id: string): Promise<{ x: number; y: number } | null> {
  await page.getByTestId('scene').scrollIntoViewIfNeeded();
  return page.getByTestId('scene').evaluate((host, wanted) => {
    const canvas = host.querySelector('canvas');
    if (canvas === null) return null;
    const box = canvas.getBoundingClientRect();
    const at = (x: number, y: number): void => {
      canvas.dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: y, bubbles: true }));
    };
    for (let y = box.top + 2; y < box.bottom; y += 6) {
      for (let x = box.left + 2; x < box.right; x += 6) {
        at(x, y);
        if (host.getAttribute('data-lit') === wanted) {
          canvas.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
          // A few pixels further in, clear of the edge the sweep found.
          return { x: x + 4, y: y + 8 };
        }
      }
    }
    canvas.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
    return null;
  }, id);
}

/** A tap at a point of the page: a finger on a touch device, a click on a desktop. */
export async function tapAt(page: Page, point: { x: number; y: number }, hasTouch: boolean): Promise<void> {
  await (hasTouch ? page.touchscreen.tap(point.x, point.y) : page.mouse.click(point.x, point.y));
}

/**
 * Taps the place the option `id` enters on the picture. Where the picture has a gauge (the tower) and the place is
 * out of its window, the gauge's arrow keys move the window a place at a time — up to the top, then down to the foot —
 * until the place shows; each step is waited for until the picture stands still.
 */
export async function tapInPicture(page: Page, id: string, hasTouch: boolean): Promise<void> {
  const slider = page.getByTestId('scene').getByRole('slider');
  /** Where the place is once the picture has come to rest: two sweeps in a row that agree. */
  const resting = async (): Promise<{ x: number; y: number } | null> => {
    let last = await pointInPicture(page, id);
    await expect
      .poll(
        async () => {
          const now = await pointInPicture(page, id);
          const same = now?.x === last?.x && now?.y === last?.y;
          last = now;
          return same;
        },
        { intervals: [150] },
      )
      .toBe(true);
    return last;
  };
  let point = await resting();
  for (const key of ['ArrowUp', 'ArrowDown']) {
    while (point === null && (await slider.isVisible())) {
      const before = await slider.getAttribute('aria-valuenow');
      await slider.focus();
      await page.keyboard.press(key);
      // The key's ride takes a moment to reach the next place; at the gauge's end it moves nothing.
      const moved = await expect
        .poll(() => slider.getAttribute('aria-valuenow'), { timeout: 2000, intervals: [100] })
        .not.toBe(before)
        .then(
          () => true,
          () => false,
        );
      if (!moved) break;
      point = await resting();
    }
  }
  if (point === null) throw new Error(`${id} is not in the picture`);
  await tapAt(page, point, hasTouch);
}

/** No sideways scroll, and every action on screen is a real button of at least 44 × 44 CSS px. */
export async function expectTouchable(page: Page, where: string): Promise<void> {
  const overflow = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(overflow.content, `${where}: horizontal overflow`).toBeLessThanOrEqual(overflow.viewport);
  const buttons = await page.getByRole('button').all();
  expect(buttons.length, `${where}: buttons`).toBeGreaterThan(0);
  for (const button of buttons) {
    const box = await button.boundingBox();
    expect(box?.width ?? 0, `${where}: button width`).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0, `${where}: button height`).toBeGreaterThanOrEqual(44);
  }
  expect(
    await page.locator('[data-option]:not(button)').count(),
    `${where}: options that are not buttons`,
  ).toBe(0);
}

/** Every address from the universe down to `path`: what a traveller who stands there has walked at the least. */
export function trailOf(path: string | null): string[] {
  if (path === null) return [];
  const steps = path.split('.');
  return steps.map((_, depth) => steps.slice(0, depth + 1).join('.'));
}

/** A v6 save as the game writes one: a fresh traveller who has walked the trail, unless a field is set on purpose. */
export function saveText(
  seed: string,
  path: string | null,
  states: Record<string, string> = {},
  traveller: {
    coherence?: number;
    steps?: number;
    visited?: readonly string[];
    buffer?: readonly unknown[];
    resonant?: number;
  } = {},
): string {
  return JSON.stringify({
    version: 6,
    seed,
    path,
    states,
    coherence: traveller.coherence ?? 100,
    steps: traveller.steps ?? 0,
    visited: traveller.visited ?? trailOf(path),
    buffer: traveller.buffer ?? [],
    resonant: traveller.resonant ?? 0,
  });
}
