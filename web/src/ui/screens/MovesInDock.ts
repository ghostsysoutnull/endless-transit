import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { MovesPlace } from './MovesPlace.ts';

/** The moves in the dock's row (U03c, a room): always in reach of a thumb, never scrolled away; no strip. */
export class MovesInDock implements MovesPlace {
  arrange(moves: readonly OptionVM[]): MovesLayout {
    return { strip: [], row: moves };
  }
}
