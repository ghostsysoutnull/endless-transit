import { expect, test, type Page } from '@playwright/test';
import { expectTouchable, press, saveText, tapOption, watchForErrors } from './support/harness.ts';

const SLOT = 'endless-transit.save';
/** A fixed world: its street is Bright Boulevard; its first building Ornate Sanctum, 16 floors, 9 doors per corridor. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const LOBBY = '0.0.0.0.0.0.0.0.0.0';
const FIRST_ROOM = `${LOBBY}.0.0.0`;

/** Plants a save once per test — a reload inside the test must find what the game itself wrote. */
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

test('from the title: a new world lands on a street; into a building, the elevator up two floors, the corridor, a door, a room, and back out to the street', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await plant(page, null);
  await page.goto('./');
  await press(page, /enter world/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expect(page.getByTestId('place-name')).toHaveText('Bright Boulevard');
  await expect(page.getByTestId('path').locator('li')).toHaveCount(8);
  await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(4);
  await expectTouchable(page, 'street');

  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await expect(page.getByTestId('place-name')).toHaveText('Ornate Sanctum');
  // The floors are a pad of numbers (U02, Decision 7), each key read out with its floor's zone.
  const floors = page.locator('button[data-option^="enter:"]');
  await expect(floors).toHaveCount(16);
  await expect(page.getByRole('button', { name: /^Ride to Peak, Zone Peak observatory$/ })).toHaveCount(1);
  // The elevator waits at the lobby before anyone rides it: the one key read out as where it is.
  const here = page.getByRole('button', { name: /Elevator here/ });
  await expect(here).toHaveCount(1);
  await expect(here).toHaveAccessibleName(/^Ride to Lobby, Elevator here, Zone Transit lobby$/);
  await expect(page.locator('.moves')).toHaveCount(0);
  await expectTouchable(page, 'building');
  await shoot(page, '1-building');
  await here.scrollIntoViewIfNeeded();
  await shoot(page, '1a-building-elevator-at-lobby');
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  await tapOption(page, 'enter:15', hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
  await expect(page.getByTestId('place-name')).toHaveText('Floor 0');
  await expect(page.locator('.moves button')).toHaveCount(2);
  await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /go down/i })).toHaveCount(0);
  await expectTouchable(page, 'elevator');
  await shoot(page, '2-elevator');

  await press(page, /go up/i, hasTouch);
  await expect(page.getByTestId('place-name')).toHaveText('Floor 1');
  await expect(page.getByTestId('status')).toHaveText('Entered Floor 1.');
  await press(page, /go up/i, hasTouch);
  await expect(page.getByTestId('place-name')).toHaveText('Floor 2');
  await expect(page.locator('.moves button')).toHaveCount(3);

  await press(page, /enter corridor/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
  await expect(page.getByTestId('place-name')).toHaveText('Floor 2');
  await expect(page.getByTestId('status')).toHaveText('Enter Corridor.');
  const doors = page.locator('button[data-option^="enter:"]');
  await expect(doors).toHaveCount(9);
  await expect(doors.first().locator('.ord')).toHaveText('01');
  await expect(page.locator('.moves button')).toHaveCount(1);
  await expect(page.getByRole('button', { name: /back to elevator/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /leave floor/i })).toBeVisible();
  await expectTouchable(page, 'corridor');
  await shoot(page, '3-corridor');

  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(page.getByTestId('path').locator('li')).toHaveCount(13);
  await expect(page.getByTestId('path')).toContainText('Corridor');
  await expect(page.locator('.tag')).toHaveCount(6); // TEMPORAL_MARKER (I07), TYPE, OXY, TEMP, SIGNAL, RESONANCE
  await expect(page.locator('.desc p')).toHaveCount(2);
  await expect(page.getByRole('button', { name: /exit apartment/i })).toBeVisible();
  await expectTouchable(page, 'room');
  await shoot(page, '4-room');

  // Forward through the rooms if there are more, and back to the first: only the first room has the way out.
  const forward = page.getByRole('button', { name: /go forward/i });
  if ((await forward.count()) > 0) {
    await press(page, /go forward/i, hasTouch);
    await expect(page.getByRole('button', { name: /exit apartment/i })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /go back/i })).toBeVisible();
    await press(page, /go back/i, hasTouch);
  }
  await press(page, /exit apartment/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
  await expect(page.getByTestId('place-name')).toHaveText('Floor 2');
  await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(9);
  await press(page, /leave floor/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  // The elevator now stands at floor 2, and a reload remembers it (the building is on the trail).
  const car = page.getByRole('button', { name: /Elevator here/ });
  await expect(car).toHaveCount(1);
  await expect(car).toHaveAccessibleName(/^Ride to Floor 2, Elevator here/);
  await page.reload();
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await expect(car).toHaveCount(1);
  await expect(car).toHaveAccessibleName(/^Ride to Floor 2, Elevator here/);
  await car.scrollIntoViewIfNeeded();
  await shoot(page, '1b-building-elevator-at-2');
  // The floor left from the corridor is back at the elevator on the next visit (Guide:113).
  await tapOption(page, 'enter:13', hasTouch);
  await expect(page.getByTestId('place-name')).toHaveText('Floor 2');
  await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(0);
  await expect(page.locator('.moves button')).toHaveCount(3);
  await press(page, /leave floor/i, hasTouch);
  await press(page, /leave building/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  await expect(page.getByTestId('place-name')).toHaveText('Bright Boulevard');
  expect(problems).toEqual([]);
});

test('reload restores the room, and the way out still opens on the door list', async ({ page, hasTouch }) => {
  const problems = watchForErrors(page);
  await plant(page, LOBBY);
  await page.goto('./');
  await expect(page.getByTestId('place-name')).toHaveText('Floor 0');
  await press(page, /enter corridor/i, hasTouch);
  await tapOption(page, 'enter:0', hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  const room = await page.getByTestId('place-name').innerText();

  await page.reload();
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expect(page.getByTestId('place-name')).toHaveText(room);
  await expect(page.getByTestId('status')).toContainText(/restored/i);
  await press(page, /exit apartment/i, hasTouch);
  await expect(page.getByTestId('place-name')).toHaveText('Floor 0');
  await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(9);
  expect(problems).toEqual([]);
});

test('a tall building: its floors come as a pad by tens, the lobby’s ten shown first with leave in reach, and the lobby opens from there', async ({
  page,
  hasTouch,
}) => {
  // Seed 7F3A: Bright Boulevard's buildings are 16, ?, ?, ? floors — find the tallest by walking the street.
  await plant(page, '0.0.0.0.0.0.0.0');
  await page.goto('./');
  const buildings = await page.evaluate(() => {
    const rows = [...document.querySelectorAll<HTMLElement>('button[data-option^="enter:"]')];
    return rows.map((row) => row.dataset.option ?? '');
  });
  expect(buildings.length).toBe(4);
  let most = 0;
  let pick = buildings[0] ?? '';
  for (const id of buildings) {
    await tapOption(page, id, hasTouch);
    const floors = Number(
      (await page.locator('.tag', { hasText: /^Floors/ }).textContent())?.replace(/\D/g, ''),
    );
    if (floors > most) {
      most = floors;
      pick = id;
    }
    await press(page, /leave building/i, hasTouch);
  }
  expect(most).toBeGreaterThan(20);
  await tapOption(page, pick, hasTouch);
  // Past twenty the pad goes by tens: a tab per ten, the one holding the car — the lobby's — shown first.
  const tens = page.getByRole('group', { name: 'Floors by tens' }).getByRole('button');
  await expect(tens).toHaveCount(Math.ceil(most / 10));
  await expect(tens.first()).toHaveAttribute('aria-pressed', 'true');
  await expectTouchable(page, 'tall building');
  const lobby = page.getByRole('button', { name: /^Ride to Lobby,/ });
  await lobby.scrollIntoViewIfNeeded();
  await expect(lobby).toBeInViewport();
  await expect(page.getByRole('button', { name: /leave/i })).toBeInViewport();
  await (hasTouch ? lobby.tap() : lobby.click());
  await expect(page.getByTestId('place-name')).toHaveText('Floor 0');
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test('still fits at 360 px wide inside a building: building, elevator, corridor, room', async ({
  page,
  hasTouch,
}) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await plant(page, FIRST_ROOM, { [LOBBY]: 'corridor' });
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await expectTouchable(page, '360px room');
  await press(page, /exit apartment/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
  await expectTouchable(page, '360px corridor');
  await press(page, /back to elevator/i, hasTouch);
  await expectTouchable(page, '360px elevator');
  await press(page, /leave floor/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await expectTouchable(page, '360px building');
  expect(await page.evaluate(() => document.documentElement.clientWidth)).toBe(360);
});

test('on a desktop a floor’s key is its number (Guide:111): 0 is the lobby, 9 is floor 9, floors past 9 show no key, and no empty key box is drawn', async ({
  page,
  hasTouch,
}) => {
  test.skip(hasTouch, 'a phone shows no keys');
  await plant(page, LOBBY.slice(0, -2));
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  await expect(page.locator('button[data-option="enter:0"] kbd')).toHaveCount(0);
  await expect(page.locator('button[data-option="enter:15"] kbd')).toHaveText('0');
  await expect(page.locator('button[data-option="enter:6"] kbd')).toHaveText('9');
  await expect(page.locator('kbd:empty')).toHaveCount(0);
  await page.keyboard.press('0');
  await expect(page.getByTestId('place-name')).toHaveText('Floor 0');
  await page.keyboard.press('l');
  await page.keyboard.press('9');
  await expect(page.getByTestId('place-name')).toHaveText('Floor 9');
});

test('the keyboard is an extra: U and D ride the elevator, C the corridor, B back, F forward', async ({
  page,
  hasTouch,
}) => {
  test.skip(hasTouch, 'a phone has no keyboard — nothing may depend on one');
  await plant(page, LOBBY);
  await page.goto('./');
  await page.keyboard.press('u');
  await expect(page.getByTestId('place-name')).toHaveText('Floor 1');
  await page.keyboard.press('d');
  await expect(page.getByTestId('place-name')).toHaveText('Floor 0');
  await page.keyboard.press('c');
  await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(9);
  await page.keyboard.press('1');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  await page.keyboard.press('f');
  await expect(page.getByRole('button', { name: /go back/i })).toBeVisible();
  await page.keyboard.press('b');
  await page.keyboard.press('l');
  await expect(page.getByTestId('place-kind')).toHaveText('FLOOR');
  await page.keyboard.press('b');
  await expect(page.locator('button[data-option^="enter:"]')).toHaveCount(0);
});
