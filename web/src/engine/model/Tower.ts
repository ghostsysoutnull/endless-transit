import type { Figure } from './Figure.ts';

/**
 * A building as its own picture draws it (U02): its address and landmark (what its roof is drawn from, the same
 * on the street and inside), the floor its car stands at, and a row per level from the lowest open Layer (the
 * lobby until the breach) to the top, each floor's figure with its level. Plain data around the engine's value
 * objects.
 */
export interface Tower {
  readonly address: string;
  readonly landmark: boolean;
  readonly car: number;
  readonly rows: readonly Figure[];
}
