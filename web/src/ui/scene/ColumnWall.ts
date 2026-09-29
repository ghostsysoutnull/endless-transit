import type { Painter } from '#ui/canvas/Painter.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { WallPattern } from './WallPattern.ts';

/** Columns: four fluted columns set into the wall, a frieze along the top. */
export class ColumnWall implements WallPattern {
  trace(painter: Painter, wall: PlanBoxOnPicture): void {
    const frieze = wall.y + wall.height * 0.12;
    painter.moveTo(wall.x, frieze);
    painter.lineTo(wall.x + wall.width, frieze);
    for (let column = 1; column <= 4; column++) {
      const x = wall.x + (wall.width * column) / 5;
      for (const flute of [-3, 0, 3]) {
        painter.moveTo(x + flute, frieze);
        painter.lineTo(x + flute, wall.y + wall.height);
      }
    }
  }
}
