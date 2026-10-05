import type { OptionVM } from '#ui/OptionVM.ts';
import type { Screen } from '#ui/Screen.ts';
import type { Drawing } from './Drawing.ts';

/** The session recap as plain readonly data — framework-free. */
export interface RecapVM extends Screen {
  /** The frame colour of the place the session ends in; `default` above planet level. */
  readonly frame: string;
  /** The ending reached, in a few words. */
  readonly heading: string;
  /** Where the traveller stands: the words before it, its name and its kind. */
  readonly place: { readonly label: string; readonly name: string; readonly kind: string };
  /** The run's figures (the full ending); none for the others. */
  readonly figures: readonly { readonly label: string; readonly value: string }[];
  /** The void's typewritten lines (the ending below the bedrock); none for the others. */
  readonly lines: readonly string[];
  readonly closing: string;
  /** The way back up, a level each from the universe to here: the last is the screen's picture, all of them its rise. */
  readonly levels: readonly { readonly drawing: Drawing; readonly into: string }[];
  /** The buttons: the one the screen leads with stands out. */
  readonly options: readonly (OptionVM & { readonly lead: boolean })[];
  /** The id of the option that ends the session — the rise plays before it runs; empty when it is not on offer. */
  readonly ends: string;
  /** The engine's message, for the eye; the heading is already on the page. */
  readonly note: string;
  /** What a reader hears: the message, or the ending's heading when the engine said nothing. */
  readonly status: string;
  readonly build: string;
}
