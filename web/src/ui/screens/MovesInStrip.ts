import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { MovesPlace } from './MovesPlace.ts';

/** The moves as a strip of buttons under the picture; none in the dock. */
export class MovesInStrip implements MovesPlace {
  arrange(moves: readonly OptionVM[]): MovesLayout {
    return { strip: moves, row: [] };
  }
}
