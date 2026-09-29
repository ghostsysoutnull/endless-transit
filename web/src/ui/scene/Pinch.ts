import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { Framing } from './Framing.ts';
import type { PlanPoint } from './PlanPoint.ts';
import type { Point } from './Point.ts';

/** Where two fingers touch the picture, in CSS pixels. */
type Fingers = readonly [Point, Point];

/** How far apart two fingers are, in CSS pixels: fingers on one spot count as a pixel apart, so a framing always has a scale. */
function apart([one, other]: Fingers): number {
  return Math.max(1, Math.hypot(one.x - other.x, one.y - other.y));
}

/**
 * Two fingers zooming the plan (U03, the mock's pinch): the framing they found and what they held. As they spread
 * the plan grows by the same ratio, and the plan point first under their midpoint stays under it. Immutable.
 */
export class Pinch {
  readonly #framing: Framing;
  readonly #size: PictureSize;
  /** The plan point first under the fingers' midpoint. */
  readonly #held: PlanPoint;
  /** How far apart the fingers first were, in CSS pixels. */
  readonly #apart: number;

  constructor(framing: Framing, [one, other]: Fingers, size: PictureSize) {
    this.#framing = framing;
    this.#size = size;
    this.#held = framing.toPlan({ x: (one.x + other.x) / 2, y: (one.y + other.y) / 2 }, size);
    this.#apart = apart([one, other]);
  }

  /** The framing with the fingers here now (unclamped: the camera keeps it in range). */
  at([one, other]: Fingers): Framing {
    const scale = (this.#framing.scale() * apart([one, other])) / this.#apart;
    return this.#framing.placing(
      this.#held,
      { x: (one.x + other.x) / 2, y: (one.y + other.y) / 2 },
      scale,
      this.#size,
    );
  }
}
