import type { Culture } from '#engine/model/Culture.ts';
import type { Era } from '#engine/model/Era.ts';
import type { Relic } from '#engine/model/Relic.ts';

/** What an apartment factory asks of `ObjectDeck`: the relics a culture and an era hold. */
export interface RelicDeck {
  of(culture: Culture, era: Era): readonly Relic[];
}
