import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** A street running away from you, its lamps' light moving down the middle. */
export class StreetGlyph implements PoleGlyph {
  paint({ painter, at, radius, seconds, ink, accent }: GlyphMoment): void {
    painter.strokeStyle = ink;
    painter.beginPath();
    painter.moveTo(at.x - radius * 0.35, at.y - radius);
    painter.lineTo(at.x - radius * 0.75, at.y + radius);
    painter.moveTo(at.x + radius * 0.35, at.y - radius);
    painter.lineTo(at.x + radius * 0.75, at.y + radius);
    painter.stroke();
    painter.fillStyle = accent;
    for (let dash = 0; dash < 3; dash++) {
      const along = (seconds * 0.6 + dash / 3) % 1;
      painter.fillRect(at.x - 1, at.y - radius + along * radius * 2, 2, radius * 0.3);
    }
  }
}
