import type { Seed } from '#engine/rng/Seed.ts';
import type { SizeBand } from './SizeBand.ts';

const ROLL = { min: 0, max: 99 };
/** The first row whose `upTo` the roll does not exceed wins: 41 rolls, then 30, 20 and 9. */
const TABLE: readonly { readonly upTo: number; readonly size: SizeBand }[] = [
  { upTo: 40, size: { floors: { min: 3, max: 10 }, doors: { min: 2, max: 6 } } },
  { upTo: 70, size: { floors: { min: 10, max: 25 }, doors: { min: 4, max: 10 } } },
  { upTo: 90, size: { floors: { min: 30, max: 50 }, doors: { min: 8, max: 16 } } },
  { upTo: ROLL.max, size: { floors: { min: 50, max: 100 }, doors: { min: 10, max: 20 } } },
];

/**
 * Owns one fact: how big buildings are. A roll of 0 … 99 picks the size — small 41% (3–10 floors, 2–6
 * doors per corridor), medium 30% (10–25, 4–10), large 20% (30–50, 8–16), massive 9% (50–100, 10–20) —
 * and one more draw each picks the floors and the doors inside it. The table answers for a roll directly,
 * so its edges are tested without a sample.
 */
export class BuildingSizes {
  /** The size a building of this roll has. A roll that is not one of the hundred is an error. */
  bandFor(roll: number): SizeBand {
    const row =
      Number.isInteger(roll) && roll >= ROLL.min ? TABLE.find((each) => roll <= each.upTo) : undefined;
    if (row === undefined)
      throw new RangeError(`a size roll is a whole number from 0 to 99, not ${String(roll)}`);
    return row.size;
  }

  bandOf(seed: Seed): SizeBand {
    return this.bandFor(seed.branch('size').range(ROLL.min, ROLL.max));
  }

  floorsOf(seed: Seed): number {
    const band = this.bandOf(seed).floors;
    return seed.branch('floors').range(band.min, band.max);
  }

  doorsPerFloorOf(seed: Seed): number {
    const band = this.bandOf(seed).doors;
    return seed.branch('doors').range(band.min, band.max);
  }
}
