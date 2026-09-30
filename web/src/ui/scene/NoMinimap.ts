import type { MinimapView } from './MinimapView.ts';

/** No minimap: the whole plan is in the frame. */
export class NoMinimap implements MinimapView {
  holds(): boolean {
    return false;
  }

  paint(): void {
    // Nothing to show: the plan is all in view.
  }
}
