import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { DoorwayFrame } from './DoorwayFrame.ts';
import type { DoorwayLook } from './DoorwayLook.ts';

/** The number is written in this ink: a text ink, whatever the light's. */
const NUMBER_INK = 'text';

/**
 * A doorway into a place you know (U03e) — a room already entered, or the way out: the light beyond it shows in the
 * gap and spills across the floor, breathing slowly, its sill glows in that light, and it carries its room's number.
 */
export class LitDoorway implements DoorwayLook {
  paint(painter: Painter, palette: Palette, frame: DoorwayFrame, time: number): void {
    const pulse = 0.5 + 0.5 * Math.sin(time / 420);
    const light = palette(frame.ink());
    frame.beyond(painter, light, 0.17 + 0.07 * pulse);
    frame.spill(painter, light, 0.19 + 0.07 * pulse);
    frame.sill(painter, light, 1, 6 + 10 * pulse);
    frame.number(painter, palette(NUMBER_INK));
  }
}
