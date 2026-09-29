import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { Glow } from './Glow.ts';
import type { InsideFrame } from './InsideFrame.ts';
import type { RoomLight } from './RoomLight.ts';

/** A lamp hung from the ceiling on its cord, swinging a little, lighting the room round it: flame, bulb or tube. */
export class LampLight implements RoomLight {
  readonly #ink: string;
  readonly #glow: Glow;

  constructor(ink: string, glow: Glow) {
    this.#ink = ink;
    this.#glow = glow;
  }

  paint(painter: Painter, palette: Palette, frame: InsideFrame, time: number): void {
    const { room, back } = frame;
    const hook = { x: room.x + room.width / 2, y: room.y };
    const lamp = { x: hook.x + Math.sin(time * 0.0008) * 6, y: back.y + back.height * 0.3 };
    painter.strokeStyle = palette('dim');
    painter.globalAlpha = 0.6;
    painter.lineWidth = 1;
    painter.beginPath();
    painter.moveTo(hook.x, hook.y);
    painter.lineTo(lamp.x, lamp.y - 6);
    painter.stroke();
    this.#glow.at(painter, lamp, room.height * 0.35, palette(this.#ink), 0.18);
    painter.fillStyle = palette(this.#ink);
    painter.globalAlpha = 0.8;
    painter.fillRect(lamp.x - 4, lamp.y - 6, 8, 10);
  }
}
