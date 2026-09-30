import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import { BandStage } from './BandStage.ts';
import type { Clock } from './Clock.ts';
import type { Point } from './Point.ts';
import type { Sketch } from './Sketch.ts';

/** A band as the column hands it over: where its canvas goes, its sketch, and the place you went down into. */
export interface BandHost {
  readonly host: HTMLElement;
  readonly sketch: Sketch;
  readonly into: string;
}

/** A band on screen: its canvas, and where the thread passes through it. */
interface ShownBand {
  readonly band: BandHost;
  readonly canvas: PixelCanvas;
  spot: Point;
}

/** How long the thread takes to draw itself down to you when the column opens, in milliseconds. */
const REVEAL = 750;

/**
 * The trace column's pictures (U04; the mock's `drawColumn` and `drawThread`, `transit-reframed.html:1079-1102`): a
 * canvas a band, each painted once and again when it changes size, only the band in the middle of the view moving;
 * and the thread over them, through each band's spot, pulsing down toward you and fraying as coherence falls. Built
 * in `main.ts`; one column at a time.
 */
export class TraceBands {
  readonly #canvases: Canvases;
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;
  #bands: ShownBand[] = [];
  #thread: PixelCanvas | undefined;
  #scroller: HTMLElement | undefined;
  #stop: (() => void) | undefined;
  #opened = 0;
  #decay = 0;

  constructor(parts: { readonly canvases: Canvases; readonly clock: Clock; readonly motion: ReducedMotion }) {
    this.#canvases = parts.canvases;
    this.#clock = parts.clock;
    this.#motion = parts.motion;
  }

  /** The column's bands shown, the thread over the scroller; whatever column was shown before goes. */
  show(column: {
    readonly scroller: HTMLElement;
    readonly thread: HTMLElement;
    readonly bands: readonly BandHost[];
    readonly decay: number;
  }): void {
    this.clear();
    this.#scroller = column.scroller;
    this.#decay = column.decay;
    this.#opened = this.#clock.now();
    this.#bands = column.bands.map((band) => {
      const shown: ShownBand = {
        band,
        canvas: this.#canvases.mount(band.host, () => {
          this.#paint(shown, 0);
        }),
        spot: { x: 0, y: 0 },
      };
      shown.canvas.decorative();
      return shown;
    });
    this.#thread = this.#canvases.mount(column.thread, () => {
      this.#drawThread(this.#clock.now());
    });
    this.#thread.decorative();
    for (const band of this.#bands) this.#paint(band, 0);
    if (this.#motion.reduced()) {
      this.#drawThread(0);
      column.scroller.addEventListener('scroll', () => {
        this.#drawThread(0);
      });
      return;
    }
    this.#stop = this.#clock.subscribe((time) => {
      this.#frame(time);
    });
  }

  clear(): void {
    this.#stop?.();
    this.#stop = undefined;
    for (const band of this.#bands) band.canvas.remove();
    this.#thread?.remove();
    this.#bands = [];
    this.#thread = undefined;
    this.#scroller = undefined;
  }

  #frame(time: number): void {
    const focus = this.#focus();
    if (focus !== undefined) this.#paint(focus, time);
    this.#drawThread(time);
  }

  /** The band nearest the middle of the scroller's view. */
  #focus(): ShownBand | undefined {
    const view = this.#scroller?.getBoundingClientRect();
    if (view === undefined) return undefined;
    const middle = view.top + view.height / 2;
    let best: ShownBand | undefined;
    let distance = Infinity;
    for (const band of this.#bands) {
      const box = band.band.host.getBoundingClientRect();
      const away = Math.abs(box.top + box.height / 2 - middle);
      if (away < distance) {
        distance = away;
        best = band;
      }
    }
    return best;
  }

  #paint(band: ShownBand, time: number): void {
    const size = band.canvas.hostSize();
    if (size.width === 0 || size.height === 0) return;
    band.canvas.fit(size);
    const palette = band.canvas.palette();
    band.canvas.paint((context) => {
      const stage = new BandStage({ context, size, palette, time, into: band.band.into });
      band.band.sketch.stageOn(stage);
      band.spot = stage.spot();
    });
  }

  /** The thread through every band's spot, the curve between bands, drawn down to you; frayed as coherence falls. */
  #drawThread(time: number): void {
    const thread = this.#thread;
    if (thread === undefined) return;
    const size = thread.hostSize();
    if (size.width === 0 || size.height === 0) return;
    thread.fit(size);
    const palette = thread.palette();
    const origin = thread.onPage({ x: 0, y: 0 });
    const points = this.#bands.map((band) => {
      const box = band.band.host.getBoundingClientRect();
      return {
        x: box.left - origin.x + band.spot.x,
        y: box.top - origin.y + band.spot.y,
        top: box.top - origin.y,
        bottom: box.bottom - origin.y,
      };
    });
    const reduced = this.#motion.reduced();
    const reveal = reduced ? 1 : Math.min(1, Math.max(0, time - this.#opened) / REVEAL);
    thread.paint((context) => {
      context.clearRect(0, 0, size.width, size.height);
      const first = points[0];
      const me = points[points.length - 1];
      if (first === undefined || me === undefined) return;
      const path = new Path2D();
      path.moveTo(first.x, first.y);
      points.forEach((point, index) => {
        if (index > 0) path.lineTo(point.x, point.y);
        const next = points[index + 1];
        if (next === undefined) return;
        const gap = next.top - point.bottom;
        path.lineTo(point.x, point.bottom);
        path.bezierCurveTo(point.x, point.bottom + gap * 0.6, next.x, next.top - gap * 0.6, next.x, next.top);
      });
      const cut = me.y + (-20 - me.y) * (1 - Math.pow(1 - reveal, 3));
      context.save();
      context.beginPath();
      context.rect(0, cut, size.width, size.height);
      context.clip();
      context.lineCap = 'round';
      context.lineJoin = 'round';
      const decay = this.#decay;
      if (decay > 0) {
        context.globalAlpha = 0.35 * decay;
        context.strokeStyle = palette('rd');
        context.lineWidth = 1.5;
        context.save();
        context.translate(Math.sin(time / 90) * 3 * decay, Math.cos(time / 130) * 1.5 * decay);
        context.stroke(path);
        context.restore();
        context.setLineDash([22 + 30 * (1 - decay), 3 + 18 * decay]);
      }
      context.strokeStyle = palette('cy');
      context.globalAlpha = 0.12;
      context.lineWidth = 9;
      context.stroke(path);
      context.globalAlpha = 0.8;
      context.lineWidth = 2;
      context.stroke(path);
      context.setLineDash([]);
      if (!reduced) {
        context.setLineDash([3, 28]);
        context.lineDashOffset = -time * 0.07;
        context.strokeStyle = palette('wh');
        context.globalAlpha = 0.75;
        context.lineWidth = 2.5;
        context.stroke(path);
        context.setLineDash([]);
      }
      context.strokeStyle = palette('cy');
      context.globalAlpha = 0.9;
      context.lineWidth = 1.5;
      points.slice(0, -1).forEach((point) => {
        context.beginPath();
        context.arc(point.x, point.y, 5, 0, Math.PI * 2);
        context.stroke();
      });
      context.fillStyle = palette('yl');
      context.globalAlpha = 1;
      context.beginPath();
      context.arc(me.x, me.y, 4 + (reduced ? 0 : Math.sin(time / 200)), 0, Math.PI * 2);
      context.fill();
      context.restore();
    });
  }
}
