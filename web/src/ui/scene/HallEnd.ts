import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { Quad } from './Quad.ts';

/** What a hall that ends in a wall asks of the wall: to draw it across the hall's end face, through the fog there. */
export interface HallEnd {
  draw(painter: Painter, palette: Palette, face: Quad, fog: number): void;
}
