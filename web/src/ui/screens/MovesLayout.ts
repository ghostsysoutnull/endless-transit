import type { OptionVM } from '#ui/OptionVM.ts';

/** Where a place's moves stand (U03c): in the strip under the picture, or in the dock's row. */
export interface MovesLayout {
  readonly strip: readonly OptionVM[];
  readonly row: readonly OptionVM[];
}
