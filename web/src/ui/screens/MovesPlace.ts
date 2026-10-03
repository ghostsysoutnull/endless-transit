import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';

/** Where a place's moves sit on the world screen (U03c): under the picture (`MovesInStrip`), on the room's card (`MovesOnCard`, U03e) or among the keys at the screen's foot (`MovesInKeys`). */
export interface MovesPlace {
  arrange(moves: readonly OptionVM[]): MovesLayout;
}
