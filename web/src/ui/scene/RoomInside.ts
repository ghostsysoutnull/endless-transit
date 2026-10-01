import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { RelicSpot } from './RelicSpot.ts';

/**
 * What lies inside a room's box on the plan (U03b): drawn in full while the room you stand in is large enough
 * (`DrawnInside`), else plain (`PlainInside`). It answers where the relics lie, and paints
 * what it holds.
 */
export interface RoomInside {
  /** Where the first `count` relics lie, in order, as many as fit — the tiles below the picture hold every one. */
  spots(count: number): readonly RelicSpot[];
  paint(painter: Painter, palette: Palette, time: number): void;
}
