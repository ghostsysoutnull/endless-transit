import type { Location } from '#engine/model/Location.ts';

/** What an ending is decided on: where the traveller stands and how many places they have visited. */
export interface Run {
  readonly here: Location;
  readonly places: number;
}

/** One ending of a session: its stable key (a screen's words hang on it) and whether this run has reached it. */
export interface Ending {
  readonly id: string;
  reached(run: Run): boolean;
}
