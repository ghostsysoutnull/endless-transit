/**
 * How a kind of level is drawn on the tower (U02): its row's strength on even and odd levels, the inks of its
 * row, its number and its gauge tick, and whether it lies below the bedrock.
 */
export class LevelLook {
  readonly #even: number;
  readonly #odd: number;
  readonly #ground: string;
  readonly #number: string;
  readonly #tick: string;
  readonly #below: boolean;

  constructor(facts: {
    even: number;
    odd: number;
    ground: string;
    number: string;
    tick: string;
    below: boolean;
  }) {
    this.#even = facts.even;
    this.#odd = facts.odd;
    this.#ground = facts.ground;
    this.#number = facts.number;
    this.#tick = facts.tick;
    this.#below = facts.below;
  }

  /** The row's strength at this level: the floors alternate, so a stack reads as rows. */
  alpha(level: number): number {
    return level % 2 === 0 ? this.#even : this.#odd;
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

  /** Whether it lies below the bedrock. */
  below(): boolean {
    return this.#below;
  }
}
