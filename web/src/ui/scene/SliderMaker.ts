import { SceneSlider } from './SceneSlider.ts';
import type { Sliders } from './Sliders.ts';

/** Puts a slider into a scene's host (U02). A factory, built in `main.ts`. */
export class SliderMaker implements Sliders {
  mount(host: HTMLElement): SceneSlider {
    return new SceneSlider(host);
  }
}
