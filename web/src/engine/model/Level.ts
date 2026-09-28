import type { LevelKind } from './LevelKind.ts';

/**
 * The level a floor stands at (U02): its number — the lobby 0, a Layer below it negative — what stands there, and
 * the label the tower and the pad write for it. Value object: the one owner of how a level is labelled.
 */
export class Level {
  readonly #number: number;
  readonly #kind: LevelKind;

  constructor(number: number, kind: LevelKind) {
    this.#number = number;
    this.#kind = kind;
  }

  number(): number {
    return this.#number;
  }

  kind(): LevelKind {
    return this.#kind;
  }

  /** How the level is written on the tower and the pad: its number, a Layer's too (`-1`). */
  label(): string {
    return String(this.#number);
  }

  equals(other: Level): boolean {
    return this.#number === other.#number && this.#kind === other.#kind;
  }
}
