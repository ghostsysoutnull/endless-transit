/**
 * How a kind of level is drawn on the tower (U02): its row's strength on even and odd rows, and the inks of its
 * row, its number and its gauge tick.
 */
export class LevelLook {
  readonly #even: number;
  readonly #odd: number;
  readonly #ground: string;
  readonly #number: string;
  readonly #tick: string;

  constructor(facts: { even: number; odd: number; ground: string; number: string; tick: string }) {
    this.#even = facts.even;
    this.#odd = facts.odd;
    this.#ground = facts.ground;
    this.#number = facts.number;
    this.#tick = facts.tick;
  }

  /** The row's strength at its place on the tower, counted from the lobby: rows alternate, so a stack reads as rows. */
  alpha(row: number): number {
    return row % 2 === 0 ? this.#even : this.#odd;
  }

  /** The row's ink. */
  ground(): string {
    return this.#ground;
  }

  /** The ink its number is written in. */
  number(): string {
    return this.#number;
  }

  /** The ink of its label on the gauge. */
  tick(): string {
    return this.#tick;
  }
}
