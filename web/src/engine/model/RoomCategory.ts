import type { DoorInscription } from './DoorInscription.ts';
import type { Trace } from './Trace.ts';

/**
 * A kind of room — `Laboratory`, `Armory` … — one of the four a country's trait allows. Identity is its
 * name. A category may guarantee the words on the door of an apartment it is first in (Guide:223), and it
 * names the trace that door carries (Guide:204-217; RoomCategory.groovy:14-53).
 */
export class RoomCategory {
  readonly #name: string;
  readonly #guarantee: DoorInscription | undefined;
  readonly #trace: Trace;

  constructor(name: string, guarantee: DoorInscription | undefined, trace: Trace) {
    this.#name = name;
    this.#guarantee = guarantee;
    this.#trace = trace;
  }

  name(): string {
    return this.#name;
  }

  /** The inscription a door leading first to this kind of room carries when it carries one; nothing = any word. */
  guarantee(): DoorInscription | undefined {
    return this.#guarantee;
  }

  /** The sensory clue a door leading first to this kind of room gives to a scan. */
  trace(): Trace {
    return this.#trace;
  }

  equals(other: RoomCategory): boolean {
    return this.#name === other.#name;
  }
}
