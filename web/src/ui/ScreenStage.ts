import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { Presenter } from './Presenter.ts';
import type { Screen } from './Screen.ts';
import type { View } from './View.ts';

/**
 * One screen of the game: a presenter and the view that draws what it makes, bound together so the
 * shell can hold screens of different view-model types in one list and never look inside them.
 */
export class ScreenStage<VM extends Screen> {
  readonly #presenter: Presenter<VM>;
  readonly #view: View<VM>;

  constructor(presenter: Presenter<VM>, view: View<VM>) {
    this.#presenter = presenter;
    this.#view = view;
  }

  accepts(snapshot: GameSnapshot): boolean {
    return this.#presenter.accepts(snapshot);
  }

  mount(container: HTMLElement): void {
    this.#view.mount(container);
  }

  /** Draws the snapshot and hands back what the shell needs to know about what was drawn. */
  show(snapshot: GameSnapshot): Screen {
    const vm = this.#presenter.toViewModel(snapshot);
    this.#view.render(vm);
    return vm;
  }

  dispose(): void {
    this.#view.dispose();
  }
}
