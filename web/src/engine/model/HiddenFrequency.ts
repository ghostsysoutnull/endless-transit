import type { Address } from './Address.ts';
import type { Fragment, FragmentData } from './Fragment.ts';
import type { Frequency } from './Frequency.ts';

export const HIDDEN_KIND = 'hidden';

/**
 * The free lottery's prize (Guide:186-190; Room.groovy:69-78): a fragment a room hands over on a move, worth
 * one to ten million hertz, fixed by the room and the step it was won on — so a save keeps only the room
 * and the step, and the reader asks the room to roll again. It never resonates: the badge is for culture
 * matches and merges (Guide:245-247). Immutable.
 */
export class HiddenFrequency implements Fragment {
  readonly #from: Address;
  readonly #steps: number;
  readonly #frequency: Frequency;

  constructor(facts: { from: Address; steps: number; frequency: Frequency }) {
    this.#from = facts.from;
    this.#steps = facts.steps;
    this.#frequency = facts.frequency;
  }

  key(): string {
    return `${HIDDEN_KIND}(${this.#from.toString()}@${String(this.#steps)})`;
  }

  name(): string {
    return 'Hidden Frequency';
  }

  frequency(): Frequency {
    return this.#frequency;
  }

  resonant(): boolean {
    return false;
  }

  data(): FragmentData {
    return { kind: HIDDEN_KIND, from: this.#from.toString(), steps: this.#steps };
  }
}
