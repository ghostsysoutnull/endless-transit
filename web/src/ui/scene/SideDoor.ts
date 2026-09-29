import type { PlanBox } from './PlanBox.ts';
import type { PlanDoor } from './PlanDoor.ts';
import { PlanPoint } from './PlanPoint.ts';

/** Two walls closer than this are one. */
const EDGE = 1e-9;

/** A doorway in a wall that runs up and down, at `x`, the shared wall running from `top` to `bottom`. Value object. */
export class SideDoor implements PlanDoor {
  readonly #x: number;
  readonly #top: number;
  readonly #bottom: number;

  constructor(x: number, top: number, bottom: number) {
    this.#x = x;
    this.#top = top;
    this.#bottom = bottom;
  }

  middle(): PlanPoint {
    return new PlanPoint(this.#x, (this.#top + this.#bottom) / 2);
  }

  span(): number {
    return this.#bottom - this.#top;
  }

  gap(width: number): readonly [PlanPoint, PlanPoint] {
    const half = Math.min(width, this.span()) / 2;
    const middle = (this.#top + this.#bottom) / 2;
    return [new PlanPoint(this.#x, middle - half), new PlanPoint(this.#x, middle + half)];
  }

  on(box: PlanBox): boolean {
    const middle = (this.#top + this.#bottom) / 2;
    const atWall = Math.abs(box.left() - this.#x) < EDGE || Math.abs(box.right() - this.#x) < EDGE;
    return atWall && middle > box.top() && middle < box.bottom();
  }
}
