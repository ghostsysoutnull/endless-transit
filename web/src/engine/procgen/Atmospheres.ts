import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { WarningSink } from '#engine/content/WarningSink.ts';
import type { Atmosphere } from '#engine/model/Atmosphere.ts';
import type { Culture } from '#engine/model/Culture.ts';
import type { Era } from '#engine/model/Era.ts';
import type { Trait } from '#engine/model/Trait.ts';
import type { Seed } from '#engine/rng/Seed.ts';

const ATMOSPHERE = 'themes/atmosphere';
const CULTURES = 'themes/cultures';
const ERAS = 'themes/timelines';
const COLOURS = 'themes/colours';
const GLITCH = 'glitch';
/** One room in twenty is glitched even in a sound apartment (ThemeService.groovy:104). */
const GLITCH_CHANCE = 0.05;
/** In a glitched room each part is swapped one time in two (ThemeService.groovy:105-108). */
const SWAP_CHANCE = 0.5;
/** The two structure lists a glitch may reach for (ThemeService.groovy:108). */
const GLITCH_STRUCTURES = ['abyssal', 'Singularity'];

/**
 * Owns one fact: how a room's atmosphere is drawn — its structure from the country's trait, its walls
 * (in a colour) from the apartment's culture, its lighting from the apartment's era; unless the room is
 * glitched (an anomaly always, any room one time in twenty), when each part may instead come from any
 * culture, any era, or the abyssal or Singularity structures (ThemeService.groovy:87-138). A list an
 * index promised but the content lacks is never a silent generic line: the first key of that index stands
 * in and the warning sink hears which file is missing (`[THEME_WARN]`, Guide:319).
 */
export class Atmospheres {
  readonly #library: ContentLibrary;
  readonly #warnings: WarningSink;

  constructor(library: ContentLibrary, warnings: WarningSink) {
    this.#library = library;
    this.#warnings = warnings;
  }

  of(seed: Seed, facts: { culture: Culture; era: Era; trait: Trait; anomaly: boolean }): Atmosphere {
    const glitch = seed.branch(GLITCH);
    const glitched = facts.anomaly || glitch.probability(GLITCH_CHANCE);
    const swapped = (part: string): boolean => glitched && glitch.branch(part).probability(SWAP_CHANCE);
    const cultures = this.#library.index(CULTURES);
    const eras = this.#library.index(ERAS);
    const walls = swapped('walls') ? glitch.branch('walls').pick(cultures) : facts.culture.key();
    const lighting = swapped('lighting') ? glitch.branch('lighting').pick(eras) : facts.era.key();
    const structure = swapped('structure')
      ? glitch.branch('structure').pick(GLITCH_STRUCTURES)
      : facts.trait.key();
    return {
      structure: seed
        .branch('structure')
        .pick(this.#pool('structures', structure, `${ATMOSPHERE}/structures`)),
      colour: seed.branch('colour').pick(this.#library.list(COLOURS)),
      walls: seed.branch('walls').pick(this.#pool('walls', walls, CULTURES)),
      lighting: seed.branch('lighting').pick(this.#pool('lighting', lighting, `${ATMOSPHERE}/lighting`)),
    };
  }

  /** The list for a key, or — with a warning — the list of the first key in the index it belongs to. */
  #pool(category: string, key: string, indexOf: string): readonly string[] {
    const path = `${ATMOSPHERE}/${category}/${key}`;
    if (this.#library.has(path)) return this.#library.list(path);
    const fallback = this.#library.index(indexOf)[0] ?? '';
    this.#warnings.warn(
      `[THEME_WARN] no ${category} file for '${key}' — falling back to '${fallback}' (${path}.txt)`,
    );
    return this.#library.list(`${ATMOSPHERE}/${category}/${fallback}`);
  }
}
