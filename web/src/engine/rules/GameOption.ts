/** A thing the player can do right now — data, never a closure. The engine resolves `id` to the action. */
export interface GameOption {
  readonly id: string;
  /** Optional keyboard extra (queue decision 1: never a requirement). */
  readonly key: string;
  readonly label: string;
}
