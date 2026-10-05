import type { EmblemInk } from './EmblemInk.ts';
import type { EmblemMoment } from './EmblemMoment.ts';
import type { EndingEmblem } from './EndingEmblem.ts';

/** Settled: a room, its door swinging shut. */
export class SettledEmblem implements EndingEmblem {
  readonly #ink: EmblemInk;

  constructor(ink: EmblemInk) {
    this.#ink = ink;
  }

  paint({ painter, size, palette, seconds }: EmblemMoment): void {
    const side = Math.min(size.width, size.height) * 0.6;
    const left = (size.width - side) / 2;
    const top = (size.height - side) / 2;
    painter.strokeStyle = palette('frame');
    painter.lineWidth = 1.5;
    painter.strokeRect(left, top, side, side);
    const gap = side * 0.3;
    const hinge = { x: left + side * 0.35, y: top + side };
    // The doorway: a gap in the wall.
    this.#ink.line(painter, [hinge, { x: hinge.x + gap, y: hinge.y }], palette('ground'), 3);
    const angle = (Math.PI / 2) * (0.1 + 0.9 * (1 - Math.abs(Math.sin(seconds * 0.7))));
    this.#ink.line(
      painter,
      [hinge, { x: hinge.x + Math.cos(-angle) * gap, y: hinge.y + Math.sin(-angle) * gap }],
      palette('yl'),
      2,
    );
    this.#ink.ring(painter, hinge, gap, palette('dim'), 1, 0.3);
    this.#ink.dot(
      painter,
      { x: left + side * 0.65, y: top + side * 0.45 },
      3,
      palette('wh'),
      0.6 + 0.4 * Math.sin(seconds * 2),
    );
  }
}
