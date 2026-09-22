import type { Corridor } from './Corridor.ts';
import type { Culture } from './Culture.ts';
import type { Door } from './Door.ts';
import type { Era } from './Era.ts';
import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Relic } from './Relic.ts';

export const APARTMENT_KIND = new LocationKind({
  key: 'apartment',
  title: 'Apartment',
  icon: '🚪',
  indexLabel: 'UNIT',
});

/** Where the apartment's relics are dealt to: relic `i` goes to the room `branch(DEALT).branch(i)` draws (ApartmentFactory.groovy:127-132). */
const DEALT = 'dealt';

/**
 * The unit behind one door of a corridor: its rooms are its children. It has a culture and an era of its
 * own — the planet's most of the time, the second ones when it drifts, and one in a hundred is a temporal
 * anomaly. **Objects live in apartments, not rooms** (Guide:167): the apartment holds its relics, dealt
 * from its deck with no card twice, and knows which of its rooms each one lies in — a room asks. Nobody
 * stands in an apartment: arriving drops the traveller into its first room (Guide:73).
 */
export class Apartment extends Location {
  readonly #door: Door;
  readonly #culture: Culture;
  readonly #era: Era;
  readonly #anomaly: boolean;
  readonly #rooms: number;
  readonly #relics: readonly Relic[];

  constructor(
    origin: Origin<Corridor>,
    facts: {
      door: Door;
      culture: Culture;
      era: Era;
      anomaly: boolean;
      rooms: number;
      relics: readonly Relic[];
    },
  ) {
    super(origin);
    this.#door = facts.door;
    this.#culture = facts.culture;
    this.#era = facts.era;
    this.#anomaly = facts.anomaly;
    this.#rooms = facts.rooms;
    this.#relics = Object.freeze([...facts.relics]);
  }

  kind(): LocationKind {
    return APARTMENT_KIND;
  }

  /** An apartment goes by its door (Apartment.groovy:130-132). */
  name(): string {
    return this.#door.description();
  }

  door(): Door {
    return this.#door;
  }

  culture(): Culture {
    return this.#culture;
  }

  era(): Era {
    return this.#era;
  }

  anomaly(): boolean {
    return this.#anomaly;
  }

  /** How many rooms it has — decided when it was made, so a room can ask before the rooms exist. */
  roomCount(): number {
    return this.#rooms;
  }

  /** Everything the apartment holds, scattered over its rooms; the order is the deal's. */
  relics(): readonly Relic[] {
    return this.#relics;
  }

  /** The relics lying in the room at `index`: each relic went to the room its own draw named. */
  relicsIn(index: number): readonly Relic[] {
    return this.#relics.filter(
      (_relic, i) =>
        this.seed()
          .branch(DEALT)
          .branch(i)
          .range(0, this.#rooms - 1) === index,
    );
  }

  override arrival(): Location {
    return this.children()[0] ?? this;
  }

  /** On the corridor's list a door shows its full appearance under its name. */
  override readings(): readonly Fact[] {
    return [{ key: 'narrative', label: 'APPEARANCE', value: this.#door.narrative() }];
  }

  description(): readonly string[] {
    return [];
  }

  /** The era marker, or the anomaly warning (Apartment.groovy:152). */
  override facts(): readonly Fact[] {
    return this.#anomaly
      ? [{ key: 'alert', label: 'TEMPORAL_ANOMALY_DETECTED', value: '[!]' }]
      : [{ key: 'era', label: 'TEMPORAL_MARKER', value: this.#era.key() }];
  }

  status(): string {
    return this.#anomaly ? 'ATMOS: [UNSTABLE]' : 'ATMOS: [NOMINAL]';
  }

  childrenHeading(): string {
    return 'Internal cells detected:';
  }

  approachVerb(): string {
    return 'Enter Room:';
  }
}
