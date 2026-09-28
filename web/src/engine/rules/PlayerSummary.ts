/** What the screen may know about the traveller: plain numbers and a band name. */
export interface PlayerSummary {
  readonly coherence: number;
  /** The band the coherence bar is in (`stable`, `degraded`, `critical`): data a screen colours by. */
  readonly band: string;
  readonly steps: number;
  /** How strongly a screen tears its picture, 0 to 1 (`Coherence.decay`, Decision 5). */
  readonly decay: number;
}
