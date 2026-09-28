import type { Painter } from '#ui/canvas/Painter.ts';
import type { DoorPanel } from './DoorPanel.ts';
import type { Quad } from './Quad.ts';

/** Metal: two seams across the plate and a row of rivets along each. */
export class MetalPanel implements DoorPanel {
  trace(painter: Painter, door: Quad): void {
    for (const v of [0.33, 0.66]) {
      door.line(painter, [0, v], [1, v]);
      for (const u of [0.2, 0.5, 0.8]) door.line(painter, [u, v + 0.05], [u, v + 0.08]);
    }
  }
}
