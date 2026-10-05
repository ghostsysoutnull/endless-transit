import type { Seed } from '#engine/rng/Seed.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { Screen } from '#ui/Screen.ts';
import type { Drawing } from './Drawing.ts';

/** The title screen as plain readonly data — framework-free. */
export interface TitleVM extends Screen {
  readonly title: string;
  readonly tagline: string;
  readonly world: {
    readonly name: string;
    readonly seedLabel: string;
    readonly seed: string;
    /** The way down entering takes, a level each from the universe: the first is the title's picture, all of them its dive. */
    readonly levels: readonly { readonly drawing: Drawing; readonly into: string }[];
    /** The seed of the static the picture resolves out of. */
    readonly noise: Seed;
  } | null;
  /** Shown in place of the world while there is none. */
  readonly prompt: string;
  /** The buttons: the one the screen leads with stands out. */
  readonly options: readonly (OptionVM & { readonly lead: boolean })[];
  /** The id of the option that enters the world — the dive plays before it runs; empty when it is not on offer. */
  readonly enters: string;
  /** What just happened. */
  readonly status: string;
  /** Which build the page is — small print for the tester. */
  readonly build: string;
}
