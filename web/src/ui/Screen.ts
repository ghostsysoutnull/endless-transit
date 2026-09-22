import type { OptionVM } from './OptionVM.ts';

/** What every screen's view-model carries, so the shell can do its two jobs without knowing the screen. */
export interface Screen {
  /** What is being shown, as an identity: when it changes, the page starts again from the top. */
  readonly scene: string;
  /** The options a player may act on right now — what the input router listens for. */
  readonly options: readonly OptionVM[];
  /** What just happened, in words — the shell's live region says it; the screen may also show it. */
  readonly status: string;
}
