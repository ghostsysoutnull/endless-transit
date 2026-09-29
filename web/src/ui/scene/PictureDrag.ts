import type { Drag } from './Drag.ts';
import { Fling } from './Fling.ts';
import type { PointerHold } from './PointerHold.ts';
import type { SceneCamera } from './SceneCamera.ts';

/** A finger that moves less than this is a tap, not a drag (the mock's 6 px). */
const SLOP = 6;

/**
 * A finger on the picture (U02): where it went down along the camera's axis and the view then; a tap until it goes
 * past the slop, a drag from then on — once moved it stays moved — moving the view one to one, the finger kept by the
 * canvas from then on even when it leaves the picture. Made per finger.
 */
export class PictureDrag implements Drag {
  readonly #pointer: number;
  readonly #camera: SceneCamera;
  readonly #hold: PointerHold;
  readonly #start: number;
  readonly #view: number;
  readonly #fling = new Fling();
  #position: number;
  #moved = false;

  constructor(facts: {
    pointer: number;
    camera: SceneCamera;
    hold: PointerHold;
    point: { readonly x: number; readonly y: number };
    view: number;
  }) {
    this.#pointer = facts.pointer;
    this.#camera = facts.camera;
    this.#hold = facts.hold;
    this.#start = facts.camera.along(facts.point);
    this.#position = this.#start;
    this.#view = facts.view;
  }

  is(pointer: number): boolean {
    return this.#pointer === pointer;
  }

  move(point: { readonly x: number; readonly y: number }): void {
    this.#position = this.#camera.along(point);
    if (this.#moved || Math.abs(this.#position - this.#start) <= SLOP) return;
    this.#moved = true;
    this.#hold.capture(this.#pointer);
  }

  moved(): boolean {
    return this.#moved;
  }

  view(): number | undefined {
    return this.#moved ? this.#view + (this.#position - this.#start) * this.#camera.dragRate() : undefined;
  }

  hidesClick(): boolean {
    return true;
  }

  sample(time: number, view: number): void {
    this.#fling.sample(time, view);
  }

  speed(now: number): number {
    return this.#fling.speed(now);
  }
}
