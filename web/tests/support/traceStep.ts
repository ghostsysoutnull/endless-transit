import { NoPortrait } from '#engine/model/NoPortrait.ts';
import type { TraceStep } from '#engine/rules/TraceStep.ts';

/** One level of a trace a test names by what it cares about: its depth, kind, name and address; the rest plain and still. */
export function traceStep(overrides: Partial<TraceStep> = {}): TraceStep {
  return {
    depth: 0,
    icon: '∞',
    kind: 'Universe',
    name: 'The Endless Universe',
    current: false,
    abyssal: false,
    address: '0',
    portrait: new NoPortrait(),
    children: [],
    facts: [],
    words: '',
    scale: '10²⁶ m',
    glyph: 'universe',
    vibe: { held: 'none' },
    signs: [],
    ...overrides,
  };
}
