import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Culture } from '#engine/model/Culture.ts';
import type { Era } from '#engine/model/Era.ts';
import { Relic } from '#engine/model/Relic.ts';

const CULTURE_LISTS = 'themes/cultures';
const ERA_LISTS = 'themes/timelines';
/** The four two-word forms a culture item `c` and an era item `t` are joined in (ThemeService.groovy:296-299). */
const FORMS: readonly { readonly key: string; readonly join: (c: string, t: string) => string }[] = [
  { key: 'with', join: (c, t) => `${t} with ${c}` },
  { key: 'infused', join: (c, t) => `${c} infused with ${t}` },
  { key: 'fused', join: (c, t) => `${c} fused to ${t}` },
  { key: 'grafted', join: (c, t) => `${t} grafted onto ${c}` },
];

/**
 * Owns one fact: every relic an apartment of a culture and an era can hold, in a fixed order — each
 * culture item × each era item in the four forms, then every item alone (ThemeService.groovy:276-305,
 * HK-016 step 2). Built once per pair; an apartment deals from it and never holds a card twice.
 */
export class ObjectDeck {
  readonly #library: ContentLibrary;
  readonly #decks = new Map<string, readonly Relic[]>();

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  of(culture: Culture, era: Era): readonly Relic[] {
    const pair = `${culture.key()}|${era.key()}`;
    let deck = this.#decks.get(pair);
    if (deck === undefined) {
      deck = Object.freeze(this.#build(culture, era));
      this.#decks.set(pair, deck);
    }
    return deck;
  }

  #build(culture: Culture, era: Era): Relic[] {
    const cultureItems = this.#library.list(`${CULTURE_LISTS}/${culture.key()}`);
    const eraItems = this.#library.list(`${ERA_LISTS}/${era.key()}`);
    return [
      ...cultureItems.flatMap((c) =>
        eraItems.flatMap((t) => FORMS.map((form) => new Relic(`${form.key}|${c}|${t}`, form.join(c, t)))),
      ),
      ...cultureItems.map((c) => new Relic(`culture|${c}`, c)),
      ...eraItems.map((t) => new Relic(`era|${t}`, t)),
    ];
  }
}
