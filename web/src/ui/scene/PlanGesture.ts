import type { Framing } from './Framing.ts';
import type { Point } from './Point.ts';

/** Fingers on the plan (U03): one dragging it (`PlanDrag`) or two pinching it (`Pinch`) — the host tells it where they are. */
export interface PlanGesture {
  /** A finger moved: `fingers` on the picture by pointer id, `page` the moving finger's point on the page. */
  follow(fingers: ReadonlyMap<number, Point>, page: Point, pointer: number): void;
  /** The framing the fingers put the plan at now (unclamped); nothing while it is still a tap. */
  framing(): Framing | undefined;
  /** The framing it has moved the plan to at this moment: what a let-go speed is worked out from. */
  sample(time: number, framing: Framing): void;
  /** Whether it is over once this finger lifts, these fingers left on the picture. */
  endsWith(pointer: number, fingers: ReadonlyMap<number, Point>): boolean;
  /** Whether it moved the plan: the click that ends it is then no tap. */
  moved(): boolean;
  /** How fast it was moving the plan when it ended, in plan units a second on each axis. */
  speed(now: number): Point;
}
