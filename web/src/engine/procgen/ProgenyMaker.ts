import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { ChildCount } from './ChildCount.ts';
import type { Children } from './Children.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { Offspring } from './Offspring.ts';
import { Progeny } from './Progeny.ts';

/** Makes a factory's children's maker on the world's factories (U02). A factory, built by `LocationRegistry`. */
export class ProgenyMaker implements Offspring {
  readonly #world: FactoryLookup;

  constructor(world: FactoryLookup) {
    this.#world = world;
  }

  of(count: ChildCount, kindOf: (childSeed: Seed) => LocationKind): Children {
    return new Progeny(this.#world, count, (childSeed) => this.#world.factoryFor(kindOf(childSeed)));
  }
}
