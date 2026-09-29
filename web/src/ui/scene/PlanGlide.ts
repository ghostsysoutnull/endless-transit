import type { Easing } from './Easing.ts';
import type { Framing } from './Framing.ts';
import type { PlanMotion } from './PlanMotion.ts';

/** The plan's view gliding from one framing to another (a coast, a minimap tap). Immutable. */
export class PlanGlide implements PlanMotion {
  readonly #from: Framing;
  readonly #to: Framing;
  readonly #start: number;
  readonly #duration: number;
  readonly #easing: Easing;

  constructor(facts: { from: Framing; to: Framing; start: number; duration: number; easing: Easing }) {
    this.#from = facts.from;
    this.#to = facts.to;
    this.#start = facts.start;
    this.#duration = facts.duration;
    this.#easing = facts.easing;
  }

  at(time: number): Framing {
    if (this.over(time)) return this.#to;
    return this.#from.between(
      this.#to,
      this.#easing.ease(Math.max(0, (time - this.#start) / this.#duration)),
    );
  }

  over(time: number): boolean {
    return this.#duration <= 0 || time - this.#start >= this.#duration;
  }

  finish(): void {
    // A glide only moves the view.
  }
}
