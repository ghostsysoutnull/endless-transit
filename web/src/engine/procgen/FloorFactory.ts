import type { Building } from '#engine/model/Building.ts';
import { CORRIDOR_KIND } from '#engine/model/Corridor.ts';
import { Floor, FLOOR_KIND } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { Phrase } from '#engine/model/Phrase.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { Children } from './Children.ts';
import type { LineDecks } from './LineDecks.ts';
import type { Lines } from './Lines.ts';
import type { Offspring } from './Offspring.ts';
import type { PassagePeek } from './PassagePeek.ts';
import type { Zones } from './Zones.ts';

/** A floor: its zone by height, one sentence dealt from the floor descriptions, a peek at its corridor-to-be; one child, the corridor. */
export class FloorFactory implements LocationFactory<Floor, Building> {
  readonly #zones: Zones;
  readonly #sentences: Lines;
  readonly #corridor: Children;
  readonly #passages: PassagePeek;

  constructor(offspring: Offspring, parts: { zones: Zones; decks: LineDecks; passages: PassagePeek }) {
    this.#zones = parts.zones;
    this.#sentences = parts.decks.of('floor');
    this.#corridor = offspring.of(undefined, () => CORRIDOR_KIND);
    this.#passages = parts.passages;
  }

  kind(): LocationKind {
    return FLOOR_KIND;
  }

  create(origin: Origin<Building>): Floor {
    const building = origin.parent;
    const key = building.vibe()?.culture().key() ?? 'unknown';
    // The culture in the sentence is a word, not a label: `Void`, not `VOID` (U02).
    const culture = new Phrase(key).capitalised();
    return new Floor(origin, {
      number: origin.index,
      zone: this.#zones.zoneOf(origin.seed, origin.index, building.floors()),
      sentence: this.#sentences.dealt(origin.seed).replace('{culture}', culture),
      passage: this.#passages.of(origin.seed, building.doorsPerFloor()),
    });
  }

  populate(parent: Floor): readonly Location[] {
    return this.#corridor.exactly(parent, 1);
  }
}
