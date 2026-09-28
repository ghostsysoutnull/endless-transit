import { FILAMENT_KIND } from '#engine/model/CosmicFilament.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { Universe, UNIVERSE_KIND } from '#engine/model/Universe.ts';
import type { LocationFactory } from './LocationFactory.ts';
import type { Children } from './Children.ts';
import type { Offspring } from './Offspring.ts';

/** The universe: 3 to 7 cosmic filaments. */
export class UniverseFactory implements LocationFactory {
  readonly #filaments: Children;

  constructor(offspring: Offspring) {
    this.#filaments = offspring.of({ min: 3, max: 7 }, () => FILAMENT_KIND);
  }

  kind(): LocationKind {
    return UNIVERSE_KIND;
  }

  create(origin: Origin): Universe {
    return new Universe(origin);
  }

  populate(parent: Location): readonly Location[] {
    return this.#filaments.of(parent);
  }
}
