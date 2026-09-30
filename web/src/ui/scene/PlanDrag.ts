import { Fling } from './Fling.ts';
import type { Framing } from './Framing.ts';
import type { LetGo } from './LetGo.ts';
import { PlanGlide } from './PlanGlide.ts';
import type { PlanGesture } from './PlanGesture.ts';
import type { PointerHold } from './PointerHold.ts';
import type { Point } from './Point.ts';

/** A finger that moves less than this is a tap, not a drag (the mock's 6 px). */
const SLOP = 6;
/** A coast comes to rest in this long, in milliseconds (the mock's 620). */
const COAST = 620;

/**
 * One finger on the plan (U03): where it went down on the page and the framing then; a tap until it goes past the
 * slop, a drag from then on, panning the plan one to one, the finger kept by the canvas. Made per finger.
 */
export class PlanDrag implements PlanGesture {
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

  /** Its own finger, at this point on the page now, moves the plan; any other finger nothing. */
  follow(_fingers: ReadonlyMap<number, Point>, page: Point, pointer: number): void {
    if (pointer !== this.#pointer) return;
    this.#at = page;
    if (this.#moved || Math.hypot(page.x - this.#start.x, page.y - this.#start.y) <= SLOP) return;
    this.#moved = true;
    this.#hold.capture(this.#pointer);
  }

  /** It ends when its own finger lifts. */
  endsWith(pointer: number): boolean {
    return pointer === this.#pointer;
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

  /** Let go, the plan coasts on the way it was moving and slows to a stop; under reduced motion it stays. */
  release(letGo: LetGo): PlanGlide {
    const speed = letGo.still
      ? { x: 0, y: 0 }
      : { x: this.#across.speed(letGo.now), y: this.#down.speed(letGo.now) };
    return new PlanGlide({
      from: letGo.framing,
      to: letGo.camera.landing(letGo.framing, speed),
      start: letGo.now,
      duration: COAST,
      easing: letGo.coast,
    });
  }
}
