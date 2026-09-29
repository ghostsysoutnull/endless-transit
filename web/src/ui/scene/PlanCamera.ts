import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { FloorPlan } from './FloorPlan.ts';
import { Framing } from './Framing.ts';

/** Room kept clear around the whole plan when it fits, in CSS pixels (the mock's `aptLimits`, `transit-reframed.html:610`). */
const FIT_MARGIN = { width: 36, height: 44 };
/** How far out and in a finger may zoom: below the whole plan by this share, in to this many pixels a unit at least. */
const LOOSE = 0.85;
const TIGHT = { share: 1.2, pixels: 280 };
/** The plan may be pushed this far past the frame's edge, in CSS pixels (the mock's `clampAc`). */
const OVERSHOOT = 24;
/** A room glided to fills this share of the picture's shorter side (the mock's `roomView`). */
const ROOM_SHARE = 0.62;
/** A let-go view coasts on for this long, in seconds of its speed (the mock's `vel * .3`). */
const COAST = 0.3;
/** Past the frame by this much, the plan does not fit and the minimap shows (the mock's `- 12`). */
const OVERFLOW = 12;

/**
 * How the plan's view moves on a picture of one size (U03, the mock's apartment camera): the scale range, keeping the
 * plan in the frame, the whole plan, a room glided to, and where a let-go view comes to rest. Immutable.
 */
export class PlanCamera {
  readonly #plan: FloorPlan;
  readonly #size: PictureSize;

  constructor(plan: FloorPlan, size: PictureSize) {
    this.#plan = plan;
    this.#size = size;
  }

  /** The scale the whole plan fits at. */
  #fit(): number {
    return Math.max(
      Number.MIN_VALUE,
      Math.min(
        (this.#size.width - FIT_MARGIN.width) / this.#plan.width(),
        (this.#size.height - FIT_MARGIN.height) / this.#plan.height(),
      ),
    );
  }

  /** A framing kept within the scale range, the plan kept in the frame (centred on an axis it fits along). */
  clamp(framing: Framing): Framing {
    const fit = this.#fit();
    const scale = Math.min(Math.max(framing.scale(), fit * LOOSE), Math.max(fit * TIGHT.share, TIGHT.pixels));
    const halfWidth = this.#size.width / 2 / scale;
    const halfHeight = this.#size.height / 2 / scale;
    const margin = OVERSHOOT / scale;
    const along = (at: number, length: number, half: number): number =>
      length + 2 * margin <= 2 * half
        ? length / 2
        : Math.min(Math.max(at, half - margin), length - half + margin);
    return new Framing(
      along(framing.x(), this.#plan.width(), halfWidth),
      along(framing.y(), this.#plan.height(), halfHeight),
      scale,
    );
  }

  /** The whole plan, at the scale it fits. */
  whole(): Framing {
    return new Framing(this.#plan.width() / 2, this.#plan.height() / 2, this.#fit());
  }

  /** The room at this index, glided to: centred, filling most of the picture's shorter side. */
  room(index: number): Framing {
    const box = this.#plan.rooms()[index];
    if (box === undefined) return this.whole();
    const scale = Math.max(
      (Math.min(this.#size.width, this.#size.height) * ROOM_SHARE) / Math.max(box.width(), box.height()),
      this.#fit(),
    );
    const centre = box.centre();
    return this.clamp(new Framing(centre.x(), centre.y(), scale));
  }

  /** Where a view let go moving at this speed (plan units a second, on each axis) comes to rest. */
  landing(framing: Framing, speed: { readonly x: number; readonly y: number }): Framing {
    return this.clamp(
      new Framing(framing.x() + speed.x * COAST, framing.y() + speed.y * COAST, framing.scale()),
    );
  }

  /** Whether the plan runs past the frame at this framing: the minimap then shows the whole of it. */
  overflows(framing: Framing): boolean {
    return (
      this.#plan.width() * framing.scale() > this.#size.width - OVERFLOW ||
      this.#plan.height() * framing.scale() > this.#size.height - OVERFLOW
    );
  }
}
