import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { ChildMark } from './ChildMark.ts';
import type { Framing } from './Framing.ts';
import type { MinimapView } from './MinimapView.ts';
import type { PlanCamera } from './PlanCamera.ts';
import type { SceneHit } from './SceneHit.ts';

/**
 * A picture whose view pans and zooms (U03: the apartment's plan), as a pure function: where each option it draws
 * stands at a framing, the calls that paint it at a moment, how its view moves at a size, and where the view goes
 * before an option is picked (a doorway's room, the whole plan before leaving; nothing for a relic, taken at once).
 */
export interface PlanDrawing<VM> {
  layout(vm: VM, size: PictureSize, framing: Framing): readonly SceneHit[];
  paint(
    painter: Painter,
    vm: VM,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: ChildMark,
    framing: Framing,
    corner: MinimapView,
  ): void;
  camera(vm: VM, size: PictureSize): PlanCamera;
  stopOf(vm: VM, camera: PlanCamera, id: string): Framing | undefined;
  /** Where the view rests: the room you stand in. */
  rest(vm: VM, camera: PlanCamera): Framing;
  /** The room you stand in, filling the picture (U03d). */
  home(vm: VM, camera: PlanCamera): Framing;
  /** Where the view goes from inside a room before an option is picked: the next room filling the picture, the whole plan before leaving; nothing for a relic. */
  inside(vm: VM, camera: PlanCamera, id: string): Framing | undefined;
}
