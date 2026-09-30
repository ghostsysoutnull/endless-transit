import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { Point } from './Point.ts';

/** What a level's backdrop is painted with at a moment (U04). */
export interface AreaMoment {
  readonly painter: Painter;
  readonly size: PictureSize;
  readonly palette: Palette;
  readonly seconds: number;
  /** The level's address: what its variations are hashed from. */
  readonly address: string;
  /** Where its children stand, in the list's order. */
  readonly spots: readonly Point[];
  /** A null reach's signal, 0 to 100; 0 elsewhere. */
  readonly signal: number;
}

/**
 * A level above the street as a drawing (U04): where its children stand, at least a tap apart, and its backdrop.
 * One class a level, looked up by the level's `AreaLook`.
 */
export interface AreaScene {
  spots(count: number, size: PictureSize, address: string): readonly Point[];
  backdrop(moment: AreaMoment): void;
}
