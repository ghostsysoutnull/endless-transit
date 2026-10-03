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
  await unfold(page, button, hasTouch);
  await (hasTouch ? button.tap() : button.click());
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
