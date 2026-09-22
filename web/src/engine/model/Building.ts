import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';

export const BUILDING_KIND = new LocationKind({
  key: 'building',
  title: 'Building',
  icon: '⌂',
  indexLabel: 'STRATA',
});

/** Where the elevator stands before anyone rides it: the lobby (Building.groovy:24). */
const LOBBY = 0;

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

  childrenHeading(): string {
    return 'Building strata diagnostics:';
  }

  approachVerb(): string {
    return 'Access:';
  }
}
