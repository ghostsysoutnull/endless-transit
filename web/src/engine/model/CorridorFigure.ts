import type { CorridorShape } from './CorridorShape.ts';
import type { DoorFigure } from './DoorFigure.ts';

/** A corridor as its picture draws it (U02): how it runs, its doors in its list's order, and whether it lies below the bedrock (U04). */
export interface CorridorFigure {
  readonly shape: CorridorShape;
  readonly abyssal: boolean;
  readonly doors: readonly DoorFigure[];
}
