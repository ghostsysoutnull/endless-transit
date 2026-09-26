import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { SceneHit } from './SceneHit.ts';

/**
 * A place drawn as a pure function (U01b): where each child stands at a size, and the calls that paint it at
 * a moment — the same view-model, size, time and lit child always make the same calls. `time` is the clock's,
 * in milliseconds; a still is painted at time 0. `lit` is the id of the child pointed at in either the picture
 * or the list, empty when none.
 */
export interface ScenePicture<VM> {
  layout(vm: VM, size: PictureSize): readonly SceneHit[];
  paint(painter: Painter, vm: VM, size: PictureSize, palette: Palette, time: number, lit: string): void;
}
