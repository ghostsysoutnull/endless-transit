import type { Seed } from '#engine/rng/Seed.ts';
import { Address } from './Address.ts';
import type { Capture } from './Capture.ts';
import type { Contents } from './Contents.ts';
import type { Echo } from './Echo.ts';
import type { Era } from './Era.ts';
import type { Fact } from './Fact.ts';
import type { Fragment } from './Fragment.ts';
import type { LocationKind } from './LocationKind.ts';
import type { Move } from './Move.ts';
import type { Origin } from './Origin.ts';
import type { ScanReport } from './ScanReport.ts';
import type { Vibe } from './Vibe.ts';

/** Below the bedrock every node of the map is this (Guide:279; Room.groovy:143-146). */
const VOID_GLYPH = '☠';
const MAP_SPOT = 'map';

/**
 * A place in the world tree. Owns the **lazy-loading law**: children live behind a private backing array
 * and exist only after `children()` is asked — once, through the injected `ChildSource`. There is no other
 * way to reach them, so nothing can bypass the population check.
 *
 * Each kind answers for itself — what it is called, what it shows, how its children are reached, where a
 * traveller who enters it ends up, what moves it offers, what it remembers — so nobody ever asks "which
 * kind are you?".
 */
export abstract class Location {
  readonly #origin: Origin;
  #children: readonly Location[] | undefined;

  constructor(origin: Origin) {
    this.#origin = origin;
  }

  abstract kind(): LocationKind;
  abstract name(): string;
  /** The narrative of the place, one paragraph per entry. */
  abstract description(): readonly string[];
  /** The one-line diagnostic of the place. */
  abstract status(): string;
  /** The line above the list of children. */
  abstract childrenHeading(): string;
  /** How a traveller here reaches a child: the words before the child's call sign (`Land on`). */
  abstract approachVerb(): string;

  /** How this place is announced on its parent's list. */
  callSign(): string {
    return this.name();
  }

  /** The number this place shows on its parent's list; one-based, unless the kind counts differently. */
  ordinal(): number {
    return this.index() + 1;
  }

  /** Whether this place goes by its own number on its parent's list (a floor, Guide:111) rather than by its position. */
  goesByNumber(): boolean {
    return false;
  }

  facts(): readonly Fact[] {
    return [];
  }

  /** The readings shown beside this place on its parent's list; none unless the kind has some. */
  readings(): readonly Fact[] {
    return [];
  }

  /** The places a traveller here may go into, in the order they are listed — the children, unless the kind lists otherwise. */
  listing(): readonly Location[] {
    return this.children();
  }

  /**
   * Whether a path may continue from here into this child right now — the place's own state permitting: it
   * is listed, unless the kind has another rule (a floor lets nobody past its elevator; a building's floors
   * are reached by its elevator). A save whose path breaks this rule is not one this world could have written.
   */
  admits(child: Location): boolean {
    return this.listing().includes(child);
  }

  /** Where a traveller who moves into this place actually ends up: here, unless the kind hands travellers on. Pure. */
  // eslint-disable-next-line @typescript-eslint/prefer-return-this-type -- a kind may answer with another place
  arrival(): Location {
    return this;
  }

  /**
   * The act of arriving: whatever the kind does when a traveller lands here (a floor calls the elevator),
   * then `arrival()` — and a place that hands travellers on lets the place they land in arrive in turn.
   */
  arrive(): Location {
    const to = this.arrival();
    return to === this ? this : to.arrive();
  }

  /** Whether the parent's list marks this place as the current one — where the carrier stands (a floor: the elevator's). */
  current(): boolean {
    return false;
  }

  /** Where leaving this place goes — wherever the parent receives travellers; nothing when there is no way out. Pure. */
  exit(): Location | undefined {
    return this.parent()?.arrival();
  }

  /** The act of leaving: whatever the kind does on the way out, then `exit()`. */
  leave(): Location | undefined {
    return this.exit();
  }

  leaveLabel(): string {
    return `Leave ${this.kind().title()}`;
  }

  /** The moves on offer here besides entering a child or leaving; none unless the kind has some. */
  moves(): readonly Move[] {
    return [];
  }

  /** Makes the move with this id and says where the traveller stands after it; nothing when there is no such move. */
  move(id: string): Location | undefined {
    if (this.moves().some((move) => move.id === id)) {
      throw new Error(`${this.kind().key()} offers the move '${id}' but does not make it`);
    }
    return undefined;
  }

  /** What a save must keep of this place's own state, as text; nothing when it is in its default state. */
  remember(): string | undefined {
    return undefined;
  }

  /** Takes back a state `remember()` wrote; false when this place cannot be in that state. */
  recall(memento: string): boolean {
    return memento === this.remember();
  }

  /** Where a new journey into this place starts: the first child all the way down, until a kind claims the start. */
  startOfJourney(): Location {
    return this.children()[0]?.startOfJourney() ?? this;
  }

  /** A sealed place is listed but cannot be entered — nothing stands inside it. */
  sealed(): boolean {
    return false;
  }

  /** A place its parent's list should make stand out. */
  landmark(): boolean {
    return false;
  }

  /** What lies here — relics and furniture — for a kind that holds things (a room); nothing for every other kind. */
  contents(): Contents | null {
    return null;
  }

  /**
   * What a scan reads here (Guide:87: doors, nearby floors or the rooms of the apartment); nothing for a kind
   * with no scan-compatible structure. `seen` says which places the traveller has been to — the model is told,
   * it never asks the player.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- the default reads nothing; a kind that scans does
  scan(_seen: (place: Location) => boolean): ScanReport | undefined {
    return undefined;
  }

  /** What a scan of the list this place is on reads about it (a door's trace, a room's frequency); nothing for most kinds. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- the default reads nothing; a room does
  scanned(_seen: (place: Location) => boolean): readonly Fact[] {
    return [];
  }

  /** The sensory line a scan reads under this place's row (a door's); empty for most kinds. */
  sensed(): string {
    return '';
  }

  /** The fragment a capture of relic `key` here yields — what the room dealt, at what it is worth here; nothing for every other kind or a relic not dealt here. */
  findRelic(key: string): Fragment | undefined {
    return this.contents()?.objects.find((each) => each.key() === key);
  }

  /** Takes what lies here at `index` out of the place; nothing when nothing lies there or the kind holds nothing. */
  capture(index: number): Capture | undefined {
    if (this.contents()?.objects[index] !== undefined) {
      throw new Error(`${this.kind().key()} holds things but does not hand them over`);
    }
    return undefined;
  }

  /** Lays a fragment down here, to be taken again; false when the kind holds nothing. */
  drop(fragment: Fragment): boolean {
    if (this.contents() !== null) {
      throw new Error(`${this.kind().key()} holds things but takes none in (${fragment.name()})`);
    }
    return false;
  }

  /** The free lottery (Guide:186-190): what a room hands over on the move that landed here at `steps`; nothing for every other kind. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- the default rolls nothing; a room does
  lottery(_steps: number): Fragment | undefined {
    return undefined;
  }

  /** The echo this place holds and the hunt for it (Guide:192-195); nothing for every kind but a Null Reach. */
  echo(): Echo | undefined {
    return undefined;
  }

  /** A capture happened here: the floor above hears of it and tells its building (the ritual, Guide:263-266); nothing above a building. */
  sample(): void {
    this.parent()?.sample();
  }

  /** A merge happened here: the building above counts it (Guide:267-270); nothing above a building. */
  infuse(): void {
    this.parent()?.infuse();
  }

  /** What a merge here yields instead of a hybrid, given what is held: a primed building's Keystone; nothing anywhere else. */
  forge(held: readonly Fragment[]): Fragment | undefined {
    return this.parent()?.forge(held);
  }

  /** The Keystone of the building this place is in — a fresh value, identity by the building's address; nothing outside a building. */
  keystone(): Fragment | undefined {
    return this.parent()?.keystone();
  }

  /** The debug PRIME (Guide:438) on the building this place is in; false where there is none. */
  prime(): boolean {
    return this.parent()?.prime() ?? false;
  }

  /** Whether the bedrock can be breached from here with what is held (Guide:275-276); only a floor ever says yes. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- the default reads nothing; a floor does
  breachOffered(_held: readonly Fragment[]): boolean {
    return false;
  }

  /** Breaches the bedrock from here: the Keystone used, to be taken out of what was held; nothing when it is not offered. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- the default reads nothing; a floor does
  breach(_held: readonly Fragment[]): Fragment | undefined {
    return undefined;
  }

  /** Whether this place is below a building's bedrock (the Groovy `isAbyssal`): the parent's answer, false at the top. */
  abyssal(): boolean {
    return this.parent()?.abyssal() ?? false;
  }

  /** The places this one is counted among on the HUD (`ORBIT 02/05`): its parent's children, unless the kind counts otherwise; none at the top. */
  peers(): readonly Location[] {
    return this.parent()?.children() ?? [];
  }

  /** The universe this place is in — the top of its trail. */
  root(): Location {
    return this.parent()?.root() ?? this;
  }

  /** Whether this place is inside a building — where the HUD's map gives way to telemetry (TelemetryComponent.groovy:48-55). */
  indoors(): boolean {
    return this.parent()?.indoors() ?? false;
  }

  /** Whether a map can be drawn of this place — its children on a grid; every kind but a room (Guide:92). */
  mapped(): boolean {
    return true;
  }

  /** The places a map of this one plots (Guide:92: "the children of the place you are in"): what it lists, unless the kind maps otherwise. */
  mapNodes(): readonly Location[] {
    return this.listing();
  }

  /** The glyph this place is plotted with on its parent's map: `☠` below the bedrock (Guide:279), else its kind's icon. One owner. */
  mapGlyph(): string {
    return this.abyssal() ? VOID_GLYPH : this.kind().icon();
  }

  /** The cell this place takes on its parent's map, drawn from its own seed (Container.groovy:59-62) — the same at every visit. */
  mapSpot(width: number, height: number): { readonly x: number; readonly y: number } {
    const spot = this.seed().branch(MAP_SPOT);
    return { x: spot.branch('x').range(0, width - 1), y: spot.branch('y').range(0, height - 1) };
  }

  /** What the lattice trace says beside this place's name (`[FLOORS: 16]`, LatticeTraceComponent.groovy:67); empty for most kinds. */
  meta(): string {
    return '';
  }

  /** How much more a prompt costs here than at the surface: the parent's, 1 at the top — the bedrock (I07) answers 2 (Guide:137-139). */
  drainFactor(): number {
    return this.parent()?.drainFactor() ?? 1;
  }

  /** What the planet above decided; nothing above planet level. */
  vibe(): Vibe | undefined {
    return this.parent()?.vibe();
  }

  /**
   * The era the drain reads here: the header's — what the planet decided for this part of the world, as
   * the street shows it under `TECH_ERA` — never a place's own. An apartment that drifted to the second era
   * still costs what its street costs (Guide:313); nothing above planet level. One owner: no kind overrides it.
   */
  drainEra(): Era | undefined {
    return this.vibe()?.era();
  }

  /** How much likelier landmarks are below this place; 1 unless something above says otherwise. */
  landmarkFactor(): number {
    return this.parent()?.landmarkFactor() ?? 1;
  }

  seed(): Seed {
    return this.#origin.seed;
  }

  parent(): Location | undefined {
    return this.#origin.parent;
  }

  /** Zero-based position among the siblings. */
  index(): number {
    return this.#origin.index;
  }

  address(): Address {
    return this.parent()?.address().child(this.index()) ?? new Address([]);
  }

  depth(): number {
    return this.address().depth();
  }

  /** From the universe down to here. */
  trail(): readonly Location[] {
    return [...(this.parent()?.trail() ?? []), this];
  }

  children(): readonly Location[] {
    this.#children ??= Object.freeze([...this.#origin.children.childrenOf(this)]);
    return this.#children;
  }

  /** Whether the children have been generated yet. */
  populated(): boolean {
    return this.#children !== undefined;
  }

  /**
   * The place an address names, seen from here (this location must be the universe of that address).
   * One strict walker: an index nobody answers, or a sealed place on the way, is nowhere.
   */
  descendant(address: Address): Location | undefined {
    if (this.sealed()) return undefined;
    return address
      .indices()
      .slice(this.depth())
      .reduce<Location | undefined>((here, index) => {
        const next = here?.children()[index];
        return next?.sealed() === true ? undefined : next;
      }, this);
  }

  /**
   * The place an address names, sealed or not — a place that exists but cannot be stood in (a Layer of an
   * unbreached building). A traveller's footprints may name one: the world was rebuilt under them (the
   * reboot keeps the visited path, Guide:145-146).
   */
  locate(address: Address): Location | undefined {
    return address
      .indices()
      .slice(this.depth())
      .reduce<Location | undefined>((here, index) => here?.children()[index], this);
  }
}
