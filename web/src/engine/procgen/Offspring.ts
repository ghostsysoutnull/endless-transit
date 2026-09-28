import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { Children } from './Children.ts';

/** How a factory gets its children's maker (`ProgenyMaker`): how many it draws, and the kind each child seed is. */
export interface Offspring {
  of(
    count: { min: number; max: number; unit?: number } | undefined,
    kindOf: (childSeed: Seed) => LocationKind,
  ): Children;
}
