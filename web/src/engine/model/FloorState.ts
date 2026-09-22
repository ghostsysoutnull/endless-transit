import type { Fact } from './Fact.ts';
import type { Floor } from './Floor.ts';
import type { Location } from './Location.ts';
import type { Move } from './Move.ts';

/**
 * A floor's mode — standing at the elevator or in the corridor (the Groovy `FloorState`, OOA Phase 8). The
 * floor asks its state everything the mode decides; a transition is a pointer swap on the floor
 * (`enterCorridor` / `returnToElevator`). States are stateless: the floor is passed in. Nobody asks a
 * state its class.
 */
export interface FloorState {
  /** The id a save keeps for this mode. */
  id(): string;
  listing(floor: Floor): readonly Location[];
  /** Whether a path may continue from the floor into this child (its corridor) in this mode. */
  admits(floor: Floor, child: Location): boolean;
  moves(floor: Floor): readonly Move[];
  move(floor: Floor, id: string): Location | undefined;
  facts(floor: Floor): readonly Fact[];
  description(floor: Floor): readonly string[];
  status(floor: Floor): string;
  childrenHeading(floor: Floor): string;
  approachVerb(floor: Floor): string;
}
