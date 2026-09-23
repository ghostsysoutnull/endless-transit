/**
 * The lattice map of a place as plain data (Guide:92, 339-342): the children on a grid of cells, each with
 * its glyph and whether it has been visited; the glitch marks of a low Coherence (Guide:156); the static
 * of the void (TelemetryComponent.groovy:31-46). A screen draws it; nothing here knows how.
 */
export interface MapSummary {
  /** The grid, in cells (LatticeMapComponent.groovy:32-33). */
  readonly width: number;
  readonly height: number;
  /** The place the map is drawn from (its `SCAN_ORIGIN`), and its own glyph. */
  readonly origin: { readonly name: string; readonly glyph: string };
  /** The colour name of the place's frame; nothing above planet level. */
  readonly frame: string | null;
  /** Below the bedrock: every node is `☠` and the static eats into them. */
  readonly abyssal: boolean;
  readonly nodes: readonly {
    readonly x: number;
    readonly y: number;
    readonly glyph: string;
    readonly name: string;
    /** Bright when visited, dim when not (Guide:340). */
    readonly visited: boolean;
    /** The void's static took this node's glyph this frame: drawn in red. */
    readonly noise: boolean;
  }[];
  /** Where the magenta `X` marks sprout this frame; none above 30 Coherence. */
  readonly marks: readonly { readonly x: number; readonly y: number }[];
}
