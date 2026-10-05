import type { Location } from '#engine/model/Location.ts';

/** What an ending is decided on: where the traveller stands, what they carry, and how the run went. */
export interface Run {
  readonly here: Location;
  readonly places: number;
  readonly steps: number;
  readonly relics: number;
  readonly resonant: number;
  readonly reboots: number;
  /** Whether coherence ended in the bar's lowest band. */
  readonly critical: boolean;
  /** Whether the buffer holds an echo from a null reach, and a hybrid the traveller forged. */
  readonly echo: boolean;
  readonly hybrid: boolean;
}

/** One ending of a session: its stable key (a screen's words hang on it) and whether this run has reached it. */
export interface Ending {
  readonly id: string;
  reached(run: Run): boolean;
}
