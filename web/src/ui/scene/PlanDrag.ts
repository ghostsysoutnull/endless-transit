import { Fling } from './Fling.ts';
import type { Framing } from './Framing.ts';
import type { PointerHold } from './PointerHold.ts';
import type { Point } from './Point.ts';

/** A finger that moves less than this is a tap, not a drag (the mock's 6 px). */
const SLOP = 6;

/**
 * One finger on the plan (U03): where it went down on the page and the framing then; a tap until it goes past the
 * slop, a drag from then on, panning the plan one to one, the finger kept by the canvas. Made per finger.
 */
export class PlanDrag {
  readonly #pointer: number;
  readonly #hold: PointerHold;
  readonly #start: Point;
  readonly #from: Framing;
  readonly #across = new Fling();
  readonly #down = new Fling();
  #at: Point;
  #moved = false;

  constructor(facts: { pointer: number; hold: PointerHold; point: Point; framing: Framing }) {
    this.#pointer = facts.pointer;
    this.#hold = facts.hold;
    this.#start = facts.point;
    this.#at = facts.point;
    this.#from = facts.framing;
  }

  is(pointer: number): boolean {
    return this.#pointer === pointer;
  }

  /** The finger is at this point on the page now. */
  move(point: Point): void {
    this.#at = point;
    if (this.#moved || Math.hypot(point.x - this.#start.x, point.y - this.#start.y) <= SLOP) return;
    this.#moved = true;
    this.#hold.capture(this.#pointer);
  }

  moved(): boolean {
    return this.#moved;
  }

  /** Where it puts the plan now; nothing while it is still a tap. */
  framing(): Framing | undefined {
    return this.#moved
      ? this.#from.panned(this.#at.x - this.#start.x, this.#at.y - this.#start.y)
      : undefined;
  }

  /** The framing it has moved the plan to, at this moment: what its speed is worked out from. */
  sample(time: number, framing: Framing): void {
    this.#across.sample(time, framing.x());
    this.#down.sample(time, framing.y());
  }

  /** How fast it was moving the plan when it let go, in plan units a second on each axis. */
  speed(now: number): Point {
    return { x: this.#across.speed(now), y: this.#down.speed(now) };
  }
}
