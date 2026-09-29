import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { SightLook } from './SightLook.ts';
import type { SmallSquare } from './SmallSquare.ts';

/** A room seen — visited, or known from a visited one: floored as strongly as it is seen over the ground, its words in its ink. Value object. */
export class SeenLook implements SightLook {
  readonly #floor: number;
  readonly #ink: string;
  readonly #dot: boolean;
  readonly #small: SmallSquare;

  constructor(facts: {
    /** How strongly its floor shows, 0 to 1. */
    floor: number;
    ink: string;
    /** Whether it carries the visited dot. */
    dot: boolean;
    /** How it shows on the minimap. */
    small: SmallSquare;
  }) {
    if (!(facts.floor >= 0 && facts.floor <= 1))
      throw new RangeError(`a strength runs from 0 to 1, got ${String(facts.floor)}`);
    this.#floor = facts.floor;
    this.#ink = facts.ink;
    this.#dot = facts.dot;
    this.#small = facts.small;
  }

  paintFloor(painter: Painter, palette: Palette, box: PlanBoxOnPicture): void {
    painter.fillStyle = palette('panel');
    painter.globalAlpha = this.#floor;
    painter.fillRect(box.x, box.y, box.width, box.height);
  }

  label(write: (ink: string) => void): void {
    write(this.#ink);
  }

  paintDot(painter: Painter, palette: Palette, box: PlanBoxOnPicture): void {
    if (!this.#dot || box.width <= 14) return;
    painter.fillStyle = palette('yl');
    painter.globalAlpha = 1;
    painter.beginPath();
    painter.arc(box.x + box.width - 7, box.y + box.height - 7, 2.3, 0, Math.PI * 2);
    painter.fill();
  }

  paintSmall(painter: Painter, palette: Palette, box: PlanBoxOnPicture): void {
    this.#small.paint(painter, palette, box);
  }
}
