import type { OptionVM } from '#ui/OptionVM.ts';
import type { Screen } from '#ui/Screen.ts';

/** The title screen as plain readonly data — framework-free. */
export interface TitleVM extends Screen {
  readonly title: string;
  readonly tagline: string;
  /** The line under the sigil: what the uplink is doing. */
  readonly stageLine: string;
  readonly world: {
    readonly nameLabel: string;
    readonly name: string;
    readonly seedLabel: string;
    readonly seed: string;
  } | null;
  /** Shown in place of the world while there is none. */
  readonly prompt: string;
  readonly options: readonly OptionVM[];
  /** The live-region text: what just happened. */
  readonly status: string;
  /** Names of the screen's regions, read by screen readers only. */
  readonly regions: { readonly stage: string; readonly world: string; readonly actions: string };
}
