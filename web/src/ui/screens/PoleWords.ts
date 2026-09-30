import type { TraceSummary } from '#engine/rules/TraceSummary.ts';
import type { PoleVM } from './PoleVM.ts';

/** What the world screen's presenter asks of `PolePresenter` (U05): the pole's words for the traced levels. */
export interface PoleWords {
  of(trace: TraceSummary): PoleVM;
}
