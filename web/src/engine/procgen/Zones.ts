import type { Tower } from './Tower.ts';

/** What a floor factory asks of `FloorZones`: the zone a floor stands in, by its number in its building. */
export interface Zones {
  zoneOf(tower: Tower, number: number): string;
}
