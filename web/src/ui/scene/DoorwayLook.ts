import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { DoorwayFrame } from './DoorwayFrame.ts';

/** How a doorway of the room you stand in is drawn (U03e): lit by a room already entered, or full of fog. */
export interface DoorwayLook {
  paint(painter: Painter, palette: Palette, frame: DoorwayFrame, time: number): void;
}
