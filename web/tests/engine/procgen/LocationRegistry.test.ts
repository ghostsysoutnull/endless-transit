import { describe, expect, test } from 'vitest';
import { Address } from '#engine/model/Address.ts';
import type { Location } from '#engine/model/Location.ts';
import { LocationKind } from '#engine/model/LocationKind.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { descend, must, realRegistry, sampleSeed } from '#tests/support/world.ts';

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
  test('ten kinds are registered, in the order of the chain', () => {
    expect(registry.kinds().map((kind) => kind.key())).toEqual([
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
    ]);
  });

  test('every location the generator makes is of a registered kind — nothing is built outside the registry', () => {
    const registered = new Set(registry.kinds().map((kind) => kind.key()));
    for (let n = 0; n < 60; n++) {
      const chain = descend(registry.universe(sampleSeed(n)), (_children, depth) => n + depth);
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

  test('the chain ends at the street for now: its buildings are listed, sealed, and nothing stands inside them', () => {
    for (let n = 0; n < 40; n++) {
      const chain = descend(registry.universe(sampleSeed(n)), () => n);
      const street = chain.at(-1);
      expect(chain.every((location) => !location.sealed())).toBe(true);
      expect(street?.kind().key()).toBe('street');
      expect(street?.children().length).toBeGreaterThan(0);
      expect(street?.children().every((building) => building.sealed())).toBe(true);
      expect(street?.children().every((building) => building.kind().key() === 'building')).toBe(true);
      expect(street?.descendant(street.address().child(0))).toBeUndefined();
    }
  });
});

describe('determinism and position independence', () => {
  test('same seed + same path → the identical world, from two separate generators', () => {
    for (let n = 0; n < 25; n++) {
      const choose = (_children: readonly Location[], depth: number): number => n * 3 + depth;
      const one = descend(realRegistry().universe(sampleSeed(n)), choose).map(portrait);
      const two = descend(realRegistry().universe(sampleSeed(n)), choose).map(portrait);
      expect(one).toEqual(two);
      expect(one).toHaveLength(8);
    }
  });

  test('a place is the same whether you walk to it, jump to it, or look at its siblings first', () => {
    const seed = new Seed(0x7f3a91c2, 0x0b4de6a8);
    const walked = must(descend(registry.universe(seed), () => 1).at(-1), 'a street');
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

  test('different seeds give different worlds', () => {
    const names = new Set<string>();
    for (let n = 0; n < 200; n++) {
      names.add(
        descend(registry.universe(sampleSeed(n)), () => 0)
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
    const chain = descend(universe, () => 2);
    expect(chain).toHaveLength(8);
    for (const location of chain) {
      expect(location.populated()).toBe(true);
      for (const sibling of location.parent()?.children() ?? []) {
        if (sibling !== location) expect(sibling.populated(), sibling.address().toString()).toBe(false);
      }
    }
    const street = chain.at(-1);
    expect(street?.children().every((building) => !building.populated())).toBe(true);
  });

  test('a fresh universe has generated nothing', () => {
    expect(registry.universe(new Seed(1, 1)).populated()).toBe(false);
  });
});
