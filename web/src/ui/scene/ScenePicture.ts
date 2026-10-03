import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { SceneCamera } from './SceneCamera.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ChildMark } from './ChildMark.ts';

/**
 * A place drawn as a pure function (U01b): where each child stands at a size, and the calls that paint it at
 * a moment — the same view-model, size, time, lit child and view always make the same calls. `time` is the
 * clock's, in milliseconds; a still is painted at time 0. `lit` marks the child pointed at in either the
 * picture or the list, or none. `view` is where the picture's camera stands (U02: the tower's car, the
 * corridor's walk), owned by the scene host; a picture without a camera ignores it. `here` marks the child
 * you stand by — the one you came back out of — or none; a picture with nothing to mark ignores it.
 */
export interface ScenePicture<VM> {
  layout(vm: VM, size: PictureSize, view: number): readonly SceneHit[];
  paint(
    painter: Painter,
    vm: VM,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: ChildMark,
    view: number,
    here: ChildMark,
  ): void;
  /** How the picture's view moves at this size; a camera that never moves for a picture that stands still (an area, a street that fits its picture). */
  camera(vm: VM, size: PictureSize): SceneCamera;
}
