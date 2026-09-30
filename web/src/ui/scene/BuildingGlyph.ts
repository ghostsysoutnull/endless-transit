import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** A tower, its elevator car riding up and down its shaft. */
export class BuildingGlyph implements PoleGlyph {
  paint({ painter, at, radius, seconds, ink, accent }: GlyphMoment): void {
    painter.strokeStyle = ink;
    painter.strokeRect(at.x - radius * 0.5, at.y - radius, radius, radius * 2);
    painter.beginPath();
    painter.moveTo(at.x - radius * 0.2, at.y - radius);
    painter.lineTo(at.x - radius * 0.2, at.y + radius);
    painter.stroke();
    painter.fillStyle = accent;
    painter.fillRect(
      at.x - radius * 0.45,
      at.y + Math.sin(seconds * 0.9) * radius * 0.7 - radius * 0.15,
      radius * 0.22,
      radius * 0.3,
    );
  }
}
