import { expect, test } from '@playwright/test';
import { press, watchForErrors } from './support/harness.ts';

const SEED_FORM = /^[0-9A-F]{4}(-[0-9A-F]{4}){3}$/;
const SLOT = 'endless-transit.save';

test('localStorage that throws on every touch: the game still plays, it only forgets', async ({
  page,
  hasTouch,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('The operation is insecure.', 'SecurityError');
      },
    });
  });
  const problems = watchForErrors(page);
  await page.goto('./');
  expect(
    await page.evaluate(
      '(() => { try { return typeof window.localStorage; } catch { return "throws"; } })()',
    ),
  ).toBe('throws');
  await press(page, /new world/i, hasTouch);
  await expect(page.getByTestId('world-seed')).toHaveText(SEED_FORM);
  await press(page, /re-roll/i, hasTouch);
  await expect(page.getByTestId('world-seed')).toHaveText(SEED_FORM);

  await page.reload();
  await expect(page.getByTestId('prompt')).toBeVisible();
  expect(problems).toEqual([]);
});

test('a full storage (setItem throws): the world is drawn anyway', async ({ page, hasTouch }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('The quota has been exceeded.', 'QuotaExceededError');
    };
  });
  const problems = watchForErrors(page);
  await page.goto('./');
  await press(page, /new world/i, hasTouch);
  await expect(page.getByTestId('world-seed')).toHaveText(SEED_FORM);
  expect(problems).toEqual([]);
});

for (const [what, value] of [
  ['not JSON', '<<garbage>>'],
  ['JSON of another shape', '{"hello":"world"}'],
  ['a version from the future', '{"version":99,"seed":"7F3A-91C2-0B4D-E6A8"}'],
  ['a seed that is not a seed', '{"version":1,"seed":"DROP TABLE"}'],
] as const) {
  test(`a saved value that is ${what} gives a fresh game`, async ({ page, hasTouch }) => {
    await page.addInitScript(
      ([slot, text]) => {
        if (window.sessionStorage.getItem('planted') !== null) return;
        window.sessionStorage.setItem('planted', 'yes');
        window.localStorage.setItem(slot, text);
      },
      [SLOT, value] as const,
    );
    const problems = watchForErrors(page);
    await page.goto('./');
    await expect(page.getByTestId('prompt')).toBeVisible();
    await expect(page.getByRole('button')).toHaveCount(1);
    await expect(page.getByTestId('status')).toHaveText('');

    // …and the bad value is simply replaced by the next real save.
    await press(page, /new world/i, hasTouch);
    const seed = await page.getByTestId('world-seed').innerText();
    await page.reload();
    await expect(page.getByTestId('world-seed')).toHaveText(seed);
    expect(problems).toEqual([]);
  });
}

test('a tap on an option that is not on offer (stale or unknown id) is ignored', async ({
  page,
  hasTouch,
}) => {
  const problems = watchForErrors(page);
  await page.goto('./');
  const button = page.getByRole('button', { name: /new world/i });

  for (const id of ['no-such-option', 'reroll', '']) {
    await button.evaluate((el, value) => {
      el.setAttribute('data-option', value);
    }, id);
    await (hasTouch ? button.tap() : button.click());
    await expect(page.getByTestId('prompt')).toBeVisible();
    await expect(page.getByTestId('world-seed')).toHaveCount(0);
  }

  await button.evaluate((el) => {
    el.setAttribute('data-option', 'new-world');
  });
  await (hasTouch ? button.tap() : button.click());
  await expect(page.getByTestId('world-seed')).toHaveText(SEED_FORM);
  expect(problems).toEqual([]);
});
