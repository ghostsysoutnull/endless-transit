/** Slow out, fast through the middle, slow in: the one easing a scene moves by. */
function easeInOut(progress: number): number {
  return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
}

/** Fast away, slow in: how a released view coasts to rest (the mock's `easeOut`). */
export function easeOut(progress: number): number {
  return 1 - (1 - progress) ** 3;
}

/**
 * A number on its way from one value to another over a span of time, measured by elapsed time (Decision 4),
 * never by frames: the value at any moment is a pure function of the moment. Immutable.
 */
export class Tween {
  readonly #from: number;
  readonly #to: number;
  readonly #start: number;
  readonly #duration: number;
  readonly #easing: (progress: number) => number;

  constructor(
    from: number,
    to: number,
    start: number,
    duration: number,
    easing: (progress: number) => number = easeInOut,
  ) {
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
    return this.#from + (this.#to - this.#from) * this.#easing(progress);
  }

  done(time: number): boolean {
    return this.progress(time) >= 1;
  }
}
