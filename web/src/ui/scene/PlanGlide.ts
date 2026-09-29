import type { Easing } from './Easing.ts';
import type { Framing } from './Framing.ts';
import type { PlanMotion } from './PlanMotion.ts';
import { Tween } from './Tween.ts';

/** The plan's view gliding from one framing to another (a coast, a minimap tap). Immutable. */
export class PlanGlide implements PlanMotion {
  readonly #from: Framing;
  readonly #to: Framing;
  /** How far along the way it is, 0 to 1, eased: the one rule of a motion by elapsed time (`Tween`). */
  readonly #way: Tween;

  constructor(facts: { from: Framing; to: Framing; start: number; duration: number; easing: Easing }) {
    this.#from = facts.from;
    this.#to = facts.to;
    this.#way = new Tween(0, 1, facts.start, facts.duration, facts.easing);
  }

  /** Where the view stands at `time`; exactly the framing it was sent to once over. */
  at(time: number): Framing {
    return this.#way.done(time) ? this.#to : this.#from.between(this.#to, this.#way.at(time));
  }

  over(time: number): boolean {
    return this.#way.done(time);
  }

  finish(): void {
    // A glide only moves the view.
  }
}
