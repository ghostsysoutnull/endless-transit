import type { Painter } from '#ui/canvas/Painter.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { WallPattern } from './WallPattern.ts';

/** Panels: three tall panels with rounded heads, framed in gilt or mahogany (the mock's panels). */
export class ArchWall implements WallPattern {
  trace(painter: Painter, wall: PlanBoxOnPicture): void {
    const width = wall.width / 3;
    const radius = width * 0.3;
    for (let panel = 0; panel < 3; panel++) {
      const middle = wall.x + width * (panel + 0.5);
      const spring = wall.y + wall.height * 0.2 + radius;
      const foot = wall.y + wall.height * 0.85;
      painter.moveTo(middle - radius, foot);
      painter.lineTo(middle - radius, spring);
      painter.arc(middle, spring, radius, Math.PI, Math.PI * 2);
      painter.lineTo(middle + radius, foot);
    }
  }
}
