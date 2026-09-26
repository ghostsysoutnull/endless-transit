import type { Fact } from './Fact.ts';
import type { Figure } from './Figure.ts';
import type { Fragment } from './Fragment.ts';
import { Keystone } from './Keystone.ts';
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
/** The merges inside the building the ritual asks for (Guide:267-270; Building.groovy:34). */
const INFUSIONS = 7;
/** How deep the substrate goes: the pressure readout saturates at −10 (Guide:505-506, Building.groovy:95); a list has no bottomless form under the lazy-loading law. */
const SUBSTRATE_DEPTH = 10;
/** The fields of the memento, in the order they are written. */
const MEMENTO_FIELDS = ['elevator', 'sampled', 'merges', 'breached'];

/**
 * A building on a street: a name (one in twenty-five a landmark title), a size — how many floors, how many
 * doors on each — and its floors as children, child `n` being floor `n`, then the Layers of its substrate
 * past them (child `floors + k - 1` is Layer `-k`), reached only once the bedrock is breached. Its list runs
 * from the top floor down to the lobby (Guide:111), and on below it once breached. Its state: the floor its
 * elevator stands at — the last one arrived at — and the ritual (Guide:257-276; Building.groovy:19-35):
 * which floors a capture has sampled, how many merges happened inside, and whether the bedrock is breached.
 * The building answers "primed?", "keystone forged?", "breached?" itself; the save keeps all of it while
 * the building is on the trail (Decision 7 / HK-023: the old memento carried no breach flag).
 */
export class Building extends Location {
  readonly #name: string;
  readonly #landmark: boolean;
  readonly #floors: number;
  readonly #doorsPerFloor: number;
  #elevatorAt = LOBBY;
  readonly #sampled = new Set<number>();
  #merges = 0;
  #breached = false;

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

  /** How it stands on the street's picture: its floors and the doors on each. */
  override figure(): Figure {
    return { floors: this.#floors, doors: this.#doorsPerFloor };
  }

  floors(): number {
    return this.#floors;
  }

  /** How many Layers lie below the bedrock. */
  layers(): number {
    return SUBSTRATE_DEPTH;
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

  /**
   * The floor with this number: floor `n` is child `n`; Layer `-k` is child `floors + k - 1` and exists for
   * a traveller only once the bedrock is breached (Building.groovy:248-266); nothing past the top, nothing
   * below the ground of an unbreached building, nothing below the substrate.
   */
  floorNumbered(number: number): Location | undefined {
    if (number >= 0) return number < this.#floors ? this.children()[number] : undefined;
    return this.#breached ? this.children()[this.#floors - number - 1] : undefined;
  }

  /** The floors a capture has sampled, in the order sampled (Guide:263-266). */
  sampled(): readonly number[] {
    return [...this.#sampled];
  }

  /** A capture on floor `number` samples it; a Layer is no floor of the ritual (Building.groovy:26-31). */
  sampleFloor(number: number): void {
    if (number >= 0 && number < this.#floors) this.#sampled.add(number);
  }

  /** The merges made inside the building (Guide:267-270). */
  merges(): number {
    return this.#merges;
  }

  override infuse(): void {
    this.#merges += 1;
  }

  /** Every floor sampled and seven merges in (Building.groovy:33-35). */
  primed(): boolean {
    return this.#sampled.size >= this.#floors && this.#merges >= INFUSIONS;
  }

  breached(): boolean {
    return this.#breached;
  }

  /** This building's Keystone: identity by the building's address, the name display only (Guide:293-296). */
  override keystone(): Fragment {
    return new Keystone({ name: `${this.#name} Keystone`, building: this.address() });
  }

  /** A merge inside a primed building whose Keystone is not among what is held forges it (SynthesisService.groovy:15-16). */
  override forge(held: readonly Fragment[]): Fragment | undefined {
    return this.primed() && this.#keystoneAmong(held) === undefined ? this.keystone() : undefined;
  }

  /** The debug PRIME (Guide:438; PrimeBuildingCommand.groovy:17-20): every floor sampled, the count at seven. */
  override prime(): boolean {
    for (let number = 0; number < this.#floors; number++) this.#sampled.add(number);
    this.#merges = INFUSIONS;
    return true;
  }

  /** The breach is offered on the Peak of a primed, unbreached building whose Keystone is held (Floor.groovy:68-73). */
  breachOfferedAt(number: number, held: readonly Fragment[]): boolean {
    return (
      number === this.#floors - 1 &&
      this.primed() &&
      !this.#breached &&
      this.#keystoneAmong(held) !== undefined
    );
  }

  /** The breach from floor `number`: the Keystone used (to leave the buffer), the bedrock now open; nothing when not offered. */
  breachFrom(number: number, held: readonly Fragment[]): Fragment | undefined {
    if (!this.breachOfferedAt(number, held)) return undefined;
    this.#breached = true;
    return this.#keystoneAmong(held);
  }

  /** The elevator's floor, the sampled floors, the merges and the breach — only what is not default; nothing when all is. */
  override remember(): string | undefined {
    const memento: Record<string, unknown> = {};
    if (this.#elevatorAt !== LOBBY) memento.elevator = this.#elevatorAt;
    if (this.#sampled.size > 0) memento.sampled = [...this.#sampled];
    if (this.#merges > 0) memento.merges = this.#merges;
    if (this.#breached) memento.breached = true;
    return Object.keys(memento).length === 0 ? undefined : JSON.stringify(memento);
  }

  /** Only what this building could have written: a floor it has (a Layer only when breached), floors it could sample, a count, the breach as true. */
  override recall(memento: string): boolean {
    let data: unknown;
    try {
      data = JSON.parse(memento);
    } catch {
      return false;
    }
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return false;
    const fields = data as Record<string, unknown>;
    const keys = Object.keys(fields);
    if (keys.length === 0 || keys.some((key) => !MEMENTO_FIELDS.includes(key))) return false;
    const { elevator, sampled, merges, breached } = fields;
    if (breached !== undefined && breached !== true) return false;
    const open = breached === true;
    if (elevator !== undefined && !this.#isFloor(elevator, open)) return false;
    if (sampled !== undefined && !this.#areFloors(sampled)) return false;
    if (merges !== undefined && (!Number.isInteger(merges) || (merges as number) < 1)) return false;
    this.#elevatorAt = (elevator as number | undefined) ?? LOBBY;
    this.#sampled.clear();
    for (const number of (sampled as number[] | undefined) ?? []) this.#sampled.add(number);
    this.#merges = (merges as number | undefined) ?? 0;
    this.#breached = open;
    return true;
  }

  /** Floors are listed top floor first (Guide:111; Building.groovy:283), and the Layers below the lobby once breached. */
  override listing(): readonly Location[] {
    const children = this.children();
    return [
      ...children.slice(0, this.#floors).reverse(),
      ...(this.#breached ? children.slice(this.#floors) : []),
    ];
  }

  /** A floor is reached by the elevator: a path may only continue into the floor it stands at. */
  override admits(child: Location): boolean {
    return this.floorNumbered(this.#elevatorAt) === child;
  }

  description(): readonly string[] {
    return ['Analyzing vertical lattice structure...'];
  }

  /**
   * The vertical strata pulse a scan at an elevator reads (ScanCommand.groovy:136-153): the building's name
   * and size, and the floors within two of `number`, top first, each with its zone, the floor itself marked.
   */
  scanAround(number: number, seen: (place: Location) => boolean): ScanReport {
    const near = this.listing()
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

  /** The ritual's status line (Building.groovy:112-117). */
  status(): string {
    if (this.#breached) return 'BEDROCK_BREACHED';
    if (this.#merges > 0) return `INFUSION_ACTIVE: ${String(this.#merges)}`;
    return 'STRUCTURAL_STABLE';
  }

  /** From the building down, the traveller is indoors. */
  override indoors(): boolean {
    return true;
  }

  /** The trace's note (Building.groovy:120-124): the breach once made, the floor count before it. */
  override meta(): string {
    return this.#breached ? ' [BREACHED]' : ` [FLOORS: ${String(this.#floors)}]`;
  }

  childrenHeading(): string {
    return 'Building strata diagnostics:';
  }

  approachVerb(): string {
    return 'Access:';
  }

  /** The held fragment that is this building's Keystone, if any (Building.groovy:37-40). */
  #keystoneAmong(held: readonly Fragment[]): Fragment | undefined {
    const key = this.keystone().key();
    return held.find((fragment) => fragment.key() === key);
  }

  /** A whole floor number the building has: 1 … top, or a Layer's when the bedrock is open; never the lobby (the default). */
  #isFloor(value: unknown, open: boolean): boolean {
    if (typeof value !== 'number' || !Number.isInteger(value) || value === LOBBY) return false;
    if (value > 0) return value < this.#floors;
    return open && this.#floors - value - 1 < this.children().length;
  }

  /** A non-empty list of distinct floor numbers of this building. */
  #areFloors(value: unknown): boolean {
    if (!Array.isArray(value) || value.length === 0) return false;
    const numbers = value as unknown[];
    if (!numbers.every((n) => typeof n === 'number' && Number.isInteger(n) && n >= 0 && n < this.#floors)) {
      return false;
    }
    return new Set(numbers).size === numbers.length;
  }
}
