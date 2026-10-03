import type { TraceColumnVM } from './TraceColumnVM.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { Screen } from '#ui/Screen.ts';
import type { AsideVM } from './AsideVM.ts';
import type { Drawing } from './Drawing.ts';
import type { KeyStripVM } from './KeyStripVM.ts';
import type { MapPanelVM } from './MapPanelVM.ts';
import type { Panel } from './Panel.ts';
import type { RoomCardVM } from './RoomCardVM.ts';
import type { StatKey } from './StatKey.ts';
import type { TravelRowVM } from './TravelRowVM.ts';

/** The world screen as readonly data — plain data and the engine's value objects, framework-free. */
export interface HudVM extends Screen {
  readonly title: string;
  /** The colour name of the frame (`yellow`), `default` above planet level; the stylesheet owns the hue. */
  readonly frame: string;
  /**
   * The depth rail (U01a, Decision 6): the path from the universe, one level per step; the last one is where
   * the player stands. Its glyph is shown; `kind` and `name` are read out, not hovered for; its address finds the
   * place the next screen zooms out of.
   */
  readonly rail: readonly {
    readonly icon: string;
    readonly kind: string;
    readonly name: string;
    readonly address: string;
    readonly current: boolean;
  }[];
  /** The coherence bar: the scale, the value, its band (a colour a screen picks by it), and what a reader hears. */
  readonly meter: {
    readonly label: string;
    readonly min: number;
    readonly max: number;
    readonly value: number;
    readonly text: string;
    readonly band: string;
    readonly bandLabel: string;
    readonly valueText: string;
  };
  /** The readouts beside the meter, in plain words (U01a, Decision 1): the steps and the buffer. */
  /** Each stat by its key (`steps`, `buffer`: what the relic's flight lands on), its label and its value. */
  readonly stats: readonly { readonly key: StatKey; readonly label: string; readonly value: string }[];
  readonly place: {
    readonly eyebrow: string;
    readonly icon: string;
    readonly name: string;
    /** Its position among its siblings as a chip (`Orbit`, `2 of 5`); not shown for the universe, nor a floor. */
    readonly position: Panel<{ readonly label: string; readonly value: string }>;
    readonly tags: readonly { readonly key: string; readonly label: string; readonly value: string }[];
    readonly description: readonly string[];
    /** Labelled lines under the description — a room's FURNITURE, its object count (the mock's rows). */
    readonly rows: readonly { readonly label: string; readonly value: string }[];
    readonly diagnostic: string;
  };
  /** The right column's second pane: what the place holds, and the telemetry every place indoors shows. */
  readonly aside: AsideVM;
  /** The panel the last SCAN read (Guide:87): a title, its notes, rows of labelled cells; nothing when the last step was no scan. */
  readonly scan: {
    /** The panel's accessible name. */
    readonly label: string;
    readonly heading: string;
    readonly notes: readonly string[];
    readonly rows: readonly {
      readonly cells: readonly { readonly key: string; readonly label: string; readonly value: string }[];
      /** The row about where the traveller stands: `text` shown, `label` read out; nothing on the others. */
      readonly mark: { readonly text: string; readonly label: string } | null;
      /** The sensory line under the row; empty when none. */
      readonly note: string;
    }[];
  } | null;
  /** The map the last MAP drew (Guide:92): the picture and its words; not shown when the last step was no map. */
  readonly map: Panel<MapPanelVM>;
  /** The trace the last TRACE drew (Guide:92): the picture and one line per level for a reader; not shown when the last step was no trace. */
  readonly trace: Panel<TraceColumnVM>;
  /** The rail as one button (U04): it runs TRACE, the column opening at the level nearest the finger. */
  readonly railTrace: { readonly id: string; readonly label: string } | null;
  /** What the place's picture draws (U01b), or that no picture draws it: the screen then stays as it was. */
  readonly drawing: Drawing;
  /**
   * A list of places that go by their own numbers (a building's floors) as a pad of numbers (U02): the groups
   * (one, or tens past 20 — each with its label, `10–19`, and its rows), which one shows first, and the name of
   * the tabs; not shown for any other list. `rows` still holds every row.
   */
  readonly pad: Panel<{
    readonly label: string;
    readonly groups: readonly {
      readonly label: string;
      /** One key per place: its option, the number shown, what a reader hears, and whether it is where the car is or was visited. */
      readonly keys: readonly {
        readonly id: string;
        readonly number: string;
        readonly spoken: string;
        readonly current: boolean;
        readonly visited: boolean;
      }[];
    }[];
    readonly open: number;
  }>;
  /** The room's card (U03e): shown where the drawing puts its place's moves on one; the dock and the strip are then empty. */
  readonly card: Panel<RoomCardVM>;
  /** The strip of keys at the screen's foot where the drawing puts its place's moves among them (`MovesInKeys`); the dock and the strip under the picture are then empty. A room's keys are its card's. */
  readonly keys: Panel<KeyStripVM>;
  /** The line above the rows. */
  readonly heading: string;
  readonly rows: readonly TravelRowVM[];
  /** The moves the place offers (up, down, into the corridor): a strip of buttons above the list; a room's are on its card (U03e). */
  readonly moves: readonly OptionVM[];
  /** Why some rows are closed; not shown when none is. */
  readonly sealedNote: Panel<{ readonly text: string }>;
  /** The word on a closed row. */
  readonly sealedTag: string;
  /** Leave and the game's own options, in order: the first `fold.after` always within reach of a thumb, the rest behind one button; empty on a room's card (U03e) and where the keys stand. */
  readonly dock: readonly OptionVM[];
  /**
   * How the dock folds: how many stay out (the way out), how many of those are the way out (the first ones), and the
   * words of the button that opens and closes the rest.
   */
  readonly fold: {
    readonly after: number;
    readonly out: number;
    readonly more: string;
    readonly less: string;
    readonly label: string;
  };
  /** The debug tools (Decision 8): a strip of their own, empty outside debug mode. */
  readonly debug: readonly OptionVM[];
  /** The word on the button the strip folds behind (I09). */
  readonly debugToggle: string;
  /** The live-region text: what just happened. */
  readonly status: string;
  readonly build: string;
  /** Names of the screen's regions, read by screen readers only. */
  readonly regions: {
    readonly hud: string;
    readonly path: string;
    readonly place: string;
    readonly scan: string;
    readonly map: string;
    readonly trace: string;
    readonly travel: string;
    readonly moves: string;
    readonly aside: string;
    readonly dock: string;
    readonly debug: string;
  };
}
