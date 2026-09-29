import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { SceneCamera } from './SceneCamera.ts';
import type { SceneChild } from './SceneChild.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import type { SceneVM } from './SceneVM.ts';

/**
 * A view model bound to the picture that draws it (U02): what `SceneView` draws, never knowing which picture it is.
 * Its calls are the picture's, with the view model already in hand (`ScenePicture` says what each means).
 */
export interface Sketch {
  /** What every picture's view model shares. */
  frame(): SceneVM<SceneChild>;
  /** Whether there is a picture at all: a place no picture draws keeps the screen as it was. */
  drawn(): boolean;
  layout(size: PictureSize, view: number): readonly SceneHit[];
  paint(
    painter: Painter,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: string,
    view: number,
    here: string,
  ): void;
  camera(size: PictureSize): SceneCamera;
  /** Whether another sketch is drawn by the same picture: the screen keeps its scene while it is. */
  samePicture(other: Sketch): boolean;
  /** Whether this picture draws it. */
  drawnBy(picture: ScenePicture<never>): boolean;
}
