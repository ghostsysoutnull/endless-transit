import type { DrawnScene } from './DrawnScene.ts';
import type { Sketch } from './Sketch.ts';

/** A scene host of one kind, shown that kind's sketch (`LineScene` for a `LineSketch`). */
export interface StagedScene<S extends Sketch> extends DrawnScene {
  render(sketch: S): void;
}
