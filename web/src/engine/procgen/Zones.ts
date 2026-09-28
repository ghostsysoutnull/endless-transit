import type { Seed } from '#engine/rng/Seed.ts';

/** What a floor factory asks of `FloorZones`: the zone a floor stands in, by its number in the building. */
export interface Zones {
  zoneOf(seed: Seed, number: number, floors: number): string;
}
