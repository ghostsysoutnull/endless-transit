import type { Fact } from './Fact.ts';
import type { Floor } from './Floor.ts';
import type { FloorState } from './FloorState.ts';
import type { Location } from './Location.ts';
import type { Move } from './Move.ts';
import { MoveTable } from './MoveTable.ts';

/** Up unless this is the top floor, down unless the ground floor, and the corridor (ElevatorState.groovy:22-45). */
const MOVES = new MoveTable<Floor>([
  { move: { id: 'up', label: 'Go Up', opposite: 'down' }, to: (floor) => floor.neighbour(1) },
  { move: { id: 'down', label: 'Go Down', opposite: 'up' }, to: (floor) => floor.neighbour(-1) },
  {
    move: { id: 'corridor', label: 'Enter Corridor', opposite: 'elevator' },
    to: (floor) => floor,
    act: (floor) => {
      floor.enterCorridor();
    },
  },
]);
const STABILITY_DECIMALS = 2;

/**
 * At the elevator: vertical moves and the way into the corridor, and the floor diagnostic suite. Nothing
 * is listed — the doors are the corridor's business.
 */
export class ElevatorState implements FloorState {
  id(): string {
    return 'elevator';
  }

  listing(): readonly Location[] {
    return [];
  }

  moves(floor: Floor): readonly Move[] {
    return MOVES.offered(floor);
  }

  move(floor: Floor, id: string): Location | undefined {
    return MOVES.make(floor, id);
  }

  /** TECH_ERA, RESONANCE, STABILITY and ATMOS_SHIFT (Guide:351-354; ElevatorState.groovy:63-75). */
  facts(floor: Floor): readonly Fact[] {
    const vibe = floor.vibe();
    if (vibe === undefined) return [];
    return [
      { key: 'era', label: 'TECH_ERA', value: vibe.era().key() },
      { key: 'culture', label: 'RESONANCE', value: vibe.culture().key() },
      {
        key: 'reading',
        label: 'STABILITY',
        value: `${(vibe.stability() * 100).toFixed(STABILITY_DECIMALS)}%`,
      },
      { key: 'trait', label: 'ATMOS_SHIFT', value: vibe.mutation()?.key() ?? 'Standard' },
    ];
  }

  description(floor: Floor): readonly string[] {
    return [`${floor.name()}. ${floor.sentence()}`, 'Local signal is STABLE. Corridor access authorized.'];
  }

  status(): string {
    return 'SYSTEM_DIAGNOSTIC: [NOMINAL]';
  }

  childrenHeading(): string {
    return '';
  }

  approachVerb(): string {
    return '';
  }
}
