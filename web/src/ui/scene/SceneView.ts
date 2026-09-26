import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import { stylePalette } from '#ui/canvas/StylePalette.ts';
import type { View } from '#ui/View.ts';
import { CoherenceFx, FX_FRAMES } from './CoherenceFx.ts';
import { Fling } from './Fling.ts';
import type { FxPlan } from './FxPlan.ts';
import type { MotionClock } from './MotionClock.ts';
import { PixelBudget } from './PixelBudget.ts';
import type { SceneCamera } from './SceneCamera.ts';
import { LIGHT, PICK } from './SceneEvents.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import { SceneTrip } from './SceneTrip.ts';
import type { SceneVM } from './SceneVM.ts';
import { easeOut, Tween } from './Tween.ts';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
/** Going in, the picture grows this many times around the child before the next place shows. */
const ZOOM = 6;
/** How long a zoom takes, in milliseconds. */
const ZOOM_TIME = 450;
/** The tear steps this many frames a second (the mock's `postFx`). */
const FX_RATE = 12;
/** A still is painted at this moment of the clock, and on the tear's first frame. */
const STILL = 0;
/** A finger that moves less than this is a tap, not a drag (the mock's 6 px). */
const SLOP = 6;
/** A tap on the slider's track glides the view there in this long. */
const GLIDE = 320;

/** A finger on the picture or the slider: where it went down, the view then, and how fast it moves it. */
interface Gesture {
  readonly pointer: number;
  readonly start: number;
  readonly view: number;
  readonly fling: Fling;
  readonly slider: boolean;
  moved: boolean;
}

/**
 * The scene host (U01b, U02): a canvas the size of its host element, drawn by a registered picture on the page's
 * one clock, with the coherence tear over it, and — for a picture with a camera — the view it stands at (the
 * tower's car, the corridor's walk). A drag moves the view one to one and coasts when let go; a slider over the
 * picture (a real `role=slider` beside the image, drawn by the picture) moves it too; a tap on a child, or a pick
 * from the list (`enter`), rides the view to the child's stop, zooms in when the picture zooms, and only then asks
 * for the child to be entered (a bubbling `pick` carrying its id); a child pointed at — or the one the view comes
 * to while dragged — is announced (`light`) so the list lights its twin. Any new view-model or a dispose drops a
 * ride, zoom or coast in flight and its pick (ids are positional: a late pick could ride another place's option);
 * a new view-model of the same picture keeps the view on the same place and rides from the old one to the new rest
 * on another (floor to floor). Taps are ignored while a trip runs. Under `prefers-reduced-motion` the picture is a
 * still, the view jumps, a tap enters at once and nothing zooms; the tear is drawn but does not move. The canvas is
 * the image a reader hears named; the slider is its own control beside it.
 */
export class SceneView implements View<SceneVM> {
  readonly #picture: ScenePicture<SceneVM>;
  readonly #clock: MotionClock;
  readonly #fx = new CoherenceFx();
  readonly #budget = new PixelBudget();
  #host: HTMLElement | undefined;
  #canvas: HTMLCanvasElement | undefined;
  #slider: HTMLElement | undefined;
  #observer: ResizeObserver | undefined;
  #listeners: AbortController | undefined;
  #vm: SceneVM | undefined;
  #size: PictureSize = { width: 0, height: 0 };
  #ratio = 1;
  #hits: readonly SceneHit[] = [];
  #lit = '';
  #camera: SceneCamera | null = null;
  #view = 0;
  /** A view on its way without a pick: a coast, a glide, a ride between floors. */
  #motion: Tween | undefined;
  /** A going-in: ride, zoom, pick. */
  #trip: SceneTrip | undefined;
  #tripAnchor: { readonly x: number; readonly y: number } | undefined;
  /** A zoom back out of the child just left, and the point it centres on. */
  #zoomOut:
    { readonly scale: Tween; readonly anchor: { readonly x: number; readonly y: number } } | undefined;
  #gesture: Gesture | undefined;
  /** The click that ends a drag is not a tap. */
  #dragged = false;
  /** Stops listening to the clock; set while the picture moves. */
  #leave: (() => void) | undefined;

  constructor(picture: ScenePicture<SceneVM>, clock: MotionClock) {
    this.#picture = picture;
    this.#clock = clock;
  }

  mount(host: HTMLElement): void {
    const document = host.ownerDocument;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    const slider = document.createElement('div');
    slider.className = 'slider';
    slider.setAttribute('role', 'slider');
    slider.tabIndex = 0;
    slider.hidden = true;
    host.replaceChildren(canvas, slider);
    this.#host = host;
    this.#canvas = canvas;
    this.#slider = slider;
    const listeners = new AbortController();
    const signal = listeners.signal;
    this.#listeners = listeners;
    canvas.addEventListener(
      'pointerdown',
      (event) => {
        this.#down(event, false);
      },
      { signal },
    );
    canvas.addEventListener(
      'pointermove',
      (event) => {
        this.#move(event);
      },
      { signal },
    );
    canvas.addEventListener(
      'pointerup',
      (event) => {
        this.#up(event);
      },
      { signal },
    );
    canvas.addEventListener(
      'pointercancel',
      (event) => {
        this.#up(event);
      },
      { signal },
    );
    canvas.addEventListener(
      'pointerleave',
      () => {
        if (this.#gesture === undefined) this.#pointAt('');
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
    slider.addEventListener(
      'pointerdown',
      (event) => {
        this.#down(event, true);
      },
      { signal },
    );
    slider.addEventListener(
      'pointermove',
      (event) => {
        this.#move(event);
      },
      { signal },
    );
    slider.addEventListener(
      'pointerup',
      (event) => {
        this.#up(event);
      },
      { signal },
    );
    slider.addEventListener(
      'pointercancel',
      (event) => {
        this.#up(event);
      },
      { signal },
    );
    slider.addEventListener(
      'keydown',
      (event) => {
        this.#key(event);
      },
      { signal },
    );
    this.#observer = new ResizeObserver(() => {
      this.#fit();
      if (this.#leave === undefined) this.#paint(STILL);
    });
    this.#observer.observe(host);
  }

  /** A new view-model is a new frame of the game: whatever moves stops and a pick in flight is dropped. */
  render(vm: SceneVM): void {
    if (vm === this.#vm) return;
    const before = this.#vm;
    const hadCamera = this.#camera !== null;
    this.#trip = undefined;
    this.#tripAnchor = undefined;
    this.#zoomOut = undefined;
    this.#motion = undefined;
    this.#gesture = undefined;
    this.#vm = vm;
    this.#fit();
    const camera = this.#camera;
    if (camera === null) {
      this.#view = 0;
    } else if (before?.address === vm.address && hadCamera) {
      this.#view = this.#clamp(this.#view);
    } else if (before !== undefined && hadCamera && !this.#reducedMotion()) {
      // Another place in the same picture (floor to floor): ride from where the view stood to the new rest.
      const distance = Math.abs(camera.rest - this.#view);
      if (distance > 0.01) {
        this.#motion = new Tween(this.#view, camera.rest, this.#clock.now(), this.#pace(camera, distance));
      } else {
        this.#view = camera.rest;
      }
    } else {
      this.#view = camera.rest;
    }
    this.#canvas?.setAttribute('aria-label', vm.label);
    if (this.#canvas !== undefined) {
      this.#canvas.style.touchAction = camera !== null && camera.drag !== 0 ? 'none' : 'manipulation';
    }
    this.#layout();
    this.#run();
  }

  /** Back out of the child with this id: the view stands at its stop, and the picture zooms out of it when it zooms. */
  arrive(id: string): void {
    const camera = this.#camera;
    const stop = camera?.stops.find((each) => each.id === id);
    if (stop !== undefined) {
      this.#motion = undefined;
      this.#view = this.#clamp(stop.at);
      this.#layout();
    }
    const hit = this.#hits.find((each) => each.id === id);
    if (hit === undefined || this.#reducedMotion() || camera?.zoom === false) {
      if (this.#leave === undefined) this.#paint(STILL);
      return;
    }
    this.#zoomOut = { scale: new Tween(ZOOM, 1, this.#clock.now(), ZOOM_TIME), anchor: hit.anchor };
    this.#run();
  }

  /**
   * A child picked from the list (U02, Decision 8: a door picked from the list is walked to, then opened): when
   * the picture has a stop for it, the view rides there first and the pick follows — true, the scene took it;
   * false when the picture has no camera (the street's list enters at once) or no such child.
   */
  enter(id: string): boolean {
    const camera = this.#camera;
    const child = this.#vm?.children.find((each) => each.id === id);
    if (camera === null || child === undefined || child.sealed) return false;
    if (camera.stops.every((stop) => stop.id !== id)) return false;
    if (this.#trip === undefined) this.#go(id);
    return true;
  }

  /** The child lit from the list (its id), or none (empty). */
  light(id: string): void {
    if (id === this.#lit) return;
    this.#lit = id;
    if (this.#leave === undefined) this.#paint(STILL);
  }

  dispose(): void {
    this.#trip = undefined;
    this.#zoomOut = undefined;
    this.#motion = undefined;
    this.#gesture = undefined;
    this.#stop();
    this.#observer?.disconnect();
    this.#observer = undefined;
    this.#listeners?.abort();
    this.#listeners = undefined;
    this.#canvas?.remove();
    this.#slider?.remove();
    this.#canvas = undefined;
    this.#slider = undefined;
    this.#host = undefined;
    this.#vm = undefined;
    this.#camera = null;
  }

  #reducedMotion(): boolean {
    return this.#host?.ownerDocument.defaultView?.matchMedia(REDUCED_MOTION).matches ?? true;
  }

  /** Moving: listen to the clock. Still: one frame now, and nothing more until something changes. */
  #run(): void {
    if (this.#reducedMotion()) {
      this.#stop();
      this.#motion = undefined;
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

  /** One frame of the clock: the view where its motion puts it, the picture; a trip that has ended enters its child — the last thing the frame does. */
  #frame(time: number): void {
    const trip = this.#trip;
    const before = this.#view;
    if (trip !== undefined) {
      this.#view = trip.view(time);
    } else if (this.#motion !== undefined) {
      this.#view = this.#motion.at(time);
      if (this.#motion.done(time)) this.#motion = undefined;
    }
    if (this.#view !== before) this.#layout();
    this.#paint(time);
    if (this.#zoomOut?.scale.done(time) === true) this.#zoomOut = undefined;
    if (!trip?.over(time)) return;
    this.#trip = undefined;
    this.#tripAnchor = undefined;
    this.#announce(PICK, trip.pick());
  }

  /** The canvas takes its host's size, in device pixels within the budget; the picture says how its view moves there. */
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
    this.#camera = this.#picture.camera(vm, size);
    this.#view = this.#clamp(this.#view);
    this.#place();
    this.#layout();
  }

  /** The children where the view puts them, and the slider's value where it stands. */
  #layout(): void {
    const vm = this.#vm;
    if (vm === undefined) return;
    this.#hits = this.#picture.layout(vm, this.#size, this.#view);
    this.#value();
  }

  /** The slider over the picture at the camera's box; hidden when the picture has none. */
  #place(): void {
    const slider = this.#slider;
    if (slider === undefined) return;
    const track = this.#camera?.track ?? null;
    slider.hidden = track === null;
    if (track === null) return;
    slider.style.left = `${String(track.x)}px`;
    slider.style.top = `${String(track.y)}px`;
    slider.style.width = `${String(track.width)}px`;
    slider.style.height = `${String(track.height)}px`;
    slider.setAttribute('aria-orientation', track.axis === 'y' ? 'vertical' : 'horizontal');
    slider.setAttribute('aria-label', this.#vm?.slider ?? '');
    slider.setAttribute('aria-valuemin', '1');
    slider.setAttribute('aria-valuemax', String(this.#camera?.stops.length ?? 0));
  }

  /** The slider's value: the stop nearest the view, by its place in the slider's order, and its child's name. */
  #value(): void {
    const slider = this.#slider;
    const nearest = this.#nearest();
    if (slider === undefined || slider.hidden || nearest === undefined) return;
    const now = String(nearest.index + 1);
    if (slider.getAttribute('aria-valuenow') === now) return;
    slider.setAttribute('aria-valuenow', now);
    const name = this.#vm?.children.find((child) => child.id === nearest.id)?.name ?? '';
    slider.setAttribute('aria-valuetext', name);
  }

  #nearest(): { readonly id: string; readonly index: number } | undefined {
    const stops = this.#camera?.stops ?? [];
    let best: { id: string; index: number; distance: number } | undefined;
    for (const [index, stop] of stops.entries()) {
      const distance = Math.abs(stop.at - this.#view);
      if (best === undefined || distance < best.distance) best = { id: stop.id, index, distance };
    }
    return best;
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
    const zoom = this.#zoomAt(time);
    // How far the zoom has gone, 0 (the whole picture) to 1 (inside the child, faded to the ground).
    let depth = 0;
    if (zoom === undefined) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    } else {
      depth = (zoom.scale - 1) / (ZOOM - 1);
      // The child's anchor drifts to the middle as the picture grows around it.
      const x = zoom.anchor.x + (width / 2 - zoom.anchor.x) * depth;
      const y = zoom.anchor.y + (height / 2 - zoom.anchor.y) * depth;
      context.setTransform(
        ratio * zoom.scale,
        0,
        0,
        ratio * zoom.scale,
        ratio * (x - zoom.anchor.x * zoom.scale),
        ratio * (y - zoom.anchor.y * zoom.scale),
      );
    }
    this.#picture.paint(context, vm, this.#size, palette, time, this.#lit, this.#view);
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

  /** The zoom at this moment: a trip's once its ride is over (anchored where the child then stands), or the way back out. */
  #zoomAt(
    time: number,
  ): { readonly scale: number; readonly anchor: { readonly x: number; readonly y: number } } | undefined {
    const trip = this.#trip;
    if (trip !== undefined) {
      const scale = trip.scale(time);
      if (scale <= 1) return undefined;
      this.#tripAnchor ??= this.#hits.find((hit) => hit.id === trip.pick())?.anchor ?? {
        x: this.#size.width / 2,
        y: this.#size.height / 2,
      };
      return { scale, anchor: this.#tripAnchor };
    }
    const out = this.#zoomOut;
    return out === undefined ? undefined : { scale: out.scale.at(time), anchor: out.anchor };
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

  /** Pointed at in the picture: drawn lit here, and announced so the list lights its twin. */
  #pointAt(id: string): void {
    if (id === this.#lit) return;
    this.light(id);
    this.#announce(LIGHT, id);
  }

  /** A finger down on the picture or the slider: a drag may begin (the view stops where it is). */
  #down(event: PointerEvent, slider: boolean): void {
    if (this.#trip !== undefined || this.#zoomOut !== undefined) return;
    this.#dragged = false;
    const camera = this.#camera;
    if (!slider) this.#pointAt(this.#hitAt(event)?.id ?? '');
    if (camera === null || (!slider && camera.drag === 0)) return;
    this.#motion = undefined;
    this.#gesture = {
      pointer: event.pointerId,
      start: camera.axis === 'y' ? event.clientY : event.clientX,
      view: this.#view,
      fling: new Fling(),
      slider,
      moved: slider,
    };
    if (!slider) return;
    event.preventDefault();
    this.#slider?.setPointerCapture(event.pointerId);
    this.#slider?.focus({ preventScroll: true });
    // A tap on the track glides the view there; the thumb then follows the finger.
    const at = this.#trackValue(event);
    if (at !== undefined) this.#glide(at, GLIDE);
  }

  #move(event: PointerEvent): void {
    const gesture = this.#gesture;
    const camera = this.#camera;
    if (gesture === undefined || camera === null || gesture.pointer !== event.pointerId) {
      if (this.#gesture === undefined && this.#trip === undefined)
        this.#pointAt(this.#hitAt(event)?.id ?? '');
      return;
    }
    if (gesture.slider) {
      const at = this.#trackValue(event);
      if (at === undefined) return;
      this.#motion = undefined;
      this.#follow(at, gesture);
      return;
    }
    const along = (camera.axis === 'y' ? event.clientY : event.clientX) - gesture.start;
    if (!gesture.moved && Math.abs(along) <= SLOP) return;
    if (!gesture.moved) {
      gesture.moved = true;
      this.#canvas?.setPointerCapture(event.pointerId);
    }
    this.#follow(gesture.view + along * camera.drag, gesture);
  }

  /** The view under the finger, one to one; the child it comes to lights in the list. */
  #follow(value: number, gesture: Gesture): void {
    this.#view = this.#clamp(value);
    gesture.fling.sample(this.#clock.now(), this.#view);
    this.#layout();
    const nearest = this.#nearest();
    if (nearest !== undefined) this.#pointAt(nearest.id);
    if (this.#leave === undefined) this.#paint(STILL);
  }

  /** The finger lets go: a drag coasts on its speed and comes to rest (on a floor for the tower); still under reduced motion. */
  #up(event: PointerEvent): void {
    const gesture = this.#gesture;
    const camera = this.#camera;
    if (gesture === undefined || camera === null || gesture.pointer !== event.pointerId) return;
    this.#gesture = undefined;
    if (!gesture.moved) return;
    if (!gesture.slider) this.#dragged = true;
    const reduced = this.#reducedMotion();
    const thrown = reduced ? this.#view : this.#view + gesture.fling.speed(this.#clock.now()) * camera.coast;
    const target = this.#clamp(camera.snap ? Math.round(thrown) : thrown);
    const distance = Math.abs(target - this.#view);
    this.#glide(target, camera.settle.base + camera.settle.per * Math.sqrt(distance));
  }

  /** The slider's keys (a desktop extra): an arrow moves to the next stop or the one before. */
  #key(event: KeyboardEvent): void {
    const camera = this.#camera;
    const stops = camera?.stops ?? [];
    const nearest = this.#nearest();
    if (camera === null || nearest === undefined) return;
    const step = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const next = stops[Math.min(stops.length - 1, Math.max(0, nearest.index + step))];
    if (next === undefined) return;
    this.#glide(next.at, this.#pace(camera, Math.abs(next.at - this.#view)));
    this.#pointAt(next.id);
  }

  /** The view on its way to a value (at once under reduced motion). */
  #glide(value: number, duration: number): void {
    const target = this.#clamp(value);
    if (this.#reducedMotion() || Math.abs(target - this.#view) < 0.001) {
      this.#motion = undefined;
      this.#view = target;
      this.#layout();
      if (this.#leave === undefined) this.#paint(STILL);
      return;
    }
    this.#motion = new Tween(this.#view, target, this.#clock.now(), duration, easeOut);
    this.#run();
  }

  /** The view a finger on the slider's track points at. */
  #trackValue(event: PointerEvent): number | undefined {
    const track = this.#camera?.track ?? null;
    const box = this.#slider?.getBoundingClientRect();
    if (track === null || box === undefined) return undefined;
    const fraction =
      track.axis === 'y'
        ? (event.clientY - box.top) / Math.max(1, box.height)
        : (event.clientX - box.left) / Math.max(1, box.width);
    return track.from + (track.to - track.from) * Math.min(1, Math.max(0, fraction));
  }

  /** A tap on an open child: the trip in. Ignored while a trip runs, and when it ends a drag. */
  #tap(event: MouseEvent): void {
    if (this.#dragged) {
      this.#dragged = false;
      return;
    }
    if (this.#trip !== undefined || this.#zoomOut !== undefined) return;
    const hit = this.#hitAt(event);
    const child = this.#vm?.children.find((each) => each.id === hit?.id);
    if (hit === undefined || child === undefined || child.sealed) return;
    this.#go(hit.id);
  }

  /** Ride to the child's stop (a picture with a camera), zoom in when the picture zooms, then pick it; at once under reduced motion. */
  #go(id: string): void {
    if (this.#reducedMotion()) {
      this.#announce(PICK, id);
      return;
    }
    const camera = this.#camera;
    const stop = camera?.stops.find((each) => each.id === id);
    const to = stop === undefined ? this.#view : this.#clamp(stop.at);
    const distance = Math.abs(to - this.#view);
    this.#motion = undefined;
    this.#trip = new SceneTrip({
      from: this.#view,
      to,
      start: this.#clock.now(),
      ride: camera === null || distance < 0.01 ? 0 : this.#pace(camera, distance),
      zoom: camera === null || camera.zoom ? { scale: ZOOM, time: ZOOM_TIME } : null,
      pick: id,
    });
    this.#run();
  }

  #pace(camera: SceneCamera, distance: number): number {
    return Math.min(camera.pace.most, camera.pace.base + camera.pace.per * Math.sqrt(distance));
  }

  #clamp(value: number): number {
    const camera = this.#camera;
    return camera === null ? 0 : Math.min(camera.max, Math.max(camera.min, value));
  }

  #announce(type: string, id: string): void {
    this.#host?.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: { id } }));
  }
}
