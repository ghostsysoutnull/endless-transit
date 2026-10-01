import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { InsideFrame } from './InsideFrame.ts';
import type { RoomLight } from './RoomLight.ts';

/** A shaft of light falling slantwise across the room from a high corner, drifting as the source does. */
export class BeamLight implements RoomLight {
  readonly #ink: string;

  constructor(ink: string) {
    this.#ink = ink;
  }

  ink(): string {
    return this.#ink;
  }

  paint(painter: Painter, palette: Palette, frame: InsideFrame, time: number): void {
    const { room } = frame;
    const sway = Math.sin(time * 0.0007) * 0.15;
    painter.fillStyle = palette(this.#ink);
    painter.globalAlpha = 0.08;
    painter.beginPath();
    painter.moveTo(room.x + room.width * 0.06, room.y);
    painter.lineTo(room.x + room.width * (0.42 + sway), room.y + room.height);
    painter.lineTo(room.x + room.width * (0.72 + sway), room.y + room.height);
    painter.closePath();
    painter.fill();
  }
}
