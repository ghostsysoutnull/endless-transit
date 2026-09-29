import type { Painter } from '#ui/canvas/Painter.ts';

/** How a relic is drawn on the plan (U03, the mock's): a diamond, taller than wide — traced as a path to fill or stroke. */
export class Diamond {
  trace(painter: Painter, x: number, y: number, radius: number): void {
    painter.beginPath();
    painter.moveTo(x, y - radius);
    painter.lineTo(x + radius * 0.7, y);
    painter.lineTo(x, y + radius);
    painter.lineTo(x - radius * 0.7, y);
    painter.closePath();
  }
}
