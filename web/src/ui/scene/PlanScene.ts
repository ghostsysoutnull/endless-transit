import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { ChildMark } from './ChildMark.ts';
import type { Framing } from './Framing.ts';
import { MarkedChild } from './MarkedChild.ts';
import { NoChild } from './NoChild.ts';
import { Pinch } from './Pinch.ts';
import type { PlanCamera } from './PlanCamera.ts';
import { PlanDrag } from './PlanDrag.ts';
import { PlanGlide } from './PlanGlide.ts';
import type { PlanSceneParts } from './PlanSceneParts.ts';
import type { PlanSketch } from './PlanSketch.ts';
import { PlanTrip } from './PlanTrip.ts';
import type { Point } from './Point.ts';
import type { SceneCanvas } from './SceneCanvas.ts';
import type { SceneHit } from './SceneHit.ts';
import type { StagedScene } from './StagedScene.ts';
import { Zoom } from './Zoom.ts';

/** A still is painted at this moment of the clock. */
const STILL = 0;
/** A coast comes to rest in this long, in milliseconds (the mock's 620). */
const COAST = 620;
/** A minimap tap glides the view there in this long (the mock's 480). */
const MINIMAP = 480;
/** The plan is drawn at its own scale: the host never grows it (a scale-1 zoom; `SceneCanvas` paints under one). */
const UNZOOMED = new Zoom({ scale: 1, anchor: { x: 0, y: 0 }, full: 2 });

/**
 * The plan's host (U03): a canvas the size of its host element, drawn by the plan's picture on the page's one clock,
 * with the coherence tear over it, and the framing the view stands at. One finger pans the plan one to one and coasts
 * when let go; two pinch it about their midpoint; a tap on the minimap glides there. A tap on a doorway, the entrance
 * or a relic — or its button in the list, the moves or the dock (`enter`) — glides where the picture says (into the
 * next room, back to the whole plan) and only then asks for it to be picked; a relic is picked at once. A new
 * view-model drops a trip in flight and its pick; the same room keeps the view, another room of the same apartment
 * glides to it, and the first one shows the whole plan and glides in. What is pointed at is told to the screen
 * (`onLight`) so the list lights its twin. Under reduced motion the picture is a still, the view jumps and a tap picks
 * at once.
 */
export class PlanScene implements StagedScene<PlanSketch> {
  readonly #parts: PlanSceneParts;
  readonly #onLight: (mark: ChildMark) => void;
  #mounted: { readonly host: HTMLElement; readonly canvas: SceneCanvas } | undefined;
  #sketch: PlanSketch | undefined;
  #size: PictureSize = { width: 0, height: 0 };
  #camera: PlanCamera | undefined;
  #framing: Framing | undefined;
  #hits: readonly SceneHit[] = [];
  #lit: ChildMark = new NoChild();
  /** The view on its way without a pick: a coast, a glide, the arrival. */
  #glide: PlanGlide | undefined;
  /** The view on its way to a pick. */
  #trip: PlanTrip | undefined;
  /** The fingers on the picture, by pointer id, in CSS pixels on the picture. */
  readonly #fingers = new Map<number, Point>();
  #drag: PlanDrag | undefined;
  #pinch: Pinch | undefined;
  /** The click that ends a drag or a pinch is not a tap. */
  #dragged = false;
  /** Stops listening to the clock; set while the picture moves. */
  #leave: (() => void) | undefined;

  constructor(parts: PlanSceneParts, onLight: (mark: ChildMark) => void) {
    this.#parts = parts;
    this.#onLight = onLight;
  }

  mount(host: HTMLElement): void {
    const canvas = this.#parts.canvases.mount(host, {
      down: (event) => {
        this.#down(event);
      },
      move: (event) => {
        this.#move(event);
      },
      up: (event) => {
        this.#up(event);
      },
      leave: () => {
        if (this.#drag === undefined) this.#pointAt(new NoChild());
      },
      tap: (event) => {
        this.#tap(event);
      },
      resized: () => {
        this.#fit();
        if (this.#leave === undefined) this.#paint(STILL);
      },
    });
    this.#mounted = { host, canvas };
  }

  /** A new view-model is a new frame of the game: whatever moves stops and a pick in flight is dropped. */
  render(sketch: PlanSketch): void {
    const before = this.#sketch?.frame();
    this.#sketch = sketch;
    this.#trip = undefined;
    this.#glide = undefined;
    this.#drag = undefined;
    this.#pinch = undefined;
    this.#fingers.clear();
    this.#mounted?.canvas.frameChanged();
    this.#fit();
    const camera = this.#camera;
    if (camera === undefined) return;
    const rest = sketch.rest(camera);
    const reduced = this.#parts.motion.reduced();
    if (before?.address === sketch.frame().address) {
      this.#framing = camera.clamp(this.#framing ?? rest);
    } else if (reduced) {
      this.#framing = rest;
    } else {
      // Another room: glide there from where the view stands; the first room: show the whole plan, then go in.
      const from = before === undefined ? camera.whole() : (this.#framing ?? rest);
      this.#framing = from;
      if (!from.equals(rest)) this.#glideTo(rest, camera.pace(from, rest), this.#parts.ride);
    }
    const canvas = this.#mounted?.canvas;
    canvas?.name(sketch.frame().label);
    canvas?.touch(true);
    this.#layout();
    this.#run();
  }

  /** Coming back out of a room never lands on the plan (a room is left through its doorways): the view is framed already. */
  arrive(): void {
    // Nothing to do: `render` framed the room.
  }

  /** Every open option the plan draws is the picture's to go to: through a doorway, back out, or a relic taken. */
  leads(id: string): boolean {
    const child = this.#sketch?.frame().children.find((each) => each.id === id);
    return child !== undefined && !child.sealed;
  }

  enter(id: string): void {
    if (this.#trip === undefined && this.leads(id)) this.#go(id);
  }

  light(mark: ChildMark): void {
    if (mark.equals(this.#lit)) return;
    this.#lit = mark;
    if (this.#leave === undefined) this.#paint(STILL);
  }

  dispose(): void {
    this.#trip = undefined;
    this.#glide = undefined;
    this.#drag = undefined;
    this.#pinch = undefined;
    this.#stop();
    this.#mounted?.canvas.remove();
    this.#mounted = undefined;
    this.#sketch = undefined;
    this.#camera = undefined;
  }

  #run(): void {
    if (this.#parts.motion.reduced()) {
      this.#stop();
      this.#glide = undefined;
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

  /** One frame: the view where its motion puts it, the picture; a trip that has ended picks — the last thing the frame does. */
  #frame(time: number): void {
    const trip = this.#trip;
    const motion = trip ?? this.#glide;
    if (motion !== undefined) {
      this.#framing = motion.at(time);
      this.#layout();
    }
    this.#paint(time);
    if (this.#glide?.over(time) === true) this.#glide = undefined;
    if (trip?.over(time) !== true) return;
    this.#trip = undefined;
    trip.finish({
      pick: (id) => {
        this.#pick(id);
      },
    });
  }

  /** The canvas takes its host's size; the picture says how its view moves there. */
  #fit(): void {
    const mounted = this.#mounted;
    const sketch = this.#sketch;
    if (mounted === undefined || sketch === undefined) return;
    const size = mounted.canvas.hostSize();
    mounted.canvas.fit(size);
    this.#size = size;
    this.#camera = sketch.camera(size);
    if (this.#framing !== undefined) this.#framing = this.#camera.clamp(this.#framing);
    this.#layout();
  }

  #layout(): void {
    const sketch = this.#sketch;
    const framing = this.#framing;
    if (sketch === undefined || framing === undefined) return;
    this.#hits = sketch.layout(this.#size, framing);
  }

  #paint(time: number): void {
    const canvas = this.#mounted?.canvas;
    const sketch = this.#sketch;
    const framing = this.#framing;
    if (canvas === undefined || sketch === undefined || framing === undefined) return;
    if (this.#size.width === 0 || this.#size.height === 0) return;
    const frame = sketch.frame();
    canvas.paint(
      { size: this.#size, zoom: UNZOOMED, noise: frame.noise, decay: frame.decay, time },
      (context, palette) => {
        sketch.paint(context, this.#size, palette, time, this.#lit, framing);
      },
    );
  }

  /** The view on its way to a framing, at once under reduced motion. */
  #glideTo(to: Framing, duration: number, easing: PlanSceneParts['ride']): void {
    const from = this.#framing;
    if (from === undefined || this.#parts.motion.reduced() || from.equals(to)) {
      this.#glide = undefined;
      this.#framing = to;
      this.#layout();
      if (this.#leave === undefined) this.#paint(STILL);
      return;
    }
    this.#glide = new PlanGlide({ from, to, start: this.#parts.clock.now(), duration, easing });
    this.#run();
  }

  /** Where the picture sends the view for this option, then its pick; a relic (no stop) or reduced motion picks at once. */
  #go(id: string): void {
    const camera = this.#camera;
    const from = this.#framing;
    const stop = camera === undefined ? undefined : this.#sketch?.stopOf(camera, id);
    if (this.#parts.motion.reduced() || camera === undefined || from === undefined || stop === undefined) {
      this.#pick(id);
      return;
    }
    this.#glide = undefined;
    this.#trip = new PlanTrip(
      new PlanGlide({
        from,
        to: stop,
        start: this.#parts.clock.now(),
        duration: camera.pace(from, stop),
        easing: this.#parts.ride,
      }),
      id,
    );
    this.#run();
  }

  #pick(id: string): void {
    const host = this.#mounted?.host;
    if (host !== undefined) this.#parts.picks.pick(host, id);
  }

  #hitAt(point: Point): SceneHit | undefined {
    return this.#hits.find(
      (hit) =>
        point.x >= hit.x && point.x <= hit.x + hit.width && point.y >= hit.y && point.y <= hit.y + hit.height,
    );
  }

  /** Pointed at in the picture: drawn lit here, and told to the screen so the list lights its twin. */
  #pointAt(mark: ChildMark): void {
    if (mark.equals(this.#lit)) return;
    this.light(mark);
    this.#onLight(mark);
  }

  #markAt(point: Point): ChildMark {
    const hit = this.#hitAt(point);
    return hit === undefined ? new NoChild() : new MarkedChild(hit.id);
  }

  /** A finger down: the view stops where it stands; one finger may drag, a second makes it a pinch. Ignored in a trip. */
  #down(event: PointerEvent): void {
    const canvas = this.#mounted?.canvas;
    const framing = this.#framing;
    if (this.#trip !== undefined || canvas === undefined || framing === undefined) return;
    const point = canvas.pointAt(event);
    this.#fingers.set(event.pointerId, point);
    this.#glide = undefined;
    this.#pointAt(this.#markAt(point));
    const [one, other] = [...this.#fingers.values()];
    if (one !== undefined && other !== undefined) {
      this.#drag = undefined;
      this.#pinch = new Pinch(framing, [one, other], this.#size);
      canvas.capture(event.pointerId);
      return;
    }
    this.#dragged = false;
    this.#drag = new PlanDrag({
      pointer: event.pointerId,
      hold: canvas,
      point: { x: event.clientX, y: event.clientY },
      framing,
    });
  }

  #move(event: PointerEvent): void {
    const canvas = this.#mounted?.canvas;
    const camera = this.#camera;
    if (canvas === undefined || camera === undefined) return;
    const point = canvas.pointAt(event);
    if (this.#fingers.has(event.pointerId)) this.#fingers.set(event.pointerId, point);
    const [one, other] = [...this.#fingers.values()];
    if (this.#pinch !== undefined && one !== undefined && other !== undefined) {
      this.#show(camera.clamp(this.#pinch.at([one, other])));
      return;
    }
    const drag = this.#drag;
    if (drag?.is(event.pointerId) !== true) {
      if (this.#drag === undefined && this.#trip === undefined) this.#pointAt(this.#markAt(point));
      return;
    }
    drag.move({ x: event.clientX, y: event.clientY });
    const framing = drag.framing();
    if (framing === undefined) return;
    this.#show(camera.clamp(framing));
    drag.sample(this.#parts.clock.now(), camera.clamp(framing));
  }

  /** The view at a framing a finger put it at: laid out and drawn now. */
  #show(framing: Framing): void {
    this.#framing = framing;
    this.#layout();
    if (this.#leave === undefined) this.#paint(STILL);
  }

  /** A finger lifted: a pinch ends when fewer than two remain; a drag coasts on its speed (still under reduced motion). */
  #up(event: PointerEvent): void {
    this.#fingers.delete(event.pointerId);
    if (this.#pinch !== undefined) {
      if (this.#fingers.size < 2) {
        this.#pinch = undefined;
        this.#dragged = true;
      }
      return;
    }
    const drag = this.#drag;
    const camera = this.#camera;
    const framing = this.#framing;
    if (drag?.is(event.pointerId) !== true || camera === undefined || framing === undefined) return;
    this.#drag = undefined;
    if (!drag.moved()) return;
    this.#dragged = true;
    const speed = this.#parts.motion.reduced() ? { x: 0, y: 0 } : drag.speed(this.#parts.clock.now());
    this.#glideTo(camera.landing(framing, speed), COAST, this.#parts.coast);
  }

  /** A tap: on the minimap the view glides there; on an open option, the trip to it. Not when it ends a drag, nor in a trip. */
  #tap(event: MouseEvent): void {
    if (this.#dragged) {
      this.#dragged = false;
      return;
    }
    const canvas = this.#mounted?.canvas;
    const camera = this.#camera;
    const framing = this.#framing;
    if (this.#trip !== undefined || canvas === undefined || camera === undefined || framing === undefined)
      return;
    const point = canvas.pointAt(event);
    const minimap = camera.minimap(framing);
    if (minimap.holds(point)) {
      this.#glideTo(camera.clamp(minimap.framingAt(point, framing)), MINIMAP, this.#parts.ride);
      return;
    }
    const hit = this.#hitAt(point);
    if (hit !== undefined && this.leads(hit.id)) this.#go(hit.id);
  }
}
