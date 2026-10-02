import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { Clock } from '#ui/scene/Clock.ts';
import type { CanvasViews } from '#ui/screens/CanvasViews.ts';
import type { View } from '#ui/View.ts';
import type { Canvases } from './Canvases.ts';
import { CanvasView } from './CanvasView.ts';
import type { MapPictureVM } from './MapPictureVM.ts';
import type { Picture } from './Picture.ts';
import type { SpectrumVM } from './SpectrumVM.ts';

/** The pictures the world screen's canvases draw: the map (in the pane and under the narrative) and the trace. */
type CanvasPictures = Readonly<{ map: Picture<MapPictureVM>; spectrum: Picture<SpectrumVM> }>;

/** Makes the world screen's canvas views (U02): the map and the trace, each on the page's clock. A factory, built in `main.ts`. */
export class CanvasViewMaker implements CanvasViews {
  readonly #pictures: CanvasPictures;
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;
  readonly #canvases: Canvases;

  constructor(pictures: CanvasPictures, clock: Clock, motion: ReducedMotion, canvases: Canvases) {
    this.#pictures = pictures;
    this.#clock = clock;
    this.#motion = motion;
    this.#canvases = canvases;
  }

  pane(): View<MapPictureVM> {
    return new CanvasView(this.#pictures.map, this.#clock, this.#motion, this.#canvases);
  }

  map(): View<MapPictureVM> {
    return new CanvasView(this.#pictures.map, this.#clock, this.#motion, this.#canvases);
  }

  spectrum(): View<SpectrumVM> {
    return new CanvasView(this.#pictures.spectrum, this.#clock, this.#motion, this.#canvases);
  }
}
