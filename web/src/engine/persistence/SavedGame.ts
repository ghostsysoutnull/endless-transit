import { Seed } from '#engine/rng/Seed.ts';

const VERSION = 1;

/** Owns one fact: the save format — versioned plain JSON. Today it carries the world's seed. */
export class SavedGame {
  readonly #seed: Seed;

  constructor(seed: Seed) {
    this.#seed = seed;
  }

  /** Static because it is the factory for the text `toText` writes. Anything unreadable is "no save". */
  static parse(text: string | undefined): SavedGame | undefined {
    if (text === undefined) return undefined;
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      return undefined;
    }
    if (typeof data !== 'object' || data === null) return undefined;
    const { version, seed } = data as { version?: unknown; seed?: unknown };
    if (version !== VERSION || typeof seed !== 'string') return undefined;
    const parsed = Seed.parse(seed);
    return parsed === undefined ? undefined : new SavedGame(parsed);
  }

  seed(): Seed {
    return this.#seed;
  }

  toText(): string {
    return JSON.stringify({ version: VERSION, seed: this.#seed.toString() });
  }
}
