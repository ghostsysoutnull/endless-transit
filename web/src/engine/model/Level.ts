import { DecimalLabel } from './DecimalLabel.ts';
import { HexLabel } from './HexLabel.ts';
import type { LevelKind } from './LevelKind.ts';
import type { LevelLabel } from './LevelLabel.ts';

/** How each kind of level is written, stateless and shared by every level; a new kind is one more entry. */
const LABELS: Readonly<Record<LevelKind, LevelLabel>> = {
  floor: new DecimalLabel(),
  layer: new HexLabel(),
};

/**
 * The level a floor stands at (U02): its number — the lobby 0, a Layer below it negative — what stands there, and
 * the label the tower and the pad write for it. Value object: the one owner of how a level is labelled; never
 * a floor below the lobby nor a Layer at or above it.
 */
export class Level {
  readonly #number: number;
  readonly #kind: LevelKind;

  constructor(number: number, kind: LevelKind) {
    if (number < 0 !== (kind === 'layer'))
      throw new RangeError(
        `a ${kind} cannot stand at level ${String(number)}: floors from 0 up, Layers below`,
      );
    this.#number = number;
    this.#kind = kind;
  }

  number(): number {
    return this.#number;
  }

  kind(): LevelKind {
    return this.#kind;
  }

  /** Whether it lies below the building's bedrock: a Layer's does. */
  belowBedrock(): boolean {
    return this.#number < 0;
  }

  /** How the level is written on the tower, the pad and a Layer's name: a floor's number, a Layer's in hex (`-0x1`). */
  label(): string {
    return LABELS[this.#kind].of(this.#number);
  }

  equals(other: Level): boolean {
    return this.#number === other.#number && this.#kind === other.#kind;
  }
}
