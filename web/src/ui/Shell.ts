import type { GameEngine } from '#engine/rules/GameEngine.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { InputRouter } from './input/InputRouter.ts';
import type { Screen } from './Screen.ts';
import type { View } from './View.ts';

/**
 * The loop of the page: input → `engine.step` → view-model → view. The engine pushes nothing and the view
 * pulls nothing; this class is the only one that knows all three.
 */
export class Shell<VM extends Screen> {
  readonly #engine: GameEngine;
  readonly #toViewModel: (snapshot: GameSnapshot) => VM;
  readonly #view: View<VM>;
  readonly #router: InputRouter;

  constructor(engine: GameEngine, toViewModel: (snapshot: GameSnapshot) => VM, view: View<VM>) {
    this.#engine = engine;
    this.#toViewModel = toViewModel;
    this.#view = view;
    this.#router = new InputRouter((optionId) => {
      this.#show(this.#engine.step(optionId));
    });
  }

  start(container: HTMLElement): void {
    this.#view.mount(container);
    this.#router.attach(container);
    this.#show(this.#engine.snapshot());
  }

  stop(): void {
    this.#router.detach();
    this.#view.dispose();
  }

  #show(snapshot: GameSnapshot): void {
    const vm = this.#toViewModel(snapshot);
    this.#view.render(vm);
    this.#router.offer(vm.options);
  }
}
