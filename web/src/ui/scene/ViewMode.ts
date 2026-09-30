import type { Framing } from './Framing.ts';
import type { MinimapView } from './MinimapView.ts';
import type { PlanCamera } from './PlanCamera.ts';
import type { PlanSketch } from './PlanSketch.ts';
import type { RoomFrame } from './RoomFrame.ts';

/**
 * How the plan's host shows where you stand (U03d): standing in the room, which fills the picture (`InRoom`), or
 * looking over the apartment's plan, panned and pinched (`OverPlan`). The MAP key flips one to the other.
 */
export interface ViewMode extends RoomFrame {
  /** Where the view goes when this mode starts. */
  rest(sketch: PlanSketch, camera: PlanCamera): Framing;
  /** Where the view goes before an option is picked; nothing for one picked at once (a relic). */
  stop(sketch: PlanSketch, camera: PlanCamera, id: string): Framing | undefined;
  /** A framing as this mode keeps it. */
  kept(camera: PlanCamera, framing: Framing): Framing;
  /** Where the view stands once the picture changes size (the phone's address bar), from where it stood. */
  refit(sketch: PlanSketch, camera: PlanCamera, framing: Framing): Framing;
  /** The corner map at this framing. */
  corner(camera: PlanCamera, framing: Framing): MinimapView;
  /** Whether fingers pan and pinch the view. */
  moves(): boolean;
  /** Whether the MAP key stands pressed. */
  pressed(): boolean;
  /** The other mode. */
  flipped(): ViewMode;
}
