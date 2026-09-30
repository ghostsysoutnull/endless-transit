import type { Painter } from '#ui/canvas/Painter.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';

/**
 * How one family of walls is patterned on the back wall of the room you stand in (U03b; the mock's shoji, plates and
 * panels, `transit-reframed.html:913-915`): lines traced across the wall, added to the current path — the room strokes
 * them faintly in its culture's ink. One class a family, found by the culture's key.
 */
export interface WallPattern {
  trace(painter: Painter, wall: PlanBoxOnPicture): void;
}
