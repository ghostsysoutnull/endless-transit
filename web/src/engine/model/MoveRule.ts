import type { Location } from './Location.ts';
import type { Move } from './Move.ts';

/**
 * One move a kind can make from a place of its own: where it leads from there — nothing when it cannot
 * be made, and then it is not offered either — and what making it does besides going there (a floor
 * entering its corridor). `to` is pure; only `act` changes anything.
 */
export interface MoveRule<Self> {
  readonly move: Move;
  to(self: Self): Location | undefined;
  act?(self: Self): void;
}
