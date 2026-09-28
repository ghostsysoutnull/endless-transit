import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { CameraTrack } from './CameraTrack.ts';
import type { Glow } from './Glow.ts';
import type { HallShape } from './HallShape.ts';
import type { HallView } from './HallView.ts';

/** The band (the mock's `.scrub`, `transit-reframed.html:74-84`): this far in from the sides and the foot, this tall. */
const INSET = 10;
const BAND = 52;
/** The track inside the band: in from its left for the elevator's mark, in from its right for the hall's end. */
const TRACK_LEFT = 34;
const TRACK_RIGHT = 76;
/** The window spans this much of the hall and is at least this wide; a finger holds it by its middle. */
const WINDOW = 9;
const WINDOW_LEAST = 26;
const GRIP = WINDOW / 2;

/**
 * The corridor's slider (U02; the mock's `.scrub`, `:1322-1333, 1400-1404`), for one size and one hall seen from one
 * view: the band along the picture's foot the scene host lays the real slider over, the track inside it and how a
 * point on it maps to the view and back; and its drawing — a tick per door by wall and state, yellow once visited,
 * the window you see, you, the elevator at the near end and the hall's mark at the far one. A hall without doors has
 * none. Value object.
 */
export class CorridorSlider {
  readonly #size: PictureSize;
  readonly #hall: HallView;

  constructor(facts: { size: PictureSize; hall: HallView }) {
    this.#size = facts.size;
    this.#hall = facts.hall;
  }

  /** The band as the camera's track: along `x`, the views at its two ends as a finger holding the window reads them. */
  track(): CameraTrack {
    const band = this.#band();
    return {
      ...band,
      axis: 'x',
      from: this.#valueAt(band.x),
      to: this.#valueAt(band.x + band.width),
    };
  }

  /** The slider over the picture; `doors` in the hall's order, each its state's ink and whether it was visited. */
  draw(
    painter: Painter,
    palette: Palette,
    doors: readonly { readonly ink: string; readonly visited: boolean }[],
    glow: Glow,
    shape: HallShape,
  ): void {
    const hall = this.#hall;
    if (!hall.walks()) return;
    const band = this.#band();
    const middle = band.y + band.height / 2;
    this.#round(painter, band.x, band.y, band.width, band.height);
    painter.globalAlpha = 0.88;
    painter.fillStyle = palette('ground');
    painter.fill();
    painter.globalAlpha = 1;
    painter.strokeStyle = palette('rule-hi');
    painter.lineWidth = 1;
    painter.stroke();
    const left = this.#trackLeft();
    painter.globalAlpha = 0.35;
    painter.fillStyle = palette('cy');
    painter.fillRect(left, middle - 1, this.#trackWidth(), 2);
    for (const [index, door] of doors.entries()) {
      painter.globalAlpha = door.visited ? 1 : 0.8;
      painter.fillStyle = palette(door.visited ? 'yl' : door.ink);
      painter.fillRect(
        this.#xOf(hall.doorAt(index)) - 1,
        hall.sideOf(index) < 0 ? middle - 14 : middle + 5,
        2,
        9,
      );
    }
    const view = hall.view();
    const you = this.#xOf(view);
    const span = Math.max(WINDOW_LEAST, this.#xOf(view + Math.min(WINDOW, hall.length() - view)) - you);
    this.#round(painter, you, middle - 16, span, 32);
    painter.globalAlpha = 0.14;
    painter.fillStyle = palette('cy');
    painter.fill();
    painter.globalAlpha = 1;
    painter.strokeStyle = palette('cy');
    painter.stroke();
    glow.at(painter, { x: you, y: middle }, 14, palette('yl'), 0.8);
    painter.globalAlpha = 1;
    painter.fillStyle = palette('yl');
    painter.beginPath();
    painter.arc(you, middle, 6, 0, Math.PI * 2);
    painter.fill();
    this.#elevator(painter, palette, band.x + 17, middle);
    shape.mark(painter, palette, { x: band.x + band.width - 38, y: middle });
  }

  #band(): { readonly x: number; readonly y: number; readonly width: number; readonly height: number } {
    return {
      x: INSET,
      y: this.#size.height - INSET - BAND,
      width: this.#size.width - 2 * INSET,
      height: BAND,
    };
  }

  #trackLeft(): number {
    return this.#band().x + TRACK_LEFT;
  }

  #trackWidth(): number {
    return Math.max(1, this.#band().width - TRACK_LEFT - TRACK_RIGHT);
  }

  /** Where a view along the hall falls on the track. */
  #xOf(value: number): number {
    return this.#trackLeft() + (value / this.#hall.length()) * this.#trackWidth();
  }

  /** The view a finger at this point of the track holds the window at (by its middle). */
  #valueAt(x: number): number {
    return ((x - this.#trackLeft()) / this.#trackWidth()) * this.#hall.length() - GRIP;
  }

  /** The near end: the elevator you came in by, a small car. */
  #elevator(painter: Painter, palette: Palette, x: number, y: number): void {
    painter.globalAlpha = 0.9;
    painter.strokeStyle = palette('dim');
    painter.lineWidth = 1.5;
    painter.strokeRect(x - 5, y - 7, 10, 14);
    painter.beginPath();
    painter.moveTo(x, y - 7);
    painter.lineTo(x, y + 7);
    painter.stroke();
  }

  /** A box with fully rounded ends, as a closed path. */
  #round(painter: Painter, x: number, y: number, width: number, height: number): void {
    const radius = Math.min(height / 2, width / 2);
    painter.beginPath();
    painter.moveTo(x + radius, y);
    painter.lineTo(x + width - radius, y);
    painter.arc(x + width - radius, y + radius, radius, -Math.PI / 2, Math.PI / 2);
    painter.lineTo(x + radius, y + height);
    painter.arc(x + radius, y + radius, radius, Math.PI / 2, (Math.PI * 3) / 2);
    painter.closePath();
  }
}
