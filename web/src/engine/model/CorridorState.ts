import type { Fact } from './Fact.ts';
import type { Floor } from './Floor.ts';
import type { FloorState } from './FloorState.ts';
import type { Location } from './Location.ts';
import type { Move } from './Move.ts';

const ELEVATOR: Move = { id: 'elevator', label: 'Back to Elevator' };

/**
 * In the corridor: the floor shows its corridor — the doors are listed, the words are the corridor's —
 * and the one move is back to the elevator. The way out is the floor's own (`Floor.leave`, HK-019).
 */
export class CorridorState implements FloorState {
  id(): string {
    return 'corridor';
  }

  listing(floor: Floor): readonly Location[] {
    return floor.corridor().listing();
  }

  moves(): readonly Move[] {
    return [ELEVATOR];
  }

  move(floor: Floor, id: string): Location | undefined {
    if (id !== ELEVATOR.id) return undefined;
    floor.returnToElevator();
    return floor;
  }

  facts(floor: Floor): readonly Fact[] {
    return floor.corridor().facts();
  }

  description(floor: Floor): readonly string[] {
    return floor.corridor().description();
  }

  status(floor: Floor): string {
    return floor.corridor().status();
  }

  childrenHeading(floor: Floor): string {
    return floor.corridor().childrenHeading();
  }

  approachVerb(floor: Floor): string {
    return floor.corridor().approachVerb();
  }
}
