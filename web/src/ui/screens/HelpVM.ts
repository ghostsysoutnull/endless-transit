import type { OptionVM } from '#ui/OptionVM.ts';
import type { Screen } from '#ui/Screen.ts';

/** The help screen as plain readonly data — framework-free. */
export interface HelpVM extends Screen {
  readonly title: string;
  /** The frame colour of the place the help is opened in; `default` above planet level. */
  readonly frame: string;
  readonly heading: string;
  /** One line under the heading: what this screen is. */
  readonly lead: string;
  /** What each button does, grouped: a heading and one entry per button (its name, then what it does). */
  readonly sections: readonly {
    readonly heading: string;
    readonly entries: readonly { readonly term: string; readonly what: string }[];
  }[];
  /** How not to die, in a few lines. */
  readonly survival: { readonly heading: string; readonly lines: readonly string[] };
  /** The one line about keyboards. */
  readonly keys: string;
  /** The way back: always within reach of a thumb. */
  readonly dock: readonly OptionVM[];
  /** The engine's message, for the eye. */
  readonly note: string;
  readonly build: string;
  readonly regions: { readonly help: string; readonly actions: string };
}
