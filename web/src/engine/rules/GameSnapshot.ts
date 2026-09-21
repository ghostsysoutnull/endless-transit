import type { GameOption } from './GameOption.ts';
import type { PlaceSummary } from './PlaceSummary.ts';
import type { WorldSummary } from './WorldSummary.ts';

/** What `GameEngine.step` returns: plain readonly data — JSON-safe, no objects with behaviour. */
export interface GameSnapshot {
  readonly world: WorldSummary | null;
  /** Where the traveller stands; `null` while at the title screen. */
  readonly place: PlaceSummary | null;
  readonly options: readonly GameOption[];
  /** What just happened, for the status line / live region. Empty when nothing did. */
  readonly message: string;
}
