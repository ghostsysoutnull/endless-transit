import type { Corridor } from './Corridor.ts';
import type { Culture } from './Culture.ts';
import type { Door } from './Door.ts';
import type { Era } from './Era.ts';
import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';

export const APARTMENT_KIND = new LocationKind({
  key: 'apartment',
  title: 'Apartment',
  icon: '🚪',
  indexLabel: 'UNIT',
});

/**
 * The unit behind one door of a corridor: its rooms are its children. It has a culture and an era of its
 * own — the planet's most of the time, the second ones when it drifts, and one in a hundred is a temporal
 * anomaly. Nobody stands in an apartment: arriving drops the traveller into its first room (Guide:73).
 */
export class Apartment extends Location {
  readonly #door: Door;
  readonly #culture: Culture;
  readonly #era: Era;
  readonly #anomaly: boolean;

  constructor(origin: Origin<Corridor>, facts: { door: Door; culture: Culture; era: Era; anomaly: boolean }) {
    super(origin);
    this.#door = facts.door;
    this.#culture = facts.culture;
    this.#era = facts.era;
    this.#anomaly = facts.anomaly;
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

  override arrival(): Location {
    return this.children()[0] ?? this;
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
