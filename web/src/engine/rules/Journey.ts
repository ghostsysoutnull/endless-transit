import { Address } from '#engine/model/Address.ts';
import type { Location } from '#engine/model/Location.ts';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import type { LocationRegistry } from '#engine/procgen/LocationRegistry.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/**
 * Owns one fact: where the traveller stands — which world, which place in it, and the place to come back
 * to after a visit to the title screen. It changes only through moves that mean something (`begin`,
 * `enter`, `descend`, `move`, `leave`, `toTitle`); a move that cannot be made changes nothing and says so.
 * Every step lands where the chosen place receives travellers (`arrive`), so a corridor puts the traveller
 * on its floor and a door in the first room, and the place arrived at does what arriving does there (a
 * floor calls the elevator). What the places on the trail remember goes into the save.
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

  /** Whether entering the world continues from an earlier place rather than starting afresh. */
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

  /** Steps into the world: back where the traveller was, or where a new journey starts (a street, Guide:41). */
  enter(): boolean {
    if (this.#universe === undefined) return false;
    this.#here = this.#resumeAt ?? this.#universe.startOfJourney();
    this.#resumeAt = undefined;
    return true;
  }

  /** Into the place listed at `index` here — wherever it receives travellers. */
  descend(index: number): boolean {
    const chosen = this.#here?.listing()[index];
    if (chosen === undefined || chosen.sealed()) return false;
    this.#here = chosen.arrive();
    return true;
  }

  /** One of the moves the place offers (up, down, into the corridor, on to the next room …). */
  move(id: string): boolean {
    const to = this.#here?.move(id);
    if (to === undefined) return false;
    this.#here = to.arrive();
    return true;
  }

  /** Out of the place, the way it says: nothing happens when it has no way out. */
  leave(): boolean {
    if (this.#here?.exit() === undefined) return false;
    const to = this.#here.leave();
    if (to === undefined) return false;
    this.#here = to;
    return true;
  }

  toTitle(): boolean {
    if (this.#here === undefined) return false;
    this.#resumeAt = this.#here;
    this.#here = undefined;
    return true;
  }

  /** What a save must hold to come back here: seed + path + what the places on the path remember. */
  saved(): SavedGame | undefined {
    if (this.#seed === undefined) return undefined;
    const place = this.#here ?? this.#resumeAt;
    const states = new Map<string, string>();
    for (const step of place?.trail() ?? []) {
      const memento = step.remember();
      if (memento !== undefined) states.set(step.address().toString(), memento);
    }
    return new SavedGame(this.#seed, place?.address(), states);
  }

  /**
   * Rebuilds the journey a save describes — only a save this journey could have written: the path leads
   * to a place somebody stands in; every state belongs to a place on that path, and that place takes it
   * back and would write it again; and every step of the path is one the place above admits in the state
   * just recalled (no room below a floor at its elevator, no floor the elevator is not at). Anything else
   * is a corrupt save: nothing is restored, and `saved()` after a restore is the save itself.
   */
  restore(saved: SavedGame): boolean {
    const universe = this.#registry.universe(saved.seed());
    const address = saved.address();
    const place = address === undefined ? undefined : universe.descendant(address);
    if (address !== undefined) {
      if (place === undefined) return false;
      if (place.arrival() !== place) return false;
    }
    const trail = place?.trail() ?? [];
    for (const [text, memento] of saved.states()) {
      const owner = Address.parse(text);
      const keeper = owner === undefined ? undefined : universe.descendant(owner);
      if (keeper === undefined || !trail.includes(keeper)) return false;
      if (!keeper.recall(memento) || keeper.remember() !== memento) return false;
    }
    for (const [step, above] of trail.entries()) {
      const below = trail[step + 1];
      if (below !== undefined && !above.admits(below)) return false;
    }
    this.#seed = saved.seed();
    this.#universe = universe;
    this.#here = place;
    this.#resumeAt = undefined;
    return true;
  }
}
