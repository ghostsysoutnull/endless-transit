import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { ScanReport } from './ScanReport.ts';

export const BUILDING_KIND = new LocationKind({
  key: 'building',
  title: 'Building',
  icon: '⌂',
  indexLabel: 'STRATA',
});

/** Where the elevator stands before anyone rides it: the lobby (Building.groovy:24). */
const LOBBY = 0;
/** A scan at an elevator reads this many floors either side (ScanCommand.groovy:147). */
const SCAN_REACH = 2;

/**
 * A building on a street: a name (one in twenty-five a landmark title), a size — how many floors, how many
 * doors on each — and its floors as children, child `n` being floor `n`. Its list runs from the top floor
 * down to the lobby (Guide:111). Its one state: the floor its elevator stands at — the last one arrived at —
 * which the list marks and the save keeps while the building is on the trail.
 */
export class Building extends Location {
  readonly #name: string;
  readonly #landmark: boolean;
  readonly #floors: number;
  readonly #doorsPerFloor: number;
  #elevatorAt = LOBBY;

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

  floors(): number {
    return this.#floors;
  }

  /** How many doors every corridor of this building has. */
  doorsPerFloor(): number {
    return this.#doorsPerFloor;
  }

  /** The number of the floor the elevator stands at. */
  elevatorAt(): number {
    return this.#elevatorAt;
  }

  /** A floor arrived at calls the elevator to itself (Floor.groovy:144). */
  elevatorTo(number: number): void {
    this.#elevatorAt = number;
  }

  /** The elevator's floor, as its number; nothing while it waits at the lobby. */
  override remember(): string | undefined {
    return this.#elevatorAt === LOBBY ? undefined : String(this.#elevatorAt);
  }

  /** A floor number in its own text form, ground to top; anything else is refused. */
  override recall(memento: string): boolean {
    const number = Number(memento);
    if (!Number.isInteger(number) || number < 0 || number >= this.#floors || String(number) !== memento) {
      return false;
    }
    this.#elevatorAt = number;
    return true;
  }

  /** Floors are listed top floor first (Guide:111; Building.groovy:283). */
  override listing(): readonly Location[] {
    return [...this.children()].reverse();
  }

  /** A floor is reached by the elevator: a path may only continue into the floor it stands at. */
  override admits(child: Location): boolean {
    return this.children()[this.#elevatorAt] === child;
  }

  description(): readonly string[] {
    return ['Analyzing vertical lattice structure...'];
  }

  /**
   * The vertical strata pulse a scan at an elevator reads (ScanCommand.groovy:136-153): the building's name
   * and size, and the floors within two of `number`, top first, each with its zone, the floor itself marked.
   */
  scanAround(number: number, seen: (place: Location) => boolean): ScanReport {
    const near = this.children()
      .filter((floor) => Math.abs(floor.ordinal() - number) <= SCAN_REACH)
      .sort((one, other) => other.ordinal() - one.ordinal());
    return {
      title: 'NEURAL_PROXIMITY_REPORT',
      notes: [`BUILDING: ${this.#name}`, `TOTAL_STRATA: ${String(this.#floors)} units detected.`],
      rows: near.map((floor) => ({
        cells: [
          { key: 'reading', label: 'ID', value: String(floor.ordinal()).padStart(2, '0') },
          ...floor.scanned(seen),
        ],
        place: undefined,
        current: floor.ordinal() === number,
        note: '',
      })),
    };
  }

  /** The building's theme, and the landmark banner when it is one (Building.groovy:141, 146-149). */
  override facts(): readonly Fact[] {
    const culture = this.vibe()?.culture();
    return [
      ...(culture === undefined ? [] : [{ key: 'culture', label: 'THEME', value: culture.key() } as const]),
      ...(this.#landmark
        ? [{ key: 'alert', label: 'UNIQUE_LOCUS_DETECTION', value: 'MAJOR_LANDMARK_DISCOVERED' } as const]
        : []),
    ];
  }

  status(): string {
    return 'STRUCTURAL_STABLE';
  }

  /** From the building down, the traveller is indoors. */
  override indoors(): boolean {
    return true;
  }

  childrenHeading(): string {
    return 'Building strata diagnostics:';
  }

  approachVerb(): string {
    return 'Access:';
  }
}
