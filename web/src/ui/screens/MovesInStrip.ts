import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { MovesPlace } from './MovesPlace.ts';

/** The moves as a strip of buttons under the picture. */
export class MovesInStrip implements MovesPlace {
  arrange(moves: readonly OptionVM[]): MovesLayout {
    return { strip: moves, ways: { shown: false }, keys: { shown: false } };
  }
}
