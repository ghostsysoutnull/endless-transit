import type { DockLayout } from './DockLayout.ts';
import type { DockParts } from './DockParts.ts';
import type { MovesPlace } from './MovesPlace.ts';

/** The moves as a strip of buttons under the picture; the dock is the way out, then the game's own behind MORE (I09). */
export class MovesInStrip implements MovesPlace {
  arrange(parts: DockParts): DockLayout {
    return {
      moves: parts.moves,
      dock: [...parts.leave, ...parts.system],
      after: parts.leave.length,
      out: parts.leave.length,
    };
  }
}
