import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import { Tint } from './Tint.ts';
import type { WallPattern } from './WallPattern.ts';

/** How strongly the wall is washed in its ink, and how strongly its pattern is drawn (the mock's `.05` and `.35`). */
const WASH = 0.05;
const LINES = 0.35;

/** A culture's back wall (U03b): its pattern, in its ink over a faint wash of the same. Value object. */
export class RoomWall {
  readonly #pattern: WallPattern;
  readonly #ink: string;
  readonly #wash: Tint;

  constructor(pattern: WallPattern, ink: string) {
    this.#pattern = pattern;
    this.#ink = ink;
    this.#wash = new Tint(ink, WASH);
  }

  paint(painter: Painter, palette: Palette, wall: PlanBoxOnPicture): void {
    this.#wash.paint(painter, palette, wall);
    painter.strokeStyle = palette(this.#ink);
    painter.globalAlpha = LINES;
    painter.lineWidth = 1;
    painter.beginPath();
    this.#pattern.trace(painter, wall);
    painter.stroke();
  }
}
