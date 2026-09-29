import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { Framing } from './Framing.ts';
import type { PlanGesture } from './PlanGesture.ts';
import type { PlanPoint } from './PlanPoint.ts';
import type { Point } from './Point.ts';

/** Where two fingers touch the picture, in CSS pixels. */
type Fingers = readonly [Point, Point];

/**
 * Two fingers zooming the plan (U03, the mock's pinch): the framing they found and what they held. As they spread
 * the plan grows by the same ratio, and the plan point first under their midpoint stays under it; it ends when fewer
 * than two fingers are left, and never coasts. Made per pinch; it follows the fingers.
 */
export class Pinch implements PlanGesture {
  readonly #framing: Framing;
  readonly #size: PictureSize;
  /** The plan point first under the fingers' midpoint. */
  readonly #held: PlanPoint;
  /** How far apart the fingers first were, in CSS pixels. */
  readonly #apart: number;
  /** Where the fingers are now. */
  #now: Fingers;

  constructor(framing: Framing, [one, other]: Fingers, size: PictureSize) {
    this.#framing = framing;
    this.#size = size;
    this.#held = framing.toPlan(this.#middle([one, other]), size);
    this.#apart = this.#spread([one, other]);
    this.#now = [one, other];
  }

  /** The framing with the fingers here now (unclamped: the camera keeps it in range). */
  at([one, other]: Fingers): Framing {
    const scale = (this.#framing.scale() * this.#spread([one, other])) / this.#apart;
    return this.#framing.placing(this.#held, this.#middle([one, other]), scale, this.#size);
  }

  /** The first two fingers on the picture pinch. */
  follow(fingers: ReadonlyMap<number, Point>): void {
    const [one, other] = [...fingers.values()];
    if (one !== undefined && other !== undefined) this.#now = [one, other];
  }

  framing(): Framing {
    return this.at(this.#now);
  }

  sample(): void {
    // A pinch never coasts: nothing to measure.
  }

  endsWith(_pointer: number, fingers: ReadonlyMap<number, Point>): boolean {
    return fingers.size < 2;
  }

  /** Its fingers always moved the plan: the click after it is no tap. */
  moved(): boolean {
    return true;
  }

  speed(): Point {
    return { x: 0, y: 0 };
  }

  /** Halfway between two fingers. */
  #middle([one, other]: Fingers): Point {
    return { x: (one.x + other.x) / 2, y: (one.y + other.y) / 2 };
  }

  /** How far apart two fingers are, in CSS pixels: fingers on one spot count as a pixel apart, so a framing always has a scale. */
  #spread([one, other]: Fingers): number {
    return Math.max(1, Math.hypot(one.x - other.x, one.y - other.y));
  }
}
