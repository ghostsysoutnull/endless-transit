import type { Painter } from '#ui/canvas/Painter.ts';
import type { DoorPanel } from './DoorPanel.ts';
import type { DoorQuad } from './DoorQuad.ts';

/** Timber: planks standing side by side. */
export class TimberPanel implements DoorPanel {
  trace(painter: Painter, door: DoorQuad): void {
    for (const u of [0.25, 0.5, 0.75]) door.line(painter, [u, 0], [u, 1]);
  }
}
