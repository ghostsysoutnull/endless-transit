import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';

/**
 * How a room on the plan looks for how far it is seen (U03): it paints the room's floor, the visited dot and the
 * room on the minimap, and lets the room's words be written in its ink — or not. One per sight (`SIGHT_LOOKS`).
 */
export interface SightLook {
  paintFloor(painter: Painter, palette: Palette, box: PlanBoxOnPicture): void;
  /** The room's words and marks, written in the look's ink by `write`; nothing where the room is not seen. */
  label(write: (ink: string) => void): void;
  paintDot(painter: Painter, palette: Palette, box: PlanBoxOnPicture): void;
  paintSmall(painter: Painter, palette: Palette, box: PlanBoxOnPicture): void;
}
