import { COUNTRY_KIND } from '#engine/model/Country.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { Planet, PLANET_KIND } from '#engine/model/Planet.ts';
import { Vibe } from '#engine/model/Vibe.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { ThemeCatalog } from './ThemeCatalog.ts';
import type { Children } from './Children.ts';
import type { NameLists } from './NameLists.ts';
import type { Names } from './Names.ts';
import type { Offspring } from './Offspring.ts';

/**
 * A planet: named `head+tail` in one word; 2 to 8 countries. It decides the vibe of everything below:
 * one era and one surface culture, plus a second of each that is never the same as the first.
 */
export class PlanetFactory implements LocationFactory {
  readonly #names: Names;
  readonly #themes: ThemeCatalog;
  readonly #countries: Children;

  constructor(offspring: Offspring, names: NameLists, themes: ThemeCatalog) {
    this.#names = names.at('names/planet');
    this.#themes = themes;
    this.#countries = offspring.of({ min: 2, max: 8 }, () => COUNTRY_KIND);
  }

  kind(): LocationKind {
    return PLANET_KIND;
  }

  create(origin: Origin): Planet {
    return new Planet(origin, {
      name: this.#names.words(origin.seed).join(''),
      vibe: this.#vibeOf(origin.seed),
    });
  }

  populate(parent: Location): readonly Location[] {
    return this.#countries.of(parent);
  }

  #vibeOf(seed: Seed): Vibe {
    const vibe = seed.branch('vibe');
    const culture = vibe.branch('culture').pick(this.#themes.surfaceCultures());
    const era = vibe.branch('era').pick(this.#themes.eras());
    const otherCultures = this.#themes.surfaceCultures().filter((each) => !each.equals(culture));
    const otherEras = this.#themes.eras().filter((each) => !each.equals(era));
    return new Vibe({
      culture,
      era,
      secondCulture: otherCultures.length === 0 ? culture : vibe.branch('second-culture').pick(otherCultures),
      secondEra: otherEras.length === 0 ? era : vibe.branch('second-era').pick(otherEras),
    });
  }
}
