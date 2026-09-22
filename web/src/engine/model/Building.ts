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

/**
 * A building on a street: a name (one in twenty-five a landmark title), a size — how many floors, how many
 * doors on each — and its floors as children, child `n` being floor `n`. Its list runs from the top floor
 * down to the lobby (Guide:111).
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

  floors(): number {
    return this.#floors;
  }

  /** How many doors every corridor of this building has. */
  doorsPerFloor(): number {
    return this.#doorsPerFloor;
  }

  /** Floors are listed top floor first (Guide:111; Building.groovy:283). */
  override listing(): readonly Location[] {
    return [...this.children()].reverse();
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
