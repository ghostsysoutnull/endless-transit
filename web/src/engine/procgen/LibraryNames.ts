import type { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import type { Dealer } from './Dealer.ts';
import type { NameAxes } from './NameAxes.ts';
import type { NameLists } from './NameLists.ts';
import type { Names } from './Names.ts';
import { NameParts } from './NameParts.ts';

/** Makes a factory's name list from the content, by its directory (U02). A factory, built by `LocationRegistry`. */
export class LibraryNames implements NameLists {
  readonly #library: ContentLibrary;
  readonly #parts: { deal: Dealer; axes: NameAxes };

  constructor(library: ContentLibrary, deal: Dealer, axes: NameAxes) {
    this.#library = library;
    this.#parts = { deal, axes };
  }

  at(directory: string): Names {
    return new NameParts(this.#library, directory, this.#parts);
  }
}
