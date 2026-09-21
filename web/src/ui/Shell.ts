import type { GameEngine } from '#engine/rules/GameEngine.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { InputRouter } from './input/InputRouter.ts';
import type { Screen } from './Screen.ts';
import type { View } from './View.ts';

/**
 * The loop of the page: input → `engine.step` → view-model → view. The engine pushes nothing and the view
 * pulls nothing; this class is the only one that knows all three. It also owns the focus rule, so every
 * screen gets it without writing it.
 */
export class Shell<VM extends Screen> {
  readonly #engine: GameEngine;
  readonly #toViewModel: (snapshot: GameSnapshot) => VM;
  readonly #view: View<VM>;
  readonly #router: InputRouter;
  #container: HTMLElement | undefined;

  constructor(engine: GameEngine, toViewModel: (snapshot: GameSnapshot) => VM, view: View<VM>) {
    this.#engine = engine;
    this.#toViewModel = toViewModel;
    this.#view = view;
    this.#router = new InputRouter((optionId) => {
      this.#show(this.#engine.step(optionId));
    });
  }

  start(container: HTMLElement): void {
    this.#container = container;
    this.#view.mount(container);
    this.#router.attach(container);
    this.#show(this.#engine.snapshot());
  }

  stop(): void {
    this.#router.detach();
    this.#view.dispose();
    this.#container = undefined;
  }

  #show(snapshot: GameSnapshot): void {
    const vm = this.#toViewModel(snapshot);
    const held = this.#focusInside();
    this.#view.render(vm);
    this.#router.offer(vm.options);
    if (held?.isConnected === false) this.#focusFirstOption();
  }

  /** The element of this screen that holds the focus, if any — focus elsewhere (or nowhere) is not ours. */
  #focusInside(): Element | undefined {
    const active = this.#container?.ownerDocument.activeElement;
    return active != null && this.#container?.contains(active) === true ? active : undefined;
  }

  /**
   * The focus rule of every screen: when a render removes the element that held the focus, the focus
   * goes to the first option on offer — never silently back to `<body>`, where a keyboard or a screen
   * reader would have to start over. Focus that was not inside the screen is never taken.
   */
  #focusFirstOption(): void {
    this.#container?.querySelector<HTMLElement>('button[data-option]')?.focus();
  }
}
