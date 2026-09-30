import type { PlanRoom } from '#engine/model/PlanRoom.ts';
import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { Framing } from './Framing.ts';
import type { Point } from './Point.ts';

/**
 * The plan's minimap at one framing (U03): shown when the plan runs past the frame (`Minimap`), else nothing
 * (`NoMinimap`). A tap on it pulls the view back to the whole plan (U03c) — a control of the view like a drag, not an
 * option.
 */
export interface MinimapView {
  /** Whether a point of the picture falls on it. */
  holds(point: Point): boolean;
  paint(painter: Painter, palette: Palette, rooms: readonly PlanRoom[], framing: Framing): void;
}
