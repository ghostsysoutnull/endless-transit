import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { LineDecks } from './LineDecks.ts';
import type { Lines } from './Lines.ts';
import { Sentences } from './Sentences.ts';

/** Makes a kind of place's sentences from the content (U02). A factory, built by `LocationRegistry`. */
export class LibrarySentences implements LineDecks {
  readonly #library: ContentLibrary;

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  of(kind: string): Lines {
    return new Sentences(this.#library, kind);
  }
}
