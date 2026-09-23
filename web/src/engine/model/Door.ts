import type { DoorInscription } from './DoorInscription.ts';
import type { Trace } from './Trace.ts';

const STABLE = 'Stable';

/**
 * A door on a corridor: what it is made of, the state it is in, the words on it if any, and the trace it
 * carries. Value object. Only the inscription tells the player anything on the list (Guide:199-201);
 * material and state are decoration; the trace shows only to a scan (Guide:203-204).
 */
export class Door {
  readonly #material: string;
  readonly #state: string;
  readonly #inscription: DoorInscription | undefined;
  readonly #trace: Trace;
  readonly #told: { readonly material: string; readonly state: string };

  constructor(facts: {
    material: string;
    state: string;
    inscription: DoorInscription | undefined;
    trace: Trace;
    /** The sentence each of the material and the state is told in (themes/doors, `name|narrative`). */
    told: { material: string; state: string };
  }) {
    this.#material = facts.material;
    this.#state = facts.state;
    this.#inscription = facts.inscription;
    this.#trace = facts.trace;
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

  /** The sensory clue about the first room behind (Guide:204): decided by that room's kind, so it never lies. */
  trace(): Trace {
    return this.#trace;
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

  /** What a scan senses at the door: the appearance, then the trace, then the words (Door.groovy:240-253). */
  sensed(): string {
    const seen = `${this.#told.material} ${this.#told.state} ${this.#trace.sentence()}`;
    return this.#inscription === undefined ? seen : `${seen} ${this.#inscription.narrative()}`;
  }

  /** The line on the door list: the inscription, if any, then the brief (Door.groovy:62-70). */
  description(): string {
    return this.#inscription === undefined
      ? this.brief()
      : `${this.#inscription.formatted()} ${this.brief()}`;
  }
}
