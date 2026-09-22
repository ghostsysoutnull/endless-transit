import type { Fact } from '#engine/model/Fact.ts';

/** A thing the player can do right now — data, never a closure. The engine resolves `id` to the action. */
export interface GameOption {
  readonly id: string;
  /** Optional keyboard extra (queue decision 1: never a requirement). Empty when the option has none. */
  readonly key: string;
  readonly label: string;
  /** The name of the place the option leads into; empty when it leads into none. Nobody has to cut it out of the label. */
  readonly place: string;
  /** What sort of thing it is: into a listed place, a move the place offers (up, forward …), back out, or about the game itself. */
  readonly role: 'travel' | 'move' | 'return' | 'system';
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
}
