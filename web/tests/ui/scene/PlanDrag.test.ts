import { describe, expect, test } from 'vitest';
import { EaseInOut } from '#ui/scene/EaseInOut.ts';
import { EaseOut } from '#ui/scene/EaseOut.ts';
import { PlanCamera } from '#ui/scene/PlanCamera.ts';
import { PlanDrag } from '#ui/scene/PlanDrag.ts';
import { PlanLayout } from '#ui/scene/PlanLayout.ts';
import { SceneHash } from '#ui/scene/SceneHash.ts';

const SIZE = { width: 360, height: 280 };
const LATER = 60_000;

/** A drag let go after moving the plan from `from` to `to` in a tenth of a second. */
function draggedAcross(camera: PlanCamera, still: boolean) {
  const rest = camera.room(20);
  const drag = new PlanDrag({
    pointer: 1,
    hold: { capture: () => undefined },
    point: { x: 0, y: 0 },
    framing: rest,
  });
  const moved = rest.panned(-60, 0);
  drag.sample(0, rest);
  drag.sample(100, moved);
  return {
    moved,
    landing: drag
      .release({ camera, framing: moved, rest, now: 100, still, ride: new EaseInOut(), coast: new EaseOut() })
      .at(LATER),
  };
}

describe('one finger dragging the plan, let go (U03c)', () => {
  test('it coasts on the way it was moving', () => {
    const camera = new PlanCamera(new PlanLayout(new SceneHash()).of(48, '0.1.2'), SIZE);
    const { moved, landing } = draggedAcross(camera, false);
    expect(landing.x()).toBeGreaterThan(moved.x());
    expect(landing.scale()).toBe(moved.scale());
  });

  test('under reduced motion it stays where it was let go', () => {
    const camera = new PlanCamera(new PlanLayout(new SceneHash()).of(48, '0.1.2'), SIZE);
    const { moved, landing } = draggedAcross(camera, true);
    expect(landing.equals(camera.clamp(moved))).toBe(true);
  });
});
