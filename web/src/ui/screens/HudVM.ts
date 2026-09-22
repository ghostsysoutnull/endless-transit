import type { OptionVM } from '#ui/OptionVM.ts';
import type { AsideVM } from './AsideVM.ts';
import type { Screen } from '#ui/Screen.ts';
import type { TravelRowVM } from './TravelRowVM.ts';

/** The world screen as plain readonly data — framework-free. */
export interface HudVM extends Screen {
  readonly title: string;
  /** The colour name of the frame (`yellow`), `default` above planet level; the stylesheet owns the hue. */
  readonly frame: string;
  /** The path from the universe, one crumb per level; the last one is where the player stands. `kind` is read out, not hovered for. */
  readonly crumbs: readonly {
    readonly icon: string;
    readonly kind: string;
    readonly name: string;
    readonly current: boolean;
  }[];
  readonly stats: readonly { readonly label: string; readonly value: string }[];
  readonly place: {
    readonly eyebrow: string;
    readonly icon: string;
    readonly name: string;
    readonly tags: readonly { readonly key: string; readonly label: string; readonly value: string }[];
    readonly description: readonly string[];
    /** Labelled lines under the description — a room's FURNITURE, its object count (the mock's rows). */
    readonly rows: readonly { readonly label: string; readonly value: string }[];
    readonly diagnostic: string;
  };
  /** The right column's second pane: what the place holds, and the telemetry every place indoors shows. */
  readonly aside: AsideVM;
  /** The line above the rows. */
  readonly heading: string;
  readonly rows: readonly TravelRowVM[];
  /** The moves the place offers (up, down, into the corridor, on to the next room): a strip of buttons above the list. */
  readonly moves: readonly OptionVM[];
  /** Why some rows are closed; nothing when none is. */
  readonly sealedNote: string | null;
  /** The word on a closed row. */
  readonly sealedTag: string;
  /** Leave and the game's own options: always within reach of a thumb. */
  readonly dock: readonly OptionVM[];
  /** The live-region text: what just happened. */
  readonly status: string;
  readonly build: string;
  /** Names of the screen's regions, read by screen readers only. */
  readonly regions: {
    readonly hud: string;
    readonly path: string;
    readonly place: string;
    readonly travel: string;
    readonly moves: string;
    readonly aside: string;
    readonly dock: string;
  };
}
