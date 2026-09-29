import type { DrawnStage } from '#ui/screens/DrawnStage.ts';
import type { ChildMark } from './ChildMark.ts';
import type { DrawnScene } from './DrawnScene.ts';
import type { LineSketch } from './LineSketch.ts';
import type { SceneHosts } from './SceneHosts.ts';
import type { SceneStages } from './SceneStages.ts';
import { ShownScene } from './ShownScene.ts';
import type { Sketch } from './Sketch.ts';
import type { StagedScene } from './StagedScene.ts';

/**
 * Owns one fact (U03, out of `HudView`): which scene host shows the world screen's picture now. A sketch tells it
 * which kind of host it needs; the host is kept while the host element and the picture stay, else the old one is
 * taken down and one of the sketch's kind made through `SceneHosts`. A new kind of host is a field, a method and its
 * entry in `#shown`. Built in `main.ts`, handed to `HudView`.
 */
export class SceneStage implements DrawnStage, SceneStages {
  readonly #hosts: SceneHosts;
  /** Where the sketch being dispatched goes, and whom a scene made for it tells what its picture points at: set for one `show`. */
  #at: { readonly host: HTMLElement; readonly onLight: (mark: ChildMark) => void } | undefined;
  #line: ShownScene<LineSketch> | undefined;

  constructor(hosts: SceneHosts) {
    this.#hosts = hosts;
  }

  show(host: HTMLElement | null, sketch: Sketch, onLight: (mark: ChildMark) => void): void {
    if (host === null) {
      this.clear();
      return;
    }
    this.#at = { host, onLight };
    sketch.stageOn(this);
    this.#at = undefined;
  }

  line(sketch: LineSketch): void {
    this.#line = this.#staged(this.#line, sketch, (onLight) => this.#hosts.line(onLight));
  }

  bare(): void {
    this.clear();
  }

  redraw(): void {
    this.#shown()?.redraw();
  }

  showing(): boolean {
    return this.#scene() !== undefined;
  }

  arrive(id: string): void {
    this.#scene()?.arrive(id);
  }

  leads(id: string): boolean {
    return this.#scene()?.leads(id) === true;
  }

  enter(id: string): void {
    this.#scene()?.enter(id);
  }

  light(mark: ChildMark): void {
    this.#scene()?.light(mark);
  }

  clear(): void {
    this.#scene()?.dispose();
    this.#line = undefined;
  }

  /** The scene kept for a sketch of its picture in its host, else the old one taken down and one made and shown it. */
  #staged<S extends Sketch>(
    shown: ShownScene<S> | undefined,
    sketch: S,
    make: (onLight: (mark: ChildMark) => void) => StagedScene<S>,
  ): ShownScene<S> | undefined {
    const at = this.#at;
    if (at === undefined) return shown;
    if (shown?.keeps(at.host, sketch) === true) return shown.keptFor(sketch);
    this.clear();
    const view = make(at.onLight);
    view.mount(at.host);
    view.render(sketch);
    return new ShownScene({ host: at.host, sketch, view, fresh: true });
  }

  /** The scene shown now, of whichever kind. */
  #shown(): ShownScene<LineSketch> | undefined {
    return this.#line;
  }

  #scene(): DrawnScene | undefined {
    return this.#shown()?.view();
  }
}
