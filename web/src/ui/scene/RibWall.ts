import type { Painter } from '#ui/canvas/Painter.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { WallPattern } from './WallPattern.ts';

/** Ribs: living struts rising in slow waves, like sinew or vine. */
export class RibWall implements WallPattern {
  trace(painter: Painter, wall: PlanBoxOnPicture): void {
    const steps = 12;
    for (let rib = 1; rib < 6; rib++) {
      const x = wall.x + (wall.width * rib) / 6;
      painter.moveTo(x, wall.y);
      for (let step = 1; step <= steps; step++) {
        const along = step / steps;
        painter.lineTo(x + Math.sin(along * Math.PI * 2 + rib) * 4, wall.y + along * wall.height);
      }
    }
  }
}
