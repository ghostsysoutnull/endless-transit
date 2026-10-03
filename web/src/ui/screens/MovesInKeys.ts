import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { MovesPlace } from './MovesPlace.ts';

/**
 * The moves among the keys at the foot of the screen, and no dock — each move a key, but, by its id: the moves named
 * `under`, the place's own way in, which keep their words in the strip under the picture; those named `bar`, which
 * arrive as a bar over the keys; and those named `unseen`, which have no button and only stay on offer.
 */
export class MovesInKeys implements MovesPlace {
  readonly #under: ReadonlySet<string>;
  readonly #bar: ReadonlySet<string>;
  readonly #unseen: ReadonlySet<string>;

  constructor(named: {
    readonly under: readonly string[];
    readonly bar: readonly string[];
    readonly unseen: readonly string[];
  }) {
    this.#under = new Set(named.under);
    this.#bar = new Set(named.bar);
    this.#unseen = new Set(named.unseen);
  }

  arrange(moves: readonly OptionVM[]): MovesLayout {
    const rest = moves.filter((move) => !this.#under.has(move.id));
    return {
      strip: moves.filter((move) => this.#under.has(move.id)),
      ways: { shown: false },
      keys: {
        shown: true,
        moves: rest.filter((move) => !this.#bar.has(move.id) && !this.#unseen.has(move.id)),
        bar: rest.filter((move) => this.#bar.has(move.id)),
        unseen: rest.filter((move) => this.#unseen.has(move.id) && !this.#bar.has(move.id)),
      },
    };
  }
}
