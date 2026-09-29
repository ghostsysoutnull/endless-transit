import type { DrawnStage } from '#ui/screens/DrawnStage.ts';
import type { ChildMark } from './ChildMark.ts';
import type { DrawnScene } from './DrawnScene.ts';
import type { LineScene } from './LineScene.ts';
import type { LineSketch } from './LineSketch.ts';
import type { SceneHosts } from './SceneHosts.ts';
import type { SceneStages } from './SceneStages.ts';
import type { Sketch } from './Sketch.ts';

/**
 * Owns one fact (U03, out of `HudView`): which scene host shows the world screen's picture now. A sketch tells it
 * which kind of host it needs; the host is kept while the host element and the picture stay, else the old one is
 * taken down and one of the sketch's kind made through `SceneHosts`. Built in `main.ts`, handed to `HudView`.
 */
export class SceneStage implements DrawnStage, SceneStages {
  readonly #hosts: SceneHosts;
  /** Where the sketch being shown goes, and whom its scene tells what its picture points at; set by `show`. */
  #at: { readonly host: HTMLElement; readonly onLight: (mark: ChildMark) => void } | undefined;
  #line: { readonly host: HTMLElement; readonly sketch: LineSketch; readonly view: LineScene } | undefined;
  /** The scene was made by the last `show`: it already shows its sketch. */
  #fresh = false;

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
  }

  line(sketch: LineSketch): void {
    const at = this.#at;
    if (at === undefined) return;
    const shown = this.#line;
    if (shown?.host === at.host && shown.sketch.samePicture(sketch)) {
      this.#line = { ...shown, sketch };
      this.#fresh = false;
      return;
    }
    this.clear();
    const view = this.#hosts.line(at.onLight);
    view.mount(at.host);
    view.render(sketch);
    this.#line = { host: at.host, sketch, view };
    this.#fresh = true;
  }

  bare(): void {
    this.clear();
  }

  redraw(): void {
    const shown = this.#line;
    if (shown !== undefined && !this.#fresh) shown.view.render(shown.sketch);
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
    this.#line?.view.dispose();
    this.#line = undefined;
    this.#fresh = false;
  }

  #scene(): DrawnScene | undefined {
    return this.#line?.view;
  }
}
