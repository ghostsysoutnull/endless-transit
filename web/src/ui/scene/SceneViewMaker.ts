import type { DrawnScene } from '#ui/screens/DrawnScene.ts';
import type { SceneViews } from '#ui/screens/SceneViews.ts';
import type { SceneViewParts } from './SceneViewParts.ts';
import { SceneView } from './SceneView.ts';

/** Makes a scene view for a picture, with the parts every scene shares (U02). A factory, built in `main.ts`. */
export class SceneViewMaker implements SceneViews {
  readonly #parts: SceneViewParts;

  constructor(parts: SceneViewParts) {
    this.#parts = parts;
  }

  make(onLight: (id: string) => void): DrawnScene {
    return new SceneView(this.#parts, onLight);
  }
}
