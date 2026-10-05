import { describe, expect, test } from 'vitest';
import type { Location } from '#engine/model/Location.ts';
import type { Run } from '#engine/rules/Ending.ts';
import { Endings } from '#engine/rules/Endings.ts';
import { must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

const universe = realRegistry().universe(sampleSeed(1));
const street = must(toStreet(universe, () => 0).at(-1));

/** A run a test names by what it cares about: a short, plain visit on a street unless told otherwise. */
function run(overrides: Partial<Run> = {}): Run {
  return {
    here: street,
    places: 9,
    steps: 12,
    relics: 1,
    resonant: 0,
    reboots: 0,
    critical: false,
    echo: false,
    hybrid: false,
    ...overrides,
  };
}

/** A stand-in for a place at a depth of its own: what the ladder asks of where the run ended. */
function at(depth: number, abyssal = false): Location {
  return new Proxy(street, {
    get(target, property, receiver) {
      if (property === 'depth') return () => depth;
      if (property === 'abyssal') return () => abyssal;
      return Reflect.get(target, property, receiver) as unknown;
    },
  });
}

describe('Endings — the ladder, the first reached wins', () => {
  const endings = new Endings();

  test('a short, plain visit is severed; each fact of the ladder, alone, reaches its own ending', () => {
    expect(endings.of(run())).toBe('severed');
    expect(endings.of(run({ here: at(8, true) }))).toBe('void');
    expect(endings.of(run({ echo: true }))).toBe('echo');
    expect(endings.of(run({ hybrid: true }))).toBe('hybrid');
    expect(endings.of(run({ reboots: 1 }))).toBe('reborn');
    expect(endings.of(run({ critical: true }))).toBe('frayed');
    expect(endings.of(run({ places: 20, relics: 0 }))).toBe('empty');
    expect(endings.of(run({ places: 10, steps: 30 }))).toBe('pacing');
    expect(endings.of(run({ resonant: 3 }))).toBe('tuned');
    expect(endings.of(run({ places: 20 }))).toBe('expedition');
    expect(endings.of(run({ here: at(3) }))).toBe('sky');
    expect(endings.of(run({ here: at(11) }))).toBe('settled');
  });

  test('the edges: nineteen places is not an expedition, twenty-nine steps for ten places is not pacing, two resonant traces are not in tune, the planet is below the sky and an apartment is not a room', () => {
    expect(endings.of(run({ places: 19 }))).toBe('severed');
    expect(endings.of(run({ places: 10, steps: 29 }))).toBe('severed');
    expect(endings.of(run({ resonant: 2 }))).toBe('severed');
    expect(endings.of(run({ here: at(4) }))).toBe('severed');
    expect(endings.of(run({ here: at(10) }))).toBe('severed');
  });

  test('the order: the void over everything, what is carried over how it went, how it went over the tally, the tally over where it ended', () => {
    expect(endings.of(run({ here: at(8, true), echo: true, hybrid: true, reboots: 2 }))).toBe('void');
    expect(endings.of(run({ echo: true, hybrid: true }))).toBe('echo');
    expect(endings.of(run({ hybrid: true, reboots: 1, critical: true }))).toBe('hybrid');
    expect(endings.of(run({ reboots: 1, critical: true, places: 20 }))).toBe('reborn');
    expect(endings.of(run({ critical: true, places: 20, resonant: 3 }))).toBe('frayed');
    expect(endings.of(run({ places: 20, relics: 0, steps: 90, resonant: 3 }))).toBe('empty');
    expect(endings.of(run({ places: 20, steps: 90, resonant: 3 }))).toBe('pacing');
    expect(endings.of(run({ places: 20, resonant: 3, here: at(11) }))).toBe('tuned');
    expect(endings.of(run({ places: 20, here: at(11) }))).toBe('expedition');
  });
});
