import type { SliderBox } from './SliderBox.ts';

/** What a camera's track asks of the slider laid over the picture (`SceneSlider`): lie over this box, or hide. */
export interface SliderFace {
  /** Laid over this box on the picture, running along `axis`. */
  placeAt(box: SliderBox, axis: 'x' | 'y'): void;
  hide(): void;
}
