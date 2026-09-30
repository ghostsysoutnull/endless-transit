import type { Easing } from './Easing.ts';
import type { Framing } from './Framing.ts';
import type { PlanCamera } from './PlanCamera.ts';

/**
 * What a gesture on the plan is told as it ends (U03c), so it can say how the view goes on: the camera, where the view
 * stands now (kept in range) and where it rests in the room, the moment, whether motion is reduced, and the two easings.
 */
export interface LetGo {
  readonly camera: PlanCamera;
  readonly framing: Framing;
  readonly rest: Framing;
  readonly now: number;
  /** Reduced motion: a let-go view does not coast. */
  readonly still: boolean;
  readonly ride: Easing;
  readonly coast: Easing;
}
