import type { CorridorShape } from './CorridorShape.ts';
import type { DoorFigure } from './DoorFigure.ts';

/** A corridor as its picture draws it (U02): how it runs, and its doors in its list's order. */
export interface CorridorFigure {
  readonly shape: CorridorShape;
  readonly doors: readonly DoorFigure[];
}
