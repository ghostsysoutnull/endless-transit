import type { View } from '#ui/View.ts';

/**
 * The canvases a screen may carry, one per named slot, each mounted into a host element the screen's
 * template keeps or drops: a slot bound to a new host gets a fresh view, a slot whose host is gone (or
 * whose picture is null) is disposed. The screen names each slot's picture type once, here.
 */
export class CanvasSlots<T extends Record<string, object>> {
  readonly #make: { readonly [K in keyof T]: () => View<T[K]> };
  readonly #bound = new Map<keyof T, { readonly host: HTMLElement; readonly view: View<object> }>();

  constructor(make: { readonly [K in keyof T]: () => View<T[K]> }) {
    this.#make = make;
  }

  bind<K extends keyof T>(slot: K, host: HTMLElement | null | undefined, picture: T[K] | null): void {
    if (host == null || picture === null) {
      this.unbind(slot);
      return;
    }
    const bound = this.#bound.get(slot);
    let view = bound?.host === host ? bound.view : undefined;
    if (view === undefined) {
      this.unbind(slot);
      view = this.#make[slot]();
      view.mount(host);
      this.#bound.set(slot, { host, view });
    }
    view.render(picture);
  }

  unbind(slot: keyof T): void {
    this.#bound.get(slot)?.view.dispose();
    this.#bound.delete(slot);
  }

  dispose(): void {
    for (const slot of [...this.#bound.keys()]) this.unbind(slot);
  }
}
