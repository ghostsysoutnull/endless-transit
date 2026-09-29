import type { ChildMark } from './ChildMark.ts';
import type { LineScene } from './LineScene.ts';
import type { PlanSketch } from './PlanSketch.ts';
import type { StagedScene } from './StagedScene.ts';

/** How the scene stage gets a host of each kind, told which child its picture points at (`SceneViewMaker`). */
export interface SceneHosts {
  line(onLight: (mark: ChildMark) => void): LineScene;
  plan(onLight: (mark: ChildMark) => void): StagedScene<PlanSketch>;
}
