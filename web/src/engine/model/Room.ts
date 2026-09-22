import type { Apartment } from './Apartment.ts';
import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Move } from './Move.ts';
import { MoveTable } from './MoveTable.ts';
import type { Origin } from './Origin.ts';
import type { Relic } from './Relic.ts';
import type { RoomCategory } from './RoomCategory.ts';

export const ROOM_KIND = new LocationKind({ key: 'room', title: 'Room', icon: '□', indexLabel: 'CELL' });

/** Back to the previous room unless this is the first, forward to the next unless it is the last. */
const MOVES = new MoveTable<Room>([
  { move: { id: 'back', label: 'Go back', opposite: 'forward' }, to: (room) => room.neighbour(-1) },
  { move: { id: 'forward', label: 'Go forward', opposite: 'back' }, to: (room) => room.neighbour(1) },
]);

/**
 * A room of an apartment — the bottom of the world, where the traveller stands. Rooms are walked in order:
 * forward to the next, back to the previous, and only the first room has the way out, to the corridor
 * (Guide:76, 115; Room.groovy:243-257). Its words are its culture's, its era's and its trait's.
 */
export class Room extends Location {
  readonly #apartment: Apartment;
  readonly #name: string;
  readonly #category: RoomCategory;
  readonly #atmosphere: { structure: string; colour: string; walls: string; lighting: string };
  readonly #traits: { oxygen: number; temperature: number; signal: string };

  constructor(
    origin: Origin<Apartment>,
    facts: {
      name: string;
      category: RoomCategory;
      atmosphere: { structure: string; colour: string; walls: string; lighting: string };
      traits: { oxygen: number; temperature: number; signal: string };
    },
  ) {
    super(origin);
    this.#apartment = origin.parent;
    this.#name = facts.name;
    this.#category = facts.category;
    this.#atmosphere = facts.atmosphere;
    this.#traits = facts.traits;
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

  /** The relics lying here — the apartment's, the ones it dealt to this room (Guide:167: objects live in apartments). */
  objects(): readonly Relic[] {
    return this.#apartment.relicsIn(this.index());
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

  /** The neural-link interpretation (Room.groovy:274-276), one sentence per line. */
  description(): readonly string[] {
    const { structure, colour, walls, lighting } = this.#atmosphere;
    return [
      `You are in ${structure}. The walls are ${colour} ${walls}.`,
      `The space is illuminated by ${lighting}.`,
    ];
  }

  /** The local cell diagnostic (Room.groovy:124-130). */
  override facts(): readonly Fact[] {
    return [
      { key: 'reading', label: 'TYPE', value: this.type() },
      { key: 'reading', label: 'OXY', value: `${String(this.#traits.oxygen)}%` },
      { key: 'reading', label: 'TEMP', value: `${String(this.#traits.temperature)}°C` },
      { key: 'signal', label: 'SIGNAL', value: this.#traits.signal },
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
