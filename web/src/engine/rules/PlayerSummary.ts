/** What the screen may know about the traveller: plain numbers and a band name. */
export interface PlayerSummary {
  readonly coherence: number;
  /** The band the coherence bar is in (`stable`, `degraded`, `critical`): data a screen colours by. */
  readonly band: string;
  readonly steps: number;
}
