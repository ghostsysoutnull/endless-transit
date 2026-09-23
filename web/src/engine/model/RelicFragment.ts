import type { Address } from './Address.ts';
import type { Fragment, FragmentData } from './Fragment.ts';
import type { Frequency } from './Frequency.ts';
import type { Relic } from './Relic.ts';

export const RELIC_KIND = 'relic';

/** What a relic fragment is made of: the relic, where it was found, what it was worth there, and whether that room resonated. */
export interface RelicFragmentFacts {
  readonly relic: Relic;
  readonly from: Address;
  readonly frequency: Frequency;
  readonly resonant: boolean;
}

/**
 * A relic as a fragment: the object and the room it was found in — its provenance. The frequency is the
 * one that room gives it (Room.groovy:167-169), and it stays that whatever room it is dropped in and
 * taken back from (Decision 7: the old game kept only the name, Room.groovy:208). A save keeps the room and
 * the key; the reader asks that room again. Immutable.
 */
export class RelicFragment implements Fragment {
  readonly #facts: RelicFragmentFacts;

  constructor(facts: RelicFragmentFacts) {
    this.#facts = facts;
  }

  facts(): RelicFragmentFacts {
    return this.#facts;
  }

  key(): string {
    return this.#facts.relic.key();
  }

  name(): string {
    return this.#facts.relic.name();
  }

  frequency(): Frequency {
    return this.#facts.frequency;
  }

  resonant(): boolean {
    return this.#facts.resonant;
  }

  /** The room it came from, as an address. */
  from(): Address {
    return this.#facts.from;
  }

  data(): FragmentData {
    return { kind: RELIC_KIND, from: this.#facts.from.toString(), key: this.#facts.relic.key() };
  }
}
