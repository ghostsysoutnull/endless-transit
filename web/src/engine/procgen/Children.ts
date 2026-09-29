import type { Location } from '#engine/model/Location.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/** What a factory asks of its children's maker (`Progeny`): as many as the seed draws, how many, or an exact count. */
export interface Children {
  of(parent: Location): readonly Location[];
  count(parentSeed: Seed): number;
  exactly(parent: Location, count: number, from?: number): readonly Location[];
}
