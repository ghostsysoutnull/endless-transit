import type { LineSketch } from './LineSketch.ts';
import type { StagedScene } from './StagedScene.ts';

/** A scene host whose view is one number — the street's, the tower's car, the corridor's walk (`SceneView`). */
export type LineScene = StagedScene<LineSketch>;
