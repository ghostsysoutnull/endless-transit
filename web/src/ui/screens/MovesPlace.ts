import type { DockLayout } from './DockLayout.ts';
import type { DockParts } from './DockParts.ts';

/** Where a place's moves sit on the world screen (U03c): under the picture (`MovesInStrip`) or in the dock (`MovesInDock`). */
export interface MovesPlace {
  arrange(parts: DockParts): DockLayout;
}
