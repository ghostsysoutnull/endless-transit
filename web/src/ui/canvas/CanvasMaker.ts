import type { Canvases } from './Canvases.ts';
import { ElementStyle } from './ElementStyle.ts';
import { PixelCanvas } from './PixelCanvas.ts';
import type { RatioLimit } from './RatioLimit.ts';
import { StylePalette } from './StylePalette.ts';

/** Puts a canvas into a host, on the page's one pixel budget, inked where it sits (U02). A factory, built in `main.ts`. */
export class CanvasMaker implements Canvases {
  readonly #budget: RatioLimit;

  constructor(budget: RatioLimit) {
    this.#budget = budget;
  }

  mount(host: HTMLElement, onResize: () => void): PixelCanvas {
    const canvas = host.ownerDocument.createElement('canvas');
    host.replaceChildren(canvas);
    const observer = new ResizeObserver(onResize);
    observer.observe(host);
    return new PixelCanvas({
      host,
      canvas,
      observer,
      budget: this.#budget,
      colours: new StylePalette(new ElementStyle(canvas)),
    });
  }
}
