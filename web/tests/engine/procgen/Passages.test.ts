import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Apartment } from '#engine/model/Apartment.ts';
import type { Building } from '#engine/model/Building.ts';
import type { CorridorShape } from '#engine/model/CorridorShape.ts';
import type { Floor } from '#engine/model/Floor.ts';
import { every, must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

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

/** The first building of the first street under `n`. */
function buildingOf(n: number): Building {
  const street = must(toStreet(registry.universe(sampleSeed(n)), () => n).at(-1));
  return must(street.children()[n % street.children().length]) as Building;
}

const SHAPES: readonly CorridorShape[] = ['long', 'service', 'curved', 'static'];

describe('the peek (U02): a floor reads its corridor’s shape and its doors’ looks from the seeds, making neither', () => {
  test('what a floor peeks is what its corridor and doors are once made, for every floor of forty buildings', () => {
    for (let n = 0; n < 40; n++) {
      const building = buildingOf(n);
      for (const floor of building.children().slice(0, building.floors()) as Floor[]) {
        const peeked = must(floor.figure());
        const corridor = floor.corridor();
        const doors = every(corridor.children(), Apartment).map((apartment) => apartment.door());
        expect(peeked.shape, floor.address().toString()).toBe(must(corridor.figure() ?? undefined).shape);
        expect(peeked.looks).toEqual(doors.map((door) => door.look()));
        expect(peeked.doors).toBe(building.doorsPerFloor());
      }
    }
  });

  test('a corridor’s shape is the key its sentence carries: one of four, and the curved gallery is curved', () => {
    for (let n = 0; n < 8; n++) {
      const corridor = floorOf(n).corridor();
      const shape = must(corridor.figure() ?? undefined).shape ?? 'none';
      expect(SHAPES).toContain(shape);
      if (must(corridor.description()[0]).startsWith('A curved gallery')) expect(shape).toBe('curved');
      if (must(corridor.description()[0]).startsWith('A narrow service')) expect(shape).toBe('service');
    }
  });

  test('the building’s portrait peeks every floor and makes no corridor: no floor has asked for its children', () => {
    const building = buildingOf(3);
    const portrait = must(building.portrait());
    const floors = building.children().slice(0, building.floors());
    expect(portrait.tower?.rows).toHaveLength(building.floors());
    expect(floors.some((floor) => floor.populated())).toBe(false);
  });
});

describe('the corridor list carries its shapes', () => {
  test('every corridor sentence carries one of the four shapes a picture knows', () => {
    const library = new ContentLibrary(new BundledContent());
    const pairs = library.pairs('themes/descriptions/corridor');
    expect(pairs.length).toBeGreaterThanOrEqual(4);
    for (const [sentence, shape] of pairs) expect(SHAPES, sentence).toContain(shape);
  });
});

describe('what draws a floor, and what its picture is handed (U02)', () => {
  test('at the elevator a floor is drawn by the tower and handed the building’s portrait; in the corridor by the corridor, handed its own shape and doors', () => {
    const building = buildingOf(6);
    const floor = must(building.children()[1]) as Floor;
    floor.arrive();
    expect(floor.drawing()).toBe('building');
    expect(floor.portrait()).toEqual(building.portrait());
    expect(building.portrait().tower?.car).toBe(1);
    floor.move('corridor');
    expect(floor.drawing()).toBe('corridor');
    expect(floor.portrait()?.shape).toBe(must(floor.corridor().figure() ?? undefined).shape);
    expect(floor.portrait()?.looks).toHaveLength(building.doorsPerFloor());
    expect(floor.portrait()?.tower).toBeUndefined();
  });

  test('the building’s portrait: its size, its address and landmark (what the roof is drawn from), the car', () => {
    const building = buildingOf(2);
    const portrait = must(building.portrait());
    expect(portrait.floors).toBe(building.floors());
    expect(portrait.doors).toBe(building.doorsPerFloor());
    expect(portrait.tower).toMatchObject({
      address: building.address().toString(),
      landmark: building.landmark(),
      car: 0,
    });
  });

  test('the building’s portrait has a row per level, lowest first, each with its number and whether it is a Layer: the Layers’ rows only once breached', () => {
    const building = buildingOf(2);
    const floors = Array.from({ length: building.floors() }, (_, n) => ({ number: n, layer: false }));
    expect(building.portrait().tower?.rows.map((row) => row.level)).toEqual(floors);
    expect(building.recall(JSON.stringify({ breached: true }))).toBe(true);
    const layers = Array.from({ length: building.layers() }, (_, k) => ({
      number: k - building.layers(),
      layer: true,
    }));
    expect(building.portrait().tower?.rows.map((row) => row.level)).toEqual([...layers, ...floors]);
  });

  test('a Layer keeps its own screen until U04: drawn by its kind’s key, and at its elevator it hands its own portrait, not the tower', () => {
    const building = buildingOf(2);
    expect(building.recall(JSON.stringify({ breached: true }))).toBe(true);
    const layer = must(building.floorNumbered(-1));
    layer.arrive();
    expect(layer.drawing()).toBe('layer');
    expect(layer.portrait()).toEqual(layer.figure());
    expect(layer.portrait()?.tower).toBeUndefined();
  });

  test('a door hands its picture its look and the word written on it', () => {
    const corridor = floorOf(7).corridor();
    for (const apartment of every(corridor.children(), Apartment)) {
      const door = apartment.door();
      expect(apartment.figure().door).toEqual({
        look: door.look(),
        words: door.inscription()?.word() ?? '',
      });
    }
  });
});
