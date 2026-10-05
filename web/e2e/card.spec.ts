import { expect, test, type Page } from '@playwright/test';
import { plant, press, saveText, tapOption, turnCard, watchForErrors } from './support/harness.ts';

/** A fixed world: its first building's lobby corridor; the first door opens on an apartment of two rooms. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const LOBBY = '0.0.0.0.0.0.0.0.0.0';
const FIRST_ROOM = `${LOBBY}.0.0.0`;

async function inTheFirstRoom(page: Page): Promise<void> {
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(page.getByTestId('scene').locator('canvas')).toHaveCount(1);
}

const toWords = (page: Page) => page.getByRole('button', { name: 'Turn the card: the room in words' });
const toRoom = (page: Page) => page.getByRole('button', { name: 'Turn the card: the picture' });
const steps = (page: Page) => page.getByTestId('stat-steps');

/** A finger dragged across the card, left to right, at this share of its height. */
async function swipe(page: Page, share = 0.5): Promise<void> {
  const box = await page.locator('.card').boundingBox();
  if (box === null) throw new Error('no card');
  const y = box.y + box.height * share;
  const at = (x: number): { clientX: number; clientY: number; bubbles: boolean; pointerId: number } => ({
    clientX: box.x + x,
    clientY: y,
    bubbles: true,
    pointerId: 7,
  });
  await page.locator('.card .face:not([data-off])').evaluate(
    (face, [down, up]) => {
      const target = face.querySelector('canvas') ?? face;
      target.dispatchEvent(new PointerEvent('pointerdown', down));
      target.dispatchEvent(new PointerEvent('pointerup', up));
    },
    [at(40), at(box.width - 40)] as const,
  );
}

test('the corner turns the card to the room’s words and back, and picks nothing (U03e: a view control)', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await inTheFirstRoom(page);
  const before = await steps(page).textContent();
  await expect(page.locator('.desc')).toBeHidden();
  await turnCard(page, hasTouch);
  await expect(toRoom(page)).toBeVisible();
  await expect(page.locator('.desc')).toBeVisible();
  await expect(page.getByTestId('scene')).toBeHidden();
  await expect(page.getByRole('button', { name: /go forward/i })).toBeVisible();
  // After a turn the focus rests on the face shown, never on the one turned away.
  expect(await page.evaluate(() => document.activeElement?.className)).toContain('back');
  await page.screenshot({ path: test.info().outputPath('phone-card-back.png') });
  await turnCard(page, hasTouch);
  await expect(toWords(page)).toBeVisible();
  await expect(page.getByTestId('scene')).toBeVisible();
  await expect(page.locator('.desc')).toBeHidden();
  await expect(steps(page)).toHaveText(before ?? '');
  await expect(page.getByTestId('place-name')).toHaveText('Candlelit Maintenance Bay');
  expect(problems).toEqual([]);
});

test('a sideways swipe turns the card and back; over the apartment’s plan it does not', async ({
  page,
  hasTouch,
}) => {
  await inTheFirstRoom(page);
  const before = await steps(page).textContent();
  await swipe(page);
  await expect(toRoom(page)).toBeVisible();
  await swipe(page);
  await expect(toWords(page)).toBeVisible();
  const map = page.getByTestId('map-key');
  await (hasTouch ? map.tap() : map.click());
  await expect(map).toHaveAttribute('aria-pressed', 'true');
  await swipe(page, 0.2);
  await page.waitForTimeout(900);
  await expect(toWords(page)).toBeVisible();
  await expect(steps(page)).toHaveText(before ?? '');
});

test('the keys stay in reach on both faces: MORE, Buffer, the plan, the way out and the way forward; the Map key shows the picture again', async ({
  page,
  hasTouch,
}) => {
  await inTheFirstRoom(page);
  await turnCard(page, hasTouch);
  await expect(toRoom(page)).toBeVisible();
  const keys = page.getByRole('navigation', { name: 'Keys' });
  await expect(keys.getByRole('button')).toHaveCount(6);
  await expect(keys.getByRole('button', { name: /go forward/i })).toBeVisible();
  const map = page.getByTestId('map-key');
  await (hasTouch ? map.tap() : map.click());
  await expect(toWords(page)).toBeVisible();
  await expect(page.getByTestId('scene')).toBeVisible();
});

test('over the plan the MAP key is the way back into the room: pressed, and named for its next tap', async ({
  page,
  hasTouch,
}) => {
  await inTheFirstRoom(page);
  const map = page.getByTestId('map-key');
  await expect(map).toHaveAccessibleName('Apartment plan');
  await (hasTouch ? map.tap() : map.click());
  await expect(map).toHaveAttribute('aria-pressed', 'true');
  await expect(map).toHaveAccessibleName('Back into the room');
  await (hasTouch ? map.tap() : map.click());
  await expect(map).toHaveAttribute('aria-pressed', 'false');
  await expect(map).toHaveAccessibleName('Apartment plan');
});

test('MORE opens the game’s own keys over the card and a pick closes it; the back has no game group', async ({
  page,
  hasTouch,
}) => {
  await inTheFirstRoom(page);
  const more = page.getByTestId('keys-more');
  const sheet = page.getByRole('navigation', { name: 'GAME' });
  await expect(sheet).toHaveCount(0);
  await (hasTouch ? more.tap() : more.click());
  await expect(more).toHaveAttribute('aria-expanded', 'true');
  for (const name of ['Scan', 'Lattice', 'Help', 'Title screen', 'End session']) {
    await expect(sheet.getByRole('button', { name })).toBeVisible();
  }
  const scan = sheet.getByRole('button', { name: 'Scan' });
  await (hasTouch ? scan.tap() : scan.click());
  await expect(page.getByTestId('scan')).toBeVisible();
  await expect(sheet).toHaveCount(0);
  await expect(more).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.card .back .game')).toHaveCount(0);
});

test('a travelling key tapped on the back turns the card to its picture first, then rides into the next room', async ({
  page,
  hasTouch,
}) => {
  await inTheFirstRoom(page);
  await turnCard(page, hasTouch);
  await expect(toRoom(page)).toBeVisible();
  await press(page, /go forward/i, hasTouch);
  // The picture is up again while the first room is still the place: the ride plays where it can be seen.
  await expect(toWords(page)).toBeVisible();
  await expect(page.getByTestId('place-name')).toHaveText('Candlelit Maintenance Bay');
  await expect(page.getByTestId('place-name')).not.toHaveText('Candlelit Maintenance Bay');
  await expect(toWords(page)).toBeVisible();
});

test('arriving, the line over the picture names the room and says its first words, then leaves the room to itself', async ({
  page,
}) => {
  await inTheFirstRoom(page);
  const line = page.locator('.card .line');
  await expect(line).toContainText('Candlelit Maintenance Bay');
  await expect(line).toContainText('You are in gantry-braced architecture');
  await expect(line).toHaveCSS('opacity', '0', { timeout: 9000 });
});

test('a relic taken from the back of the card is counted on the Buffer key; a way taken there walks on, to the next room’s picture', async ({
  page,
  hasTouch,
}) => {
  await inTheFirstRoom(page);
  const count = page.locator('.keys .badge');
  await expect(count).toHaveText('0');
  await tapOption(page, 'capture:0', hasTouch);
  // This room's first take also brings a fragment of its own (plan.spec reads the same two).
  await expect(count).toHaveText('2');
  await expect(page.getByTestId('stat-buffer')).toHaveText('2');
  await expect(toRoom(page)).toBeVisible();
  await press(page, /go forward/i, hasTouch);
  await expect(page.getByTestId('place-name')).not.toHaveText('Candlelit Maintenance Bay');
  await expect(toWords(page)).toBeVisible();
  await expect(page.getByRole('button', { name: /go back/i })).toBeVisible();
});

test('a scan shows on the back of the card at once, the focus on its panel', async ({ page, hasTouch }) => {
  await inTheFirstRoom(page);
  await press(page, /^scan$/i, hasTouch);
  await expect(page.getByTestId('scan')).toBeVisible();
  await expect(toRoom(page)).toBeVisible();
  expect(await page.evaluate(() => document.activeElement?.getAttribute('data-testid'))).toBe('scan');
});

test('reduced motion: the card turns at once', async ({ page, hasTouch }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await inTheFirstRoom(page);
  await turnCard(page, hasTouch);
  await expect(page.locator('.desc')).toBeVisible({ timeout: 300 });
  await expect(page.getByTestId('scene')).toBeHidden({ timeout: 300 });
});
