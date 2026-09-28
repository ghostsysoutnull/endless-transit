import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';

/**
 * How one corridor shape runs as a line on the tower's floor row (U02): how far the line bows, where it stops, and
 * what it adds — traced into the line's open path (`wall`) or drawn once the line is stroked (`tail`). One class a
 * shape, found by the shape's key.
 */
export interface RowShape {
  /** How far the line rises at its middle, for a row this tall. */
  bow(row: number): number;
  /** Where the line ends, between its start and the row's full width. */
  reach(from: number, full: number): number;
  /** Traced into the open path after the line, at its end. */
  wall(painter: Painter, to: number, line: number): void;
  /** Drawn after the line is stroked, at its end. */
  tail(painter: Painter, palette: Palette, to: number, line: number): void;
}
