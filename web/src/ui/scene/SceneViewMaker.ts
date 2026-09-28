import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { DrawnScene } from '#ui/screens/DrawnScene.ts';
import type { SceneViews } from '#ui/screens/SceneViews.ts';
import type { Clock } from './Clock.ts';
import type { ScenePicture } from './ScenePicture.ts';
import type { SceneVM } from './SceneVM.ts';
import { SceneView } from './SceneView.ts';

/** Makes a scene view for a picture, with what every scene shares (U02): the page's clock, the reduced-motion wish and the canvases. A factory, built in `main.ts`. */
export class SceneViewMaker implements SceneViews {
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;
  readonly #canvases: Canvases;

  constructor(clock: Clock, motion: ReducedMotion, canvases: Canvases) {
    this.#clock = clock;
    this.#motion = motion;
    this.#canvases = canvases;
  }

  make(picture: ScenePicture<SceneVM>, onLight: (id: string) => void): DrawnScene {
    return new SceneView(picture, this.#clock, this.#motion, this.#canvases, onLight);
  }
}
