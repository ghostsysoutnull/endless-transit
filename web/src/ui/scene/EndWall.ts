import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { HallEnd } from './HallEnd.ts';
import type { Quad } from './Quad.ts';

/**
 * Owns one fact: how a hall's blank end wall is drawn (the mock's, `transit-reframed.html:838`) — filled across the
 * hall's end face, its edge in the frame's cyan through the fog. The service corridor and the curved gallery both
 * end in it.
 */
export class EndWall implements HallEnd {
  draw(painter: Painter, palette: Palette, face: Quad, fog: number): void {
    painter.beginPath();
    face.trace(painter);
    painter.globalAlpha = 1;
    painter.fillStyle = palette('panel');
    painter.fill();
    painter.globalAlpha = 0.5 * fog + 0.1;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1;
    painter.stroke();
  }
}
