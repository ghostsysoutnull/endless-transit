import { Address } from '#engine/model/Address.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { Coherence } from '#engine/rules/Coherence.ts';

const VERSION = 4;

/** What a save is made of; a drawn-but-not-entered world has only its seed. */
export interface SavedFacts {
  readonly seed: Seed;
  readonly address?: Address | undefined;
  /** What the visited places remember of their own state, by address. */
  readonly states?: ReadonlyMap<string, string>;
  readonly coherence?: number;
  readonly steps?: number;
  /** The addresses of every place visited, in the order first walked. */
  readonly visited?: readonly string[];
}

/**
 * Owns one fact: the save format — versioned plain JSON carrying the world's seed, the path of the place the
 * traveller stands in (`null` while a world is drawn but not entered), what the visited places remember of
 * their own state by address (a floor in corridor mode, a building's elevator floor; a room's taken relics
 * in I06 — every per-place fact has its home here), and the traveller: coherence, steps, the visited path
 * (Guide:364-366). The world itself is never stored: seed + path rebuild it. Another version is "no save"
 * — there is nobody to migrate for. What the text says is checked for shape here; whether the world could
 * have written it is the journey's question.
 */
export class SavedGame {
  readonly #seed: Seed;
  readonly #address: Address | undefined;
  readonly #states: ReadonlyMap<string, string>;
  readonly #coherence: number;
  readonly #steps: number;
  readonly #visited: readonly string[];

  constructor(facts: SavedFacts) {
    this.#seed = facts.seed;
    this.#address = facts.address;
    this.#states = new Map(facts.states ?? []);
    this.#coherence = facts.coherence ?? new Coherence().value();
    this.#steps = facts.steps ?? 0;
    this.#visited = [...(facts.visited ?? [])];
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
    const { version, seed, path, states, coherence, steps, visited } = data as Record<string, unknown>;
    if (version !== VERSION || typeof seed !== 'string') return undefined;
    const parsedSeed = Seed.parse(seed);
    const parsedStates = SavedGame.#statesOf(states);
    const parsedVisited = SavedGame.#visitedOf(visited);
    if (parsedSeed === undefined || parsedStates === undefined || parsedVisited === undefined)
      return undefined;
    if (!SavedGame.#isCoherence(coherence) || !SavedGame.#isCount(steps)) return undefined;
    const address = typeof path === 'string' ? Address.parse(path) : undefined;
    if (path !== null && address === undefined) return undefined;
    const fresh = new Coherence().value();
    if (
      address === undefined &&
      (coherence !== fresh || steps !== 0 || parsedVisited.length !== 0 || parsedStates.size !== 0)
    ) {
      return undefined;
    }
    return new SavedGame({
      seed: parsedSeed,
      address,
      states: parsedStates,
      coherence,
      steps,
      visited: parsedVisited,
    });
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

  /** Part of `parse`: a list of distinct addresses; anything else is no save. */
  static #visitedOf(visited: unknown): readonly string[] | undefined {
    if (!Array.isArray(visited)) return undefined;
    const addresses: string[] = [];
    for (const each of visited as unknown[]) {
      if (typeof each !== 'string' || Address.parse(each) === undefined) return undefined;
      addresses.push(each);
    }
    return new Set(addresses).size === addresses.length ? addresses : undefined;
  }

  static #isCoherence(value: unknown): value is number {
    if (typeof value !== 'number') return false;
    try {
      new Coherence(value);
      return true;
    } catch {
      return false;
    }
  }

  static #isCount(value: unknown): value is number {
    return typeof value === 'number' && Number.isInteger(value) && value >= 0;
  }

  seed(): Seed {
    return this.#seed;
  }

  /** Where the traveller stands; nothing while the world has not been entered. */
  address(): Address | undefined {
    return this.#address;
  }

  /** What the visited places remember, by address. */
  states(): ReadonlyMap<string, string> {
    return this.#states;
  }

  coherence(): number {
    return this.#coherence;
  }

  steps(): number {
    return this.#steps;
  }

  /** Every place visited, by address, in the order first walked. */
  visited(): readonly string[] {
    return this.#visited;
  }

  toText(): string {
    return JSON.stringify({
      version: VERSION,
      seed: this.#seed.toString(),
      path: this.#address?.toString() ?? null,
      states: Object.fromEntries(this.#states),
      coherence: this.#coherence,
      steps: this.#steps,
      visited: this.#visited,
    });
  }
}
