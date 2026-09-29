import type { Framing } from './Framing.ts';
import type { MinimapView } from './MinimapView.ts';
import type { Point } from './Point.ts';

/** No minimap: the whole plan is in the frame. */
export class NoMinimap implements MinimapView {
  holds(): boolean {
    return false;
  }

  framingAt(_point: Point, from: Framing): Framing {
    return from;
  }

  paint(): void {
    // Nothing to show: the plan is all in view.
  }
}
