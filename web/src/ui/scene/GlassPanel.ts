import type { Painter } from '#ui/canvas/Painter.ts';
import type { DoorPanel } from './DoorPanel.ts';
import type { Quad } from './Quad.ts';

/** Glass: two glints slanting across the pane. */
export class GlassPanel implements DoorPanel {
  trace(painter: Painter, door: Quad): void {
    door.line(painter, [0.2, 0.3], [0.55, 0.85]);
    door.line(painter, [0.4, 0.25], [0.6, 0.55]);
  }
}
