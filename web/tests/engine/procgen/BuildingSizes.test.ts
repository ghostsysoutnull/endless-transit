import { describe, expect, test } from 'vitest';
import { BuildingSizes } from '#engine/procgen/BuildingSizes.ts';
import { sampleSeed } from '#tests/support/world.ts';

const sizes = new BuildingSizes();
const SMALL = { min: 3, max: 10 };
const MEDIUM = { min: 10, max: 25 };
const LARGE = { min: 30, max: 50 };
const MASSIVE = { min: 50, max: 100 };
/** Doors per corridor, by size (BuildingFactory.groovy:39-51; the brief's "2–20 per corridor"). */
const DOORS = [
  { floors: SMALL, doors: { min: 2, max: 6 } },
  { floors: MEDIUM, doors: { min: 4, max: 10 } },
  { floors: LARGE, doors: { min: 8, max: 16 } },
  { floors: MASSIVE, doors: { min: 10, max: 20 } },
];

describe('BuildingSizes — which size for which roll (Guide, "Building size odds"; BuildingFactory.groovy:29-50)', () => {
  test.each([
    [0, SMALL],
    [40, SMALL],
    [41, MEDIUM],
    [70, MEDIUM],
    [71, LARGE],
    [90, LARGE],
    [91, MASSIVE],
    [99, MASSIVE],
  ])('a roll of %i is a building of %o floors', (roll, band) => {
    expect(sizes.bandFor(roll).floors).toEqual(band);
  });

  test.each([
    [0, { min: 2, max: 6 }],
    [40, { min: 2, max: 6 }],
    [41, { min: 4, max: 10 }],
    [70, { min: 4, max: 10 }],
    [71, { min: 8, max: 16 }],
    [90, { min: 8, max: 16 }],
    [91, { min: 10, max: 20 }],
    [99, { min: 10, max: 20 }],
  ])('a roll of %i is a building with %o doors per corridor', (roll, band) => {
    expect(sizes.bandFor(roll).doors).toEqual(band);
  });

  test('the hundred rolls split 41 / 30 / 20 / 9 — exactly, no sample needed', () => {
    const count = (band: { min: number; max: number }) =>
      Array.from({ length: 100 }, (_, roll) => sizes.bandFor(roll)).filter(
        (each) => each.floors.min === band.min,
      ).length;
    expect(count(SMALL)).toBe(41);
    expect(count(MEDIUM)).toBe(30);
    expect(count(LARGE)).toBe(20);
    expect(count(MASSIVE)).toBe(9);
  });

  test('a roll outside 0…99 is an error, never a silent smallest size', () => {
    expect(() => sizes.bandFor(100)).toThrow(RangeError);
    expect(() => sizes.bandFor(-1)).toThrow(RangeError);
    expect(() => sizes.bandFor(40.5)).toThrow(RangeError);
  });

  test.each([SMALL, MEDIUM, LARGE, MASSIVE])(
    'floors of a %o building: never outside the band, and both ends are reached',
    (band) => {
      const seen = Array.from({ length: 20_000 }, (_, n) => sampleSeed(n))
        .filter((seed) => sizes.bandOf(seed).floors.min === band.min)
        .map((seed) => sizes.floorsOf(seed));
      expect(seen.length).toBeGreaterThan(1_000);
      expect(Math.min(...seen)).toBe(band.min);
      expect(Math.max(...seen)).toBe(band.max);
    },
  );

  test.each(DOORS)(
    'doors per corridor of a %o building: never outside the band, and both ends are reached',
    ({ floors, doors }) => {
      const seen = Array.from({ length: 20_000 }, (_, n) => sampleSeed(n))
        .filter((seed) => sizes.bandOf(seed).floors.min === floors.min)
        .map((seed) => sizes.doorsPerFloorOf(seed));
      expect(seen.length).toBeGreaterThan(1_000);
      expect(Math.min(...seen)).toBe(doors.min);
      expect(Math.max(...seen)).toBe(doors.max);
    },
  );

  test('the same seed always gives the same floors', () => {
    expect(sizes.floorsOf(sampleSeed(5))).toBe(new BuildingSizes().floorsOf(sampleSeed(5)));
  });
});
