import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { MovesPlace } from './MovesPlace.ts';

/**
 * The moves among the keys at the foot of the screen, and no dock — but the moves named `under`, the place's own way
 * in, which keep their words in the strip under the picture.
 */
export class MovesInKeys implements MovesPlace {
  readonly #under: ReadonlySet<string>;

  constructor(under: readonly string[] = []) {
    this.#under = new Set(under);
  }

  arrange(moves: readonly OptionVM[]): MovesLayout {
    return {
      strip: moves.filter((move) => this.#under.has(move.id)),
      ways: { shown: false },
      keys: { shown: true, moves: moves.filter((move) => !this.#under.has(move.id)) },
    };
  }
}
