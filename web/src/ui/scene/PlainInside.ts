import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { NameLine } from './NameLine.ts';
import type { RelicSpot } from './RelicSpot.ts';
import type { RoomInside } from './RoomInside.ts';

/** A relic's place in a plain room, a thumb's reach and a little air. */
const SPOT = 52;

/** A room drawn plain (U03): nothing inside but its floor; its name in the middle; its relics in a grid from the top. Value object. */
export class PlainInside implements RoomInside {
  readonly #box: PlanBoxOnPicture;

  constructor(box: PlanBoxOnPicture) {
    this.#box = box;
  }

  spots(count: number): readonly RelicSpot[] {
    const box = this.#box;
    const columns = Math.floor(box.width / SPOT);
    const rows = Math.floor((box.height - SPOT / 2) / SPOT);
    if (columns < 1 || rows < 1) return [];
    const shown = Math.min(count, columns * rows);
    const used = Math.min(columns, shown);
    const left = box.x + box.width / 2 - (used * SPOT) / 2 + SPOT / 2;
    const top = box.y + SPOT / 2 + 4;
    return Array.from({ length: shown }, (_, index) => ({
      at: { x: left + (index % columns) * SPOT, y: top + Math.floor(index / columns) * SPOT },
      reach: SPOT - 4,
    }));
  }

  nameLine(): NameLine {
    return { y: this.#box.y + this.#box.height / 2, lines: 2 };
  }

  paint(): void {
    // Nothing: its sight's floor is all a plain room shows.
  }
}
