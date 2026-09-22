import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';

export const BUILDING_KIND = new LocationKind({
  key: 'building',
  title: 'Building',
  icon: '⌂',
  indexLabel: 'STRATA',
});

/**
 * A building on a street. For now it is a name, a size and — for one in twenty-five — a landmark title:
 * it is **sealed**, listed but not enterable. Its inside (floors, elevator, corridors) is iteration I03,
 * which removes `sealed()` and gives its factory something to populate.
 */
export class Building extends Location {
  readonly #name: string;
  readonly #landmark: boolean;
  readonly #floors: number;
  readonly #doorsPerFloor: number;

  constructor(
    origin: Origin,
    facts: { name: string; landmark: boolean; floors: number; doorsPerFloor: number },
  ) {
    super(origin);
    this.#name = facts.name;
    this.#landmark = facts.landmark;
    this.#floors = facts.floors;
    this.#doorsPerFloor = facts.doorsPerFloor;
  }

  kind(): LocationKind {
    return BUILDING_KIND;
  }

  name(): string {
    return this.#name;
  }

  override landmark(): boolean {
    return this.#landmark;
  }

  override sealed(): boolean {
    return true;
  }

  floors(): number {
    return this.#floors;
  }

  /** How many doors every corridor of this building has. */
  doorsPerFloor(): number {
    return this.#doorsPerFloor;
  }

  description(): readonly string[] {
    return [];
  }

  status(): string {
    return 'ACCESS: [SEALED]';
  }

  childrenHeading(): string {
    return '';
  }

  approachVerb(): string {
    return '';
  }
}
