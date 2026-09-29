import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { SightLook } from './SightLook.ts';

/** A room seen — visited, or known from a visited one: floored as strongly as it is seen, its words in its ink. Value object. */
export class SeenLook implements SightLook {
  readonly #floor: number;
  readonly #ink: string;
  readonly #dot: boolean;
  readonly #small: { readonly ink: string; readonly alpha: number };

  constructor(facts: {
    /** How strongly its floor shows, 0 to 1. */
    floor: number;
    ink: string;
    /** Whether it carries the visited dot. */
    dot: boolean;
    /** How it shows on the minimap. */
    small: { readonly ink: string; readonly alpha: number };
  }) {
    this.#floor = facts.floor;
    this.#ink = facts.ink;
    this.#dot = facts.dot;
    this.#small = facts.small;
  }

  paintFloor(painter: Painter, palette: Palette, box: PlanBoxOnPicture): void {
    painter.fillStyle = palette('ground');
    painter.globalAlpha = 1;
    painter.fillRect(box.x, box.y, box.width, box.height);
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
    painter.fillStyle = palette(this.#small.ink);
    painter.globalAlpha = this.#small.alpha;
    painter.fillRect(box.x, box.y, box.width, box.height);
  }
}
