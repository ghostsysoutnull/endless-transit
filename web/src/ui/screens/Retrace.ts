/**
 * Owns one fact: which place the traveller came out of (U02, the zoom out) — the child of the place shown now that
 * stood on the path to the place shown before, found by its address, never by cutting an address apart. Value
 * object: the path to the screen before, from the universe down.
 */
export class Retrace {
  readonly #path: ReadonlySet<string>;
  readonly #last: string | undefined;

  constructor(path: readonly string[]) {
    this.#path = new Set(path);
    this.#last = path.at(-1);
  }

  /** The child of the place at `here` the traveller came out of; none when they came from elsewhere or stayed. */
  from<C extends { readonly address: string }>(here: string, children: readonly C[]): C | undefined {
    if (here === this.#last) return undefined;
    return children.find((child) => this.#path.has(child.address));
  }
}
