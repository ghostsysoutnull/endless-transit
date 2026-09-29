import type { Sketch } from './Sketch.ts';
import type { StagedScene } from './StagedScene.ts';

/**
 * The scene the stage shows (U03): its host element, the sketch it shows, the host drawing it — and whether that host
 * was made for this sketch, so it shows it already. Value object: kept, it is a new one with the new sketch.
 */
export class ShownScene<S extends Sketch> {
  readonly #host: HTMLElement;
  readonly #sketch: S;
  readonly #view: StagedScene<S>;
  readonly #fresh: boolean;

  constructor(facts: { host: HTMLElement; sketch: S; view: StagedScene<S>; fresh: boolean }) {
    this.#host = facts.host;
    this.#sketch = facts.sketch;
    this.#view = facts.view;
    this.#fresh = facts.fresh;
  }

  /** Whether a sketch in this host element is drawn by the same picture: the scene is kept for it. */
  keeps(host: HTMLElement, sketch: Sketch): boolean {
    return host === this.#host && this.#sketch.samePicture(sketch);
  }

  /** The same scene, to show the next sketch at the next redraw. */
  keptFor(sketch: S): ShownScene<S> {
    return new ShownScene({ host: this.#host, sketch, view: this.#view, fresh: false });
  }

  /** A scene kept is drawn its sketch; one made for it already shows it. */
  redraw(): void {
    if (!this.#fresh) this.#view.render(this.#sketch);
  }

  view(): StagedScene<S> {
    return this.#view;
  }
}
