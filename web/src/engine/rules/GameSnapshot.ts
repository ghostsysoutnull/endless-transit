import type { GameOption } from './GameOption.ts';
import type { WorldSummary } from './WorldSummary.ts';

/** What `GameEngine.step` returns: plain readonly data — JSON-safe, no objects with behaviour. */
export interface GameSnapshot {
  readonly world: WorldSummary | null;
  readonly options: readonly GameOption[];
  /** What just happened, for the status line / live region. Empty when nothing did. */
  readonly message: string;
}
