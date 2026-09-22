import { Address } from '#engine/model/Address.ts';
import { Seed } from '#engine/rng/Seed.ts';

const VERSION = 2;

/**
 * Owns one fact: the save format — versioned plain JSON carrying the world's seed and the path of the place
 * the traveller stands in (`null` while a world is drawn but not entered). The world itself is never
 * stored: seed + path rebuild it. Another version is "no save" — there is nobody to migrate for.
 */
export class SavedGame {
  readonly #seed: Seed;
  readonly #address: Address | undefined;

  constructor(seed: Seed, address?: Address) {
    this.#seed = seed;
    this.#address = address;
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
    const { version, seed, path } = data as { version?: unknown; seed?: unknown; path?: unknown };
    if (version !== VERSION || typeof seed !== 'string') return undefined;
    const parsedSeed = Seed.parse(seed);
    if (parsedSeed === undefined) return undefined;
    if (path === null) return new SavedGame(parsedSeed);
    const address = typeof path === 'string' ? Address.parse(path) : undefined;
    return address === undefined ? undefined : new SavedGame(parsedSeed, address);
  }

  seed(): Seed {
    return this.#seed;
  }

  /** Where the traveller stands; nothing while the world has not been entered. */
  address(): Address | undefined {
    return this.#address;
  }

  toText(): string {
    return JSON.stringify({
      version: VERSION,
      seed: this.#seed.toString(),
      path: this.#address?.toString() ?? null,
    });
  }
}
