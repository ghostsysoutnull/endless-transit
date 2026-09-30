import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { Fractions } from './Fractions.ts';
import type { InsideFrame } from './InsideFrame.ts';
import type { NameLine } from './NameLine.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { RelicSpot } from './RelicSpot.ts';
import type { RoomInside } from './RoomInside.ts';
import type { RoomLight } from './RoomLight.ts';
import type { RoomWall } from './RoomWall.ts';

/** The back wall's place in the room's box, in shares of it (the mock's `room`, `transit-reframed.html:910`, a floor a little deeper). */
const BACK = { left: 0.24, right: 0.76, top: 0.14, bottom: 0.55 };
/** Relics lie this far down the floor, across this share of the room's width. */
const RELICS = { down: 0.35, across: 0.7 };
/** At most this many pieces of furniture are drawn; the words name them all. */
const FURNITURE = 3;
/** How many flakes fall in a cold room, and how fast, in pixels a second. */
const SNOW = { flakes: 30, fall: 12 };

/**
 * The room you stand in, drawn in full (U03b; the mock's `room`, `transit-reframed.html:908-932`): its floor running
 * to its back wall, the wall patterned by its culture, lit by its era, its furniture standing on the floor, snow
 * falling when it is cold; its relics lie on the floor and its name is written high on the back wall, clear of them.
 * Value object, made per frame.
 */
export class DrawnInside implements RoomInside {
  readonly #frame: InsideFrame;
  /** How far apart relics lie at least, centre to centre. */
  readonly #spot: number;
  readonly #wall: RoomWall;
  readonly #light: RoomLight;
  readonly #furniture: number;
  readonly #cold: boolean;
  readonly #address: string;
  readonly #noise: Fractions;

  constructor(facts: {
    box: PlanBoxOnPicture;
    spot: number;
    wall: RoomWall;
    light: RoomLight;
    furniture: number;
    cold: boolean;
    /** The room's address: what its furniture and snow are placed by. */
    address: string;
    noise: Fractions;
  }) {
    const box = facts.box;
    this.#frame = {
      room: box,
      back: {
        x: box.x + box.width * BACK.left,
        y: box.y + box.height * BACK.top,
        width: box.width * (BACK.right - BACK.left),
        height: box.height * (BACK.bottom - BACK.top),
      },
    };
    this.#spot = facts.spot;
    this.#wall = facts.wall;
    this.#light = facts.light;
    this.#furniture = facts.furniture;
    this.#cold = facts.cold;
    this.#address = facts.address;
    this.#noise = facts.noise;
  }

  spots(count: number): readonly RelicSpot[] {
    const { room } = this.#frame;
    const span = room.width * RELICS.across;
    const shown = Math.min(count, Math.floor(span / this.#spot) + 1);
    const y = this.#floorTop() + (room.y + room.height - this.#floorTop()) * RELICS.down;
    if (shown === 1) return [{ at: { x: room.x + room.width / 2, y }, reach: span }];
    const apart = span / (shown - 1);
    const left = room.x + (room.width - span) / 2;
    return Array.from({ length: shown }, (_, index) => ({
      at: { x: left + index * apart, y },
      reach: apart - 6,
    }));
  }

  nameLine(): NameLine {
    return { y: this.#frame.back.y + 10, lines: 1 };
  }

  paint(painter: Painter, palette: Palette, time: number): void {
    const { room, back } = this.#frame;
    painter.save();
    painter.beginPath();
    painter.rect(room.x, room.y, room.width, room.height);
    painter.clip();
    this.#floor(painter, palette);
    this.#wall.paint(painter, palette, back);
    this.#corners(painter, palette);
    this.#light.paint(painter, palette, this.#frame, time);
    this.#things(painter, palette);
    if (this.#cold) this.#snow(painter, palette, time);
    painter.restore();
    painter.globalAlpha = 1;
  }

  #floorTop(): number {
    return this.#frame.back.y + this.#frame.back.height;
  }

  /** The floor, from the room's front edge back to the foot of the back wall. */
  #floor(painter: Painter, palette: Palette): void {
    const { room, back } = this.#frame;
    painter.fillStyle = palette('panel');
    painter.globalAlpha = 0.5;
    painter.beginPath();
    painter.moveTo(room.x, room.y + room.height);
    painter.lineTo(room.x + room.width, room.y + room.height);
    painter.lineTo(back.x + back.width, back.y + back.height);
    painter.lineTo(back.x, back.y + back.height);
    painter.closePath();
    painter.fill();
  }

  /** The room's four corners running back to the back wall's, and the back wall's edge. */
  #corners(painter: Painter, palette: Palette): void {
    const { room, back } = this.#frame;
    painter.strokeStyle = palette('cy');
    painter.globalAlpha = 0.45;
    painter.lineWidth = 1;
    painter.beginPath();
    for (const [x, y, to] of [
      [room.x, room.y, { x: back.x, y: back.y }],
      [room.x + room.width, room.y, { x: back.x + back.width, y: back.y }],
      [room.x, room.y + room.height, { x: back.x, y: back.y + back.height }],
      [room.x + room.width, room.y + room.height, { x: back.x + back.width, y: back.y + back.height }],
    ] as const) {
      painter.moveTo(x, y);
      painter.lineTo(to.x, to.y);
    }
    painter.rect(back.x, back.y, back.width, back.height);
    painter.stroke();
  }

  /** The furniture: dark blocks standing on the floor, each where the room's address puts it. */
  #things(painter: Painter, palette: Palette): void {
    const { room } = this.#frame;
    const floor = room.y + room.height - this.#floorTop();
    for (let piece = 0; piece < Math.min(this.#furniture, FURNITURE); piece++) {
      const [across, down, wide, tall] = [0, 1, 2, 3].map((part) =>
        this.#noise.fraction(`${this.#address}/furniture`, piece * 4 + part),
      ) as [number, number, number, number];
      const width = room.width * (0.1 + wide * 0.06);
      const height = floor * (0.25 + tall * 0.2);
      const x = room.x + room.width * (0.2 + piece * 0.28 + across * 0.06) - width / 2;
      const y = this.#floorTop() + floor * (0.55 + down * 0.3) - height;
      painter.fillStyle = palette('panel');
      painter.globalAlpha = 1;
      painter.fillRect(x, y, width, height);
      painter.strokeStyle = palette('dim');
      painter.globalAlpha = 0.7;
      painter.strokeRect(x + 0.5, y + 0.5, width, height);
    }
  }

  /** Snow falling through a cold room, each flake where the address puts it, drifting down with the time. */
  #snow(painter: Painter, palette: Palette, time: number): void {
    const { room } = this.#frame;
    painter.fillStyle = palette('wh');
    painter.globalAlpha = 0.35;
    for (let flake = 0; flake < SNOW.flakes; flake++) {
      const [across, down, pace] = [0, 1, 2].map((part) =>
        this.#noise.fraction(`${this.#address}/snow`, flake * 3 + part),
      ) as [number, number, number];
      const drift = Math.sin(time * 0.001 + flake) * 6;
      const x = room.x + this.#wrap(across * room.width + drift, room.width);
      const fallen = (time / 1000) * SNOW.fall * (1 + pace);
      const y = room.y + this.#wrap(down * room.height + fallen, room.height);
      painter.fillRect(x, y, 1.5, 1.5);
    }
  }

  #wrap(value: number, length: number): number {
    return ((value % length) + length) % length;
  }
}
