import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';

/** Where a place's moves sit on the world screen (U03c): under the picture (`MovesInStrip`) or on the room's card (`MovesOnCard`, U03e). */
export interface MovesPlace {
  arrange(moves: readonly OptionVM[]): MovesLayout;
}
