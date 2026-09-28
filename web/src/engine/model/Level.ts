/** The level a floor stands at (U02): its number — the lobby 0, a Layer below it negative — and whether it is a Layer. */
export interface Level {
  readonly number: number;
  readonly layer: boolean;
}
