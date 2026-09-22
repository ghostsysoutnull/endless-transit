import type { Location } from '#engine/model/Location.ts';
import { Coherence } from './Coherence.ts';

/** What a traveller is brought back from: a save's facts about them. */
export interface PlayerFacts {
  readonly coherence: number;
  readonly steps: number;
  /** The addresses of every place visited, in the order first walked. */
  readonly visited: readonly string[];
}

/**
 * The traveller (Player.groovy:15-48): their coherence, the steps they have taken, and the path they have
 * walked — every place visited, by address, in the order first walked. Behaviour with its data: a drain
 * takes, a restore gives back (the I06 merge and the reboot are both restores), a footprint marks the place
 * and every ancestor on the way (Guide:430), and a reboot keeps the steps and the footprints (Guide:145-146).
 * The Player never reaches into the world: it is handed the place it stands in.
 */
export class Player {
  #coherence: Coherence;
  #steps: number;
  readonly #footprints: string[];
  readonly #seen: Set<string>;

  constructor(facts: PlayerFacts = { coherence: new Coherence().value(), steps: 0, visited: [] }) {
    this.#coherence = new Coherence(facts.coherence);
    this.#steps = facts.steps;
    this.#footprints = [...facts.visited];
    this.#seen = new Set(this.#footprints);
  }

  coherence(): Coherence {
    return this.#coherence;
  }

  steps(): number {
    return this.#steps;
  }

  drain(amount: number): void {
    this.#coherence = this.#coherence.drained(amount);
  }

  /** Coherence given back — the one engine event for every source of it (a merge, I06; the reboot). */
  restore(amount: number): void {
    this.#coherence = this.#coherence.restored(amount);
  }

  /** The debug INTEGRITY (Guide:441, SetIntegrityCommand.groovy:76): coherence set to a value outright. */
  setCoherence(value: number): void {
    this.#coherence = new Coherence(value);
  }

  /** One menu choice the game accepted (Guide:334, NavigationCommand.groovy:35). */
  count(): void {
    this.#steps += 1;
  }

  /** The place and every ancestor on the way are now visited; a place already visited stays where it was on the path. */
  markFootprint(place: Location): void {
    for (const step of place.trail()) {
      const address = step.address().toString();
      if (this.#seen.has(address)) continue;
      this.#seen.add(address);
      this.#footprints.push(address);
    }
  }

  visited(place: Location): boolean {
    return this.#seen.has(place.address().toString());
  }

  /** Every place visited, by address, in the order first walked. */
  footprints(): readonly string[] {
    return this.#footprints;
  }

  placesVisited(): number {
    return this.#footprints.length;
  }

  /** What zero does to the traveller (Guide:144-146, TurnProcessor.groovy:99): coherence back in full, the rest kept. */
  reboot(): void {
    this.#coherence = new Coherence();
  }
}
