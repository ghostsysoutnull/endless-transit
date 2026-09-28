import type { ScenePicture } from '#ui/scene/ScenePicture.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';

/** What the world screen asks of `SceneRegistry`: the picture that draws a drawing key, if any. */
export interface Pictures {
  picture(key: string): ScenePicture<SceneVM> | undefined;
}
