import type { Culture } from '#engine/model/Culture.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/** What a building factory asks of `BuildingNamer`: a building's name, and whether it is a landmark. */
export interface BuildingNames {
  nameOf(
    seed: Seed,
    site: { culture: Culture; floors: number; depth: number; landmarkFactor: number },
  ): { name: string; landmark: boolean };
}
