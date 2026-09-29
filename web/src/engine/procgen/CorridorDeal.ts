import type { CorridorShape } from '#engine/model/CorridorShape.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/** What a corridor and a floor's peek ask of `CorridorWords`: the sentence dealt on a seed, and the shape it keys. */
export interface CorridorDeal {
  dealt(seed: Seed): readonly [string, CorridorShape];
}
