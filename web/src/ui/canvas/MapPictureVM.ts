/** How a node of the map is inked: bright when visited, dim when not, the void's static in red. */
export type NodeTone = 'visited' | 'unvisited' | 'noise';
/** The tones a legend entry may show: the node tones, the origin, the glitch mark. */
export type LegendTone = NodeTone | 'you' | 'mark';

/** The lattice map as the canvas draws it: cells, glyphs and tones — the words of the legend from the presenter. */
export interface MapPictureVM {
  /** The grid, in cells. */
  readonly width: number;
  readonly height: number;
  /** The place the map is drawn from, at the centre: its glyph and its word (`YOU`). */
  readonly origin: { readonly glyph: string; readonly label: string };
  readonly nodes: readonly {
    readonly x: number;
    readonly y: number;
    readonly glyph: string;
    readonly tone: NodeTone;
  }[];
  /** Where the glitch marks sprout, and the glyph they are drawn with. */
  readonly marks: readonly { readonly x: number; readonly y: number }[];
  readonly markGlyph: string;
  /** The legend, drawn under the grid with the very glyphs the grid uses. */
  readonly legend: readonly { readonly glyph: string; readonly label: string; readonly tone: LegendTone }[];
}
