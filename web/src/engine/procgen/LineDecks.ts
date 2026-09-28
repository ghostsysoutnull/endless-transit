import type { Lines } from './Lines.ts';

/** How a factory gets its sentences, by the kind of place they describe (`LibrarySentences`). */
export interface LineDecks {
  of(kind: string): Lines;
}
