import type { PlanRoom } from '#engine/model/PlanRoom.ts';
import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { FloorPlan } from './FloorPlan.ts';
import type { Framing } from './Framing.ts';
import type { MinimapView } from './MinimapView.ts';
import type { Point } from './Point.ts';
import { SIGHT_LOOKS } from './SightLooks.ts';

/** The minimap's most width (share of the picture, and pixels) and height, its gap from the corner, its frame (the mock's, `transit-reframed.html:898-903`). */
const WIDEST = { share: 0.3, pixels: 118 };
const TALLEST = 84;
const CORNER = 10;
const FRAME = 5;
/** A tap this close outside the minimap still falls on it. */
const REACH = 6;

/** The whole plan small in the top right corner, the rooms by how far they are seen, the view's box on it. Immutable. */
export class Minimap implements MinimapView {
  readonly #plan: FloorPlan;
  readonly #size: PictureSize;
  /** CSS pixels a plan unit spans on the minimap. */
  readonly #scale: number;
  readonly #left: number;
  readonly #top: number;

  constructor(plan: FloorPlan, size: PictureSize) {
    this.#plan = plan;
    this.#size = size;
    this.#scale = Math.min(
      Math.min(WIDEST.pixels, size.width * WIDEST.share) / plan.width(),
      TALLEST / plan.height(),
    );
    this.#left = size.width - plan.width() * this.#scale - CORNER;
    this.#top = CORNER;
  }

  holds(point: Point): boolean {
    return (
      point.x >= this.#left - REACH &&
      point.x <= this.#left + this.#plan.width() * this.#scale + REACH &&
      point.y >= this.#top - REACH &&
      point.y <= this.#top + this.#plan.height() * this.#scale + REACH
    );
  }

  paint(painter: Painter, palette: Palette, rooms: readonly PlanRoom[], framing: Framing): void {
    const width = this.#plan.width() * this.#scale;
    const height = this.#plan.height() * this.#scale;
    painter.globalAlpha = 0.9;
    painter.fillStyle = palette('ground');
    painter.fillRect(this.#left - FRAME, this.#top - FRAME, width + FRAME * 2, height + FRAME * 2);
    painter.globalAlpha = 0.6;
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1;
    painter.strokeRect(this.#left - FRAME, this.#top - FRAME, width + FRAME * 2, height + FRAME * 2);
    this.#plan.rooms().forEach((box, index) => {
      SIGHT_LOOKS[rooms[index]?.sight ?? 'fog'].paintSmall(painter, palette, {
        x: this.#left + box.left() * this.#scale + 0.5,
        y: this.#top + box.top() * this.#scale + 0.5,
        width: box.width() * this.#scale - 1,
        height: box.height() * this.#scale - 1,
      });
    });
    // The view's box, as much of it as lies on the plan.
    const span = (at: number, length: number, half: number): readonly [number, number] => [
      Math.min(Math.max(at - half, 0), length),
      Math.min(Math.max(at + half, 0), length),
    ];
    const [left, right] = span(framing.x(), this.#plan.width(), this.#size.width / 2 / framing.scale());
    const [top, bottom] = span(framing.y(), this.#plan.height(), this.#size.height / 2 / framing.scale());
    painter.globalAlpha = 1;
    painter.strokeStyle = palette('yl');
    painter.lineWidth = 1.2;
    painter.strokeRect(
      this.#left + left * this.#scale,
      this.#top + top * this.#scale,
      (right - left) * this.#scale,
      (bottom - top) * this.#scale,
    );
  }
}
