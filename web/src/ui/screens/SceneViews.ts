import type { ScenePicture } from '#ui/scene/ScenePicture.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { DrawnScene } from './DrawnScene.ts';

/** How the world screen gets a scene for a picture, told which child the picture points at (`SceneViewMaker`). */
export interface SceneViews {
  make(picture: ScenePicture<SceneVM>, onLight: (id: string) => void): DrawnScene;
}
