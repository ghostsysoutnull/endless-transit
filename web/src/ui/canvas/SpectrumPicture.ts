import type { Painter } from './Painter.ts';
import type { Palette } from './Palette.ts';
import type { Picture, PictureSize } from './Picture.ts';
import type { SpectrumVM } from './SpectrumVM.ts';

/** The strip's height, a bar's width and the least gap between bars, in CSS pixels; the baseline's share of the height. */
const HEIGHT = 80;
const BAR = 5;
const GAP = 2;
const BASELINE = 0.76;
/** The faint lines behind the bars. */
const GRID = 3;
/** The floor's share of the strip, how far a bar may sit off its line, how far it swings each cycle, and the least it shows. */
const FLOOR_SHARE = 0.3;
const JITTER = 0.4;
const SWING = 0.3;
const FLOOR = 0.05;
/** A peak's height when resonant and when plain, its half-width along the axis, and how much of a bar a peak must be to take the cap. */
const RESONANT = 0.95;
const PLAIN = 0.55;
const PEAK_WIDTH = 0.035;
const CAPPED = 0.5;
/** The bloom around the bars, the reflection's share of their height and its strength. */
const BLOOM = 8;
const MIRROR = 0.28;
const MIRROR_ALPHA = 0.16;
/** The sweep: its trail's width in bars and the strength it starts at. */
const TRAIL = 9;
const TRAIL_ALPHA = 0.28;
/** A resonant peak's halo: its radius at rest and its breathing. */
const HALO = 7;
const HALO_PULSE = 4;
/** Under an anomaly the swing is this many times wider and faster, this many slices tear sideways by up to this many pixels, and the picture flickers down to this. */
const GLITCH_SWING = 2.5;
const GLITCH_PACE = 3;
const TEARS = 3;
const TEAR_SHIFT = 10;
const FLICKER = 0.7;

/** One bar as the frame sets it: where it stands, how high, and whether a resonant peak owns it. */
interface Bar {
  readonly x: number;
  readonly level: number;
  readonly capped: boolean;
}

/**
 * The quantum spectrogram as a phosphor scope (U03e): a strip of glowing bars across the pane over a baseline, their
 * dim reflection under it. The floor's line is the engine's five anchor heights, kept low, each bar set off that line
 * and swung between two heights by the frame's seed — the clock only paces the swing (`phase`), it never picks a
 * height. The room's objects stand out of the floor as peaks where their frequency sits on the log axis, the resonant
 * ones tall, capped in white and haloed. A sweep crosses once a cycle, trailing. An anomaly makes every bar shiver
 * wider and faster, tears slices of the picture sideways and flickers it. The same frame at the same phase is the
 * same picture.
 */
export class SpectrumPicture implements Picture<SpectrumVM> {
  height(): number {
    return HEIGHT;
  }

  paint(painter: Painter, vm: SpectrumVM, size: PictureSize, palette: Palette, phase: number): void {
    const { width, height } = size;
    const base = Math.round(height * BASELINE);
    painter.globalAlpha = 1;
    painter.shadowBlur = 0;
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, width, height);
    painter.fillStyle = palette('rule');
    for (let line = 1; line <= GRID; line++) {
      painter.fillRect(0, Math.round(base - (base * line) / (GRID + 1)), width, 1);
    }
    painter.fillStyle = palette('rule-hi');
    painter.fillRect(0, base, width, 1);
    for (let decade = 0; decade <= vm.decades; decade++) {
      painter.fillRect(Math.round(((width - 1) * decade) / vm.decades), height - 4, 1, 4);
    }
    const bars = this.#bars(vm, width, phase);
    const pace = vm.glitched ? GLITCH_PACE : 1;
    this.#scene(painter, bars, base, palette, phase);
    if (!vm.glitched) return;
    const tears = vm.noise.branch('tear');
    for (let k = 0; k < TEARS; k++) {
      const tear = tears.branch(k);
      const y = Math.round(tear.branch('y').fraction() * base);
      const tall = 3 + Math.round(tear.branch('tall').fraction() * 6);
      const shift = Math.round(
        (tear.branch('shift').fraction() - 0.5) *
          2 *
          TEAR_SHIFT *
          Math.sin(2 * Math.PI * pace * (phase + k / TEARS)),
      );
      painter.save();
      painter.beginPath();
      painter.rect(0, y, width, tall);
      painter.clip();
      painter.fillStyle = palette('ground');
      painter.fillRect(0, y, width, tall);
      painter.translate(shift, 0);
      this.#scene(painter, bars, base, palette, phase);
      painter.restore();
    }
    const flicker = 0.5 - 0.5 * Math.cos(2 * Math.PI * pace * 2 * phase);
    painter.globalAlpha = (1 - FLICKER) * flicker;
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, width, height);
    painter.globalAlpha = 1;
  }

  /** Every bar of the frame: the floor it stands on and the peak that may rise through it. */
  #bars(vm: SpectrumVM, width: number, phase: number): readonly Bar[] {
    const count = Math.max(1, Math.floor((width + GAP) / (BAR + GAP)));
    const pitch = count === 1 ? 0 : (width - BAR) / (count - 1);
    const noise = vm.noise.branch('spectrum');
    const swing = vm.glitched ? SWING * GLITCH_SWING : SWING;
    const pace = vm.glitched ? GLITCH_PACE : 1;
    return Array.from({ length: count }, (_, i) => {
      const bar = noise.branch(i);
      const t = count === 1 ? 0 : i / (count - 1);
      const line = this.#onLine(vm, t) * FLOOR_SHARE;
      const from = clamp(line * (1 - JITTER / 2 + JITTER * bar.branch('off').fraction()));
      const to = clamp(from + (bar.branch('swing').fraction() - 0.5) * swing);
      const wave = 0.5 - 0.5 * Math.cos(2 * Math.PI * pace * (phase + bar.branch('phase').fraction()));
      const floor = Math.max(FLOOR, from + (to - from) * wave);
      const peak = this.#peakAt(vm, t);
      const level = clamp(Math.max(floor, peak.height + floor * (1 - peak.height)));
      return { x: Math.round(i * pitch), level, capped: peak.resonant && peak.height >= CAPPED * level };
    });
  }

  /** The bars with their bloom and reflection, the sweep and its trail, the halos of the resonant peaks. */
  #scene(painter: Painter, bars: readonly Bar[], base: number, palette: Palette, phase: number): void {
    const cyan = palette('cy');
    const white = palette('wh');
    // The reflection: the bars upside down under the baseline, faint.
    painter.fillStyle = cyan;
    painter.globalAlpha = MIRROR_ALPHA;
    for (const bar of bars) painter.fillRect(bar.x, base + 1, BAR, Math.round(bar.level * base * MIRROR));
    // The bars, bloomed in one pass.
    painter.shadowColor = cyan;
    painter.shadowBlur = BLOOM;
    painter.globalAlpha = 0.55;
    painter.beginPath();
    for (const bar of bars) {
      const top = Math.round(base - bar.level * base);
      painter.rect(bar.x, top, BAR, base - top);
    }
    painter.fill();
    painter.shadowBlur = 0;
    painter.globalAlpha = 1;
    for (const bar of bars) painter.fillRect(bar.x, Math.round(base - bar.level * base), BAR, 2);
    // The sweep and its trail: the bars it has just passed burn brighter.
    const at = Math.floor(phase * bars.length);
    for (let back = 0; back < TRAIL; back++) {
      const bar = bars[at - back];
      if (bar === undefined) continue;
      const top = Math.round(base - bar.level * base);
      painter.fillStyle = back === 0 ? white : cyan;
      painter.globalAlpha = back === 0 ? 0.9 : TRAIL_ALPHA * (1 - back / TRAIL);
      painter.fillRect(bar.x, back === 0 ? 0 : top, BAR, back === 0 ? base : base - top);
    }
    // The resonant peaks' caps and halos, breathing with the cycle.
    const pulse = 0.5 - 0.5 * Math.cos(2 * Math.PI * phase);
    painter.fillStyle = white;
    for (const bar of bars) {
      if (!bar.capped) continue;
      const top = Math.round(base - bar.level * base);
      painter.globalAlpha = 0.6 + 0.4 * pulse;
      painter.fillRect(bar.x, top, BAR, 1);
      painter.globalAlpha = 0.12;
      painter.beginPath();
      painter.arc(bar.x + BAR / 2, top, HALO + HALO_PULSE * pulse, 0, 2 * Math.PI);
      painter.fill();
    }
    painter.globalAlpha = 1;
  }

  /** The tallest peak standing at `t` on the axis, as a height and whether the object it stands for resonates. */
  #peakAt(vm: SpectrumVM, t: number): { readonly height: number; readonly resonant: boolean } {
    let best = { height: 0, resonant: false };
    for (const peak of vm.peaks) {
      const away = (t - peak.position) / PEAK_WIDTH;
      const height = (peak.resonant ? RESONANT : PLAIN) * Math.exp(-away * away);
      if (height > best.height) best = { height, resonant: peak.resonant };
    }
    return best;
  }

  /** The anchors' line at `t` (0 at the first anchor, 1 at the last), as a share of the tallest. */
  #onLine(vm: SpectrumVM, t: number): number {
    const anchors = vm.anchors;
    const last = anchors.length - 1;
    if (last < 0) return 0;
    const span = last * t;
    const index = Math.min(Math.floor(span), last);
    const low = anchors[index] ?? 0;
    const high = anchors[index + 1] ?? low;
    return (low + (high - low) * (span - index)) / vm.tallest;
  }
}

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}
