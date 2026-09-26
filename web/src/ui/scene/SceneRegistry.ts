import type { ScenePicture } from './ScenePicture.ts';
import type { SceneVM } from './SceneVM.ts';

/**
 * Owns one fact: which picture draws which place, by the drawing key the engine hands over (Decision 1). A new
 * scene is one entry here, built in `main.ts`; a key with no entry keeps the screen as it was.
 */
export class SceneRegistry {
  readonly #pictures: ReadonlyMap<string, ScenePicture<SceneVM>>;

  constructor(pictures: Readonly<Record<string, ScenePicture<SceneVM>>>) {
    this.#pictures = new Map(Object.entries(pictures));
  }

  picture(key: string): ScenePicture<SceneVM> | undefined {
    return this.#pictures.get(key);
  }
}
