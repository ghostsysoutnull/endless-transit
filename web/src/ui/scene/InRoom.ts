import type { Framing } from './Framing.ts';
import type { MinimapView } from './MinimapView.ts';
import { NoMinimap } from './NoMinimap.ts';
import { OverPlan } from './OverPlan.ts';
import type { PlanCamera } from './PlanCamera.ts';
import type { PlanSketch } from './PlanSketch.ts';
import type { ViewMode } from './ViewMode.ts';

/** Standing in the room (U03d): it fills the picture, a doorway walks you into the next one filling it too; the view holds still. */
export class InRoom implements ViewMode {
  room(camera: PlanCamera, index: number): Framing {
    return camera.inside(index);
  }

  rest(sketch: PlanSketch, camera: PlanCamera): Framing {
    return sketch.rest(camera, this);
  }

  stop(sketch: PlanSketch, camera: PlanCamera, id: string): Framing | undefined {
    return sketch.stopOf(camera, id, this);
  }

  kept(_camera: PlanCamera, framing: Framing): Framing {
    return framing;
  }

  /** The room fills the picture at its new size. */
  refit(sketch: PlanSketch, camera: PlanCamera): Framing {
    return this.rest(sketch, camera);
  }

  corner(): MinimapView {
    return new NoMinimap();
  }

  moves(): boolean {
    return false;
  }

  pressed(): boolean {
    return false;
  }

  flipped(): ViewMode {
    return new OverPlan();
  }
}
