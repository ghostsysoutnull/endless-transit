import type { DoorInscription } from './DoorInscription.ts';
import type { DoorLook } from './DoorLook.ts';
import type { Trace } from './Trace.ts';

const STABLE = 'Stable';

/**
 * A door on a corridor: what it is made of, the state it is in, the words on it if any, and the trace it
 * carries. Value object. Only the inscription tells the player anything on the list (Guide:199-201);
 * material and state are decoration; the trace shows only to a scan (Guide:203-204).
 */
export class Door {
  readonly #look: DoorLook;
  readonly #inscription: DoorInscription | undefined;
  readonly #trace: Trace;
  readonly #told: { readonly material: string; readonly state: string };

  constructor(facts: {
    /** Its material and state, by name and by the keys a picture draws them by. */
    look: DoorLook;
    inscription: DoorInscription | undefined;
    trace: Trace;
    /** The sentence each of the material and the state is told in (themes/doors, `name|narrative|key`). */
    told: { material: string; state: string };
  }) {
    this.#look = facts.look;
    this.#inscription = facts.inscription;
    this.#trace = facts.trace;
    this.#told = facts.told;
  }

  material(): string {
    return this.#look.material();
  }

  state(): string {
    return this.#look.state();
  }

  /** How it looks on a picture (U02). */
  look(): DoorLook {
    return this.#look;
  }

  inscription(): DoorInscription | undefined {
    return this.#inscription;
  }

  /** The sensory clue about the first room behind (Guide:204): decided by that room's kind, so it never lies. */
  trace(): Trace {
    return this.#trace;
  }

  /** Whether it is in the stable state — asked by its name, which HK-027 records. */
  stable(): boolean {
    return this.state() === STABLE;
  }

  /** Its state as a word in a line: `cold`. */
  stateWord(): string {
    return this.state().toLowerCase();
  }

  /** `Heavy Bulkhead, cold`; a stable door is just its material (DoorAppearance.groovy:22-27, in plain words, U03b). */
  brief(): string {
    return this.stable() ? this.material() : `${this.material()}, ${this.stateWord()}`;
  }

  /** The full appearance: the material's sentence, the state's, and how the words were applied (Door.groovy:79-92). */
  narrative(): string {
    const seen = `${this.#told.material} ${this.#told.state}`;
    return this.#inscription === undefined ? seen : `${seen} ${this.#inscription.narrative()}`;
  }

  /** What a scan senses at the door: the appearance, then the trace, then the words (Door.groovy:79-92). */
  sensed(): string {
    const seen = `${this.#told.material} ${this.#told.state} ${this.#trace.sentence()}`;
    return this.#inscription === undefined ? seen : `${seen} ${this.#inscription.narrative()}`;
  }

  /**
   * The door's name on the door list (Door.groovy:62-70): its brief. Its words are not part of it (U03b): they are
   * drawn on the door and told in its appearance.
   */
  description(): string {
    return this.brief();
  }
}
