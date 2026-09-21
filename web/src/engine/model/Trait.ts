/** The functional trait a country is governed by (`Military`, `Research` …). Identity is its key, an entry of `themes/traits`. */
export class Trait {
  readonly #key: string;

  constructor(key: string) {
    this.#key = key;
  }

  key(): string {
    return this.#key;
  }

  equals(other: Trait): boolean {
    return this.#key === other.#key;
  }
}
