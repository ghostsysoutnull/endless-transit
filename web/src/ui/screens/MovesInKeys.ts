import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { MovesPlace } from './MovesPlace.ts';

/** The moves among the keys at the foot of the screen (a corridor's): none under the picture, no dock. */
export class MovesInKeys implements MovesPlace {
  arrange(moves: readonly OptionVM[]): MovesLayout {
    return { strip: [], ways: { shown: false }, keys: { shown: true, moves } };
  }
}
