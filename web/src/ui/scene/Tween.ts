import type { Easing } from './Easing.ts';

/**
 * A number on its way from one value to another over a span of time, measured by elapsed time (Decision 4),
 * never by frames: the value at any moment is a pure function of the moment. Immutable.
 */
export class Tween {
  readonly #from: number;
  readonly #to: number;
  readonly #start: number;
  readonly #duration: number;
  readonly #easing: Easing;

  constructor(from: number, to: number, start: number, duration: number, easing: Easing) {
    this.#from = from;
    this.#to = to;
    this.#start = start;
    this.#duration = duration;
    this.#easing = easing;
  }

  /** How far along it is at `time`, 0 to 1, uneased. */
  progress(time: number): number {
    if (this.#duration <= 0) return 1;
    return Math.min(1, Math.max(0, (time - this.#start) / this.#duration));
  }

  at(time: number): number {
    const progress = this.progress(time);
    if (progress >= 1) return this.#to;
    return this.#from + (this.#to - this.#from) * this.#easing.ease(progress);
  }

  done(time: number): boolean {
    return this.progress(time) >= 1;
  }
}
