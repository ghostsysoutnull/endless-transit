import type { PictureSize } from '#ui/canvas/Picture.ts';

/**
 * Where the plan's view stands (U03): the plan point at the middle of the picture, in plan units, and how many CSS
 * pixels a plan unit is drawn. Immutable, equal by its content.
 */
export class Framing {
  readonly #x: number;
  readonly #y: number;
  readonly #scale: number;

  constructor(x: number, y: number, scale: number) {
    if (!(scale > 0)) throw new RangeError(`a framing draws a unit at some size, got ${String(scale)}`);
    this.#x = x;
    this.#y = y;
    this.#scale = scale;
  }

  x(): number {
    return this.#x;
  }

  y(): number {
    return this.#y;
  }

  scale(): number {
    return this.#scale;
  }

  /** Where a plan point is drawn on a picture of this size, in CSS pixels. */
  toPicture(
    point: { readonly x: number; readonly y: number },
    size: PictureSize,
  ): { readonly x: number; readonly y: number } {
    return {
      x: size.width / 2 + (point.x - this.#x) * this.#scale,
      y: size.height / 2 + (point.y - this.#y) * this.#scale,
    };
  }

  /** The plan point under a point on a picture of this size. */
  toPlan(
    point: { readonly x: number; readonly y: number },
    size: PictureSize,
  ): { readonly x: number; readonly y: number } {
    return {
      x: this.#x + (point.x - size.width / 2) / this.#scale,
      y: this.#y + (point.y - size.height / 2) / this.#scale,
    };
  }

  /** Moved with a finger that moved this many CSS pixels: the plan follows it. */
  panned(dx: number, dy: number): Framing {
    return new Framing(this.#x - dx / this.#scale, this.#y - dy / this.#scale, this.#scale);
  }

  /** At another scale, the plan point under `point` kept where it is. */
  zoomedAbout(point: { readonly x: number; readonly y: number }, scale: number, size: PictureSize): Framing {
    return this.placing(this.toPlan(point, size), point, scale, size);
  }

  /** At this scale, with a plan point drawn at a point of the picture (a pinch keeps what its fingers hold under them). */
  placing(
    plan: { readonly x: number; readonly y: number },
    at: { readonly x: number; readonly y: number },
    scale: number,
    size: PictureSize,
  ): Framing {
    return new Framing(
      plan.x - (at.x - size.width / 2) / scale,
      plan.y - (at.y - size.height / 2) / scale,
      scale,
    );
  }

  /** The way from here to `other` at `t` (0 here, 1 there): the centre in a line, the scale evenly by ratio. */
  between(other: Framing, t: number): Framing {
    return new Framing(
      this.#x + (other.#x - this.#x) * t,
      this.#y + (other.#y - this.#y) * t,
      this.#scale * (other.#scale / this.#scale) ** t,
    );
  }

  equals(other: Framing): boolean {
    return this.#x === other.#x && this.#y === other.#y && this.#scale === other.#scale;
  }
}
