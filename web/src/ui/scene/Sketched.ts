import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { SceneCamera } from './SceneCamera.ts';
import type { SceneChild } from './SceneChild.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import type { SceneVM } from './SceneVM.ts';
import type { LineSketch } from './LineSketch.ts';
import type { SceneStages } from './SceneStages.ts';
import type { Sketch } from './Sketch.ts';
import type { ChildMark } from './ChildMark.ts';

/** A picture's own view model and the picture: each call handed on with the view model it was made for. Value object. */
export class Sketched<VM extends SceneVM<SceneChild>> implements LineSketch {
  readonly #picture: ScenePicture<VM>;
  readonly #vm: VM;

  constructor(picture: ScenePicture<VM>, vm: VM) {
    this.#picture = picture;
    this.#vm = vm;
  }

  frame(): SceneVM<SceneChild> {
    return this.#vm;
  }

  drawn(): boolean {
    return true;
  }

  layout(size: PictureSize, view: number): readonly SceneHit[] {
    return this.#picture.layout(this.#vm, size, view);
  }

  paint(
    painter: Painter,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: ChildMark,
    view: number,
    here: ChildMark,
  ): void {
    this.#picture.paint(painter, this.#vm, size, palette, time, lit, view, here);
  }

  camera(size: PictureSize): SceneCamera {
    return this.#picture.camera(this.#vm, size);
  }

  samePicture(other: Sketch): boolean {
    return other.drawnBy(this.#picture);
  }

  drawnBy(picture: ScenePicture<never>): boolean {
    return picture === this.#picture;
  }

  stageOn(stage: SceneStages): void {
    stage.line(this);
  }
}
