import { describe, expect, test } from 'vitest';
import { MotionClock } from '#ui/scene/MotionClock.ts';
import { FakeFrameSource } from '#tests/support/FakeFrameSource.ts';

describe('the motion clock: the page’s one frame loop (Decision 4)', () => {
  test('asks for nothing until someone listens, then one frame at a time for every listener', () => {
    const source = new FakeFrameSource();
    const clock = new MotionClock(source);
    expect(source.requests).toBe(0);
    const heard: string[] = [];
    clock.subscribe((time) => heard.push(`a${String(time)}`));
    clock.subscribe((time) => heard.push(`b${String(time)}`));
    expect(source.waiting()).toBe(1);
    source.frame(16);
    source.frame(33);
    expect(heard).toEqual(['a16', 'b16', 'a33', 'b33']);
    expect(source.waiting()).toBe(1);
    expect(source.requests).toBe(3);
  });

  test('stops when the last listener leaves', () => {
    const source = new FakeFrameSource();
    const clock = new MotionClock(source);
    const leave = clock.subscribe(() => undefined);
    const other = clock.subscribe(() => undefined);
    source.frame(16);
    leave();
    expect(source.waiting()).toBe(1);
    other();
    expect(source.waiting()).toBe(0);
    source.frame(33);
    expect(source.requests).toBe(2);
  });

  test('asks for the next frame before it calls the listeners, and a listener leaving in its frame skips no other', () => {
    const source = new FakeFrameSource();
    const clock = new MotionClock(source);
    const seen: number[] = [];
    let leave: () => void = () => undefined;
    leave = clock.subscribe(() => {
      // By now the next frame is already asked for.
      seen.push(source.waiting());
      leave();
    });
    const heard: number[] = [];
    clock.subscribe((time) => heard.push(time));
    source.frame(16);
    source.frame(33);
    expect(seen).toEqual([1]);
    expect(heard).toEqual([16, 33]);
  });

  test('the last listener leaving in its own frame cancels the frame already asked for', () => {
    const source = new FakeFrameSource();
    const clock = new MotionClock(source);
    let leave: () => void = () => undefined;
    leave = clock.subscribe(() => {
      leave();
    });
    source.frame(16);
    expect(source.waiting()).toBe(0);
  });

  test('tells the time of its source', () => {
    const source = new FakeFrameSource();
    source.frame(120);
    expect(new MotionClock(source).now()).toBe(120);
  });
});
