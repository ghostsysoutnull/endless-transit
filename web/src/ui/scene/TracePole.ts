import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { PoleVM } from '#ui/screens/PoleVM.ts';
import type { Clock } from './Clock.ts';
import { PoleLayout } from './PoleLayout.ts';
import type { PoleMoment, PolePicture } from './PolePicture.ts';

/** How long the pole takes to unroll down to you when it opens, in milliseconds (the mock's, `transit-reframed.html:1220`). */
const REVEAL = 900;
/** How long the backdrop's words take to slide from one level's vibe to the next's, in milliseconds. */
const SLIDE = 700;

/** The pole as the trace hands it over: where its canvas goes, the scroller it sits in, a button a level, the level to keep in view. */
export interface PoleHost {
  readonly host: HTMLElement;
  readonly scroller: HTMLElement;
  readonly levels: readonly HTMLElement[];
  readonly vm: PoleVM;
  readonly at: number;
}

/**
 * The pole on screen (U05): its canvas as tall as its levels need, each level's button laid over its row, the level
 * asked for scrolled into the middle, and the picture painted each frame while it shows — unrolling as it opens, its
 * pulse and glyphs moving, the backdrop following the level in focus as the pole scrolls; under reduced motion it
 * holds still and is painted again only when it scrolls. Built in `main.ts`; one pole at a time.
 */
export class TracePole {
  readonly #canvases: Canvases;
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;
  readonly #picture: PolePicture;
  #canvas: PixelCanvas | undefined;
  #stop: (() => void) | undefined;

  constructor(parts: {
    readonly canvases: Canvases;
    readonly clock: Clock;
    readonly motion: ReducedMotion;
    readonly picture: PolePicture;
  }) {
    this.#canvases = parts.canvases;
    this.#clock = parts.clock;
    this.#motion = parts.motion;
    this.#picture = parts.picture;
  }

  /** The pole shown in its host; whatever pole was shown before goes. */
  show(pole: PoleHost): void {
    this.clear();
    const opened = this.#clock.now();
    const still = this.#motion.reduced();
    let layout = this.#place(pole);
    let focus = { level: -1, from: -1, since: opened };
    /** The moment at this time: the window the scroller shows, and the level in focus through it. */
    const moment = (time: number): PoleMoment => {
      const window = { top: pole.scroller.scrollTop, height: pole.scroller.clientHeight };
      const level = layout.focus(window);
      if (focus.level < 0) focus = { level, from: level, since: time };
      else if (level !== focus.level) focus = { level, from: focus.level, since: time };
      return {
        seconds: still ? 0 : time / 1000,
        still,
        reveal: still ? 1 : Math.min(1, Math.max(0, time - opened) / REVEAL),
        window,
        focus: {
          level: focus.level,
          from: focus.from,
          progress: still ? 1 : Math.min(1, (time - focus.since) / SLIDE),
        },
      };
    };
    const canvas = this.#canvases.mount(pole.host, () => {
      layout = this.#place(pole);
      if (still) this.#paint(canvas, pole.vm, layout, moment(this.#clock.now()));
    });
    canvas.decorative();
    this.#canvas = canvas;
    const middle = layout.rows()[pole.at]?.y ?? 0;
    pole.scroller.scrollTop = middle - pole.scroller.clientHeight / 2;
    if (still) {
      const scrolled = () => {
        this.#paint(canvas, pole.vm, layout, moment(this.#clock.now()));
      };
      scrolled();
      pole.scroller.addEventListener('scroll', scrolled, { passive: true });
      this.#stop = () => {
        pole.scroller.removeEventListener('scroll', scrolled);
      };
      return;
    }
    this.#stop = this.#clock.subscribe((time) => {
      this.#paint(canvas, pole.vm, layout, moment(time));
    });
  }

  clear(): void {
    this.#stop?.();
    this.#stop = undefined;
    this.#canvas?.remove();
    this.#canvas = undefined;
  }

  /** The layout at the host's width and the scroller's height, each level's button laid over its row. */
  #place(pole: PoleHost): PoleLayout {
    const layout = PoleLayout.of(pole.vm.levels, {
      width: pole.host.clientWidth,
      height: pole.scroller.clientHeight,
    });
    pole.host.style.height = `${String(layout.size().height)}px`;
    layout.rows().forEach((row, index) => {
      const button = pole.levels[index];
      if (button === undefined) return;
      button.style.top = `${String(row.box.y)}px`;
      button.style.height = `${String(row.box.height)}px`;
    });
    return layout;
  }

  #paint(canvas: PixelCanvas, vm: PoleVM, layout: PoleLayout, moment: PoleMoment): void {
    const size = layout.size();
    if (size.width === 0) return;
    canvas.fit(size);
    canvas.hold(size);
    const palette = canvas.palette();
    canvas.paint((context) => {
      this.#picture.paint(context, vm, layout, palette, moment);
    });
  }
}
