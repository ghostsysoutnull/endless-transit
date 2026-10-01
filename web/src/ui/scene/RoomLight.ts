import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { InsideFrame } from './InsideFrame.ts';

/**
 * How one era lights the room you stand in (U03b; the mock's beam, lamp and glow, `transit-reframed.html:922-925`),
 * moving with the time. One class a kind of light, found by the era's key.
 */
export interface RoomLight {
  paint(painter: Painter, palette: Palette, frame: InsideFrame, time: number): void;
  /** The stylesheet token it lights in: what a doorway into its room is lit by (U03e). */
  ink(): string;
}
