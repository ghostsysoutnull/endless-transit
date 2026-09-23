import { describe, expect, test } from 'vitest';
import { Address } from '#engine/model/Address.ts';
import { FragmentReader } from '#engine/model/FragmentReader.ts';
import { Frequency } from '#engine/model/Frequency.ts';
import { Hybrid } from '#engine/model/Hybrid.ts';
import type { Location } from '#engine/model/Location.ts';
import { Relic } from '#engine/model/Relic.ts';
import { RelicFragment } from '#engine/model/RelicFragment.ts';
import { Room } from '#engine/model/Room.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { must, realRegistry } from '#tests/support/world.ts';

const SEED = new Seed(0x7f3a91c2, 0x0b4de6a8);
/** Grand Power Plant: the first room behind the first door off the lobby of Ornate Sanctum, Bright Boulevard. */
const FIRST_ROOM = '0.0.0.0.0.0.0.0.0.0.0.0.0';
const SECOND_ROOM = '0.0.0.0.0.0.0.0.0.0.0.0.1';
/** The first room behind the second door: a room of another apartment. */
const OTHER_ROOM = '0.0.0.0.0.0.0.0.0.0.0.1.0';

function universe(): Location {
  return realRegistry().universe(SEED);
}

function roomAt(world: Location, path: string): Room {
  const place = world.descendant(must(Address.parse(path)));
  if (!(place instanceof Room)) throw new Error(`${path} is not a room`);
  return place;
}

const reader = new FragmentReader();

describe('a relic found in a room (Room.groovy:165-173; Guide:180-185)', () => {
  test('the first room of seed 7F3A deals four relics; each is found by key at the gematria of its name × depth 12, amplified 10% because the apartment’s culture is the street header’s (baroque)', () => {
    const room = roomAt(universe(), FIRST_ROOM);
    expect(room.objects().map((relic) => relic.name())).toEqual([
      'plasma coil with reliquary box',
      'brass censer fused to laser cutter',
      'stone gargoyle infused with orbital beacon',
      'prayer bench infused with plasma coil',
    ]);
    const found = must(room.findRelic('with|reliquary box|plasma coil'));
    expect(found.name()).toBe('plasma coil with reliquary box');
    expect(found.frequency().hertz()).toBe(3194); // 242 × 12 = 2904, + 10% = 3194.4
    expect(found.resonant()).toBe(true);
    expect(found.key()).toBe('with|reliquary box|plasma coil');
    expect(found.data()).toEqual({ kind: 'relic', from: FIRST_ROOM, key: 'with|reliquary box|plasma coil' });
    expect(must(room.findRelic('fused|brass censer|laser cutter')).frequency().hertz()).toBe(3577); // 271 × 12 × 1.1
    expect(room.findRelic('culture|nothing here')).toBeUndefined();
    // A relic dealt to the second room is not found in the first.
    const second = roomAt(universe(), SECOND_ROOM);
    const theirs = must(second.objects()[0]);
    expect(room.findRelic(theirs.key())).toBeUndefined();
    expect(second.findRelic(theirs.key())?.name()).toBe(theirs.name());
  });

  test('a room whose apartment drifted to the second culture amplifies nothing and counts nothing', () => {
    // Seed 7F3A’s planet is baroque; a relic of another culture marks a drifted apartment.
    const world = universe();
    const street = must(world.descendant(must(Address.parse('0.0.0.0.0.0.0.0'))));
    let drifted: Room | undefined;
    for (const building of street.children()) {
      for (const floor of building.children()) {
        const corridor = must(floor.move('corridor'));
        for (const apartment of corridor.listing()) {
          const room = apartment.arrival();
          if (room instanceof Room && room.objects().some((relic) => !relic.resonant())) drifted = room;
          if (drifted !== undefined) break;
        }
        if (drifted !== undefined) break;
      }
      if (drifted !== undefined) break;
    }
    const room = must(drifted, 'a drifted room on Bright Boulevard');
    const relic = must(room.objects()[0]);
    expect(relic.resonant()).toBe(false);
    expect(relic.frequency().hertz() % 12).toBe(0);
  });
});

describe('capture and drop: what a room remembers (Guide:120-122, 448-455; Decision 7)', () => {
  test('a capture takes the relic at that position out of the room, fresh; a re-take of a dropped one is not fresh and keeps its frequency', () => {
    const world = universe();
    const room = roomAt(world, FIRST_ROOM);
    const other = roomAt(world, OTHER_ROOM);
    const first = must(room.capture(0));
    expect(first.fresh).toBe(true);
    expect(first.fragment.name()).toBe('plasma coil with reliquary box');
    expect(room.objects()).toHaveLength(3);
    expect(room.objects().map((relic) => relic.name())).not.toContain('plasma coil with reliquary box');
    expect(room.capture(3)).toBeUndefined();
    expect(room.capture(-1)).toBeUndefined();
    // Dropped in another room: it lies there last, with the frequency it had, and comes back not fresh.
    expect(other.drop(first.fragment)).toBe(true);
    expect(other.objects().at(-1)?.name()).toBe('plasma coil with reliquary box');
    const back = must(other.capture(other.objects().length - 1));
    expect(back.fresh).toBe(false);
    expect(back.fragment.frequency().hertz()).toBe(3194);
    expect(back.fragment.data()).toEqual(first.fragment.data());
    expect(other.objects().map((relic) => relic.name())).not.toContain('plasma coil with reliquary box');
  });

  test('the memento: nothing in the default state; the taken keys in order and the dropped fragments as data; recall takes it back word for word', () => {
    const world = universe();
    const room = roomAt(world, FIRST_ROOM);
    expect(room.remember()).toBeUndefined();
    const one = must(room.capture(1));
    const two = must(room.capture(0));
    const hybrid = new Hybrid(one.fragment, two.fragment);
    expect(room.drop(hybrid)).toBe(true);
    const memento = must(room.remember());
    expect(JSON.parse(memento)).toEqual({
      taken: ['fused|brass censer|laser cutter', 'with|reliquary box|plasma coil'],
      dropped: [
        {
          kind: 'hybrid',
          parts: [
            { kind: 'relic', from: FIRST_ROOM, key: 'fused|brass censer|laser cutter' },
            { kind: 'relic', from: FIRST_ROOM, key: 'with|reliquary box|plasma coil' },
          ],
        },
      ],
    });
    const twin = roomAt(universe(), FIRST_ROOM);
    expect(twin.recall(memento)).toBe(true);
    expect(twin.remember()).toBe(memento);
    expect(twin.objects().map((relic) => relic.name())).toEqual([
      'stone gargoyle infused with orbital beacon',
      'prayer bench infused with plasma coil',
      'brass-plasma Hybrid',
    ]);
    expect(twin.objects().at(-1)?.frequency().hertz()).toBe(3577 + 3194);
  });

  test('recall refuses what this room could not have written: a key not dealt here, a key twice, a dropped fragment from nowhere, bad shapes', () => {
    const bad = [
      'x',
      '{}',
      '[]',
      JSON.stringify({ taken: [], dropped: [] }), // the default state is written as nothing
      JSON.stringify({ taken: ['culture|nothing'], dropped: [] }),
      JSON.stringify({
        taken: ['with|reliquary box|plasma coil', 'with|reliquary box|plasma coil'],
        dropped: [],
      }),
      JSON.stringify({ taken: [7], dropped: [] }),
      JSON.stringify({
        taken: [],
        dropped: [{ kind: 'relic', from: '0.99', key: 'with|reliquary box|plasma coil' }],
      }),
      JSON.stringify({
        taken: [],
        dropped: [{ kind: 'relic', from: SECOND_ROOM, key: 'with|reliquary box|plasma coil' }],
      }),
      JSON.stringify({ taken: [], dropped: [{ kind: 'keystone', from: FIRST_ROOM }] }),
      JSON.stringify({
        taken: [],
        dropped: [
          {
            kind: 'hybrid',
            parts: [{ kind: 'relic', from: FIRST_ROOM, key: 'with|reliquary box|plasma coil' }],
          },
        ],
      }),
      JSON.stringify({ taken: [], dropped: ['x'] }),
      JSON.stringify({ taken: [], dropped: [], extra: 1 }),
    ];
    for (const memento of bad) {
      const room = roomAt(universe(), FIRST_ROOM);
      expect(room.recall(memento), memento).toBe(false);
      expect(room.remember(), memento).toBeUndefined();
      expect(room.objects(), memento).toHaveLength(4);
    }
  });
});

describe('a hybrid (Guide:241-243; SynthesisService.groovy:18-21)', () => {
  const chain = new RelicFragment({
    relic: new Relic('culture|rusted chain', 'Rusted Chain'),
    from: new Address([0, 1]),
    frequency: new Frequency(33),
    resonant: false,
  });
  const lantern = new RelicFragment({
    relic: new Relic('culture|paper lantern', 'Paper Lantern'),
    from: new Address([0, 2]),
    frequency: new Frequency(88),
    resonant: true,
  });

  test('the first word of each parent joined with a dash, plus Hybrid; the frequency is the sum', () => {
    const hybrid = new Hybrid(chain, lantern);
    expect(hybrid.name()).toBe('Rusted-Paper Hybrid');
    expect(hybrid.frequency().hertz()).toBe(121);
    expect(hybrid.key()).toBe('hybrid(culture|rusted chain+culture|paper lantern)');
    expect(hybrid.data()).toEqual({ kind: 'hybrid', parts: [chain.data(), lantern.data()] });
  });

  test('resonant when the sum divides by 11 (121 is; 34 is not), whatever the parents were', () => {
    expect(new Hybrid(chain, lantern).resonant()).toBe(true);
    expect(new Hybrid(chain, new Hybrid(chain, chain)).frequency().hertz()).toBe(99);
    expect(new Hybrid(chain, new Hybrid(chain, chain)).resonant()).toBe(true);
    expect(
      new Hybrid(chain, new RelicFragment({ ...chain.facts(), frequency: new Frequency(1) })).resonant(),
    ).toBe(false);
  });

  test('a hybrid of hybrids takes its first words from the hybrids', () => {
    const twice = new Hybrid(new Hybrid(chain, lantern), lantern);
    expect(twice.name()).toBe('Rusted-Paper-Paper Hybrid');
  });
});

describe('the fragment reader: a fragment’s data is read back against the world, or refused', () => {
  test('a relic fragment is read from the room it came from, a hybrid from its parts', () => {
    const world = universe();
    const room = roomAt(world, FIRST_ROOM);
    const a = must(room.findRelic('with|reliquary box|plasma coil'));
    const b = must(room.findRelic('fused|brass censer|laser cutter'));
    const hybrid = new Hybrid(a, b);
    const read = must(reader.read(JSON.parse(JSON.stringify(hybrid.data())), universe()));
    expect(read.name()).toBe(hybrid.name());
    expect(read.frequency()).toEqual(hybrid.frequency());
    expect(read.data()).toEqual(hybrid.data());
    expect(must(reader.read(a.data(), universe())).frequency().hertz()).toBe(3194);
  });

  test('refused: an unknown kind, a room that is not there, a relic not dealt there, a place that is not a room, bad shapes', () => {
    const world = universe();
    const bad: unknown[] = [
      null,
      'x',
      {},
      { kind: 'keystone' },
      { kind: 'relic', from: '0.99', key: 'with|reliquary box|plasma coil' },
      { kind: 'relic', from: SECOND_ROOM, key: 'with|reliquary box|plasma coil' },
      { kind: 'relic', from: '0.0.0.0.0.0.0.0', key: 'with|reliquary box|plasma coil' },
      { kind: 'relic', from: 'nowhere', key: 'with|reliquary box|plasma coil' },
      { kind: 'relic', from: FIRST_ROOM, key: 7 },
      { kind: 'relic', from: FIRST_ROOM },
      { kind: 'hybrid', parts: [] },
      { kind: 'hybrid', parts: [{ kind: 'relic', from: FIRST_ROOM, key: 'with|reliquary box|plasma coil' }] },
      {
        kind: 'hybrid',
        parts: [{ kind: 'relic', from: FIRST_ROOM, key: 'with|reliquary box|plasma coil' }, 'x'],
      },
      { kind: 'hybrid', parts: 'x' },
    ];
    for (const data of bad) expect(reader.read(data, world), JSON.stringify(data)).toBeUndefined();
  });
});
