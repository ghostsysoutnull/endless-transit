import type { CorridorShape } from '#engine/model/CorridorShape.ts';
import type { DoorStateLook } from '#engine/model/DoorStateLook.ts';
import type { MaterialFamily } from '#engine/model/MaterialFamily.ts';
import type { DoorInks } from './DoorInks.ts';
import type { DoorMark } from './DoorMark.ts';
import type { DoorPanel } from './DoorPanel.ts';
import type { Glow } from './Glow.ts';
import type { HallShape } from './HallShape.ts';
import type { PictureFont } from './PictureFont.ts';

/**
 * What the corridor picture draws with, built in `main.ts` and handed in whole (U02): the font, the ink a door's
 * state is drawn in, the glow, and one part per key — a hall per corridor shape, a panel per material family, a
 * mark per state look. A new shape, family or look is one entry here.
 */
export interface CorridorParts {
  readonly font: PictureFont;
  readonly inks: DoorInks;
  readonly glow: Glow;
  readonly halls: Readonly<Record<CorridorShape, HallShape>>;
  readonly panels: Readonly<Record<MaterialFamily, DoorPanel>>;
  readonly marks: Readonly<Record<DoorStateLook, DoorMark>>;
}
