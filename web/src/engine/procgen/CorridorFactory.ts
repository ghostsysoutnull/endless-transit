import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Corridor, CORRIDOR_KIND } from '#engine/model/Corridor.ts';
import type { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { Sentences } from './Sentences.ts';

/** A corridor: one sentence dealt from the corridor descriptions. Its doors and apartments come next. */
export class CorridorFactory implements LocationFactory<Corridor, Floor> {
  readonly #sentences: Sentences;

  constructor(library: ContentLibrary) {
    this.#sentences = new Sentences(library, 'corridor');
  }

  kind(): LocationKind {
    return CORRIDOR_KIND;
  }

  create(origin: Origin<Floor>): Corridor {
    return new Corridor(origin, { sentence: this.#sentences.dealt(origin.seed) });
  }

  populate(): readonly Location[] {
    return [];
  }
}
