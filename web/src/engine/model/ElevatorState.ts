import type { Fact } from './Fact.ts';
import type { Floor } from './Floor.ts';
import { CORRIDOR_MOVE, DESCEND_MOVE, DOWN_MOVE, ELEVATOR_MOVE, UP_MOVE } from './FloorMoves.ts';
import type { FloorState } from './FloorState.ts';
import type { Location } from './Location.ts';
import type { Move } from './Move.ts';
import { MoveTable } from './MoveTable.ts';
import type { Portrait } from './Portrait.ts';
import type { ScanReport } from './ScanReport.ts';

/** The ground floor: below it lies the substrate, not another floor (ElevatorState.groovy:32-38). */
const GROUND = 0;
/**
 * Up unless this is the top floor, down unless the ground floor — where, once the bedrock is breached, the
 * descent into the substrate is offered instead (Guide:277-278) — and the corridor (ElevatorState.groovy:22-45).
 */
const MOVES = new MoveTable<Floor>([
  { move: { id: UP_MOVE, label: 'Go Up', opposite: DOWN_MOVE }, to: (floor) => floor.neighbour(1) },
  {
    move: { id: DOWN_MOVE, label: 'Go Down', opposite: UP_MOVE },
    to: (floor) => (floor.number() === GROUND ? undefined : floor.neighbour(-1)),
  },
  {
    move: { id: DESCEND_MOVE, label: 'Descend into the Substrate', opposite: UP_MOVE },
    to: (floor) => (floor.number() === GROUND ? floor.neighbour(-1) : undefined),
  },
  {
    move: { id: CORRIDOR_MOVE, label: 'Enter Corridor', opposite: ELEVATOR_MOVE },
    to: (floor) => floor,
    act: (floor) => {
      floor.enterCorridor();
    },
  },
]);

/**
 * At the elevator: vertical moves and the way into the corridor, and the floor diagnostic suite. Nothing
 * is listed — the doors are the corridor's business.
 */
export class ElevatorState implements FloorState {
  id(): string {
    return 'elevator';
  }

  /** At the elevator the floor is drawn as its building's tower, the car standing here (U02). */
  portrait(floor: Floor): Portrait {
    return floor.building().portrait();
  }

  listing(): readonly Location[] {
    return [];
  }

  /** Nobody is below a floor at its elevator. */
  admits(): boolean {
    return false;
  }

  moves(floor: Floor): readonly Move[] {
    return MOVES.offered(floor);
  }

  leadsTo(floor: Floor, id: string): Location | undefined {
    return MOVES.to(floor, id);
  }

  move(floor: Floor, id: string): Location | undefined {
    return MOVES.make(floor, id);
  }

  /** Era, culture, stability and trait (Guide:351-354; ElevatorState.groovy:63-75; plain words, U02). */
  facts(floor: Floor): readonly Fact[] {
    const vibe = floor.vibe();
    if (vibe === undefined) return [];
    return [
      vibe.era().fact(),
      vibe.culture().fact(),
      {
        key: 'reading',
        label: 'Stability',
        value: vibe.stabilityText(),
      },
      { key: 'trait', label: 'Trait', value: vibe.mutation()?.key() ?? 'Standard' },
    ];
  }

  description(floor: Floor): readonly string[] {
    return [`${floor.name()}. ${floor.sentence()}`];
  }

  status(floor: Floor): string {
    return floor.diagnostic();
  }

  childrenHeading(): string {
    return '';
  }

  /** At the elevator the scan is the building's vertical strata pulse around this floor (ElevatorState.groovy:83-86). */
  scan(floor: Floor, seen: (place: Location) => boolean): ScanReport | undefined {
    return floor.building().scanAround(floor.number(), seen);
  }
}
