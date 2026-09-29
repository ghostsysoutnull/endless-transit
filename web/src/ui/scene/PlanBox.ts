import { LevelDoor } from './LevelDoor.ts';
import type { PlanDoor } from './PlanDoor.ts';
import { PlanPoint } from './PlanPoint.ts';
import { SideDoor } from './SideDoor.ts';

/** Two walls closer than this, in plan units, are one. */
const EDGE = 1e-9;

/** A box on an apartment's plan, in plan units (a room is about 1.3 across): where it starts and how big it is. Value object. */
export class PlanBox {
  readonly #x: number;
  readonly #y: number;
  readonly #width: number;
  readonly #height: number;

  constructor(x: number, y: number, width: number, height: number) {
    if (!(width > 0 && height > 0))
      throw new RangeError(`a box has a size, got ${String(width)} × ${String(height)}`);
    this.#x = x;
    this.#y = y;
    this.#width = width;
    this.#height = height;
  }

  left(): number {
    return this.#x;
  }

  top(): number {
    return this.#y;
  }

  right(): number {
    return this.#x + this.#width;
  }

  bottom(): number {
    return this.#y + this.#height;
  }

  width(): number {
    return this.#width;
  }

  height(): number {
    return this.#height;
  }

  /** Whether its left or right wall stands at this x. */
  sideAt(x: number): boolean {
    return this.#meets(this.left(), x) || this.#meets(this.right(), x);
  }

  /** Whether its top or bottom wall stands at this y. */
  levelAt(y: number): boolean {
    return this.#meets(this.top(), y) || this.#meets(this.bottom(), y);
  }

  /**
   * The doorway into a box that shares a wall with this one: in the middle of the shared stretch of this box's right
   * or left wall (the other's left or right), else of its bottom or top (the other's top or bottom). A box that
   * shares no wall with this one has no doorway to it.
   */
  doorTo(next: PlanBox): PlanDoor {
    const top = Math.max(this.top(), next.top());
    const bottom = Math.min(this.bottom(), next.bottom());
    const left = Math.max(this.left(), next.left());
    const right = Math.min(this.right(), next.right());
    if (this.#meets(this.right(), next.left())) return new SideDoor(this.right(), top, bottom);
    if (this.#meets(this.left(), next.right())) return new SideDoor(this.left(), top, bottom);
    if (this.#meets(this.bottom(), next.top())) return new LevelDoor(this.bottom(), left, right);
    if (this.#meets(this.top(), next.bottom())) return new LevelDoor(this.top(), left, right);
    throw new RangeError('two boxes that share no wall have no doorway between them');
  }

  area(): number {
    return this.#width * this.#height;
  }

  /** Its shorter side over its longer, 1 for a square. */
  squareness(): number {
    return Math.min(this.#width, this.#height) / Math.max(this.#width, this.#height);
  }

  centre(): PlanPoint {
    return new PlanPoint(this.#x + this.#width / 2, this.#y + this.#height / 2);
  }

  topLeft(): PlanPoint {
    return new PlanPoint(this.#x, this.#y);
  }

  bottomRight(): PlanPoint {
    return new PlanPoint(this.#x + this.#width, this.#y + this.#height);
  }

  equals(other: PlanBox): boolean {
    return (
      this.#x === other.#x &&
      this.#y === other.#y &&
      this.#width === other.#width &&
      this.#height === other.#height
    );
  }

  /** Two walls closer than `EDGE` are one. */
  #meets(one: number, other: number): boolean {
    return Math.abs(one - other) < EDGE;
  }
}
