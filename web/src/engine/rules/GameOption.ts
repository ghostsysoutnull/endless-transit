import { BACK_MOVE } from '#engine/model/BackMove.ts';
import {
  CORRIDOR_MOVE,
  DESCEND_MOVE,
  DOWN_MOVE,
  ELEVATOR_MOVE,
  UP_MOVE,
} from '#engine/model/FloorMoves.ts';
import { FORWARD_MOVE } from '#engine/model/ForwardMove.ts';
import type { Fact } from '#engine/model/Fact.ts';

/**
 * The letter of the visited mark the old lists drew after a name (`[V]`, Corridor.groovy:71-72,
 * Building.groovy:222). One owner: a screen draws the mark from it, and the engine keeps it out of the
 * keys it hands to listed places — so a row never reads `[V] … [V]`.
 */
export const VISITED_KEY = 'v';
/** The TRACE command's option id (U04): the rail runs it too. */
export const TRACE_ID = 'trace';
/** The SCAN command's option id: what a screen draws its key for. */
export const SCAN_ID = 'scan';
/** The lattice map command's option id: what a screen draws its key for. */
export const LATTICE_ID = 'map';
/** The option id of the way to the title screen: what a screen draws its key for. */
export const TO_TITLE_ID = 'to-title';
/** What a move's option id starts with, before the move's own id. */
export const MOVE_PREFIX = 'move:';
/** The option id of the move back (a room's): what a screen finds the way back by, never by its place in the list. */
export const BACK_MOVE_ID = `${MOVE_PREFIX}${BACK_MOVE}`;
/** The option id of the move forward (a room's): what a screen finds the way on by. */
export const FORWARD_MOVE_ID = `${MOVE_PREFIX}${FORWARD_MOVE}`;
/** The option id of the move back to the elevator (a corridor's): what a screen draws its key for. */
export const ELEVATOR_MOVE_ID = `${MOVE_PREFIX}${ELEVATOR_MOVE}`;
/** The option id of the move into the corridor (an elevator's): what a screen draws its key for. */
export const CORRIDOR_MOVE_ID = `${MOVE_PREFIX}${CORRIDOR_MOVE}`;
/** The option ids of the elevator's rides — up, down, and down into the substrate: what a screen knows them by. */
export const UP_MOVE_ID = `${MOVE_PREFIX}${UP_MOVE}`;
export const DOWN_MOVE_ID = `${MOVE_PREFIX}${DOWN_MOVE}`;
export const DESCEND_MOVE_ID = `${MOVE_PREFIX}${DESCEND_MOVE}`;
/** The BREACH command's option id: what a screen draws its bar for. */
export const BREACH_ID = 'breach';

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
  /** The address as text (`0.2.1`) of the listed place, or of where a move leads (U03): where a picture zooms or glides to; empty when it leads into none. */
  readonly address: string;
  /** The listed place goes by its own number (a floor, Guide:111): a screen may lay such a list out as a pad of numbers (U02). */
  readonly numbered: boolean;
}
