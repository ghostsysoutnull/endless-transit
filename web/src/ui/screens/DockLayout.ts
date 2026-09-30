import type { OptionVM } from '#ui/OptionVM.ts';

/**
 * Where a place's moves and dock buttons stand (U03c): the strip of moves under the picture, the dock in order, how many
 * of the dock stay out of the fold and how many of those are the way out.
 */
export interface DockLayout {
  readonly moves: readonly OptionVM[];
  readonly dock: readonly OptionVM[];
  readonly after: number;
  readonly out: number;
}
