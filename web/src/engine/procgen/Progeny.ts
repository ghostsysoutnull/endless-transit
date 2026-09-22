import type { Location } from '#engine/model/Location.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';

const COUNT = 'children';

/**
 * Owns one fact: how a parent's children come to be — how many (a draw in `min … max` on the parent's
 * seed, times `unit`), and that child `i` is born from `parentSeed.branch(i)` and nothing else. Which
 * factory makes a child is asked per child seed, so a level can mix kinds.
 */
export class Progeny {
  readonly #world: FactoryLookup;
  readonly #min: number;
  readonly #max: number;
  readonly #unit: number;
  readonly #factoryOf: (childSeed: Seed) => LocationFactory;

  constructor(
    world: FactoryLookup,
    count: { min: number; max: number; unit?: number },
    factoryOf: (childSeed: Seed) => LocationFactory,
  ) {
    this.#world = world;
    this.#min = count.min;
    this.#max = count.max;
    this.#unit = count.unit ?? 1;
    this.#factoryOf = factoryOf;
  }

  of(parent: Location): readonly Location[] {
    const count = parent.seed().branch(COUNT).range(this.#min, this.#max) * this.#unit;
    return Array.from({ length: count }, (_, index) => {
      const seed = parent.seed().branch(index);
      return this.#factoryOf(seed).create({ parent, seed, index, children: this.#world });
    });
  }
}
