import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { Clock } from '#ui/scene/Clock.ts';
import type { CanvasViews } from '#ui/screens/CanvasViews.ts';
import type { MapPanelVM } from '#ui/screens/MapPanelVM.ts';
import type { View } from '#ui/View.ts';
import { CanvasView } from './CanvasView.ts';
import type { Picture } from './Picture.ts';
import type { TracePictureVM } from './TracePictureVM.ts';

/** Makes the world screen's canvas views (U02): the map and the trace, each on the page's clock. A factory, built in `main.ts`. */
export class CanvasViewMaker implements CanvasViews {
  readonly #pictures: {
    readonly map: Picture<MapPanelVM['picture']>;
    readonly trace: Picture<TracePictureVM>;
  };
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;

  constructor(
    pictures: { map: Picture<MapPanelVM['picture']>; trace: Picture<TracePictureVM> },
    clock: Clock,
    motion: ReducedMotion,
  ) {
    this.#pictures = pictures;
    this.#clock = clock;
    this.#motion = motion;
  }

  pane(): View<MapPanelVM['picture']> {
    return new CanvasView(this.#pictures.map, this.#clock, this.#motion);
  }

  map(): View<MapPanelVM['picture']> {
    return new CanvasView(this.#pictures.map, this.#clock, this.#motion);
  }

  trace(): View<TracePictureVM> {
    return new CanvasView(this.#pictures.trace, this.#clock, this.#motion);
  }
}
