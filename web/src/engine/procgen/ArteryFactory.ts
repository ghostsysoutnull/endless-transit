import { Artery, ARTERY_KIND } from '#engine/model/Artery.ts';
import { CRYPT_KIND } from '#engine/model/Crypt.ts';
import type { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { Vibe } from '#engine/model/Vibe.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { Progeny } from './Progeny.ts';
import type { ThemeCatalog } from './ThemeCatalog.ts';

/** Every Artery is told in the same words (Corridor.groovy:46). */
const SENTENCE = 'A pulsing, organic artery of data';
/** The whole basement is one culture: nothing drifts (Guide:282). */
const ONE_CULTURE = 1;

/**
 * A Layer's Artery: its vibe is the bedrock's — the abyssal culture in the atomic era (Corridor.groovy:118),
 * under the trait of the country above, so its Crypts and Shards are dealt and named from the abyssal lists;
 * as many Crypts as the building says doors per floor.
 */
export class ArteryFactory implements LocationFactory<Artery, Floor> {
  readonly #themes: ThemeCatalog;
  readonly #crypts: Progeny;

  constructor(world: FactoryLookup, themes: ThemeCatalog) {
    this.#themes = themes;
    this.#crypts = new Progeny(world, undefined, () => world.factoryFor(CRYPT_KIND));
  }

  kind(): LocationKind {
    return ARTERY_KIND;
  }

  create(origin: Origin<Floor>): Artery {
    const above = origin.parent.vibe();
    if (above === undefined) throw new Error('an artery lies under a country: it needs its trait');
    const bedrock = this.#themes.bedrock();
    return new Artery(origin, {
      sentence: SENTENCE,
      vibe: new Vibe({
        era: bedrock.era,
        culture: bedrock.culture,
        secondCulture: bedrock.culture,
        secondEra: bedrock.era,
        stability: ONE_CULTURE,
        mutation: above.mutation(),
      }),
    });
  }

  populate(parent: Artery): readonly Location[] {
    return this.#crypts.exactly(parent, parent.floor().building().doorsPerFloor());
  }
}
