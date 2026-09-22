import { describe, expect, test } from 'vitest';
import { Address } from '#engine/model/Address.ts';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { Journey } from '#engine/rules/Journey.ts';
import { must, realRegistry } from '#tests/support/world.ts';

const SEED = new Seed(0x7f3a91c2, 0x0b4de6a8);
/** Bright Boulevard: the first street of the first city … of seed 7F3A. */
const STREET = '0.0.0.0.0.0.0.0';

function journey(): Journey {
  return new Journey(realRegistry());
}

/** A journey standing on Bright Boulevard. */
function onTheStreet(): Journey {
  const trip = journey();
  trip.begin(SEED);
  trip.enter();
  return trip;
}

/** …in the first room behind the first door of the lobby of Ornate Sanctum (16 floors, 9 doors). */
function inTheFirstRoom(): Journey {
  const trip = onTheStreet();
  expect(trip.descend(0)).toBe(true);
  expect(trip.descend(15)).toBe(true); // the lobby is listed last
  expect(trip.move('corridor')).toBe(true);
  expect(trip.descend(0)).toBe(true);
  return trip;
}

describe('Journey — where the traveller stands', () => {
  test('before a world is drawn there is no world, no place and nothing to save', () => {
    const fresh = journey();
    expect(fresh.world()).toBeUndefined();
    expect(fresh.here()).toBeUndefined();
    expect(fresh.saved()).toBeUndefined();
  });

  test('a drawn world is not entered yet; entering it starts on a street (Guide:41), the universe above it', () => {
    const trip = journey();
    trip.begin(SEED);
    expect(trip.world()?.equals(SEED)).toBe(true);
    expect(trip.here()).toBeUndefined();
    expect(trip.saved()?.address()).toBeUndefined();
    trip.enter();
    expect(trip.here()?.kind().key()).toBe('street');
    expect(trip.here()?.address().toString()).toBe(STREET);
    expect(trip.saved()?.address()?.toString()).toBe(STREET);
    for (let level = 0; level < 7; level++) expect(trip.leave()).toBe(true);
    expect(trip.here()?.kind().key()).toBe('universe');
    expect(trip.leave()).toBe(false);
  });

  test('descend goes into the place listed at an index, leave comes back; the save follows', () => {
    const trip = onTheStreet();
    expect(trip.descend(0)).toBe(true);
    expect(trip.here()?.kind().key()).toBe('building');
    expect(trip.descend(1)).toBe(true);
    expect(trip.here()?.name()).toBe('Floor 14');
    expect(trip.here()?.address().toString()).toBe(`${STREET}.0.14`);
    expect(trip.saved()?.address()?.toString()).toBe(`${STREET}.0.14`);
    expect(trip.leave()).toBe(true);
    expect(trip.here()?.address().toString()).toBe(`${STREET}.0`);
  });

  test('moves that cannot be made change nothing: no such child, no such move, above the universe, not in a world', () => {
    const trip = journey();
    expect(trip.descend(0)).toBe(false);
    expect(trip.move('up')).toBe(false);
    trip.begin(SEED);
    expect(trip.descend(0)).toBe(false);
    trip.enter();
    expect(trip.descend(99)).toBe(false);
    expect(trip.descend(-1)).toBe(false);
    expect(trip.move('up')).toBe(false);
    expect(trip.here()?.address().toString()).toBe(STREET);
  });

  test('the elevator: up and down are moves on the floor; the top and the ground refuse', () => {
    const trip = onTheStreet();
    trip.descend(0);
    trip.descend(15);
    expect(trip.here()?.name()).toBe('Floor 0');
    expect(trip.move('down')).toBe(false);
    expect(trip.move('up')).toBe(true);
    expect(trip.move('up')).toBe(true);
    expect(trip.here()?.name()).toBe('Floor 2');
    expect(trip.saved()?.address()?.toString()).toBe(`${STREET}.0.2`);
    for (let level = 2; level < 15; level++) expect(trip.move('up')).toBe(true);
    expect(trip.here()?.name()).toBe('Floor 15');
    expect(trip.move('up')).toBe(false);
  });

  test('the corridor is a mode of the floor: entering it stays on the floor and is saved; a door leads straight into the first room (Guide:73)', () => {
    const trip = onTheStreet();
    trip.descend(0);
    trip.descend(15);
    expect(trip.move('corridor')).toBe(true);
    expect(trip.here()?.kind().key()).toBe('floor');
    expect(trip.here()?.listing().length).toBe(9);
    expect(trip.saved()?.states()).toEqual(new Map([[`${STREET}.0.0`, 'corridor']]));
    expect(trip.descend(2)).toBe(true);
    expect(trip.here()?.kind().key()).toBe('room');
    expect(trip.here()?.address().toString()).toBe(`${STREET}.0.0.0.2.0`);
    expect(
      trip
        .here()
        ?.trail()
        .map((step) => step.kind().key())
        .slice(8),
    ).toEqual(['building', 'floor', 'corridor', 'apartment', 'room']);
    expect(trip.saved()?.states()).toEqual(new Map([[`${STREET}.0.0`, 'corridor']]));
  });

  test('rooms: forward and back; leaving the first room lands on the floor, in the corridor; leaving the floor from there returns it to the elevator (HK-019)', () => {
    const trip = inTheFirstRoom();
    expect(trip.here()?.name()).toBe('Grand Power Plant');
    expect(trip.move('back')).toBe(false);
    expect(trip.leave()).toBe(true);
    expect(trip.here()?.kind().key()).toBe('floor');
    expect(trip.here()?.remember()).toBe('corridor');
    expect(trip.descend(0)).toBe(true);
    expect(trip.move('forward')).toBe(true);
    expect(trip.here()?.index()).toBe(1);
    expect(trip.leave()).toBe(false);
    expect(trip.move('back')).toBe(true);
    expect(trip.leave()).toBe(true);
    expect(trip.leave()).toBe(true);
    expect(trip.here()?.kind().key()).toBe('building');
    expect(trip.saved()?.states()).toEqual(new Map());
    expect(trip.descend(15)).toBe(true);
    expect(trip.here()?.remember()).toBeUndefined();
    expect(
      trip
        .here()
        ?.moves()
        .map((move) => move.id),
    ).toEqual(['up', 'corridor']);
  });

  test('the building remembers where its elevator stands: the save carries it while the building is on the trail, and back at the building the list marks that floor', () => {
    const trip = onTheStreet();
    expect(trip.descend(0)).toBe(true);
    const building = must(trip.here());
    expect(building.listing().filter((floor) => floor.current())).toEqual([building.children()[0]]);
    expect(trip.saved()?.states()).toEqual(new Map());
    expect(trip.descend(13)).toBe(true);
    expect(trip.here()?.name()).toBe('Floor 2');
    expect(trip.saved()?.states()).toEqual(new Map([[`${STREET}.0`, '2']]));
    expect(trip.move('up')).toBe(true);
    expect(trip.saved()?.states()).toEqual(new Map([[`${STREET}.0`, '3']]));
    expect(trip.leave()).toBe(true);
    expect(trip.here()).toBe(building);
    expect(building.listing().filter((floor) => floor.current())).toEqual([building.children()[3]]);
    expect(trip.saved()?.states()).toEqual(new Map([[`${STREET}.0`, '3']]));
    // Off the trail, nothing is saved: on the street the building's elevator is forgotten by the save (not by the world).
    expect(trip.leave()).toBe(true);
    expect(trip.saved()?.states()).toEqual(new Map());
    const again = journey();
    const atTheBuilding = new SavedGame(SEED, Address.parse(`${STREET}.0`), new Map([[`${STREET}.0`, '3']]));
    expect(again.restore(atTheBuilding)).toBe(true);
    expect(
      again
        .here()
        ?.listing()
        .find((floor) => floor.current())
        ?.name(),
    ).toBe('Floor 3');
  });

  test('going to the title keeps the place and its states: entering again resumes there', () => {
    const trip = inTheFirstRoom();
    const room = trip.here()?.address().toString();
    trip.toTitle();
    expect(trip.here()).toBeUndefined();
    expect(trip.resumes()).toBe(true);
    expect(trip.saved()?.address()?.toString()).toBe(room);
    expect(trip.saved()?.states().size).toBe(1);
    trip.enter();
    expect(trip.here()?.address().toString()).toBe(room);
    expect(trip.leave()).toBe(true);
    expect(trip.here()?.remember()).toBe('corridor');
  });

  test('a new world forgets the old place and starts on its own street', () => {
    const trip = onTheStreet();
    trip.descend(0);
    trip.toTitle();
    trip.begin(new Seed(5, 6));
    expect(trip.resumes()).toBe(false);
    trip.enter();
    expect(trip.here()?.kind().key()).toBe('street');
    expect(trip.here()?.address().toString()).toBe(STREET);
  });

  test('restore: seed + path + states put the traveller back in the same room, with the floor still in the corridor', () => {
    const trip = inTheFirstRoom();
    const name = trip.here()?.name();
    const again = journey();
    expect(again.restore(must(SavedGame.parse(trip.saved()?.toText())))).toBe(true);
    expect(again.here()?.name()).toBe(name);
    expect(again.here()?.address().toString()).toBe(trip.here()?.address().toString());
    expect(again.leave()).toBe(true);
    expect(again.here()?.kind().key()).toBe('floor');
    expect(again.here()?.remember()).toBe('corridor');
    expect(again.here()?.listing().length).toBe(9);
  });

  test('restore refuses a path nobody answers or nobody stands in, and a state a place cannot take — and stays fresh', () => {
    const cases: readonly [readonly number[], ReadonlyMap<string, string>][] = [
      [[99], new Map()],
      [[0, 0, 0, 0, 0, 0, 0, 0, 999], new Map()],
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 16], new Map()],
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], new Map()], // the corridor: nobody stands in it
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], new Map()], // an apartment: nobody stands in it
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 9], new Map()], // a room past the last
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], new Map([[`${STREET}.0.0`, 'lobby']])], // no such mode
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], new Map([[STREET, 'corridor']])], // a street has no modes
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], new Map([['0.99', 'corridor']])], // a state for nowhere
    ];
    for (const [path, states] of cases) {
      const trip = journey();
      expect(trip.restore(new SavedGame(SEED, new Address(path), states)), path.join('.')).toBe(false);
      expect(trip.world()).toBeUndefined();
      expect(trip.here()).toBeUndefined();
    }
  });

  test('restore refuses a state whose owner is not on the path, and a path that continues where the states do not let it', () => {
    const building = `${STREET}.0`;
    const lobby = `${building}.0`;
    const room = `${lobby}.0.0.0`;
    const cases: readonly [string, string | undefined, ReadonlyMap<string, string>][] = [
      ['a floor off the path in corridor mode', STREET, new Map([[`${building}.3`, 'corridor']])],
      ['a building off the path with its elevator up', STREET, new Map([[building, '3']])],
      ['a state while nobody has entered the world', undefined, new Map([[building, '3']])],
      ['a room below a floor still at its elevator', room, new Map()],
      [
        'a room below a floor at its elevator, with the elevator there',
        `${building}.5.0.0.0`,
        new Map([[building, '5']]),
      ],
      ['a floor the elevator has not been called to', `${building}.5`, new Map()],
      ['a floor other than the one the elevator stands at', `${building}.5`, new Map([[building, '4']])],
      [
        'a room whose building has the elevator elsewhere',
        room,
        new Map([
          [lobby, 'corridor'],
          [building, '4'],
        ]),
      ],
      ['a mode a floor takes but would never write', lobby, new Map([[lobby, 'elevator']])],
      ['a floor number a building takes but would never write', building, new Map([[building, '0']])],
    ];
    for (const [what, path, states] of cases) {
      const trip = journey();
      const address = path === undefined ? undefined : must(Address.parse(path));
      expect(trip.restore(new SavedGame(SEED, address, states)), what).toBe(false);
      expect(trip.world(), what).toBeUndefined();
      expect(trip.here(), what).toBeUndefined();
    }
  });

  test('restore then saved() gives back exactly the save, for every valid save — the states are the path’s own', () => {
    const building = `${STREET}.0`;
    const valid: readonly [string, string | undefined, ReadonlyMap<string, string>][] = [
      ['drawn, not entered', undefined, new Map()],
      ['the street', STREET, new Map()],
      ['the building, elevator at the lobby', building, new Map()],
      ['the building, elevator at 3', building, new Map([[building, '3']])],
      ['the lobby', `${building}.0`, new Map()],
      ['floor 5', `${building}.5`, new Map([[building, '5']])],
      [
        'floor 5 in its corridor',
        `${building}.5`,
        new Map([
          [building, '5'],
          [`${building}.5`, 'corridor'],
        ]),
      ],
      ['the first room off the lobby', `${building}.0.0.0.0`, new Map([[`${building}.0`, 'corridor']])],
      ['the second room off the lobby', `${building}.0.0.0.1`, new Map([[`${building}.0`, 'corridor']])],
      [
        'the first room off floor 5',
        `${building}.5.0.0.0`,
        new Map([
          [building, '5'],
          [`${building}.5`, 'corridor'],
        ]),
      ],
    ];
    for (const [what, path, states] of valid) {
      const trip = journey();
      const address = path === undefined ? undefined : must(Address.parse(path));
      const saved = new SavedGame(SEED, address, states);
      expect(trip.restore(saved), what).toBe(true);
      expect(trip.saved()?.toText(), what).toBe(saved.toText());
    }
  });

  test('restore of a world that was drawn but never entered waits at the title', () => {
    const trip = journey();
    expect(trip.restore(new SavedGame(SEED))).toBe(true);
    expect(trip.world()?.equals(SEED)).toBe(true);
    expect(trip.here()).toBeUndefined();
    expect(trip.resumes()).toBe(false);
  });
});
