import type { Fact } from './Fact.ts';

/**
 * A culture of the world. Identity is its key — the stem of its content files (`themes/cultures/<key>`).
 * It also knows the frame colour it gives a planet (a colour name; the stylesheet owns the hue).
 */
export class Culture {
  readonly #key: string;
  readonly #frame: string;

  constructor(key: string, frame: string) {
    this.#key = key;
    this.#frame = frame;
  }

  key(): string {
    return this.#key;
  }

  frame(): string {
    return this.#frame;
  }

  /** Its chip on a card: `Culture baroque`. */
  fact(): Fact {
    return { key: 'culture', label: 'Culture', value: this.#key };
  }

  equals(other: Culture): boolean {
    return this.#key === other.#key;
  }
}
