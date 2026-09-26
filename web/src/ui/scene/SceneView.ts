import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import { stylePalette } from '#ui/canvas/StylePalette.ts';
import type { View } from '#ui/View.ts';
import { CoherenceFx, FX_FRAMES } from './CoherenceFx.ts';
import type { FxPlan } from './FxPlan.ts';
import type { MotionClock } from './MotionClock.ts';
import { PixelBudget } from './PixelBudget.ts';
import { LIGHT, PICK } from './SceneEvents.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import type { SceneVM } from './SceneVM.ts';
import { Tween } from './Tween.ts';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
/** Going in, the picture grows this many times around the child before the next place shows. */
const ZOOM = 6;
/** How long a zoom takes, in milliseconds. */
const ZOOM_TIME = 450;
/** The tear steps this many frames a second (the mock's `postFx`). */
const FX_RATE = 12;
/** A still is painted at this moment of the clock, and on the tear's first frame. */
const STILL = 0;

/** A zoom under way: its scale over time, the point it centres on, and the child it enters when it ends (empty going out). */
interface Zoom {
  readonly scale: Tween;
  readonly anchor: { readonly x: number; readonly y: number };
  readonly pick: string;
}

/**
 * The scene host (U01b): a canvas the size of its host element, drawn by a registered picture on the page's
 * one clock, with the coherence tear over it. A tap on a child zooms into it and only then asks for it to be
 * entered (a bubbling `pick` event carrying its id); a child pointed at is announced (`light`) so the list
 * lights its twin, and one lit from the list is drawn lit. Any new view-model or a dispose cancels a zoom in
 * flight and drops its pick: ids are positional, a late pick could ride another place's option. Taps are
 * ignored while a zoom runs. Under `prefers-reduced-motion` the picture is a still, a tap enters at once and
 * nothing zooms; the tear is drawn but does not move. The canvas is for the eye: the host carries the words.
 */
export class SceneView implements View<SceneVM> {
  readonly #picture: ScenePicture<SceneVM>;
  readonly #clock: MotionClock;
  readonly #fx = new CoherenceFx();
  readonly #budget = new PixelBudget();
  #host: HTMLElement | undefined;
  #canvas: HTMLCanvasElement | undefined;
  #observer: ResizeObserver | undefined;
  #listeners: AbortController | undefined;
  #vm: SceneVM | undefined;
  #size: PictureSize = { width: 0, height: 0 };
  #ratio = 1;
  #hits: readonly SceneHit[] = [];
  #lit = '';
  #zoom: Zoom | undefined;
  /** Stops listening to the clock; set while the picture moves. */
  #leave: (() => void) | undefined;

  constructor(picture: ScenePicture<SceneVM>, clock: MotionClock) {
    this.#picture = picture;
    this.#clock = clock;
  }

  mount(host: HTMLElement): void {
    const canvas = host.ownerDocument.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    host.replaceChildren(canvas);
    this.#host = host;
    this.#canvas = canvas;
    const listeners = new AbortController();
    const signal = listeners.signal;
    this.#listeners = listeners;
    canvas.addEventListener(
      'pointermove',
      (event) => {
        this.#point(event);
      },
      { signal },
    );
    canvas.addEventListener(
      'pointerdown',
      (event) => {
        this.#point(event);
      },
      { signal },
    );
    canvas.addEventListener(
      'pointerleave',
      () => {
        this.#pointAt('');
      },
      { signal },
    );
    canvas.addEventListener(
      'click',
      (event) => {
        this.#tap(event);
      },
      { signal },
    );
    this.#observer = new ResizeObserver(() => {
      this.#fit();
      if (this.#leave === undefined) this.#paint(STILL);
    });
    this.#observer.observe(host);
  }

  /** A new view-model is a new frame of the game: a zoom in flight stops and its pick is dropped. */
  render(vm: SceneVM): void {
    if (vm === this.#vm) return;
    this.#zoom = undefined;
    this.#vm = vm;
    this.#fit();
    this.#run();
  }

  /** Back out of the child with this id: the picture zooms out of it (not under reduced motion). */
  arrive(id: string): void {
    const hit = this.#hits.find((each) => each.id === id);
    if (hit === undefined || this.#reducedMotion()) return;
    this.#zoom = { scale: new Tween(ZOOM, 1, this.#clock.now(), ZOOM_TIME), anchor: hit.anchor, pick: '' };
    this.#run();
  }

  /** The child lit from the list (its id), or none (empty). */
  light(id: string): void {
    if (id === this.#lit) return;
    this.#lit = id;
    if (this.#leave === undefined) this.#paint(STILL);
  }

  dispose(): void {
    this.#zoom = undefined;
    this.#stop();
    this.#observer?.disconnect();
    this.#observer = undefined;
    this.#listeners?.abort();
    this.#listeners = undefined;
    this.#canvas?.remove();
    this.#canvas = undefined;
    this.#host = undefined;
    this.#vm = undefined;
  }

  #reducedMotion(): boolean {
    return this.#host?.ownerDocument.defaultView?.matchMedia(REDUCED_MOTION).matches ?? true;
  }

  /** Moving: listen to the clock. Still: one frame now, and nothing more until something changes. */
  #run(): void {
    if (this.#reducedMotion()) {
      this.#stop();
      this.#paint(STILL);
      return;
    }
    this.#leave ??= this.#clock.subscribe((time) => {
      this.#frame(time);
    });
  }

  #stop(): void {
    this.#leave?.();
    this.#leave = undefined;
  }

  /** One frame of the clock; a zoom that has ended enters its child — the last thing the frame does. */
  #frame(time: number): void {
    this.#paint(time);
    const zoom = this.#zoom;
    if (!zoom?.scale.done(time)) return;
    this.#zoom = undefined;
    if (zoom.pick !== '') this.#announce(PICK, zoom.pick);
  }

  /** The canvas takes its host's size, in device pixels within the budget; the picture lays out its children there. */
  #fit(): void {
    const host = this.#host;
    const canvas = this.#canvas;
    const vm = this.#vm;
    if (host === undefined || canvas === undefined || vm === undefined) return;
    const size = { width: host.clientWidth, height: host.clientHeight };
    const ratio = this.#budget.ratio(
      host.ownerDocument.defaultView?.devicePixelRatio ?? 1,
      size.width,
      size.height,
    );
    const width = Math.round(size.width * ratio);
    const height = Math.round(size.height * ratio);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    this.#size = size;
    this.#ratio = ratio;
    this.#hits = this.#picture.layout(vm, size);
  }

  #paint(time: number): void {
    const canvas = this.#canvas;
    const vm = this.#vm;
    const { width, height } = this.#size;
    if (canvas === undefined || vm === undefined || width === 0 || height === 0) return;
    const context = canvas.getContext('2d');
    if (context === null) return;
    const palette = stylePalette(canvas);
    const ratio = this.#ratio;
    context.globalAlpha = 1;
    context.setLineDash([]);
    const zoom = this.#zoom;
    // How far the zoom has gone, 0 (the whole picture) to 1 (inside the child, faded to the ground).
    let depth = 0;
    if (zoom === undefined) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    } else {
      const scale = zoom.scale.at(time);
      depth = (scale - 1) / (ZOOM - 1);
      // The child's anchor drifts to the middle as the picture grows around it.
      const x = zoom.anchor.x + (width / 2 - zoom.anchor.x) * depth;
      const y = zoom.anchor.y + (height / 2 - zoom.anchor.y) * depth;
      context.setTransform(
        ratio * scale,
        0,
        0,
        ratio * scale,
        ratio * (x - zoom.anchor.x * scale),
        ratio * (y - zoom.anchor.y * scale),
      );
    }
    this.#picture.paint(context, vm, this.#size, palette, time, this.#lit);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (depth > 0) {
      context.globalAlpha = depth;
      context.fillStyle = palette('ground');
      context.fillRect(0, 0, width, height);
      context.globalAlpha = 1;
    }
    // A still tears on the cycle's first frame and holds it.
    const k = time === STILL ? 0 : Math.floor((time / 1000) * FX_RATE) % FX_FRAMES;
    this.#tear(context, canvas, this.#fx.plan(vm.noise, vm.decay, k), palette);
  }

  /** The tear over the finished frame: bands of the canvas copied sideways, grain, the red cast, a dark flash. */
  #tear(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, plan: FxPlan, palette: Palette): void {
    const { width, height } = this.#size;
    const ratio = this.#ratio;
    for (const tear of plan.tears) {
      const y = tear.y * height;
      context.drawImage(
        canvas,
        0,
        y * ratio,
        canvas.width,
        tear.height * ratio,
        tear.shift,
        y,
        width,
        tear.height,
      );
    }
    if (plan.grain.length > 0) {
      context.globalAlpha = plan.tint * 5;
      const text = palette('text');
      const red = palette('rd');
      for (const speck of plan.grain) {
        context.fillStyle = speck.red ? red : text;
        context.fillRect(speck.x * width, speck.y * height, 1, 1);
      }
    }
    if (plan.tint > 0) {
      context.globalAlpha = plan.tint;
      context.fillStyle = palette('rd');
      context.fillRect(0, 0, width, height);
    }
    if (plan.dark) {
      context.globalAlpha = 0.5;
      context.fillStyle = palette('ground');
      context.fillRect(0, 0, width, height);
    }
    context.globalAlpha = 1;
  }

  #hitAt(event: MouseEvent): SceneHit | undefined {
    const box = this.#canvas?.getBoundingClientRect();
    if (box === undefined) return undefined;
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    return this.#hits.find(
      (hit) => x >= hit.x && x <= hit.x + hit.width && y >= hit.y && y <= hit.y + hit.height,
    );
  }

  #point(event: PointerEvent): void {
    if (this.#zoom !== undefined) return;
    this.#pointAt(this.#hitAt(event)?.id ?? '');
  }

  /** Pointed at in the picture: drawn lit here, and announced so the list lights its twin. */
  #pointAt(id: string): void {
    if (id === this.#lit) return;
    this.light(id);
    this.#announce(LIGHT, id);
  }

  /** A tap on an open child: zoom into it, then enter; at once under reduced motion. Ignored while a zoom runs. */
  #tap(event: MouseEvent): void {
    if (this.#zoom !== undefined) return;
    const hit = this.#hitAt(event);
    const child = this.#vm?.children.find((each) => each.id === hit?.id);
    if (hit === undefined || child === undefined || child.sealed) return;
    if (this.#reducedMotion()) {
      this.#announce(PICK, hit.id);
      return;
    }
    this.#zoom = {
      scale: new Tween(1, ZOOM, this.#clock.now(), ZOOM_TIME),
      anchor: hit.anchor,
      pick: hit.id,
    };
    this.#run();
  }

  #announce(type: string, id: string): void {
    this.#host?.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: { id } }));
  }
}
