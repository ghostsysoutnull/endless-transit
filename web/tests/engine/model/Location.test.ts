import { describe, expect, test } from 'vitest';
import { Building } from '#engine/model/Building.ts';
import { CosmicFilament } from '#engine/model/CosmicFilament.ts';
import type { Location } from '#engine/model/Location.ts';
import { Street } from '#engine/model/Street.ts';
import { Universe } from '#engine/model/Universe.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { CountingChildSource } from '#tests/support/CountingChildSource.ts';

const SEED = new Seed(1, 2);

/** A universe of three filaments; the second filament holds one street with one (sealed) building. */
function tinyWorld(): { universe: Universe; source: CountingChildSource } {
  const source: CountingChildSource = new CountingChildSource((parent: Location) => {
    const origin = (index: number) => ({
      parent,
      seed: parent.seed().branch(index),
      index,
      children: source,
    });
    if (parent.depth() === 0) {
      return [0, 1, 2].map(
        (index) => new CosmicFilament(origin(index), { name: `Strand-${String(index)}`, conduitId: '0x1' }),
      );
    }
    if (parent.depth() === 1)
      return parent.index() === 1 ? [new Street(origin(0), { name: 'High Way' })] : [];
    return [new Building(origin(0), { name: 'Unit Zero', landmark: true, floors: 3 })];
  });
  return { universe: new Universe({ parent: undefined, seed: SEED, index: 0, children: source }), source };
}

describe('Location — the lazy-loading law, restated', () => {
  test('nothing is generated until children() is asked, and then exactly once', () => {
    const { universe, source } = tinyWorld();
    expect(universe.populated()).toBe(false);
    expect(source.asked('0')).toBe(0);
    const first = universe.children();
    expect(universe.populated()).toBe(true);
    expect(universe.children()).toBe(first);
    expect(source.asked('0')).toBe(1);
  });

  test('the children list cannot be changed from outside', () => {
    const { universe } = tinyWorld();
    expect(Object.isFrozen(universe.children())).toBe(true);
  });

  test('walking into one child leaves its siblings ungenerated', () => {
    const { universe, source } = tinyWorld();
    const street = universe.descendant(universe.address().child(1).child(0));
    expect(street?.name()).toBe('High Way');
    expect(universe.children().map((filament) => filament.populated())).toEqual([false, true, false]);
    expect(source.asked('0.0')).toBe(0);
    expect(source.asked('0.2')).toBe(0);
  });
});

describe('Location — where it is', () => {
  test('address, depth and the trail from the universe', () => {
    const { universe } = tinyWorld();
    const street = universe.children()[1]?.children()[0];
    expect(universe.address().toString()).toBe('0');
    expect(street?.address().toString()).toBe('0.1.0');
    expect(street?.depth()).toBe(2);
    expect(street?.trail().map((step) => step.name())).toEqual([
      'The Endless Universe',
      'Strand-1',
      'High Way',
    ]);
    expect(street?.parent()?.parent()).toBe(universe);
  });

  test('descendant: one strict walker — an index nobody answers, or a sealed place, is nowhere', () => {
    const { universe } = tinyWorld();
    const root = universe.address();
    expect(universe.descendant(root)).toBe(universe);
    expect(universe.descendant(root.child(3))).toBeUndefined();
    expect(universe.descendant(root.child(0).child(0))).toBeUndefined();
    expect(universe.descendant(root.child(1).child(0).child(0))).toBeUndefined();
    expect(universe.children()[1]?.children()[0]?.children()[0]?.sealed()).toBe(true);
  });
});
