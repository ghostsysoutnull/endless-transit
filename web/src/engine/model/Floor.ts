import type { Building } from './Building.ts';
import type { CorridorShape } from './CorridorShape.ts';
import { CorridorState } from './CorridorState.ts';
import { ElevatorState } from './ElevatorState.ts';
import type { Fact } from './Fact.ts';
import type { FloorState } from './FloorState.ts';
import type { Fragment } from './Fragment.ts';
import { Location } from './Location.ts';
import { Level } from './Level.ts';
import type { LevelRow } from './LevelRow.ts';
import type { LevelKind } from './LevelKind.ts';
import { LocationKind } from './LocationKind.ts';
import type { Move } from './Move.ts';
import type { Origin } from './Origin.ts';
import { Passage } from './Passage.ts';
import { Phrase } from './Phrase.ts';
import type { Portrait } from './Portrait.ts';
import type { ScanReport } from './ScanReport.ts';
import { CorridorPortrait } from './CorridorPortrait.ts';

export const FLOOR_KIND = new LocationKind({
  key: 'floor',
  glyph: 'floor',
  title: 'Floor',
  scale: '60 m',
  icon: '▤',
});

/** The two modes, stateless, shared by every floor; a saved mode id finds its state here — a new mode is one more entry. */
const ELEVATOR: FloorState = new ElevatorState();
const CORRIDOR: FloorState = new CorridorState();
const STATES_BY_ID: ReadonlyMap<string, FloorState> = new Map(
  [ELEVATOR, CORRIDOR].map((state) => [state.id(), state]),
);

/** The resonance a floor shows on the building's list, in hertz (Building.groovy:215-216). */
const RESONANCE = { min: 1000, max: 2999 };
/** A floor made without a peek at its corridor (a Layer, whose child is an Artery): nothing to draw. */
const NO_PASSAGE = new Passage('none', []);

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
  readonly #passage: Passage;
  #state: FloorState = ELEVATOR;

  constructor(
    origin: Origin<Building>,
    facts: { number: number; zone: string; sentence: string; passage?: Passage },
  ) {
    super(origin);
    this.#building = origin.parent;
    this.#number = facts.number;
    this.#zone = facts.zone;
    this.#sentence = facts.sentence;
    this.#passage = facts.passage ?? NO_PASSAGE;
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

  /** Its row on the tower's picture: its level, how its corridor runs and how its doors look — peeked, not made (U02). */
  override onTower(): readonly LevelRow[] {
    return [
      {
        address: this.address().toString(),
        level: this.level(),
        shape: this.#passage.shape(),
        looks: this.#passage.looks(),
      },
    ];
  }

  /** The level it stands at. */
  level(): Level {
    return new Level(this.#number, this.levelKind());
  }

  /** What stands at its level: a floor; a Layer answers otherwise. */
  levelKind(): LevelKind {
    return 'floor';
  }

  /** The mode decides what draws the floor: the tower at the elevator, the corridor in it (U02). */
  override portrait(): Portrait {
    return this.#state.portrait(this);
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

  /** The building's list beside the floor: its zone in plain words (`Hydroponic bay`; U02 — integrity and resonance went). */
  override readings(): readonly Fact[] {
    return [{ key: 'zone', label: 'Zone', value: new Phrase(this.#zone.replaceAll('_', ' ')).plain() }];
  }

  building(): Building {
    return this.#building;
  }

  /** The elevator's one-line diagnostic: none on a floor (U02, plain words); a Layer answers otherwise. */
  diagnostic(): string {
    return '';
  }

  /** A floor stands among the building's floors, never its Layers. */
  override peers(): readonly Location[] {
    return this.#building.children().slice(0, this.#building.floors());
  }

  /** A floor's map is its doors, at the elevator as in the corridor (the floor's own rooms; Guide:92). */
  override mapNodes(): readonly Location[] {
    return this.corridor().listing();
  }

  /** How its corridor runs: the peek's, the very shape the made corridor has. */
  shape(): CorridorShape {
    return this.#passage.shape();
  }

  /** The floor's one child. */
  /** Its corridor drawn, walked (U02, U04): how it runs, whether below the bedrock, each door as it looks — the picture in the corridor, and the corridor's band in the trace. */
  walked(): Portrait {
    const corridor = this.corridor();
    return new CorridorPortrait({
      shape: this.shape(),
      abyssal: corridor.abyssal(),
      doors: corridor.listing().flatMap((apartment) => apartment.onCorridor()),
    });
  }

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

  override leadsTo(id: string): Location | undefined {
    return this.#state.leadsTo(this, id);
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

  /** In the trace a floor is its building's tower, the car at its level (U04). */
  override bandPortrait(): Portrait {
    return this.#building.portrait();
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
