import type { OptionVM } from '#ui/OptionVM.ts';
import type { Screen } from '#ui/Screen.ts';

/** The buffer screen as plain readonly data — framework-free. */
export interface BufferVM extends Screen {
  readonly title: string;
  /** The frame colour of the place the buffer is opened in; `default` above planet level. */
  readonly frame: string;
  readonly heading: string;
  readonly count: { readonly label: string; readonly value: string };
  readonly tally: { readonly label: string; readonly value: string };
  /** What to say when there are no rows; empty when there are. */
  readonly empty: string;
  /** One row per fragment, in the buffer's order (the old overlay's line: number, hertz, signal, phase, name). */
  readonly rows: readonly {
    readonly key: string;
    readonly ordinal: string;
    readonly hertz: string;
    /** The signal bar, ten cells. */
    readonly bar: string;
    readonly phase: string;
    /** `stable` or `shifting`: what the stylesheet colours by. */
    readonly phaseKey: string;
    readonly name: string;
    /** The resonant badge: `text` shown, `label` read out; nothing on a fragment that does not resonate. */
    readonly badge: { readonly text: string; readonly label: string } | null;
    readonly selected: boolean;
    /** What a reader hears on the selected row; empty elsewhere. */
    readonly selectedLabel: string;
    /** The row's buttons: the pick (select, merge, unselect) and, in a room, the drop. */
    readonly actions: readonly OptionVM[];
  }[];
  readonly hint: string;
  readonly sync: string;
  /** The way back: always within reach of a thumb. */
  readonly dock: readonly OptionVM[];
  /** The engine's message, for the eye. */
  readonly note: string;
  readonly build: string;
  readonly regions: { readonly buffer: string; readonly actions: string };
}
