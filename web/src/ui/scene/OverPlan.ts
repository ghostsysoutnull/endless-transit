import type { Framing } from './Framing.ts';
import type { KeyWords } from './KeyWords.ts';
import type { MapKey } from './MapKey.ts';
import { InRoom } from './InRoom.ts';
import type { MinimapView } from './MinimapView.ts';
import type { PlanCamera } from './PlanCamera.ts';
import type { PlanSketch } from './PlanSketch.ts';
import type { ViewMode } from './ViewMode.ts';

/** Looking over the apartment's plan (U03d, as U03 drew it): the whole plan first, panned and pinched, the corner map when it runs past the frame. */
export class OverPlan implements ViewMode {
  rest(_sketch: PlanSketch, camera: PlanCamera): Framing {
    return camera.whole();
  }

  room(camera: PlanCamera, index: number): Framing {
    return camera.room(index);
  }

  stop(sketch: PlanSketch, camera: PlanCamera, id: string): Framing | undefined {
    return sketch.stopOf(camera, id, this);
  }

  kept(camera: PlanCamera, framing: Framing): Framing {
    return camera.clamp(framing);
  }

  /** The view stays where it was looked at; `kept` holds it in range. */
  refit(_sketch: PlanSketch, _camera: PlanCamera, framing: Framing): Framing {
    return framing;
  }

  corner(camera: PlanCamera, framing: Framing): MinimapView {
    return camera.minimap(framing);
  }

  moves(): boolean {
    return true;
  }

  pressed(): boolean {
    return true;
  }

  keyWords(key: MapKey): KeyWords {
    return key.toRoom;
  }

  flipped(): ViewMode {
    return new InRoom();
  }
}
