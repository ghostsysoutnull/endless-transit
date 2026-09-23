import { expect, test, type Page } from '@playwright/test';
import { press, saveText } from './support/harness.ts';

/** What holds the focus right now, as `TAG[data-option]`. */
const FOCUSED = `(() => {
  const el = document.activeElement;
  return el === null ? 'none' : el.tagName + '[' + (el.getAttribute('data-option') ?? '') + ']';
})()`;

test('keyboard: Tab → Enter on NEW WORLD leaves the focus on an option button, not on the body', async ({
  page,
  hasTouch,
}) => {
  test.skip(hasTouch, 'a phone has no Tab key — the touch case is the next test');
  await page.goto('./');
  await page.keyboard.press('Tab');
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[new-world]');
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('world-seed')).toBeVisible();
  // NEW WORLD left the screen: the focus went to the first option on offer, which is now the way in.
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[enter-world]');

  // A button that stays on screen keeps the focus it had: Tab to RE-ROLL, Enter re-rolls, the focus stays.
  await page.keyboard.press('Tab');
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[reroll]');
  const first = await page.getByTestId('world-seed').innerText();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('world-seed')).not.toHaveText(first);
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[reroll]');
});

test('pointer or touch: when the pressed button leaves the screen, the focus moves to the first option', async ({
  page,
  hasTouch,
}) => {
  await page.goto('./');
  await page.getByRole('button', { name: /new world/i }).focus();
  await press(page, /new world/i, hasTouch);
  await expect(page.getByTestId('world-seed')).toBeVisible();
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[enter-world]');
});

test('entering a place moves the focus to the first place on its list — every level, no dead end at the body', async ({
  page,
  hasTouch,
}) => {
  await page.goto('./');
  await page.getByRole('button', { name: /new world/i }).focus();
  await press(page, /new world/i, hasTouch);
  await press(page, /enter world/i, hasTouch);
  await expect(page.getByTestId('place-kind')).toHaveText('STREET');
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[enter:0]');
  const first = page.locator('button[data-option="enter:0"]');
  await (hasTouch ? first.tap() : first.click());
  await expect(page.getByTestId('place-kind')).toHaveText('BUILDING');
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[enter:0]');
});

test('a key pressed with nothing focused does not grab the focus', async ({ page, hasTouch }) => {
  test.skip(hasTouch, 'a phone has no keyboard');
  await page.goto('./');
  await page.keyboard.press('n');
  await expect(page.getByTestId('world-seed')).toBeVisible();
  expect(await page.evaluate(FOCUSED)).toBe('BODY[]');
});

/** A fixed world with the traveller standing on a planet, five levels down. */
async function plantOnAPlanet(page: Page): Promise<void> {
  await page.addInitScript(
    ([slot, text]) => {
      if (window.sessionStorage.getItem('planted') !== null) return;
      window.sessionStorage.setItem('planted', 'yes');
      window.localStorage.setItem(slot, text);
    },
    ['endless-transit.save', saveText('7F3A-91C2-0B4D-E6A8', '0.0.0.0.0')] as const,
  );
}

test('keyboard: Enter on LEAVE three times climbs three levels — the focus stays on LEAVE, it never walks back down', async ({
  page,
  hasTouch,
}) => {
  test.skip(hasTouch, 'a phone has no Enter key');
  await plantOnAPlanet(page);
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('PLANET');
  await page.locator('button[data-option="leave"]').focus();
  for (const level of ['SOLAR SYSTEM', 'GALACTIC SECTOR', 'COSMIC FILAMENT']) {
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('place-kind')).toHaveText(level);
    expect(await page.evaluate(FOCUSED)).toBe('BUTTON[leave]');
  }
  // At the top there is nothing to leave: the button goes, and the focus moves to the first place — not to the body.
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('place-kind')).toHaveText('UNIVERSE');
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[enter:0]');
});

test('keyboard: Enter on TITLE SCREEN, then Enter again, is a round trip to the same place — never a step deeper', async ({
  page,
  hasTouch,
}) => {
  test.skip(hasTouch, 'a phone has no Enter key');
  await plantOnAPlanet(page);
  await page.goto('./');
  const planet = await page.getByTestId('place-name').innerText();
  await page.locator('button[data-option="to-title"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('world-seed')).toBeVisible();
  // The way back holds the focus, so the second Enter undoes the first.
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[enter-world]');
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('place-kind')).toHaveText('PLANET');
  await expect(page.getByTestId('place-name')).toHaveText(planet);
  expect(await page.evaluate(FOCUSED)).toBe('BUTTON[to-title]');
});

/** The lobby of Ornate Sanctum (16 floors), and the first room behind its first door (two rooms). */
const LOBBY = '0.0.0.0.0.0.0.0.0.0';
async function plantAt(page: Page, path: string, states: Record<string, string> = {}): Promise<void> {
  await page.addInitScript(
    ([slot, text]) => {
      if (window.sessionStorage.getItem('planted') !== null) return;
      window.sessionStorage.setItem('planted', 'yes');
      window.localStorage.setItem(slot, text);
    },
    ['endless-transit.save', saveText('7F3A-91C2-0B4D-E6A8', path, states)] as const,
  );
}

test('keyboard: Enter on GO UP rides to the Peak and then rests — it never lands on GO DOWN and rides back', async ({
  page,
  hasTouch,
}) => {
  test.skip(hasTouch, 'a phone has no Enter key');
  await plantAt(page, LOBBY);
  await page.goto('./');
  await expect(page.getByTestId('place-name')).toHaveText('FLOOR 0');
  await page.locator('button[data-option="move:up"]').focus();
  for (let floor = 1; floor <= 15; floor++) {
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('place-name')).toHaveText(`FLOOR ${String(floor)}`);
  }
  // The Peak: GO UP is gone. The focus rests on the screen, not on the body and never on the opposite move.
  await expect(page.locator('button[data-option="move:up"]')).toHaveCount(0);
  for (let again = 0; again < 5; again++) {
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('place-name')).toHaveText('FLOOR 15');
    // The resting place is the panel that says where you are.
    expect(await page.evaluate(FOCUSED)).toBe('SECTION[]');
  }
});

test('keyboard: Enter on GO FORWARD reaches the last room and then rests — never on GO BACK, never on the title', async ({
  page,
  hasTouch,
}) => {
  test.skip(hasTouch, 'a phone has no Enter key');
  await plantAt(page, `${LOBBY}.0.0.0`, { [LOBBY]: 'corridor' });
  await page.goto('./');
  await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
  const last = await page.getByTestId('place-name').innerText();
  await page.locator('button[data-option="move:forward"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('place-name')).not.toHaveText(last);
  const here = await page.getByTestId('place-name').innerText();
  await expect(page.locator('button[data-option="move:forward"]')).toHaveCount(0);
  for (let again = 0; again < 3; again++) {
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('place-kind')).toHaveText('ROOM');
    await expect(page.getByTestId('place-name')).toHaveText(here);
    expect(await page.evaluate(FOCUSED)).toBe('SECTION[]');
  }
});
