import { describe, expect, test } from 'vitest';
import type { Location } from '#engine/model/Location.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { must, realRegistry, toStreet } from '#tests/support/world.ts';

/** The first corridor of the first building on the first street of a seed's world. */
function corridorOf(seed: Seed): Location {
  const street = must(toStreet(realRegistry().universe(seed), () => 0).at(-1));
  return must(street.children()[0]?.children()[0]?.children()[0]);
}

describe('PoleSign — the states the pole tags a level with (U05, Decision 13)', () => {
  test('a corridor that curves away is tagged curved; a straight one is not', () => {
    expect(corridorOf(new Seed(5, 1)).poleSigns()).toEqual([{ look: 'curved' }]);
    expect(corridorOf(new Seed(5, 2)).poleSigns()).toEqual([]);
  });

  test('an apartment whose door is not stable is tagged with the door’s state; a stable one is not', () => {
    expect(must(corridorOf(new Seed(5, 2)).children()[8]).poleSigns()).toEqual([
      { look: 'door', state: 'Cold' },
    ]);
    expect(must(corridorOf(new Seed(5, 3)).children()[2]).poleSigns()).toEqual([]);
  });

  test('an apartment out of time is tagged an anomaly', () => {
    const anomaly = must(corridorOf(new Seed(5, 16)).children()[2]);
    expect(anomaly.poleSigns()).toContainEqual({ look: 'anomaly' });
  });

  test('a place of no such state carries no tag', () => {
    const street = must(toStreet(realRegistry().universe(new Seed(5, 1)), () => 0).at(-1));
    expect(street.poleSigns()).toEqual([]);
  });
});
