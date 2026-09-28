import type { DoorPanel } from './DoorPanel.ts';

/** Any other material: a plain door, no pattern. */
export class PlainPanel implements DoorPanel {
  trace(): void {
    // Plain: nothing traced.
  }
}
