import type { Painter } from '#ui/canvas/Painter.ts';
import type { DoorPanel } from './DoorPanel.ts';
import type { DoorQuad } from './DoorQuad.ts';

/** Bone: a lattice of struts crossing both ways. */
export class BonePanel implements DoorPanel {
  trace(painter: Painter, door: DoorQuad): void {
    for (const start of [-0.5, 0, 0.5]) {
      door.line(painter, [0, start], [1, start + 0.5]);
      door.line(painter, [0, start + 0.5], [1, start]);
    }
  }
}
