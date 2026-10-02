import type { SpectrumVM } from '#ui/canvas/SpectrumVM.ts';
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
    readonly tiles: readonly {
      readonly key: string;
      readonly name: string;
      /** Its number on the list — the take's key on a keyboard. */
      readonly ordinal: string;
      /** The take of this tile: a button; nothing when the engine offers none. */
      readonly action: OptionVM | null;
    }[];
  } | null;
  readonly telemetry: {
    /** The pane's accessible name. */
    readonly label: string;
    readonly heading: string;
    /** The lattice's or the void's sync: its word, and the coherence band that tints its light. */
    readonly sync: { readonly text: string; readonly band: string };
    /** The quantum spectrogram: what a reader hears, and the picture the canvas draws. */
    readonly spectrogram: { readonly label: string; readonly picture: SpectrumVM };
    /** The readouts, in plain words. */
    readonly lines: readonly string[];
    /** What the void says this frame; empty above the bedrock, and when it is silent. */
    readonly voice: string;
  } | null;
  /** The map of the place, from street level upward (Guide:339); nothing where the telemetry is, nothing for a kind with no map. */
  readonly map: MapPanelVM | null;
}
