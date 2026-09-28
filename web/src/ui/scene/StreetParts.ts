import type { Fractions } from './Fractions.ts';
import type { PictureFont } from './PictureFont.ts';
import type { RoofKind } from './Roof.ts';
import type { RoofDrawer } from './RoofDrawer.ts';
import type { Roofs } from './Roofs.ts';

/**
 * What the street picture draws with, built by `ScenePictures` and handed in whole (U02): the font, the hash its
 * variations come from, which roof a building has, and a drawer per roof kind at the street's proportions.
 */
export interface StreetParts {
  readonly font: PictureFont;
  readonly noise: Fractions;
  readonly roofs: Roofs;
  readonly roofDrawers: Readonly<Record<RoofKind, RoofDrawer>>;
}
