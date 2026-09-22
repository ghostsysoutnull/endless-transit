import type { Seed } from '#engine/rng/Seed.ts';
import type { FloorBand } from './FloorBand.ts';

const ROLL = { min: 0, max: 99 };
/** The first row whose `upTo` the roll does not exceed wins: 41 rolls, then 30, 20 and 9. */
const TABLE: readonly { readonly upTo: number; readonly floors: FloorBand }[] = [
  { upTo: 40, floors: { min: 3, max: 10 } },
  { upTo: 70, floors: { min: 10, max: 25 } },
  { upTo: 90, floors: { min: 30, max: 50 } },
  { upTo: ROLL.max, floors: { min: 50, max: 100 } },
];

/**
 * Owns one fact: how big buildings are. A roll of 0 … 99 picks the size — small 41% (3–10 floors),
 * medium 30% (10–25), large 20% (30–50), massive 9% (50–100) — and a second draw picks the floors inside
 * it. The table answers for a roll directly, so its edges are tested without a sample.
 */
export class BuildingSizes {
  /** The floors a building of this roll may have. A roll that is not one of the hundred is an error. */
  bandFor(roll: number): FloorBand {
    const row =
      Number.isInteger(roll) && roll >= ROLL.min ? TABLE.find((each) => roll <= each.upTo) : undefined;
    if (row === undefined)
      throw new RangeError(`a size roll is a whole number from 0 to 99, not ${String(roll)}`);
    return row.floors;
  }

  bandOf(seed: Seed): FloorBand {
    return this.bandFor(seed.branch('size').range(ROLL.min, ROLL.max));
  }

  floorsOf(seed: Seed): number {
    const band = this.bandOf(seed);
    return seed.branch('floors').range(band.min, band.max);
  }
}
