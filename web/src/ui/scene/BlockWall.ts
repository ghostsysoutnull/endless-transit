import type { Painter } from '#ui/canvas/Painter.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { WallPattern } from './WallPattern.ts';

/** Blocks: great stones or slabs in courses, each course's joints halfway along the one below. */
export class BlockWall implements WallPattern {
  trace(painter: Painter, wall: PlanBoxOnPicture): void {
    const courses = 4;
    const height = wall.height / courses;
    const width = wall.width / 3;
    for (let course = 0; course < courses; course++) {
      const top = wall.y + course * height;
      if (course > 0) {
        painter.moveTo(wall.x, top);
        painter.lineTo(wall.x + wall.width, top);
      }
      for (let joint = course % 2 === 0 ? 1 : 0.5; joint < 3; joint++) {
        painter.moveTo(wall.x + joint * width, top);
        painter.lineTo(wall.x + joint * width, top + height);
      }
    }
  }
}
