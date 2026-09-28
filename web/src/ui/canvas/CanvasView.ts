import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { MotionClock } from '#ui/scene/MotionClock.ts';
import { PixelBudget } from '#ui/scene/PixelBudget.ts';
import type { View } from '#ui/View.ts';
import type { Picture } from './Picture.ts';
import { ElementStyle } from './ElementStyle.ts';
import { StylePalette } from './StylePalette.ts';

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
  readonly #clock: MotionClock;
  readonly #motion: ReducedMotion;
  readonly #budget = new PixelBudget();
  #canvas: HTMLCanvasElement | undefined;
  /** The canvas's colours, read from the stylesheet where it sits; made at mount. */
  #colours: StylePalette | undefined;
  #observer: ResizeObserver | undefined;
  #vm: VM | undefined;
  /** Stops listening to the clock; set while the pulse runs. */
  #leave: (() => void) | undefined;

  constructor(picture: Picture<VM>, clock: MotionClock, motion: ReducedMotion) {
    this.#picture = picture;
    this.#clock = clock;
    this.#motion = motion;
  }

  mount(container: HTMLElement): void {
    const canvas = container.ownerDocument.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    container.replaceChildren(canvas);
    this.#canvas = canvas;
    this.#colours = new StylePalette(new ElementStyle(canvas));
    this.#observer = new ResizeObserver(() => {
      this.#paint(STILL);
    });
    this.#observer.observe(container);
  }

  render(vm: VM): void {
    this.#vm = vm;
    this.#colours?.frameChanged();
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
    this.#observer?.disconnect();
    this.#observer = undefined;
    this.#canvas?.remove();
    this.#canvas = undefined;
    this.#colours = undefined;
    this.#vm = undefined;
  }

  #stop(): void {
    this.#leave?.();
    this.#leave = undefined;
  }

  #paint(phase: number): void {
    const canvas = this.#canvas;
    const vm = this.#vm;
    const host = canvas?.parentElement;
    if (canvas === undefined || vm === undefined || host == null) return;
    const width = host.clientWidth;
    if (width === 0) return;
    const height = this.#picture.height(vm, width);
    const view = canvas.ownerDocument.defaultView;
    const dpr = this.#budget.ratio(view?.devicePixelRatio ?? 1, width, height);
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      canvas.style.width = `${String(width)}px`;
      canvas.style.height = `${String(height)}px`;
    }
    const context = canvas.getContext('2d');
    if (context === null) return;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.setLineDash([]);
    const palette = this.#colours?.palette;
    if (palette === undefined) return;
    this.#picture.paint(context, vm, { width, height }, palette, phase);
  }
}
