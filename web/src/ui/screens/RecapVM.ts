import type { OptionVM } from '#ui/OptionVM.ts';
import type { Screen } from '#ui/Screen.ts';

/** The session recap as plain readonly data — framework-free. */
export interface RecapVM extends Screen {
  readonly title: string;
  /** The frame colour of the place the session ends in; `default` above planet level. */
  readonly frame: string;
  readonly heading: string;
  /** The recap's figures (the full ending); none for the short one. */
  readonly figures: readonly { readonly label: string; readonly value: string }[];
  /** The shutdown steps (the short ending); none for the full one. */
  readonly steps: readonly { readonly label: string; readonly process: string; readonly done: string }[];
  readonly closing: string;
  readonly options: readonly OptionVM[];
  /** The engine's message, for the eye; the heading is already on the page. */
  readonly note: string;
  /** What a reader hears: the message, or the ending's heading when the engine said nothing. */
  readonly status: string;
  readonly build: string;
  readonly regions: { readonly recap: string; readonly actions: string };
}
