/**
 * A level's depth as the trace writes it (U05): two digits, `04` — the column's `Depth 04` and the pole's `Level 04`
 * name the same level alike. Value object.
 */
export class DepthNumber {
  readonly #depth: number;

  constructor(depth: number) {
    this.#depth = depth;
  }

  text(): string {
    return String(this.#depth).padStart(2, '0');
  }
}
