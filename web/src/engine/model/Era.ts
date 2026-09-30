import type { Fact } from './Fact.ts';

/** A technological era (the Groovy "timeline"). Identity is its key — the stem of `themes/timelines/<key>`. */
export class Era {
  readonly #key: string;

  constructor(key: string) {
    this.#key = key;
  }

  key(): string {
    return this.#key;
  }

  /** Its chip on a card: `Era future`. */
  fact(): Fact {
    return { key: 'era', label: 'Era', value: this.#key };
  }

  equals(other: Era): boolean {
    return this.#key === other.#key;
  }
}
