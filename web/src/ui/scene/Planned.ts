import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { ChildMark } from './ChildMark.ts';
import type { Framing } from './Framing.ts';
import type { PlanCamera } from './PlanCamera.ts';
import type { PlanDrawing } from './PlanDrawing.ts';
import type { PlanSketch } from './PlanSketch.ts';
import type { PlanVM } from './PlanVM.ts';
import type { SceneChild } from './SceneChild.ts';
import type { SceneHit } from './SceneHit.ts';
import type { SceneStages } from './SceneStages.ts';
import type { SceneVM } from './SceneVM.ts';
import type { Sketch } from './Sketch.ts';

/** The plan's view model and its picture (U03): each call handed on with the view model it was made for. Value object. */
export class Planned implements PlanSketch {
  readonly #picture: PlanDrawing<PlanVM>;
  readonly #vm: PlanVM;

  constructor(picture: PlanDrawing<PlanVM>, vm: PlanVM) {
    this.#picture = picture;
    this.#vm = vm;
  }

  frame(): SceneVM<SceneChild> {
    return this.#vm;
  }

  drawn(): boolean {
    return true;
  }

  samePicture(other: Sketch): boolean {
    return other.drawnBy(this.#picture);
  }

  drawnBy(picture: object): boolean {
    return picture === this.#picture;
  }

  stageOn(stage: SceneStages): void {
    stage.plan(this);
  }

  layout(size: PictureSize, framing: Framing): readonly SceneHit[] {
    return this.#picture.layout(this.#vm, size, framing);
  }

  paint(
    painter: Painter,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: ChildMark,
    framing: Framing,
  ): void {
    this.#picture.paint(painter, this.#vm, size, palette, time, lit, framing);
  }

  camera(size: PictureSize): PlanCamera {
    return this.#picture.camera(this.#vm, size);
  }

  stopOf(camera: PlanCamera, id: string): Framing | undefined {
    return this.#picture.stopOf(this.#vm, camera, id);
  }

  rest(camera: PlanCamera): Framing {
    return this.#picture.rest(this.#vm, camera);
  }
}
