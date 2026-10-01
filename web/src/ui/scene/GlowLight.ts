import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { Glow } from './Glow.ts';
import type { InsideFrame } from './InsideFrame.ts';
import type { RoomLight } from './RoomLight.ts';

/** A light with no lamp: a glow spilling from the ceiling, a lit seam running down from it, breathing slowly. */
export class GlowLight implements RoomLight {
  readonly #ink: string;
  readonly #glow: Glow;

  constructor(ink: string, glow: Glow) {
    this.#ink = ink;
    this.#glow = glow;
  }

  ink(): string {
    return this.#ink;
  }

  paint(painter: Painter, palette: Palette, frame: InsideFrame, time: number): void {
    const { room, back } = frame;
    const breath = 0.1 + 0.04 * Math.sin(time * 0.001);
    this.#glow.at(
      painter,
      { x: room.x + room.width * 0.6, y: room.y },
      room.height * 0.5,
      palette(this.#ink),
      breath,
    );
    painter.strokeStyle = palette(this.#ink);
    painter.globalAlpha = 0.7;
    painter.lineWidth = 1;
    painter.beginPath();
    painter.moveTo(room.x + room.width * 0.52, room.y);
    painter.lineTo(room.x + room.width * 0.58, (room.y + back.y) / 2);
    painter.lineTo(room.x + room.width * 0.55, back.y);
    painter.stroke();
  }
}
