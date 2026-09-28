import type { Painter } from '#ui/canvas/Painter.ts';
import type { DoorPanel } from './DoorPanel.ts';
import type { DoorQuad } from './DoorQuad.ts';

/** Stone: coarse blocks, the joints of each course set between the ones below. */
export class StonePanel implements DoorPanel {
  trace(painter: Painter, door: DoorQuad): void {
    for (const v of [0.25, 0.5, 0.75]) door.line(painter, [0, v], [1, v]);
    for (const [course, joints] of [
      [0, [0.5]],
      [1, [0.25, 0.75]],
      [2, [0.5]],
      [3, [0.25, 0.75]],
    ] as const) {
      for (const u of joints) door.line(painter, [u, course * 0.25], [u, (course + 1) * 0.25]);
    }
  }
}
