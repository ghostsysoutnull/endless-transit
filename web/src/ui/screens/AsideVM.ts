/** The pane beside the list: the objects of a room as tiles (not buttons — taking is I06), and the telemetry block. */
export interface AsideVM {
  readonly objects: {
    /** The pane's accessible name. */
    readonly label: string;
    readonly heading: string;
    /** What to say when there are no tiles; empty when there are. */
    readonly empty: string;
    readonly tiles: readonly { readonly key: string; readonly name: string }[];
  } | null;
  readonly telemetry: {
    /** The pane's accessible name. */
    readonly label: string;
    readonly heading: string;
    readonly sync: string;
    readonly spectrogram: { readonly heading: string; readonly bars: readonly string[] };
    readonly logs: { readonly heading: string; readonly lines: readonly string[] };
  } | null;
}
