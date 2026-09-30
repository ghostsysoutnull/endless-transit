import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { OptionVM } from '#ui/OptionVM.ts';
import type { MovesLayout } from './MovesLayout.ts';
import type { PictureBook } from './PictureBook.ts';

/**
 * What the place's picture draws (U01b, U02): one member per drawn kind, holding that picture's own view model, and
 * `Undrawn` for a place no picture draws. The screen asks it for its sketch, never which kind it is.
 */
export interface Drawing {
  /** What every picture's view model shares: where the place stands and its children. */
  frame(): SceneVM<SceneChild>;
  /** Its view model bound to the picture of its kind. */
  sketchedBy(book: PictureBook): Sketch;
  /** Where its place's moves sit (U03c): under the picture, or in the dock. */
  arrange(moves: readonly OptionVM[]): MovesLayout;
}
