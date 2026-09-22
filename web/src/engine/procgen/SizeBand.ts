import type { FloorBand } from './FloorBand.ts';

/** One size of building: how many floors it may have, and how many doors each of its corridors. */
export interface SizeBand {
  readonly floors: FloorBand;
  readonly doors: FloorBand;
}
