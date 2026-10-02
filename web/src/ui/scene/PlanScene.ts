import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { ChildMark } from './ChildMark.ts';
import type { Framing } from './Framing.ts';
import { InRoom } from './InRoom.ts';
import { MarkedChild } from './MarkedChild.ts';
import { NoChild } from './NoChild.ts';
import { Pinch } from './Pinch.ts';
import type { PlanCamera } from './PlanCamera.ts';
import { PlanDrag } from './PlanDrag.ts';
import type { PlanGesture } from './PlanGesture.ts';
import { PlanGlide } from './PlanGlide.ts';
import type { PlanSceneParts } from './PlanSceneParts.ts';
import type { PlanSketch } from './PlanSketch.ts';
import { PlanTrip } from './PlanTrip.ts';
import type { Point } from './Point.ts';
import type { SceneCanvas } from './SceneCanvas.ts';
import { SceneHits } from './SceneHits.ts';
import type { StagedScene } from './StagedScene.ts';
import type { ViewMode } from './ViewMode.ts';
import { Zoom } from './Zoom.ts';

/** A still is painted at this moment of the clock. */
const STILL = 0;
/** The plan is drawn at its own scale: the host never grows it (a scale-1 zoom; `SceneCanvas` paints under one). */
const UNZOOMED = new Zoom({ scale: 1, anchor: { x: 0, y: 0 }, full: 2 });

/** What the host shows: the sketch, the size it is drawn at, how its view moves there, and where the view stands. */
interface Shown {
  readonly sketch: PlanSketch;
  readonly size: PictureSize;
  readonly camera: PlanCamera;
  readonly framing: Framing;
}

/**
 * The plan's host (U03): a canvas the size of its host element, drawn by the plan's picture on the page's one clock,
 * with the coherence tear over it, and the framing the view stands at. Standing in a room, the room fills the picture
 * and holds still (U03d, `InRoom`); the MAP key flips to the plan (`OverPlan`) and back, and every new room
 * starts standing in it. Over the plan, one finger pans the plan one to one and coasts
 * when let go; two pinch it about their midpoint and, let go, settle on the room or the whole plan (U03c); a tap on the
 * corner map pulls back to the whole plan, unless it falls on an option. A tap on a doorway, the entrance
 * or a relic — or its button in the list, the moves or the dock (`enter`) — glides where the picture says (into the
 * next room, back to the whole plan) and only then asks for it to be picked; a relic is picked at once and flies to
 * the buffer (`Flight`). A new
 * view-model drops a trip in flight and its pick; the same room keeps the view, another room of the same apartment
 * glides to it, and the first one shows the whole plan and glides in. What is pointed at is told to the screen
 * (`onLight`) so the list lights its twin. Under reduced motion the picture is a still, the view jumps and a tap picks
 * at once.
 */
export class PlanScene implements StagedScene<PlanSketch> {
  readonly #parts: PlanSceneParts;
  readonly #onLight: (mark: ChildMark) => void;
  #mounted:
    | { readonly host: HTMLElement; readonly canvas: SceneCanvas; readonly mapKey: HTMLButtonElement }
    | undefined;
  /** In the room or over the plan. */
  #mode: ViewMode = new InRoom();
  /** The glide of the last flip between the room and the plan: while it is the view's glide, fingers wait, as for a trip. */
  #flipGlide: PlanGlide | undefined;
  /** What is shown, once a sketch has been drawn at a size. */
  #shown: Shown | undefined;
  #hits = new SceneHits([]);
  #lit: ChildMark = new NoChild();
  /** The view on its way without a pick: a coast, a glide, the arrival. */
  #glide: PlanGlide | undefined;
  /** The view on its way to a pick. */
  #trip: PlanTrip | undefined;
  /** The fingers on the picture, by pointer id, in CSS pixels on the picture. */
  readonly #fingers = new Map<number, Point>();
  /** One finger dragging or two pinching; none between. */
  #gesture: PlanGesture | undefined;
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
        if (this.#gesture === undefined) this.#pointAt(new NoChild());
      },
      tap: (event) => {
        this.#tap(event);
      },
      resized: () => {
        const shown = this.#shown;
        if (shown !== undefined) this.#refit(shown.sketch);
        if (this.#leave === undefined) this.#paint(STILL);
      },
    });
    this.#mounted = { host, canvas, mapKey: this.#mapKey(host) };
  }

  /** The MAP key (U03d), mounted where the parts say (U03e): pressed over the plan; a tap flips the view and glides there. */
  #mapKey(host: HTMLElement): HTMLButtonElement {
    const key = host.ownerDocument.createElement('button');
    key.type = 'button';
    key.className = 'mapkey';
    key.dataset.testid = 'map-key';
    key.setAttribute('aria-pressed', String(this.#mode.pressed()));
    key.addEventListener('click', () => {
      this.#flip();
    });
    this.#parts.keys.hold(key, host);
    return key;
  }

  /** The picture changed size: the view stands where its mode puts it at the new size, unless it is on its way somewhere. */
  #refit(sketch: PlanSketch): void {
    const shown = this.#shown;
    const canvas = this.#mounted?.canvas;
    if (shown === undefined || canvas === undefined) return;
    const moving = this.#trip !== undefined || this.#glide !== undefined;
    this.#show(
      sketch,
      moving ? shown.framing : this.#mode.refit(sketch, sketch.camera(canvas.hostSize()), shown.framing),
    );
  }

  #flip(): void {
    const shown = this.#shown;
    if (this.#trip !== undefined || shown === undefined) return;
    this.#gesture = undefined;
    this.#fingers.clear();
    this.#setMode(this.#mode.flipped());
    const to = this.#mode.rest(shown.sketch, shown.camera);
    this.#glideTo(to, shown.camera.pace(shown.framing, to), this.#parts.ride);
    this.#flipGlide = this.#glide;
  }

  #setMode(mode: ViewMode): void {
    this.#mode = mode;
    const sketch = this.#shown?.sketch;
    if (sketch !== undefined) this.#label(sketch);
  }

  /** The MAP key says what its next tap does: pressed over the plan, its words the mode's face of the sketch's key. */
  #label(sketch: PlanSketch): void {
    const key = this.#mounted?.mapKey;
    if (key === undefined) return;
    const words = this.#mode.keyWords(sketch.mapKey());
    const word = key.ownerDocument.createElement('span');
    word.setAttribute('aria-hidden', 'true');
    word.textContent = words.text;
    key.setAttribute('aria-pressed', String(this.#mode.pressed()));
    key.replaceChildren(word);
    key.setAttribute('aria-label', words.label);
  }

  /** A new view-model is a new frame of the game: whatever moves stops and a pick in flight is dropped. */
  render(sketch: PlanSketch): void {
    const before = this.#shown;
    this.#trip = undefined;
    this.#glide = undefined;
    this.#gesture = undefined;
    this.#fingers.clear();
    this.#mounted?.canvas.frameChanged();
    const size = this.#mounted?.canvas.hostSize() ?? { width: 0, height: 0 };
    const same = before?.sketch.frame().address === sketch.frame().address;
    if (!same) this.#setMode(new InRoom());
    const rest = this.#mode.rest(sketch, sketch.camera(size));
    if (before !== undefined && same) {
      this.#show(sketch, before.framing);
    } else if (this.#parts.motion.reduced()) {
      this.#show(sketch, rest);
    } else {
      // Another room: glide there from where the view stands; the first room: show the whole plan, then go in.
      const from = before === undefined ? sketch.camera(size).whole() : before.framing;
      this.#show(sketch, from);
      this.#glideTo(rest, sketch.camera(size).pace(from, rest), this.#parts.ride);
    }
    const canvas = this.#mounted?.canvas;
    canvas?.name(sketch.frame().label);
    this.#label(sketch);
    canvas?.touch(true);
    this.#run();
  }

  /** Coming back out of a room never lands on the plan (a room is left through its doorways): the view is framed already. */
  arrive(): void {
    // Nothing to do: `render` framed the room.
  }

  /** Every open option the plan draws is the picture's to go to: through a doorway, back out, or a relic taken. */
  leads(id: string): boolean {
    const child = this.#shown?.sketch.frame().children.find((each) => each.id === id);
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
    this.#gesture = undefined;
    this.#stop();
    this.#mounted?.canvas.remove();
    this.#mounted?.mapKey.remove();
    this.#mounted = undefined;
    this.#shown = undefined;
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
    const shown = this.#shown;
    if (motion !== undefined && shown !== undefined) this.#show(shown.sketch, motion.at(time));
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

  /**
   * The sketch shown at a framing: the canvas takes its host's size, the picture says how its view moves there, the
   * framing is kept in range and the tappable parts laid out where it puts them.
   */
  #show(sketch: PlanSketch, framing: Framing): void {
    const canvas = this.#mounted?.canvas;
    if (canvas === undefined) return;
    const size = canvas.hostSize();
    canvas.fit(size);
    const camera = sketch.camera(size);
    const kept = this.#mode.kept(camera, framing);
    this.#shown = { sketch, size, camera, framing: kept };
    this.#hits = new SceneHits(sketch.layout(size, kept));
  }

  #paint(time: number): void {
    const canvas = this.#mounted?.canvas;
    const shown = this.#shown;
    if (canvas === undefined || shown === undefined || shown.size.width === 0 || shown.size.height === 0)
      return;
    const frame = shown.sketch.frame();
    canvas.paint(
      { size: shown.size, zoom: UNZOOMED, noise: frame.noise, decay: frame.decay, time },
      (context, palette) => {
        shown.sketch.paint(
          context,
          shown.size,
          palette,
          time,
          this.#lit,
          shown.framing,
          this.#mode.corner(shown.camera, shown.framing),
        );
      },
    );
  }

  /** The view on its way to a framing, at once under reduced motion. */
  #glideTo(to: Framing, duration: number, easing: PlanSceneParts['ride']): void {
    const shown = this.#shown;
    if (shown === undefined) return;
    this.#ride(new PlanGlide({ from: shown.framing, to, start: this.#parts.clock.now(), duration, easing }));
  }

  /** The view on its way, as a glide says; under reduced motion, or a glide that goes nowhere, it is there at once. */
  #ride(glide: PlanGlide): void {
    const shown = this.#shown;
    if (shown === undefined) return;
    const end = glide.at(Number.POSITIVE_INFINITY);
    if (this.#parts.motion.reduced() || shown.framing.equals(end)) {
      this.#glide = undefined;
      this.#show(shown.sketch, end);
      if (this.#leave === undefined) this.#paint(STILL);
      return;
    }
    this.#glide = glide;
    this.#run();
  }

  /**
   * Where the picture sends the view for this option, then its pick; a relic (no stop) is picked at once and its name
   * flies to the buffer from where it lies (the flight knows reduced motion); under reduced motion a stop is skipped.
   */
  #go(id: string): void {
    const shown = this.#shown;
    if (shown === undefined) {
      this.#pick(id);
      return;
    }
    const stop = this.#mode.stop(shown.sketch, shown.camera, id);
    if (stop === undefined) {
      this.#fly(id, shown.sketch.nameOf(id));
      this.#pick(id);
      return;
    }
    if (this.#parts.motion.reduced()) {
      this.#pick(id);
      return;
    }
    this.#glide = undefined;
    this.#trip = new PlanTrip(
      new PlanGlide({
        from: shown.framing,
        to: stop,
        start: this.#parts.clock.now(),
        duration: shown.camera.pace(shown.framing, stop),
        easing: this.#parts.ride,
      }),
      id,
    );
    this.#run();
  }

  /** A relic's flight, by name, from where the picture lays it out, when it does. */
  #fly(id: string, name: string): void {
    const canvas = this.#mounted?.canvas;
    const hit = this.#hits.of(id);
    if (canvas !== undefined && hit !== undefined) this.#parts.flight.fly(canvas.onPage(hit.anchor), name);
  }

  #pick(id: string): void {
    const host = this.#mounted?.host;
    if (host !== undefined) this.#parts.picks.pick(host, id);
  }

  /** Pointed at in the picture: drawn lit here, and told to the screen so the list lights its twin. */
  #pointAt(mark: ChildMark): void {
    if (mark.equals(this.#lit)) return;
    this.light(mark);
    this.#onLight(mark);
  }

  #markAt(point: Point): ChildMark {
    const hit = this.#hits.at(point);
    return hit === undefined ? new NoChild() : new MarkedChild(hit.id);
  }

  /** A finger down: the view stops where it stands; one finger may drag, a second makes it a pinch. Ignored in a trip. */
  #down(event: PointerEvent): void {
    const canvas = this.#mounted?.canvas;
    const shown = this.#shown;
    const flipping = this.#glide !== undefined && this.#glide === this.#flipGlide;
    if (this.#trip !== undefined || flipping || canvas === undefined || shown === undefined) return;
    const point = canvas.pointAt(event);
    this.#pointAt(this.#markAt(point));
    if (!this.#mode.moves()) return;
    this.#fingers.set(event.pointerId, point);
    this.#glide = undefined;
    const [one, other] = [...this.#fingers.values()];
    if (one !== undefined && other !== undefined) {
      this.#gesture = new Pinch(shown.framing, [one, other], shown.size);
      canvas.capture(event.pointerId);
      return;
    }
    this.#dragged = false;
    this.#gesture = new PlanDrag({
      pointer: event.pointerId,
      hold: canvas,
      point: { x: event.clientX, y: event.clientY },
      framing: shown.framing,
    });
  }

  /** A finger moves: the gesture moves the plan with it; with no gesture, what it points at lights. */
  #move(event: PointerEvent): void {
    const canvas = this.#mounted?.canvas;
    const shown = this.#shown;
    if (canvas === undefined || shown === undefined) return;
    const point = canvas.pointAt(event);
    if (this.#fingers.has(event.pointerId)) this.#fingers.set(event.pointerId, point);
    const gesture = this.#gesture;
    if (gesture === undefined) {
      if (this.#trip === undefined) this.#pointAt(this.#markAt(point));
      return;
    }
    gesture.follow(this.#fingers, { x: event.clientX, y: event.clientY }, event.pointerId);
    const framing = gesture.framing();
    if (framing === undefined) return;
    this.#show(shown.sketch, framing);
    const moved = this.#shown?.framing ?? framing;
    gesture.sample(this.#parts.clock.now(), moved);
    if (this.#leave === undefined) this.#paint(STILL);
  }

  /** A finger lifted: the gesture it ends says how the view goes on (a drag coasts, a pinch settles), and hides the click after it. */
  #up(event: PointerEvent): void {
    this.#fingers.delete(event.pointerId);
    const gesture = this.#gesture;
    const shown = this.#shown;
    if (gesture?.endsWith(event.pointerId, this.#fingers) !== true || shown === undefined) return;
    this.#gesture = undefined;
    if (!gesture.moved()) return;
    this.#dragged = true;
    this.#ride(
      gesture.release({
        camera: shown.camera,
        framing: shown.framing,
        rest: shown.sketch.rest(shown.camera, this.#mode),
        now: this.#parts.clock.now(),
        still: this.#parts.motion.reduced(),
        ride: this.#parts.ride,
        coast: this.#parts.coast,
      }),
    );
  }

  /**
   * A tap: on an open option, the trip to it; else on the corner map, the pull back to the whole plan — an option's
   * hit wins, so a doorway under the map still takes its tap. Not when it ends a drag, nor in a trip.
   */
  #tap(event: MouseEvent): void {
    if (this.#dragged) {
      this.#dragged = false;
      return;
    }
    const canvas = this.#mounted?.canvas;
    const shown = this.#shown;
    if (this.#trip !== undefined || canvas === undefined || shown === undefined) return;
    const point = canvas.pointAt(event);
    const hit = this.#hits.at(point);
    if (hit !== undefined && this.leads(hit.id)) {
      this.#go(hit.id);
      return;
    }
    if (this.#mode.corner(shown.camera, shown.framing).holds(point)) {
      const whole = shown.camera.whole();
      this.#glideTo(whole, shown.camera.pace(shown.framing, whole), this.#parts.ride);
    }
  }
}
