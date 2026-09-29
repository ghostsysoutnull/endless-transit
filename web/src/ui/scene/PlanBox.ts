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

  area(): number {
    return this.#width * this.#height;
  }

  /** Its shorter side over its longer, 1 for a square. */
  squareness(): number {
    return Math.min(this.#width, this.#height) / Math.max(this.#width, this.#height);
  }

  centre(): { readonly x: number; readonly y: number } {
    return { x: this.#x + this.#width / 2, y: this.#y + this.#height / 2 };
  }

  equals(other: PlanBox): boolean {
    return (
      this.#x === other.#x &&
      this.#y === other.#y &&
      this.#width === other.#width &&
      this.#height === other.#height
    );
  }
}
