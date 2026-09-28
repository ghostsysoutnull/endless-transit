import type { DoorStateLook } from './DoorStateLook.ts';
import type { MaterialFamily } from './MaterialFamily.ts';

/**
 * How a door looks: its material and its state by their names on their lists (`Heavy Bulkhead`, `Frozen`), and the
 * keys a picture draws them by — the material's family and the state's look (their lists' key column). Value object.
 */
export class DoorLook {
  readonly #material: string;
  readonly #state: string;
  readonly #family: MaterialFamily;
  readonly #stateLook: DoorStateLook;

  constructor(facts: { material: string; state: string; family: MaterialFamily; stateLook: DoorStateLook }) {
    this.#material = facts.material;
    this.#state = facts.state;
    this.#family = facts.family;
    this.#stateLook = facts.stateLook;
  }

  /** The material's name on its list: `Heavy Bulkhead`. */
  material(): string {
    return this.#material;
  }

  /** The state's name on its list: `Frozen`. */
  state(): string {
    return this.#state;
  }

  /** The key a picture draws the material by. */
  family(): MaterialFamily {
    return this.#family;
  }

  /** The key a picture draws the state by. */
  stateLook(): DoorStateLook {
    return this.#stateLook;
  }

  equals(other: DoorLook): boolean {
    return (
      this.#material === other.#material &&
      this.#state === other.#state &&
      this.#family === other.#family &&
      this.#stateLook === other.#stateLook
    );
  }
}
