import type { Location } from '#engine/model/Location.ts';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import type { LocationRegistry } from '#engine/procgen/LocationRegistry.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/**
 * Owns one fact: where the traveller stands — which world, which place in it, and the place to come back
 * to after a visit to the title screen. It changes only through moves that mean something (`begin`,
 * `enter`, `descend`, `ascend`, `toTitle`); a move that cannot be made changes nothing and says so.
 */
export class Journey {
  readonly #registry: LocationRegistry;
  #seed: Seed | undefined;
  #universe: Location | undefined;
  #here: Location | undefined;
  #resumeAt: Location | undefined;

  constructor(registry: LocationRegistry) {
    this.#registry = registry;
  }

  world(): Seed | undefined {
    return this.#seed;
  }

  /** The root of the current world; nothing before a world is drawn. */
  universe(): Location | undefined {
    return this.#universe;
  }

  /** The place the traveller stands in; nothing while at the title screen. */
  here(): Location | undefined {
    return this.#here;
  }

  /** Whether entering the world continues from an earlier place rather than starting at the universe. */
  resumes(): boolean {
    return this.#resumeAt !== undefined;
  }

  /** A new world: drawn, not entered, and no place remembered from the old one. */
  begin(seed: Seed): void {
    this.#seed = seed;
    this.#universe = this.#registry.universe(seed);
    this.#here = undefined;
    this.#resumeAt = undefined;
  }

  /** Steps into the world: back where the traveller was, or at the universe the first time. */
  enter(): boolean {
    if (this.#universe === undefined) return false;
    this.#here = this.#resumeAt ?? this.#universe;
    this.#resumeAt = undefined;
    return true;
  }

  descend(index: number): boolean {
    const child = this.#here?.children()[index];
    if (child === undefined || child.sealed()) return false;
    this.#here = child;
    return true;
  }

  ascend(): boolean {
    const parent = this.#here?.parent();
    if (parent === undefined) return false;
    this.#here = parent;
    return true;
  }

  toTitle(): boolean {
    if (this.#here === undefined) return false;
    this.#resumeAt = this.#here;
    this.#here = undefined;
    return true;
  }

  /** What a save must hold to come back here: seed + path. Nothing before a world is drawn. */
  saved(): SavedGame | undefined {
    if (this.#seed === undefined) return undefined;
    return new SavedGame(this.#seed, (this.#here ?? this.#resumeAt)?.address());
  }

  /** Rebuilds the journey a save describes. A path that leads nowhere is a corrupt save: nothing is restored. */
  restore(saved: SavedGame): boolean {
    const universe = this.#registry.universe(saved.seed());
    const address = saved.address();
    const place = address === undefined ? undefined : universe.descendant(address);
    if (address !== undefined && place === undefined) return false;
    this.#seed = saved.seed();
    this.#universe = universe;
    this.#here = place;
    this.#resumeAt = undefined;
    return true;
  }
}
