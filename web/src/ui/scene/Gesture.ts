import { Fling } from './Fling.ts';

/** A finger that moves less than this is a tap, not a drag (the mock's 6 px). */
const SLOP = 6;

/**
 * One finger on the picture or its slider (U02): where it went down along the picture's axis, the view then, and
 * whether it has become a drag — on the picture once it goes past the slop, on the slider from the start; once
 * moved it stays moved. It keeps how fast it moves the view, for the coast when it lets go.
 */
export class Gesture {
  readonly #pointer: number;
  readonly #start: number;
  readonly #view: number;
  readonly #slider: boolean;
  readonly #fling = new Fling();
  #moved: boolean;

  constructor(facts: { pointer: number; start: number; view: number; slider: boolean }) {
    this.#pointer = facts.pointer;
    this.#start = facts.start;
    this.#view = facts.view;
    this.#slider = facts.slider;
    this.#moved = facts.slider;
  }

  /** Whether this is the finger with this pointer id. */
  is(pointer: number): boolean {
    return this.#pointer === pointer;
  }

  onSlider(): boolean {
    return this.#slider;
  }

  /** The finger is here now, along the picture's axis: past the slop, it has moved. */
  move(position: number): void {
    if (Math.abs(position - this.#start) > SLOP) this.#moved = true;
  }

  moved(): boolean {
    return this.#moved;
  }

  /** The view under the finger at this position, one to one at `drag` view units a pixel. */
  viewAt(position: number, drag: number): number {
    return this.#view + (position - this.#start) * drag;
  }

  /** The view it has moved to, at this moment: what its speed is worked out from. */
  sample(time: number, view: number): void {
    this.#fling.sample(time, view);
  }

  /** How fast it was moving the view when it let go, in view units a second. */
  speed(now: number): number {
    return this.#fling.speed(now);
  }
}
