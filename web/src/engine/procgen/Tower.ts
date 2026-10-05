import type { Trait } from '#engine/model/Trait.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/** The building a floor's zone is named in: its seed, how many floors it has, and the trait of its country. */
export interface Tower {
  readonly seed: Seed;
  readonly floors: number;
  readonly trait: Trait;
}
