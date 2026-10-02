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
  /** One tile per fragment, in the buffer's order: its gem, name, hertz, signal and phase; the tile is its pick. */
  readonly rows: readonly {
    readonly key: string;
    readonly ordinal: string;
    readonly hertz: string;
    /** The signal meter: how many of its cells are lit. */
    readonly signal: { readonly lit: number; readonly cells: number };
    readonly phase: string;
    /** `stable` or `shifting`: what the stylesheet colours by. */
    readonly phaseKey: string;
    readonly name: string;
    /** Whether the gem is lit as resonant, and what a reader hears for it; empty when it does not resonate. */
    readonly resonant: boolean;
    readonly resonantLabel: string;
    readonly selected: boolean;
    /** What a reader hears on the selected tile; empty elsewhere. */
    readonly selectedLabel: string;
    /** The tile's own tap: select, merge or unselect, named with the fragment. */
    readonly pick: OptionVM;
    /** The drop, in a room; nothing elsewhere. */
    readonly drop: OptionVM | null;
  }[];
  readonly hint: string;
  /** The way back: always within reach of a thumb. */
  readonly dock: readonly OptionVM[];
  /** The engine's message, for the eye. */
  readonly note: string;
  readonly build: string;
  readonly regions: { readonly buffer: string; readonly actions: string };
}
