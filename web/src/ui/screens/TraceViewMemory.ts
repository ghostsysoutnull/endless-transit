import type { TraceView } from './TraceView.ts';

/** What the world screen asks of wherever the player's pick of view is kept (U05): it survives a reload. */
export interface TraceViewMemory {
  /** The view picked last; the column when none was. */
  recall(): TraceView;
  remember(view: TraceView): void;
}
