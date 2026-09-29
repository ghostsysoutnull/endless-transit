import type { Painter } from '#ui/canvas/Painter.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { WallPattern } from './WallPattern.ts';

/** Plates: sheets bolted side by side, four across and three high, a rivet in each corner (the mock's plates). */
export class PlateWall implements WallPattern {
  trace(painter: Painter, wall: PlanBoxOnPicture): void {
    const width = wall.width / 4;
    const height = wall.height / 3;
    for (let column = 0; column < 4; column++) {
      for (let row = 0; row < 3; row++) {
        const x = wall.x + column * width;
        const y = wall.y + row * height;
        painter.rect(x + 3, y + 3, width - 6, height - 6);
        painter.rect(x + 5, y + 5, 1, 1);
      }
    }
  }
}
