import type { ChildMark } from './ChildMark.ts';
import type { LineScene } from './LineScene.ts';

/** How the scene stage gets a host of each kind, told which child its picture points at (`SceneViewMaker`). */
export interface SceneHosts {
  line(onLight: (mark: ChildMark) => void): LineScene;
}
