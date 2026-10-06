import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';

/** What an ending's emblem is painted with at a moment: the painter, its size, its inks, and the seconds on the clock (0 holds it still). */
export interface EmblemMoment {
  readonly painter: Painter;
  readonly size: PictureSize;
  readonly palette: Palette;
  readonly seconds: number;
}
