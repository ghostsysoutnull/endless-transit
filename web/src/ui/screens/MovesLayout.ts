import type { OptionVM } from '#ui/OptionVM.ts';
import type { Panel } from './Panel.ts';

/** Where a place's moves stand (U03c, U03e): in the strip under the picture, or on the room's card. */
export interface MovesLayout {
  readonly strip: readonly OptionVM[];
  /** The moves of a place shown as a card; not shown for any other. */
  readonly ways: Panel<{ readonly moves: readonly OptionVM[] }>;
}
