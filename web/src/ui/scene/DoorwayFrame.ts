import type { Painter } from '#ui/canvas/Painter.ts';
import type { Glow } from './Glow.ts';
import type { PictureFont } from './PictureFont.ts';
import type { Point } from './Point.ts';

/** A post's side: this share of half the gap, between these CSS pixels; the sill is half as thick. */
const POST = { share: 0.2, least: 3, most: 6 };
/** In shares of half the gap: the strip seen beyond the wall (at most this many CSS pixels), how far its light and its fog reach. */
const BEYOND = { share: 0.47, most: 14 };
const SPILL = { steps: [0.5, 1.3, 2.1], radius: 1.5 };
const FOG = { reach: 1.8, radius: 0.5 };
/** The number sits this far in, and shows once half the gap is this wide, in CSS pixels. */
const NUMBER = { in: 0.45, least: 20 };

/**
 * A doorway of the room you stand in as the picture places it at a framing (U03e): the two ends of its gap, the way
 * into the room, the ink of the light beyond it and the number of the room it leads to (none for the way out). It
 * draws the parts every doorway shares — the sill and its posts, the strip beyond the wall, the light spilling in, a
 * puff of fog, the number — each sized by the gap, so the same doorway is drawn small on the whole plan. Value object,
 * made per frame.
 */
export class DoorwayFrame {
  readonly #one: Point;
  readonly #other: Point;
  readonly #inward: Point;
  readonly #ink: string;
  readonly #number: string;
  readonly #glow: Glow;
  readonly #font: PictureFont;

  constructor(facts: {
    ends: readonly [Point, Point];
    /** One step into the room you stand in, across the wall. */
    inward: Point;
    /** The stylesheet token of the light beyond it. */
    ink: string;
    /** The number of the room it leads to; empty for the way out. */
    number: string;
    glow: Glow;
    font: PictureFont;
  }) {
    [this.#one, this.#other] = facts.ends;
    this.#inward = facts.inward;
    this.#ink = facts.ink;
    this.#number = facts.number;
    this.#glow = facts.glow;
    this.#font = facts.font;
  }

  ink(): string {
    return this.#ink;
  }

  /** The strip of what lies beyond the wall, seen through the gap. */
  beyond(painter: Painter, colour: string, alpha: number): void {
    const depth = Math.min(this.#half() * BEYOND.share, BEYOND.most);
    const xs = [this.#one.x, this.#other.x, this.#one.x - this.#inward.x * depth];
    const ys = [this.#one.y, this.#other.y, this.#one.y - this.#inward.y * depth];
    const left = Math.min(...xs);
    const top = Math.min(...ys);
    painter.fillStyle = colour;
    painter.globalAlpha = alpha;
    painter.fillRect(left, top, Math.max(...xs) - left, Math.max(...ys) - top);
  }

  /** The light beyond it spilling across the floor, fading as it goes in. */
  spill(painter: Painter, colour: string, alpha: number): void {
    SPILL.steps.forEach((step, index) => {
      this.#glow.at(painter, this.#at(step, 0), this.#half() * SPILL.radius, colour, alpha / (index + 1));
    });
  }

  /** One puff of fog: `along` the gap from -1 to 1, `far` into the room from 0 to 1, fading as it goes in. */
  puff(painter: Painter, colour: string, along: number, far: number, alpha: number): void {
    this.#glow.at(
      painter,
      this.#at(far * FOG.reach, along),
      this.#half() * FOG.radius * (1 + far),
      colour,
      alpha * (1 - far),
    );
  }

  /** The sill across the gap and a post at each end, glowing this much. */
  sill(painter: Painter, colour: string, alpha: number, blur: number): void {
    const post = Math.min(Math.max(this.#half() * POST.share, POST.least), POST.most);
    painter.strokeStyle = colour;
    painter.fillStyle = colour;
    painter.globalAlpha = alpha;
    painter.lineWidth = post / 2;
    painter.shadowColor = colour;
    painter.shadowBlur = blur * painter.getTransform().a;
    painter.beginPath();
    painter.moveTo(this.#one.x, this.#one.y);
    painter.lineTo(this.#other.x, this.#other.y);
    painter.stroke();
    painter.shadowBlur = 0;
    for (const end of [this.#one, this.#other]) {
      painter.fillRect(end.x - post / 2, end.y - post / 2, post, post);
    }
  }

  /** The number of the room it leads to, just inside the sill, where the gap is wide enough to carry it. */
  number(painter: Painter, colour: string): void {
    if (this.#number === '' || this.#half() < NUMBER.least) return;
    const at = this.#at(NUMBER.in, 0);
    painter.font = this.#font.of('regular');
    painter.textAlign = 'center';
    painter.textBaseline = 'middle';
    painter.fillStyle = colour;
    painter.globalAlpha = 1;
    painter.fillText(this.#number, at.x, at.y);
  }

  #middle(): Point {
    return { x: (this.#one.x + this.#other.x) / 2, y: (this.#one.y + this.#other.y) / 2 };
  }

  /** Half the gap, in CSS pixels: what every part is sized by. */
  #half(): number {
    return Math.hypot(this.#other.x - this.#one.x, this.#other.y - this.#one.y) / 2;
  }

  /** A point this many halves into the room (out of it, below zero) and this many along the gap from its middle. */
  #at(into: number, along: number): Point {
    const middle = this.#middle();
    const half = this.#half();
    return {
      x: middle.x + this.#inward.x * into * half + ((this.#other.x - this.#one.x) / 2) * along,
      y: middle.y + this.#inward.y * into * half + ((this.#other.y - this.#one.y) / 2) * along,
    };
  }
}
