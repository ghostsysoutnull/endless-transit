import type { Seed } from '#engine/rng/Seed.ts';

/** What a building factory asks of `BuildingSizes`: how many floors a building has, and doors on each. */
export interface Sizes {
  floorsOf(seed: Seed): number;
  doorsPerFloorOf(seed: Seed): number;
}
