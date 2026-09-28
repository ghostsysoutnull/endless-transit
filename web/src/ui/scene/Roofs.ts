import type { RoofKind } from './Roof.ts';

/** What the street and the tower ask of `Roof`: which roof a building has, by its address and whether it is a landmark. */
export interface Roofs {
  of(address: string, landmark: boolean): RoofKind;
}
