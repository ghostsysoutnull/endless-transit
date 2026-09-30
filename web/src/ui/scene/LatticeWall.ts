import type { Painter } from '#ui/canvas/Painter.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { WallPattern } from './WallPattern.ts';

/** A lattice: screens of paper or plastic in a grid of slats (the mock's shoji). */
export class LatticeWall implements WallPattern {
  trace(painter: Painter, wall: PlanBoxOnPicture): void {
    for (let column = 1; column < 8; column++) {
      const x = wall.x + (wall.width * column) / 8;
      painter.moveTo(x, wall.y);
      painter.lineTo(x, wall.y + wall.height);
    }
    for (let row = 1; row < 5; row++) {
      const y = wall.y + (wall.height * row) / 5;
      painter.moveTo(wall.x, y);
      painter.lineTo(wall.x + wall.width, y);
    }
  }
}
