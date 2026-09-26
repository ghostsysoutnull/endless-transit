/** Only the samples of this last stretch of a drag count toward its speed, in milliseconds. */
const WINDOW = 110;
/** A finger still this long before it let go threw nothing. */
const STILL = 90;

/**
 * Owns one fact: how fast a finger was moving a view when it let go (the mock's `sample`/`vel`, U02) — the
 * change over the last 110 ms of samples, in view units a second; nothing when the finger had stopped.
 */
export class Fling {
  readonly #samples: { time: number; value: number }[] = [];

  sample(time: number, value: number): void {
    this.#samples.push({ time, value });
    while (this.#samples.length > 2 && time - (this.#samples[0]?.time ?? time) > WINDOW)
      this.#samples.shift();
  }

  speed(now: number): number {
    const first = this.#samples[0];
    const last = this.#samples.at(-1);
    if (first === undefined || last === undefined || first === last || now - last.time > STILL) return 0;
    const seconds = (last.time - first.time) / 1000;
    return seconds > 0 ? (last.value - first.value) / seconds : 0;
  }
}
