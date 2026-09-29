import type { SceneSlider } from './SceneSlider.ts';

/** How a scene gets its slider (`SliderMaker`): one put into its host. */
export interface Sliders {
  mount(host: HTMLElement): SceneSlider;
}
