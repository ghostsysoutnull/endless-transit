import type { StyleSource } from './StyleSource.ts';

/** The stylesheet as it resolves on one element — `--frame` is the place's colour there: the browser side of a palette. */
export class ElementStyle implements StyleSource {
  readonly #element: Element;

  constructor(element: Element) {
    this.#element = element;
  }

  value(token: string): string {
    return (
      this.#element.ownerDocument.defaultView
        ?.getComputedStyle(this.#element)
        .getPropertyValue(`--${token}`) ?? ''
    );
  }
}
