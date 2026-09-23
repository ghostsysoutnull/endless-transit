import type { Fact } from '#engine/model/Fact.ts';

/** What the screen may know about the last scan: a title, its notes, and rows of labelled cells (the model's `ScanReport`, the places resolved). */
export interface ScanSummary {
  readonly title: string;
  readonly notes: readonly string[];
  readonly rows: readonly {
    readonly cells: readonly Fact[];
    /** The row about where the traveller stands (the strata pulse's own floor). */
    readonly current: boolean;
    /** A sensory line under the row (a door's); empty when none. */
    readonly note: string;
  }[];
}
