import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';

/** Where a place's moves sit on the world screen (U03c): under the picture (`MovesInStrip`) or in the dock (`MovesInDock`). */
export interface MovesPlace {
  arrange(moves: readonly OptionVM[]): MovesLayout;
}
