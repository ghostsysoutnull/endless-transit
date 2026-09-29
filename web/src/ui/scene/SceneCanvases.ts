import type { CanvasInput } from './CanvasInput.ts';
import type { SceneCanvas } from './SceneCanvas.ts';

/** How a scene host gets its canvas (`SceneCanvasMaker`): one put into its host, telling `input` what happens on it. */
export interface SceneCanvases {
  mount(host: HTMLElement, input: CanvasInput): SceneCanvas;
}
