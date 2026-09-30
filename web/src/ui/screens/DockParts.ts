import type { OptionVM } from '#ui/OptionVM.ts';

/** The buttons a place's dock and moves are made of, in the presenter's words (U03c): its moves, its way out, the game's own. */
export interface DockParts {
  readonly moves: readonly OptionVM[];
  readonly leave: readonly OptionVM[];
  readonly system: readonly OptionVM[];
}
