import type { ChildMark } from '#ui/scene/ChildMark.ts';
import type { DrawnScene } from './DrawnScene.ts';

/** How the world screen gets a scene, told which child its picture points at (`SceneViewMaker`). */
export interface SceneViews {
  make(onLight: (mark: ChildMark) => void): DrawnScene;
}
