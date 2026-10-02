import type { KeyWords } from './KeyWords.ts';

/**
 * The words of the key over a room's picture that flips between the room and the plan (U03d): one face while you
 * stand in the room, to the plan; the other over the plan, back into the room. Each names what the next tap does.
 */
export interface MapKey {
  readonly toPlan: KeyWords;
  readonly toRoom: KeyWords;
}
