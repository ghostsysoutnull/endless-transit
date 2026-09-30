import type { Framing } from './Framing.ts';
import type { PlanCamera } from './PlanCamera.ts';

/** How the view frames one room of the plan (U03d): standing in it, filling the picture, or at rest over the plan. */
export interface RoomFrame {
  room(camera: PlanCamera, index: number): Framing;
}
