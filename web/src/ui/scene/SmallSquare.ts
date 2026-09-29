import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';

/** A room on the minimap (U03): its box filled in one ink, at one strength. Value object. */
export class SmallSquare {
  readonly #ink: string;
  readonly #alpha: number;

  constructor(ink: string, alpha: number) {
    if (!(alpha >= 0 && alpha <= 1))
      throw new RangeError(`a strength runs from 0 to 1, got ${String(alpha)}`);
    this.#ink = ink;
    this.#alpha = alpha;
  }

  paint(painter: Painter, palette: Palette, box: PlanBoxOnPicture): void {
    painter.fillStyle = palette(this.#ink);
    painter.globalAlpha = this.#alpha;
    painter.fillRect(box.x, box.y, box.width, box.height);
  }
}
