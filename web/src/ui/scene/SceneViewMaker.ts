import type { ChildMark } from './ChildMark.ts';
import type { LineScene } from './LineScene.ts';
import type { SceneHosts } from './SceneHosts.ts';
import type { SceneViewParts } from './SceneViewParts.ts';
import { SceneView } from './SceneView.ts';

/** Makes a scene view for a picture, with the parts every scene shares (U02). A factory, built in `main.ts`. */
export class SceneViewMaker implements SceneHosts {
  readonly #parts: SceneViewParts;

  constructor(parts: SceneViewParts) {
    this.#parts = parts;
  }

  line(onLight: (mark: ChildMark) => void): LineScene {
    return new SceneView(this.#parts, onLight);
  }
}
