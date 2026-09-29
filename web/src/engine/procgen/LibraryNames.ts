import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { NameLists } from './NameLists.ts';
import type { Names } from './Names.ts';
import { NameParts } from './NameParts.ts';

/** Makes a factory's name list from the content, by its directory (U02). A factory, built by `LocationRegistry`. */
export class LibraryNames implements NameLists {
  readonly #library: ContentLibrary;

  constructor(library: ContentLibrary) {
    this.#library = library;
  }

  at(directory: string): Names {
    return new NameParts(this.#library, directory);
  }
}
