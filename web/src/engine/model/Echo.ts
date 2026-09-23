import type { Capture } from './Capture.ts';
import { Frequency } from './Frequency.ts';
import type { Location } from './Location.ts';
import { SpectralEcho } from './SpectralEcho.ts';

/** What the echo is worth (NullSector.groovy:29). */
const HERTZ = { min: 1000, max: 9999 };
/** What one scan adds to the signal (NullSector.groovy:93). */
const READING = { min: 10, max: 39 };
const LOCK = 100;
const SILENT = 0;
const ECHO = 'echo';
const HERTZ_KEY = 'echo-hertz';

/**
 * The echo a Null Reach holds and the state of the hunt for it (Guide:192-195; NullSector.groovy:11-13,
 * 89-112): the signal, which each scan raises by 10 to 39 — a reading fixed by the reach and the step it
 * is made on, so the same walk gives the same readings — until it locks at 100; then the echo can be
 * captured, once, ever. The echo itself is fixed by the reach alone. Owned by the reach.
 */
export class Echo {
  readonly #reach: Location;
  #signal = SILENT;
  #found = false;

  constructor(reach: Location) {
    this.#reach = reach;
  }

  signal(): number {
    return this.#signal;
  }

  /** The signal is strong enough to capture. */
  locked(): boolean {
    return this.#signal >= LOCK;
  }

  found(): boolean {
    return this.#found;
  }

  /** One scan at this step: the signal after it. Nothing moves once the echo is found. */
  scan(steps: number): number {
    if (this.#found) return this.#signal;
    const reading = this.#reach.seed().branch(ECHO).branch(steps).range(READING.min, READING.max);
    this.#signal = Math.min(LOCK, this.#signal + reading);
    return this.#signal;
  }

  /** The echo this reach holds, whether or not it has been taken: fixed by the reach. */
  fragment(): SpectralEcho {
    return new SpectralEcho({
      from: this.#reach.address(),
      frequency: new Frequency(this.#reach.seed().branch(HERTZ_KEY).range(HERTZ.min, HERTZ.max)),
    });
  }

  /** The echo, once the signal is locked and while it has not been taken; the signal falls silent (NullSector.groovy:104-111). */
  capture(): Capture | undefined {
    if (!this.locked() || this.#found) return undefined;
    this.#found = true;
    this.#signal = SILENT;
    return { fragment: this.fragment(), fresh: true };
  }

  /** The hunt as text: the signal so far, or that the echo is gone; nothing before the first scan. */
  remember(): string | undefined {
    if (this.#found) return JSON.stringify({ found: true });
    if (this.#signal > SILENT) return JSON.stringify({ signal: this.#signal });
    return undefined;
  }

  /** Only a hunt this reach could have written: a signal of 1 to 100, or the echo found (and the signal silent). */
  recall(memento: string): boolean {
    let data: unknown;
    try {
      data = JSON.parse(memento);
    } catch {
      return false;
    }
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return false;
    const { signal, found, ...rest } = data as Record<string, unknown>;
    if (Object.keys(rest).length > 0) return false;
    if (found === true && signal === undefined) {
      this.#found = true;
      this.#signal = SILENT;
      return true;
    }
    if (found !== undefined) return false;
    if (typeof signal !== 'number' || !Number.isInteger(signal) || signal <= SILENT || signal > LOCK)
      return false;
    this.#found = false;
    this.#signal = signal;
    return true;
  }
}
