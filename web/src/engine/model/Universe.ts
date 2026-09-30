import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Portrait } from './Portrait.ts';

/** The one place of its seed: not counted among siblings, having none. */
export const UNIVERSE_KIND = new LocationKind({ key: 'universe', title: 'Universe', icon: '∞' });

/** The root of the tree. It has no generated name: there is one universe per seed, and the seed is its identity. */
export class Universe extends Location {
  kind(): LocationKind {
    return UNIVERSE_KIND;
  }

  name(): string {
    return 'The Endless Universe';
  }

  description(): readonly string[] {
    return ['A neural web of infinite complexity.'];
  }

  /** No diagnostic line: the level is drawn (U04, Decision 1 — the terminal's jargon goes). */
  status(): string {
    return '';
  }

  childrenHeading(): string {
    return 'Primary filaments radiating from root';
  }

  approachVerb(): string {
    return 'Synchronize with';
  }

  /** Drawn as an area of its children (U04). */
  override portrait(): Portrait {
    return this.area('universe');
  }
}
