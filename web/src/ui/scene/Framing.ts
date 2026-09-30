import type { PictureSize } from '#ui/canvas/Picture.ts';
import { PlanPoint } from './PlanPoint.ts';
import type { Point } from './Point.ts';

/**
 * Where the plan's view stands (U03): the plan point at the middle of the picture, in plan units, and how many CSS
 * pixels a plan unit is drawn — across, and down by `stretch` times that (U03d: the room you stand in fills the
 * picture whatever its shape; the whole plan is drawn true, at 1). Immutable, equal by its content.
 */
export class Framing {
  readonly #x: number;
  readonly #y: number;
  readonly #scale: number;
  readonly #stretch: number;

  constructor(x: number, y: number, scale: number, stretch = 1) {
    if (!(scale > 0)) throw new RangeError(`a framing draws a unit at some size, got ${String(scale)}`);
    if (!(stretch > 0)) throw new RangeError(`a framing stretches by some factor, got ${String(stretch)}`);
    this.#x = x;
    this.#y = y;
    this.#scale = scale;
    this.#stretch = stretch;
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

  /** How much taller than wide a plan unit is drawn: 1 on the whole plan. */
  stretch(): number {
    return this.#stretch;
  }

  /** CSS pixels a plan unit spans down the picture. */
  #down(): number {
    return this.#scale * this.#stretch;
  }

  /** Where a plan point is drawn on a picture of this size, in CSS pixels. */
  toPicture(point: PlanPoint, size: PictureSize): Point {
    return {
      x: size.width / 2 + (point.x() - this.#x) * this.#scale,
      y: size.height / 2 + (point.y() - this.#y) * this.#down(),
    };
  }

  /** The plan point under a point on a picture of this size. */
  toPlan(point: Point, size: PictureSize): PlanPoint {
    return new PlanPoint(
      this.#x + (point.x - size.width / 2) / this.#scale,
      this.#y + (point.y - size.height / 2) / this.#down(),
    );
  }

  /** Moved with a finger that moved this many CSS pixels: the plan follows it. */
  panned(dx: number, dy: number): Framing {
    return new Framing(this.#x - dx / this.#scale, this.#y - dy / this.#down(), this.#scale, this.#stretch);
  }

  /** At another scale, the plan point under `point` kept where it is. */
  zoomedAbout(point: Point, scale: number, size: PictureSize): Framing {
    return this.placing(this.toPlan(point, size), point, scale, size);
  }

  /** At this scale, with a plan point drawn at a point of the picture (a pinch keeps what its fingers hold under them). */
  placing(plan: PlanPoint, at: Point, scale: number, size: PictureSize): Framing {
    return new Framing(
      plan.x() - (at.x - size.width / 2) / scale,
      plan.y() - (at.y - size.height / 2) / (scale * this.#stretch),
      scale,
      this.#stretch,
    );
  }

  /** The way from here to `other` at `t` (0 here, 1 there): the centre in a line, the scale and stretch evenly by ratio. */
  between(other: Framing, t: number): Framing {
    return new Framing(
      this.#x + (other.#x - this.#x) * t,
      this.#y + (other.#y - this.#y) * t,
      this.#scale * (other.#scale / this.#scale) ** t,
      this.#stretch * (other.#stretch / this.#stretch) ** t,
    );
  }

  equals(other: Framing): boolean {
    return (
      this.#x === other.#x &&
      this.#y === other.#y &&
      this.#scale === other.#scale &&
      this.#stretch === other.#stretch
    );
  }
}
