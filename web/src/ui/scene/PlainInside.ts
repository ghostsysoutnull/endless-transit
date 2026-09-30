import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { NameLine } from './NameLine.ts';
import type { RelicSpot } from './RelicSpot.ts';
import type { RoomInside } from './RoomInside.ts';

/** A room drawn plain (U03): nothing inside but its floor; its name in the middle; its relics in a grid from the top. Value object. */
export class PlainInside implements RoomInside {
  readonly #box: PlanBoxOnPicture;
  /** How far apart relics lie, centre to centre. */
  readonly #spot: number;

  constructor(box: PlanBoxOnPicture, spot: number) {
    this.#box = box;
    this.#spot = spot;
  }

  spots(count: number): readonly RelicSpot[] {
    const box = this.#box;
    const spot = this.#spot;
    const columns = Math.floor(box.width / spot);
    const rows = Math.floor((box.height - spot / 2) / spot);
    if (columns < 1 || rows < 1) return [];
    const shown = Math.min(count, columns * rows);
    const used = Math.min(columns, shown);
    const left = box.x + box.width / 2 - (used * spot) / 2 + spot / 2;
    const top = box.y + spot / 2 + 4;
    return Array.from({ length: shown }, (_, index) => ({
      at: { x: left + (index % columns) * spot, y: top + Math.floor(index / columns) * spot },
      reach: spot - 4,
    }));
  }

  nameLine(): NameLine {
    return { y: this.#box.y + this.#box.height / 2, lines: 2 };
  }

  paint(): void {
    // Nothing: its sight's floor is all a plain room shows.
  }
}
