/** A whole-number range, both ends included: how many floors a size may have, how many doors its corridors. */
export interface FloorBand {
  readonly min: number;
  readonly max: number;
}
