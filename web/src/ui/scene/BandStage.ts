import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { ChildMark } from './ChildMark.ts';
import type { LineSketch } from './LineSketch.ts';
import { MarkedChild } from './MarkedChild.ts';
import { NoChild } from './NoChild.ts';
import { NoMinimap } from './NoMinimap.ts';
import type { PlanSketch } from './PlanSketch.ts';
import type { Point } from './Point.ts';
import type { SceneStages } from './SceneStages.ts';

/**
 * One band's picture painted once (U04): the sketch tells it which kind it is, and it paints the level's own picture
 * at the band's size — the view at the place you went down into (a tower at your floor, a corridor at your door), a
 * plan whole — marking that place, and keeps the spot where it stands for the thread. A command object, made per paint.
 */
export class BandStage implements SceneStages {
  readonly #context: CanvasRenderingContext2D;
  readonly #size: PictureSize;
  readonly #palette: Palette;
  readonly #time: number;
  readonly #into: string;
  #spot: Point;

  constructor(parts: {
    readonly context: CanvasRenderingContext2D;
    readonly size: PictureSize;
    readonly palette: Palette;
    readonly time: number;
    readonly into: string;
  }) {
    this.#context = parts.context;
    this.#size = parts.size;
    this.#palette = parts.palette;
    this.#time = parts.time;
    this.#into = parts.into;
    this.#spot = { x: parts.size.width / 2, y: parts.size.height / 2 };
  }

  /** Where the place you went down into stands on the band, or its middle. */
  spot(): Point {
    return this.#spot;
  }

  line(sketch: LineSketch): void {
    const camera = sketch.camera(this.#size);
    const view = (this.#into === '' ? undefined : camera.stopOf(this.#into)) ?? camera.rest();
    sketch.paint(this.#context, this.#size, this.#palette, this.#time, new NoChild(), view, this.#here());
    const hit = sketch.layout(this.#size, view).find((each) => each.id === this.#into);
    if (hit !== undefined) this.#spot = hit.anchor;
  }

  plan(sketch: PlanSketch): void {
    const framing = sketch.camera(this.#size).whole();
    sketch.paint(
      this.#context,
      this.#size,
      this.#palette,
      this.#time,
      new NoChild(),
      framing,
      new NoMinimap(),
    );
  }

  bare(): void {
    this.#context.fillStyle = this.#palette('ground');
    this.#context.fillRect(0, 0, this.#size.width, this.#size.height);
  }

  #here(): ChildMark {
    return this.#into === '' ? new NoChild() : new MarkedChild(this.#into);
  }
}
