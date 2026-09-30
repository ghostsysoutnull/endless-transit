import type { Fact } from './Fact.ts';
import { Location } from './Location.ts';
import { LocationKind } from './LocationKind.ts';
import type { Origin } from './Origin.ts';
import type { Vibe } from './Vibe.ts';
import type { Portrait } from './Portrait.ts';
import type { AreaPart } from './AreaPart.ts';
import type { VibeFigure } from './VibeFigure.ts';

export const CITY_KIND = new LocationKind({
  key: 'city',
  glyph: 'city',
  title: 'City',
  scale: '10⁴ m',
  icon: '🏙',
  indexLabel: 'DISTRICT',
});

/** A city; one in ten is a rebel district, which carries the planet's vibe with cultures and eras swapped. */
export class City extends Location {
  readonly #name: string;
  readonly #rebelVibe: Vibe | undefined;

  /** `rebelVibe` is the swapped vibe of a rebel district; a loyal city has none and inherits. */
  constructor(origin: Origin, facts: { name: string; rebelVibe: Vibe | undefined }) {
    super(origin);
    this.#name = facts.name;
    this.#rebelVibe = facts.rebelVibe;
  }

  kind(): LocationKind {
    return CITY_KIND;
  }

  name(): string {
    return this.#name;
  }

  override vibe(): Vibe | undefined {
    return this.#rebelVibe ?? super.vibe();
  }

  /** A rebel district says it swapped the pairs here (U05). */
  override vibeFigure(): VibeFigure {
    return this.#rebelVibe?.figure({ rebel: true }) ?? super.vibeFigure();
  }

  description(): readonly string[] {
    return [
      this.#rebelVibe === undefined
        ? 'A stable regional node connected to the planetary lattice.'
        : 'The air is thick with illegal data-streams and shifting static.',
    ];
  }

  override facts(): readonly Fact[] {
    return this.#rebelVibe === undefined ? [] : [{ key: 'alert', label: 'Rebel district', value: '' }];
  }

  /** No diagnostic line: the level is drawn (U04, Decision 1 — the terminal's jargon goes). */
  status(): string {
    return '';
  }

  childrenHeading(): string {
    return 'Streets detected in this city';
  }

  approachVerb(): string {
    return 'Go to';
  }

  /** Drawn as an area of its children (U04). */
  override portrait(): Portrait {
    return this.area('city');
  }

  /** Marked in its parent's area (U04). */
  override onArea(): readonly AreaPart[] {
    return [{ address: this.address().toString(), mark: 'city' }];
  }
}
