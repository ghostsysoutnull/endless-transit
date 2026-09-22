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
  readonly #told: { readonly material: string; readonly state: string };

  constructor(facts: {
    material: string;
    state: string;
    inscription: DoorInscription | undefined;
    /** The sentence each of the material and the state is told in (themes/doors, `name|narrative`). */
    told: { material: string; state: string };
  }) {
    this.#material = facts.material;
    this.#state = facts.state;
    this.#inscription = facts.inscription;
    this.#told = facts.told;
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

  /** The full appearance: the material's sentence, the state's, and how the words were applied (Door.groovy:79-92). */
  narrative(): string {
    const seen = `${this.#told.material} ${this.#told.state}`;
    return this.#inscription === undefined ? seen : `${seen} ${this.#inscription.narrative()}`;
  }

  /** The line on the door list: the inscription, if any, then the brief (Door.groovy:201-209). */
  description(): string {
    return this.#inscription === undefined
      ? this.brief()
      : `${this.#inscription.formatted()} ${this.brief()}`;
  }
}
