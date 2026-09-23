import type { BufferSummary } from './BufferSummary.ts';
import type { GameOption } from './GameOption.ts';
import type { MapSummary } from './MapSummary.ts';
import type { PlaceSummary } from './PlaceSummary.ts';
import type { PlayerSummary } from './PlayerSummary.ts';
import type { PromptSummary } from './PromptSummary.ts';
import type { ScanSummary } from './ScanSummary.ts';
import type { TraceSummary } from './TraceSummary.ts';
import type { WorldSummary } from './WorldSummary.ts';

/** What `GameEngine.step` returns: plain readonly data — JSON-safe, no objects with behaviour. */
export interface GameSnapshot {
  readonly world: WorldSummary | null;
  /** Where the traveller stands; `null` while at the title screen. */
  readonly place: PlaceSummary | null;
  /** The traveller's coherence and steps; `null` while at the title screen. */
  readonly player: PlayerSummary | null;
  /** The traveller's buffer; `null` while at the title screen. */
  readonly buffer: BufferSummary | null;
  /** The prompt waiting for an answer, whose options are the only ones on offer; `null` when none is. */
  readonly prompt: PromptSummary | null;
  readonly options: readonly GameOption[];
  /** What just happened, for the status line / live region. Empty when nothing did. */
  readonly message: string;
  /** The panel the last SCAN read, until the next step; `null` when the last step was no scan. */
  readonly scan: ScanSummary | null;
  /** The map the last MAP drew, until the next step; `null` when the last step was no map. */
  readonly map: MapSummary | null;
  /** The trace the last TRACE drew, until the next step; `null` when the last step was no trace. */
  readonly trace: TraceSummary | null;
}
