import type { GameEngine } from '#engine/rules/GameEngine.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { InputRouter } from './input/InputRouter.ts';
import type { OptionVM } from './OptionVM.ts';
import type { Screen } from './Screen.ts';
import type { ScreenStage } from './ScreenStage.ts';

/**
 * The loop of the page: input → `engine.step` → the screen that accepts the snapshot → its view. The
 * engine pushes nothing and the views pull nothing; this class is the only one that knows all three. It
 * owns four things every screen gets without writing them: where the focus goes after a render, that a
 * new scene starts from the top of the page, that a panel the player just asked for (`[data-spot]`) is
 * brought into view and given the focus, and the one live region that says what just happened — one
 * node, mounted once, whose text changes; a region born with the screen would not be announced.
 */
export class Shell {
  readonly #engine: GameEngine;
  readonly #stages: readonly ScreenStage<Screen>[];
  readonly #router: InputRouter;
  #container: HTMLElement | undefined;
  #announcer: HTMLElement | undefined;
  #onStage: ScreenStage<Screen> | undefined;
  #scene: string | undefined;
  /** The scene the player just left and the option that held the focus there — the way back gets it again. */
  #left: { readonly scene: string; readonly optionId: string } | undefined;
  /** The options of the screen on show, and the one the player just ran (nothing at the first paint). */
  #offered: readonly OptionVM[] = [];
  #pressed: OptionVM | undefined;

  /** The first stage that accepts a snapshot shows it — a new screen is one more entry in this list. */
  constructor(engine: GameEngine, stages: readonly ScreenStage<Screen>[]) {
    this.#engine = engine;
    this.#stages = stages;
    this.#router = new InputRouter((optionId) => {
      this.#pressed = this.#offered.find((option) => option.id === optionId);
      this.#show(this.#engine.step(optionId));
    });
  }

  start(container: HTMLElement): void {
    this.#container = container;
    this.#announcer = this.#mountAnnouncer(container);
    this.#router.attach(container);
    this.#show(this.#engine.snapshot());
  }

  stop(): void {
    this.#router.detach();
    this.#onStage?.dispose();
    this.#onStage = undefined;
    this.#announcer?.remove();
    this.#announcer = undefined;
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
    this.#offered = screen.options;
    this.#announce(screen.status);
    if (held?.isConnected === false) this.#focusAnOption(screen.scene, this.#pressed);
    const spot = container.querySelector<HTMLElement>('[data-spot]');
    if (spot !== null && screen.scene === this.#scene) this.#spotlight(spot);
    if (screen.scene !== this.#scene) {
      this.#startFromTheTop();
      const optionId = held instanceof HTMLElement ? held.dataset.option : undefined;
      this.#left =
        this.#scene === undefined || optionId === undefined ? undefined : { scene: this.#scene, optionId };
    }
    this.#scene = screen.scene;
  }

  /** Before any screen, so the screens' nodes come after it and a screen's own render never touches it. */
  #mountAnnouncer(container: HTMLElement): HTMLElement {
    const announcer = container.ownerDocument.createElement('p');
    announcer.className = 'vh';
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    container.prepend(announcer);
    return announcer;
  }

  /** The same words twice are one event, not two: the text changes only when the message does. */
  #announce(status: string): void {
    if (this.#announcer !== undefined && this.#announcer.textContent !== status) {
      this.#announcer.textContent = status;
    }
  }

  /** The element of this screen that holds the focus, if any — focus elsewhere (or nowhere) is not ours. */
  #focusInside(): Element | undefined {
    const active = this.#container?.ownerDocument.activeElement;
    return active != null && this.#container?.contains(active) === true ? active : undefined;
  }

  /**
   * The focus rule of every screen: an element that is still there keeps the focus it had. When a render
   * removes it, the focus goes somewhere on the screen — never silently back to `<body>`, where a keyboard
   * or a screen reader would have to start over: back in the scene just left, to the option that held it
   * there (title and back is a round trip, not a step deeper); when the option just run has vanished and
   * the one that undoes it is on offer, the ride has reached its end (the Peak, the last room) and the
   * focus rests on the screen's resting place (`[data-rest]`) — never on the way back, where the next Enter
   * would undo the ride; anywhere else, to the first option that is not that way back. Which option undoes
   * which is data the option carries; the shell matches no label. Only a button that is shown can take the
   * focus (a folded dock hides some, I09): back in the scene just left with that button folded away, the
   * focus rests on the screen rather than on a button that would go a step deeper. Focus that was not
   * inside the screen is never taken. The page is not scrolled to it: that is the next rule's business.
   */
  #focusAnOption(scene: string, pressed: OptionVM | undefined): void {
    const container = this.#container;
    const options = [...(container?.querySelectorAll<HTMLElement>('button[data-option]') ?? [])].filter(
      (each) => each.offsetParent !== null,
    );
    const rest = container?.querySelector<HTMLElement>('[data-rest]');
    const left = this.#left;
    if (left?.scene === scene) {
      const back = options.find((each) => each.dataset.option === left.optionId);
      if (back !== undefined) {
        back.focus({ preventScroll: true });
        return;
      }
      if (rest != null) {
        rest.focus({ preventScroll: true });
        return;
      }
    }
    const undo = pressed?.opposite ?? '';
    if (undo !== '' && this.#offered.some((option) => option.id === undo) && rest != null) {
      rest.focus({ preventScroll: true });
      return;
    }
    options.find((each) => each.dataset.option !== undo)?.focus({ preventScroll: true });
  }

  /**
   * The spotlight rule (I09): a panel the player just asked for — a scan, a map, a trace — is brought into
   * view (on a phone it sits below the list, under the dock) and takes the focus, so a reader lands on it
   * and a keyboard reads it next. Smooth unless motion is reduced; `scroll-padding` keeps it clear of the
   * dock. Only while the scene stays: a new scene starts from the top instead.
   */
  #spotlight(panel: HTMLElement): void {
    const view = panel.ownerDocument.defaultView;
    const reduced = view?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? true;
    panel.focus({ preventScroll: true });
    panel.scrollIntoView({ block: 'nearest', behavior: reduced ? 'instant' : 'smooth' });
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
