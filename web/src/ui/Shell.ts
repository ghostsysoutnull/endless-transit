import type { GameEngine } from '#engine/rules/GameEngine.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { InputRouter } from './input/InputRouter.ts';
import type { Screen } from './Screen.ts';
import type { ScreenStage } from './ScreenStage.ts';

/**
 * The loop of the page: input → `engine.step` → the screen that accepts the snapshot → its view. The
 * engine pushes nothing and the views pull nothing; this class is the only one that knows all three. It
 * owns two rules every screen gets without writing them: where the focus goes after a render, and that a
 * new scene starts from the top of the page.
 */
export class Shell {
  readonly #engine: GameEngine;
  readonly #stages: readonly ScreenStage<Screen>[];
  readonly #router: InputRouter;
  #container: HTMLElement | undefined;
  #onStage: ScreenStage<Screen> | undefined;
  #scene: string | undefined;

  /** The first stage that accepts a snapshot shows it — a new screen is one more entry in this list. */
  constructor(engine: GameEngine, stages: readonly ScreenStage<Screen>[]) {
    this.#engine = engine;
    this.#stages = stages;
    this.#router = new InputRouter((optionId) => {
      this.#show(this.#engine.step(optionId));
    });
  }

  start(container: HTMLElement): void {
    this.#container = container;
    this.#router.attach(container);
    this.#show(this.#engine.snapshot());
  }

  stop(): void {
    this.#router.detach();
    this.#onStage?.dispose();
    this.#onStage = undefined;
    this.#container = undefined;
  }

  #show(snapshot: GameSnapshot): void {
    const container = this.#container;
    const stage = this.#stages.find((each) => each.accepts(snapshot));
    if (container === undefined || stage === undefined) throw new Error('no screen accepts this snapshot');
    const held = this.#focusInside();
    if (stage !== this.#onStage) {
      this.#onStage?.dispose();
      stage.mount(container);
      this.#onStage = stage;
    }
    const screen = stage.show(snapshot);
    this.#router.offer(screen.options);
    if (held?.isConnected === false) this.#focusFirstOption();
    if (screen.scene !== this.#scene) this.#startFromTheTop();
    this.#scene = screen.scene;
  }

  /** The element of this screen that holds the focus, if any — focus elsewhere (or nowhere) is not ours. */
  #focusInside(): Element | undefined {
    const active = this.#container?.ownerDocument.activeElement;
    return active != null && this.#container?.contains(active) === true ? active : undefined;
  }

  /**
   * The focus rule of every screen: when a render removes the element that held the focus, the focus
   * goes to the first option on offer — never silently back to `<body>`, where a keyboard or a screen
   * reader would have to start over. Focus that was not inside the screen is never taken. The page is not
   * scrolled to it: where the page stands is the next rule's business.
   */
  #focusFirstOption(): void {
    this.#container?.querySelector<HTMLElement>('button[data-option]')?.focus({ preventScroll: true });
  }

  /**
   * The scroll rule of every screen: a new scene (another place, another screen) is read from its first
   * line — a thumb that tapped row 12 of a long list must not land in the middle of the next place.
   * Instant on purpose: a smooth scroll would be motion nobody asked for.
   */
  #startFromTheTop(): void {
    this.#container?.ownerDocument.defaultView?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
}
