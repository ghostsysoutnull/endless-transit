import type { Drag } from './Drag.ts';
import { Fling } from './Fling.ts';
import type { SceneCamera } from './SceneCamera.ts';
import type { SceneSlider } from './SceneSlider.ts';

/**
 * A finger on the slider (U02): a drag from the start, the view wherever the finger is along the track. Made per
 * finger.
 */
export class SliderDrag implements Drag {
  readonly #pointer: number;
  readonly #slider: SceneSlider;
  readonly #camera: SceneCamera;
  readonly #fling = new Fling();
  #view: number | undefined;

  constructor(facts: {
    pointer: number;
    slider: SceneSlider;
    camera: SceneCamera;
    point: { readonly x: number; readonly y: number };
  }) {
    this.#pointer = facts.pointer;
    this.#slider = facts.slider;
    this.#camera = facts.camera;
    this.#view = facts.slider.valueAt(facts.point, facts.camera);
  }

  is(pointer: number): boolean {
    return this.#pointer === pointer;
  }

  move(point: { readonly x: number; readonly y: number }): void {
    this.#view = this.#slider.valueAt(point, this.#camera);
  }

  moved(): boolean {
    return true;
  }

  view(): number | undefined {
    return this.#view;
  }

  hidesClick(): boolean {
    return false;
  }

  sample(time: number, view: number): void {
    this.#fling.sample(time, view);
  }

  speed(now: number): number {
    return this.#fling.speed(now);
  }
}
