import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { ChildMark } from './ChildMark.ts';
import type { Framing } from './Framing.ts';
import type { PlanCamera } from './PlanCamera.ts';
import type { SceneHit } from './SceneHit.ts';
import type { Sketch } from './Sketch.ts';

/** A sketch whose view pans and zooms (U03): what `PlanScene` draws; its calls are `PlanDrawing`'s, the view model in hand. */
export interface PlanSketch extends Sketch {
  layout(size: PictureSize, framing: Framing): readonly SceneHit[];
  paint(
    painter: Painter,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: ChildMark,
    framing: Framing,
  ): void;
  camera(size: PictureSize): PlanCamera;
  stopOf(camera: PlanCamera, id: string): Framing | undefined;
  rest(camera: PlanCamera): Framing;
}
