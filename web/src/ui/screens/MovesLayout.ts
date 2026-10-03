import type { OptionVM } from '#ui/OptionVM.ts';
import type { Panel } from './Panel.ts';

/** Where a place's moves stand (U03c, U03e): in the strip under the picture, on the room's card, or among the keys at the screen's foot. */
export interface MovesLayout {
  readonly strip: readonly OptionVM[];
  /** The moves of a place shown as a card; not shown for any other. */
  readonly ways: Panel<{ readonly moves: readonly OptionVM[] }>;
  /**
   * The moves of a place whose keys stand at the foot of the screen, in place of the dock, each where it stands: a key
   * in the row (`moves`), the bar over the row (`bar`), or no button at all, only on offer (`unseen`); not shown for
   * any other place.
   */
  readonly keys: Panel<{
    readonly moves: readonly OptionVM[];
    readonly bar: readonly OptionVM[];
    readonly unseen: readonly OptionVM[];
  }>;
}
