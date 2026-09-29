import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { ChildCount } from './ChildCount.ts';
import type { Children } from './Children.ts';

/** How a factory gets its children's maker (`ProgenyMaker`): how many it draws, and the kind each child seed is. */
export interface Offspring {
  of(count: ChildCount, kindOf: (childSeed: Seed) => LocationKind): Children;
}
