import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Culture } from '#engine/model/Culture.ts';
import { Era } from '#engine/model/Era.ts';
import { Trait } from '#engine/model/Trait.ts';

const PLANET_FRAMES = 'themes/planet-frames';
const ERAS = 'themes/timelines';
const CULTURES_INDEX = 'themes/cultures';
const TRAITS = 'themes/traits';
/** The bedrock's one culture and its era (Corridor.groovy:118; Guide:282): the culture is in the index without a planet frame. */
const BEDROCK = { culture: 'abyssal', era: 'atomic' } as const;

/**
 * Owns one fact: how the theme lists become domain values — the cultures a planet can have (the
 * `planet-frames` list: culture and frame colour), the eras (the timelines index) and the country traits.
 * Order is the file's order. Each value is built once.
 */
export class ThemeCatalog {
  readonly #library: ContentLibrary;
  #cultures: readonly Culture[] | undefined;
  #eras: readonly Era[] | undefined;
  #traits: readonly Trait[] | undefined;

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  /** The cultures found on a planet's surface. A culture of the index without a frame belongs elsewhere (the bedrock). */
  surfaceCultures(): readonly Culture[] {
    this.#cultures ??= Object.freeze(
      this.#library.pairs(PLANET_FRAMES).map(([key, frame]) => new Culture(key, frame)),
    );
    return this.#cultures;
  }

  /** What the whole basement is made of (Guide:282-284): the abyssal culture, framed in its own colour, in the atomic era. */
  bedrock(): { readonly culture: Culture; readonly era: Era } {
    if (!this.#library.index(CULTURES_INDEX).includes(BEDROCK.culture)) {
      throw new Error(`${CULTURES_INDEX}/index names no '${BEDROCK.culture}' culture`);
    }
    const era = this.eras().find((each) => each.key() === BEDROCK.era);
    if (era === undefined) throw new Error(`${ERAS}/index names no '${BEDROCK.era}' era`);
    return { culture: new Culture(BEDROCK.culture, BEDROCK.culture), era };
  }

  eras(): readonly Era[] {
    this.#eras ??= Object.freeze(this.#library.index(ERAS).map((key) => new Era(key)));
    return this.#eras;
  }

  traits(): readonly Trait[] {
    this.#traits ??= Object.freeze(this.#library.list(TRAITS).map((key) => new Trait(key)));
    return this.#traits;
  }
}
