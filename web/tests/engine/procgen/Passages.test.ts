import { describe, expect, test } from 'vitest';
import type { Building } from '#engine/model/Building.ts';
import type { Floor } from '#engine/model/Floor.ts';
import { must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();

/** Floor 1 of the first building of the first street under `n` (the sample the pins below were read from). */
function floorOf(n: number): Floor {
  const street = must(toStreet(registry.universe(sampleSeed(n)), () => n).at(-1));
  const building = must(street.children()[n % street.children().length]) as Building;
  return must(building.children()[1]) as Floor;
}

describe('a corridor’s words, pinned before its shape joins them (U02 step 0)', () => {
  test('the same seeds deal the same sentences as before the list became pairs', () => {
    expect(Array.from({ length: 8 }, (_, n) => floorOf(n).corridor().description()[0])).toEqual([
      'A long corridor with multiple doors.',
      'A long corridor with multiple doors.',
      'A dead-straight corridor whose far end dissolves into static.',
      'A long corridor with multiple doors.',
      'A long corridor with multiple doors.',
      'A long corridor with multiple doors.',
      'A curved gallery of doors beneath a single strip of light.',
      'A narrow service corridor, doors set flush into either wall.',
    ]);
  });
});
