import type { AreaInk } from './AreaInk.ts';
import type { GlyphMoment, PoleGlyph } from './PoleGlyph.ts';

/** A planet: a globe turning, its meridian sweeping across, its equator. */
export class PlanetGlyph implements PoleGlyph {
  readonly #ink: AreaInk;

  constructor(ink: AreaInk) {
    this.#ink = ink;
  }

  paint({ painter, at, radius, seconds, ink }: GlyphMoment): void {
    const globe = radius * 0.8;
    painter.strokeStyle = ink;
    painter.beginPath();
    painter.arc(at.x, at.y, globe, 0, Math.PI * 2);
    painter.stroke();
    painter.globalAlpha = 0.6;
    this.#ink.line(painter, this.#ink.ellipse(at, Math.abs(Math.sin(seconds * 0.8)) * globe, globe));
    painter.stroke();
    painter.beginPath();
    painter.moveTo(at.x - globe, at.y);
    painter.lineTo(at.x + globe, at.y);
    painter.stroke();
    painter.globalAlpha = 1;
  }
}
