import type { ChildSource } from '#engine/model/ChildSource.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { LocationFactory } from './LocationFactory.ts';

/** What a factory sees of the registry that owns it: its sibling factories, and the source of every child. */
export interface FactoryLookup extends ChildSource {
  factoryFor(kind: LocationKind): LocationFactory;
}
