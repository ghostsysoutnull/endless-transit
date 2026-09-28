import type { PixelCanvas } from './PixelCanvas.ts';

/** How a view gets its canvas (`CanvasMaker`): one put into a host, told when the host changes size. */
export interface Canvases {
  mount(host: HTMLElement, onResize: () => void): PixelCanvas;
}
