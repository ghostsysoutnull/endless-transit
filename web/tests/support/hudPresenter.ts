import { BuildMasthead } from '#ui/BuildMasthead.ts';
import { Frame } from '#ui/Frame.ts';
import { FloorPad } from '#ui/screens/FloorPad.ts';
import { FloorsByTen } from '#ui/screens/FloorsByTen.ts';
import { HudPresenter } from '#ui/screens/HudPresenter.ts';
import { LayersTogether } from '#ui/screens/LayersTogether.ts';
import { SceneDrawing } from '#ui/screens/SceneDrawing.ts';

/** The world screen's presenter with its real parts, as `main.ts` builds it, stamped with this build id. */
export function hudPresenter(buildId: string): HudPresenter {
  return new HudPresenter(
    new BuildMasthead(buildId),
    new Frame(),
    new SceneDrawing(),
    new FloorPad({ floor: new FloorsByTen(), layer: new LayersTogether() }),
  );
}
