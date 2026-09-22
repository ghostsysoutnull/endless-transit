import { Building } from '#engine/model/Building.ts';

/** Nothing in the world is sealed since I03; the walker's rule is kept alive by a sealed building of the tests' own. */
export class SealedUnit extends Building {
  override sealed(): boolean {
    return true;
  }
}
