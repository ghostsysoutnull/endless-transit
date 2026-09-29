import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Apartment } from '#engine/model/Apartment.ts';
import type { Building } from '#engine/model/Building.ts';
import { Corridor } from '#engine/model/Corridor.ts';
import type { CorridorShape } from '#engine/model/CorridorShape.ts';
import type { Floor } from '#engine/model/Floor.ts';
import { Level } from '#engine/model/Level.ts';
import { corridorOf, readPortrait, towerOf } from '#tests/support/readPortrait.ts';
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
        const peeked = must(floor.onTower()[0]);
        const corridor = must(every([floor.corridor()], Corridor)[0]);
        const doors = every(corridor.children(), Apartment).map((apartment) => apartment.door());
        expect(peeked.shape, floor.address().toString()).toBe(corridor.shape());
        expect(floor.shape()).toBe(corridor.shape());
        expect(peeked.looks).toEqual(doors.map((door) => door.look()));
        expect(peeked.looks).toHaveLength(building.doorsPerFloor());
      }
    }
  });

  test('a corridor’s shape is the key its sentence carries: one of four, and the curved gallery is curved', () => {
    for (let n = 0; n < 8; n++) {
      const corridor = must(every([floorOf(n).corridor()], Corridor)[0]);
      const shape = corridor.shape();
      expect(SHAPES).toContain(shape);
      if (must(corridor.description()[0]).startsWith('A curved gallery')) expect(shape).toBe('curved');
      if (must(corridor.description()[0]).startsWith('A narrow service')) expect(shape).toBe('service');
    }
  });

  test('the building’s portrait peeks every floor and makes no corridor: no floor has asked for its children', () => {
    const building = buildingOf(3);
    const floors = building.children().slice(0, building.floors());
    expect(towerOf(building.portrait()).rows).toHaveLength(building.floors());
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
  test('at the elevator a floor is drawn as its building’s tower; in the corridor as the corridor, handed its shape and a door per apartment', () => {
    const building = buildingOf(6);
    const floor = must(building.children()[1]) as Floor;
    floor.arrive();
    expect(readPortrait(floor.portrait())).toEqual(readPortrait(building.portrait()));
    expect(towerOf(building.portrait()).car).toBe(1);
    floor.move('corridor');
    const corridor = corridorOf(floor.portrait());
    expect(corridor.shape).toBe(must(every([floor.corridor()], Corridor)[0]).shape());
    expect(corridor.doors.map((door) => door.address)).toEqual(
      floor
        .corridor()
        .children()
        .map((apartment) => apartment.address().toString()),
    );
  });

  test('a building on its street: its address, its floors and the doors on each; its tower: its address and landmark (what the roof is drawn from), the car', () => {
    const building = buildingOf(2);
    expect(building.onStreet()).toEqual([
      { address: building.address().toString(), floors: building.floors(), doors: building.doorsPerFloor() },
    ]);
    expect(towerOf(building.portrait())).toMatchObject({
      address: building.address().toString(),
      landmark: building.landmark(),
      car: 0,
    });
  });

  test('the building’s portrait has a row per level, lowest first, each with its level (a floor’s or a Layer’s): the Layers’ rows only once breached', () => {
    const building = buildingOf(2);
    const floors = Array.from({ length: building.floors() }, (_, n) => new Level(n, 'floor'));
    expect(towerOf(building.portrait()).rows.map((row) => row.level)).toEqual(floors);
    expect(building.recall(JSON.stringify({ breached: true }))).toBe(true);
    const layers = Array.from(
      { length: building.layers() },
      (_, k) => new Level(k - building.layers(), 'layer'),
    );
    expect(towerOf(building.portrait()).rows.map((row) => row.level)).toEqual([...layers, ...floors]);
  });

  test('a Layer keeps its own screen until U04: no picture draws it, not even the tower at its elevator', () => {
    const building = buildingOf(2);
    expect(building.recall(JSON.stringify({ breached: true }))).toBe(true);
    const layer = must(building.floorNumbered(-1));
    layer.arrive();
    expect(readPortrait(layer.portrait())).toEqual({ drawn: 'unseen' });
  });

  test('a door hands its picture its look and the word written on it', () => {
    const corridor = floorOf(7).corridor();
    for (const apartment of every(corridor.children(), Apartment)) {
      const door = apartment.door();
      expect(apartment.onCorridor()).toEqual([
        {
          address: apartment.address().toString(),
          look: door.look(),
          words: door.inscription()?.word() ?? '',
        },
      ]);
    }
  });
});
