import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { ChildMark } from './ChildMark.ts';
import type { SceneCamera } from './SceneCamera.ts';
import type { SceneHit } from './SceneHit.ts';
import type { Sketch } from './Sketch.ts';

/**
 * A sketch whose picture's view is one number (U02): what `SceneView` draws, never knowing which picture it is. Its
 * calls are the picture's, with the view model already in hand (`ScenePicture` says what each means).
 */
export interface LineSketch extends Sketch {
  layout(size: PictureSize, view: number): readonly SceneHit[];
  paint(
    painter: Painter,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: ChildMark,
    view: number,
    here: ChildMark,
  ): void;
  camera(size: PictureSize): SceneCamera;
}
