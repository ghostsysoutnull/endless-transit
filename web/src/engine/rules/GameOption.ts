import type { Fact } from '#engine/model/Fact.ts';
import type { Figure } from '#engine/model/Figure.ts';

/**
 * The letter of the visited mark the old lists drew after a name (`[V]`, Corridor.groovy:71-72,
 * Building.groovy:222). One owner: a screen draws the mark from it, and the engine keeps it out of the
 * keys it hands to listed places — so a row never reads `[V] … [V]`.
 */
export const VISITED_KEY = 'v';

/** A thing the player can do right now — data, never a closure. The engine resolves `id` to the action. */
export interface GameOption {
  readonly id: string;
  /** Optional keyboard extra (queue decision 1: never a requirement). Empty when the option has none. */
  readonly key: string;
  readonly label: string;
  /** The name of the place the option leads into; empty when it leads into none. Nobody has to cut it out of the label. */
  readonly place: string;
  /**
   * What sort of thing it is: into a listed place, a move the place offers (up, forward …), back out, about
   * the game itself, a debug tool (Decision 8), a take of what lies here, or — on the buffer screen — a pick
   * (select, merge) or a drop of the buffer's fragment at `ordinal`.
   */
  readonly role: 'travel' | 'move' | 'return' | 'system' | 'debug' | 'take' | 'pick' | 'drop';
  /** Listed but not enterable: the engine ignores its id, and a screen shows it as closed — never as a button. */
  readonly sealed: boolean;
  /** The place asks its parent's list to make it stand out. */
  readonly landmark: boolean;
  /** The number a listed place goes by on the list (`1`; a floor by its number); empty when it is not listed. */
  readonly ordinal: string;
  /** The readings a listed place shows beside its name; none for most kinds. */
  readonly readings: readonly Fact[];
  /** The id of the option that undoes this one (a move's way back); empty when it has none. */
  readonly opposite: string;
  /** The listed place is the current one on its list — where the elevator stands, on a building's list. */
  readonly current: boolean;
  /** The listed place has been visited — the old game's `[V]` (Corridor.groovy:71-72, Building.groovy:222). */
  readonly visited: boolean;
  /** The listed place's address as text (`0.2.1`): where a picture zooms in and back out; empty when it leads into none. */
  readonly address: string;
  /** The listed place's shape on the picture (a building's floors and doors); nothing for the rest. */
  readonly figure: Figure | null;
}
