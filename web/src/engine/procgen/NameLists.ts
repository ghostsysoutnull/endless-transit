import type { Names } from './Names.ts';

/** How a factory gets the name list it names from, by the list's directory (`LibraryNames`). */
export interface NameLists {
  at(directory: string): Names;
}
