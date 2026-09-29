import { describe, expect, test } from 'vitest';
import { Framing } from '#ui/scene/Framing.ts';
import { PlanGlide } from '#ui/scene/PlanGlide.ts';
import type { PlanMotion } from '#ui/scene/PlanMotion.ts';
import { PlanTrip } from '#ui/scene/PlanTrip.ts';

const STEADY = { ease: (progress: number): number => progress };

function glide(): PlanGlide {
  return new PlanGlide({
    from: new Framing(0, 0, 100),
    to: new Framing(2, 0, 100),
    start: 1000,
    duration: 400,
    easing: STEADY,
  });
}

describe('the plan’s view on its way (U03)', () => {
  test('a glide goes from where it stood to where it is sent, over its time', () => {
    const motion = glide();
    expect(motion.at(1000).x()).toBe(0);
    expect(motion.at(1200).x()).toBe(1);
    expect(motion.at(1400).x()).toBe(2);
    expect(motion.at(9999).x()).toBe(2);
    expect([motion.over(1399), motion.over(1400)]).toEqual([false, true]);
  });

  test('a trip glides the same way and, finished, picks its option; a glide finished picks nothing', () => {
    const picked: string[] = [];
    const picks = { pick: (id: string): void => void picked.push(id) };
    const trip = new PlanTrip(glide(), 'move:forward');
    expect(trip.at(1200).x()).toBe(1);
    const plain: PlanMotion = glide();
    plain.finish(picks);
    trip.finish(picks);
    expect(picked).toEqual(['move:forward']);
  });
});
