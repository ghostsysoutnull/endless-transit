import type { OptionVM } from '#ui/OptionVM.ts';
import type { Screen } from '#ui/Screen.ts';

/** The title screen as plain readonly data — framework-free. */
export interface TitleVM extends Screen {
  readonly title: string;
  readonly tagline: string;
  readonly world: { readonly seed: string; readonly name: string } | null;
  /** Shown in place of the world while there is none. */
  readonly prompt: string;
  readonly options: readonly OptionVM[];
  /** The live-region text: what just happened. */
  readonly status: string;
}
