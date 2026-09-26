import type { DoorLook } from './DoorLook.ts';
import type { Tower } from './Tower.ts';

/**
 * A place's shape as a picture draws it: how many floors it stands, how many doors each has, and — for the
 * kinds that have them (U02) — the tower it is (a building's own picture), how its corridor runs and how its
 * doors look (a floor, a corridor), the door it is behind (an apartment). Plain data.
 */
export interface Figure {
  readonly floors: number;
  readonly doors: number;
  readonly tower?: Tower;
  /** How the corridor runs: its words' key (`long`, `service`, `curved`, `static`). */
  readonly shape?: string;
  /** Each door's look, in the corridor's order. */
  readonly looks?: readonly DoorLook[];
  /** The door an apartment is behind: its look and the word written on it (empty when none). */
  readonly door?: { readonly look: DoorLook; readonly words: string };
}
