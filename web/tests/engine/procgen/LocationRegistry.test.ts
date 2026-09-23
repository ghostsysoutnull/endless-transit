import { describe, expect, test } from 'vitest';
import { Address } from '#engine/model/Address.ts';
import type { Location } from '#engine/model/Location.ts';
import { LocationKind } from '#engine/model/LocationKind.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { Building } from '#engine/model/Building.ts';
import { descend, must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();

/** What a player could see of a location — enough to tell two worlds apart. */
function portrait(location: Location): unknown {
  return {
    kind: location.kind().key(),
    name: location.name(),
    address: location.address().toString(),
    status: location.status(),
    description: location.description(),
    facts: location.facts(),
    children: location.children().map((child) => `${location.approachVerb()} ${child.callSign()}`),
  };
}

describe('LocationRegistry — a kind is a registry entry', () => {
  test('the fourteen kinds of the surface are registered first, in the order of the chain (the four below the bedrock: Substrate.test)', () => {
    expect(
      registry
        .kinds()
        .slice(0, 14)
        .map((kind) => kind.key()),
    ).toEqual([
      'universe',
      'filament',
      'sector',
      'null-reach',
      'solar-system',
      'planet',
      'country',
      'city',
      'street',
      'building',
      'floor',
      'corridor',
      'apartment',
      'room',
    ]);
  });

  test('every place from the universe down to a room is of a registered kind', () => {
    const registered = new Set(registry.kinds().map((kind) => kind.key()));
    for (let n = 0; n < 30; n++) {
      const chain = descend(
        registry.universe(sampleSeed(n)),
        (_listed, depth) => n + depth,
        () => false,
      );
      expect(chain.map((location) => location.kind().key()).slice(7)).toEqual([
        'street',
        'building',
        'floor',
      ]);
      const floor = must(chain.at(-1));
      floor.move('corridor');
      const room = must(floor.listing()[n % floor.listing().length]).arrival();
      expect(
        room
          .trail()
          .map((location) => location.kind().key())
          .slice(8),
      ).toEqual(['building', 'floor', 'corridor', 'apartment', 'room']);
      for (const location of room.trail()) expect(registered.has(location.kind().key())).toBe(true);
      expect(room.depth()).toBe(12);
    }
  });

  test('every location the generator makes is of a registered kind — nothing is built outside the registry', () => {
    const registered = new Set(registry.kinds().map((kind) => kind.key()));
    for (let n = 0; n < 60; n++) {
      const chain = toStreet(registry.universe(sampleSeed(n)), (_children, depth) => n + depth);
      const street = chain.at(-1);
      for (const location of [...chain, ...(street?.children() ?? [])]) {
        expect(registered.has(location.kind().key()), location.kind().key()).toBe(true);
        expect(registry.factoryFor(location.kind()).kind().equals(location.kind())).toBe(true);
      }
    }
  });

  test('a kind nobody registered fails loud', () => {
    const stranger = new LocationKind({
      key: 'dyson-sphere',
      title: 'Dyson sphere',
      icon: '?',
      indexLabel: '?',
    });
    expect(() => registry.factoryFor(stranger)).toThrow(/dyson-sphere/);
  });

  test('below the street: a building is open and holds as many floors as it says; a floor holds its corridor', () => {
    for (let n = 0; n < 40; n++) {
      const chain = toStreet(registry.universe(sampleSeed(n)), () => n);
      const street = must(chain.at(-1));
      expect(chain.every((location) => !location.sealed())).toBe(true);
      expect(street.kind().key()).toBe('street');
      expect(street.children().length).toBeGreaterThan(0);
      expect(street.children().every((building) => building.kind().key() === 'building')).toBe(true);
      const building = must(street.descendant(street.address().child(0)));
      if (!(building instanceof Building)) throw new Error('a street holds buildings');
      const floors = building.children().slice(0, building.floors());
      expect(floors.every((floor) => floor.kind().key() === 'floor')).toBe(true);
      expect(
        building
          .children()
          .slice(building.floors())
          .every((layer) => layer.kind().key() === 'layer'),
      ).toBe(true);
      expect(floors.map((floor) => floor.ordinal())).toEqual(floors.map((_floor, number) => number));
      const floor = must(floors[n % floors.length]);
      expect(floor.children().map((child) => child.kind().key())).toEqual(['corridor']);
    }
  });
});

describe('determinism and position independence', () => {
  test('same seed + same path → the identical world, from two separate generators', () => {
    for (let n = 0; n < 25; n++) {
      const choose = (_children: readonly Location[], depth: number): number => n * 3 + depth;
      const one = toStreet(realRegistry().universe(sampleSeed(n)), choose).map(portrait);
      const two = toStreet(realRegistry().universe(sampleSeed(n)), choose).map(portrait);
      expect(one).toEqual(two);
      expect(one).toHaveLength(8);
    }
  });

  test('a place is the same whether you walk to it, jump to it, or look at its siblings first', () => {
    const seed = new Seed(0x7f3a91c2, 0x0b4de6a8);
    const walked = must(toStreet(registry.universe(seed), () => 1).at(-1), 'a street');
    const address = must(Address.parse(walked.address().toString()), 'an address');
    expect(address.depth()).toBe(7);

    const jumped = must(registry.universe(seed).descendant(address), 'the place jumped to');
    const crowded = registry.universe(seed);
    const visitAll = (location: Location, depth: number): void => {
      if (depth < 3) for (const child of location.children()) visitAll(child, depth + 1);
    };
    visitAll(crowded, 0);
    const afterTheCrowd = must(crowded.descendant(address), 'the place after the crowd');

    expect(portrait(jumped)).toEqual(portrait(walked));
    expect(portrait(afterTheCrowd)).toEqual(portrait(walked));
  });

  test('a room is the same walked to or jumped to, from two separate generators', () => {
    for (let n = 0; n < 10; n++) {
      const walk = (universe: Location): Location => {
        const floor = must(descend(universe, () => n).at(-1));
        floor.move('corridor');
        return must(floor.listing()[n % floor.listing().length]).arrival();
      };
      const one = walk(realRegistry().universe(sampleSeed(n)));
      const two = realRegistry().universe(sampleSeed(n));
      const jumped = must(two.descendant(one.address()));
      expect(portrait(jumped)).toEqual(portrait(one));
      expect(one.kind().key()).toBe('room');
      expect(portrait(walk(realRegistry().universe(sampleSeed(n))))).toEqual(portrait(one));
    }
  });

  test('different seeds give different worlds', () => {
    const names = new Set<string>();
    for (let n = 0; n < 200; n++) {
      names.add(
        toStreet(registry.universe(sampleSeed(n)), () => 0)
          .map((location) => location.name())
          .join('/'),
      );
    }
    expect(names.size).toBe(200);
  });
});

describe('laziness — walking down one branch never generates the siblings’ subtrees', () => {
  test('after a walk from the universe to a street, only the eight places on the path are populated', () => {
    const universe = registry.universe(new Seed(42, 4242));
    const chain = toStreet(universe, () => 2);
    expect(chain).toHaveLength(8);
    const street = must(chain.at(-1));
    expect(street.populated()).toBe(false);
    expect(street.children().every((building) => !building.populated())).toBe(true);
    for (const location of chain) {
      expect(location.populated()).toBe(true);
      for (const sibling of location.parent()?.children() ?? []) {
        if (sibling !== location) expect(sibling.populated(), sibling.address().toString()).toBe(false);
      }
    }
  });

  test('entering one building generates neither its neighbours nor the floors it has not been asked for', () => {
    const universe = registry.universe(new Seed(42, 4242));
    const street = must(toStreet(universe, () => 2).at(-1));
    const building = must(street.children()[1]);
    const floors = building.children();
    expect(floors.length).toBe(building.children().length);
    expect(street.children().filter((each) => each.populated())).toEqual([building]);
    expect(floors.every((floor) => !floor.populated())).toBe(true);
    const floor = must(floors[1]);
    floor.moves();
    expect(floor.populated()).toBe(false);
    floor.move('corridor');
    floor.listing();
    expect(floors.filter((each) => each.populated())).toEqual([floor]);
  });

  test('a fresh universe has generated nothing', () => {
    expect(registry.universe(new Seed(1, 1)).populated()).toBe(false);
  });
});
