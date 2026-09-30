import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { PoleVM } from '#ui/screens/PoleVM.ts';
import type { Clock } from './Clock.ts';
import { PoleLayout } from './PoleLayout.ts';
import type { PolePicture } from './PolePicture.ts';

/** How long the pole takes to unroll down to you when it opens, in milliseconds (the mock's, `transit-reframed.html:1220`). */
const REVEAL = 900;

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
 * pulse and glyphs moving; still under reduced motion. Built in `main.ts`; one pole at a time.
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
    const canvas = this.#canvases.mount(pole.host, () => {
      layout = this.#place(pole);
      if (still) this.#paint(canvas, pole.vm, layout, 0, 1, true);
    });
    canvas.decorative();
    this.#canvas = canvas;
    const middle = layout.rows()[pole.at]?.y ?? 0;
    pole.scroller.scrollTop = middle - pole.scroller.clientHeight / 2;
    if (still) {
      this.#paint(canvas, pole.vm, layout, 0, 1, true);
      return;
    }
    this.#stop = this.#clock.subscribe((time) => {
      this.#paint(
        canvas,
        pole.vm,
        layout,
        time / 1000,
        Math.min(1, Math.max(0, time - opened) / REVEAL),
        false,
      );
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

  #paint(
    canvas: PixelCanvas,
    vm: PoleVM,
    layout: PoleLayout,
    seconds: number,
    reveal: number,
    still: boolean,
  ): void {
    const size = layout.size();
    if (size.width === 0) return;
    canvas.fit(size);
    canvas.hold(size);
    const palette = canvas.palette();
    canvas.paint((context) => {
      this.#picture.paint(context, vm, layout, palette, { seconds, still, reveal });
    });
  }
}
