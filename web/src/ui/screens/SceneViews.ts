import type { DrawnScene } from './DrawnScene.ts';

/** How the world screen gets a scene, told which child its picture points at (`SceneViewMaker`). */
export interface SceneViews {
  make(onLight: (id: string) => void): DrawnScene;
}
