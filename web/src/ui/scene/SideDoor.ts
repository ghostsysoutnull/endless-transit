import type { PlanBox } from './PlanBox.ts';
import type { PlanDoor } from './PlanDoor.ts';
import { PlanPoint } from './PlanPoint.ts';

/** A doorway in a wall that runs up and down, at `x`, the shared wall running from `top` to `bottom`. Value object. */
export class SideDoor implements PlanDoor {
  readonly #x: number;
  readonly #top: number;
  readonly #bottom: number;

  constructor(x: number, top: number, bottom: number) {
    if (!(bottom > top))
      throw new RangeError(`a doorway needs wall to stand in, got ${String(top)} to ${String(bottom)}`);
    this.#x = x;
    this.#top = top;
    this.#bottom = bottom;
  }

  middle(): PlanPoint {
    return new PlanPoint(this.#x, this.#along());
  }

  span(): number {
    return this.#bottom - this.#top;
  }

  gap(width: number): readonly [PlanPoint, PlanPoint] {
    const half = Math.min(width, this.span()) / 2;
    return [new PlanPoint(this.#x, this.#along() - half), new PlanPoint(this.#x, this.#along() + half)];
  }

  on(box: PlanBox): boolean {
    return box.sideAt(this.#x) && this.#along() > box.top() && this.#along() < box.bottom();
  }

  /** The middle of the shared wall, along it. */
  #along(): number {
    return (this.#top + this.#bottom) / 2;
  }
}
