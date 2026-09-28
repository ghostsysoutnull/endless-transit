import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { Clock } from '#ui/scene/Clock.ts';
import type { View } from '#ui/View.ts';
import type { Picture } from './Picture.ts';
import type { Canvases } from './Canvases.ts';
import type { PixelCanvas } from './PixelCanvas.ts';

/** One cycle of the pulse, in milliseconds. */
const CYCLE = 1800;
/** The still frame's phase when nothing may move. */
const STILL = 0.5;

/**
 * The one canvas behind the `View` seam: mounts a `<canvas>` into its container, sizes it to the
 * container's width (device-pixel aware, so glyphs are crisp) and hands every frame to its picture. Colours
 * are read from the stylesheet's tokens where the canvas sits, so a frame below the bedrock is inked in
 * the void's colour without the picture knowing. The pulse runs on the page's one clock (U01b), and the
 * canvas keeps the pixel budget; with `prefers-reduced-motion` the picture is painted once, still. The canvas is decoration for the eye — the
 * text alternative lives beside it in the screen's markup.
 */
export class CanvasView<VM> implements View<VM> {
  readonly #picture: Picture<VM>;
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;
  readonly #canvases: Canvases;
  #mounted: PixelCanvas | undefined;
  #vm: VM | undefined;
  /** Stops listening to the clock; set while the pulse runs. */
  #leave: (() => void) | undefined;

  constructor(picture: Picture<VM>, clock: Clock, motion: ReducedMotion, canvases: Canvases) {
    this.#picture = picture;
    this.#clock = clock;
    this.#motion = motion;
    this.#canvases = canvases;
  }

  mount(container: HTMLElement): void {
    this.#mounted = this.#canvases.mount(container, () => {
      this.#paint(STILL);
    });
    this.#mounted.decorative();
  }

  render(vm: VM): void {
    this.#vm = vm;
    this.#mounted?.frameChanged();
    if (this.#motion.reduced()) {
      this.#stop();
      this.#paint(STILL);
      return;
    }
    this.#leave ??= this.#clock.subscribe((time) => {
      this.#paint((time % CYCLE) / CYCLE);
    });
  }

  dispose(): void {
    this.#stop();
    this.#mounted?.remove();
    this.#mounted = undefined;
    this.#vm = undefined;
  }

  #stop(): void {
    this.#leave?.();
    this.#leave = undefined;
  }

  #paint(phase: number): void {
    const canvas = this.#mounted;
    const vm = this.#vm;
    if (canvas === undefined || vm === undefined) return;
    const width = canvas.hostSize().width;
    if (width === 0) return;
    const size = { width, height: this.#picture.height(vm, width) };
    canvas.fit(size);
    canvas.hold(size);
    const context = canvas.context();
    if (context === null) return;
    const dpr = canvas.ratio();
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.setLineDash([]);
    this.#picture.paint(context, vm, size, canvas.palette(), phase);
  }
}
