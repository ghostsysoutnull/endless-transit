import type { GlyphLook } from '#engine/model/GlyphLook.ts';
import { Phrase } from '#engine/model/Phrase.ts';
import type { VibeFigure } from '#engine/model/VibeFigure.ts';
import type { TraceStep } from '#engine/rules/TraceStep.ts';
import type { TraceSummary } from '#engine/rules/TraceSummary.ts';
import { DepthNumber } from './DepthNumber.ts';
import type { DriftLane, PoleLane, PoleLevelVM, PoleVM } from './PoleVM.ts';
import type { PoleWords } from './PoleWords.ts';

/** The levels whose plate keeps an empty berth in the ships' lane: a planet's orbit and a city's dock (the mock's, `transit-reframed.html:1186-1190`). */
const BERTHS: ReadonlySet<GlyphLook> = new Set(['planet', 'city']);
/** A level's vibe tags: its words and looks, before the engine's signs. */
const REBEL = { word: 'rebel', look: 'rebel' } as const;
const DRIFT = { word: 'drift', look: 'drift' } as const;
const NOTHING: Readonly<Record<PoleLane, string>> = { era: '', culture: '', trait: '' };
const NO_CURRENT: Readonly<Record<DriftLane, string>> = { era: '', culture: '' };
const NO_DRIFT: Readonly<Record<DriftLane, boolean>> = { era: false, culture: false };

/**
 * Owns the pole's words (U05): the switch's, the ribbons' heads, and a row a traced level — its kind and scale, its
 * name, the values its ribbons carry, the drift current's words, its tags and what a reader hears for it. It reads
 * the vibe the engine handed over; it never works one out.
 */
export class PolePresenter implements PoleWords {
  of(trace: TraceSummary): PoleVM {
    return {
      group: 'View',
      pole: 'Pole',
      column: 'Column',
      heads: { era: 'Era', culture: 'Culture', trait: 'Trait' },
      levels: trace.steps.map((step) => this.#level(step)),
    };
  }

  #level(step: TraceStep): PoleLevelVM {
    const vibe = this.#vibe(step.vibe);
    const tags = [
      ...(vibe.rebel ? [REBEL] : []),
      ...(vibe.drift.era || vibe.drift.culture ? [DRIFT] : []),
      ...step.signs.map((sign) => ({ word: sign.word, look: sign.look })),
    ];
    const depth = new DepthNumber(step.depth).text();
    const heard = [
      `Level ${depth}, ${step.kind}: ${step.name}`,
      ...(vibe.values.era === '' ? [] : [`era ${vibe.values.era}`]),
      ...(vibe.values.culture === '' ? [] : [`culture ${vibe.values.culture}`]),
      ...(vibe.values.trait === '' ? [] : [`trait ${vibe.values.trait}`]),
      ...tags.map((tag) => tag.word),
      ...(step.current ? ['you are here'] : []),
    ];
    return {
      key: step.address,
      glyph: step.glyph,
      abyssal: step.abyssal,
      here: step.current,
      kind: step.kind,
      scale: step.scale,
      name: step.name,
      label: heard.join(', '),
      berth: BERTHS.has(step.glyph),
      tags,
      ...vibe,
    };
  }

  /** The ribbons' values, the current's words, the rebel break and the drift, from the level's vibe. */
  #vibe(figure: VibeFigure): Pick<PoleLevelVM, 'values' | 'current' | 'rebel' | 'drift'> {
    if (figure.held === 'none')
      return { values: NOTHING, current: NO_CURRENT, rebel: false, drift: NO_DRIFT };
    const word = (key: string) => new Phrase(key).capitalised();
    return {
      values: {
        era: word(figure.main.era),
        culture: word(figure.main.culture),
        trait: figure.held === 'country' ? word(figure.trait) : '',
      },
      current: { era: `drift · ${figure.second.era}`, culture: `drift · ${figure.second.culture}` },
      rebel: figure.held === 'country' && figure.rebel,
      drift: figure.held === 'country' ? figure.drift : NO_DRIFT,
    };
  }
}
