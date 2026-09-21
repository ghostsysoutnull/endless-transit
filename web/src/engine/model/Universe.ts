import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';

export const UNIVERSE_KIND = new LocationKind({
  key: 'universe',
  title: 'Universe',
  icon: '∞',
  indexLabel: 'ROOT',
});

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

  status(): string {
    return 'UNIMATRIX_STABLE';
  }

  childrenHeading(): string {
    return 'Primary filaments radiating from root:';
  }

  approachVerb(): string {
    return 'Synchronize with';
  }
}
