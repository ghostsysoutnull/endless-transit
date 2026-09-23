import type { Address } from './Address.ts';
import type { Fragment, FragmentData } from './Fragment.ts';
import { Frequency } from './Frequency.ts';

export const KEYSTONE_KIND = 'keystone';
/** A Keystone weighs nothing on the spectrum (Guide:251; SynthesisService.groovy:18). */
const SILENT = new Frequency(0);

/**
 * The key to a building's bedrock (Guide:250-252, 275-276; SynthesisService.groovy:13-25): what a merge
 * inside a primed building yields instead of a hybrid. Worth 0 Hz, never resonant (Decision 7: the old
 * `% 11 == 0` counted it, HK-023). Bound to the building by its address, never its name (Building.groovy:37-39,
 * HK-018): the name is display only, and a renamed building still opens. A save keeps the address; the
 * reader asks that building for its Keystone again. Immutable.
 */
export class Keystone implements Fragment {
  readonly #name: string;
  readonly #building: Address;

  constructor(facts: { name: string; building: Address }) {
    this.#name = facts.name;
    this.#building = facts.building;
  }

  key(): string {
    return `${KEYSTONE_KIND}(${this.#building.toString()})`;
  }

  name(): string {
    return this.#name;
  }

  frequency(): Frequency {
    return SILENT;
  }

  resonant(): boolean {
    return false;
  }

  /** The building this Keystone opens. */
  building(): Address {
    return this.#building;
  }

  data(): FragmentData {
    return { kind: KEYSTONE_KIND, building: this.#building.toString() };
  }
}
