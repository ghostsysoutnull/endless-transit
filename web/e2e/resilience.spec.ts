import { expect, test } from '@playwright/test';
import { press, saveText, trailOf, watchForErrors } from './support/harness.ts';

const SEED_FORM = /^[0-9A-F]{4}(-[0-9A-F]{4}){3}$/;
const SLOT = 'endless-transit.save';
/** A world whose shape is known (world.spec.ts walks it): the first street of its first city; its first building, Ornate Sanctum, 16 floors, 9 doors. */
const SEED = '7F3A-91C2-0B4D-E6A8';
const STREET = '0.0.0.0.0.0.0.0';
const BUILDING = `${STREET}.0`;
const LOBBY = `${BUILDING}.0`;
const save = (path: string, states: Record<string, string> = {}): string => saveText(SEED, path, states);

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
  ['a save of the first build (version 1)', '{"version":1,"seed":"7F3A-91C2-0B4D-E6A8"}'],
  ['a save of the big-world build (version 2)', `{"version":2,"seed":"${SEED}","path":"${STREET}"}`],
  [
    'a save of the buildings build (version 3)',
    `{"version":3,"seed":"${SEED}","path":"${STREET}","states":{}}`,
  ],
  ['a seed that is not a seed', saveText('DROP TABLE', null)],
  // The traveller the save describes must be one the game could have written.
  ['coherence past 100', saveText(SEED, STREET, {}, { coherence: 101 })],
  ['coherence below zero', saveText(SEED, STREET, {}, { coherence: -1 })],
  ['a step count that is not whole', saveText(SEED, STREET, {}, { steps: 1.5 })],
  ['a visited path that does not hold the trail', saveText(SEED, STREET, {}, { visited: ['0'] })],
  ['a visited place that is nowhere', saveText(SEED, STREET, {}, { visited: [...trailOf(STREET), '0.99'] })],
  [
    'a visited child before its parent',
    saveText(SEED, STREET, {}, { visited: [...trailOf(STREET), `${BUILDING}.3`, BUILDING] }),
  ],
  ['a used traveller on a world never entered', saveText(SEED, null, {}, { steps: 3 })],
  // A good seed with a path that leads nowhere is a corrupt save: a fresh title, never half a world.
  ['a path past the last child', save('0.99')],
  ['a path past the last building', save(`${STREET}.99`)],
  ['a path past the top floor', save(`${STREET}.0.16`)],
  ['a path into a corridor, where nobody stands', save(`${LOBBY}.0`)],
  ['a path into an apartment, where nobody stands', save(`${LOBBY}.0.0`)],
  ['a path past the last room', save(`${LOBBY}.0.0.9`)],
  ['a path deeper than the world goes', save(`${LOBBY}.0.0.0.0`)],
  ['a path that is a number', save(STREET).replace(`"${STREET}"`, '7')],
  ['a path that is a list', save(STREET).replace(`"${STREET}"`, '["0","1"]')],
  ['a path with no path in it', save(STREET).replace(`"path":"${STREET}",`, '')],
  ['a path with no states', save(STREET).replace('"states":{},', '')],
  ['states that are a list', save(STREET).replace('"states":{}', '"states":[]')],
  ['a save with no traveller', save(STREET).replace(/,"coherence".*$/, '}')],
  ['a state a floor cannot take', save(LOBBY, { [LOBBY]: 'lift' })],
  ['a state on a place with no states', save(STREET, { [STREET]: 'corridor' })],
  ['a state for a place that is nowhere', save(STREET, { '0.99': 'corridor' })],
  // States that disagree with the path: not a save this game could have written.
  ['a state for a floor that is not on the path', save(STREET, { [`${BUILDING}.3`]: 'corridor' })],
  ['a room below a floor still at its elevator', save(`${LOBBY}.0.0.0`)],
  ['a floor the elevator has not been called to', save(`${BUILDING}.5`)],
  ['a mode a floor would never write', save(LOBBY, { [LOBBY]: 'elevator' })],
  ['a path that is malformed text', save('0..1')],
  ['a path that starts outside the universe', save('1.0')],
  ['a path with a negative step', save('0.-1')],
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

for (const [what, text, kind] of [
  ['the street itself', save(STREET), 'STREET'],
  ['the lobby of its first building', save(LOBBY), 'FLOOR'],
  ['the lobby in its corridor', save(LOBBY, { [LOBBY]: 'corridor' }), 'FLOOR'],
  ['the first room behind the first door', save(`${LOBBY}.0.0.0`, { [LOBBY]: 'corridor' }), 'ROOM'],
  ['floor 5, the elevator called there', save(`${BUILDING}.5`, { [BUILDING]: '{"elevator":5}' }), 'FLOOR'],
  ['the building, the elevator at 5', save(BUILDING, { [BUILDING]: '{"elevator":5}' }), 'BUILDING'],
] as const) {
  test(`the control: the same seed with ${what} as its path is a good save, and is restored`, async ({
    page,
  }) => {
    await page.addInitScript(
      ([slot, value]) => {
        window.localStorage.setItem(slot, value);
      },
      [SLOT, text] as const,
    );
    const problems = watchForErrors(page);
    await page.goto('./');
    await expect(page.getByTestId('place-kind')).toHaveText(kind);
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
