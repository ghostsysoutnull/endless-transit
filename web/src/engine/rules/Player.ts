import type { Capture } from '#engine/model/Capture.ts';
import type { Fragment } from '#engine/model/Fragment.ts';
import type { Hybrid } from '#engine/model/Hybrid.ts';
import type { Location } from '#engine/model/Location.ts';
import { Buffer } from './Buffer.ts';
import { Coherence } from './Coherence.ts';

/** What every merge gives back (Guide:141-142, QuantumBufferController.groovy:44). */
const MERGE_RESTORES = 15;

/** What a traveller is brought back from: a save's facts about them. */
export interface PlayerFacts {
  readonly coherence: number;
  readonly steps: number;
  /** The addresses of every place visited, in the order first walked. */
  readonly visited: readonly string[];
  /** The buffer, in order. */
  readonly buffer: readonly Fragment[];
  /** The resonance tally. */
  readonly resonant: number;
}

/**
 * The traveller (Player.groovy:15-48): their coherence, the steps they have taken, the path they have
 * walked — every place visited, by address, in the order first walked — their buffer and their resonance
 * tally. Behaviour with its data: a drain takes, a restore gives back, a footprint marks the place and
 * every ancestor on the way (Guide:430), a capture fills the buffer, a merge empties it by one and gives
 * fifteen back (Guide:141), and a reboot keeps everything but the coherence (Guide:145-146). The tally
 * counts a fresh resonant capture and a resonant merge, each once — a dropped fragment taken back is not
 * fresh (Decision 7: the old game counted it again, Room.groovy:227). The Player never reaches into the
 * world: it is handed the place it stands in and what a room handed over.
 */
export class Player {
  #coherence: Coherence;
  #steps: number;
  readonly #footprints: string[];
  readonly #seen: Set<string>;
  readonly #buffer: Buffer;
  #resonant: number;

  constructor(
    facts: PlayerFacts = {
      coherence: new Coherence().value(),
      steps: 0,
      visited: [],
      buffer: [],
      resonant: 0,
    },
  ) {
    this.#coherence = new Coherence(facts.coherence);
    this.#steps = facts.steps;
    this.#footprints = [...facts.visited];
    this.#seen = new Set(this.#footprints);
    this.#buffer = new Buffer(facts.buffer);
    this.#resonant = facts.resonant;
  }

  buffer(): Buffer {
    return this.#buffer;
  }

  /** The resonance tally (Guide:245-248): fresh resonant captures and resonant merges, each once. */
  resonantTraces(): number {
    return this.#resonant;
  }

  /** What a room handed over goes into the buffer; a fresh resonant capture counts. False, counting nothing, when the buffer is full. */
  capture(capture: Capture): boolean {
    if (!this.#buffer.add(capture.fragment)) return false;
    if (capture.fresh && capture.fragment.resonant()) this.#resonant += 1;
    return true;
  }

  /** Two fragments of the buffer into their hybrid: fifteen coherence back, and a count when it resonates; nothing for a merge the buffer refuses (HK-015). */
  merge(first: number, second: number): Hybrid | undefined {
    const hybrid = this.#buffer.merge(first, second);
    if (hybrid === undefined) return undefined;
    this.restore(MERGE_RESTORES);
    if (hybrid.resonant()) this.#resonant += 1;
    return hybrid;
  }

  /** The fragment at `index`, out of the buffer, to be laid down somewhere; nothing at a position nobody holds. */
  drop(index: number): Fragment | undefined {
    return this.#buffer.take(index);
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

  /** Coherence given back — the one event for every source of it (a merge; the reboot). */
  restore(amount: number): void {
    this.#coherence = this.#coherence.restored(amount);
  }

  /** The debug INTEGRITY (Guide:441, SetIntegrityCommand.groovy:19): coherence set to a value outright. */
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

  /** What zero does to the traveller (Guide:144-146, TurnProcessor.groovy:99): coherence back in full, the rest — steps, footprints, the buffer, the tally — kept. */
  reboot(): void {
    this.#coherence = new Coherence();
  }
}
