import { describe, expect, test } from 'vitest';
import { SceneEvents } from '#ui/scene/SceneEvents.ts';

describe('a scene’s pick: made and read in one place', () => {
  test('a pick made on a host is heard as its option id', () => {
    const events = new SceneEvents();
    const host = new EventTarget();
    const heard: string[] = [];
    events.onPick(host, new AbortController().signal, (id) => heard.push(id));
    events.pick(host, 'enter:3');
    expect(heard).toEqual(['enter:3']);
  });

  test('an event of that name without an option id is not a pick', () => {
    const events = new SceneEvents();
    const host = new EventTarget();
    const heard: string[] = [];
    events.onPick(host, new AbortController().signal, (id) => heard.push(id));
    host.dispatchEvent(new Event('pick'));
    host.dispatchEvent(new CustomEvent('pick', { detail: { id: 7 } }));
    host.dispatchEvent(new CustomEvent('pick', { detail: 'enter:3' }));
    expect(heard).toEqual([]);
    host.dispatchEvent(new CustomEvent('pick', { detail: { id: 'enter:3' } }));
    expect(heard).toEqual(['enter:3']);
  });

  test('no pick is heard once the listener is let go', () => {
    const events = new SceneEvents();
    const host = new EventTarget();
    const heard: string[] = [];
    const listening = new AbortController();
    events.onPick(host, listening.signal, (id) => heard.push(id));
    listening.abort();
    events.pick(host, 'enter:3');
    expect(heard).toEqual([]);
  });
});
