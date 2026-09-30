import type { DockLayout } from './DockLayout.ts';
import type { DockParts } from './DockParts.ts';
import type { MovesPlace } from './MovesPlace.ts';

/**
 * The moves in the dock's row, after the way out and before MORE (U03c, a room): always in reach of a thumb, never
 * scrolled away; no strip under the picture.
 */
export class MovesInDock implements MovesPlace {
  arrange(parts: DockParts): DockLayout {
    return {
      moves: [],
      dock: [...parts.leave, ...parts.moves, ...parts.system],
      after: parts.leave.length + parts.moves.length,
      out: parts.leave.length,
    };
  }
}
