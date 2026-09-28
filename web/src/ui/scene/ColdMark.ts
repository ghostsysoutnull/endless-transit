import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { DoorMark } from './DoorMark.ts';
import type { MarkedDoor } from './MarkedDoor.ts';
import type { Glow } from './Glow.ts';

/** Cold (the mock's): a glow in the state's ink at the door's heart, breathing slowly. */
export class ColdMark implements DoorMark {
  readonly #glow: Glow;

  constructor(glow: Glow) {
    this.#glow = glow;
  }

  draw(painter: Painter, palette: Palette, door: MarkedDoor, seconds: number): void {
    const { quad, fog, ink } = door;
    this.#glow.at(
      painter,
      quad.middle(),
      quad.width(),
      palette(ink),
      (0.15 + 0.08 * Math.sin(seconds * 1.5)) * fog,
    );
  }
}
