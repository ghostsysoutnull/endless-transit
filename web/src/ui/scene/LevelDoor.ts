import type { PlanBox } from './PlanBox.ts';
import type { PlanDoor } from './PlanDoor.ts';
import { PlanPoint } from './PlanPoint.ts';

/** Two walls closer than this are one. */
const EDGE = 1e-9;

/** A doorway in a wall that runs across, at `y`, the shared wall running from `left` to `right`. Value object. */
export class LevelDoor implements PlanDoor {
  readonly #y: number;
  readonly #left: number;
  readonly #right: number;

  constructor(y: number, left: number, right: number) {
    this.#y = y;
    this.#left = left;
    this.#right = right;
  }

  middle(): PlanPoint {
    return new PlanPoint((this.#left + this.#right) / 2, this.#y);
  }

  span(): number {
    return this.#right - this.#left;
  }

  gap(width: number): readonly [PlanPoint, PlanPoint] {
    const half = Math.min(width, this.span()) / 2;
    const middle = (this.#left + this.#right) / 2;
    return [new PlanPoint(middle - half, this.#y), new PlanPoint(middle + half, this.#y)];
  }

  on(box: PlanBox): boolean {
    const middle = (this.#left + this.#right) / 2;
    const atWall = Math.abs(box.top() - this.#y) < EDGE || Math.abs(box.bottom() - this.#y) < EDGE;
    return atWall && middle > box.left() && middle < box.right();
  }
}
