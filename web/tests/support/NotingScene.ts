import type { ChildMark } from '#ui/scene/ChildMark.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { StagedScene } from '#ui/scene/StagedScene.ts';

/** A scene host that notes what the stage asked of it. */
export class NotingScene implements StagedScene<Sketch> {
  readonly calls: string[] = [];
  readonly onLight: (mark: ChildMark) => void;

  constructor(onLight: (mark: ChildMark) => void) {
    this.onLight = onLight;
  }

  mount(): void {
    this.calls.push('mount');
  }

  render(sketch: Sketch): void {
    this.calls.push(`render ${sketch.frame().address}`);
  }

  arrive(id: string): void {
    this.calls.push(`arrive ${id}`);
  }

  leads(): boolean {
    return true;
  }

  enter(id: string): void {
    this.calls.push(`enter ${id}`);
  }

  light(): void {
    this.calls.push('light');
  }

  dispose(): void {
    this.calls.push('dispose');
  }
}
