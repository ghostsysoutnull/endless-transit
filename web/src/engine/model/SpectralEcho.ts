import type { Address } from './Address.ts';
import type { Fragment, FragmentData } from './Fragment.ts';
import type { Frequency } from './Frequency.ts';

export const ECHO_KIND = 'echo';

/**
 * A Null Reach's one Spectral Echo (Guide:192-195; NullSector.groovy:25-30, 104-111): worth 1,000 to 9,999 Hz,
 * fixed by the reach, so a save keeps only the reach and the reader asks it again. It never resonates by
 * itself (Guide:245-247). Immutable.
 */
export class SpectralEcho implements Fragment {
  readonly #from: Address;
  readonly #frequency: Frequency;

  constructor(facts: { from: Address; frequency: Frequency }) {
    this.#from = facts.from;
    this.#frequency = facts.frequency;
  }

  key(): string {
    return `${ECHO_KIND}(${this.#from.toString()})`;
  }

  name(): string {
    return 'Spectral Echo';
  }

  frequency(): Frequency {
    return this.#frequency;
  }

  resonant(): boolean {
    return false;
  }

  data(): FragmentData {
    return { kind: ECHO_KIND, from: this.#from.toString() };
  }
}
