import type { DoorInscription } from './DoorInscription.ts';

/**
 * A kind of room — `Laboratory`, `Armory` … — one of the four a country's trait allows. Identity is its
 * name. A category may guarantee the words on the door of an apartment it is first in (Guide:223).
 */
export class RoomCategory {
  readonly #name: string;
  readonly #guarantee: DoorInscription | undefined;

  constructor(name: string, guarantee: DoorInscription | undefined) {
    this.#name = name;
    this.#guarantee = guarantee;
  }

  name(): string {
    return this.#name;
  }

  /** The inscription a door leading first to this kind of room carries when it carries one; nothing = any word. */
  guarantee(): DoorInscription | undefined {
    return this.#guarantee;
  }

  equals(other: RoomCategory): boolean {
    return this.#name === other.#name;
  }
}
