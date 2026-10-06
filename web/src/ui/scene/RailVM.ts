import type { GlyphLook } from '#engine/model/GlyphLook.ts';

/** The depth rail as its picture draws it: a level a mark from the universe down to you, and how far coherence has fallen. */
export interface RailVM {
  readonly levels: readonly {
    /** Where the level stands: what tells a place from the one that stood there before. */
    readonly address: string;
    readonly glyph: GlyphLook;
  }[];
  readonly decay: number;
}
