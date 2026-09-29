import { CITY_KIND } from '#engine/model/City.ts';
import { Country, COUNTRY_KIND } from '#engine/model/Country.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { ThemeCatalog } from './ThemeCatalog.ts';
import type { Children } from './Children.ts';
import type { NameLists } from './NameLists.ts';
import type { Names } from './Names.ts';
import type { Offspring } from './Offspring.ts';

/** The stability shift of a country, in thousandths: −0.100 … +0.100. */
const SHIFT = { min: -100, max: 100, scale: 1000 };

/**
 * A country: named `prefix core suffix`; 2 to 10 cities. It draws one functional trait and hands the
 * planet's vibe down mutated by it, stability shifted by up to a tenth either way.
 */
export class CountryFactory implements LocationFactory {
  readonly #names: Names;
  readonly #themes: ThemeCatalog;
  readonly #cities: Children;

  constructor(offspring: Offspring, names: NameLists, themes: ThemeCatalog) {
    this.#names = names.at('names/country');
    this.#themes = themes;
    this.#cities = offspring.of({ min: 2, max: 10 }, () => CITY_KIND);
  }

  kind(): LocationKind {
    return COUNTRY_KIND;
  }

  create(origin: Origin): Country {
    const trait = origin.seed.branch('trait').pick(this.#themes.traits());
    const shift = origin.seed.branch('stability').range(SHIFT.min, SHIFT.max) / SHIFT.scale;
    return new Country(origin, {
      name: this.#names.words(origin.seed).join(' '),
      trait,
      vibe: origin.parent?.vibe()?.mutate(trait, shift),
    });
  }

  populate(parent: Location): readonly Location[] {
    return this.#cities.of(parent);
  }
}
