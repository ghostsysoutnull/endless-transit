const TEXT_FORM = /^0(\.(0|[1-9]\d*))*$/;

/**
 * Where a location is: the child indices walked from the universe. Owns one fact — the path's text form,
 * `0` for the universe and `0.3.1` below it (what a save stores). Identity is the path itself.
 */
export class Address {
  readonly #indices: readonly number[];

  constructor(indices: readonly number[]) {
    for (const index of indices) {
      if (!Number.isSafeInteger(index) || index < 0) {
        throw new RangeError(`a child index is a whole number from zero up, got ${String(index)}`);
      }
    }
    this.#indices = Object.freeze([...indices]);
  }

  /** Static because it is the factory for the text form `toString` writes. Anything else is no address. */
  static parse(text: string): Address | undefined {
    if (!TEXT_FORM.test(text)) return undefined;
    const indices = text.split('.').slice(1).map(Number);
    return indices.every((index) => Number.isSafeInteger(index)) ? new Address(indices) : undefined;
  }

  child(index: number): Address {
    return new Address([...this.#indices, index]);
  }

  indices(): readonly number[] {
    return this.#indices;
  }

  depth(): number {
    return this.#indices.length;
  }

  equals(other: Address): boolean {
    return this.toString() === other.toString();
  }

  toString(): string {
    return ['0', ...this.#indices.map(String)].join('.');
  }
}
