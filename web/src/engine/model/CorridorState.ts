import { CORRIDOR_KIND } from './Corridor.ts';
import type { Fact } from './Fact.ts';
import type { Figure } from './Figure.ts';
import type { Floor } from './Floor.ts';
import type { FloorState } from './FloorState.ts';
import type { Location } from './Location.ts';
import type { Move } from './Move.ts';
import { MoveTable } from './MoveTable.ts';
import type { ScanReport } from './ScanReport.ts';

/** The one move: back to the elevator. */
const MOVES = new MoveTable<Floor>([
  {
    move: { id: 'elevator', label: 'Back to Elevator', opposite: 'corridor' },
    to: (floor) => floor,
    act: (floor) => {
      floor.returnToElevator();
    },
  },
]);

/**
 * In the corridor: the floor shows its corridor — the doors are listed, the words are the corridor's —
 * and the one move is back to the elevator. The way out is the floor's own (`Floor.leave`, HK-019).
 */
export class CorridorState implements FloorState {
  id(): string {
    return 'corridor';
  }

  /** In the corridor the floor is drawn as the corridor, walked (U02). */
  drawing(): string {
    return CORRIDOR_KIND.key();
  }

  /** How it runs and its doors' looks: the floor's peek, the very ones the made corridor has. */
  portrait(floor: Floor): Figure | null {
    return floor.figure();
  }

  listing(floor: Floor): readonly Location[] {
    return floor.corridor().listing();
  }

  admits(floor: Floor, child: Location): boolean {
    return child === floor.corridor();
  }

  moves(floor: Floor): readonly Move[] {
    return MOVES.offered(floor);
  }

  move(floor: Floor, id: string): Location | undefined {
    return MOVES.make(floor, id);
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

  /** In the corridor the scan is the corridor's own: the door table (CorridorState.groovy:50-53). */
  scan(floor: Floor, seen: (place: Location) => boolean): ScanReport | undefined {
    return floor.corridor().scan(seen);
  }
}
