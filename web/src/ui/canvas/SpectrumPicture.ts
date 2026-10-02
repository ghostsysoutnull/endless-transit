import type { Seed } from '#engine/rng/Seed.ts';
import type { Painter } from './Painter.ts';
import type { Palette } from './Palette.ts';
import type { Picture, PictureSize } from './Picture.ts';
import type { SpectrumVM } from './SpectrumVM.ts';

/** The strip's height, a bar's width and the least gap between bars, in CSS pixels; the faint lines behind them. */
const HEIGHT = 48;
const BAR = 5;
const GAP = 2;
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
/** Under an anomaly the swing is this many times wider and this many times faster. */
const GLITCH_SWING = 2.5;
const GLITCH_PACE = 3;
/** A seed's draw as a fraction: the seed deals whole numbers, this many steps make the fraction. */
const STEPS = 1000;

/**
 * The quantum spectrogram as a live analyser (U03e): a strip of bars across the pane. The floor's line is the engine's
 * five anchor heights, kept low, each bar set off that line and swung between two heights by the frame's seed — the
 * clock only paces the swing (`phase`), it never picks a height. The room's objects stand out of the floor as peaks
 * where their frequency sits, the resonant ones tall and capped in white; an anomaly makes every bar shiver wider
 * and faster. The same frame at the same phase is the same picture.
 */
export class SpectrumPicture implements Picture<SpectrumVM> {
  height(): number {
    return HEIGHT;
  }

  paint(painter: Painter, vm: SpectrumVM, size: PictureSize, palette: Palette, phase: number): void {
    const { width, height } = size;
    const bars = Math.max(1, Math.floor((width + GAP) / (BAR + GAP)));
    const pitch = bars === 1 ? 0 : (width - BAR) / (bars - 1);
    painter.globalAlpha = 1;
    painter.shadowBlur = 0;
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, width, height);
    painter.fillStyle = palette('rule');
    for (let line = 1; line <= GRID; line++) {
      painter.fillRect(0, Math.round(height - (height * line) / (GRID + 1)), width, 1);
    }
    const noise = vm.noise.branch('spectrum');
    const swing = vm.glitched ? SWING * GLITCH_SWING : SWING;
    const pace = vm.glitched ? GLITCH_PACE : 1;
    for (let i = 0; i < bars; i++) {
      const bar = noise.branch(i);
      const t = bars === 1 ? 0 : i / (bars - 1);
      const base = this.#onLine(vm, t) * FLOOR_SHARE;
      const from = clamp(base * (1 - JITTER / 2 + JITTER * fraction(bar.branch('off'))));
      const to = clamp(from + (fraction(bar.branch('swing')) - 0.5) * swing);
      const wave = 0.5 - 0.5 * Math.cos(2 * Math.PI * pace * (phase + fraction(bar.branch('phase'))));
      const floor = Math.max(FLOOR, from + (to - from) * wave);
      const peak = this.#peakAt(vm, t);
      const level = clamp(Math.max(floor, peak.height + floor * (1 - peak.height)));
      const x = Math.round(i * pitch);
      const top = Math.round(height - level * height);
      painter.fillStyle = palette('cy');
      painter.globalAlpha = 0.5;
      painter.fillRect(x, top, BAR, height - top);
      painter.globalAlpha = 1;
      painter.fillRect(x, top, BAR, 2);
      if (peak.resonant && peak.height >= CAPPED * level) {
        painter.fillStyle = palette('wh');
        painter.globalAlpha = 0.9;
        painter.fillRect(x, top, BAR, 1);
      }
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

function fraction(seed: Seed): number {
  return seed.range(0, STEPS) / STEPS;
}

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}
