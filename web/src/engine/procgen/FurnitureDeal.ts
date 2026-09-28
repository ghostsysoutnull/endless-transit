import type { Culture } from '#engine/model/Culture.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/** What a room factory asks of `Furnishings`: the pieces of furniture dealt for a room. */
export interface FurnitureDeal {
  of(seed: Seed, culture: Culture, count: number): readonly string[];
}
