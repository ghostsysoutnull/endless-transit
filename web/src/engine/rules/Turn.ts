/**
 * Owns one fact: what a command costs the traveller. Every prompt in the world drains Coherence, before the
 * command runs (Guide:133-135); only a move the game accepted counts as a step — a global command costs but
 * does not count (Guide:334-335, NavigationCommand.groovy:35). A command names its turn; the engine asks it.
 */
export class Turn {
  readonly #drains: boolean;
  readonly #counts: boolean;

  constructor(facts: { drains: boolean; counts: boolean }) {
    this.#drains = facts.drains;
    this.#counts = facts.counts;
  }

  drains(): boolean {
    return this.#drains;
  }

  counts(): boolean {
    return this.#counts;
  }
}

/** The title's own commands and the debug tools: outside the world, nothing is charged. */
export const FREE = new Turn({ drains: false, counts: false });
/** A global command (the title screen, the recap): costs one prompt, counts no step. */
export const GLOBAL = new Turn({ drains: true, counts: false });
/** A move the game accepted: costs one prompt and counts one step. */
export const STEP = new Turn({ drains: true, counts: true });
