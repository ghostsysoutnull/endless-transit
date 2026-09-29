import type { DrawnStage } from '#ui/screens/DrawnStage.ts';
import type { ChildMark } from './ChildMark.ts';
import type { LineSketch } from './LineSketch.ts';
import type { SceneHosts } from './SceneHosts.ts';
import type { SceneStages } from './SceneStages.ts';
import { ShownScene } from './ShownScene.ts';
import type { Sketch } from './Sketch.ts';
import type { StagedScene } from './StagedScene.ts';

/**
 * Owns one fact (U03, out of `HudView`): which scene host shows the world screen's picture now. A sketch tells it
 * which kind of host it needs; the scene is kept while the host element and the picture stay, else the old one is
 * taken down and one of the sketch's kind made through `SceneHosts`. A new kind of host is a field and a method, and
 * its line in `#shown()` and `clear()`. Built in `main.ts`, handed to `HudView`.
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
    const at = this.#at;
    if (at === undefined) return;
    if (this.#line?.keeps(at.host, sketch) === true) {
      this.#line = this.#line.keptFor(sketch);
      return;
    }
    this.clear();
    const view = this.#hosts.line(at.onLight);
    this.#mount(view, sketch);
    this.#line = new ShownScene({ host: at.host, sketch, view, fresh: true });
  }

  bare(): void {
    this.clear();
  }

  redraw(): void {
    this.#shown()?.redraw();
  }

  showing(): boolean {
    return this.#shown() !== undefined;
  }

  arrive(id: string): void {
    this.#shown()?.arrive(id);
  }

  leads(id: string): boolean {
    return this.#shown()?.leads(id) === true;
  }

  enter(id: string): void {
    this.#shown()?.enter(id);
  }

  light(mark: ChildMark): void {
    this.#shown()?.light(mark);
  }

  clear(): void {
    this.#shown()?.dispose();
    this.#line = undefined;
  }

  /** A scene just made goes into the host being shown and draws its first sketch. */
  #mount<S extends Sketch>(view: StagedScene<S>, sketch: S): void {
    if (this.#at === undefined) return;
    view.mount(this.#at.host);
    view.render(sketch);
  }

  /** The scene shown now, of whichever kind. */
  #shown(): ShownScene<LineSketch> | undefined {
    return this.#line;
  }
}
