import { html, nothing, type TemplateResult } from 'lit-html';
import type { Dive } from '#ui/scene/Dive.ts';
import type { Sketch } from '#ui/scene/Sketch.ts';
import type { PassageLevel } from './PassageLevel.ts';
import type { PassageScreen } from './PassageScreen.ts';
import type { PictureBook } from './PictureBook.ts';

/** What a level's words are on the caption, by how far it stands from the level shown: left behind, the one above, shown, still below. */
const ROLES = ['gone', 'past', 'now', 'below'] as const;

/**
 * The way into the game or out of it, played over a screen: the dive's picture under a caption of its own, so no
 * word covers the picture. The caption is a rail of the levels' marks, lit as far as the way has gone, and the name
 * of the level shown with its kind: at each level the name above shrinks away, the one shown takes its place over
 * it, and the next comes up from below — the same motion backwards on the way out. A tap ends it at once. It owns
 * markup only; every word is its levels'. An entity — which levels play, and which one shows.
 */
export class Passage {
  readonly #dive: Dive;
  readonly #book: PictureBook;
  #playing: { readonly levels: readonly PassageLevel[]; at: number } | undefined;

  constructor(parts: { readonly dive: Dive; readonly book: PictureBook }) {
    this.#dive = parts.dive;
    this.#book = parts.book;
  }

  playing(): boolean {
    return this.#playing !== undefined;
  }

  /**
   * A tap heard on the way down: when it is on the button of `option` and no passage plays, it is taken from the
   * router and `play` runs it; any other tap is left alone. Nothing while the option is not on offer (empty).
   */
  through(event: Event, option: string, play: () => void): void {
    if (option === '' || this.#playing !== undefined) return;
    const target = event.target instanceof Element ? event.target : undefined;
    if (target?.closest<HTMLElement>('button[data-option]')?.dataset.option !== option) return;
    event.stopPropagation();
    play();
  }

  /** Down the levels, from the first to the last, then `ended`. */
  down(screen: PassageScreen, levels: readonly PassageLevel[], ended: () => void): void {
    this.#play(screen, levels, 0, ended, (host, reel, done, shown) => {
      this.#dive.play(host, reel, done, shown);
    });
  }

  /** Back up the levels, from the last to the first, then `ended`. */
  up(screen: PassageScreen, levels: readonly PassageLevel[], ended: () => void): void {
    this.#play(screen, levels, levels.length - 1, ended, (host, reel, done, shown) => {
      this.#dive.rewind(host, reel, done, shown);
    });
  }

  /** Ends it now; what it was to do at its end is still done. */
  stop(): void {
    this.#dive.skip();
  }

  /** The passage's markup, for the screen it plays over to draw last; nothing while none plays. */
  template(): TemplateResult | typeof nothing {
    const playing = this.#playing;
    if (playing === undefined) return nothing;
    return html`
      <div
        class="passage"
        data-testid="passage"
        tabindex="-1"
        @click=${() => {
          this.stop();
        }}
      >
        <div class="passage-cap">
          <ol class="passage-rail">
            ${playing.levels.map(
              (level, index) =>
                html`<li ?data-passed=${index < playing.at} ?data-here=${index === playing.at}>
                  ${level.icon}
                </li>`,
            )}
          </ol>
          <div class="passage-names">
            ${playing.levels.map(
              (level, index) => html`
                <p class="passage-step" data-role=${this.#role(index - playing.at)}>
                  <span>${level.kind}</span>
                  <b>${level.name}</b>
                </p>
              `,
            )}
          </div>
        </div>
        <div class="passage-picture" data-dive></div>
      </div>
    `;
  }

  #role(away: number): string {
    return ROLES[Math.min(ROLES.length - 1, Math.max(0, away + 2))] ?? '';
  }

  #play(
    screen: PassageScreen,
    levels: readonly PassageLevel[],
    from: number,
    ended: () => void,
    run: (
      host: HTMLElement,
      reel: readonly { readonly sketch: Sketch; readonly into: string }[],
      done: () => void,
      shown: (index: number) => void,
    ) => void,
  ): void {
    const playing = { levels, at: from };
    this.#playing = playing;
    screen.repaint();
    const done = (): void => {
      this.#playing = undefined;
      ended();
    };
    const host = screen.container.querySelector('[data-dive]');
    if (!(host instanceof HTMLElement)) {
      done();
      return;
    }
    // The passage holds the focus while it plays, so the shell's rule finds it on the screen when the next one comes.
    host.parentElement?.focus({ preventScroll: true });
    run(
      host,
      levels.map((level) => ({ sketch: level.drawing.sketchedBy(this.#book), into: level.into })),
      done,
      (index) => {
        if (index === playing.at) return;
        playing.at = index;
        screen.repaint();
      },
    );
  }
}
