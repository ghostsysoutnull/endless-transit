import { describe, expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import type { ChildMark } from '#ui/scene/ChildMark.ts';
import { MarkedChild } from '#ui/scene/MarkedChild.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { ScenePicture } from '#ui/scene/ScenePicture.ts';
import { SceneStage } from '#ui/scene/SceneStage.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import { Sketched } from '#ui/scene/Sketched.ts';
import { Planned } from '#ui/scene/Planned.ts';
import type { PlanDrawing } from '#ui/scene/PlanDrawing.ts';
import type { PlanVM } from '#ui/scene/PlanVM.ts';
import { PlanCamera } from '#ui/scene/PlanCamera.ts';
import { PlanLayout } from '#ui/scene/PlanLayout.ts';
import { SceneHash } from '#ui/scene/SceneHash.ts';
import { RoomLook } from '#engine/model/RoomLook.ts';
import { StillCamera } from '#ui/scene/StillCamera.ts';
import { Unsketched } from '#ui/scene/Unsketched.ts';
import { NotingScene } from '#tests/support/NotingScene.ts';

/** A page element the stage only hands on: an opaque token in a test without a DOM. */
function aHost(): HTMLElement {
  return {} as HTMLElement;
}

function aPicture(): ScenePicture<SceneVM<SceneChild>> {
  return { layout: () => [], paint: () => undefined, camera: () => new StillCamera() };
}

function aPlanPicture(): PlanDrawing<PlanVM> {
  const camera = (): PlanCamera =>
    new PlanCamera(new PlanLayout(new SceneHash()).of(1, '0'), { width: 1, height: 1 });
  return {
    layout: () => [],
    paint: () => undefined,
    camera,
    stopOf: () => undefined,
    rest: () => camera().whole(),
  };
}

function aPlanFrame(address: string): PlanVM {
  return {
    ...aFrame(address),
    rooms: [],
    here: address,
    look: new RoomLook({ walls: 'rust', light: 'analog', cold: false, furniture: 1, anomaly: false }),
    doors: [],
    exits: [],
    relics: [],
  };
}

function aFrame(address: string): SceneVM<SceneChild> {
  return { label: '', address, children: [], slider: '', decay: 0, noise: new Seed(0, 0) };
}

/** A stage whose hosts note what they are asked, the kind each was made for first in its calls. */
function aStage(): { stage: SceneStage; made: NotingScene[] } {
  const made: NotingScene[] = [];
  const make = (kind: string) => (onLight: (mark: ChildMark) => void) => {
    const scene = new NotingScene(onLight);
    scene.calls.push(kind);
    made.push(scene);
    return scene;
  };
  const stage = new SceneStage({ line: make('line'), plan: make('plan') });
  return { stage, made };
}

const ignore = (): void => undefined;

describe('the scene stage: which scene host shows the picture now', () => {
  test('a first picture: one scene made, mounted and shown its sketch once — a redraw does not show it again', () => {
    const { stage, made } = aStage();
    stage.show(aHost(), new Sketched(aPicture(), aFrame('0.1')), ignore);
    stage.redraw();
    expect(made.map((scene) => scene.calls)).toEqual([['line', 'mount', 'render 0.1']]);
    expect(stage.showing()).toBe(true);
  });

  test('the same picture in the same host keeps its scene, and a redraw shows it the new sketch', () => {
    const { stage, made } = aStage();
    const host = aHost();
    const picture = aPicture();
    stage.show(host, new Sketched(picture, aFrame('0.1')), ignore);
    stage.show(host, new Sketched(picture, aFrame('0.2')), ignore);
    stage.redraw();
    expect(made.map((scene) => scene.calls)).toEqual([['line', 'mount', 'render 0.1', 'render 0.2']]);
  });

  test('another picture takes the old scene down and makes one for the new, told whom to tell what it points at', () => {
    const { stage, made } = aStage();
    const host = aHost();
    const lit: ChildMark[] = [];
    stage.show(host, new Sketched(aPicture(), aFrame('0.1')), ignore);
    stage.show(host, new Sketched(aPicture(), aFrame('0.1.3')), (mark) => lit.push(mark));
    made[1]?.onLight(new MarkedChild('enter:2'));
    expect(made.map((scene) => scene.calls)).toEqual([
      ['line', 'mount', 'render 0.1', 'dispose'],
      ['line', 'mount', 'render 0.1.3'],
    ]);
    expect(lit.map((mark) => mark.written())).toEqual(['enter:2']);
  });

  test('a picture of another kind (a room’s plan after the corridor) takes the old host down and makes one of its kind', () => {
    const { stage, made } = aStage();
    const host = aHost();
    stage.show(host, new Sketched(aPicture(), aFrame('0.1.3')), ignore);
    stage.show(host, new Planned(aPlanPicture(), aPlanFrame('0.1.3.0')), ignore);
    stage.redraw();
    expect(made.map((scene) => scene.calls)).toEqual([
      ['line', 'mount', 'render 0.1.3', 'dispose'],
      ['plan', 'mount', 'render 0.1.3.0'],
    ]);
  });

  test('the same picture in a new host is a new scene', () => {
    const { stage, made } = aStage();
    const picture = aPicture();
    stage.show(aHost(), new Sketched(picture, aFrame('0.1')), ignore);
    stage.show(aHost(), new Sketched(picture, aFrame('0.1')), ignore);
    expect(made).toHaveLength(2);
    expect(made[0]?.calls.at(-1)).toBe('dispose');
  });

  test('a place no picture draws, or no host, takes the scene down: nothing is shown, nothing leads', () => {
    for (const hide of [
      (stage: SceneStage) => {
        stage.show(aHost(), new Unsketched(aFrame('0.1.3.0')), ignore);
      },
      (stage: SceneStage) => {
        stage.show(null, new Sketched(aPicture(), aFrame('0.1')), ignore);
      },
    ]) {
      const { stage, made } = aStage();
      stage.show(aHost(), new Sketched(aPicture(), aFrame('0.1')), ignore);
      hide(stage);
      stage.redraw();
      expect(made[0]?.calls.at(-1)).toBe('dispose');
      expect(stage.showing()).toBe(false);
      expect(stage.leads('enter:0')).toBe(false);
    }
  });

  test('the scene shown is the one that arrives, enters and lights', () => {
    const { stage, made } = aStage();
    stage.show(aHost(), new Sketched(aPicture(), aFrame('0.1')), ignore);
    stage.arrive('enter:1');
    stage.enter('enter:2');
    stage.light(new MarkedChild('enter:2'));
    expect(made[0]?.calls.slice(-3)).toEqual(['arrive enter:1', 'enter enter:2', 'light']);
  });
});
