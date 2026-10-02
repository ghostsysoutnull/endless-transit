import type { Curtain } from './Curtain.ts';
import type { DrawnStage } from '#ui/screens/DrawnStage.ts';
import type { ChildMark } from './ChildMark.ts';
import type { LineSketch } from './LineSketch.ts';
import type { PlanSketch } from './PlanSketch.ts';
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
  #plan: ShownScene<PlanSketch> | undefined;

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
    this.#stage(
      this.#line,
      sketch,
      (onLight) => this.#hosts.line(onLight),
      (shown) => {
        this.#line = shown;
      },
    );
  }

  plan(sketch: PlanSketch): void {
    this.#stage(
      this.#plan,
      sketch,
      (onLight) => this.#hosts.plan(onLight),
      (shown) => {
        this.#plan = shown;
      },
    );
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

  enter(id: string, curtain: Curtain): void {
    this.#shown()?.enter(id, curtain);
  }

  light(mark: ChildMark): void {
    this.#shown()?.light(mark);
  }

  clear(): void {
    this.#shown()?.dispose();
    this.#line = undefined;
    this.#plan = undefined;
  }

  /**
   * The scene for a sketch of its kind, kept by `keep`: the one shown, kept while its host element and picture stay,
   * else the old scene taken down and one made, put into the host and shown the sketch.
   */
  #stage<S extends Sketch>(
    shown: ShownScene<S> | undefined,
    sketch: S,
    make: (onLight: (mark: ChildMark) => void) => StagedScene<S>,
    keep: (shown: ShownScene<S>) => void,
  ): void {
    const at = this.#at;
    if (at === undefined) return;
    if (shown?.keeps(at.host, sketch) === true) {
      keep(shown.keptFor(sketch));
      return;
    }
    this.clear();
    const view = make(at.onLight);
    view.mount(at.host);
    view.render(sketch);
    keep(new ShownScene({ host: at.host, sketch, view, fresh: true }));
  }

  /** The scene shown now, of whichever kind. */
  #shown(): ShownScene<LineSketch> | ShownScene<PlanSketch> | undefined {
    return this.#line ?? this.#plan;
  }
}
