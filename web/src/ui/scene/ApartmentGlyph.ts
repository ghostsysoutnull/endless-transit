import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** A door swinging open and shut in its frame. */
export class ApartmentGlyph implements PoleGlyph {
  paint({ painter, at, radius, seconds, ink, accent }: GlyphMoment): void {
    painter.strokeStyle = ink;
    painter.strokeRect(at.x - radius * 0.5, at.y - radius * 0.9, radius, radius * 1.8);
    const open = (Math.sin(seconds * 1.2) * 0.5 + 0.5) * 1.1;
    const hinge = at.x - radius * 0.5;
    painter.strokeStyle = accent;
    painter.beginPath();
    painter.moveTo(hinge, at.y - radius * 0.9);
    painter.lineTo(hinge + Math.cos(open) * radius, at.y - radius * 0.9 + Math.sin(open) * radius * 0.3);
    painter.lineTo(hinge + Math.cos(open) * radius, at.y + radius * 0.9 - Math.sin(open) * radius * 0.1);
    painter.lineTo(hinge, at.y + radius * 0.9);
    painter.stroke();
  }
}
