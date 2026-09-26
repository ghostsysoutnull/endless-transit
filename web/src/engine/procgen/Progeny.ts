import type { Location } from '#engine/model/Location.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';

const COUNT = 'children';

/**
 * Owns one fact: how a parent's children come to be — how many (a draw in `min … max` on the parent's
 * seed, times `unit`, or a count the parent already decided), and that child `i` is born from
 * `parentSeed.branch(i)` and nothing else. Which factory makes a child is asked per child seed, so a level
 * can mix kinds.
 */
export class Progeny {
  readonly #world: FactoryLookup;
  readonly #count: { min: number; max: number; unit: number } | undefined;
  readonly #factoryOf: (childSeed: Seed) => LocationFactory;

  constructor(
    world: FactoryLookup,
    count: { min: number; max: number; unit?: number } | undefined,
    factoryOf: (childSeed: Seed) => LocationFactory,
  ) {
    this.#world = world;
    this.#count = count === undefined ? undefined : { ...count, unit: count.unit ?? 1 };
    this.#factoryOf = factoryOf;
  }

  /** As many children as the parent's seed draws. */
  of(parent: Location): readonly Location[] {
    return this.exactly(parent, this.count(parent.seed()));
  }

  /** How many children a parent with this seed has — for a parent that needs to know before it is populated. */
  count(parentSeed: Seed): number {
    if (this.#count === undefined) throw new Error('this progeny has no count range: use exactly()');
    return parentSeed.branch(COUNT).range(this.#count.min, this.#count.max) * this.#count.unit;
  }

  /** The seed child `index` of a parent with this seed is born from — for a peek at a child not yet made (U02). */
  childSeed(parentSeed: Seed, index: number): Seed {
    return parentSeed.branch(index);
  }

  /** Exactly `count` children — for a parent that decided its count when it was made (a building its floors) — from child index `from` on. */
  exactly(parent: Location, count: number, from = 0): readonly Location[] {
    return Array.from({ length: count }, (_, n) => {
      const index = from + n;
      const seed = this.childSeed(parent.seed(), index);
      return this.#factoryOf(seed).create({ parent, seed, index, children: this.#world });
    });
  }
}
