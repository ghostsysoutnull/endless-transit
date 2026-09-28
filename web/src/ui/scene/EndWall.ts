import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { HallView } from './HallView.ts';

/**
 * Owns one fact: how a hall's blank end wall is drawn (the mock's, `transit-reframed.html:838`) — filled across the
 * hall where it ends, its edge in the frame's cyan through the fog. The service corridor and the curved gallery
 * both end in it.
 */
export class EndWall {
  draw(painter: Painter, palette: Palette, hall: HallView): void {
    if (!hall.endInSight()) return;
    const z = hall.endAhead();
    const corners = [
      hall.project(-1, hall.floor(), z),
      hall.project(1, hall.floor(), z),
      hall.project(1, hall.ceiling(), z),
      hall.project(-1, hall.ceiling(), z),
    ];
    painter.beginPath();
    for (const [index, corner] of corners.entries()) {
      if (index === 0) painter.moveTo(corner.x, corner.y);
      else painter.lineTo(corner.x, corner.y);
    }
    painter.closePath();
    painter.globalAlpha = 1;
    painter.fillStyle = palette('panel');
    painter.fill();
    painter.globalAlpha = 0.5 * hall.fog(z) + 0.1;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1;
    painter.stroke();
  }
}
