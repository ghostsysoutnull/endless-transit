import type { DrawnScene } from './DrawnScene.ts';
import type { LineSketch } from './LineSketch.ts';

/** A scene host whose view is one number — the street's, the tower's car, the corridor's walk (`SceneView`). */
export interface LineScene extends DrawnScene {
  /** A new frame of the game: the sketch to draw now. */
  render(sketch: LineSketch): void;
}
