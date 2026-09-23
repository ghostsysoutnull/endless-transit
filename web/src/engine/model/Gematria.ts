import { Frequency } from './Frequency.ts';

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
const ALPHABET_START = 'a'.charCodeAt(0);
/** The master numbers: a sum that is one of these is doubled before the depth (Gematria.groovy:22-26). */
const MASTER = new Set([11, 22, 33]);

/**
 * Owns one fact: what a name adds up to (Guide:180-185, Gematria.groovy:11-33) — the alphabet positions of
 * its consonants, vowels nothing, anything that is not a letter nothing — and the frequency that gives an
 * object at a depth: the sum, doubled when it is a master number, times the depth. Pure: the old game's
 * printed warning is gone (study §2.2). A value: two names with the same letters add up the same.
 */
export class Gematria {
  readonly #sum: number;

  constructor(name: string) {
    let sum = 0;
    for (const letter of name.toLowerCase()) {
      if (letter < 'a' || letter > 'z' || VOWELS.has(letter)) continue;
      sum += letter.charCodeAt(0) - ALPHABET_START + 1;
    }
    this.#sum = sum;
  }

  sum(): number {
    return this.#sum;
  }

  master(): boolean {
    return MASTER.has(this.#sum);
  }

  /** The frequency of an object with this name lying at `depth` (a room's is 12). */
  frequencyAt(depth: number): Frequency {
    return new Frequency((this.master() ? this.#sum * 2 : this.#sum) * depth);
  }
}
