import { BuildMasthead } from '#ui/BuildMasthead.ts';
import { Frame } from '#ui/Frame.ts';
import { HudPresenter } from '#ui/screens/HudPresenter.ts';
import { PolePresenter } from '#ui/screens/PolePresenter.ts';
import { SceneDrawing } from '#ui/screens/SceneDrawing.ts';

/** The world screen's presenter with its real parts, as `main.ts` builds it, stamped with this build id. */
export function hudPresenter(buildId: string): HudPresenter {
  return new HudPresenter(new BuildMasthead(buildId), new Frame(), new SceneDrawing(), new PolePresenter());
}
