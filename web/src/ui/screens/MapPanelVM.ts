import type { MapPictureVM } from '#ui/canvas/MapPictureVM.ts';

/** A drawn map with its words: the picture for the canvas, the nodes as a list for a reader, one sentence that sums it up. */
export interface MapPanelVM {
  /** The panel's accessible name. */
  readonly label: string;
  readonly heading: string;
  /** `SCAN_ORIGIN: <place>` — the line under the picture. */
  readonly origin: string;
  readonly picture: MapPictureVM;
  /** The text alternative: every node with its glyph and whether it was visited. */
  readonly nodes: readonly { readonly glyph: string; readonly name: string; readonly note: string }[];
  /** What a reader hears for the picture. */
  readonly summary: string;
}
