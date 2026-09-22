import type { DoorInscription } from './DoorInscription.ts';

const STABLE = 'Stable';

/**
 * A door on a corridor: what it is made of, the state it is in, and the words on it if any. Value object.
 * Only the inscription tells the player anything (Guide:199-201); material and state are decoration.
 */
export class Door {
  readonly #material: string;
  readonly #state: string;
  readonly #inscription: DoorInscription | undefined;

  constructor(facts: { material: string; state: string; inscription: DoorInscription | undefined }) {
    this.#material = facts.material;
    this.#state = facts.state;
    this.#inscription = facts.inscription;
  }

  material(): string {
    return this.#material;
  }

  state(): string {
    return this.#state;
  }

  inscription(): DoorInscription | undefined {
    return this.#inscription;
  }

  /** `Heavy Bulkhead [COLD]`; a stable door is just its material (DoorAppearance.groovy:22-27). */
  brief(): string {
    return this.#state === STABLE ? this.#material : `${this.#material} [${this.#state.toUpperCase()}]`;
  }

  /** The line on the door list: the inscription, if any, then the brief (Door.groovy:201-209). */
  description(): string {
    return this.#inscription === undefined
      ? this.brief()
      : `${this.#inscription.formatted()} ${this.brief()}`;
  }
}
