/** The badge's divisor (Guide:245, SpectralFrequency.groovy:16). */
const RESONANCE = 11;
/** A matching culture adds a tenth (Guide:182-184, Gematria.groovy:29-31); the whole hertz are kept, never rounded up. */
const AMPLIFIED = { times: 11, over: 10 } as const;

/**
 * Owns one fact: a spectral frequency as a value — whole hertz, never negative — and what can be read off
 * it: what a merge sums to, what a matching culture amplifies it to, and whether it is resonant. Resonant
 * is "divides by 11" and never 0 Hz: the old game's Keystone at 0 Hz passed `% 11 == 0` and counted
 * (HK-023); here nothing at 0 resonates (Decision 7). Immutable.
 */
export class Frequency {
  readonly #hertz: number;

  constructor(hertz: number) {
    if (!Number.isInteger(hertz) || hertz < 0) {
      throw new RangeError(`a frequency is a whole number of hertz from zero up, got ${String(hertz)}`);
    }
    this.#hertz = hertz;
  }

  hertz(): number {
    return this.#hertz;
  }

  plus(other: Frequency): Frequency {
    return new Frequency(this.#hertz + other.#hertz);
  }

  /** The 10% of a capture in a room whose culture matches the street header's. */
  amplified(): Frequency {
    return new Frequency(Math.floor((this.#hertz * AMPLIFIED.times) / AMPLIFIED.over));
  }

  /** The green badge: divisible by eleven, and something rather than nothing. */
  resonant(): boolean {
    return this.#hertz > 0 && this.#hertz % RESONANCE === 0;
  }

  equals(other: Frequency): boolean {
    return this.#hertz === other.#hertz;
  }
}
