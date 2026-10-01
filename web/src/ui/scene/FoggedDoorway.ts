import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { DoorwayFrame } from './DoorwayFrame.ts';
import type { DoorwayLook } from './DoorwayLook.ts';

/** The fog's ink, how many puffs drift in, and how long one takes to cross, in milliseconds. */
const INK = 'text';
const PUFFS = 6;
const CROSSING = 3800;

/**
 * A doorway into a room not yet entered (U03e): its frame pale, pulsing slowly, fog filling the gap and drifting into
 * the room — as the plan's rooms not yet reached lie in fog. No light, no number.
 */
export class FoggedDoorway implements DoorwayLook {
  paint(painter: Painter, palette: Palette, frame: DoorwayFrame, time: number): void {
    const slow = 0.5 + 0.5 * Math.sin(time / 700);
    const fog = palette(INK);
    frame.beyond(painter, fog, 0.14 + 0.07 * slow);
    for (let puff = 0; puff < PUFFS; puff++) {
      const along = Math.sin(time / 1900 + puff * 2.1) * 0.75;
      const far = (time / CROSSING + puff / PUFFS) % 1;
      frame.puff(painter, fog, along, far, 0.13);
    }
    frame.sill(painter, fog, 0.65 + 0.35 * slow, 4 + 12 * slow);
  }
}
