import type { Painter } from '#ui/canvas/Painter.ts';
import type { Point } from './Point.ts';

/**
 * A face of the corridor as it falls on the picture (U02): a door, or the hall's end — its four corners, near foot,
 * far foot, far top, near top (for the end: left foot, right foot, right top, left top); its box; and a point across
 * it (`u` from its first edge to its second, `v` from its foot to its top), so a panel is traced in the face's own
 * perspective. Value object.
 */
export class Quad {
  readonly #corners: readonly [Point, Point, Point, Point];

  constructor(corners: readonly [Point, Point, Point, Point]) {
    this.#corners = corners;
  }

  /** The door's outline, as a closed path (the caller begins it). */
  trace(painter: Painter): void {
    const [nearFoot, farFoot, farTop, nearTop] = this.#corners;
    painter.moveTo(nearFoot.x, nearFoot.y);
    painter.lineTo(farFoot.x, farFoot.y);
    painter.lineTo(farTop.x, farTop.y);
    painter.lineTo(nearTop.x, nearTop.y);
    painter.closePath();
  }

  /** The point `u` of the way from the near edge to the far one and `v` of the way up. */
  at(u: number, v: number): Point {
    const [nearFoot, farFoot, farTop, nearTop] = this.#corners;
    const foot = {
      x: nearFoot.x + (farFoot.x - nearFoot.x) * u,
      y: nearFoot.y + (farFoot.y - nearFoot.y) * u,
    };
    const top = { x: nearTop.x + (farTop.x - nearTop.x) * u, y: nearTop.y + (farTop.y - nearTop.y) * u };
    return { x: foot.x + (top.x - foot.x) * v, y: foot.y + (top.y - foot.y) * v };
  }

  /** A line across the door from one point of it to another, added to the current path. */
  line(painter: Painter, from: readonly [number, number], to: readonly [number, number]): void {
    const start = this.at(from[0], from[1]);
    const end = this.at(to[0], to[1]);
    painter.moveTo(start.x, start.y);
    painter.lineTo(end.x, end.y);
  }

  left(): number {
    return Math.min(this.#corners[0].x, this.#corners[1].x);
  }

  right(): number {
    return Math.max(this.#corners[0].x, this.#corners[1].x);
  }

  top(): number {
    return Math.min(this.#corners[2].y, this.#corners[3].y);
  }

  bottom(): number {
    return Math.max(this.#corners[0].y, this.#corners[1].y);
  }

  width(): number {
    return this.right() - this.left();
  }

  height(): number {
    return this.bottom() - this.top();
  }

  middle(): Point {
    return { x: (this.left() + this.right()) / 2, y: (this.top() + this.bottom()) / 2 };
  }
}
