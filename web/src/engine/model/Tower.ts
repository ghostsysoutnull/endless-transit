import type { Figure } from './Figure.ts';

/**
 * A building as its own picture draws it (U02): its address and landmark (what its roof is drawn from, the same
 * on the street and inside), the floor its car stands at, how many Layers lie open below the bedrock (0 until the
 * breach), and each floor's figure, floor `n` at `n`. Plain data.
 */
export interface Tower {
  readonly address: string;
  readonly landmark: boolean;
  readonly car: number;
  readonly below: number;
  readonly rows: readonly Figure[];
}
