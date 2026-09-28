import type { Painter } from '#ui/canvas/Painter.ts';
import type { RoofAt } from './RoofAt.ts';
import type { RoofDrawer } from './RoofDrawer.ts';

/** A flat roof with a parapet: a line across the top, just above the base (the tower's). */
export class ParapetRoof implements RoofDrawer {
  trace(painter: Painter, at: RoofAt): void {
    painter.moveTo(at.left, at.base - 3);
    painter.lineTo(at.right, at.base - 3);
  }
}
