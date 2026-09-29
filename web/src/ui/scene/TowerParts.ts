import type { CorridorShape } from '#engine/model/CorridorShape.ts';
import type { DoorInks } from './DoorInks.ts';
import type { Fractions } from './Fractions.ts';
import type { PictureFont } from './PictureFont.ts';
import type { RoofKind } from './Roof.ts';
import type { RoofDrawer } from './RoofDrawer.ts';
import type { Roofs } from './Roofs.ts';
import type { RowShape } from './RowShape.ts';

/**
 * What the tower picture draws with, built by `ScenePictures` and handed in whole (U02): the font, the hash its
 * windows vary by, which roof it has, the ink a door's state is drawn in, a row shape per corridor shape, and a
 * drawer per roof kind at the tower's proportions.
 */
export interface TowerParts {
  readonly font: PictureFont;
  readonly noise: Fractions;
  readonly roofs: Roofs;
  readonly inks: DoorInks;
  readonly rows: Readonly<Record<CorridorShape, RowShape>>;
  readonly roofDrawers: Readonly<Record<RoofKind, RoofDrawer>>;
}
