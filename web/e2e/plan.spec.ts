import { expect, test, type Page } from '@playwright/test';
import { plant, press, saveText, tapOption, watchForErrors } from './support/harness.ts';

/** A fixed world: its first building's lobby corridor; the first door opens on an apartment of two rooms. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const LOBBY = '0.0.0.0.0.0.0.0.0.0';
/** Grand Power Plant, the apartment's first room: four relics, the way out, a doorway on to the second room. */
const FIRST_ROOM = `${LOBBY}.0.0.0`;

async function shoot(page: Page, name: string): Promise<void> {
  await page.getByTestId('scene').scrollIntoViewIfNeeded();
  await page.screenshot({ path: test.info().outputPath(`${test.info().project.name}-${name}.png`) });
}

async function inTheFirstRoom(page: Page): Promise<void> {
  await plant(page, saveText(SEED, FIRST_ROOM, { [LOBBY]: 'corridor' }));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(page.getByTestId('scene').locator('canvas')).toHaveCount(1);
}

/** The page's clock runs a second on, then stops: animation frames wait for `runFor`, so a glide is caught halfway. */
async function holdTime(page: Page): Promise<void> {
  await page.clock.pauseAt((await page.evaluate(() => Date.now())) + 1000);
}

/** A point on the option `id` in the picture, found by sweeping the picture with the pointer and reading what lights. */
async function pointOf(page: Page, id: string): Promise<{ x: number; y: number }> {
  await page.getByTestId('scene').scrollIntoViewIfNeeded();
  const point = await page.getByTestId('scene').evaluate((host, wanted) => {
    const canvas = host.querySelector('canvas');
    if (canvas === null) return null;
    const box = canvas.getBoundingClientRect();
    for (let y = box.top + 2; y < box.bottom; y += 4) {
      for (let x = box.left + 2; x < box.right; x += 4) {
        canvas.dispatchEvent(new PointerEvent('pointermove', { clientX: x, clientY: y, bubbles: true }));
        if (host.getAttribute('data-lit') === wanted) {
          canvas.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
          return { x: x + 6, y: y + 6 };
        }
      }
    }
    return null;
  }, id);
  if (point === null) throw new Error(`no ${id} in the picture`);
  return point;
}

test('a room is drawn as its apartment’s plan: a named picture, the room you stand in framed, its twin buttons below', async ({
  page,
}) => {
  const problems = watchForErrors(page);
  await inTheFirstRoom(page);
  await expect(
    page.getByTestId('scene').getByRole('img', { name: /^Picture of Grand Power Plant/ }),
  ).toHaveCount(1);
  // The picture holds no button: the moves, the dock and the tiles are the one set of buttons.
  await expect(page.getByTestId('scene').locator('[data-option]')).toHaveCount(0);
  await page.waitForTimeout(900);
  await shoot(page, 'plan-first-room');
  expect(problems).toEqual([]);
});

test('Go forward: the view glides through the doorway first, then the next room is entered', async ({
  page,
  hasTouch,
}) => {
  await page.clock.install();
  await inTheFirstRoom(page);
  await page.clock.runFor(1200);
  await holdTime(page);
  await tapOption(page, 'move:forward', hasTouch);
  // The glide runs first: the first room is still on show right after the tap.
  await expect(page.getByTestId('place-name')).toHaveText('Grand Power Plant');
  await page.clock.runFor(1000);
  await expect(page.getByTestId('place-name')).not.toHaveText('Grand Power Plant');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await page.clock.resume();
  await page.waitForTimeout(900);
  await shoot(page, 'plan-second-room');
});

test('the doorway tapped in the picture lights its button, and leads on to the next room', async ({
  page,
  hasTouch,
}) => {
  await page.clock.install();
  await inTheFirstRoom(page);
  // The arrival's glide into the room is over: the doorway stands where it rests.
  await page.clock.runFor(1200);
  await page.clock.pauseAt((await page.evaluate(() => Date.now())) + 100);
  const point = await pointOf(page, 'move:forward');
  await page.clock.resume();
  await page
    .getByTestId('scene')
    .locator('canvas')
    .dispatchEvent('pointermove', { clientX: point.x, clientY: point.y });
  await expect(page.locator('button[data-option="move:forward"]')).toHaveAttribute('data-lit', '');
  await (hasTouch ? page.touchscreen.tap(point.x, point.y) : page.mouse.click(point.x, point.y));
  await expect(page.getByTestId('place-name')).not.toHaveText('Grand Power Plant');
});

test('a relic’s tile is taken at once, no glide', async ({ page, hasTouch }) => {
  await page.clock.install();
  await inTheFirstRoom(page);
  await page.clock.runFor(1200);
  await holdTime(page);
  // No frame runs from here on: a take that waited for a glide would never land.
  await tapOption(page, 'capture:0', hasTouch);
  await expect(page.locator('button.tile')).toHaveCount(3);
});

// The first relic, a plasma coil with a reliquary box, is two fragments.
test('a relic taken flies from where it lay to the Buffer count, which counts it', async ({
  page,
  hasTouch,
}) => {
  await inTheFirstRoom(page);
  await tapOption(page, 'capture:0', hasTouch);
  await expect(page.getByTestId('relic-flight')).toHaveCount(1);
  await expect(page.getByTestId('relic-flight')).toHaveCount(0);
  await expect(page.getByTestId('stat-buffer')).toHaveText('2/16');
});

test('reduced motion: a relic taken does not fly', async ({ page, hasTouch }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await inTheFirstRoom(page);
  await tapOption(page, 'capture:0', hasTouch);
  await expect(page.getByTestId('stat-buffer')).toHaveText('2/16');
  await expect(page.getByTestId('relic-flight')).toHaveCount(0);
});

test('leaving the first room: the view pulls back to the whole plan first, then the corridor', async ({
  page,
  hasTouch,
}) => {
  await page.clock.install();
  await inTheFirstRoom(page);
  await page.clock.runFor(1200);
  await holdTime(page);
  await press(page, /leave the apartment/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await page.clock.runFor(1200);
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
});

test('reduced motion: Go forward enters the next room at once', async ({ page, hasTouch }) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await inTheFirstRoom(page);
  await holdTime(page);
  // No frame runs from here on: a move that waited for a glide would never land.
  await tapOption(page, 'move:forward', hasTouch);
  await expect(page.getByTestId('place-name')).not.toHaveText('Grand Power Plant');
});

test('back from the help screen, the plan still takes the taps: Go forward glides first', async ({
  page,
  hasTouch,
}) => {
  await page.clock.install();
  await inTheFirstRoom(page);
  await press(page, /^help$/i, hasTouch);
  await expect(page.getByTestId('help-heading')).toHaveCount(1);
  await press(page, /back to the world/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await page.clock.runFor(1200);
  await holdTime(page);
  await tapOption(page, 'move:forward', hasTouch);
  await expect(page.getByTestId('place-name')).toHaveText('Grand Power Plant');
  await page.clock.runFor(1000);
  await expect(page.getByTestId('place-name')).not.toHaveText('Grand Power Plant');
});
