import type { SceneCamera } from './SceneCamera.ts';
import type { TrackReader } from './TrackReader.ts';

/** The slider's arrow keys (a desktop extra): up and right to the next stop, down and left to the one before. */
const STEPS: Readonly<Record<string, number>> = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 };

/**
 * The slider over a drawn place (U02): a real `role=slider` in the scene's host, laid over the camera's track and
 * hidden where the picture has none, named by the list's heading, its value the stop nearest the view and that
 * child's name. It reads a finger along its track, and its arrow keys as steps.
 */
export class SceneSlider implements TrackReader {
  readonly #element: HTMLElement;

  constructor(host: HTMLElement) {
    this.#element = host.ownerDocument.createElement('div');
    this.#element.className = 'slider';
    this.#element.setAttribute('role', 'slider');
    this.#element.tabIndex = 0;
    this.#element.hidden = true;
    host.append(this.#element);
  }

  /** Laid over the camera's track and named; hidden when the camera has none. */
  place(camera: SceneCamera, name: string): void {
    const track = camera.track();
    this.#element.hidden = track === null;
    if (track === null) return;
    this.#element.style.left = `${String(track.x)}px`;
    this.#element.style.top = `${String(track.y)}px`;
    this.#element.style.width = `${String(track.width)}px`;
    this.#element.style.height = `${String(track.height)}px`;
    this.#element.setAttribute('aria-orientation', track.axis === 'y' ? 'vertical' : 'horizontal');
    this.#element.setAttribute('aria-label', name);
    this.#element.setAttribute('aria-valuemin', '1');
    this.#element.setAttribute('aria-valuemax', String(camera.stopCount()));
  }

  /** Its value: the stop at this place in its order (from 0), named by its child; nothing changes while hidden. */
  show(index: number, name: string): void {
    const now = String(index + 1);
    if (this.#element.hidden || this.#element.getAttribute('aria-valuenow') === now) return;
    this.#element.setAttribute('aria-valuenow', now);
    this.#element.setAttribute('aria-valuetext', name);
  }

  /** The view under a point on the page along its track; nothing when the camera has no track. */
  valueAt(point: { readonly x: number; readonly y: number }, camera: SceneCamera): number | undefined {
    if (camera.track() === null) return undefined;
    return camera.alongTrack(point, this.#element.getBoundingClientRect());
  }

  /** The step an arrow key asks for; nothing for any other key. */
  step(event: KeyboardEvent): number | undefined {
    return STEPS[event.key];
  }

  /** A finger down on it: it keeps the finger and the focus, and the page does not scroll. */
  grab(event: PointerEvent): void {
    event.preventDefault();
    this.#element.setPointerCapture(event.pointerId);
    this.#element.focus({ preventScroll: true });
  }

  listen<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (event: HTMLElementEventMap[K]) => void,
    signal: AbortSignal,
  ): void {
    this.#element.addEventListener(type, listener, { signal });
  }

  remove(): void {
    this.#element.remove();
  }
}
