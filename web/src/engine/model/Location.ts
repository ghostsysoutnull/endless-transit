import type { Seed } from '#engine/rng/Seed.ts';
import { Address } from './Address.ts';
import type { Contents } from './Contents.ts';
import type { Fact } from './Fact.ts';
import type { LocationKind } from './LocationKind.ts';
import type { Move } from './Move.ts';
import type { Origin } from './Origin.ts';
import type { Vibe } from './Vibe.ts';

/** The locus hash is two readings of 0.000 … 99.999, each drawn in thousandths. */
const HASH_STEPS = 1000;
const HASH_TOP = 100 * HASH_STEPS - 1;

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

  /** Whether this place is inside a building — where the HUD's map gives way to telemetry (TelemetryComponent.groovy:48-55). */
  indoors(): boolean {
    return this.parent()?.indoors() ?? false;
  }

  /** How much more a prompt costs here than at the surface: the parent's, 1 at the top — the bedrock (I07) answers 2 (Guide:137-139). */
  drainFactor(): number {
    return this.parent()?.drainFactor() ?? 1;
  }

  /** What the planet above decided; nothing above planet level. */
  vibe(): Vibe | undefined {
    return this.parent()?.vibe();
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

  /**
   * The HUD's LOCUS_HASH: looks like coordinates, is decorative — a stable random pair per place, drawn
   * from the place's own seed (the Groovy `getCoordinates`).
   */
  hash(): string {
    const coords = this.seed().branch('coords');
    const reading = (axis: string): string =>
      (coords.branch(axis).range(0, HASH_TOP) / HASH_STEPS).toFixed(3);
    return `${reading('x')} / ${reading('y')}`;
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
    let here: Location | undefined = this.sealed() ? undefined : this;
    for (const index of address.indices().slice(this.depth())) {
      here = here?.children()[index];
      if (here?.sealed() === true) return undefined;
    }
    return here;
  }
}
