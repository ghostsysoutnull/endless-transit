import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { HallView } from './HallView.ts';

/**
 * How one corridor shape runs in the corridor picture (U02): how far it bends away at a depth, how deep the hall is
 * drawn, what stands at its end, and its mark at the far end of the slider. One class a shape, found by the shape's
 * key; the tower's floor rows draw the same shapes as a line (`RowShape`).
 */
export interface HallShape {
  /** How far the hall has turned aside at this depth, in the hall's widths. */
  bend(depth: number): number;
  /** How deep the hall is drawn when this much of it lies ahead and the fog lets `sight` show. */
  reach(ahead: number, sight: number): number;
  /** What stands at the hall's end, drawn once the end is within sight. */
  end(painter: Painter, palette: Palette, hall: HallView, seconds: number): void;
  /** The shape's mark at the far end of the slider, centred on this point. */
  mark(painter: Painter, palette: Palette, point: { readonly x: number; readonly y: number }): void;
}
