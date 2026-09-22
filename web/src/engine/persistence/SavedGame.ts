import { Address } from '#engine/model/Address.ts';
import { Seed } from '#engine/rng/Seed.ts';

const VERSION = 3;

/**
 * Owns one fact: the save format — versioned plain JSON carrying the world's seed, the path of the place
 * the traveller stands in (`null` while a world is drawn but not entered), and what the places on the way
 * remember of their own state, by address (a floor in corridor mode). The world itself is never stored:
 * seed + path rebuild it. Another version is "no save" — there is nobody to migrate for.
 */
export class SavedGame {
  readonly #seed: Seed;
  readonly #address: Address | undefined;
  readonly #states: ReadonlyMap<string, string>;

  constructor(seed: Seed, address?: Address, states: ReadonlyMap<string, string> = new Map()) {
    this.#seed = seed;
    this.#address = address;
    this.#states = new Map(states);
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
    const { version, seed, path, states } = data as {
      version?: unknown;
      seed?: unknown;
      path?: unknown;
      states?: unknown;
    };
    if (version !== VERSION || typeof seed !== 'string') return undefined;
    const parsedSeed = Seed.parse(seed);
    const parsedStates = SavedGame.#statesOf(states);
    if (parsedSeed === undefined || parsedStates === undefined) return undefined;
    if (path === null) return new SavedGame(parsedSeed, undefined, parsedStates);
    const address = typeof path === 'string' ? Address.parse(path) : undefined;
    return address === undefined ? undefined : new SavedGame(parsedSeed, address, parsedStates);
  }

  /** Part of the `parse` factory (static for the same reason): a plain object of address → memento text; anything else is no save. */
  static #statesOf(states: unknown): ReadonlyMap<string, string> | undefined {
    if (typeof states !== 'object' || states === null || Array.isArray(states)) return undefined;
    const entries = Object.entries(states as Record<string, unknown>);
    const parsed = new Map<string, string>();
    for (const [address, memento] of entries) {
      if (Address.parse(address) === undefined || typeof memento !== 'string') return undefined;
      parsed.set(address, memento);
    }
    return parsed;
  }

  seed(): Seed {
    return this.#seed;
  }

  /** Where the traveller stands; nothing while the world has not been entered. */
  address(): Address | undefined {
    return this.#address;
  }

  /** What the places on the path remember, by address. */
  states(): ReadonlyMap<string, string> {
    return this.#states;
  }

  toText(): string {
    return JSON.stringify({
      version: VERSION,
      seed: this.#seed.toString(),
      path: this.#address?.toString() ?? null,
      states: Object.fromEntries(this.#states),
    });
  }
}
