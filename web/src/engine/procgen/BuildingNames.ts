import type { Seed } from '#engine/rng/Seed.ts';
import type { BuildingSite } from './BuildingSite.ts';

/** What a building factory asks of `BuildingNamer`: a building's name, and whether it is a landmark. */
export interface BuildingNames {
  nameOf(seed: Seed, site: BuildingSite): { name: string; landmark: boolean };
}
