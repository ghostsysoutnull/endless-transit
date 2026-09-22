/**
 * An object of the world — what an apartment holds and a room shows (the Guide's "things worth taking").
 * Value object: identity is its key (the form and the parts it was made from), never its words — a
 * capture (I06) names a relic by key, and a renamed list changes what is read, not what is held.
 */
export class Relic {
  readonly #key: string;
  readonly #name: string;

  constructor(key: string, name: string) {
    this.#key = key;
    this.#name = name;
  }

  key(): string {
    return this.#key;
  }

  name(): string {
    return this.#name;
  }

  equals(other: Relic): boolean {
    return this.#key === other.#key;
  }
}
