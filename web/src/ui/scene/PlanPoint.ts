/** A point on an apartment's plan, in plan units (a room is about 1.3 across) — never a picture's pixels (`Point`). Value object. */
export class PlanPoint {
  readonly #x: number;
  readonly #y: number;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  x(): number {
    return this.#x;
  }

  y(): number {
    return this.#y;
  }

  equals(other: PlanPoint): boolean {
    return this.#x === other.#x && this.#y === other.#y;
  }
}
