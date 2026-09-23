import type { Building } from './Building.ts';
import { CorridorState } from './CorridorState.ts';
import { ElevatorState } from './ElevatorState.ts';
import type { Fact } from './Fact.ts';
import type { FloorState } from './FloorState.ts';
import type { Fragment } from './Fragment.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Move } from './Move.ts';
import type { Origin } from './Origin.ts';
import type { ScanReport } from './ScanReport.ts';

export const FLOOR_KIND = new LocationKind({ key: 'floor', title: 'Floor', icon: '▤', indexLabel: 'Z-AXIS' });

/** The two modes, stateless, shared by every floor; a saved mode id finds its state here — a new mode is one more entry. */
const ELEVATOR: FloorState = new ElevatorState();
const CORRIDOR: FloorState = new CorridorState();
const STATES_BY_ID: ReadonlyMap<string, FloorState> = new Map(
  [ELEVATOR, CORRIDOR].map((state) => [state.id(), state]),
);

/** The resonance a floor shows on the building's list, in hertz (Building.groovy:215-216). */
const RESONANCE = { min: 1000, max: 2999 };
const INTEGRITY = '100%';

/**
 * A floor of a building: child `n` of the building is floor `n`, and its one child is its corridor. The
 * floor is in one of two modes — at the elevator or in the corridor — and asks that state everything the
 * mode decides. The mode changes only through `enterCorridor` / `returnToElevator`, and leaving the floor
 * from the corridor hands it back to the elevator (HK-019), so the next visit opens at the elevator.
 */
export class Floor extends Location {
  readonly #building: Building;
  readonly #number: number;
  readonly #zone: string;
  readonly #sentence: string;
  #state: FloorState = ELEVATOR;

  constructor(origin: Origin<Building>, facts: { number: number; zone: string; sentence: string }) {
    super(origin);
    this.#building = origin.parent;
    this.#number = facts.number;
    this.#zone = facts.zone;
    this.#sentence = facts.sentence;
  }

  kind(): LocationKind {
    return FLOOR_KIND;
  }

  number(): number {
    return this.#number;
  }

  name(): string {
    return `Floor ${String(this.#number)}`;
  }

  /** What the building's list calls it: the ground floor is the Lobby, the top floor the Peak (Building.groovy:208). */
  override callSign(): string {
    if (this.#number === 0) return 'Lobby';
    if (this.#number === this.#building.floors() - 1) return 'Peak';
    return this.name();
  }

  /** On the building's list a floor goes by its number, and the ground floor is 0 (Guide:111). */
  override ordinal(): number {
    return this.#number;
  }

  override goesByNumber(): boolean {
    return true;
  }

  /** Arriving at a floor calls the building's elevator to it (Floor.groovy:144). */
  override arrive(): Location {
    this.#building.elevatorTo(this.#number);
    return this;
  }

  /** The elevator column's `[>X<]`: the floor the building's elevator stands at (Building.groovy:187-189, 198-201). */
  override current(): boolean {
    return this.#building.elevatorAt() === this.#number;
  }

  zone(): string {
    return this.#zone;
  }

  /** The sentence the floor was dealt at creation, the culture already filled in. */
  sentence(): string {
    return this.#sentence;
  }

  resonance(): number {
    return this.seed().branch('resonance').range(RESONANCE.min, RESONANCE.max);
  }

  /** The building's list beside the floor: its zone, its integrity and its resonance (Building.groovy:211-217). */
  override readings(): readonly Fact[] {
    return [
      { key: 'zone', label: 'FUNCTION', value: this.#zone },
      { key: 'reading', label: 'ST', value: INTEGRITY },
      { key: 'reading', label: 'RES', value: `${String(this.resonance())}Hz` },
    ];
  }

  building(): Building {
    return this.#building;
  }

  /** The elevator's one-line diagnostic (ElevatorState.groovy status); a Layer answers otherwise. */
  diagnostic(): string {
    return 'SYSTEM_DIAGNOSTIC: [NOMINAL]';
  }

  /** A floor stands among the building's floors, never its Layers. */
  override peers(): readonly Location[] {
    return this.#building.children().slice(0, this.#building.floors());
  }

  /** A floor's map is its doors, at the elevator as in the corridor (the floor's own rooms; Guide:92). */
  override mapNodes(): readonly Location[] {
    return this.corridor().listing();
  }

  /** The floor's one child. */
  corridor(): Location {
    const corridor = this.children()[0];
    if (corridor === undefined) throw new Error(`${this.name()} has no corridor`);
    return corridor;
  }

  /** The floor `steps` above (below when negative) in the same building; nothing past the top, nothing below the ground until the bedrock is breached. */
  neighbour(steps: number): Location | undefined {
    return this.#building.floorNumbered(this.#number + steps);
  }

  /** A capture under this floor samples it for the ritual (RitualTracker.groovy:26-33). */
  override sample(): void {
    this.#building.sampleFloor(this.#number);
  }

  /** The breach is a fact about the floor, not the mode (HK-018; Floor.groovy:64-80): the building decides. */
  override breachOffered(held: readonly Fragment[]): boolean {
    return this.#building.breachOfferedAt(this.#number, held);
  }

  override breach(held: readonly Fragment[]): Fragment | undefined {
    return this.#building.breachFrom(this.#number, held);
  }

  /** Spatial pivot, elevator → corridor. The only way into the corridor mode. */
  enterCorridor(): void {
    this.#state = CORRIDOR;
  }

  /** Spatial pivot, corridor → elevator. The only way back. */
  returnToElevator(): void {
    this.#state = ELEVATOR;
  }

  override listing(): readonly Location[] {
    return this.#state.listing(this);
  }

  override admits(child: Location): boolean {
    return this.#state.admits(this, child);
  }

  override moves(): readonly Move[] {
    return this.#state.moves(this);
  }

  override move(id: string): Location | undefined {
    return this.#state.move(this, id);
  }

  /** Walking out of the floor from the corridor hands it back to the elevator (HK-019; Guide:113). */
  override leave(): Location | undefined {
    this.returnToElevator();
    return this.exit();
  }

  override remember(): string | undefined {
    return this.#state === ELEVATOR ? undefined : this.#state.id();
  }

  override recall(memento: string): boolean {
    const state = STATES_BY_ID.get(memento);
    if (state === undefined) return false;
    this.#state = state;
    return true;
  }

  override facts(): readonly Fact[] {
    return this.#state.facts(this);
  }

  description(): readonly string[] {
    return this.#state.description(this);
  }

  status(): string {
    return this.#state.status(this);
  }

  childrenHeading(): string {
    return this.#state.childrenHeading(this);
  }

  approachVerb(): string {
    return this.#state.approachVerb(this);
  }

  /** What a scan on this floor inspects is decided by the mode, never by the caller (Floor.groovy:82-85). */
  override scan(seen: (place: Location) => boolean): ScanReport | undefined {
    return this.#state.scan(this, seen);
  }

  /** The building's strata pulse reads a floor's zone (ScanCommand.groovy:149-150). */
  override scanned(): readonly Fact[] {
    return [{ key: 'zone', label: 'FUNCTION', value: this.#zone }];
  }
}
