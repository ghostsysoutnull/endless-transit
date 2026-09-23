import type { Fact } from './Fact.ts';
import type { Location } from './Location.ts';

/**
 * One row of a scan: its cells as labelled readings, the place it is about when the report is about places
 * (the rooms of an apartment), whether it is where the traveller stands, and a sensory line under it (a
 * door's, ScanCommand.groovy:115-133) or none.
 */
export interface ScanRow {
  readonly cells: readonly Fact[];
  readonly place: Location | undefined;
  readonly current: boolean;
  readonly note: string;
}

/**
 * What a scan reads where the traveller stands (Guide:87, 227-231; ScanCommand.groovy:29-58): a title, a
 * few lines of notes, and a table of rows. Plain data; the engine turns it into a snapshot.
 */
export interface ScanReport {
  readonly title: string;
  readonly notes: readonly string[];
  readonly rows: readonly ScanRow[];
}
