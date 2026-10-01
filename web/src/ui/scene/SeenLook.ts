import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { DoorwayFrame } from './DoorwayFrame.ts';
import type { DoorwayLook } from './DoorwayLook.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { SightLook } from './SightLook.ts';
import type { Tint } from './Tint.ts';

/** A room seen — visited, or known from a visited one: floored as strongly as it is seen over the ground, its words in its ink. Value object. */
export class SeenLook implements SightLook {
  readonly #floor: Tint;
  readonly #ink: string;
  readonly #dot: boolean;
  readonly #small: Tint;
  readonly #doorway: DoorwayLook;

  constructor(facts: {
    /** Its floor, over the ground. */
    floor: Tint;
    ink: string;
    /** Whether it carries the visited dot. */
    dot: boolean;
    /** How it shows on the minimap. */
    small: Tint;
    /** How the doorway into it is drawn. */
    doorway: DoorwayLook;
  }) {
    this.#floor = facts.floor;
    this.#ink = facts.ink;
    this.#dot = facts.dot;
    this.#small = facts.small;
    this.#doorway = facts.doorway;
  }

  paintFloor(painter: Painter, palette: Palette, box: PlanBoxOnPicture): void {
    this.#floor.paint(painter, palette, box);
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

  paintDoorway(painter: Painter, palette: Palette, frame: DoorwayFrame, time: number): void {
    this.#doorway.paint(painter, palette, frame, time);
  }
}
