import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { MovesPlace } from './MovesPlace.ts';

/** The moves on the room's card (U03e): none under the picture, none in a dock — the card's keys and its back hold them. */
export class MovesOnCard implements MovesPlace {
  arrange(moves: readonly OptionVM[]): MovesLayout {
    return { strip: [], ways: { shown: true, moves } };
  }
}
