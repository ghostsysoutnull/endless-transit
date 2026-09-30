import type { Painter } from '#ui/canvas/Painter.ts';
import type { Point } from './Point.ts';

/** What a glyph is painted with at a moment: where, how big, when, and its two inks. */
export interface GlyphMoment {
  readonly painter: Painter;
  readonly at: Point;
  readonly radius: number;
  /** Seconds on the clock; 0 holds it still. */
  readonly seconds: number;
  /** The glyph's line, and its light (a window, a car, a sun). */
  readonly ink: string;
  readonly accent: string;
}

/** A kind's small live drawing on its plate (U05; the mock's `MINI`, `transit-reframed.html:1122-1142`); one class a `GlyphLook`. */
export interface PoleGlyph {
  paint(moment: GlyphMoment): void;
}
