import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { DrawnScene } from '#ui/screens/DrawnScene.ts';
import { Gesture } from './Gesture.ts';
import type { SceneCamera } from './SceneCamera.ts';
import { StillCamera } from './StillCamera.ts';
import { SceneMount } from './SceneMount.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import { SceneTrip } from './SceneTrip.ts';
import type { SceneViewParts } from './SceneViewParts.ts';
import type { SceneVM } from './SceneVM.ts';
import { Tween } from './Tween.ts';
import { Zoom } from './Zoom.ts';

/** Going in, the picture grows this many times around the child before the next place shows. */
const ZOOM = 6;
/** How long a zoom takes, in milliseconds. */
const ZOOM_TIME = 450;
/** A still is painted at this moment of the clock. */
const STILL = 0;
/** A tap on the slider's track glides the view there in this long. */
const GLIDE = 320;

/**
 * The scene host (U01b, U02): a canvas the size of its host element, drawn by a registered picture on the page's
 * one clock, with the coherence tear over it, and — for a picture with a camera — the view it stands at (the
 * tower's car, the corridor's walk). A drag moves the view one to one and coasts when let go; a slider over the
 * picture (a real `role=slider` beside the image, drawn by the picture) moves it too; a tap on a child, or a pick
 * from the list (`enter`), rides the view to the child's stop, zooms in when the picture zooms, and only then asks
 * for the child to be entered (a bubbling `pick` carrying its id); a child pointed at — or the one the view comes
 * to while dragged — is told to the screen (`onLight`) so the list lights its twin. Any new view-model or a dispose drops a
 * ride, zoom or coast in flight and its pick (ids are positional: a late pick could ride another place's option);
 * a new view-model of the same picture keeps the view on the same place and rides from the old one to the new rest
 * on another (floor to floor). Taps are ignored while a trip runs. Under `prefers-reduced-motion` the picture is a
 * still, the view jumps, a tap enters at once and nothing zooms; the tear is drawn but does not move. The canvas is
 * the image a reader hears named; the slider is its own control beside it.
 */
export class SceneView implements DrawnScene {
  readonly #picture: ScenePicture<SceneVM>;
  readonly #parts: SceneViewParts;
  /** Told which child the picture points at (or none, empty): the list lights its twin. */
  readonly #onLight: (id: string) => void;
  #mounted: SceneMount | undefined;
  #vm: SceneVM | undefined;
  #size: PictureSize = { width: 0, height: 0 };
  #hits: readonly SceneHit[] = [];
  #lit = '';
  /** The child you stand by: the one you came back out of, until the picture shows another place. */
  #here = '';
  #camera: SceneCamera = new StillCamera();
  #view = 0;
  /** A view on its way without a pick: a coast, a glide, a ride between floors. */
  #motion: Tween | undefined;
  /** A going-in: ride, zoom, pick. */
  #trip: SceneTrip | undefined;
  /** A zoom back out of the child just left, and the point it centres on. */
  #zoomOut:
    { readonly scale: Tween; readonly anchor: { readonly x: number; readonly y: number } } | undefined;
  #gesture: Gesture | undefined;
  /** The click that ends a drag is not a tap. */
  #dragged = false;
  /** Stops listening to the clock; set while the picture moves. */
  #leave: (() => void) | undefined;

  constructor(picture: ScenePicture<SceneVM>, parts: SceneViewParts, onLight: (id: string) => void) {
    this.#picture = picture;
    this.#parts = parts;
    this.#onLight = onLight;
  }

  mount(host: HTMLElement): void {
    const canvas = this.#parts.canvases.mount(host, () => {
      this.#fit();
      if (this.#leave === undefined) this.#paint(STILL);
    });
    const slider = host.ownerDocument.createElement('div');
    slider.className = 'slider';
    slider.setAttribute('role', 'slider');
    slider.tabIndex = 0;
    slider.hidden = true;
    host.append(slider);
    const listeners = new AbortController();
    const signal = listeners.signal;
    canvas.listen(
      'pointerdown',
      (event) => {
        this.#down(event, false);
      },
      signal,
    );
    canvas.listen(
      'pointermove',
      (event) => {
        this.#move(event);
      },
      signal,
    );
    canvas.listen(
      'pointerup',
      (event) => {
        this.#up(event);
      },
      signal,
    );
    canvas.listen(
      'pointercancel',
      (event) => {
        this.#up(event);
      },
      signal,
    );
    canvas.listen(
      'pointerleave',
      () => {
        if (this.#gesture === undefined) this.#pointAt('');
      },
      signal,
    );
    canvas.listen(
      'click',
      (event) => {
        this.#tap(event);
      },
      signal,
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
    this.#mounted = new SceneMount({ host, canvas, slider, listeners });
  }

  /** A new view-model is a new frame of the game: whatever moves stops and a pick in flight is dropped. */
  render(vm: SceneVM): void {
    const before = this.#vm;
    this.#trip = undefined;
    this.#zoomOut = undefined;
    this.#motion = undefined;
    this.#gesture = undefined;
    this.#vm = vm;
    this.#mounted?.canvas().frameChanged();
    this.#fit();
    const camera = this.#camera;
    if (before?.address !== vm.address) this.#here = '';
    if (before?.address === vm.address) {
      this.#view = camera.clamp(this.#view);
    } else if (before !== undefined && !this.#parts.motion.reduced()) {
      // Another place in the same picture (floor to floor): ride from where the view stood to the new rest.
      const distance = Math.abs(camera.rest() - this.#view);
      if (distance > 0.01) {
        this.#motion = new Tween(
          this.#view,
          camera.rest(),
          this.#parts.clock.now(),
          camera.pace(distance),
          this.#parts.ride,
        );
      } else {
        this.#view = camera.rest();
      }
    } else {
      this.#view = camera.rest();
    }
    const canvas = this.#mounted?.canvas();
    canvas?.name(vm.label);
    canvas?.touch(camera.drags());
    this.#layout();
    this.#run();
  }

  /** Back out of the child with this id: the view stands at its stop, and the picture zooms out of it when it zooms. */
  arrive(id: string): void {
    this.#here = id;
    const stop = this.#camera.stopOf(id);
    if (stop !== undefined) {
      this.#motion = undefined;
      this.#view = this.#camera.clamp(stop);
      this.#layout();
    }
    const hit = this.#hits.find((each) => each.id === id);
    if (hit === undefined || this.#parts.motion.reduced() || !this.#camera.zooms()) {
      if (this.#leave === undefined) this.#paint(STILL);
      return;
    }
    this.#zoomOut = {
      scale: new Tween(ZOOM, 1, this.#parts.clock.now(), ZOOM_TIME, this.#parts.ride),
      anchor: hit.anchor,
    };
    this.#run();
  }

  /**
   * Whether a child picked from the list is the picture's to ride to (U02, Decision 8: a door picked from the list is
   * walked to, then opened): an open child the camera has a stop for. The street's list enters at once.
   */
  leads(id: string): boolean {
    const child = this.#vm?.children.find((each) => each.id === id);
    return child !== undefined && !child.sealed && this.#camera.stopOf(id) !== undefined;
  }

  /** The view rides to the child's stop and the pick follows; ignored while a trip runs. Asked first: `leads`. */
  enter(id: string): void {
    if (this.#trip === undefined && this.leads(id)) this.#go(id);
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
    this.#mounted?.unmount();
    this.#mounted = undefined;
    this.#vm = undefined;
    this.#camera = new StillCamera();
  }

  /** Moving: listen to the clock. Still: one frame now, and nothing more until something changes. */
  #run(): void {
    if (this.#parts.motion.reduced()) {
      this.#stop();
      this.#motion = undefined;
      this.#paint(STILL);
      return;
    }
    this.#leave ??= this.#parts.clock.subscribe((time) => {
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
    this.#pick(trip.pick());
  }

  /** The canvas takes its host's size, in device pixels within the budget; the picture says how its view moves there. */
  #fit(): void {
    const mounted = this.#mounted;
    const vm = this.#vm;
    if (mounted === undefined || vm === undefined) return;
    const canvas = mounted.canvas();
    const size = canvas.hostSize();
    canvas.fit(size);
    this.#size = size;
    this.#camera = this.#picture.camera(vm, size);
    this.#view = this.#camera.clamp(this.#view);
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
    const slider = this.#mounted?.slider();
    if (slider === undefined) return;
    const track = this.#camera.track();
    slider.hidden = track === null;
    if (track === null) return;
    slider.style.left = `${String(track.x)}px`;
    slider.style.top = `${String(track.y)}px`;
    slider.style.width = `${String(track.width)}px`;
    slider.style.height = `${String(track.height)}px`;
    slider.setAttribute('aria-orientation', track.axis === 'y' ? 'vertical' : 'horizontal');
    slider.setAttribute('aria-label', this.#vm?.slider ?? '');
    slider.setAttribute('aria-valuemin', '1');
    slider.setAttribute('aria-valuemax', String(this.#camera.stopCount()));
  }

  /** The slider's value: the stop nearest the view, by its place in the slider's order, and its child's name. */
  #value(): void {
    const slider = this.#mounted?.slider();
    const nearest = this.#camera.nearest(this.#view);
    if (slider === undefined || slider.hidden || nearest === undefined) return;
    const now = String(nearest.index + 1);
    if (slider.getAttribute('aria-valuenow') === now) return;
    slider.setAttribute('aria-valuenow', now);
    const name = this.#vm?.children.find((child) => child.id === nearest.id)?.name ?? '';
    slider.setAttribute('aria-valuetext', name);
  }

  #paint(time: number): void {
    const canvas = this.#mounted?.canvas();
    const vm = this.#vm;
    const { width, height } = this.#size;
    if (canvas === undefined || vm === undefined || width === 0 || height === 0) return;
    const palette = canvas.palette();
    canvas.paint((context) => {
      context.globalAlpha = 1;
      const zoom = this.#zoomAt(time);
      context.save();
      zoom.apply(context, this.#size);
      this.#picture.paint(context, vm, this.#size, palette, time, this.#lit, this.#view, this.#here);
      context.restore();
      zoom.fade(context, this.#size, palette('ground'));
      this.#parts.tear.draw(context, canvas, {
        size: this.#size,
        palette,
        noise: vm.noise,
        decay: vm.decay,
        time,
      });
    });
  }

  /** The zoom at this moment: a trip's once its ride is over (anchored where the child then stands), the way back out, or none (scale 1). */
  #zoomAt(time: number): Zoom {
    const trip = this.#trip;
    if (trip !== undefined) return new Zoom({ scale: trip.scale(time), anchor: trip.anchor(), full: ZOOM });
    const out = this.#zoomOut;
    if (out !== undefined) return new Zoom({ scale: out.scale.at(time), anchor: out.anchor, full: ZOOM });
    return new Zoom({ scale: 1, anchor: { x: 0, y: 0 }, full: ZOOM });
  }

  #hitAt(event: MouseEvent): SceneHit | undefined {
    const point = this.#mounted?.canvas().pointAt(event);
    if (point === undefined) return undefined;
    const { x, y } = point;
    return this.#hits.find(
      (hit) => x >= hit.x && x <= hit.x + hit.width && y >= hit.y && y <= hit.y + hit.height,
    );
  }

  /** Pointed at in the picture: drawn lit here, and told to the screen so the list lights its twin. */
  #pointAt(id: string): void {
    if (id === this.#lit) return;
    this.light(id);
    this.#onLight(id);
  }

  /** A finger down on the picture or the slider: a drag may begin (the view stops where it is). */
  #down(event: PointerEvent, slider: boolean): void {
    if (this.#trip !== undefined || this.#zoomOut !== undefined) return;
    this.#dragged = false;
    const camera = this.#camera;
    if (!slider) this.#pointAt(this.#hitAt(event)?.id ?? '');
    if (!slider && !camera.drags()) return;
    this.#motion = undefined;
    this.#gesture = new Gesture({
      pointer: event.pointerId,
      start: camera.along({ x: event.clientX, y: event.clientY }),
      view: this.#view,
      slider,
    });
    if (!slider) return;
    event.preventDefault();
    this.#mounted?.slider().setPointerCapture(event.pointerId);
    this.#mounted?.slider().focus({ preventScroll: true });
    // A tap on the track glides the view there; the thumb then follows the finger.
    const at = this.#trackValue(event);
    if (at !== undefined) this.#glide(at, GLIDE);
  }

  #move(event: PointerEvent): void {
    const gesture = this.#gesture;
    const camera = this.#camera;
    if (!gesture?.is(event.pointerId)) {
      if (this.#gesture === undefined && this.#trip === undefined)
        this.#pointAt(this.#hitAt(event)?.id ?? '');
      return;
    }
    if (gesture.onSlider()) {
      const at = this.#trackValue(event);
      if (at === undefined) return;
      this.#motion = undefined;
      this.#follow(at, gesture);
      return;
    }
    const position = camera.along({ x: event.clientX, y: event.clientY });
    const wasMoved = gesture.moved();
    gesture.move(position);
    if (!gesture.moved()) return;
    // The drag begins: the canvas keeps the finger even when it leaves the picture.
    if (!wasMoved) this.#mounted?.canvas().capture(event.pointerId);
    this.#follow(gesture.viewAt(position, camera.dragRate()), gesture);
  }

  /** The view under the finger, one to one; the child it comes to lights in the list. */
  #follow(value: number, gesture: Gesture): void {
    this.#view = this.#camera.clamp(value);
    gesture.sample(this.#parts.clock.now(), this.#view);
    this.#layout();
    const nearest = this.#camera.nearest(this.#view);
    if (nearest !== undefined) this.#pointAt(nearest.id);
    if (this.#leave === undefined) this.#paint(STILL);
  }

  /** The finger lets go: a drag coasts on its speed and comes to rest (on a floor for the tower); still under reduced motion. */
  #up(event: PointerEvent): void {
    const gesture = this.#gesture;
    const camera = this.#camera;
    if (!gesture?.is(event.pointerId)) return;
    this.#gesture = undefined;
    if (!gesture.moved()) return;
    if (!gesture.onSlider()) this.#dragged = true;
    const speed = this.#parts.motion.reduced() ? 0 : gesture.speed(this.#parts.clock.now());
    const target = camera.landing(this.#view, speed);
    this.#glide(target, camera.settle(Math.abs(target - this.#view)));
  }

  /** The slider's keys (a desktop extra): an arrow moves to the next stop or the one before. */
  #key(event: KeyboardEvent): void {
    const step = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }[event.key];
    if (step === undefined) return;
    const next = this.#camera.stepFrom(this.#view, step);
    if (next === undefined) return;
    event.preventDefault();
    this.#glide(next.at, this.#camera.pace(Math.abs(next.at - this.#view)));
    this.#pointAt(next.id);
  }

  /** The view on its way to a value (at once under reduced motion). */
  #glide(value: number, duration: number): void {
    const target = this.#camera.clamp(value);
    if (this.#parts.motion.reduced() || Math.abs(target - this.#view) < 0.001) {
      this.#motion = undefined;
      this.#view = target;
      this.#layout();
      if (this.#leave === undefined) this.#paint(STILL);
      return;
    }
    this.#motion = new Tween(this.#view, target, this.#parts.clock.now(), duration, this.#parts.coast);
    this.#run();
  }

  /** The view a finger on the slider's track points at. */
  #trackValue(event: PointerEvent): number | undefined {
    const box = this.#mounted?.slider().getBoundingClientRect();
    if (this.#camera.track() === null || box === undefined) return undefined;
    return this.#camera.alongTrack({ x: event.clientX, y: event.clientY }, box);
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
    if (this.#parts.motion.reduced()) {
      this.#pick(id);
      return;
    }
    const camera = this.#camera;
    const stop = camera.stopOf(id);
    const to = stop === undefined ? this.#view : camera.clamp(stop);
    const distance = Math.abs(to - this.#view);
    // Where the child will stand once the ride is over: the point the zoom centres on (the picture's layout is pure).
    const landed = this.#vm === undefined ? [] : this.#picture.layout(this.#vm, this.#size, to);
    const anchor = landed.find((hit) => hit.id === id)?.anchor ?? {
      x: this.#size.width / 2,
      y: this.#size.height / 2,
    };
    this.#motion = undefined;
    this.#trip = new SceneTrip({
      from: this.#view,
      to,
      start: this.#parts.clock.now(),
      ride: distance < 0.01 ? 0 : camera.pace(distance),
      zoom: camera.zooms() ? { scale: ZOOM, time: ZOOM_TIME } : null,
      pick: id,
      easing: this.#parts.ride,
      anchor,
    });
    this.#run();
  }

  #pick(id: string): void {
    const host = this.#mounted?.host();
    if (host !== undefined) this.#parts.picks.pick(host, id);
  }
}
