/** How a room on the plan looks for how far it is seen (U03): its floor, its fog, its words and marks, and on the minimap. */
export interface SightLook {
  /** How strongly its floor shows, 0 to 1. */
  readonly floor: number;
  /** How strongly the fog's hatching crosses it, 0 for none. */
  readonly hatch: number;
  /** Whether its number, name and relic marks are written in it. */
  readonly labelled: boolean;
  /** The ink its words are written in (the room you stand in writes in yellow whatever its sight). */
  readonly ink: string;
  /** Whether it carries the visited dot. */
  readonly dot: boolean;
  /** How it shows on the minimap. */
  readonly minimap: { readonly ink: string; readonly alpha: number };
}
