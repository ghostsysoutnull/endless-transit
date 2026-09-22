import type { OptionVM } from '#ui/OptionVM.ts';
import type { Screen } from '#ui/Screen.ts';

/** The link-failure screen as plain readonly data — framework-free. */
export interface RebootVM extends Screen {
  readonly title: string;
  /** The frame the screen takes (`dead`); the stylesheet owns the hue. */
  readonly frame: string;
  readonly stageLine: string;
  readonly eyebrow: string;
  readonly headline: string;
  readonly line: string;
  /** What the reboot keeps and what it undoes, in plain words. */
  readonly explanation: string;
  readonly options: readonly OptionVM[];
  readonly status: string;
  readonly build: string;
  readonly regions: { readonly stage: string; readonly notice: string; readonly actions: string };
}
