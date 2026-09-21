import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Culture } from '#engine/model/Culture.ts';
import { Era } from '#engine/model/Era.ts';
import { Trait } from '#engine/model/Trait.ts';

const PLANET_FRAMES = 'themes/planet-frames';
const ERAS = 'themes/timelines';
const TRAITS = 'themes/traits';

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

  eras(): readonly Era[] {
    this.#eras ??= Object.freeze(this.#library.index(ERAS).map((key) => new Era(key)));
    return this.#eras;
  }

  traits(): readonly Trait[] {
    this.#traits ??= Object.freeze(this.#library.list(TRAITS).map((key) => new Trait(key)));
    return this.#traits;
  }
}
