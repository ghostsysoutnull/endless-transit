import type { AreaLook } from './AreaLook.ts';
import type { AreaPart } from './AreaPart.ts';

/**
 * A level above the street as its picture draws it (U04): which drawing it is, a part per listed child, and the
 * strength of the signal a null reach hunts, 0 to 100 (0 elsewhere, and before a scan).
 */
export interface AreaFigure {
  readonly look: AreaLook;
  readonly parts: readonly AreaPart[];
  readonly signal: number;
}
