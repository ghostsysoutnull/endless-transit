import type { OptionVM } from '#ui/OptionVM.ts';

/**
 * The one place where a click, a tap or a key becomes an option id. A tap on a touch screen arrives as
 * `click`, so buttons work everywhere; keys are an extra for desktops and never the only way.
 */
export class InputRouter {
  readonly #onOption: (optionId: string) => void;
  readonly #listeners = new AbortController();
  #options: readonly OptionVM[] = [];

  constructor(onOption: (optionId: string) => void) {
    this.#onOption = onOption;
  }

  attach(container: HTMLElement): void {
    const signal = this.#listeners.signal;
    container.addEventListener(
      'click',
      (event) => {
        this.#click(event);
      },
      { signal },
    );
    container.ownerDocument.addEventListener(
      'keydown',
      (event) => {
        this.#key(event);
      },
      { signal },
    );
  }

  /** The options on screen right now; anything else is ignored. */
  offer(options: readonly OptionVM[]): void {
    this.#options = options;
  }

  detach(): void {
    this.#listeners.abort();
  }

  #click(event: MouseEvent): void {
    if (!(event.target instanceof Element)) return;
    const id = event.target.closest<HTMLElement>('button[data-option]')?.dataset.option;
    if (id !== undefined && this.#options.some((option) => option.id === id)) this.#onOption(id);
  }

  #key(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
    const option = this.#options.find((entry) => entry.key.toLowerCase() === event.key.toLowerCase());
    if (option === undefined) return;
    event.preventDefault();
    this.#onOption(option.id);
  }
}
