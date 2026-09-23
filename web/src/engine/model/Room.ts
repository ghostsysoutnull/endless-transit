import type { Apartment } from './Apartment.ts';
import type { Atmosphere } from './Atmosphere.ts';
import type { Capture } from './Capture.ts';
import type { Contents } from './Contents.ts';
import type { Fact } from './Fact.ts';
import type { Fragment } from './Fragment.ts';
import { FragmentReader } from './FragmentReader.ts';
import { Gematria } from './Gematria.ts';
import { Glitch } from './Glitch.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Move } from './Move.ts';
import { MoveTable } from './MoveTable.ts';
import type { Origin } from './Origin.ts';
import type { Relic } from './Relic.ts';
import { RelicFragment } from './RelicFragment.ts';
import type { RoomCategory } from './RoomCategory.ts';

export const ROOM_KIND = new LocationKind({ key: 'room', title: 'Room', icon: '□', indexLabel: 'CELL' });

/** Under an anomaly the interpretation is glitched: structure, walls and lighting each at its own share (Room.groovy:268-272). */
const STATIC = new Glitch();
const GLITCHED = { structure: 0.2, walls: 0.1, lighting: 0.3 } as const;
const STATIC_KEY = 'static';
/** Reads dropped fragments back from a memento, through the world (stateless). */
const READER = new FragmentReader();

/** Back to the previous room unless this is the first, forward to the next unless it is the last. */
const MOVES = new MoveTable<Room>([
  { move: { id: 'back', label: 'Go back', opposite: 'forward' }, to: (room) => room.neighbour(-1) },
  { move: { id: 'forward', label: 'Go forward', opposite: 'back' }, to: (room) => room.neighbour(1) },
]);

/**
 * A room of an apartment — the bottom of the world, where the traveller stands. Rooms are walked in order:
 * forward to the next, back to the previous, and only the first room has the way out, to the corridor
 * (Guide:76, 115; Room.groovy:243-257). Its words are its culture's, its era's and its trait's. It is the
 * kind that holds things: the relics the apartment dealt it, at what they are worth here, and whatever
 * was dropped here — and it remembers what was taken and what was dropped (Guide:365, Room.groovy:91-99).
 */
export class Room extends Location {
  readonly #apartment: Apartment;
  readonly #name: string;
  readonly #category: RoomCategory;
  readonly #atmosphere: Atmosphere;
  readonly #traits: { oxygen: number; temperature: number; signal: string };
  readonly #furniture: readonly string[];
  /** The keys of the dealt relics taken from here, in the order taken. */
  readonly #taken: string[] = [];
  /** What was dropped here, in the order dropped. */
  readonly #dropped: Fragment[] = [];

  constructor(
    origin: Origin<Apartment>,
    facts: {
      name: string;
      category: RoomCategory;
      atmosphere: Atmosphere;
      traits: { oxygen: number; temperature: number; signal: string };
      furniture: readonly string[];
    },
  ) {
    super(origin);
    this.#apartment = origin.parent;
    this.#name = facts.name;
    this.#category = facts.category;
    this.#atmosphere = facts.atmosphere;
    this.#traits = facts.traits;
    this.#furniture = Object.freeze([...facts.furniture]);
  }

  kind(): LocationKind {
    return ROOM_KIND;
  }

  name(): string {
    return this.#name;
  }

  type(): string {
    return this.#category.name();
  }

  category(): RoomCategory {
    return this.#category;
  }

  oxygen(): number {
    return this.#traits.oxygen;
  }

  temperature(): number {
    return this.#traits.temperature;
  }

  signal(): string {
    return this.#traits.signal;
  }

  /** What the room is made of and lit by — the words its description is built from. */
  atmosphere(): Atmosphere {
    return this.#atmosphere;
  }

  /** One to three pieces of the culture's furniture in some condition; not loot (Guide:171). */
  furniture(): readonly string[] {
    return this.#furniture;
  }

  /**
   * What lies here now: the relics the apartment dealt to this room (Guide:167: objects live in apartments)
   * that nobody has taken, then whatever was dropped here, in the order it was dropped.
   */
  objects(): readonly Fragment[] {
    return [...this.#dealt().map((relic) => this.#found(relic)), ...this.#dropped];
  }

  /** A room is the kind that holds things: its relics and its furniture. */
  override contents(): Contents {
    return { objects: this.objects(), furniture: this.furniture() };
  }

  /** The relic the apartment dealt here under this key, at what it is worth in this room — taken or not. */
  override findRelic(key: string): Fragment | undefined {
    const relic = this.#apartment.relicsIn(this.index()).find((each) => each.key() === key);
    return relic === undefined ? undefined : this.#found(relic);
  }

  /**
   * Takes what lies at `index` (Room.groovy:213-228): a dealt relic leaves the deal for good and is a fresh
   * capture; a dropped fragment leaves the floor as it was, not fresh.
   */
  override capture(index: number): Capture | undefined {
    const dealt = this.#dealt();
    if (!Number.isInteger(index) || index < 0) return undefined;
    if (index < dealt.length) {
      const relic = dealt[index];
      if (relic === undefined) return undefined;
      this.#taken.push(relic.key());
      return { fragment: this.#found(relic), fresh: true };
    }
    const [fragment] = this.#dropped.splice(index - dealt.length, 1);
    return fragment === undefined ? undefined : { fragment, fresh: false };
  }

  /** A fragment laid down here stays, with its frequency, until it is taken again (Guide:448-449; Decision 7). */
  override drop(fragment: Fragment): boolean {
    this.#dropped.push(fragment);
    return true;
  }

  /** The keys taken from the deal, in order, and the dropped fragments as data; nothing while the room is as dealt. */
  override remember(): string | undefined {
    if (this.#taken.length === 0 && this.#dropped.length === 0) return undefined;
    return JSON.stringify({ taken: this.#taken, dropped: this.#dropped.map((fragment) => fragment.data()) });
  }

  /** Only what this room could have written: keys it dealt, each once; fragments the world reads back. */
  override recall(memento: string): boolean {
    let data: unknown;
    try {
      data = JSON.parse(memento);
    } catch {
      return false;
    }
    if (typeof data !== 'object' || data === null || Array.isArray(data)) return false;
    const { taken, dropped, ...rest } = data as Record<string, unknown>;
    if (Object.keys(rest).length > 0 || !Array.isArray(taken)) return false;
    const keys = taken as unknown[];
    const dealt = new Set(this.#apartment.relicsIn(this.index()).map((relic) => relic.key()));
    if (!keys.every((key): key is string => typeof key === 'string' && dealt.has(key))) return false;
    if (new Set(keys).size !== keys.length) return false;
    const fragments = READER.readAll(dropped, this.root());
    if (fragments === undefined || (keys.length === 0 && fragments.length === 0)) return false;
    this.#taken.splice(0, this.#taken.length, ...keys);
    this.#dropped.splice(0, this.#dropped.length, ...fragments);
    return true;
  }

  /** The dealt relics still lying here. */
  #dealt(): readonly Relic[] {
    return this.#apartment.relicsIn(this.index()).filter((relic) => !this.#taken.includes(relic.key()));
  }

  /**
   * What a relic is worth in this room (Room.groovy:165-173): its name's gematria at this depth, and a
   * tenth more when the apartment's culture is the one the street header shows — which also makes the
   * capture resonant.
   */
  #found(relic: Relic): Fragment {
    const header = this.vibe()?.culture();
    const resonant = header !== undefined && this.#apartment.culture().equals(header);
    const frequency = new Gematria(relic.name()).frequencyAt(this.depth());
    return new RelicFragment({
      relic,
      from: this.address(),
      frequency: resonant ? frequency.amplified() : frequency,
      resonant,
    });
  }

  /** A room lists no places: its rooms are its siblings, walked with forward and back. */
  override listing(): readonly Location[] {
    return [];
  }

  /** The room `steps` further along the apartment (back when negative); nothing past either end. */
  neighbour(steps: number): Location | undefined {
    return this.#apartment.children()[this.index() + steps];
  }

  override moves(): readonly Move[] {
    return MOVES.offered(this);
  }

  override move(id: string): Location | undefined {
    return MOVES.make(this, id);
  }

  /** Only the first room has the way out: through the apartment, to wherever it opens on (the floor). */
  override exit(): Location | undefined {
    return this.index() === 0 ? this.#apartment.exit() : undefined;
  }

  override leaveLabel(): string {
    return 'Exit Apartment';
  }

  /** The neural-link interpretation (Room.groovy:274-276), one sentence per line; glitched under an anomaly. */
  description(): readonly string[] {
    const { structure, colour, walls, lighting } = this.#atmosphere;
    const read = (part: keyof typeof GLITCHED, text: string): string =>
      this.#apartment.anomaly()
        ? STATIC.mangle(text, GLITCHED[part], this.seed().branch(STATIC_KEY).branch(part))
        : text;
    return [
      `You are in ${read('structure', structure)}. The walls are ${colour} ${read('walls', walls)}.`,
      `The space is illuminated by ${read('lighting', lighting)}.`,
    ];
  }

  /** The local cell diagnostic (Room.groovy:124-130): the resonance is degraded under an anomaly. */
  override facts(): readonly Fact[] {
    return [
      { key: 'reading', label: 'TYPE', value: this.type() },
      { key: 'reading', label: 'OXY', value: `${String(this.#traits.oxygen)}%` },
      { key: 'reading', label: 'TEMP', value: `${String(this.#traits.temperature)}°C` },
      { key: 'signal', label: 'SIGNAL', value: this.#traits.signal },
      this.#apartment.anomaly()
        ? { key: 'alert', label: 'RESONANCE', value: '[DEGRADED]' }
        : { key: 'stable', label: 'RESONANCE', value: '[STABLE]' },
    ];
  }

  status(): string {
    return `ATMOS: ${String(this.#traits.oxygen)}% | TEMP: ${String(this.#traits.temperature)}°C`;
  }

  childrenHeading(): string {
    return '';
  }

  approachVerb(): string {
    return '';
  }
}
