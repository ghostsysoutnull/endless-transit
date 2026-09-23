import { Address } from '#engine/model/Address.ts';
import type { Fragment } from '#engine/model/Fragment.ts';
import { FragmentReader } from '#engine/model/FragmentReader.ts';
import type { Hybrid } from '#engine/model/Hybrid.ts';
import type { Location } from '#engine/model/Location.ts';
import { SavedGame } from '#engine/persistence/SavedGame.ts';
import type { LocationRegistry } from '#engine/procgen/LocationRegistry.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import { Player } from './Player.ts';

/** Reads a save's buffer back through the world (stateless). */
const READER = new FragmentReader();

/**
 * Owns one fact: where the traveller stands — which world, which place in it, the place to come back to
 * after a visit to the title screen — and the traveller's own record of the walk (the `Player`: coherence,
 * steps, the visited path, the buffer). It changes only through moves that mean something (`begin`, `enter`,
 * `descend`, `move`, `leave`, `toTitle`, `reboot`, `capture`, `drop`, `merge`); a move that cannot be made
 * changes nothing and says so. Every step lands where the chosen place receives travellers (`arrive`), so
 * a corridor puts the traveller on its floor and a door in the first room, the place arrived at does what
 * arriving does there (a floor calls the elevator), and the landing leaves a footprint. A capture is one
 * transaction between the place and the buffer: the place hands over only what the buffer takes. What the
 * visited places remember goes into the save with the traveller.
 */
export class Journey {
  readonly #registry: LocationRegistry;
  #seed: Seed | undefined;
  #universe: Location | undefined;
  #here: Location | undefined;
  #resumeAt: Location | undefined;
  #player = new Player();

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

  /** The traveller of this world: a new one with every new world, kept through a reboot. */
  player(): Player {
    return this.#player;
  }

  /** Whether entering the world continues from an earlier place rather than starting afresh. */
  resumes(): boolean {
    return this.#resumeAt !== undefined;
  }

  /** A new world: drawn, not entered, no place remembered from the old one, and a new traveller. */
  begin(seed: Seed): void {
    this.#seed = seed;
    this.#universe = this.#registry.universe(seed);
    this.#here = undefined;
    this.#resumeAt = undefined;
    this.#player = new Player();
  }

  /** Steps into the world: back where the traveller was, or where a new journey starts (a street, Guide:41). */
  enter(): boolean {
    if (this.#universe === undefined) return false;
    this.#land(this.#resumeAt ?? this.#universe.startOfJourney());
    this.#resumeAt = undefined;
    return true;
  }

  /** Into the place listed at `index` here — wherever it receives travellers. */
  descend(index: number): boolean {
    const chosen = this.#here?.listing()[index];
    if (chosen === undefined || chosen.sealed()) return false;
    this.#land(chosen.arrive());
    return true;
  }

  /** One of the moves the place offers (up, down, into the corridor, on to the next room …). */
  move(id: string): boolean {
    const to = this.#here?.move(id);
    if (to === undefined) return false;
    this.#land(to.arrive());
    return true;
  }

  /** Out of the place, the way it says: nothing happens when it has no way out. */
  leave(): boolean {
    if (this.#here?.exit() === undefined) return false;
    const to = this.#here.leave();
    if (to === undefined) return false;
    this.#land(to);
    return true;
  }

  toTitle(): boolean {
    if (this.#here === undefined) return false;
    this.#resumeAt = this.#here;
    this.#here = undefined;
    return true;
  }

  /** What lies here at `index`, into the buffer (Guide:120); nothing — and the place untouched — when the buffer is full or nothing lies there. */
  capture(index: number): Fragment | undefined {
    if (this.#here === undefined || this.#player.buffer().full()) return undefined;
    const capture = this.#here.capture(index);
    if (capture === undefined) return undefined;
    this.#player.capture(capture);
    return capture.fragment;
  }

  /** The buffer's fragment at `index`, laid down where the traveller stands (Guide:120-121); nothing when this place takes nothing in or nobody holds that position. */
  drop(index: number): Fragment | undefined {
    if (this.#here?.contents() === null || this.#here === undefined) return undefined;
    const fragment = this.#player.buffer().fragments()[index];
    if (fragment === undefined || !this.#here.drop(fragment)) return undefined;
    return this.#player.drop(index);
  }

  /** Two fragments of the buffer merged into their hybrid, with what a merge gives (Guide:141, 241-243); nothing for a merge the buffer refuses. */
  merge(first: number, second: number): Hybrid | undefined {
    return this.#player.merge(first, second);
  }

  /**
   * What zero coherence does (Guide:144-147, TurnProcessor.groovy:94-100): the world is rebuilt from the
   * same seed — everything that lived inside it is undone — and the traveller stands on the starting street
   * again with full coherence, keeping the steps and the visited path.
   */
  reboot(): boolean {
    if (this.#seed === undefined) return false;
    this.#universe = this.#registry.universe(this.#seed);
    this.#resumeAt = undefined;
    this.#player.reboot();
    this.#land(this.#universe.startOfJourney());
    return true;
  }

  /** What a save must hold to come back here: seed + path + what the visited places remember + the traveller. */
  saved(): SavedGame | undefined {
    if (this.#seed === undefined) return undefined;
    const place = this.#here ?? this.#resumeAt;
    return new SavedGame({
      seed: this.#seed,
      address: place?.address(),
      states: this.#statesOf(this.#player.footprints()),
      coherence: this.#player.coherence().value(),
      steps: this.#player.steps(),
      visited: this.#player.footprints(),
      buffer: this.#player
        .buffer()
        .fragments()
        .map((fragment) => fragment.data()),
      resonant: this.#player.resonantTraces(),
    });
  }

  /**
   * Rebuilds the journey a save describes — only a save this journey could have written: the path leads
   * to a place somebody stands in; the visited path is one a traveller could have walked (every address
   * is a place, each one's parent walked before it) and holds the whole trail; every state belongs to a
   * visited place, and that place takes it back and would write it again; every step of the path is one
   * the place above admits in the state just recalled (no room below a floor at its elevator, no floor the
   * elevator is not at); and every fragment of the buffer is one the world reads back (a relic from the
   * room that dealt it, a hybrid from its parts) and the buffer holds them all. Anything else is a corrupt
   * save: nothing is restored, and `saved()` after a restore is the save itself.
   */
  restore(saved: SavedGame): boolean {
    const universe = this.#registry.universe(saved.seed());
    const address = saved.address();
    const place = address === undefined ? undefined : universe.descendant(address);
    if (address !== undefined) {
      if (place === undefined) return false;
      if (place.arrival() !== place) return false;
    }
    const visited = new Set<string>();
    for (const text of saved.visited()) {
      const each = Address.parse(text);
      if (each === undefined || universe.descendant(each) === undefined) return false;
      const parent = each.parent();
      if (parent !== undefined && !visited.has(parent.toString())) return false;
      visited.add(text);
    }
    const trail = place?.trail() ?? [];
    if (trail.some((step) => !visited.has(step.address().toString()))) return false;
    for (const [text, memento] of saved.states()) {
      const owner = Address.parse(text);
      const keeper = owner === undefined || !visited.has(text) ? undefined : universe.descendant(owner);
      if (keeper === undefined) return false;
      if (!keeper.recall(memento) || keeper.remember() !== memento) return false;
    }
    for (const [step, above] of trail.entries()) {
      const below = trail[step + 1];
      if (below !== undefined && !above.admits(below)) return false;
    }
    const buffer = READER.readAll(saved.buffer(), universe);
    if (buffer === undefined || buffer.length > this.#player.buffer().capacity()) return false;
    this.#seed = saved.seed();
    this.#universe = universe;
    this.#here = place;
    this.#resumeAt = undefined;
    this.#player = new Player({
      coherence: saved.coherence(),
      steps: saved.steps(),
      visited: saved.visited(),
      buffer,
      resonant: saved.resonant(),
    });
    return true;
  }

  /** Where a step lands: the traveller stands there and has been there. */
  #land(place: Location): void {
    this.#here = place;
    this.#player.markFootprint(place);
  }

  /** What the places at these addresses remember of their own state, in this order — only those that remember something. */
  #statesOf(addresses: readonly string[]): ReadonlyMap<string, string> {
    const states = new Map<string, string>();
    for (const text of addresses) {
      const address = Address.parse(text);
      const memento = address === undefined ? undefined : this.#universe?.descendant(address)?.remember();
      if (memento !== undefined) states.set(text, memento);
    }
    return states;
  }
}
