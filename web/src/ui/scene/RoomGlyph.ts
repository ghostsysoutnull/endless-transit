import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** The six walls of a room, the pulse of a relic at its heart. */
const WALLS = [
  [0, -1],
  [0.9, -0.5],
  [0.9, 0.5],
  [0, 1],
  [-0.9, 0.5],
  [-0.9, -0.5],
] as const;

/** A room: its walls, a relic pulsing inside. */
export class RoomGlyph implements PoleGlyph {
  paint({ painter, at, radius, seconds, ink, accent }: GlyphMoment): void {
    painter.strokeStyle = ink;
    painter.beginPath();
    WALLS.forEach(([x, y], wall) => {
      if (wall === 0) painter.moveTo(at.x + x * radius, at.y + y * radius);
      else painter.lineTo(at.x + x * radius, at.y + y * radius);
    });
    painter.closePath();
    painter.stroke();
    const size = radius * (0.32 + 0.08 * Math.sin(seconds * 2.4));
    painter.fillStyle = accent;
    painter.beginPath();
    painter.moveTo(at.x, at.y - size);
    painter.lineTo(at.x + size * 0.7, at.y);
    painter.lineTo(at.x, at.y + size);
    painter.lineTo(at.x - size * 0.7, at.y);
    painter.fill();
  }
}
