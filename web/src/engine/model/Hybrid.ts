import type { Fragment, FragmentData } from './Fragment.ts';
import type { Frequency } from './Frequency.ts';

export const HYBRID_KIND = 'hybrid';
const JOIN = '-';
const SUFFIX = ' Hybrid';

/**
 * Two fragments merged (Guide:241-243, SynthesisService.groovy:18-21): the frequency is the sum, the name
 * is the first word of each parent joined with a dash plus "Hybrid" — "Rusted Chain" and "Paper Lantern"
 * make `Rusted-Paper Hybrid`. It resonates when the sum divides by eleven. A save keeps the parts; the
 * reader rebuilds it from them, so a hybrid is exactly as producible as what it was made of. Immutable.
 */
export class Hybrid implements Fragment {
  readonly #first: Fragment;
  readonly #second: Fragment;

  constructor(first: Fragment, second: Fragment) {
    this.#first = first;
    this.#second = second;
  }

  key(): string {
    return `${HYBRID_KIND}(${this.#first.key()}+${this.#second.key()})`;
  }

  name(): string {
    const firstWord = (fragment: Fragment): string => fragment.name().split(' ')[0] ?? '';
    return `${firstWord(this.#first)}${JOIN}${firstWord(this.#second)}${SUFFIX}`;
  }

  frequency(): Frequency {
    return this.#first.frequency().plus(this.#second.frequency());
  }

  resonant(): boolean {
    return this.frequency().resonant();
  }

  data(): FragmentData {
    return { kind: HYBRID_KIND, parts: [this.#first.data(), this.#second.data()] };
  }
}
