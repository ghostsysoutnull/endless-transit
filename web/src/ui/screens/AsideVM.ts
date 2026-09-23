import type { MapPanelVM } from './MapPanelVM.ts';
import type { OptionVM } from '#ui/OptionVM.ts';

/** The pane beside the list: the objects of a room as tiles — each a take when the engine offers one — the telemetry block indoors, the map outdoors. */
export interface AsideVM {
  readonly objects: {
    /** The pane's accessible name. */
    readonly label: string;
    readonly heading: string;
    /** What to say when there are no tiles; empty when there are. */
    readonly empty: string;
    /** Why the tiles cannot be taken right now (the buffer is full); empty when they can. */
    readonly note: string;
    readonly tiles: readonly {
      readonly key: string;
      readonly name: string;
      /** Its number on the list — the take's key on a keyboard. */
      readonly ordinal: string;
      /** The take of this tile: a button; nothing while the buffer is full. */
      readonly action: OptionVM | null;
    }[];
  } | null;
  readonly telemetry: {
    /** The pane's accessible name. */
    readonly label: string;
    readonly heading: string;
    readonly sync: string;
    readonly spectrogram: { readonly heading: string; readonly bars: readonly string[] };
    readonly logs: { readonly heading: string; readonly lines: readonly string[] };
  } | null;
  /** The map of the place, from street level upward (Guide:339); nothing where the telemetry is, nothing for a kind with no map. */
  readonly map: MapPanelVM | null;
}
