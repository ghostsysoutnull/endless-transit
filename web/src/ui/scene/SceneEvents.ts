import type { ScenePick } from './ScenePick.ts';

/** The bubbling event a scene asks by for its child to be entered; its detail is `{ id }`, the option's id. */
const PICK = 'pick';

/**
 * Owns one fact: what a scene's pick is (U01b) — how it is made on the scene's host and how its option id is read
 * back, once, where it is heard (the input router). The picture never presses a button: the list stays the one set
 * of buttons, and the router still checks the id is on offer.
 */
export class SceneEvents implements ScenePick {
  /** Asks, from the scene's host, for the child with this option id to be entered. */
  pick(host: EventTarget, id: string): void {
    host.dispatchEvent(new CustomEvent(PICK, { bubbles: true, detail: { id } }));
  }

  /** Hears the picks that reach this target, each as its option id, until the signal lets go; one without an id is not a pick. */
  onPick(target: EventTarget, signal: AbortSignal, listener: (id: string) => void): void {
    target.addEventListener(
      PICK,
      (event) => {
        const id = this.#idOf(event);
        if (id !== undefined) listener(id);
      },
      { signal },
    );
  }

  #idOf(event: Event): string | undefined {
    if (!(event instanceof CustomEvent)) return undefined;
    const detail: unknown = event.detail;
    const id = typeof detail === 'object' && detail !== null && 'id' in detail ? detail.id : undefined;
    return typeof id === 'string' ? id : undefined;
  }
}
