import type { IndexLabel } from './IndexLabel.ts';
import type { Position } from './Position.ts';

/** A kind whose places are not counted among their siblings (a floor: its name and the tower say its height, U02). Value object. */
export class Unindexed implements IndexLabel {
  position(): Position {
    return { counted: false };
  }
}
