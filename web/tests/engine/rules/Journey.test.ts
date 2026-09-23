import { describe, expect, test } from 'vitest';
import { Address } from '#engine/model/Address.ts';
import type { FragmentData } from '#engine/model/Fragment.ts';
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

/** Every address from the universe down to `path`: what a traveller who stands there has walked at the least. */
function trailOf(path: string | undefined): string[] {
  if (path === undefined) return [];
  const steps = path.split('.');
  return steps.map((_, depth) => steps.slice(0, depth + 1).join('.'));
}

/** A save as the game writes one: the visited path is the trail unless the test says more. */
function save(
  path: string | undefined,
  states: ReadonlyMap<string, string> = new Map(),
  visited: readonly string[] = trailOf(path),
  traveller: { coherence?: number; steps?: number } = {},
): SavedGame {
  const address = path === undefined ? undefined : must(Address.parse(path));
  return new SavedGame({ seed: SEED, address, states, visited, ...traveller });
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

  test('the traveller walks with the journey: a new world is a new traveller, every landing is a footprint, a reboot rebuilds the same world on its street and keeps the steps and the path (Guide:145-147)', () => {
    const trip = journey();
    expect(trip.player().footprints()).toEqual([]);
    trip.begin(SEED);
    expect(trip.player().footprints()).toEqual([]);
    trip.enter();
    expect(trip.player().footprints()).toHaveLength(8);
    expect(trip.descend(0)).toBe(true);
    expect(trip.player().footprints()).toHaveLength(9);
    expect(trip.descend(13)).toBe(true);
    expect(trip.here()?.name()).toBe('Floor 2');
    expect(trip.player().footprints().at(-1)).toBe(`${STREET}.0.2`);
    expect(trip.move('corridor')).toBe(true);
    expect(trip.descend(0)).toBe(true);
    expect(trip.player().footprints().slice(-3)).toEqual([
      `${STREET}.0.2.0`,
      `${STREET}.0.2.0.0`,
      `${STREET}.0.2.0.0.0`,
    ]);
    expect(trip.here()?.remember()).toBeUndefined();
    trip.player().count();
    trip.player().drain(100);
    const before = trip.player().footprints();
    trip.reboot();
    expect(trip.here()?.address().toString()).toBe(STREET);
    expect(trip.world()?.equals(SEED)).toBe(true);
    expect(trip.player().coherence().value()).toBe(100);
    expect(trip.player().steps()).toBe(1);
    expect(trip.player().footprints()).toEqual(before);
    // The world is rebuilt: the floor is back at its elevator, the elevator back at the lobby.
    expect(trip.saved()?.states()).toEqual(new Map());
    expect(trip.descend(0)).toBe(true);
    expect(
      must(trip.here())
        .listing()
        .find((floor) => floor.current())
        ?.name(),
    ).toBe('Floor 0');
    // A new world is a new traveller.
    trip.begin(new Seed(5, 6));
    expect(trip.player().steps()).toBe(0);
    expect(trip.player().footprints()).toEqual([]);
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
    expect(trip.saved()?.states()).toEqual(new Map([[`${STREET}.0`, '{"elevator":2}']]));
    expect(trip.move('up')).toBe(true);
    expect(trip.saved()?.states()).toEqual(new Map([[`${STREET}.0`, '{"elevator":3}']]));
    expect(trip.leave()).toBe(true);
    expect(trip.here()).toBe(building);
    expect(building.listing().filter((floor) => floor.current())).toEqual([building.children()[3]]);
    expect(trip.saved()?.states()).toEqual(new Map([[`${STREET}.0`, '{"elevator":3}']]));
    // Off the trail the elevator is still saved: the building was visited, and every visited place remembers (v4).
    expect(trip.leave()).toBe(true);
    expect(trip.saved()?.states()).toEqual(new Map([[`${STREET}.0`, '{"elevator":3}']]));
    const again = journey();
    const atTheBuilding = save(`${STREET}.0`, new Map([[`${STREET}.0`, '{"elevator":3}']]));
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
      expect(trip.restore(save(`0.${path.join('.')}`, states)), path.join('.')).toBe(false);
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
      ['a building off the path with its elevator up', STREET, new Map([[building, '{"elevator":3}']])],
      ['a state while nobody has entered the world', undefined, new Map([[building, '{"elevator":3}']])],
      ['a room below a floor still at its elevator', room, new Map()],
      [
        'a room below a floor at its elevator, with the elevator there',
        `${building}.5.0.0.0`,
        new Map([[building, '{"elevator":5}']]),
      ],
      ['a floor the elevator has not been called to', `${building}.5`, new Map()],
      [
        'a floor other than the one the elevator stands at',
        `${building}.5`,
        new Map([[building, '{"elevator":4}']]),
      ],
      [
        'a room whose building has the elevator elsewhere',
        room,
        new Map([
          [lobby, 'corridor'],
          [building, '{"elevator":4}'],
        ]),
      ],
      ['a mode a floor takes but would never write', lobby, new Map([[lobby, 'elevator']])],
      [
        'a floor number a building takes but would never write',
        building,
        new Map([[building, '{"elevator":0}']]),
      ],
    ];
    for (const [what, path, states] of cases) {
      const trip = journey();
      expect(trip.restore(save(path, states)), what).toBe(false);
      expect(trip.world(), what).toBeUndefined();
      expect(trip.here(), what).toBeUndefined();
    }
  });

  test('restore refuses a visited path the traveller could not have walked, and a trail the visited path does not hold', () => {
    const building = `${STREET}.0`;
    const cases: readonly [string, string | undefined, ReadonlyMap<string, string>, readonly string[]][] = [
      ['the street with nothing visited', STREET, new Map(), []],
      ['the street with its trail short one step', STREET, new Map(), trailOf(STREET).slice(1)],
      [
        'the street with the city missing from the middle',
        STREET,
        new Map(),
        trailOf(STREET).filter((a) => a !== '0.0.0.0.0.0.0'),
      ],
      [
        'a child visited before its parent',
        STREET,
        new Map(),
        [...trailOf(STREET), `${building}.3`, building],
      ],
      ['a visited place that is nowhere', STREET, new Map(), [...trailOf(STREET), `${STREET}.99`]],
      [
        'a visited place nobody can stand in is fine, but not past the last',
        STREET,
        new Map(),
        [...trailOf(STREET), building, `${building}.16`],
      ],
    ];
    for (const [what, path, states, visited] of cases) {
      const trip = journey();
      expect(trip.restore(save(path, states, visited)), what).toBe(false);
      expect(trip.here(), what).toBeUndefined();
    }
    // …and the same building, visited with its floor 3, takes its elevator state off the trail.
    const trip = journey();
    expect(
      trip.restore(
        save(STREET, new Map([[building, '{"elevator":3}']]), [
          ...trailOf(STREET),
          building,
          `${building}.3`,
        ]),
      ),
    ).toBe(true);
    expect(
      must(trip.here())
        .children()[0]
        ?.listing()
        .find((floor) => floor.current())
        ?.name(),
    ).toBe('Floor 3');
  });

  test('restore then saved() gives back exactly the save, for every valid save — the states are the visited places’ own, the traveller as saved', () => {
    const building = `${STREET}.0`;
    const valid: readonly [string, string | undefined, ReadonlyMap<string, string>][] = [
      ['drawn, not entered', undefined, new Map()],
      ['the street', STREET, new Map()],
      ['the building, elevator at the lobby', building, new Map()],
      ['the building, elevator at 3', building, new Map([[building, '{"elevator":3}']])],
      ['the lobby', `${building}.0`, new Map()],
      ['floor 5', `${building}.5`, new Map([[building, '{"elevator":5}']])],
      [
        'floor 5 in its corridor',
        `${building}.5`,
        new Map([
          [building, '{"elevator":5}'],
          [`${building}.5`, 'corridor'],
        ]),
      ],
      ['the first room off the lobby', `${building}.0.0.0.0`, new Map([[`${building}.0`, 'corridor']])],
      ['the second room off the lobby', `${building}.0.0.0.1`, new Map([[`${building}.0`, 'corridor']])],
      [
        'the first room off floor 5',
        `${building}.5.0.0.0`,
        new Map([
          [building, '{"elevator":5}'],
          [`${building}.5`, 'corridor'],
        ]),
      ],
    ];
    for (const [what, path, states] of valid) {
      const trip = journey();
      const traveller = path === undefined ? {} : { coherence: 41, steps: 7 };
      const saved = save(path, states, trailOf(path), traveller);
      expect(trip.restore(saved), what).toBe(true);
      expect(trip.saved()?.toText(), what).toBe(saved.toText());
      expect(trip.player().coherence().value(), what).toBe(traveller.coherence ?? 100);
      expect(trip.player().steps(), what).toBe(traveller.steps ?? 0);
    }
  });

  test('capture, drop and merge are moves of the journey: the room hands over only what the buffer takes, a drop lies where the traveller stands, and all of it rides in the save (Guide:120-122, 365)', () => {
    const trip = inTheFirstRoom();
    const room = must(trip.here());
    expect(room.contents()?.objects).toHaveLength(4);
    const first = must(trip.capture(0));
    expect(first.name()).toBe('plasma coil with reliquary box');
    expect(first.frequency().hertz()).toBe(3194);
    expect(trip.player().buffer().fragments()).toEqual([first]);
    expect(trip.player().resonantTraces()).toBe(1);
    expect(room.contents()?.objects.map((each) => each.name())).not.toContain(first.name());
    expect(trip.capture(9)).toBeUndefined();
    const second = must(trip.capture(0));
    expect(second.name()).toBe('brass censer fused to laser cutter');
    expect(trip.player().resonantTraces()).toBe(2); // both fresh, both in a matching room
    expect(trip.merge(0, 0)).toBeUndefined();
    const hybrid = must(trip.merge(0, 1));
    expect(hybrid.name()).toBe('plasma-brass Hybrid');
    expect(hybrid.frequency().hertz()).toBe(3194 + 3577);
    expect(trip.player().buffer().fragments()).toEqual([hybrid]);
    expect(trip.move('forward')).toBe(true);
    expect(trip.drop(0)).toBe(hybrid);
    expect(trip.drop(0)).toBeUndefined();
    expect(trip.here()?.contents()?.objects.at(-1)).toBe(hybrid);
    expect(trip.player().buffer().size()).toBe(0);
    const saved = must(trip.saved());
    expect(saved.buffer()).toEqual([]);
    expect(saved.resonant()).toBe(2); // 6771 Hz is no multiple of 11: the merge did not count
    expect(JSON.parse(must(saved.states().get(room.address().toString())))).toEqual({
      taken: ['with|reliquary box|plasma coil', 'fused|brass censer|laser cutter'],
      dropped: [],
    });
    expect(JSON.parse(must(saved.states().get(must(trip.here()).address().toString())))).toEqual({
      taken: [],
      dropped: [hybrid.data()],
    });
    // Back in the first room, the dropped hybrid comes back not fresh: the tally stays.
    expect(trip.move('back')).toBe(true);
    expect(trip.move('forward')).toBe(true);
    const back = must(trip.capture(must(trip.here()?.contents()?.objects.length) - 1));
    expect(back.frequency().hertz()).toBe(3194 + 3577);
    expect(trip.player().resonantTraces()).toBe(2);
    // A drop outside a room goes nowhere and keeps the fragment.
    expect(trip.move('back')).toBe(true);
    expect(trip.leave()).toBe(true);
    expect(trip.here()?.kind().key()).toBe('floor');
    expect(trip.drop(0)).toBeUndefined();
    expect(trip.player().buffer().size()).toBe(1);
    expect(trip.capture(0)).toBeUndefined();
  });

  test('a capture is refused, touching nothing, when the buffer is full', () => {
    const trip = inTheFirstRoom();
    const room = must(trip.here());
    for (let n = 0; n < 4; n++) expect(trip.capture(0), String(n)).toBeDefined();
    expect(trip.move('forward')).toBe(true);
    for (let n = 0; n < 4; n++) expect(trip.capture(0), String(n)).toBeDefined();
    expect(trip.player().buffer().size()).toBe(8);
    for (let n = 0; n < 4; n++) trip.merge(0, 1);
    expect(trip.player().buffer().size()).toBe(4);
    // Fill up from the second apartment's rooms.
    expect(trip.move('back')).toBe(true);
    expect(trip.leave()).toBe(true);
    expect(trip.descend(1)).toBe(true);
    while (!trip.player().buffer().full()) {
      if (trip.capture(0) === undefined)
        expect(trip.move('forward'), 'a room with something left').toBe(true);
    }
    expect(trip.player().buffer().size()).toBe(16);
    if ((trip.here()?.contents()?.objects.length ?? 0) === 0) expect(trip.move('forward')).toBe(true);
    const here = must(trip.here());
    const objects = here.contents()?.objects.length ?? 0;
    expect(objects).toBeGreaterThan(0);
    const memento = here.remember();
    expect(trip.capture(0)).toBeUndefined();
    expect(here.contents()?.objects).toHaveLength(objects);
    expect(here.remember()).toBe(memento);
    expect(trip.player().buffer().size()).toBe(16);
    expect(room.remember()).toContain('taken');
  });

  test('restore refuses a buffer the world could not have filled — a fragment from a room that never dealt it, from nowhere, a hybrid with a bad part, seventeen fragments — and a tally that is no count is no save at all', () => {
    const building = `${STREET}.0`;
    const room = `${building}.0.0.0.0`;
    const good = { kind: 'relic', from: room, key: 'with|reliquary box|plasma coil' };
    const cases: readonly [string, readonly FragmentData[]][] = [
      ['a relic the room never dealt', [{ kind: 'relic', from: room, key: 'culture|nothing' }]],
      [
        'a relic from a room that is not there',
        [{ kind: 'relic', from: `${building}.0.0.9.0`, key: good.key }],
      ],
      ['a relic from a place that is not a room', [{ kind: 'relic', from: building, key: good.key }]],
      ['a kind nobody reads', [{ kind: 'keystone', from: room }]],
      [
        'a hybrid with a bad part',
        [{ kind: 'hybrid', parts: [good, { kind: 'relic', from: room, key: 'x' }] }],
      ],
      ['seventeen fragments', Array.from({ length: 17 }, () => good)],
    ];
    for (const [what, buffer] of cases) {
      const trip = journey();
      const saved = new SavedGame({
        seed: SEED,
        address: must(Address.parse(STREET)),
        visited: trailOf(STREET),
        buffer,
      });
      expect(trip.restore(saved), what).toBe(false);
      expect(trip.world(), what).toBeUndefined();
    }
    const sixteen = journey();
    expect(
      sixteen.restore(
        new SavedGame({
          seed: SEED,
          address: must(Address.parse(STREET)),
          visited: trailOf(STREET),
          buffer: Array.from({ length: 16 }, () => good),
          resonant: 16,
        }),
      ),
    ).toBe(true);
    expect(sixteen.player().buffer().size()).toBe(16);
    expect(sixteen.player().resonantTraces()).toBe(16);
    expect(sixteen.player().buffer().fragments()[0]?.frequency().hertz()).toBe(3194);
  });

  test('restore then saved() gives back exactly the save with a buffer of a relic and a hybrid, and a room that remembers a take and a drop', () => {
    const building = `${STREET}.0`;
    const lobby = `${building}.0`;
    const first = `${lobby}.0.0.0`;
    const second = `${lobby}.0.0.1`;
    const relic = { kind: 'relic', from: first, key: 'with|reliquary box|plasma coil' };
    const other = { kind: 'relic', from: first, key: 'fused|brass censer|laser cutter' };
    const saved = new SavedGame({
      seed: SEED,
      address: must(Address.parse(second)),
      states: new Map([
        [lobby, 'corridor'],
        [first, JSON.stringify({ taken: [relic.key, other.key], dropped: [] })],
        [second, JSON.stringify({ taken: [], dropped: [{ kind: 'hybrid', parts: [relic, other] }] })],
      ]),
      visited: [...trailOf(first), second], // the way into an apartment is its first room
      coherence: 60,
      steps: 5,
      buffer: [relic, { kind: 'hybrid', parts: [other, relic] }],
      resonant: 2,
    });
    const trip = journey();
    expect(trip.restore(saved)).toBe(true);
    expect(trip.saved()?.toText()).toBe(saved.toText());
    expect(
      trip
        .player()
        .buffer()
        .fragments()
        .map((each) => each.name()),
    ).toEqual(['plasma coil with reliquary box', 'brass-plasma Hybrid']);
    expect(
      trip
        .here()
        ?.contents()
        ?.objects.map((each) => each.name()),
    ).toContain('plasma-brass Hybrid');
  });

  test('restore of a world that was drawn but never entered waits at the title', () => {
    const trip = journey();
    expect(trip.restore(save(undefined))).toBe(true);
    expect(trip.world()?.equals(SEED)).toBe(true);
    expect(trip.here()).toBeUndefined();
    expect(trip.resumes()).toBe(false);
  });
});
